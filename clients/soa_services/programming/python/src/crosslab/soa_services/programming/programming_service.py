import json
import uuid
from typing import Any, Union

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from crosslab.soa_services.programming.messages import (
    ProgrammingServiceConfig, ProgramRequestEvent,
    ProgramRequestMessageContent, ProgramResponseMessage,
    ProgramResponseMessageContent)
from crosslab.soa_services.programming.promise_manager import PromiseManager
from pyee.asyncio import AsyncIOEventEmitter


def check_for_uint8arrray(dictionary):
    if dictionary.get("type", None) == "Uint8Array":
        return bytes(dictionary["data"])
    else:
        return dictionary


def replace_bytes(value):
    if isinstance(value, bytes) or isinstance(value, bytearray):
        return {"type": "Uint8Array", "data": list(value)}


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
            message = json.loads(data, object_hook=check_for_uint8arrray)
            event: ProgramRequestEvent = message["content"]
            self.emit("program:request", event)

    def sendResponse(self, response: ProgramResponseMessageContent):
        self.channel.send(
            json.dumps(
                {"type": "program:response", "content": response}, default=replace_bytes
            )
        )


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
        self.channel.on("data", lambda data: self.handleData(data))

        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)

    def teardownConnection(self, connection: Connection):
        pass

    def handleData(self, data: Union[str, bytes]):
        if isinstance(data, str):
            message = json.loads(data, object_hook=check_for_uint8arrray)
            self.promise_manager.resolve(message["content"]["requestId"], message)

    async def program(self, request: ProgramRequestMessageContent):
        request_id = str(uuid.uuid4())
        response_promise = self.promise_manager.add(request_id)

        self.channel.send(
            json.dumps(
                {"type": "program:request", "content": request}, default=replace_bytes
            )
        )

        response: ProgramResponseMessage = await response_promise

        # TODO: validation?

        return response["content"]
