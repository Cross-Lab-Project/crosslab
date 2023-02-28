from abc import ABC, abstractmethod
from typing import Dict

from pyee.asyncio import AsyncIOEventEmitter

from crosslab.soa_services.electrical.messages import SignalInterfaceConfig


class SignalInterface(ABC, AsyncIOEventEmitter):
    @abstractmethod
    def downstreamData(self, data):
        pass

    @abstractmethod
    def retransmit(self):
        pass


class ConstructableSignalInterface(ABC):
    interfaceType: str

    @abstractmethod
    def getDescription(self) -> Dict:
        pass

    @abstractmethod
    def create(self, configuration: SignalInterfaceConfig) -> SignalInterface:
        pass
