from abc import ABC, abstractmethod
from typing import Dict

from pyee import AsyncIOEventEmitter

from crosslab.soa_services.electrical.schema import (
    ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration as SignalInterfaceConfiguration,
)


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
    def create(self, configuration: SignalInterfaceConfiguration) -> SignalInterface:
        pass
