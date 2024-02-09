import {
  Consumer,
  Producer,
  Service,
  ServiceConfiguration,
} from '@cross-lab-project/soa-client';
import { DataChannel } from '@cross-lab-project/soa-client';
import { PeerConnection } from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';

import {
  ParameterDescription,
  ParameterServiceEvent,
  ParameterServiceSetupEvent,
} from './messages';

type ServiceType = 'https://api.goldi-labs.de/serviceTypes/parameter';
const ServiceType: ServiceType = 'https://api.goldi-labs.de/serviceTypes/parameter';

export interface MessageServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
  parameters: ParameterDescription[];
}
function checkConfig(
  config: ServiceConfiguration,
): asserts config is MessageServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    //throw Error("Service Configuration needs to be for MessageService type");
  }
}

interface ParameterService__ProducerEvents {
  setup: (event: ParameterServiceSetupEvent) => void;
}

export class ParameterService__Producer
  extends TypedEmitter<ParameterService__ProducerEvents>
  implements Service
{
  serviceType = ServiceType;
  serviceId: string;
  serviceDirection = Producer;
  channel?: DataChannel;

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
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
    this.channel = channel;
    this.emit('setup', { parameters: serviceConfig.parameters });
  }

  async updateParameter(parameter: string, value: number) {
    if (this.channel !== undefined) {
      await this.channel.ready();
      this.channel.send(JSON.stringify({ parameter: parameter, value: value }));
    }
  }
}

interface ParameterService__ConsumerEvents {
  update: (event: ParameterServiceEvent) => void;
}

export class ParameterService__Consumer
  extends TypedEmitter<ParameterService__ConsumerEvents>
  implements Service
{
  serviceType = ServiceType;
  serviceId: string;
  serviceDirection = Consumer;
  parameterDescriptions: ParameterDescription[];

  constructor(serviceId: string, parametersDescriptions: ParameterDescription[]) {
    super();
    this.parameterDescriptions = parametersDescriptions;
    this.serviceId = serviceId;
  }

  getMeta() {
    return {
      serviceType: this.serviceType,
      serviceId: this.serviceId,
      serviceDirection: this.serviceDirection,
      parameters: this.parameterDescriptions,
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
      this.emit('update', { parameter: msg.parameter, value: msg.value });
    }
  }
}
