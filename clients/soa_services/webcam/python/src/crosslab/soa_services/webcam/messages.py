from typing import Literal, TypedDict


class ElectricalServiceConfig(TypedDict):
    serviceType: Literal["http://api.goldi-labs.de/serviceTypes/webcam"]
