import WebSocket from 'isomorphic-ws';
import {TypedEmitter} from 'tiny-typed-emitter';

import {
  ClosePeerConnectionMessage,
  ConnectionStateChangedMessage,
  CreatePeerConnectionMessage,
  SignalingMessage,
  isClosePeerConnectionMessage,
  isCommandMessage,
  isCreatePeerConnectionMessage,
  isSignalingMessage,
} from './deviceMessages';
import {PeerConnection} from './peer/connection';
import {WebRTCPeerConnection} from './peer/webrtc-connection';
import {Service} from './service';

export interface DeviceHandlerEvents {
  connectionsChanged(): void;
}

export class DeviceHandler extends TypedEmitter<DeviceHandlerEvents> {
  ws!: WebSocket;
  connections = new Map<string, PeerConnection>();
  services = new Map<string, Service>();

  async connect(connectOptions: {endpoint: string; id: string; token: string}) {
    this.ws = new WebSocket(connectOptions.endpoint);

    this.ws.onopen = () => {
      this.ws.send(
        JSON.stringify({
          messageType: 'authenticate',
          deviceUrl: connectOptions.id,
          token: connectOptions.token,
        }),
      );
    };

    const p = new Promise<void>((resolve, reject) => {
      this.ws.onmessage = authenticationEvent => {
        const authenticationMessage = JSON.parse(authenticationEvent.data as string);
        if (authenticationMessage.messageType === 'authenticate') {
          if (authenticationMessage.authenticated) {
            resolve();
          } else reject('Authentication failed');
        } else {
          reject(`Èxpected message with messageType 'authenticate', received '${authenticationMessage.messageType}'`);
        }
      };
    });

    this.ws.onclose = event => {
      console.log('ws closed', event);
    };

    this.ws.onerror = event => {
      console.log('ws error', event);
    };

    await p;

    this.ws.onmessage = event => {
      const message = JSON.parse(event.data as string);

      if (isCommandMessage(message)) {
        if (isCreatePeerConnectionMessage(message)) {
          this.handleCreatePeerConnectionMessage(message);
        } else if (isClosePeerConnectionMessage(message)) {
          this.handleClosePeerConnectionMessage(message);
        }
      }
      if (isSignalingMessage(message)) {
        this.handleSignalingMessage(message);
      }
    };
  }

  addService(service: Service) {
    this.services.set(service.serviceId, service);
  }

  private handleCreatePeerConnectionMessage(message: CreatePeerConnectionMessage) {
    if (this.connections.has(message.connectionUrl)) {
      throw Error('Can not create a connection. Connection Id is already present');
    }
    console.log('creating connection', message);
    const connection = new WebRTCPeerConnection(
      {} /*{
      iceServers: [{urls: 'stun:stun.goldi-labs.de:3478'}, {urls: 'turn:turn.goldi-labs.de:3478', username: 'goldi', credential: 'goldi'}],
    }*/,
    );
    connection.tiebreaker = message.tiebreaker;
    this.connections.set(message.connectionUrl, connection);
    for (const serviceConfig of message.services) {
      const service = this.services.get(serviceConfig.serviceId);
      if (service === undefined) {
        throw Error('No Service for the service config was found');
      }
      service.setupConnection(connection, serviceConfig);
    }
    connection.on('signalingMessage', msg => {
      console.log('sending:', msg);
      this.ws.send(
        JSON.stringify({
          ...msg,
          messageType: 'signaling',
          connectionUrl: message.connectionUrl,
        }),
      );
    });
    connection.on('connectionChanged', () => {
      const connectionStateChangedMessage: ConnectionStateChangedMessage = {
        messageType: 'connection-state-changed',
        status: connection.state,
        connectionUrl: message.connectionUrl,
      };
      this.ws.send(JSON.stringify(connectionStateChangedMessage));
      this.emit('connectionsChanged');
    });
    connection.connect();
    this.emit('connectionsChanged');
  }

  private handleSignalingMessage(message: SignalingMessage) {
    const connection = this.connections.get(message.connectionUrl);
    if (connection === undefined) {
      throw Error('No Connection for the signaling message was found');
    }
    connection.handleSignalingMessage(message);
  }

  private handleClosePeerConnectionMessage(message: ClosePeerConnectionMessage) {
    const connection = this.connections.get(message.connectionUrl);
    if (!connection) {
      throw Error('Cannot close a connection. Connection Id is not present');
    }
    console.log('closing connection', message);
    connection.teardown();
    this.connections.delete(message.connectionUrl);
  }

  getServiceMeta() {
    return Array.from(this.services).map(service => service[1].getMeta());
  }
}
