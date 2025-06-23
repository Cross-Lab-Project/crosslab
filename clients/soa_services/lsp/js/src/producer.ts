import {
  IncomingMessage,
  OutgoingMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';

import {
  LanguageServerMessagingProtocol,
  languageServerMessagingProtocol,
} from './protocol';

export interface LanguageServerProducerEvents {
  'new-consumer': (consumerId: string) => void;
  message: (
    consumerId: string,
    message: IncomingMessage<LanguageServerMessagingProtocol, 'server'>,
  ) => void;
}

export class LanguageServerProducer
  extends TypedEmitter<LanguageServerProducerEvents>
  implements Service
{
  private _consumers: Map<
    string,
    CrossLabMessagingChannel<LanguageServerMessagingProtocol, 'server'>
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/lsp';
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
      supportedConnectionTypes: ['websocket', 'webrtc', 'local'],
    };
  }

  setupConnection(
    connection: PeerConnection,
    serviceConfiguration: ServiceConfiguration,
  ): void {
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      languageServerMessagingProtocol,
      'server',
    );

    const consumerId = uuidv4();
    this._consumers.set(consumerId, messagingChannel);

    messagingChannel.on('message', message => {
      this.emit('message', consumerId, message);
    });

    messagingChannel.on('close', () => {});

    this.emit('new-consumer', consumerId);

    if (connection.tiebreaker) {
      connection.transmit(serviceConfiguration, 'data', channel);
    } else {
      connection.receive(serviceConfiguration, 'data', channel);
    }
  }

  async send(
    consumerId: string,
    message: OutgoingMessage<LanguageServerMessagingProtocol, 'server'>,
  ) {
    const consumer = this._consumers.get(consumerId);
    if (!consumer) {
      throw new Error(`Could not find consumer with id "${consumerId}"!`);
    }

    await consumer.send(message);
  }
}
