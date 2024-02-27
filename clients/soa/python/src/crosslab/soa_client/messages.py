from typing import List, Literal, TypedDict, Optional


class Message(TypedDict):
    messageType: str


class CommandMessage(TypedDict):
    messageType: Literal["command"]
    command: str


class AuthenticationMessageBase(TypedDict):
    messageType: Literal["authenticate"]
    token: str


class AuthenticationMessage(AuthenticationMessageBase, total=False):
    authenticated: bool


class SignalingMessage(TypedDict):
    messageType: Literal["signaling"]
    signalingType: Literal["offer", "answer", "candidate"]
    connectionUrl: str
    content: dict


class ClosePeerConnectionMessage(TypedDict):
    messageType: Literal["command"]
    command: Literal["closePeerconnection"]
    connectionUrl: str


class ServiceConfig(TypedDict):
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerConnectionMessage(TypedDict):
    messageType: Literal["command"]
    command: Literal["createPeerconnection"]
    connectionType: Literal["websocket", "webrtc"]
    connectionUrl: str
    services: List[ServiceConfig]
    tiebreaker: bool
    config: dict


class ConnectionStateChangedMessage(TypedDict):
    messageType: Literal["connection-state-changed"]
    connectionUrl: str
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]


class ConfigurationMessage(TypedDict):
    messageType: Literal["configuration"]
    configuration: dict


class ExperimentStatusChangedMessage(TypedDict):
    messageType: Literal["experiment-status-changed"]
    status: Literal["created", "booked", "setup", "running", "failed", "closed"]
    message: Optional[str]
