from dataclasses import dataclass
from typing import Dict, List

from crosslab.soa_services.electrical import (
    ConstructableSignalInterface,
    SignalInterface,
)
from crosslab.soa_services.electrical.messages import (
    GPIOInterfaceConfig,
    GPIOInterfaceData,
    State,
)


@dataclass
class GPIOSignalChangeEventData:
    oldState: State
    state: State


class GPIOInterface(SignalInterface):
    driverStates: Dict[str, State]
    interfaceType = "gpio"
    signalState: State

    def __init__(self, configuration: GPIOInterfaceConfig):
        super().__init__()
        self.driverStates = dict()
        self.signalState = "unknown"
        self.configuration = configuration

    def changeDriver(self, state: State):
        data = GPIOInterfaceData(
            driver=self.configuration.get("driver", "pc"), state=state
        )
        self.emit("upstreamData", data)
        self.downstreamData(data)

    def retransmit(self):
        if "pc" in self.driverStates:
            self.emit(
                "upstreamData",
                GPIOInterfaceData(
                    driver=self.configuration.get("driver", "pc"),
                    state=self.driverStates["pc"],
                ),
            )
        else:
            self.emit(
                "upstreamData",
                GPIOInterfaceData(
                    driver=self.configuration.get("driver", "pc"),
                    state="unknown",
                ),
            )

    def downstreamData(self, data: GPIOInterfaceData):
        self.driverStates[data["driver"]] = data["state"]
        self.evaluateSignalState()

    def evaluateSignalState(self):
        states = set(self.driverStates.values())

        newState: State = "unknown"
        if "error" in states:
            newState = "error"
        elif "strongH" in states and "strongL" in states:
            newState = "error"
        elif "unknown" in states:
            newState = "unknown"
        elif "strongH" in states:
            newState = "strongH"
        elif "strongL" in states:
            newState = "strongL"
        elif "weakH" in states and "weakL" in states:
            newState = "unknown"
        elif "weakH" in states:
            newState = "weakH"
        elif "weakL" in states:
            newState = "weakL"

        if newState is not self.signalState:
            data = GPIOSignalChangeEventData(self.signalState, newState)
            self.signalState = newState
            self.emit("signalChange", data)


class ConstractableGPIOInterface(ConstructableSignalInterface):
    interfaceType = "gpio"

    def __init__(self, gpios: List[str]):
        self.gpios = gpios

    def getDescription(self):
        return {"availableSignals": {"gpio": self.gpios}}

    def create(self, interfaceConfig):
        return GPIOInterface(interfaceConfig)
