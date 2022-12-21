from dataclasses import dataclass
from typing import Dict, List

from crosslab.soa_services.electrical import (
    ConstructableSignalInterface,
    SignalInterface,
)
from crosslab.soa_services.electrical.schema import (
    GPIOInterfaceConfiguration,
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

    def __init__(self, configuration: GPIOInterfaceConfiguration):
        super().__init__()
        self.driverStates = dict()
        self.signalState = State.UNKNOWN
        self.configuration = configuration

    def changeDriver(self, state: State):
        data = GPIOInterfaceData(driver=self.configuration.driver or "pc", state=state)
        self.emit("upstreamData", data)
        self.downstreamData(data)

    def retransmit(self):
        if "pc" in self.driverStates:
            self.emit(
                "upstreamData",
                GPIOInterfaceData(
                    driver=self.configuration.driver or "pc",
                    state=self.driverStates["pc"],
                ),
            )
        else:
            self.emit(
                "upstreamData",
                GPIOInterfaceData(
                    driver=self.configuration.driver or "pc",
                    state=State.UNKNOWN,
                ),
            )

    def downstreamData(self, data: GPIOInterfaceData):
        self.driverStates[data.driver] = data.state
        self.evaluateSignalState()

    def evaluateSignalState(self):
        states = set(self.driverStates.values())

        newState: State = State.UNKNOWN
        if State.ERROR in states:
            newState = State.ERROR
        elif State.STRONG_H in states and State.STRONG_L in states:
            newState = State.ERROR
        elif State.UNKNOWN in states:
            newState = State.UNKNOWN
        elif State.STRONG_H in states:
            newState = State.STRONG_H
        elif State.STRONG_L in states:
            newState = State.STRONG_L
        elif State.WEAK_H in states and State.WEAK_L in states:
            newState = State.UNKNOWN
        elif State.WEAK_H in states:
            newState = State.WEAK_H
        elif State.WEAK_L in states:
            newState = State.WEAK_L

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
