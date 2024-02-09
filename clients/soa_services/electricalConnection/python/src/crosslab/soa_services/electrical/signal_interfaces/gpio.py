from dataclasses import dataclass
from typing import Dict, List, Literal, Optional

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
    configuration: GPIOInterfaceConfig  # TODO: Deprecate this

    _driverState: State = "unknown"
    _driver: Optional[str] = None

    def __init__(self, configuration: GPIOInterfaceConfig):
        super().__init__()
        self.driverStates = dict()
        self.signalState = "unknown"
        self.configuration = configuration
        if configuration.get("direction", "inout") != "in":
            self._driver = configuration.get("driver", "default")

    def changeDriver(self, state: State):
        if self._driver:
            self._driverState = state
            data = GPIOInterfaceData(driver=self._driver, state=state)
            self.emit("upstreamData", data)
            self.downstreamData(data)

    def retransmit(self):
        if self._driver:
            self.emit(
                "upstreamData",
                GPIOInterfaceData(
                    driver=self._driver,
                    state=self._driverState,
                ),
            )

    def downstreamData(self, data: GPIOInterfaceData):
        self.driverStates[data.get("driver", "default")] = data["state"]
        self.evaluateSignalState()

    def evaluateSignalState(self):
        states = set(self.driverStates.values())

        newState: State = "highZ"
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

    def __init__(self, gpios: List[str], direction: Literal["in", "out", "inout"] = "inout"):
        self.gpios = gpios
        self.direction = direction

    def getDescription(self):
        return {"availableSignals": {"gpio": self.gpios}, "direction": self.direction}

    def create(self, interfaceConfig):
        return GPIOInterface(interfaceConfig)
