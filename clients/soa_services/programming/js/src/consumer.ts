import {
  ProtocolMessage,
  isProtocolMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import { Directory, File } from '@cross-lab-project/filesystem-schemas';
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

import { ProgrammingProtocol, programmingProtocol } from './protocol.js';

interface ProgrammingServiceConsumerEvents {
  'new-producer': (producerId: string) => void;
}

export class ProgrammingServiceConsumer
  extends TypedEmitter<ProgrammingServiceConsumerEvents>
  implements Service
{
  private _producers: Map<
    string,
    CrossLabMessagingChannel<ProgrammingProtocol, 'programmer'>
  > = new Map();
  private _promiseManager: PromiseManager = new PromiseManager();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/programming';
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
    const producerId = uuidv4();
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      programmingProtocol,
      'programmer',
    );

    messagingChannel.on('message', message => {
      this._promiseManager.resolve(message.content.requestId, message);
    });

    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }

    this._producers.set(producerId, messagingChannel);

    this.emit('new-producer', producerId);
  }

  async program(
    producerId: string,
    program: File | Directory,
    options?: { awaitResponse?: false },
  ): Promise<void>;
  async program(
    producerId: string,
    program: File | Directory,
    options?: { awaitResponse?: true },
  ): Promise<ProtocolMessage<ProgrammingProtocol, 'program:response'>['content']>;
  async program(
    producerId: string,
    program: File | Directory,
    options?: { awaitResponse?: boolean },
  ): Promise<ProtocolMessage<ProgrammingProtocol, 'program:response'>['content'] | void> {
    const producer = this._producers.get(producerId);

    if (!producer) {
      throw new Error(`Could not find producer with id "${producerId}"`);
    }

    const requestId = uuidv4();
    const responsePromise = this._promiseManager.add(requestId);

    await producer.send({
      type: 'program:request',
      content: { requestId, program },
    });

    if (!options?.awaitResponse) {
      return;
    }

    const response = (await responsePromise) as ProtocolMessage<
      ProgrammingProtocol,
      'program:response'
    >;

    if (!isProtocolMessage(programmingProtocol, 'program:response', response)) {
      throw new Error(`Expected response of type "program:response"!`);
    }

    return response.content;
  }
}
