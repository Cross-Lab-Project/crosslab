import { TypedEmitter } from "tiny-typed-emitter";
import {
  ConstructableConnectionInterface,
  ConnectionInterfaceDescription,
  ConnectionInterface,
  ConnectionInterfaceEvents,
  ConnectionInterfaceConfiguration,
} from "../connectionInterface";

type InterfaceType = "gpio";
const InterfaceType: InterfaceType = "gpio";

export interface GPIOConfiguration extends ConnectionInterfaceConfiguration {
  signals: { gpio: string };
  driver: string;
}

export enum GPIOState {
  "Unknown",
  "Error",
  "StrongLow",
  "StrongHigh",
  "HighZ",
  "WeakLow",
  "WeakHigh",
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

  readonly configuration: GPIOConfiguration;
  signalState: GPIOState = GPIOState.Unknown;
  private driverStates = new Map<string, GPIOState>();
  private lastDriverState: GPIOState = GPIOState.Unknown;

  constructor(configuration: GPIOConfiguration) {
    super();
    this.configuration = configuration;
  }

  // changes the driver of this device
  changeDriver(state: GPIOState) {
    if (state != this.lastDriverState) {
      this.lastDriverState = state;
      const data: GPIOInterfaceData = {
        driver: this.configuration.driver,
        state: state,
      };

      this.emit("upstreamData", data);
      this.downstreamData(data); // use the same mechanismn as any other driver data from external devices
    }
  }

  // handles downstream data
  downstreamData(data: GPIOInterfaceData) {
    this.driverStates.set(data.driver, data.state);
    this.evaluateSignalState();
  }

  private evaluateSignalState() {
    const states = new Set<GPIOState>();
    for (const [_driver, state] of this.driverStates) {
      states.add(state);
    }

    let newState: GPIOState = GPIOState.Unknown;
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
      this.emit("signalChange", event);
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
