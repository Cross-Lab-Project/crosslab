import json
from typing import Any, Dict, List

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from pyee import AsyncIOEventEmitter

from crosslab.soa_services.electrical import (
    ConstructableSignalInterface,
    SignalInterface,
)
from crosslab.soa_services.electrical.schema import (
    ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration as SignalInterfaceConfiguration,
)
from crosslab.soa_services.electrical.schema import (
    electrical_service_configuration_read_from_dict,
)


class ElectricalConnectionService(Service, AsyncIOEventEmitter):
    service_type = "goldi/electrical"
    service_id: str
    interfaces: Dict[str, SignalInterface]
    interfaces_constructors: Dict[str, ConstructableSignalInterface]
    interfaces_by_bus_id: Dict[str, List[SignalInterface]]

    def __init__(self, serviceId: str):
        super().__init__()
        self.interfaces = dict()
        self.interfaces_constructors = dict()
        self.interfaces_by_bus_id = dict()
        self.service_id = serviceId

    def addInterface(self, interface: ConstructableSignalInterface):
        self.interfaces_constructors[interface.interfaceType] = interface

    def getMeta(self):
        return {
            "serviceType": self.service_type,
            "serviceId": self.service_id,
            "serviceDirection": "prosumer",
            "interfaces": [
                {"interfaceType": i.interfaceType, **i.getDescription()}
                for i in self.interfaces_constructors.values()
            ],
        }

    def _findOrCreateInterface(
        self,
        interfaceConfig: SignalInterfaceConfiguration,
    ):
        if interfaceConfig.interface_id in self.interfaces:
            return self.interfaces[interfaceConfig.interface_id]
        else:
            interfaceConstructor = self.interfaces_constructors[
                interfaceConfig.interface_type
            ]
            interface = interfaceConstructor.create(interfaceConfig)
            self.interfaces[interfaceConfig.interface_id] = interface
            self.emit("newInterface", interface)
            return interface

    def retransmit(self):
        for interface in self.interfaces.values():
            interface.retransmit()

    def setupConnection(
        self,
        connection: Connection,
        serviceConfig: Any,
    ):
        parsedServiceConfig = electrical_service_configuration_read_from_dict(
            serviceConfig
        )
        channel = DataChannel()
        channel.on("data", lambda data: self.handleData(data))
        channel.on("open", lambda: self.retransmit())

        for interfaceConfig in parsedServiceConfig.interfaces:
            signalInterface = self._findOrCreateInterface(interfaceConfig)
            signalInterface.on(
                "upstreamData",
                lambda data, busId=interfaceConfig.bus_id: channel.send(
                    json.dumps({"busId": busId, "data": data.to_dict()})
                ),
            )
            interfaceList = self.interfaces_by_bus_id.get(interfaceConfig.bus_id, None)
            if interfaceList is None:
                self.interfaces_by_bus_id[interfaceConfig.bus_id] = []
            self.interfaces_by_bus_id[interfaceConfig.bus_id].append(signalInterface)

        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", channel)
        else:
            connection.receive(serviceConfig, "data", channel)

    def handleData(self, data: str):
        message = json.loads(data)
        interfaces = self.interfaces_by_bus_id.get(message["busId"])
        if interfaces is not None:
            for interface in interfaces:
                interface.downstreamData(message["data"])
        else:
            pass
