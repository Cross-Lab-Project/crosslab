import asyncio
import tracemalloc
from typing import List

import aiohttp
import pytest
from helpers import AsyncException, wait

from crosslab.soa_client.connection import DataChannel
from crosslab.soa_client.device_handler import DeviceHandler
from crosslab.soa_client.service import Service


class DataOnly(Service):
    service_type = "goldi/legacy/message"
    service_direction = "inout"
    service_id: str

    channels: List[DataChannel]
    messages = []

    def __init__(self, serviceId: str):
        super().__init__()
        self.channels = list()
        self.service_id = serviceId

    def getMeta(self):
        return {
            "serviceType": self.service_type,
            "serviceId": self.service_id,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(self, connection, serviceConfig):
        channel = DataChannel()
        channel.on("data", lambda data: self.handleData(data))
        self.channels.append(channel)

        if connection.tiebreaker:
            connection.transmit(serviceConfig, "data", channel)
        else:
            connection.receive(serviceConfig, "data", channel)

    def handleData(self, data: str):
        self.messages.append(data)

    def _send(self, *args, data: str):
        for channel in self.channels:
            channel.send(data)


@pytest.mark.asyncio
async def test_connect_and_authenticate(mock_server):
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
@pytest.mark.skip(
    reason="This test is not working yet. Connection is never build -> timeout"
)
async def test_create_peerconnection(mock_server):
    mock_server.get("/devices/123/websocket", payload="token")

    ws = mock_server.ws("/devices/123/ws")
    ws.expect(
        r'{"messageType": "authenticate", "authenticated": null, "deviceUrl": "{base_url}/devices/123", "token": "token"}',
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

    dataOnlyService = DataOnly("local")
    dh.add_service(dataOnlyService)
    await wait(dh.connect(base_url + "/devices/123"), mock_server.async_exception)

    assert mock_server.asExpected
