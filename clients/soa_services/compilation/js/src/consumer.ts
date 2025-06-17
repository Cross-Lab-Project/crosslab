import {
  IncomingMessage,
  ProtocolMessage,
  isProtocolMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import { Directory } from '@cross-lab-project/filesystem-schemas';
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

import {
  CompilationProtocol,
  IdArray,
  ResultFormat,
  UniqueResultFormatArray,
  buildCompilationProtocol,
} from './protocol';

interface CompilationService__ConsumerEvents {
  'new-producer': (producerId: string) => void;
}

export class CompilationService__Consumer<R extends ResultFormat[]>
  extends TypedEmitter<CompilationService__ConsumerEvents>
  implements Service
{
  private _promiseManager: PromiseManager = new PromiseManager();
  private _compilationProtocol: CompilationProtocol<UniqueResultFormatArray<R>>;
  private _producers: Map<
    string,
    {
      messagingChannel: CrossLabMessagingChannel<
        CompilationProtocol<UniqueResultFormatArray<R>>,
        'client'
      >;
    }
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/compilation';
  serviceId: string;
  serviceDirection: ServiceDirection = 'consumer';

  constructor(serviceId: string, resultFormatsDescription?: UniqueResultFormatArray<R>) {
    super();
    this.serviceId = serviceId;
    this._compilationProtocol = buildCompilationProtocol(resultFormatsDescription);
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
    const producerId = uuidv4();
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      this._compilationProtocol,
      'client',
    );

    messagingChannel.on('message', message => this._handleMessage(producerId, message));
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }

    this._producers.set(producerId, { messagingChannel });
    this.emit('new-producer', producerId);
  }

  private _handleMessage(
    producerId: string,
    message: IncomingMessage<CompilationProtocol<UniqueResultFormatArray<R>>, 'client'>,
  ) {
    if (!this._producers.has(producerId)) {
      throw new Error(`Could not find producer with id "${producerId}"`);
    }

    switch (message.type) {
      case 'compilation:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      default:
        throw new Error(`Unrecognized message type "${message.type}"!`);
    }
  }

  async compile(
    producerId: string,
    directory: Directory,
    format?: IdArray<R>[number],
  ): Promise<
    ProtocolMessage<
      CompilationProtocol<UniqueResultFormatArray<R>>,
      'compilation:response'
    >['content']
  > {
    const producer = this._producers.get(producerId);

    if (!producer) {
      throw new Error(`Could not find producer with id "${producerId}"`);
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await producer.messagingChannel.send({
      type: 'compilation:request',
      content: { requestId, format, directory },
    });

    const response = await promise;

    if (!isProtocolMessage(this._compilationProtocol, 'compilation:response', response)) {
      throw new Error('Received message is not of expected type "compilation:response"!');
    }

    return response.content;
  }
}
