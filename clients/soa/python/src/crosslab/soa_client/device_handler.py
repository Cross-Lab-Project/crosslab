import asyncio
import re
from typing import Dict, Optional

import aiohttp
from crosslab.api_client import APIClient  # type: ignore
from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_client.connection import Connection
from crosslab.soa_client.connection_webrtc import WebRTCPeerConnection
from crosslab.soa_client.messages import (
    AuthenticationMessage,
    ClosePeerConnectionMessage,
    ConfigurationMessage,
    ConnectionStateChangedMessage,
    CreatePeerConnectionMessage,
    ExperimentStatusChangedMessage,
    SignalingMessage,
)
from crosslab.soa_client.service import Service


async def receiveMessage(ws: aiohttp.ClientWebSocketResponse):
    msg = await ws.receive()
    print(msg)
    if msg.type == aiohttp.WSMsgType.TEXT:
        return msg.json()
    else:
        return msg


def cleandict(d):
    if not isinstance(d, dict):
        return d
    return dict((k, cleandict(v)) for k, v in d.items() if v is not None)


async def authenticate(
    ws: aiohttp.ClientWebSocketResponse, device_url: str, token: str
):
    authMessage: AuthenticationMessage = {"messageType": "authenticate", "token": token}
    await ws.send_json(authMessage)
    try:
        authentification_response = await receiveMessage(ws)
        if (
            authentification_response["messageType"] != "authenticate"
            or not authentification_response["authenticated"]
        ):
            raise Exception()
    except Exception:
        raise Exception("Authentication failed")


def derive_endpoints_from_url(url: str, fallback_base_url: Optional[str] = None):
    url_match = re.match(
        r"^(https?:\/\/[^\/]+)?\/?(devices\/([^\/]*))(\/token|\/ws)?$", url
    )
    if url_match is None:
        raise ValueError("Invalid URL")
    base_url = str(url_match.group(1)) or fallback_base_url
    if base_url is None:
        raise ValueError("Base URL for device not found")
    device_url = base_url + "/" + url_match.group(2)
    token_endpoint = device_url
    ws_endpoint = (base_url + "/devices/websocket").replace("http", "ws")
    return base_url, device_url, token_endpoint, ws_endpoint


class DeviceHandler(AsyncIOEventEmitter):
    _services: Dict[str, Service]
    _connections: Dict[str, Connection]

    def __init__(self):
        super().__init__()
        self._services = dict()
        self._connections = dict()

    def add_service(self, service: Service):
        self._services[service.service_id] = service

    async def connect(self, url: str, client: Optional[APIClient] = None):
        base_url, device_url, token_endpoint, ws_endpoint = derive_endpoints_from_url(
            url, client.BASE_URL if client else None
        )

        if client is None:
            self.client = APIClient(base_url)
        else:
            self.client = client

        async with self.client:
            async with aiohttp.ClientSession() as self.session:
                await self.client.update_device(
                    device_url, {"type": "device", "services": self.get_service_meta()}
                )
                token = await self.client.create_websocket_token(token_endpoint)
                self.emit("websocketToken", token)
                self.ws = await self.session.ws_connect(ws_endpoint)
                await authenticate(self.ws, device_url, token)
                self.emit("websocketConnected")

                await self._message_loop()

    def get_service_meta(self):
        return [service.getMeta() for service in self._services.values()]

    async def _message_loop(self):
        while True:
            msg = await receiveMessage(self.ws)
            if isinstance(msg, aiohttp.WSMessage):
                if msg.type == aiohttp.WSMsgType.CLOSED:
                    print("closed")
                    break
                elif msg.type == aiohttp.WSMsgType.CLOSING:
                    print("closing")
                    break
                elif msg.type == aiohttp.WSMsgType.CLOSE:
                    print("close")
                    await self.ws.close()
                    break
                break
            elif (
                msg["messageType"] == "command"
                and msg["command"] == "createPeerconnection"
            ):
                await self._on_create_peerconnection(msg)
            elif (
                msg["messageType"] == "command"
                and msg["command"] == "closePeerconnection"
            ):
                await self._on_close_peerconnection(msg)
            elif msg["messageType"] == "signaling":
                await self._on_signaling_message(msg)
            elif msg["messageType"] == "configuration":
                await self._on_configuration_message(msg)
            elif msg["messageType"] == "experiment-status-changed":
                await self._on_experiment_status_changed_message(msg)
            else:
                pass  # Do not raise any Exception here, so we are forward compatible for new message types

    async def _on_create_peerconnection(self, msg: CreatePeerConnectionMessage):
        assert msg["connectionUrl"] not in self._connections
        if msg["connectionType"] == "webrtc":
            connection = WebRTCPeerConnection()
        else:
            raise Exception("Unknown connection type")
        connection.tiebreaker = msg["tiebreaker"]
        for service_config in msg["services"]:
            assert service_config["serviceId"] in self._services  # see Issue #4
            service = self._services.get(service_config["serviceId"], None)
            assert service is not None  # TODO: Error handling
            if asyncio.iscoroutinefunction(service.setupConnection):
                await service.setupConnection(connection, service_config)
            else:
                service.setupConnection(connection, service_config)

        async def onSignalingMessage(message: dict):
            signalingMessage: SignalingMessage = {
                "connectionUrl": msg["connectionUrl"],
                "content": message["content"],
                "signalingType": message["signalingType"],
                "messageType": "signaling",
            }
            await self.ws.send_json(signalingMessage)

        async def onConnectionChanged():
            connectionChangedMessage: ConnectionStateChangedMessage = {
                "connectionUrl": msg["connectionUrl"],
                "messageType": "connection-state-changed",
                "status": connection.state,
            }
            await self.ws.send_json(connectionChangedMessage)
            self.emit("connectionsChanged")

        connection.on("signaling", onSignalingMessage)
        connection.on("connectionChanged", onConnectionChanged)
        self._connections[msg["connectionUrl"]] = connection
        self.emit("connectionsChanged")
        await connection.connect()

    async def _on_close_peerconnection(self, msg: ClosePeerConnectionMessage):
        connection = self._connections.get(msg["connectionUrl"], None)
        if connection is None:
            return
        await connection.close()
        del self._connections[msg["connectionUrl"]]

    async def _on_signaling_message(self, msg: SignalingMessage):
        connection = self._connections.get(msg["connectionUrl"], None)
        assert connection is not None  # TODO: Error handling
        await connection.handleSignalingMessage(msg)

    async def _on_configuration_message(self, msg: ConfigurationMessage):
        self.emit("configuration", msg["configuration"])

    async def _on_experiment_status_changed_message(
        self, msg: ExperimentStatusChangedMessage
    ):
        self.emit(
            "experimentStatusChanged",
            {"status": msg["status"], "message": msg.get("message")},
        )
