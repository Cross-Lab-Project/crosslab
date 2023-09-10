import { TypedEmitter } from 'tiny-typed-emitter';

import { ConnectionInterfaceEvents } from '../connectionInterface';
import {
  ConnectionInterface,
  ConnectionInterfaceConfiguration,
  ConnectionInterfaceDescription,
  ConstructableConnectionInterface,
} from '../connectionInterface';

type InterfaceType = 'twi' | 'twiSlave' | 'twiMaster';
const InterfaceType: InterfaceType = 'twi';
const InterfaceTypeSlave: InterfaceType = 'twiSlave';
const InterfaceTypeMaster: InterfaceType = 'twiMaster';

export interface TWIConfiguration extends ConnectionInterfaceConfiguration {
  signals: { scl: string; sda: string };
  frequency: number;
  isMaster: boolean;
  address: number;
}

export type ReceiveByteEvent = {
  byte: number;
};

export interface TWISlaveInterfaceEvents extends ConnectionInterfaceEvents {
  receiveByte(event: ReceiveByteEvent): void;
}

export interface TWIMasterInterfaceEvents extends ConnectionInterfaceEvents {
  prepareByte(event: ReceiveByteEvent): void;
}

type TWIInterfaceDataType = 'SendByte' | 'PrepareByte' | 'SendAddress';

interface TWIInterfaceData {
  type: TWIInterfaceDataType;
  byte?: number;
  address?: number;
  read?: boolean;
}

export class TWIMasterInterface
  extends TypedEmitter<TWIMasterInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceTypeMaster;
  readonly configuration: TWIConfiguration;

  constructor(configuration: TWIConfiguration) {
    super();
    this.configuration = configuration;
  }

  retransmit(): void {
    throw new Error('Method not implemented.');
  }

  // TODO: add real implementation
  downstreamData(data: unknown): void {
    console.log(data);
  }

  sendByte(byte: number): void {
    const data: TWIInterfaceData = { type: 'SendByte', byte: byte };
    this.emit('upstreamData', data);
    this.downstreamData(data);
  }

  sendAddress(address: number, read: boolean): void {
    const data: TWIInterfaceData = {
      type: 'SendAddress',
      address: address,
      read: read,
    };
    this.emit('upstreamData', data);
    this.downstreamData(data);
  }
}

export class TWISlaveInterface
  extends TypedEmitter<TWISlaveInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceTypeSlave;
  readonly configuration: TWIConfiguration;

  constructor(configuration: TWIConfiguration) {
    super();
    this.configuration = configuration;
  }

  retransmit(): void {
    throw new Error('Method not implemented.');
  }

  // TODO: add real implementation
  downstreamData(data: unknown): void {
    console.log(data);
  }

  prepareByte(byte: number): void {
    const data: TWIInterfaceData = { type: 'PrepareByte', byte: byte };
    this.emit('upstreamData', data);
    this.downstreamData(data);
  }
}

export class ConstructableTWIInterface implements ConstructableConnectionInterface {
  interfaceType = InterfaceType;

  private signals: string[];

  constructor(signals: string[]) {
    this.signals = signals;
  }

  getDescription(): ConnectionInterfaceDescription {
    return {
      availableSignals: { twi: this.signals },
    };
  }

  create(configuration: TWIConfiguration): TWIMasterInterface | TWISlaveInterface {
    if (configuration.isMaster) {
      return new TWIMasterInterface(configuration);
    } else {
      return new TWISlaveInterface(configuration);
    }
  }
}
