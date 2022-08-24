import { TypedEmitter } from "tiny-typed-emitter";
import { ServiceConfiguration } from "../../devicehandler/deviceMessages";
import { DataChannel } from "../../devicehandler/peer/channel";
import { PeerConnection } from "../../devicehandler/peer/connection";
import { Service, ServiceDirection, Producer, Consumer } from "../../devicehandler/service";

type ServiceType = "goldi/file";
const ServiceType: ServiceType = "goldi/file";

export interface FileServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
}
function checkConfig(config: ServiceConfiguration): asserts config is FileServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    throw Error("Service Configuration needs to be for FileService type");
  }
}

export enum FileType {
  "Hex" = 0,
  "Elf" = 1,
}

export interface ReceiveFileEvent {
  file: Uint8Array;
}

export interface File {
  fileType: FileType;
  content: Uint8Array;
}

// maybe rename or move to Interface if defined later
export interface FileInterfaceEvents {
  receiveHex(event: ReceiveFileEvent): void;
  receiveElf(event: ReceiveFileEvent): void;
}

abstract class FileService
  extends TypedEmitter<FileInterfaceEvents>
  implements Service<ServiceType>
{
  serviceType = ServiceType;
  abstract serviceDirection: ServiceDirection;
  serviceId: string;

  constructor(serviceId: string) {
    super();
    this.serviceId = serviceId;
  }

  getMeta() {
    return {
      serviceId: this.serviceId,
      serviceType: ServiceType,
      serviceDirection: this.serviceDirection,
    };
  }

  abstract setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void;
}

/**
 * - maybe it would also suffice to just use the Prosumer ServiceDirection
 * - maybe move sendFile function to an interface
 */

export class FileService__Producer extends FileService {
  serviceDirection = Producer;
  channel?: DataChannel;

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);
    const channel = new DataChannel();
    connection.transmit(serviceConfig, "data", channel);
    this.channel = channel;
  }

  async sendFile(file: File) {
    if (this.channel !== undefined) {
      await this.channel.ready();
      this.channel.send(JSON.stringify(file));
    }
  }
}

export class FileService__Consumer extends FileService {
  serviceDirection = Consumer;

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);
    const channel = new DataChannel();
    channel.ondata = this.handleData.bind(this);
    connection.receive(serviceConfig, "data", channel);
  }

  handleData(data: string) {
    const file: File = JSON.parse(data);
    switch (file.fileType) {
      case FileType["Hex"]: {
        this.emit("receiveHex", { file: file.content });
        break;
      }
      case FileType["Elf"]: {
        this.emit("receiveElf", { file: file.content });
        break;
      }
      default: {
        throw Error("No supported FileType found");
      }
    }
  }
}
