import os

import pytest
from helpers import AsyncException, wait
from test_helper import NoReferenceLeaks

from crosslab.soa_client.connection_webrtc import WebRTCPeerConnection
from crosslab.soa_client.messages import SignalingMessage, WebSocketConnectionOptions
from crosslab.soa_client.test_helper.dummy_track import DummyTrack
from crosslab.soa_client.test_helper.service_stub import ServiceStub
from src.crosslab.soa_client.connection_websocket import WebSocketPeerconnection


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

    local = WebSocketPeerconnection(
        options=WebSocketConnectionOptions(url="ws://localhost")
    )
    remote = WebSocketPeerconnection(
        options=WebSocketConnectionOptions(url="ws://localhost")
    )

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
