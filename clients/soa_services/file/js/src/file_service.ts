import {Consumer, Producer, Service, ServiceConfiguration} from '@cross-lab-project/soa-client';
import {DataChannel} from '@cross-lab-project/soa-client';
import {PeerConnection} from '@cross-lab-project/soa-client';
import {TypedEmitter} from 'tiny-typed-emitter';

import {FileServiceEvent} from './messages';

type ServiceType = 'https://api.goldi-labs.de/serviceTypes/file';
const ServiceType: ServiceType = 'https://api.goldi-labs.de/serviceTypes/file';

export interface FileServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
}
function checkConfig(config: ServiceConfiguration): asserts config is FileServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    //throw Error("Service Configuration needs to be for FileService type");
  }
}

export class FileService__Producer implements Service {
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
      connection.transmit(serviceConfig, "data", channel);
    } else {
      connection.receive(serviceConfig, "data", channel);
    }
    this.channel = channel;
  }

  async sendFile(fileType: string, content: Uint8Array) {
    if (this.channel !== undefined) {
      await this.channel.ready();
      this.channel.send(JSON.stringify({fileType: fileType, length: content.length}));
      this.channel.send(content);
    }
  }
}

export interface FileService__ConsumerEvents {
  file: (event: FileServiceEvent) => void;
}

export class FileService__Consumer extends TypedEmitter<FileService__ConsumerEvents> implements Service {
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
      connection.transmit(serviceConfig, "data", channel);
    } else {
      connection.receive(serviceConfig, "data", channel);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private header: any;
  handleData(data: string | Blob | ArrayBuffer | ArrayBufferView) {
    if (typeof data === 'string') {
      this.header = JSON.parse(data);
    } else if (typeof data === 'object' && data instanceof ArrayBuffer) {
      const content = new Uint8Array(data);
      this.emit('file', {file_type: this.header.fileType, file: content});
    }
  }
}
