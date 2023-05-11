from abc import ABC, abstractmethod
from typing import Any, Literal, Optional, Union

from crosslab.soa_client.messages import SignalingMessage
from pyee.asyncio import AsyncIOEventEmitter  # type: ignore

MediaStreamTrack = Any


class Channel(ABC):
    channel_type: str

    @abstractmethod
    def close(self) -> None:
        pass


class MediaChannel(Channel, AsyncIOEventEmitter):
    channel_type = "MediaChannel"
    track: Union[MediaStreamTrack, None]

    def __init__(self, track: Optional[MediaStreamTrack] = None):
        super().__init__()
        self.track = track

    def close(self):
        self.emit("close")
        self.remove_all_listeners()


class DataChannel(Channel, AsyncIOEventEmitter):
    channel_type = "DataChannel"

    def send(self, data: Union[bytes, str]):
        self.emit("upstreamData", data)

    def downstreamData(self, data: Union[bytes, str]):
        self.emit("data", data)

    async def opened(self):
        self.emit("open")

    def close(self):
        self.emit("close")
        self.remove_all_listeners()


class Connection(ABC):
    tiebreaker: bool
    state: Literal["new", "connecting", "connected", "disconnected", "closed", "failed"]

    def __init__(self) -> None:
        super().__init__()
        self.tiebreaker = False
        self.state = "new"

    @abstractmethod
    async def close(self):
        pass

    @abstractmethod
    def transmit(
        self,
        serviceConfig: Any,
        id: str,
        channel: Channel,
    ):
        pass

    @abstractmethod
    def receive(
        self,
        serviceConfig: Any,
        id: str,
        channel: Channel,
    ):
        pass

    @abstractmethod
    async def handleSignalingMessage(self, message: SignalingMessage):
        pass
