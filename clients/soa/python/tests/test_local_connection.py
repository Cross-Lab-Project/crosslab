import aiohttp
import pytest
from aiohttp import web
from helpers import AsyncException, wait
from test_helper import NoReferenceLeaks

from crosslab.soa_client.test_helper.service_stub import ServiceStub
from src.crosslab.soa_client.connection_local import LocalConnection

locals = []


async def local_handler(request):
    ws = web.LocalResponse()
    locals.append(ws)
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == aiohttp.WSMsgType.TEXT:
            for local in locals:
                if ws != local:
                    await local.send_str(msg.data)

    return ws


@pytest.mark.asyncio
@pytest.mark.parametrize("tiebreaker", [True, False])
async def test_local_connection_data_only(
    tiebreaker: bool,
):
    asyncException = AsyncException()

    serviceConfig = {
        "serviceType": "http://example.com/data-only",
        "serviceId": "data",
        "remoteServiceId": "data",
    }

    localService = ServiceStub("data", dataChannel=True)
    remoteService = ServiceStub("data", dataChannel=True)

    local = LocalConnection()

    local.on("error", lambda error: asyncException.set(error))

    local.tiebreaker = tiebreaker

    with NoReferenceLeaks("crosslab"):
        await localService.setupConnection(local, serviceConfig)
        await remoteService.setupConnection(local, serviceConfig)

        messageWait = [
            localService.receivedMessageEvent.wait(),
            remoteService.receivedMessageEvent.wait(),
        ]

        await wait([local.connect()], asyncException)
        await wait(messageWait, asyncException)
        await wait([local.close()], asyncException)

        await localService.teardownConnection(local)
        await remoteService.teardownConnection(local)

    assert localService.messages == ["init"]
    assert remoteService.messages == ["init"]

    locals.clear()
