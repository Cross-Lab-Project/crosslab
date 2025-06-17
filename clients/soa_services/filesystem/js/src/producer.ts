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

import { FileSystemProtocol, fileSystemProtocol } from './protocol';

interface FileSystemService__ProducerEvents {
  'new-consumer': (consumerId: string) => void;
  request: (
    consumerId: string,
    request: IncomingMessage<FileSystemProtocol, 'producer'>,
  ) => void;
}

export class FileSystemService__Producer
  extends TypedEmitter<FileSystemService__ProducerEvents>
  implements Service
{
  private _consumers: Map<
    string,
    CrossLabMessagingChannel<FileSystemProtocol, 'producer'>
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/filesystem';
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
    // TODO: add checkConfig function
    console.log('setting up filesystem service producer!');
    const consumerId = uuidv4();
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      fileSystemProtocol,
      'producer',
    );
    console.log(messagingChannel);
    messagingChannel.on('message', message => {
      console.log('emitting request', message);
      this.emit('request', consumerId, message);
    });
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
    this._consumers.set(consumerId, messagingChannel);
  }

  async send(
    consumerId: string,
    message: OutgoingMessage<FileSystemProtocol, 'producer'>,
  ) {
    const messagingChannel = this._consumers.get(consumerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    await messagingChannel.send(message);
  }
}
