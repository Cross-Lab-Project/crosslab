import { isProtocolMessage } from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import { PromiseManager } from '@cross-lab-project/promise-manager';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';

import { DebuggingTargetProtocol, debuggingTargetProtocol } from './protocol';

interface DebuggingTargetServiceConsumerEvents {
  'debugging:message': (message: unknown) => void;
}

export class DebuggingTargetServiceConsumer
  extends TypedEmitter<DebuggingTargetServiceConsumerEvents>
  implements Service
{
  private _messagingChannel?: CrossLabMessagingChannel<DebuggingTargetProtocol, 'client'>;
  private _promiseManager: PromiseManager = new PromiseManager();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/debugging-target';
  serviceId: string;
  serviceDirection: ServiceDirection = 'consumer';

  constructor(serviceId: string) {
    super();
    this.serviceId = serviceId;
  }

  getMeta() {
    return {
      serviceId: this.serviceId,
      serviceType: this.serviceType,
      serviceDirection: this.serviceDirection,
      supportedConnectionTypes: ['webrtc', 'websocket'],
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    // TODO: add checkConfig function
    const channel = new DataChannel();
    this._messagingChannel = new CrossLabMessagingChannel(
      channel,
      debuggingTargetProtocol,
      'client',
    );

    this._messagingChannel.on('message', message => {
      if (message.type === 'debugging:message') {
        this.emit('debugging:message', message.content);
        return;
      }
      this._promiseManager.resolve(message.content.requestId, message);
    });

    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
  }

  async startDebugging(program: Uint8Array<ArrayBuffer>) {
    if (!this._messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();

    this._messagingChannel.send({
      type: 'debugging:start:request',
      content: {
        requestId,
        program,
      },
    });

    const response = await this._promiseManager.add(requestId);

    if (
      !isProtocolMessage(debuggingTargetProtocol, 'debugging:start:response', response)
    ) {
      throw new Error(
        'The received response is not a valid "debugging:start:response" message!',
      );
    }

    if (!response.content.success) {
      throw new Error(
        `Debugging could not be started: ${response.content.message ?? 'cause unknown'}`,
      );
    }
  }

  async endDebugging() {
    if (!this._messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();

    this._messagingChannel.send({
      type: 'debugging:end:request',
      content: {
        requestId,
      },
    });

    const response = await this._promiseManager.add(requestId);

    if (!isProtocolMessage(debuggingTargetProtocol, 'debugging:end:response', response)) {
      throw new Error(
        'The received response is not a valid "debugging:end:response" message!',
      );
    }

    if (!response.content.success) {
      throw new Error(
        `Debugging could not be ended: ${response.content.message ?? 'cause unknown'}`,
      );
    }
  }

  async sendDebuggingMessage(message: unknown) {
    await this._messagingChannel?.send({
      type: 'debugging:message',
      content: message,
    });
  }
}
