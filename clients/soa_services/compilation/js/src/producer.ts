import {
  IncomingMessage,
  OutgoingMessage,
  ProtocolMessage,
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
  CompilationProtocol,
  ResultFormat,
  UniqueResultFormatArray,
  buildCompilationProtocol,
} from './protocol.js';

interface CompilationService__ProducerEvents<R extends ResultFormat[] = []> {
  'new-client': (clientId: string) => void;
  'compilation:request': (
    clientId: string,
    request: ProtocolMessage<CompilationProtocol<R>, 'compilation:request'>['content'],
  ) => void;
}

export class CompilationService__Producer<R extends ResultFormat[]>
  extends TypedEmitter<CompilationService__ProducerEvents<UniqueResultFormatArray<R>>>
  implements Service
{
  private _compilationProtocol: CompilationProtocol<UniqueResultFormatArray<R>>;
  private _clients: Map<
    string,
    {
      messagingChannel: CrossLabMessagingChannel<
        CompilationProtocol<UniqueResultFormatArray<R>>,
        'server'
      >;
    }
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/compilation';
  serviceId: string;
  serviceDirection: ServiceDirection = 'producer';

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
    const clientId = uuidv4();
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      this._compilationProtocol,
      'server',
    );

    messagingChannel.on('message', message => this._handleMessage(clientId, message));
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }

    this._clients.set(clientId, { messagingChannel });
    this.emit('new-client', clientId);
  }

  async send(
    clientId: string,
    message: OutgoingMessage<CompilationProtocol<UniqueResultFormatArray<R>>, 'server'>,
  ) {
    const client = this._clients.get(clientId);

    if (!client) {
      throw new Error(`Could not find client with id "${clientId}"`);
    }

    await client.messagingChannel.send(message);
  }

  private _handleMessage(
    clientId: string,
    message: IncomingMessage<CompilationProtocol<UniqueResultFormatArray<R>>, 'server'>,
  ) {
    if (!this._clients.has(clientId)) {
      throw new Error(`Could not find client with id "${clientId}"`);
    }

    switch (message.type) {
      case 'compilation:request':
        this.emit('compilation:request', clientId, message.content);
        break;
      default:
        throw new Error(`Unrecognized message type "${message.type}"!`);
    }
  }
}
