import {
  Consumer,
  Producer,
  Service,
  ServiceConfiguration,
} from '@cross-lab-project/soa-client';
import { DataChannel } from '@cross-lab-project/soa-client';
import { PeerConnection } from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';

import { MessageServiceEvent } from './messages';

type ServiceType = 'https://api.goldi-labs.de/serviceTypes/message';
const ServiceType: ServiceType = 'https://api.goldi-labs.de/serviceTypes/message';

export interface MessageServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
}
function checkConfig(
  config: ServiceConfiguration,
): asserts config is MessageServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    //throw Error("Service Configuration needs to be for MessageService type");
  }
}

export class MessageService__Producer implements Service {
  serviceType = ServiceType;
  serviceId: string;
  serviceDirection = Producer;
  channel?: DataChannel;

  constructor(serviceId: string) {
    this.serviceId = serviceId;
  }

  getMeta() {
    return {
      serviceType: this.serviceType,
      serviceId: this.serviceId,
      serviceDirection: this.serviceDirection,
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);
    const channel = new DataChannel();
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
    this.channel = channel;
  }

  async sendMessage(message: string, messageType: string) {
    if (this.channel !== undefined) {
      await this.channel.ready();
      this.channel.send(JSON.stringify({ messageType: messageType, message: message }));
    }
  }
}

interface MessageService__ConsumerEvents {
  message: (event: MessageServiceEvent) => void;
}

export class MessageService__Consumer
  extends TypedEmitter<MessageService__ConsumerEvents>
  implements Service
{
  serviceType = ServiceType;
  serviceId: string;
  serviceDirection = Consumer;

  constructor(serviceId: string) {
    super();
    this.serviceId = serviceId;
  }

  getMeta() {
    return {
      serviceType: this.serviceType,
      serviceId: this.serviceId,
      serviceDirection: this.serviceDirection,
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);
    const channel = new DataChannel();
    channel.ondata = this.handleData.bind(this);
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
  }

  handleData(data: string | Blob | ArrayBuffer | ArrayBufferView) {
    if (typeof data === 'string') {
      const msg = JSON.parse(data);
      this.emit('message', { message_type: msg.messageType, message: msg.message });
    }
  }
}
