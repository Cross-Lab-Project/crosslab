import aiohttp
import pytest
from aiohttp import web
from helpers import AsyncException, wait
from test_helper import NoReferenceLeaks

from crosslab.soa_client.test_helper.service_stub import ServiceStub
from src.crosslab.soa_client.connection_websocket import WebSocketPeerconnection

websockets = []


async def websocket_handler(request):
    ws = web.WebSocketResponse()
    websockets.append(ws)
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == aiohttp.WSMsgType.TEXT:
            for websocket in websockets:
                if ws != websocket:
                    await websocket.send_str(msg.data)

    return ws


@pytest.fixture
async def server(aiohttp_server):
    app = web.Application()
    app.add_routes([web.get("/ws", websocket_handler)])
    return await aiohttp_server(app, port=3020)


@pytest.mark.asyncio
@pytest.mark.parametrize("tiebreaker", [True, False])
async def test_websocket_connection_data_only(
    server,
    tiebreaker: bool,
):
    await server
    asyncException = AsyncException()

    serviceConfig = {
        "serviceType": "http://example.com/data-only",
        "serviceId": "data",
        "remoteServiceId": "data",
    }

    localService = ServiceStub("data", dataChannel=True)
    remoteService = ServiceStub("data", dataChannel=True)

    local = WebSocketPeerconnection(options={"webSocketUrl": "ws://127.0.0.1:3020/ws"})
    remote = WebSocketPeerconnection(options={"webSocketUrl": "ws://127.0.0.1:3020/ws"})

    local.on("error", lambda error: asyncException.set(error))
    remote.on("error", lambda error: asyncException.set(error))

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

    websockets.clear()
