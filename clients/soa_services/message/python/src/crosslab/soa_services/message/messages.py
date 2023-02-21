from typing import Literal, TypedDict


class MessageServiceEvent(TypedDict):
    message_type: str
    message: str


class MessageServiceConfig(TypedDict):
    serviceType: Literal["http://api.goldi-labs.de/serviceTypes/message"]
