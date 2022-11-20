import asyncio
from abc import ABC, abstractmethod
from typing import Any, Optional, Union

from pyee.asyncio import AsyncIOEventEmitter

from crosslab_soa_client.schemas import ServiceConfig, SignalingMessage

MediaStreamTrack = Any


class Channel(ABC):
    channel_type: str


class MediaChannel(Channel, AsyncIOEventEmitter):
    channel_type = "MediaChannel"
    track: Union[MediaStreamTrack, None]

    def __init__(self, track: Optional[MediaStreamTrack] = None):
        super().__init__()
        self.track = track


class DataChannel(Channel, AsyncIOEventEmitter):
    channel_type = "DataChannel"

    def send(self, data: str):
        self.emit("upstreamData", data)

    def downstreamData(self, data: str):
        self.emit("data", data)

    async def opened(self):
        await asyncio.sleep(0.05)
        self.emit("open")


class Connection(ABC):
    tiebreaker: bool

    def __init__(self) -> None:
        super().__init__()
        self.tiebreaker = False

    @abstractmethod
    async def close(self):
        pass

    @abstractmethod
    def transmit(self, serviceConfig: ServiceConfig, id: str, channel: Channel):
        pass

    @abstractmethod
    def receive(self, serviceConfig: ServiceConfig, id: str, channel: Channel):
        pass

    @abstractmethod
    async def handleSignalingMessage(self, message: SignalingMessage):
        pass
