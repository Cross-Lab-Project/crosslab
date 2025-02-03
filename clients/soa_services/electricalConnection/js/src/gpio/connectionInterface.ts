import { TypedEmitter } from 'tiny-typed-emitter';

import {
  ConnectionInterface,
  ConnectionInterfaceConfiguration,
  ConnectionInterfaceDescription,
  ConnectionInterfaceEvents,
  ConstructableConnectionInterface,
} from '../connectionInterface.js';

type InterfaceType = 'gpio';
const InterfaceType: InterfaceType = 'gpio';

export interface GPIOConfiguration extends ConnectionInterfaceConfiguration {
  signals: { gpio: string };
  driver: string;
  direction?: 'in' | 'out' | 'inout';
}

export enum GPIOState {
  'Unknown' = 'unknown',
  'Error' = 'error',
  'StrongLow' = 'strongL',
  'StrongHigh' = 'strongH',
  'HighZ' = 'highZ',
  'WeakLow' = 'weakL',
  'WeakHigh' = 'weakH',
}

interface GPIOInterfaceData {
  driver: string;
  state: GPIOState;
}

type SignalChangeEvent = {
  state: GPIOState;
  oldState: GPIOState;
};

export interface GPIOInterfaceEvents extends ConnectionInterfaceEvents {
  // The signalChange is fired when the signal state (composed of all drivers) is changed
  signalChange(event: SignalChangeEvent): void;
}

export class GPIOInterface
  extends TypedEmitter<GPIOInterfaceEvents>
  implements ConnectionInterface
{
  interfaceType = InterfaceType;

  //readonly signal: string;

  readonly configuration: GPIOConfiguration; // TODO: Deprecate this
  signalState: GPIOState = GPIOState.Unknown;
  private driverStates = new Map<string, GPIOState>();
  private driverState: GPIOState = GPIOState.Unknown;
  private driver?: string;
  readonly signal: string;

  constructor(configuration: GPIOConfiguration) {
    super();
    this.configuration = configuration;
    this.signal = configuration.signals.gpio;
    const dir = configuration.direction ?? 'inout';
    if (dir != 'in') {
      this.driver = configuration.driver ?? 'default';
    }
  }

  get_state() {
    return {
      [this.configuration.signals.gpio]: {gpio: this.signalState}
    }
  }

  // changes the driver of this device
  changeDriver(state: GPIOState) {
    if (this.driver && this.driverState !== state) {
      this.driverState = state;
      const data: GPIOInterfaceData = { driver: this.driver, state: state };
      this.emit('upstreamData', data);
      this.downstreamData(data); // use the same mechanismn as any other driver data from external devices
    }
  }

  retransmit() {
    if (this.driver) {
      const data: GPIOInterfaceData = {
        driver: this.driver,
        state: this.driverState,
      };
      this.emit('upstreamData', data);
    }
  }

  downstreamData(data: GPIOInterfaceData) {
    this.driverStates.set(data.driver, data.state);
    this.evaluateSignalState();
  }

  private evaluateSignalState() {
    const states = new Set<GPIOState>();
    for (const [_driver, state] of this.driverStates) {
      states.add(state);
    }

    let newState: GPIOState = GPIOState.HighZ;
    if (states.has(GPIOState.Error)) {
      newState = GPIOState.Error;
    } else if (states.has(GPIOState.StrongHigh) && states.has(GPIOState.StrongLow)) {
      newState = GPIOState.Error;
    } else if (states.has(GPIOState.Unknown)) {
      newState = GPIOState.Unknown;
    } else if (states.has(GPIOState.StrongHigh)) {
      newState = GPIOState.StrongHigh;
    } else if (states.has(GPIOState.StrongLow)) {
      newState = GPIOState.StrongLow;
    } else if (states.has(GPIOState.WeakHigh) && states.has(GPIOState.WeakLow)) {
      newState = GPIOState.Unknown;
    } else if (states.has(GPIOState.WeakHigh)) {
      newState = GPIOState.WeakHigh;
    } else if (states.has(GPIOState.WeakLow)) {
      newState = GPIOState.WeakLow;
    }

    if (newState !== this.signalState) {
      const event = { oldState: this.signalState, state: newState };
      this.signalState = newState;
      this.emit('signalChange', event);
    }
  }
}

export class ConstructableGPIOInterface implements ConstructableConnectionInterface {
  interfaceType: InterfaceType = InterfaceType;

  private gpios: string[];

  constructor(gpios: string[]) {
    this.gpios = gpios;
  }

  getDescription(): ConnectionInterfaceDescription {
    return {
      availableSignals: { gpio: this.gpios },
    };
  }

  create(configuration: GPIOConfiguration): GPIOInterface {
    return new GPIOInterface(configuration);
  }
}
