import { TypedEmitter } from 'tiny-typed-emitter';

export interface ConnectionInterfaceConfiguration {
  signals: { [role: string]: string };
}
export interface ConnectionInterfaceDescription {
  availableSignals: { [role: string]: string[] };
}

export interface ConnectionInterfaceEvents {
  upstreamData(data: unknown): void;
}
export interface ConnectionInterface extends TypedEmitter<ConnectionInterfaceEvents> {
  readonly interfaceType: string;
  readonly configuration: ConnectionInterfaceConfiguration;

  downstreamData(data: unknown): void;
  retransmit(): void;
}

export interface ConstructableConnectionInterface {
  readonly interfaceType: string;
  getDescription(): ConnectionInterfaceDescription;

  create(config: ConnectionInterfaceConfiguration): ConnectionInterface;
}
