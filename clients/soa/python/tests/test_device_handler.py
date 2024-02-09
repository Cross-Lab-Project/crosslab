import asyncio
import tracemalloc
from typing import List

import aiohttp
import pytest
from helpers import AsyncException, wait

from crosslab.soa_client.connection import DataChannel
from crosslab.soa_client.device_handler import DeviceHandler
from crosslab.soa_client.service import Service
from crosslab.soa_client.test_helper.service_stub import ServiceStub


@pytest.mark.asyncio
async def test_connect_and_authenticate(mock_server):
    mock_server.patch("/devices/123")
    mock_server.get("/devices/123/websocket", payload="token")
    ws = mock_server.ws("/devices/123/ws")
    ws.expect(
        r'{"messageType": "authenticate", "token": "token"}',
        answer=r'{"messageType": "authenticate", "authenticated": true}',
    )
    base_url = await mock_server.start()

    dh = DeviceHandler()
    await dh.connect(base_url + "/devices/123")
    assert mock_server.asExpected


@pytest.mark.asyncio
async def test_create_peerconnection(mock_server):
    mock_server.patch("/devices/123")
    mock_server.get("/devices/123/websocket", payload="token")

    ws = mock_server.ws("/devices/123/ws")
    ws.expect(
        r'{"messageType": "authenticate", "token": "token"}',
        answer=r'{"messageType": "authenticate", "authenticated": true, "deviceUrl": "{base_url}/devices/123"}',
    )
    ws.send(
        r'{"messageType": "command", "command": "createPeerconnection", "connectionType": "webrtc", "connectionUrl": "{base_url}/peerconnections/1233",'
        r'"services": [{"serviceType": "dataOnly", "serviceId": "local", "remoteServiceId": "remote"}], "tiebreaker": true}'
    )
    ws.sleep(0.5)
    ws.send(
        r'{"messageType": "command", "command": "closePeerconnection", "connectionUrl": "{base_url}/peerconnections/1233"}'
    )
    base_url = await mock_server.start()

    dh = DeviceHandler()

    dataOnlyService = ServiceStub("local", dataChannel=True)
    dh.add_service(dataOnlyService)
    await wait(dh.connect(base_url + "/devices/123"), mock_server.async_exception)

    assert mock_server.asExpected
