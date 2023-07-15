from abc import ABC, abstractmethod
from typing import Awaitable, Literal, Union

from crosslab.soa_client.connection import Connection


class Service(ABC):
    service_type: str
    service_direction: Literal["producer", "consumer", "prosumer"]
    service_id: str

    @abstractmethod
    def getMeta(self) -> dict:
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
        }

    @abstractmethod
    def setupConnection(
        self, connection: Connection, serviceConfig
    ) -> Union[None, Awaitable[None]]:
        pass

    @abstractmethod
    def teardownConnection(
        self, connection: Connection
    ) -> Union[None, Awaitable[None]]:
        pass
