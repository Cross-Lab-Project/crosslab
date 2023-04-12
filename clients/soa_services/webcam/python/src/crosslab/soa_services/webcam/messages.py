from typing import Literal, TypedDict


class WebcamServiceConfig(TypedDict):
    serviceType: Literal["http://api.goldi-labs.de/serviceTypes/webcam"]
