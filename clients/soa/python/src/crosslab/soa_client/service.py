from abc import ABC, abstractmethod
from typing import Literal


class Service(ABC):
    service_type: str
    service_direction: Literal["in", "out", "inout"]
    service_id: str

    @abstractmethod
    def getMeta(self) -> dict:
        return {
            "serviceId": self.service_id,
            "serviceType": self.service_type,
            "serviceDirection": self.service_direction,
        }

    @abstractmethod
    def setupConnection(self, connection, serviceConfig):
        pass
