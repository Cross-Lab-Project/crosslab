import asyncio
import re

import aiohttp.web

from helpers import AsyncException


class WSMock:
    def __init__(self):
        self.protocol = []

    def expect(self, message, answer=None):
        self.protocol.append(
            {"expect": message, "send": answer, "sleep": None, "await": None}
        )

    def send(self, message):
        self.protocol.append(
            {"expect": None, "send": message, "sleep": None, "await": None}
        )

    def sleep(self, seconds):
        self.protocol.append(
            {"expect": None, "send": None, "sleep": seconds, "await": None}
        )

    def wait(self, awaitable):
        self.protocol.append(
            {"expect": None, "send": None, "sleep": None, "await": awaitable}
        )

    async def handle(self, request: aiohttp.web.Request, base_url: str):
        self.ws = aiohttp.web.WebSocketResponse()
        await self.ws.prepare(request)
        for message in self.protocol:
            if message["expect"]:
                assert await self.ws.receive_str() == message["expect"].replace(
                    "{base_url}", base_url
                )
            if message["send"]:
                await self.ws.send_str(message["send"])
            if message["sleep"]:
                await asyncio.sleep(message["sleep"])
            if message["await"]:
                await message["await"]
        await self.ws.close()
        return self.ws


class MockServer:
    def __init__(self, aiohttp_server):
        self.app = aiohttp.web.Application()
        self.aiohttp_server = aiohttp_server
        self.app.router.add_route("*", "/{tail:.*}", self._handle)
        self.protocol = []
        self.asExpected = True
        self.async_exception = AsyncException()

    def add(self, method, path, check_body=None, status=200, payload=None):
        self.protocol.append(
            {
                "method": method,
                "path": path,
                "check_body": check_body,
                "status": status,
                "payload": payload,
            }
        )

    def get(self, path, check_body=None, status=200, payload=None):
        self.add("GET", path, check_body, status, payload)

    def post(self, path, check_body=None, status=200, payload=None):
        self.add("POST", path, check_body, status, payload)

    def patch(self, path, check_body=None, status=200, payload=None):
        self.add("PATCH", path, check_body, status, payload)

    def ws(self, path):
        self.add("WS", path)
        self.protocol[-1]["ws"] = WSMock()
        return self.protocol[-1]["ws"]

    async def start(self):
        self.server = await self.aiohttp_server(self.app)
        self.base_url = f"{self.server.scheme}://{self.server.host}:{self.server.port}"
        return self.base_url

    async def _handle(self, request: aiohttp.web.Request):
        try:
            expected = self.protocol.pop(0)
            if expected["method"] == "WS":
                return await expected["ws"].handle(request, self.base_url)
            if isinstance(expected["path"], re.Pattern):
                assert expected["path"].match(request.path)
            else:
                assert expected["path"] == request.path

            if expected["check_body"]:
                if isinstance(expected["check_body"], re.Pattern):
                    assert expected["check_body"].match(await request.text())
                elif isinstance(expected["check_body"], str):
                    assert expected["check_body"] == await request.text()
                else:
                    assert expected["check_body"] == await request.json()

            if expected["payload"]:
                return aiohttp.web.json_response(
                    expected["payload"], status=expected["status"]
                )
            else:
                return aiohttp.web.Response(status=expected["status"])
        except Exception as e:
            self.asExpected = False
            self.async_exception.set(e)
            raise

    async def _ws_handler(self, request: aiohttp.web.Request):
        ws = aiohttp.web.WebSocketResponse()
        await ws.prepare(request)
        return ws
