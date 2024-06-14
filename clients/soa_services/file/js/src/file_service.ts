import {
  Consumer,
  DataChannel,
  PeerConnection,
  Producer,
  Service,
  ServiceConfiguration,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';

import { FileServiceEvent } from './messages';

type ServiceType = 'https://api.goldi-labs.de/serviceTypes/file';
const ServiceType: ServiceType = 'https://api.goldi-labs.de/serviceTypes/file';

export interface FileServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
}
function checkConfig(
  config: ServiceConfiguration,
): asserts config is FileServiceConfiguration {
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
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
    this.channel = channel;
  }

  async sendFile(fileType: string, content: Uint8Array) {
    if (this.channel !== undefined) {
      await this.channel.ready();
      this.channel.send(JSON.stringify({ fileType: fileType, length: content.length }));
      // fragment to 8kb chunks
      const chunkSize = 8192;
      for (let i = 0; i < content.length; i += chunkSize) {
        const chunk = content.slice(i, i + chunkSize);
        await this.channel.send(chunk.buffer);
      }
    }
  }
}

interface FileService__ConsumerEvents {
  file: (event: FileServiceEvent) => void;
}

export class FileService__Consumer
  extends TypedEmitter<FileService__ConsumerEvents>
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private header: any;
  private dataRead: number = 0;
  private dataBuffer: Uint8Array | undefined;
  handleData(data: string | Blob | ArrayBuffer | ArrayBufferView) {
    if (typeof data === 'string') {
      this.header = JSON.parse(data);
      this.dataRead = 0;
      this.dataBuffer = new Uint8Array(this.header.length);
    } else if (typeof data === 'object' && data instanceof ArrayBuffer) {
      const chunk = new Uint8Array(data);
      if (this.dataBuffer === undefined) {
        return; //ignore
      }
      if (this.dataRead + chunk.length > this.header.length) {
        //throw Error('Received more data than expected');
        return; //ignore
      }
      this.dataBuffer.set(chunk, this.dataRead);
      this.dataRead += chunk.length;
      if (this.dataRead === this.header.length) {
        this.emit('file', { file_type: this.header.fileType, file: this.dataBuffer });
        this.dataBuffer = undefined;
      }
    }
  }
}
