import json
from typing import Union

from crosslab.soa_client.connection import Connection, DataChannel
from crosslab.soa_client.service import Service
from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_services.file.messages import FileServiceConfig, FileServiceEvent


class FileService__Producer(Service):
    service_type = "https://api.goldi-labs.de/serviceTypes/file"
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

    def setupConnection(self, connection: Connection, serviceConfig: FileServiceConfig):
        self.channel = DataChannel()
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", self.channel)
        else:
            connection.receive(serviceConfig, "data", self.channel)

    def teardownConnection(self, connection: Connection):
        pass

    async def sendFile(self, file_type: str, content: bytes):
        self.channel.send(json.dumps({"fileType": file_type, "length": len(content)}))
        self.channel.send(content)


class FileService__Consumer(Service, AsyncIOEventEmitter):
    service_type = "https://api.goldi-labs.de/serviceTypes/file"
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

    def setupConnection(self, connection: Connection, serviceConfig: FileServiceConfig):
        channel = DataChannel()
        channel.on("data", lambda data: self.handleData(data))
        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", channel)
        else:
            connection.receive(serviceConfig, "data", channel)

    def teardownConnection(self, connection: Connection):
        pass

    def handleData(self, data: Union[str, bytes]):
        if isinstance(data, str):
            header = json.loads(data)
            self.file_type = header["fileType"]
        elif self.file_type is not None:
            event: FileServiceEvent = {"file_type": self.file_type, "content": data}
            self.emit("file", event)
