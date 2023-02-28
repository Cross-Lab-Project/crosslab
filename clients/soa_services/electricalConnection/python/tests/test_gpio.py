from typing import Any

import pytest
from crosslab.soa_client.connection import Connection, DataChannel, MediaChannel

from crosslab.soa_services.electrical import ElectricalConnectionService
from crosslab.soa_services.electrical.messages import ElectricalServiceConfig
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

    serviceConfig: ElectricalServiceConfig = {
        "serviceType": "http://api.goldi-labs.de/serviceTypes/electrical",
        "interfaces": [
            {
                "interfaceId": "0",
                "interfaceType": "gpio",
                "busId": "0",
                "signals": {"gpio": "S1"},
                "direction": "inout",
            }
        ],
    }

    ecs.setupConnection(con, serviceConfig)

    assert isinstance(interface, GPIOInterface)
    interface.changeDriver("highZ")

    assert con.messages == {
        "data": [
            '{"busId": "0", "data": {"driver": "pc", "state": "unknown"}}',
            '{"busId": "0", "data": {"driver": "pc", "state": "highZ"}}',
        ]
    }


def test_gpip_signal_evaluation():
    gpio = GPIOInterface(None)  # type: ignore
    gpio.driverStates = {"S1": "highZ", "S2": "highZ"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "unknown"
    gpio.driverStates = {"S1": "strongH", "S2": "strongL"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "error"
    gpio.driverStates = {"S1": "strongH", "S2": "weakL"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "strongH"
    gpio.driverStates = {"S1": "strongL", "S2": "weakH"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "strongL"
    gpio.driverStates = {"S1": "weakH", "S2": "weakL"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "unknown"
    gpio.driverStates = {"S1": "weakH", "S2": "highZ"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "weakH"
    gpio.driverStates = {"S1": "weakL", "S2": "highZ"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "weakL"
    gpio.driverStates = {"S1": "weakH", "S2": "highZ", "S3": "strongL"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "strongL"
    gpio.driverStates = {"S1": "weakH", "S2": "error"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "error"
    gpio.driverStates = {"S1": "weakH", "S2": "unknown"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "unknown"
    pass
