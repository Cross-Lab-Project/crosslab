import json
from typing import Dict, List, Union

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_services.parameter.messages import (
    ParameterChangedEvent,
    ParameterConfig,
    ParameterDescription,
    ParameterServiceConfig,
)


class ParameterService__Producer(Service):
    service_type = "https://api.goldi-labs.de/serviceTypes/parameter"
    service_direction = "producer"
    service_id: str
    parameter_descriptions: List[ParameterDescription]

    def __init__(
        self, service_id: str, parameter_descriptions: List[ParameterDescription]
    ):
        self.service_id = service_id
        self.parameter_descriptions = parameter_descriptions

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
            "parameters": self.parameter_descriptions,
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: ParameterServiceConfig
    ):
        self.channel = DataChannel()
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)

    def teardownConnection(self, connection: Connection):
        pass

    async def updateParameter(self, parameter: str, value: float):
        self.channel.send(json.dumps({"parameter": parameter, "value": value}))


class Parameter(ParameterDescription):
    value: float


class ParameterService__Consumer(Service, AsyncIOEventEmitter):
    service_type = "https://api.goldi-labs.de/serviceTypes/parameter"
    service_direction = "consumer"
    service_id: str
    parameter_descriptions: List[ParameterDescription]

    parameters: Dict[Connection, List[ParameterConfig]]
    consolidated_parameters: List[ParameterDescription]

    def __init__(
        self, service_id: str, parameter_descriptions: List[ParameterDescription]
    ):
        AsyncIOEventEmitter.__init__(self)
        self.service_id = service_id
        self.parameter_descriptions = parameter_descriptions
        self.parameters = {}

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: ParameterServiceConfig
    ):
        self.channel = DataChannel()
        self.channel.on("data", lambda data: self.handleData(data))
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)
        self.parameters[connection] = serviceConfig["parameters"]

    def teardownConnection(self, connection: Connection):
        pass

    def handleData(self, data: Union[str, bytes]):
        if isinstance(data, str):
            msg = json.loads(data)
            event: ParameterChangedEvent = {
                "parameter": msg["parameter"],
                "value": msg["value"],
            }
            self.emit("parameterChanged", event)
