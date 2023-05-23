from typing import Any

import pytest
from crosslab.soa_client.test_helper import ConnectionStub
from data import serviceConfig

from crosslab.soa_services.electrical import ElectricalConnectionService
from crosslab.soa_services.electrical.messages import ElectricalServiceConfig
from crosslab.soa_services.electrical.signal_interfaces.gpio import (
    ConstractableGPIOInterface,
    GPIOInterface,
)


def test_gpio_meta():
    gci = ConstractableGPIOInterface(["S1", "S2"])
    assert gci.getDescription() == {"availableSignals": {"gpio": ["S1", "S2"]}, "direction": "inout"}


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_gpio_interface_creation(tiebreaker):
    con = ConnectionStub(tiebreaker)
    ecs = ElectricalConnectionService("test")
    gci = ConstractableGPIOInterface(["S1", "S2"])
    ecs.addInterface(gci)

    interface: Any = None

    def newInterface(_interface):
        nonlocal interface
        assert interface is None
        interface = _interface
        assert isinstance(interface, GPIOInterface)

    ecs.on("newInterface", newInterface)

    ecs.setupConnection(con, serviceConfig)


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_gpio_changeDriver(tiebreaker):
    con = ConnectionStub(tiebreaker)
    ecs = ElectricalConnectionService("test")
    gci = ConstractableGPIOInterface(["S1", "S2"])
    ecs.addInterface(gci)

    interface: Any = None

    def newInterface(_interface):
        nonlocal interface
        interface = _interface

    ecs.on("newInterface", newInterface)

    ecs.setupConnection(con, serviceConfig)

    assert isinstance(interface, GPIOInterface)
    interface.changeDriver("highZ")

    assert con.messages == {
        "data": [
            '{"busId": "0", "data": {"driver": "default", "state": "unknown"}}',
            '{"busId": "0", "data": {"driver": "default", "state": "highZ"}}',
        ]
    }


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_gpio_signalChange(tiebreaker):
    con = ConnectionStub(tiebreaker)
    ecs = ElectricalConnectionService("test")
    gci = ConstractableGPIOInterface(["S1", "S2"])
    ecs.addInterface(gci)

    signalChanges = []

    def newInterface(interface):
        nonlocal signalChanges
        interface.on("signalChange", lambda event: signalChanges.append(event.state))

    ecs.on("newInterface", newInterface)
    ecs.setupConnection(con, serviceConfig)
    con.channels["data"].emit(
        "data", '{"busId": "0", "data": {"driver": "default", "state": "weakH"}}'
    )
    assert signalChanges == ["weakH"]


def test_gpip_signal_evaluation():
    gpio = GPIOInterface({})  # type: ignore

    gpio.driverStates = {"S1": "highZ", "S2": "unknown"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "unknown"

    gpio.driverStates = {"S1": "highZ", "S2": "highZ"}
    gpio.evaluateSignalState()
    assert gpio.signalState == "highZ"

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
