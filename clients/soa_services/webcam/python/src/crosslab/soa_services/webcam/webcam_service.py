from aiortc import MediaStreamTrack  # type: ignore
from crosslab.soa_client.connection import Connection, MediaChannel
from crosslab.soa_client.service import Service

from crosslab.soa_services.webcam.messages import WebcamServiceConfig


class WebcamService__Producer(Service):
    service_type = "http://api.goldi-labs.de/serviceTypes/webcam"
    service_direction = "producer"
    service_id: str

    _track: MediaStreamTrack

    def __init__(self, track: MediaStreamTrack, service_id: str):
        self.service_id = service_id
        self._track = track

    def getMeta(self):
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
        }

    def setupConnection(
        self, connection: Connection, serviceConfig: WebcamServiceConfig
    ):
        channel = MediaChannel(self._track)
        connection.transmit(serviceConfig, "video", channel)

    def teardownConnection(self, connection: Connection):
        self._track.stop()
