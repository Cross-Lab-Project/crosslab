import WebSocket from 'isomorphic-ws';
import { TypedEmitter } from 'tiny-typed-emitter';

import {
  SignalingMessage,
  WebSocketMessage,
  isWebSocketMessage,
} from '../deviceMessages';
import { logger } from '../logging';
import { Channel } from './channel';
import { PeerConnection, PeerConnectionEvents, ServiceConfig } from './connection';

type WebSocketConnectionOptions = {
  url: string;
};

export class WebSocketPeerConnection
  extends TypedEmitter<PeerConnectionEvents>
  implements PeerConnection
{
  private _connectionOptions: WebSocketConnectionOptions;
  private _channels: Map<string, Channel> = new Map();
  private _webSocket?: WebSocket;
  state: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed' =
    'new';
  tiebreaker!: boolean;

  constructor(connectionData: WebSocketConnectionOptions) {
    super();

    this._connectionOptions = connectionData;
  }

  transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    this._addChannel(serviceConfig, id, channel);
  }

  receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    this._addChannel(serviceConfig, id, channel);
  }

  async handleSignalingMessage(_msg: SignalingMessage): Promise<void> {}

  async connect(): Promise<void> {
    this.state = 'connecting';
    this.emit('connectionChanged');

    this._webSocket = new WebSocket(this._connectionOptions.url);

    this._webSocket.onclose = () => {
      this.state = 'closed';
      this.emit('connectionChanged');
    };

    this._webSocket.onopen = () => {
      for (const channel of this._channels.values()) {
        if (channel.channel_type === 'DataChannel') channel._setReady();
      }

      if (!this._webSocket) {
        logger.log('info', 'WebSocketConnection does not have a WebSocket!');
        return;
      }

      this._webSocket.onmessage = message => {
        const parsedMessage = JSON.parse(message.data.toString());

        if (!isWebSocketMessage(parsedMessage)) {
          logger.log('info', 'Received message is not a valid WebSocketMessage!');
          return;
        }

        const channel = this._channels.get(parsedMessage.channel);

        if (channel?.channel_type === 'DataChannel' && channel.ondata) {
          console.log(JSON.stringify(parsedMessage, null, 4));
          switch (parsedMessage.type) {
            case 'string': {
              channel.ondata(parsedMessage.content);
              break;
            }
            case 'arrayBuffer': {
              channel.ondata(new Uint8Array(Object.values(parsedMessage.content)).buffer);
              break;
            }
            case 'arrayBufferView': {
              channel.ondata({
                buffer: new Uint8Array(Object.values(parsedMessage.content.buffer))
                  .buffer,
                byteLength: parsedMessage.content.byteLength,
                byteOffset: parsedMessage.content.byteOffset,
              });
              break;
            }
            case 'blob': {
              channel.ondata(
                new Blob([new Uint8Array(Object.values(parsedMessage.content)).buffer]),
              );
              break;
            }
          }
        }
      };

      this.state = 'connected';
      this.emit('connectionChanged');
    };
  }

  teardown(): void {
    if (this.state != 'closed') {
      this._webSocket?.close();
      this.state = 'closed';
      this.emit('connectionChanged');
    }
  }

  // helper functions

  private _createLabel(serviceConfig: ServiceConfig, id: string): string {
    const id1 = this.tiebreaker ? serviceConfig.serviceId : serviceConfig.remoteServiceId;
    const id2 = this.tiebreaker ? serviceConfig.remoteServiceId : serviceConfig.serviceId;
    const label = JSON.stringify([serviceConfig.serviceType, id1, id2, id]);
    return label;
  }

  private _addChannel(serviceConfig: ServiceConfig, id: string, channel: Channel) {
    const label = this._createLabel(serviceConfig, id);
    this._channels.set(label, channel);

    if (channel.channel_type === 'DataChannel') {
      channel.send = data => {
        if (data instanceof Blob) {
          data
            .arrayBuffer()
            .then(arrayBuffer => {
              this._webSocket?.send(
                JSON.stringify({
                  type: 'blob',
                  content: Array.from(new Uint8Array(arrayBuffer)),
                  channel: label,
                } satisfies WebSocketMessage),
              );
            })
            .catch(error => console.error(error));
        } else if (typeof data === 'string') {
          this._webSocket?.send(
            JSON.stringify({
              type: 'string',
              content: data,
              channel: label,
            } satisfies WebSocketMessage),
          );
        } else if (data instanceof ArrayBuffer) {
          this._webSocket?.send(
            JSON.stringify({
              type: 'arrayBuffer',
              content: Array.from(new Uint8Array(data)),
              channel: label,
            } satisfies WebSocketMessage),
          );
        } else {
          this._webSocket?.send(
            JSON.stringify({
              type: 'arrayBufferView',
              content: { ...data, buffer: Array.from(new Uint8Array(data.buffer)) },
              channel: label,
            } satisfies WebSocketMessage),
          );
        }
      };

      if (this.state === 'connected') channel._setReady();
    }
  }
}
