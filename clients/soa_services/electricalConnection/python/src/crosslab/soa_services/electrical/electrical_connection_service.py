import json
from dataclasses import dataclass
from typing import Callable, Dict, Set

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


@dataclass
class SignalInterfaceMeta:
    upstreamDataFuns: Set[Callable]
    busIds: Set[str]
    id: str


@dataclass
class ConnectionMeta:
    interfaces: Set[SignalInterface]
    interface_meta: Dict[SignalInterface, SignalInterfaceMeta]


class ElectricalConnectionService(Service, AsyncIOEventEmitter):
    service_type = "http://api.goldi-labs.de/serviceTypes/electrical"
    service_id: str
    _interfaces: Dict[str, SignalInterface]
    _interfaces_constructors: Dict[str, ConstructableSignalInterface]
    _interface_id_ref_counter: Dict[str, int]
    _connection_meta: Dict[Connection, ConnectionMeta]

    def __init__(self, serviceId: str):
        super().__init__()
        self._interfaces = dict()
        self._interfaces_constructors = dict()
        self._interface_id_ref_counter = dict()
        self._connection_meta = dict()
        self.service_id = serviceId

    def addInterface(self, interface: ConstructableSignalInterface):
        self._interfaces_constructors[interface.interfaceType] = interface

    def getMeta(self):
        return {
            "serviceType": self.service_type,
            "serviceId": self.service_id,
            "serviceDirection": "prosumer",
            "interfaces": [
                {"interfaceType": i.interfaceType, **i.getDescription()}
                for i in self._interfaces_constructors.values()
            ],
        }

    def _findOrCreateInterface(self, id: str, interfaceConfig: SignalInterfaceConfig):
        if interfaceConfig["interfaceId"] in self._interfaces:
            return self._interfaces[interfaceConfig["interfaceId"]]
        else:
            return self._createInterface(id, interfaceConfig)

    def _createInterface(self, id: str, interfaceConfig: SignalInterfaceConfig):
        interfaceConstructor = self._interfaces_constructors[
            interfaceConfig["interfaceType"]
        ]
        interface = interfaceConstructor.create(interfaceConfig)
        self._interfaces[id] = interface
        self._interface_id_ref_counter[id] = 0

        self.emit("newInterface", interface)
        return interface

    def _deleteInterface(self, id: str):
        del self._interface_id_ref_counter[id]
        del self._interfaces[id]

    def retransmit(self):
        for interface in self._interfaces.values():
            interface.retransmit()

    def setupConnection(
        self,
        connection: Connection,
        serviceConfig: ElectricalServiceConfig,
    ):
        connection_meta = ConnectionMeta(interfaces=set(), interface_meta=dict())
        self._connection_meta[connection] = connection_meta

        channel = DataChannel()
        channel.on("data", lambda data: self.handleData(data, connection))
        channel.on("open", lambda: self.retransmit())

        for interfaceConfig in serviceConfig["interfaces"]:
            busId = interfaceConfig["busId"]
            id = interfaceConfig["interfaceId"]
            interface = self._findOrCreateInterface(id, interfaceConfig)

            interface_meta = SignalInterfaceMeta(
                id=id, busIds=set(), upstreamDataFuns=set()
            )
            connection_meta.interface_meta[interface] = interface_meta
            self._interface_id_ref_counter[id] += 1

            def upstreamDataFun(data, busId=busId):
                channel.send(json.dumps({"busId": busId, "data": data}))

            interface.on("upstreamData", upstreamDataFun)
            interface_meta.upstreamDataFuns.add(upstreamDataFun)
            interface_meta.busIds.add(busId)

            self._connection_meta[connection].interfaces.add(interface)

        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", channel)
        else:
            connection.receive(serviceConfig, "data", channel)

    def teardownConnection(self, connection):
        connection_meta = self._connection_meta[connection]

        for interface in connection_meta.interfaces:
            interface_meta = connection_meta.interface_meta[interface]

            for fun in interface_meta.upstreamDataFuns:
                interface.remove_listener("upstreamData", fun)

            self._interface_id_ref_counter[interface_meta.id] -= 1
            if self._interface_id_ref_counter[interface_meta.id] == 0:
                self._deleteInterface(interface_meta.id)

        del self._connection_meta[connection]

    def handleData(self, data: str, connection: Connection):
        connection_meta = self._connection_meta[connection]
        message = json.loads(data)
        busId = message["busId"]

        for interface in connection_meta.interfaces:
            if busId in connection_meta.interface_meta[interface].busIds:
                interface.downstreamData(message["data"])
