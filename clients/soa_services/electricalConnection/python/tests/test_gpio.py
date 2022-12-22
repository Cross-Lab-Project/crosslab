from typing import Any

import pytest
from crosslab.soa_client.connection import Connection, DataChannel, MediaChannel

from crosslab.soa_services.electrical import ElectricalConnectionService
from crosslab.soa_services.electrical.schema import (
    ElectricalServiceConfiguration as ServiceConfig,
)
from crosslab.soa_services.electrical.schema import (
    ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration as InterfaceConfig,
)
from crosslab.soa_services.electrical.schema import PurpleSignals, ServiceType, State
from crosslab.soa_services.electrical.signal_interfaces.gpio import (
    ConstractableGPIOInterface,
    GPIOInterface,
)


class ConnectionStub(Connection):
    def __init__(self, tiebreaker=False):
        self.tiebreaker = tiebreaker
        self.messages = dict()

    def close(self):
        pass

    def transmit(self, serviceConfig, id: str, channel):
        self.messages[id] = []
        if isinstance(channel, DataChannel):
            channel.on("upstreamData", lambda data: self.messages[id].append(data))
            channel.emit("open")

    def receive(self, serviceConfig, id: str, channel):
        raise NotImplementedError()

    def handleSignalingMessage(self, message):
        raise NotImplementedError()

    pass


def test_gpio_meta():
    gci = ConstractableGPIOInterface(["S1", "S2"])
    assert gci.getDescription() == {"availableSignals": {"gpio": ["S1", "S2"]}}


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_gpio_changeDriver(tiebreaker):
    con = ConnectionStub(tiebreaker)
    con.tiebreaker = True
    ecs = ElectricalConnectionService("test")
    gci = ConstractableGPIOInterface(["S1", "S2"])
    ecs.addInterface(gci)

    interface: Any = None

    def newInterface(_interface):
        nonlocal interface
        assert interface is None
        interface = _interface

    ecs.on("newInterface", newInterface)

    serviceConfig = ServiceConfig(
        interfaces=[
            InterfaceConfig(
                interface_id="0",
                interface_type="gpio",
                bus_id="0",
                signals=PurpleSignals("S1"),
                driver=None,
            )
        ],
        service_type=ServiceType.GOLDI_ELECTRICAL,
    )

    ecs.setupConnection(con, serviceConfig.to_dict())

    assert isinstance(interface, GPIOInterface)
    interface.changeDriver(State.HIGH_Z)

    assert con.messages == {
        "data": [
            '{"busId": "0", "data": {"driver": "pc", "state": "unknown"}}',
            '{"busId": "0", "data": {"driver": "pc", "state": "highZ"}}',
        ]
    }


def test_gpip_signal_evaluation():
    gpio = GPIOInterface(None)  # type: ignore
    gpio.driverStates = {"S1": State.HIGH_Z, "S2": State.HIGH_Z}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.UNKNOWN
    gpio.driverStates = {"S1": State.STRONG_H, "S2": State.STRONG_L}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.ERROR
    gpio.driverStates = {"S1": State.STRONG_H, "S2": State.WEAK_L}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.STRONG_H
    gpio.driverStates = {"S1": State.STRONG_L, "S2": State.WEAK_H}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.STRONG_L
    gpio.driverStates = {"S1": State.WEAK_H, "S2": State.WEAK_L}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.UNKNOWN
    gpio.driverStates = {"S1": State.WEAK_H, "S2": State.HIGH_Z}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.WEAK_H
    gpio.driverStates = {"S1": State.WEAK_L, "S2": State.HIGH_Z}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.WEAK_L
    gpio.driverStates = {"S1": State.WEAK_H, "S2": State.HIGH_Z, "S3": State.STRONG_L}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.STRONG_L
    gpio.driverStates = {"S1": State.WEAK_H, "S2": State.ERROR}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.ERROR
    gpio.driverStates = {"S1": State.WEAK_H, "S2": State.UNKNOWN}
    gpio.evaluateSignalState()
    assert gpio.signalState == State.UNKNOWN
    pass
