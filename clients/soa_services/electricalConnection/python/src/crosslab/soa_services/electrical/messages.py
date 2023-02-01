from typing import List, Literal, TypedDict


class GPIOInterfaceSignals(TypedDict):
    gpio: str


class GPIOInterfaceConfigBase(TypedDict):
    signals: GPIOInterfaceSignals
    interfaceType: Literal["gpio"]
    interfaceId: str
    busId: str


class GPIOInterfaceConfig(GPIOInterfaceConfigBase, total=False):
    driver: str
    direction: Literal["in", "out", "inout"]


SignalInterfaceConfig = GPIOInterfaceConfig


class ElectricalServiceConfig(TypedDict):
    serviceType: Literal["http://api.goldi-labs.de/serviceTypes/electrical"]
    interfaces: List[SignalInterfaceConfig]


State = Literal["unknown", "error", "strongL", "strongH", "highZ", "weakL", "weakH"]


class GPIOInterfaceData(TypedDict):
    driver: str
    state: State
