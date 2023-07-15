import json
from typing import Literal, Union

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_services.message.messages import (
    MessageServiceConfig,
    MessageServiceEvent,
)


class MessageService__Producer(Service):
    service_type = "https://api.goldi-labs.de/serviceTypes/message"
    service_direction = "producer"
    service_id: str

    def __init__(self, service_id: str):
        self.service_id = service_id

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: MessageServiceConfig
    ):
        self.channel = DataChannel()
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)

    def teardownConnection(self, connection: Connection):
        pass

    async def sendMessage(self, message: str, message_type: Literal["info", "error"]):
        self.channel.send(json.dumps({"messageType": message_type, "message": message}))


class MessageService__Consumer(Service, AsyncIOEventEmitter):
    service_type = "https://api.goldi-labs.de/serviceTypes/message"
    service_direction = "consumer"
    service_id: str

    def __init__(self, service_id: str):
        AsyncIOEventEmitter.__init__(self)
        self.service_id = service_id

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: MessageServiceConfig
    ):
        self.channel = DataChannel()
        self.channel.on("data", lambda data: self.handleData(data))
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)

    def teardownConnection(self, connection: Connection):
        pass

    def handleData(self, data: Union[str, bytes]):
        if isinstance(data, str):
            msg = json.loads(data)
            event: MessageServiceEvent = {
                "message_type": msg["messageType"],
                "message": msg["message"],
            }
            self.emit("message", event)
