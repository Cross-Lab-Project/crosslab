from typing import List, Literal, TypedDict


class ParameterDescription(TypedDict):
    name: str
    unit: str
    minimum: float
    maximum: float


class ParameterConfig(ParameterDescription):
    remoteName: str


class ParameterChangedEvent(TypedDict):
    parameter: str
    value: float


class ParameterListChangedEvent(TypedDict):
    parameters: List[ParameterDescription]


class ParameterServiceConfig(TypedDict):
    serviceType: Literal["http://api.goldi-labs.de/serviceTypes/parameter"]
    parameters: List[ParameterConfig]
