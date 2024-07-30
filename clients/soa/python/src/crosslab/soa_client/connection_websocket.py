import asyncio
import json
from typing import Dict, cast

import aiohttp
from aiohttp.http_websocket import WSMessage
from aiohttp.web import WSMsgType
from pyee.asyncio import AsyncIOEventEmitter  # type: ignore

from crosslab.soa_client.connection import Channel, Connection, DataChannel
from crosslab.soa_client.messages import (
    ServiceConfig,
    SignalingMessage,
    WebSocketConnectionOptions,
)


class WebSocketPeerconnection(AsyncIOEventEmitter, Connection):
    _connectionOptions: WebSocketConnectionOptions
    _ws: aiohttp.ClientWebSocketResponse
    _channels: Dict[str, Channel]
    _message_task: asyncio.Task

    def __init__(self, options: WebSocketConnectionOptions):
        AsyncIOEventEmitter.__init__(self)
        Connection.__init__(self)
        self._connectionOptions = options
        self._channels = dict()

    def transmit(
        self,
        serviceConfig: ServiceConfig,
        id: str,
        channel: Channel,
    ):
        self._add_channel(serviceConfig, id, channel)

    def receive(
        self,
        serviceConfig: ServiceConfig,
        id: str,
        channel: Channel,
    ):
        self._add_channel(serviceConfig, id, channel)

    async def handleSignalingMessage(self, message: SignalingMessage):
        pass

    async def connect(self):
        self.state = "connecting"
        self.emit("connectionChanged")

        self._message_task = asyncio.create_task(self._handle_messages())

    async def close(self):
        print("closing websocket connection!")
        if self.state != "closed":
            if self._ws:
                await self._ws.close()
            self.state = "closed"
            self.emit("connectionChanged")

    # helper functions

    async def _handle_messages(self):
        print("entering handle messages")
        async with aiohttp.ClientSession() as self.session:
            self._ws = await self.session.ws_connect(self._connectionOptions["url"])
            self.state = "connected"
            self.emit("connectionChanged")
            async for message in self._ws:
                print(message)
                if isinstance(message, WSMessage):
                    if message.type == WSMsgType.text:
                        print("incoming text message")
                        print(message.data)
                        message_json = message.json()
                        self._handle_message(message_json)
                    elif message.type == WSMsgType.close:
                        print("incoming close message")
                        await self._ws.close()
                        self.state = "closed"
                        self.emit("connectionChanged")
                        break
                    elif message.type == WSMsgType.closed:
                        print("incoming closed message")
                        self.state = "closed"
                        self.emit("connectionChanged")
                        break
        print("leaving handle messages")

    def _handle_message(self, message):
        channel = self._channels[message["channel"]]
        if channel.channel_type == "DataChannel":
            dchannel = cast(DataChannel, channel)
            if message["type"] == "string":
                dchannel.downstreamData(message["content"])
            elif message["type"] == "arrayBuffer":
                dchannel.downstreamData(bytes(message["content"]))
            elif message["type"] == "blob":
                dchannel.downstreamData(bytes(message["content"]))
            elif message["type"] == "arrayBufferView":
                dchannel.downstreamData(bytes(message["content"]["buffer"]))

    def _add_channel(self, service_config: ServiceConfig, id: str, channel: Channel):
        label = self._create_label(service_config, id)
        self._channels[label] = channel

        if channel.channel_type == "DataChannel":
            dchannel = cast(DataChannel, channel)

            async def upstreamData(data):
                print("upstream data called", data)
                if isinstance(data, str):
                    await self._ws.send_json(
                        {"type": "string", "content": str(data), "channel": label}
                    )
                elif isinstance(data, bytes):
                    await self._ws.send_json(
                        {
                            "type": "arrayBuffer",
                            "content": [x for x in data],
                            "channel": label,
                        }
                    )

            dchannel.on("upstreamData", upstreamData)

    def _create_label(self, service_config: ServiceConfig, id: str):
        id1 = (
            service_config["serviceId"]
            if self.tiebreaker
            else service_config["remoteServiceId"]
        )
        id2 = (
            service_config["remoteServiceId"]
            if self.tiebreaker
            else service_config["serviceId"]
        )
        label = json.dumps(
            [service_config["serviceType"], id1, id2, id], separators=(",", ":")
        )
        return label
