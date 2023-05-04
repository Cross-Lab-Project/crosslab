import os

import pytest
from helpers import AsyncException, wait
from test_helper import NoReferenceLeaks

from crosslab.soa_client.connection_webrtc import WebRTCPeerConnection
from crosslab.soa_client.messages import SignalingMessage
from crosslab.soa_client.test_helper.dummy_track import DummyTrack
from crosslab.soa_client.test_helper.service_stub import ServiceStub


@pytest.mark.asyncio
@pytest.mark.parametrize("tiebreaker", [True, False])
async def test_webrtc_connection_data_only(tiebreaker: bool):
    asyncException = AsyncException()

    serviceConfig = {
        "serviceType": "http://example.com/data-only",
        "serviceId": "data",
        "remoteServiceId": "data",
    }

    localService = ServiceStub("data", dataChannel=True)
    remoteService = ServiceStub("data", dataChannel=True)

    local = WebRTCPeerConnection()
    remote = WebRTCPeerConnection()

    local.on("error", lambda error: asyncException.set(error))
    remote.on("error", lambda error: asyncException.set(error))

    async def onLocalSignalingMessage(message: SignalingMessage):
        await remote.handleSignalingMessage(
            {
                "messageType": "signaling",
                "connectionUrl": "connection.url",
                "content": message["content"],
                "signalingType": message["signalingType"],
            }
        )

    async def onRemoteSignalingMessage(message: SignalingMessage):
        await local.handleSignalingMessage(
            {
                "messageType": "signaling",
                "connectionUrl": "connection.url",
                "content": message["content"],
                "signalingType": message["signalingType"],
            }
        )

    local.on("signaling", onLocalSignalingMessage)
    remote.on("signaling", onRemoteSignalingMessage)

    local.tiebreaker = tiebreaker
    remote.tiebreaker = not tiebreaker

    with NoReferenceLeaks("crosslab"):
        await localService.setupConnection(local, serviceConfig)
        await remoteService.setupConnection(remote, serviceConfig)

        messageWait = [
            localService.receivedMessageEvent.wait(),
            remoteService.receivedMessageEvent.wait(),
        ]

        await wait([local.connect(), remote.connect()], asyncException)
        await wait(messageWait, asyncException)
        await wait([local.close(), remote.close()], asyncException)

        await localService.teardownConnection(local)
        await remoteService.teardownConnection(remote)

    assert localService.messages == ["init"]
    assert remoteService.messages == ["init"]


@pytest.mark.asyncio
@pytest.mark.parametrize("tiebreaker", [True, False])
async def test_webrtc_connection_video_only(tiebreaker: bool):
    asyncException = AsyncException()

    serviceConfig = {
        "serviceType": "http://example.com/data-only",
        "serviceId": "data",
        "remoteServiceId": "data",
    }

    with open(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "./h264_test.bin"),
        "rb",
    ) as f:
        track = DummyTrack(f)
    localService = ServiceStub("video", outTrack=track)
    remoteService = ServiceStub("video", receiveVideo=True)

    local = WebRTCPeerConnection()
    remote = WebRTCPeerConnection()

    local.on("error", lambda error: asyncException.set(error))
    remote.on("error", lambda error: asyncException.set(error))

    async def onLocalSignalingMessage(message: SignalingMessage):
        await remote.handleSignalingMessage(
            {
                "messageType": "signaling",
                "connectionUrl": "connection.url",
                "content": message["content"],
                "signalingType": message["signalingType"],
            }
        )

    async def onRemoteSignalingMessage(message: SignalingMessage):
        await local.handleSignalingMessage(
            {
                "messageType": "signaling",
                "connectionUrl": "connection.url",
                "content": message["content"],
                "signalingType": message["signalingType"],
            }
        )

    local.on("signaling", onLocalSignalingMessage)
    remote.on("signaling", onRemoteSignalingMessage)

    local.tiebreaker = tiebreaker
    remote.tiebreaker = not tiebreaker

    localReceiverDir = "sendrecv" if tiebreaker else "sendonly"
    remoteReceiverDir = "recvonly" if tiebreaker else "sendrecv"

    with NoReferenceLeaks("crosslab"):
        await localService.setupConnection(local, serviceConfig)
        await remoteService.setupConnection(remote, serviceConfig)

        try:
            await wait([local.connect(), remote.connect()], asyncException)
            assert local.pc.getTransceivers()[0].direction == localReceiverDir
            assert remote.pc.getTransceivers()[0].direction == remoteReceiverDir
            await wait(
                [track.sendPacket.wait(), remoteService.recvPacket.wait()],
                asyncException,
            )
            assert len(remoteService.received_frame_pts) == 1
        finally:
            await wait([local.close(), remote.close()], asyncException)

        await localService.teardownConnection(local)
        await remoteService.teardownConnection(remote)
