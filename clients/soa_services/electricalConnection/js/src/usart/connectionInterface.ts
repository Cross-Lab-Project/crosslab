import { TypedEmitter } from "tiny-typed-emitter";
import {
  ConnectionInterfaceConfiguration,
  ConnectionInterface,
  ConstructableConnectionInterface,
  ConnectionInterfaceDescription,
  ConnectionInterfaceEvents,
} from "../connectionInterface";

type InterfaceType = "usart";
const InterfaceType: InterfaceType = "usart";

export enum ClockSetting {
  TransmitRisingSampleFalling,
  TransmitFallingSampleRising,
}

export interface USARTConfiguration extends ConnectionInterfaceConfiguration {
  signals: { txd: string; rxd: string; xck: string };
  baudRate: number;
  frameLength: number;
  isMaster: boolean;
  clockSetting: ClockSetting;
  transmitterEnabled: boolean;
  receiverEnabled: boolean;
}

export type ReceiveFrameEvent = {
  frame: number;
};

export interface USARTInterfaceEvents extends ConnectionInterfaceEvents {
  receiveFrame(event: ReceiveFrameEvent): void;
}

export class USARTInterface
  extends TypedEmitter<USARTInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceType;
  readonly configuration: USARTConfiguration;

  constructor(configuration: USARTConfiguration) {
    super();
    this.configuration = configuration;
  }
  
  retransmit(): void {
    throw new Error("Method not implemented.");
  }

  // TODO: add real implementation
  downstreamData(data: unknown): void {
    console.log(data);
  }

  sendFrame(frame: number): void {
    this.emit("upstreamData", frame);
    this.downstreamData(frame);
  }
}

export class ConstructableUSARTInterface implements ConstructableConnectionInterface {
  interfaceType = InterfaceType;

  private signals: string[];

  constructor(signals: string[]) {
    this.signals = signals;
  }

  getDescription(): ConnectionInterfaceDescription {
    return {
      availableSignals: { usart: this.signals },
    };
  }

  create(configuration: USARTConfiguration): USARTInterface {
    return new USARTInterface(configuration);
  }
}
