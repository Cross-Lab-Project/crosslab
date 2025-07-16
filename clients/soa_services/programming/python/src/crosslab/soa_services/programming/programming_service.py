import json
import uuid
from typing import Union

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_services.programming.messages import (
    ProgrammingServiceConfig,
    ProgramRequestMessageContent,
    ProgramResponseMessage,
    ProgramResponseMessageContent,
)
from crosslab.soa_services.programming.promise_manager import PromiseManager


class ProgrammingService__Producer(Service, AsyncIOEventEmitter):
    service_type = "https://api.goldi-labs.de/serviceTypes/programming"
    service_direction = "producer"
    service_id: str

    def __init__(self, service_id: str):
        AsyncIOEventEmitter.__init__(self)
        self.service_id = service_id

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
            "supportedConnectionTypes": ["webrtc", "websocket"],
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: ProgrammingServiceConfig
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
            message = json.loads(data)
            content: ProgramRequestMessageContent = message["content"]
            self.emit("program:request", content)

    def sendResponse(self, response: ProgramResponseMessageContent):
        self.channel.send(json.dumps({"type": "program:response", "content": response}))


class ProgrammingService__Consumer(Service):
    service_type = "https://api.goldi-labs.de/serviceTypes/programming"
    service_direction = "consumer"
    service_id: str
    promise_manager = PromiseManager()

    def __init__(self, service_id: str):
        self.service_id = service_id

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
            "supportedConnectionTypes": ["webrtc", "websocket"],
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: ProgrammingServiceConfig
    ):
        self.channel = DataChannel()
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)

    def teardownConnection(self, connection: Connection):
        pass

    def handleData(self, data: Union[str, bytes]):
        if isinstance(data, str):
            message = json.loads(data)
            self.promise_manager.resolve(message["content"]["requestId"], message)

    async def program(self, request: ProgramRequestMessageContent):
        request_id = str(uuid.uuid4())
        response_promise = self.promise_manager.add(request_id)

        self.channel.send(json.dumps({"type": "program:request", "content": request}))

        response: ProgramResponseMessage = await response_promise

        # TODO: validation?

        return response["content"]
