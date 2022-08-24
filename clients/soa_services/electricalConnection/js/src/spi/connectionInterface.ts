import { TypedEmitter } from "tiny-typed-emitter";
import {
  ConnectionInterfaceConfiguration,
  ConnectionInterface,
  ConstructableConnectionInterface,
  ConnectionInterfaceDescription,
  ConnectionInterfaceEvents,
} from "../connectionInterface";

type InterfaceType = "spi" | "spiSlave" | "spiMaster";
const InterfaceType: InterfaceType = "spi";
const InterfaceTypeSlave: InterfaceType = "spiSlave";
const InterfaceTypeMaster: InterfaceType = "spiMaster";

export enum Phase {
  SampleLeadingEdge,
  SetupLeadingEdge,
}

export enum Polarity {
  LeadingRisingEdge,
  LeadingFallingEdge,
}

export interface SPIConfiguration extends ConnectionInterfaceConfiguration {
  signals: { miso: string; mosi: string; sck: string; ss: string };
  representsAMaster: boolean;
  frequency: number;
  lsbFirst: boolean;
  clockPhase: Phase;
  clockPolarity: Polarity;
}

export type ReceiveByteEvent = {
  byte: number;
};

export interface SPISlaveInterfaceEvents extends ConnectionInterfaceEvents {
  prepareByte(event: ReceiveByteEvent): void;
}

export interface SPIMasterInterfaceEvents extends ConnectionInterfaceEvents {
  receiveByte(event: ReceiveByteEvent): void;
  slaveSelectChanged(event: ReceiveByteEvent): void;
}

type SPIInterfaceDataType = "SendByte" | "PrepareByte" | "SetSlaveSelect";

interface SPIInterfaceData {
  type: SPIInterfaceDataType;
  byte?: number;
  value?: boolean;
}

export class SPISlaveInterface
  extends TypedEmitter<SPISlaveInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceTypeSlave;
  readonly configuration: SPIConfiguration;

  constructor(configuration: SPIConfiguration) {
    super();
    this.configuration = configuration;
  }

  // TODO: add real implementation
  downstreamData(data: unknown): void {
    console.log(data);
  }

  sendByte(byte: number): void {
    const data: SPIInterfaceData = { type: "SendByte", byte: byte };
    this.emit("upstreamData", data);
    this.downstreamData(data);
  }

  setSlaveSelect(value: boolean): void {
    const data: SPIInterfaceData = { type: "SetSlaveSelect", value: value };
    this.emit("upstreamData", data);
    this.downstreamData(data);
  }
}

export class SPIMasterInterface
  extends TypedEmitter<SPIMasterInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceTypeMaster;
  readonly configuration: SPIConfiguration;

  constructor(configuration: SPIConfiguration) {
    super();
    this.configuration = configuration;
  }

  // TODO: add real implementation
  downstreamData(data: unknown): void {
    console.log(data);
  }

  prepareByte(byte: number): void {
    const data: SPIInterfaceData = { type: "PrepareByte", byte: byte };
    this.emit("upstreamData", data);
    this.downstreamData(data);
  }
}

export class ConstructableSPIInterface implements ConstructableConnectionInterface {
  interfaceType = InterfaceType;

  private signals: string[];

  constructor(signals: string[]) {
    this.signals = signals;
  }

  getDescription(): ConnectionInterfaceDescription {
    return {
      availableSignals: { spi: this.signals },
    };
  }

  create(configuration: SPIConfiguration): SPISlaveInterface | SPIMasterInterface {
    if (configuration.representsAMaster) {
      return new SPIMasterInterface(configuration);
    } else {
      return new SPISlaveInterface(configuration);
    }
  }
}
