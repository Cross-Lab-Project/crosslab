
import { TypedEmitter } from "tiny-typed-emitter";
import { ServiceConfiguration } from "../../devicehandler/deviceMessages";
import { MediaChannel } from "../../devicehandler/peer/channel";
import { PeerConnection } from "../../devicehandler/peer/connection";
import { Service, Producer, Consumer } from "../../devicehandler/service";

type ServiceType = "goldi/webcam";
const ServiceType: ServiceType = "goldi/webcam";

export interface WebcamServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
}
function checkConfig(config: ServiceConfiguration): asserts config is WebcamServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    throw Error("Service Configuration needs to be for Webcamservice type");
  }
}

export class WebcamService__Producer implements Service<ServiceType> {
  serviceType = ServiceType;
  serviceDirection = Producer;
  serviceId: string;

  track: MediaStreamTrack;

  constructor(track: MediaStreamTrack, serviceId: string) {
    this.serviceId = serviceId;
    this.track = track;
  }

  getMeta() {
    return {
      serviceId: this.serviceId,
      serviceType: ServiceType,
      serviceDirection: this.serviceDirection,
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);
    const channel = new MediaChannel(this.track);
    connection.transmit(serviceConfig, "video", channel);
  }
}
interface WebcamService__Consumer_Events {
  track: (event: { track: MediaStreamTrack }) => void;
}
export class WebcamService__Consumer
  extends TypedEmitter<WebcamService__Consumer_Events>
  implements Service<ServiceType>
{
  serviceType = ServiceType;
  serviceDirection = Consumer;
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

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);
    const channel = new MediaChannel();
    channel.ontrack = (event) => this.emit("track", event);
    connection.receive(serviceConfig, "video", channel);
  }
}
