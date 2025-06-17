import {
  IncomingMessage,
  MessagingProtocol,
  OutgoingMessage,
  Role,
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

interface MessagingServiceProsumerEvents<
  MP extends MessagingProtocol | undefined,
  R extends Role<MP> | undefined,
> {
  message: (message: IncomingMessage<MP, R>) => void;
}

export class MessagingServiceProsumer<
    MP extends MessagingProtocol | undefined = undefined,
    R extends Role<MP> | undefined = undefined,
  >
  extends TypedEmitter<MessagingServiceProsumerEvents<MP, R>>
  implements Service
{
  private _messagingChannel?: CrossLabMessagingChannel<MP, R>;
  private _messagingProtocol: MP;
  private _role: R;
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/messaging';
  serviceId: string;
  serviceDirection: ServiceDirection = 'prosumer';

  constructor(serviceId: string, messagingProtocol: MP, role: R) {
    super();
    this.serviceId = serviceId;
    this._messagingProtocol = messagingProtocol;
    this._role = role;
  }

  getMeta() {
    return {
      serviceId: this.serviceId,
      serviceType: this.serviceType,
      serviceDirection: this.serviceDirection,
      supportedConnectionTypes: ['local', 'websocket', 'webrtc'],
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    // TODO: add checkConfig function
    const channel = new DataChannel();
    this._messagingChannel = new CrossLabMessagingChannel(
      channel,
      this._messagingProtocol,
      this._role,
    );
    this._messagingChannel.on('message', message => this.emit('message', message));
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
  }

  async send(message: OutgoingMessage<MP, R>) {
    if (!this._messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    await this._messagingChannel.send(message);
  }
}
