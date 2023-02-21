from typing import Literal, TypedDict


class FileServiceEvent(TypedDict):
    file_type: str
    content: bytes


class FileServiceConfig(TypedDict):
    serviceType: Literal["http://api.goldi-labs.de/serviceTypes/file"]
