import re
from typing import Any, Dict, Optional

import aiohttp
from crosslab_api_client import APIClient

from crosslab_soa_client.connection import Connection
from crosslab_soa_client.connection_webrtc import WebRTCPeerConnection
from crosslab_soa_client.schemas import (
    AuthenticationMessage,
    AuthenticationMessageMessageType,
    ClosePeerconnectionMessage,
    ConnectionType,
    CreatePeerconnectionMessage,
    PartialSignalingMessage,
    SignalingMessage,
    SignalingMessageMessageType,
    authentication_message_from_dict,
    authentication_message_to_dict,
    close_peerconnection_message_from_dict,
    create_peerconnection_message_from_dict,
)
from crosslab_soa_client.service import Service


def message_decode(msg: Any):
    try:
        return authentication_message_from_dict(msg)
    except Exception:
        pass
    try:
        return close_peerconnection_message_from_dict(msg)
    except Exception:
        pass
    try:
        return create_peerconnection_message_from_dict(msg)
    except Exception:
        pass
    raise Exception("Unknown message type")


async def receiveMessage(ws: aiohttp.ClientWebSocketResponse):
    msg = await ws.receive()
    if msg.type == aiohttp.WSMsgType.TEXT:
        return message_decode(msg.json())
    else:
        return msg


async def authenticate(
    ws: aiohttp.ClientWebSocketResponse, device_url: str, token: str
):
    await ws.send_json(
        authentication_message_to_dict(
            AuthenticationMessage(
                AuthenticationMessageMessageType.AUTHENTICATE, None, device_url, token
            )
        )
    )
    try:
        authentification_response = await receiveMessage(ws)
        if (
            not isinstance(authentification_response, AuthenticationMessage)
            or not authentification_response.authenticated
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
    token_endpoint = device_url + "/token"
    ws_endpoint = (device_url + "/ws").replace("http", "ws")
    return base_url, device_url, token_endpoint, ws_endpoint


class DeviceHandler:
    _services: Dict[str, Service]
    _connections: Dict[str, Connection]

    def __init__(self):
        self._services = dict()
        self._connections = dict()

    def add_service(self, service: Service):
        self._services[service.service_id] = service

    async def connect(self, url: str, client: Optional[APIClient] = None):
        base_url, device_url, token_endpoint, ws_endpoint = derive_endpoints_from_url(
            url, client.BASE_URL if client else None
        )

        if client is None:
            client = APIClient(base_url)

        async with client:
            async with aiohttp.ClientSession() as session:
                token = await client.postDeviceToken(token_endpoint)
                self.ws = await session.ws_connect(ws_endpoint)
                await authenticate(self.ws, device_url, token)

                await self._message_loop()
                await session.close()

    async def _message_loop(self):
        while True:
            msg = await receiveMessage(self.ws)
            if isinstance(msg, CreatePeerconnectionMessage):
                await self._on_create_peerconnection(msg)
            elif isinstance(msg, ClosePeerconnectionMessage):
                await self._on_close_peerconnection(msg)
            elif isinstance(msg, SignalingMessage):
                await self._on_signaling_message(msg)
            elif isinstance(msg, aiohttp.WSMessage):
                if msg.type == aiohttp.WSMsgType.CLOSED:
                    break
                elif msg.type == aiohttp.WSMsgType.CLOSING:
                    break
                elif msg.type == aiohttp.WSMsgType.CLOSE:
                    await self.ws.close()
                    break
                break
            else:
                raise Exception("Unknown message type")

    async def _on_create_peerconnection(self, msg: CreatePeerconnectionMessage):
        assert msg.connection_url not in self._connections
        if msg.connection_type == ConnectionType.WEBRTC:
            connection = WebRTCPeerConnection()
        else:
            raise Exception("Unknown connection type")
        connection.tiebreaker = msg.tiebreaker
        for service_config in msg.services:
            assert service_config.service_id in self._services  # see Issue #4
            service = self._services.get(service_config.service_id, None)
            assert service is not None  # TODO: Error handling
            service.setupConnection(connection, service_config)

        async def onSignalingMessage(message: PartialSignalingMessage):
            await self.ws.send_json(
                SignalingMessage(
                    SignalingMessageMessageType.SIGNALING,
                    msg.connection_url,
                    message.content,
                    message.signaling_type,
                )
            )

        connection.on("signaling", onSignalingMessage)
        self._connections[msg.connection_url] = connection
        await connection.connect()

    async def _on_close_peerconnection(self, msg: ClosePeerconnectionMessage):
        connection = self._connections.get(msg.connection_url, None)
        assert connection is not None  # TODO: Error handling
        await connection.close()
        del self._connections[msg.connection_url]

    async def _on_signaling_message(self, msg: SignalingMessage):
        connection = self._connections.get(msg.connection_url, None)
        assert connection is not None  # TODO: Error handling
        await connection.handleSignalingMessage(msg)
