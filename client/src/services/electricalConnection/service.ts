import { TypedEmitter } from "tiny-typed-emitter";
import { ServiceConfiguration } from "../../devicehandler/deviceMessages";
import { DataChannel } from "../../devicehandler/peer/channel";
import { PeerConnection } from "../../devicehandler/peer/connection";
import { Service, Prosumer } from "../../devicehandler/service";

import {
  ConnectionInterface,
  ConnectionInterfaceConfiguration,
  ConstructableConnectionInterface,
} from "./connectionInterface";

interface ConnectionInterfaceConfigurationUpstream extends ConnectionInterfaceConfiguration {
  interfaceType: string;
  interfaceId: string;
  busId: string;
}

interface ElectricalServiceMessage {
  busId: string;
  data: unknown;
}

type ServiceType = "goldi/electrical";
const ServiceType: ServiceType = "goldi/electrical";

export interface ElectricalServiceConfiguration extends ServiceConfiguration {
  serviceType: ServiceType;
  interfaces: ConnectionInterfaceConfigurationUpstream[];
}
function checkConfig(
  config: ServiceConfiguration
): asserts config is ElectricalServiceConfiguration {
  if (config.serviceType !== ServiceType) {
    //throw Error("Service Configuration needs to be for electrical service type");
  }
}

interface NewInterfaceEvent {
  connectionInterface: ConnectionInterface;
}

interface ElectricalConnectionServiceEvents {
  newInterface: (event: NewInterfaceEvent) => void;
}

export class ElectricalConnectionService
  extends TypedEmitter<ElectricalConnectionServiceEvents>
  implements Service<ServiceType>
{
  serviceDirection = Prosumer;
  serviceType = ServiceType;
  serviceId: string;

  interfaceConstructors = new Map<string, ConstructableConnectionInterface>();
  interfaces = new Map<string, ConnectionInterface>();
  interfacesByBusId = new Map<string, string[]>();
  signals: string[];

  constructor(serviceId: string, signals: string[]) {
    super();
    this.serviceId = serviceId;
    this.signals = signals;
  }

  getMeta() {
    const interfaceDescriptions = Array.from(this.interfaceConstructors).map((constructors) => {
      return { ...constructors[1].getDescription(), interfaceType: constructors[1].interfaceType };
    });
    return {
      serviceType: ServiceType,
      serviceId: this.serviceId,
      serviceDirection: this.serviceDirection,
      interfaces: interfaceDescriptions,
    };
  }

  addInterface(electricalInterfaceConstructor: ConstructableConnectionInterface): void {
    this.interfaceConstructors.set(
      electricalInterfaceConstructor.interfaceType,
      electricalInterfaceConstructor
    );
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    checkConfig(serviceConfig);

    const channel = new DataChannel();
    channel.ondata = this.handleData.bind(this);
    channel.ready().then(() => {
      this.initializeConnection();
    });

    for (const interfaceConfig of serviceConfig.interfaces) {
      // find interface or create a new interface
      let electricalInterface = this.interfaces.get(interfaceConfig.interfaceId);
      if (electricalInterface === undefined) {
        const electricalInterfaceConstructor = this.interfaceConstructors.get(
          interfaceConfig.interfaceType
        );
        if (electricalInterfaceConstructor === undefined) {
          throw Error("No Interface for the interface config was found");
        }
        electricalInterface = electricalInterfaceConstructor.create(interfaceConfig);
        this.interfaces.set(interfaceConfig.interfaceId, electricalInterface);
        this.emit("newInterface", { connectionInterface: electricalInterface });
      }

      // set event handlers
      electricalInterface.on("upstreamData", async (data) => {
        const packet: ElectricalServiceMessage = {
          busId: interfaceConfig.busId,
          data,
        };
        await channel.ready();
        channel.send(JSON.stringify(packet));
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
      connection.transmit(serviceConfig, "data", channel);
    } else {
      connection.receive(serviceConfig, "data", channel);
    }
  }

  initializeConnection(): void {
    /*this.interfaces.forEach((_v) => {
      //v.init();
    });*/
  }

  handleData(data: string): void {
    const message: ElectricalServiceMessage = JSON.parse(data);
    const electricalInterfaceIds = this.interfacesByBusId.get(message.busId);
    if (electricalInterfaceIds === undefined) {
      throw Error("BusId not found");
    }
    for (const electricalInterfaceId of electricalInterfaceIds) {
      const electricalInterface = this.interfaces.get(electricalInterfaceId);
      if (electricalInterface === undefined) {
        throw Error("ElectricalInterface not found");
      }
      electricalInterface.downstreamData(message.data);
    }
  }
}
