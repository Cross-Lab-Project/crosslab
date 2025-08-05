import asyncio
from abc import ABC, abstractmethod
from typing import Any, Dict, Literal, Optional, Union

from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_client.messages import SignalingMessage

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
    _ready = False

    def send(self, data: Union[bytes, str]):
        self.emit("upstreamData", data)

    def downstreamData(self, data: Union[bytes, str]):
        self.emit("data", data)

    async def ready(self):
        if self._ready:
            return
        _future = asyncio.get_running_loop().create_future()
        self.once("open", lambda: _future.set_result(None))
        await _future

    async def opened(self):
        self._ready = True
        self.emit("open")

    def close(self):
        self.emit("close")
        self.remove_all_listeners()


class Connection(ABC, AsyncIOEventEmitter):
    tiebreaker: bool
    state: Literal["new", "connecting", "connected", "disconnected", "closed", "failed"]
    options: Dict[str, Any]

    def __init__(self, options: Optional[Dict[str, Any]] = None) -> None:
        super().__init__()
        AsyncIOEventEmitter.__init__(self)
        self.options = options if options else {}
        self.tiebreaker = False
        self.state = "new"

    @abstractmethod
    async def connect(self):
        pass

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
