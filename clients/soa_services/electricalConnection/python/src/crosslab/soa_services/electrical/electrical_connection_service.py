import json
from typing import Dict, List

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_services.electrical import (
    ConstructableSignalInterface,
    SignalInterface,
)
from crosslab.soa_services.electrical.messages import (
    ElectricalServiceConfig,
    SignalInterfaceConfig,
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
        interfaceConfig: SignalInterfaceConfig,
    ):
        if interfaceConfig["interfaceId"] in self.interfaces:
            return self.interfaces[interfaceConfig["interfaceId"]]
        else:
            interfaceConstructor = self.interfaces_constructors[
                interfaceConfig["interfaceType"]
            ]
            interface = interfaceConstructor.create(interfaceConfig)
            self.interfaces[interfaceConfig["interfaceId"]] = interface
            self.emit("newInterface", interface)
            return interface

    def retransmit(self):
        for interface in self.interfaces.values():
            interface.retransmit()

    def setupConnection(
        self,
        connection: Connection,
        serviceConfig: ElectricalServiceConfig,
    ):
        channel = DataChannel()
        channel.on("data", lambda data: self.handleData(data))
        channel.on("open", lambda: self.retransmit())

        for interfaceConfig in serviceConfig["interfaces"]:
            signalInterface = self._findOrCreateInterface(interfaceConfig)
            signalInterface.on(
                "upstreamData",
                lambda data, busId=interfaceConfig["busId"]: channel.send(
                    json.dumps({"busId": busId, "data": data})
                ),
            )
            interfaceList = self.interfaces_by_bus_id.get(
                interfaceConfig["busId"], None
            )
            if interfaceList is None:
                self.interfaces_by_bus_id[interfaceConfig["busId"]] = []
            self.interfaces_by_bus_id[interfaceConfig["busId"]].append(signalInterface)

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
