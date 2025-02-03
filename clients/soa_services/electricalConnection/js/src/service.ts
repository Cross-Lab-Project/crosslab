import {
  DataChannel,
  PeerConnection,
  Prosumer,
  Service,
  ServiceConfiguration,
} from '@cross-lab-project/soa-client';
import Queue from 'queue';
import { TypedEmitter } from 'tiny-typed-emitter';

import {
  ConnectionInterface,
  ConnectionInterfaceConfiguration,
  ConstructableConnectionInterface,
} from './connectionInterface.js';

interface ConnectionInterfaceConfigurationUpstream
  extends ConnectionInterfaceConfiguration {
  interfaceType: string;
  interfaceId: string;
  busId: string;
}

interface ElectricalServiceMessage {
  busId: string;
  data: unknown;
}

type ServiceType = 'goldi/electrical';
const ServiceType: ServiceType = 'goldi/electrical';

export interface ElectricalServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
  interfaces: ConnectionInterfaceConfigurationUpstream[];
}
function checkConfig(
  config: ServiceConfiguration,
): asserts config is ElectricalServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    //throw Error("Service Configuration needs to be for electrical service type");
  }
}

export interface NewInterfaceEvent {
  connectionInterface: ConnectionInterface;
}

interface ElectricalConnectionServiceEvents {
  newInterface: (event: NewInterfaceEvent) => void;
}

type FullStateType<SignalType extends string> = Record<SignalType, any>

export class ElectricalConnectionService <ServiceId extends string=string, SignalType extends string=string>
  extends TypedEmitter<ElectricalConnectionServiceEvents>
  implements Service<ServiceType, ServiceId, FullStateType<SignalType>>
{
  serviceDirection = Prosumer;
  serviceType = ServiceType;
  serviceId: ServiceId;

  interfaceConstructors = new Map<string, ConstructableConnectionInterface>();
  interfaces = new Map<string, ConnectionInterface>();
  interfacesByBusId = new Map<string, string[]>();
  signals: string[];

  queue: Queue;

  constructor(serviceId: ServiceId, signals: SignalType[]) {
    super();
    this.serviceId = serviceId;
    this.signals = signals;
    this.queue = new Queue({ autostart: false, concurrency: 1 });
  }

  
  getMeta() {
    const interfaceDescriptions = Array.from(this.interfaceConstructors).map(
      constructors => {
        return {
          ...constructors[1].getDescription(),
          interfaceType: constructors[1].interfaceType,
        };
      },
    );
    return {
      serviceType: ServiceType,
      serviceId: this.serviceId,
      serviceDirection: this.serviceDirection,
      interfaces: interfaceDescriptions,
    };
  }

  get_state(): FullStateType<SignalType> {
    let state: FullStateType<SignalType> = {} as FullStateType<SignalType>;
    for(const [_id, i] of this.interfaces){
      const interfaceState = i.get_state()
      for(const signal in interfaceState){
        state[signal as SignalType]={...state[signal as SignalType], ...interfaceState[signal]}
      }
    }
    return state
  }

  addInterface(electricalInterfaceConstructor: ConstructableConnectionInterface): void {
    this.interfaceConstructors.set(
      electricalInterfaceConstructor.interfaceType,
      electricalInterfaceConstructor,
    );
  }

  retransmit() {
    for (const i of this.interfaces.values()) {
      i.retransmit();
    }
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);

    const channel = new DataChannel();
    channel.ondata = this.handleData.bind(this);
    channel.ready().then(() => {
      this.retransmit();
    });

    for (const interfaceConfig of serviceConfig.interfaces) {
      // find interface or create a new interface
      let electricalInterface = this.interfaces.get(interfaceConfig.interfaceId);
      if (electricalInterface === undefined) {
        const electricalInterfaceConstructor = this.interfaceConstructors.get(
          interfaceConfig.interfaceType,
        );
        if (electricalInterfaceConstructor === undefined) {
          throw Error('No Interface for the interface config was found');
        }
        electricalInterface = electricalInterfaceConstructor.create(interfaceConfig);
        this.interfaces.set(interfaceConfig.interfaceId, electricalInterface);
        this.emit('newInterface', { connectionInterface: electricalInterface });
      }

      // set event handlers
      electricalInterface.on('upstreamData', async data => {
        const packet: ElectricalServiceMessage = {
          busId: interfaceConfig.busId,
          data,
        };
        this.queue.push(async () => {
          try {
            channel.send(JSON.stringify(packet));
          } catch (error) {
            console.error(error);
          }
        });

        await channel.ready();
        try {
          this.queue.start();
        } catch (error) {
          //ignorw
        }
      });

      // find the bus set or create a new one
      let busSet = this.interfacesByBusId.get(interfaceConfig.busId);
      if (busSet === undefined) {
        busSet = [];
        this.interfacesByBusId.set(interfaceConfig.busId, busSet);
      }
      busSet.push(interfaceConfig.interfaceId);
    }

    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
  }

  initializeConnection(): void {
    /*this.interfaces.forEach((_v) => {
      //v.init();
    });*/
  }

  handleData(data: string | Blob | ArrayBuffer | ArrayBufferView): void {
    if (typeof data === 'string') {
      const message: ElectricalServiceMessage = JSON.parse(data);
      const electricalInterfaceIds = this.interfacesByBusId.get(message.busId);
      if (electricalInterfaceIds === undefined) {
        return; // gracefully ignore - possibly the result of other services connected to the same connection
      }
      for (const electricalInterfaceId of electricalInterfaceIds) {
        const electricalInterface = this.interfaces.get(electricalInterfaceId);
        if (electricalInterface === undefined) {
          throw Error('ElectricalInterface not found');
        }
        electricalInterface.downstreamData(message.data);
      }
    } else {
      throw Error('Data is not a string');
    }
  }
}
