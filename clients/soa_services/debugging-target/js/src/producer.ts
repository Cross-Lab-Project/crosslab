import { OutgoingMessage } from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';

import { DebuggingTargetProtocol, debuggingTargetProtocol } from './protocol';

interface DebuggingTargetServiceProducerEvents {
  'debugging:start': (requestId: string, program: Uint8Array) => void;
  'debugging:end': (requestId: string) => void;
  'debugging:message': (message: unknown) => void;
}

export class DebuggingTargetServiceProducer
  extends TypedEmitter<DebuggingTargetServiceProducerEvents>
  implements Service
{
  private _messagingChannel?: CrossLabMessagingChannel<DebuggingTargetProtocol, 'target'>;
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/debugging-target';
  serviceId: string;
  serviceDirection: ServiceDirection = 'producer';

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
    // TODO: add checkConfig
    const channel = new DataChannel();
    this._messagingChannel = new CrossLabMessagingChannel(
      channel,
      debuggingTargetProtocol,
      'target',
    );
    this._messagingChannel.on('message', message => {
      switch (message.type) {
        case 'debugging:start:request':
          console.log('Emitting debugging:start');
          this.emit(
            'debugging:start',
            message.content.requestId,
            message.content.program,
          );
          break;
        case 'debugging:end:request':
          this.emit('debugging:end', message.content.requestId);
          break;
        case 'debugging:message':
          this.emit('debugging:message', message.content);
          break;
      }
    });
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
  }

  async send(message: OutgoingMessage<DebuggingTargetProtocol, 'target'>) {
    if (!this._messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }
    await this._messagingChannel.send(message);
  }
}
