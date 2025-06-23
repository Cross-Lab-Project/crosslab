from typing import Literal, TypedDict


class MessageServiceEvent(TypedDict):
    message_type: str
    message: str


class MessageServiceConfig(TypedDict):
    serviceType: Literal["https://api.goldi-labs.de/serviceTypes/message"]
