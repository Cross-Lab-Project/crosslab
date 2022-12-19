import asyncio
import json
import os
from typing import List, Optional

import pytest
from aiortc import MediaStreamTrack
from helpers import AsyncException, wait

from crosslab_soa_client.connection import Connection, DataChannel, MediaChannel
from crosslab_soa_client.connection_webrtc import WebRTCPeerConnection
from crosslab_soa_client.schemas import (
    PartialSignalingMessage,
    CreatePeerconnectionMessageService,
    SignalingMessage,
    SignalingMessageMessageType,
)
from crosslab_soa_client.service import Service


class DummyTrack(MediaStreamTrack):
    sendPacket: asyncio.Event

    def __init__(self, kind="video") -> None:
        super().__init__()
        self.sendPacket = asyncio.Event()
        self.kind = kind
        self._packets = []
        with open(
            os.path.join(os.path.dirname(os.path.abspath(__file__)), "./h264_test.bin"),
            "rb",
        ) as f:
            while True:
                len_bytes = f.read(2)
                if len_bytes == b"":
                    break
                data = f.read(int.from_bytes(len_bytes, byteorder="big"))
                self._packets.append(data)

    async def raw_recv(self):
        if len(self._packets) == 0:
            self.sendPacket.set()
            return None
        else:
            return self._packets.pop(0)

    def recv(self):
        return


class VideoOut(Service):
    service_type = "http://example.com/video-in"
    service_direction = "out"
    service_id: str

    _track: MediaStreamTrack

    def __init__(self, track: MediaStreamTrack, service_id: str):
        self.service_id = service_id
        self._track = track

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_direction,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(self, connection: Connection, serviceConfig: dict):
        channel = MediaChannel(self._track)
        connection.transmit(serviceConfig, "video", channel)


class VideoIn(Service):
    service_type = "http://example.com/video-out"
    service_direction = "in"
    service_id: str

    recvPacket: asyncio.Event
    receiveCoroutine: Optional[asyncio.Task]

    received_frame_pts: List[int]

    def __init__(self, service_id: str, wait_for_n_frames: int = -1):
        self.service_id = service_id
        self.recvPacket = asyncio.Event()
        self.received_frame_pts = []
        self._wait_for_n_frames = wait_for_n_frames

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_direction,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(self, connection: Connection, serviceConfig: dict):
        channel = MediaChannel()
        channel.on("track", self._onTrack)
        connection.receive(serviceConfig, "video", channel)

    def _onTrack(self, track: MediaStreamTrack):
        self._track = track
        self.receiveCoroutine = asyncio.create_task(self._receive())

    async def _receive(self):
        while True:
            try:
                result = await self._track.recv()
                self.received_frame_pts.append(result.pts)
                self._wait_for_n_frames -= 1
                if self._wait_for_n_frames <= 0:
                    self.recvPacket.set()
            except:
                break


class DataOnly(Service):
    service_type = "http://example.com/data-only"
    service_direction = "inout"
    service_id: str

    channels: List[DataChannel]
    messages: List[str]

    receivedMessageEvent: asyncio.Event

    def __init__(self, serviceId: str):
        super().__init__()
        self.channels = list()
        self.messages = []
        self.service_id = serviceId
        self.receivedMessageEvent = asyncio.Event()

    def getMeta(self):
        return {
            "serviceType": self.service_type,
            "serviceId": self.service_id,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(self, connection, serviceConfig):
        channel = DataChannel()
        channel.on("open", lambda: self._send("init"))
        channel.on("data", lambda data: self.handleData(data))
        self.channels.append(channel)

        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", channel)
        else:
            connection.receive(serviceConfig, "data", channel)

    def handleData(self, data: str):
        self.messages.append(data)
        self.receivedMessageEvent.set()

    def _send(self, data: str):
        for channel in self.channels:
            channel.send(data)


@pytest.mark.asyncio
@pytest.mark.filterwarnings(
    "ignore:This version of cryptography contains a temporary pyOpenSSL fallback path"
)
@pytest.mark.parametrize("tiebreaker", [True, False])
async def test_webrtc_connection_data_only(tiebreaker: bool):
    asyncException = AsyncException()

    serviceConfig = CreatePeerconnectionMessageService.from_dict(
        {
            "serviceType": "http://example.com/data-only",
            "serviceId": "data",
            "remoteServiceId": "data",
        }
    )

    localService = DataOnly("data")
    remoteService = DataOnly("data")

    local = WebRTCPeerConnection()
    remote = WebRTCPeerConnection()

    local.on("error", lambda error: asyncException.set(error))
    remote.on("error", lambda error: asyncException.set(error))

    async def onLocalSignalingMessage(message: PartialSignalingMessage):
        await remote.handleSignalingMessage(
            SignalingMessage(
                SignalingMessageMessageType.SIGNALING,
                "connection.url",
                message.content,
                message.signaling_type,
            )
        )

    async def onRemoteSignalingMessage(message: PartialSignalingMessage):
        await local.handleSignalingMessage(
            SignalingMessage(
                SignalingMessageMessageType.SIGNALING,
                "connection.url",
                message.content,
                message.signaling_type,
            )
        )

    local.on("signaling", onLocalSignalingMessage)
    remote.on("signaling", onRemoteSignalingMessage)

    local.tiebreaker = tiebreaker
    remote.tiebreaker = not tiebreaker

    localService.setupConnection(local, serviceConfig)
    remoteService.setupConnection(remote, serviceConfig)

    messageWait = [
        localService.receivedMessageEvent.wait(),
        remoteService.receivedMessageEvent.wait(),
    ]

    await wait([local.connect(), remote.connect()], asyncException)
    await wait(messageWait, asyncException)
    await wait([local.close(), remote.close()], asyncException)

    assert localService.messages == ["init"]
    assert remoteService.messages == ["init"]


@pytest.mark.asyncio
@pytest.mark.filterwarnings(
    "ignore:This version of cryptography contains a temporary pyOpenSSL fallback path"
)
@pytest.mark.parametrize("tiebreaker", [True, False])
async def test_webrtc_connection_video_only(tiebreaker: bool):
    asyncException = AsyncException()

    serviceConfig = CreatePeerconnectionMessageService.from_dict(
        {
            "serviceType": "http://example.com/data-only",
            "serviceId": "data",
            "remoteServiceId": "data",
        }
    )

    track = DummyTrack()
    localService = VideoOut(track, "data")
    remoteService = VideoIn("data")

    local = WebRTCPeerConnection()
    remote = WebRTCPeerConnection()

    local.on("error", lambda error: asyncException.set(error))
    remote.on("error", lambda error: asyncException.set(error))

    async def onLocalSignalingMessage(message: PartialSignalingMessage):
        await remote.handleSignalingMessage(
            SignalingMessage(
                SignalingMessageMessageType.SIGNALING,
                "connection.url",
                message.content,
                message.signaling_type,
            )
        )

    async def onRemoteSignalingMessage(message: PartialSignalingMessage):
        await local.handleSignalingMessage(
            SignalingMessage(
                SignalingMessageMessageType.SIGNALING,
                "connection.url",
                message.content,
                message.signaling_type,
            )
        )

    local.on("signaling", onLocalSignalingMessage)
    remote.on("signaling", onRemoteSignalingMessage)

    local.tiebreaker = tiebreaker
    remote.tiebreaker = not tiebreaker

    localReceiverDir = "sendrecv" if tiebreaker else "sendonly"
    remoteReceiverDir = "recvonly" if tiebreaker else "sendrecv"

    localService.setupConnection(local, serviceConfig)
    remoteService.setupConnection(remote, serviceConfig)

    try:
        await wait([local.connect(), remote.connect()], asyncException)
        assert local.pc.getTransceivers()[0].direction == localReceiverDir
        assert remote.pc.getTransceivers()[0].direction == remoteReceiverDir
        await wait(
            [track.sendPacket.wait(), remoteService.recvPacket.wait()], asyncException
        )
        assert len(remoteService.received_frame_pts) == 1
    finally:
        await wait([local.close(), remote.close()], asyncException)
