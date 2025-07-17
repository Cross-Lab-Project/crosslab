from typing import Dict, Literal, Optional, TypedDict, Union


class ProgrammingServiceConfig(TypedDict):
    serviceType: Literal["https://api.goldi-labs.de/serviceTypes/programming"]


class FileWithoutName(TypedDict):
    type: Literal["file"]
    content: bytes | bytearray


class File(TypedDict):
    type: Literal["file"]
    name: str
    content: bytes | bytearray


class DirectoryWithoutName(TypedDict):
    type: Literal["directory"]
    content: Dict[str, Union[FileWithoutName, "DirectoryWithoutName"]]


class Directory(TypedDict):
    type: Literal["directory"]
    name: str
    content: Dict[str, Union[FileWithoutName, "DirectoryWithoutName"]]


class ProgramRequestMessageContent(TypedDict):
    requestId: str
    program: Union[File, Directory]


class ProgramRequestMessage(TypedDict):
    type: Literal["program:request"]
    content: ProgramRequestMessageContent


class ProgramResponseMessageContent(TypedDict):
    requestId: str
    success: bool
    message: Optional[str]


class ProgramResponseMessage(TypedDict):
    type: Literal["program:response"]
    content: ProgramResponseMessageContent


class ProgramRequestEvent(TypedDict):
    requestId: str
    program: Union[File, Directory]
