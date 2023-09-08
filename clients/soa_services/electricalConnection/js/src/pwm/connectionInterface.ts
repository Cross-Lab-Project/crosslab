import { TypedEmitter } from 'tiny-typed-emitter';

import {
  ConnectionInterface,
  ConnectionInterfaceConfiguration,
  ConnectionInterfaceDescription,
  ConnectionInterfaceEvents,
  ConstructableConnectionInterface,
} from '../connectionInterface';

type InterfaceType = 'pwm';
const InterfaceType: InterfaceType = 'pwm';

export interface PWMConfiguration extends ConnectionInterfaceConfiguration {
  signals: { ocn: string };
}

export type PWMSignal = {
  period: number; //in seconds as float
  dutyTime: number; //in seconds as float
};

export type ReceivePWMSignalEvent = {
  pwmSignal: PWMSignal;
};

export interface PWMInterfaceEvents extends ConnectionInterfaceEvents {
  receivePWM(event: ReceivePWMSignalEvent): void;
}

export class PWMInterface
  extends TypedEmitter<PWMInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceType;
  readonly configuration: PWMConfiguration;

  constructor(configuration: PWMConfiguration) {
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

  sendPWMSignal(pwmSignal: PWMSignal): void {
    this.emit('upstreamData', pwmSignal);
    this.downstreamData(pwmSignal);
  }
}

export class ConstructablePWMInterface implements ConstructableConnectionInterface {
  interfaceType = InterfaceType;

  private signals: string[];

  constructor(signals: string[]) {
    this.signals = signals;
  }

  getDescription(): ConnectionInterfaceDescription {
    return {
      availableSignals: { pwm: this.signals },
    };
  }

  create(configuration: PWMConfiguration): PWMInterface {
    return new PWMInterface(configuration);
  }
}
