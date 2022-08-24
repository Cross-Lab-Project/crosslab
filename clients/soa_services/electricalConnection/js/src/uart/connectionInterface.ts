import { TypedEmitter } from "tiny-typed-emitter";
import {
  ConnectionInterfaceConfiguration,
  ConnectionInterface,
  ConstructableConnectionInterface,
  ConnectionInterfaceDescription,
  ConnectionInterfaceEvents,
} from "../connectionInterface";

type InterfaceType = "uart";
const InterfaceType: InterfaceType = "uart";

export interface UARTConfiguration extends ConnectionInterfaceConfiguration {
  signals: { txd: string; rxd: string };
  baudRate: number;
  frameLength: number;
  transmitterEnabled: boolean;
  receiverEnabled: boolean;
}

export type ReceiveFrameEvent = {
  frame: number;
};

export interface UARTInterfaceEvents extends ConnectionInterfaceEvents {
  receiveFrame(event: ReceiveFrameEvent): void;
}

export class UARTInterface
  extends TypedEmitter<UARTInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceType;
  readonly configuration: UARTConfiguration;

  constructor(configuration: UARTConfiguration) {
    super();
    this.configuration = configuration;
  }

  // TODO: add real implementation
  downstreamData(data: unknown): void {
    console.log(data);
  }

  sendFrame(frame: number): void {
    this.emit("upstreamData", frame);
  }
}

export class ConstructableUARTInterface implements ConstructableConnectionInterface {
  interfaceType = InterfaceType;

  private signals: string[];

  constructor(signals: string[]) {
    this.signals = signals;
  }

  getDescription(): ConnectionInterfaceDescription {
    return {
      availableSignals: { uart: this.signals },
    };
  }

  create(configuration: UARTConfiguration): UARTInterface {
    return new UARTInterface(configuration);
  }
}
