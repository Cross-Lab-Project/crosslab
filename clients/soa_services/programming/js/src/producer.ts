import { OutgoingMessage } from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import { Directory, File } from '@cross-lab-project/filesystem-schemas';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';

import { ProgrammingProtocol, programmingProtocol } from './protocol.js';

interface ProgrammingServiceProducerEvents {
  'new-consumer': (consumerId: string) => void;
  'program:request': (
    consumerId: string,
    requestId: string,
    program: File | Directory,
  ) => void;
}

export class ProgrammingServiceProducer
  extends TypedEmitter<ProgrammingServiceProducerEvents>
  implements Service
{
  private _consumers: Map<
    string,
    CrossLabMessagingChannel<ProgrammingProtocol, 'target'>
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/programming';
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
    const consumerId = uuidv4();
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      programmingProtocol,
      'target',
    );

    messagingChannel.on('message', message => {
      this.emit(
        'program:request',
        consumerId,
        message.content.requestId,
        message.content.program,
      );
    });

    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }

    this._consumers.set(consumerId, messagingChannel);

    this.emit('new-consumer', consumerId);
  }

  async send(
    consumerId: string,
    message: OutgoingMessage<ProgrammingProtocol, 'target'>,
  ) {
    const consumer = this._consumers.get(consumerId);

    if (!consumer) {
      throw new Error(`Could not find consumer with id "${consumerId}"`);
    }

    await consumer.send(message);
  }
}
