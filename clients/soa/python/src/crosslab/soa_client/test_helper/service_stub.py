import asyncio
from typing import List, Literal, Optional

from aiortc import MediaStreamTrack  # type: ignore
from aiortc.mediastreams import MediaStreamError  # type: ignore

from crosslab.soa_client.connection import Connection, DataChannel, MediaChannel
from crosslab.soa_client.service import Service


class ServiceStub(Service):
    service_type: str
    service_direction: Literal["producer", "consumer", "prosumer"]
    service_id: str

    _hasOutgoingTrack: bool
    _hasIncoumingTrack: bool
    _hasDataChannel: bool

    _outgoingTrack: MediaStreamTrack
    _incomingTrack: MediaStreamTrack

    channels: List[DataChannel]
    messages: List[str]

    receivedMessageEvent: asyncio.Event

    recvPacket: asyncio.Event
    receiveCoroutine: Optional[asyncio.Task]

    received_frame_pts: List[int]

    def __init__(
        self,
        service_id: str,
        service_type: str = "http://example.com/service",
        outTrack: Optional[MediaStreamTrack] = None,
        receiveVideo: bool = False,
        dataChannel: bool = False,
        wait_for_n_frames: int = -1,
    ):
        self.service_type = service_type
        self.service_id = service_id

        self._hasOutgoingTrack = outTrack is not None
        self._hasIncoumingTrack = receiveVideo
        self._hasDataChannel = dataChannel

        if (self._hasOutgoingTrack and self._hasIncoumingTrack) or self._hasDataChannel:
            self.service_direction = "prosumer"
        elif self._hasIncoumingTrack:
            self.service_direction = "consumer"
        elif self._hasOutgoingTrack:
            self.service_direction = "producer"

        if self._hasOutgoingTrack:
            self.service_direction = "producer"
            self._outgoingTrack = outTrack

        if self._hasIncoumingTrack:
            self.recvPacket = asyncio.Event()
            self.received_frame_pts = []
            self._wait_for_n_frames = wait_for_n_frames

        if self._hasDataChannel:
            self.channels = list()
            self.messages = []
            self.receivedMessageEvent = asyncio.Event()

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_direction,
            "serviceDirection": self.service_direction,
        }

    async def setupConnection(self, connection: Connection, serviceConfig: dict):
        if self._hasOutgoingTrack:
            mediaChannel = MediaChannel(self._outgoingTrack)
            connection.transmit(serviceConfig, "video", mediaChannel)
        if self._hasIncoumingTrack:
            mediaChannel = MediaChannel()
            mediaChannel.on("track", self._onTrack)
            connection.receive(serviceConfig, "video", mediaChannel)
        if self._hasDataChannel:
            dataChannel = DataChannel()
            dataChannel.on("open", lambda: self._send("init"))
            dataChannel.on("data", lambda data: self.handleData(data))
            self.channels.append(dataChannel)

            if connection.tiebreaker:
                connection.transmit(serviceConfig, "data", dataChannel)
            else:
                connection.receive(serviceConfig, "data", dataChannel)

    async def teardownConnection(self, connection: Connection):
        if self._hasOutgoingTrack:
            pass
        if self._hasIncoumingTrack:
            if self.receiveCoroutine:
                self.receiveCoroutine.cancel()
                await asyncio.sleep(0)
        if self._hasDataChannel:
            self.channels.clear()

    def _onTrack(self, track: MediaStreamTrack):
        if self._hasIncoumingTrack:
            self._incomingTrack = track
            self.receiveCoroutine = asyncio.create_task(self._receive())

    async def _receive(self):
        while True:
            try:
                result = await self._incomingTrack.recv()
                self.received_frame_pts.append(result.pts)
                self._wait_for_n_frames -= 1
                if self._wait_for_n_frames <= 0:
                    self.recvPacket.set()
            except MediaStreamError:
                break

    def handleData(self, data: str):
        self.messages.append(data)
        self.receivedMessageEvent.set()

    def _send(self, data: str):
        for channel in self.channels:
            channel.send(data)
