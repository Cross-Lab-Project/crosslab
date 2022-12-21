# To use this code, make sure you
#
#     import json
#
# and then, to convert JSON from a string, do
#
#     result = electrical_service_configuration_from_dict(json.loads(json_string))
#     result = electrical_service_configuration_write_from_dict(json.loads(json_string))
#     result = electrical_service_configuration_read_from_dict(json.loads(json_string))
#     result = gpio_interface_configuration_from_dict(json.loads(json_string))
#     result = gpio_interface_configuration_write_from_dict(json.loads(json_string))
#     result = gpio_interface_configuration_read_from_dict(json.loads(json_string))
#     result = gpio_interface_data_from_dict(json.loads(json_string))
#     result = gpio_interface_data_write_from_dict(json.loads(json_string))
#     result = gpio_interface_data_read_from_dict(json.loads(json_string))
#     result = signal_interface_configuration_from_dict(json.loads(json_string))
#     result = signal_interface_configuration_write_from_dict(json.loads(json_string))
#     result = signal_interface_configuration_read_from_dict(json.loads(json_string))
#     result = upstream_signal_interface_configuration_from_dict(json.loads(json_string))
#     result = upstream_signal_interface_configuration_write_from_dict(json.loads(json_string))
#     result = upstream_signal_interface_configuration_read_from_dict(json.loads(json_string))

from typing import Optional, Any, List, TypeVar, Type, cast, Callable
from enum import Enum


T = TypeVar("T")
EnumT = TypeVar("EnumT", bound=Enum)


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_union(fs, x):
    for f in fs:
        try:
            return f(x)
        except:
            pass
    assert False


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def to_enum(c: Type[EnumT], x: Any) -> EnumT:
    assert isinstance(x, c)
    return x.value


class PurpleSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return PurpleSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: PurpleSignals
    bus_id: str
    interface_id: str
    interface_type: str

    def __init__(self, driver: Optional[str], signals: PurpleSignals, bus_id: str, interface_id: str, interface_type: str) -> None:
        self.driver = driver
        self.signals = signals
        self.bus_id = bus_id
        self.interface_id = interface_id
        self.interface_type = interface_type

    @staticmethod
    def from_dict(obj: Any) -> 'ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = PurpleSignals.from_dict(obj.get("signals"))
        bus_id = from_str(obj.get("busId"))
        interface_id = from_str(obj.get("interfaceId"))
        interface_type = from_str(obj.get("interfaceType"))
        return ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration(driver, signals, bus_id, interface_id, interface_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(PurpleSignals, self.signals)
        result["busId"] = from_str(self.bus_id)
        result["interfaceId"] = from_str(self.interface_id)
        result["interfaceType"] = from_str(self.interface_type)
        return result


class ServiceType(Enum):
    GOLDI_ELECTRICAL = "goldi/electrical"


class ElectricalServiceConfiguration:
    interfaces: List[ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration]
    service_type: ServiceType

    def __init__(self, interfaces: List[ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration], service_type: ServiceType) -> None:
        self.interfaces = interfaces
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'ElectricalServiceConfiguration':
        assert isinstance(obj, dict)
        interfaces = from_list(ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration.from_dict, obj.get("interfaces"))
        service_type = ServiceType(obj.get("serviceType"))
        return ElectricalServiceConfiguration(interfaces, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["interfaces"] = from_list(lambda x: to_class(ElectricalServiceConfigurationUpstreamSignalInterfaceConfiguration, x), self.interfaces)
        result["serviceType"] = to_enum(ServiceType, self.service_type)
        return result


class FluffySignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'FluffySignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return FluffySignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: FluffySignals
    bus_id: str
    interface_id: str
    interface_type: str

    def __init__(self, driver: Optional[str], signals: FluffySignals, bus_id: str, interface_id: str, interface_type: str) -> None:
        self.driver = driver
        self.signals = signals
        self.bus_id = bus_id
        self.interface_id = interface_id
        self.interface_type = interface_type

    @staticmethod
    def from_dict(obj: Any) -> 'ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = FluffySignals.from_dict(obj.get("signals"))
        bus_id = from_str(obj.get("busId"))
        interface_id = from_str(obj.get("interfaceId"))
        interface_type = from_str(obj.get("interfaceType"))
        return ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration(driver, signals, bus_id, interface_id, interface_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(FluffySignals, self.signals)
        result["busId"] = from_str(self.bus_id)
        result["interfaceId"] = from_str(self.interface_id)
        result["interfaceType"] = from_str(self.interface_type)
        return result


class ElectricalServiceConfigurationWrite:
    interfaces: List[ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration]
    service_type: ServiceType

    def __init__(self, interfaces: List[ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration], service_type: ServiceType) -> None:
        self.interfaces = interfaces
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'ElectricalServiceConfigurationWrite':
        assert isinstance(obj, dict)
        interfaces = from_list(ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration.from_dict, obj.get("interfaces"))
        service_type = ServiceType(obj.get("serviceType"))
        return ElectricalServiceConfigurationWrite(interfaces, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["interfaces"] = from_list(lambda x: to_class(ElectricalServiceConfigurationWriteUpstreamSignalInterfaceConfiguration, x), self.interfaces)
        result["serviceType"] = to_enum(ServiceType, self.service_type)
        return result


class TentacledSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return TentacledSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: TentacledSignals
    bus_id: str
    interface_id: str
    interface_type: str

    def __init__(self, driver: Optional[str], signals: TentacledSignals, bus_id: str, interface_id: str, interface_type: str) -> None:
        self.driver = driver
        self.signals = signals
        self.bus_id = bus_id
        self.interface_id = interface_id
        self.interface_type = interface_type

    @staticmethod
    def from_dict(obj: Any) -> 'ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = TentacledSignals.from_dict(obj.get("signals"))
        bus_id = from_str(obj.get("busId"))
        interface_id = from_str(obj.get("interfaceId"))
        interface_type = from_str(obj.get("interfaceType"))
        return ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration(driver, signals, bus_id, interface_id, interface_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(TentacledSignals, self.signals)
        result["busId"] = from_str(self.bus_id)
        result["interfaceId"] = from_str(self.interface_id)
        result["interfaceType"] = from_str(self.interface_type)
        return result


class ElectricalServiceConfigurationRead:
    interfaces: List[ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration]
    service_type: ServiceType

    def __init__(self, interfaces: List[ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration], service_type: ServiceType) -> None:
        self.interfaces = interfaces
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'ElectricalServiceConfigurationRead':
        assert isinstance(obj, dict)
        interfaces = from_list(ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration.from_dict, obj.get("interfaces"))
        service_type = ServiceType(obj.get("serviceType"))
        return ElectricalServiceConfigurationRead(interfaces, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["interfaces"] = from_list(lambda x: to_class(ElectricalServiceConfigurationReadUpstreamSignalInterfaceConfiguration, x), self.interfaces)
        result["serviceType"] = to_enum(ServiceType, self.service_type)
        return result


class GPIOInterfaceConfigurationSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceConfigurationSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return GPIOInterfaceConfigurationSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class GPIOInterfaceConfiguration:
    driver: Optional[str]
    signals: GPIOInterfaceConfigurationSignals

    def __init__(self, driver: Optional[str], signals: GPIOInterfaceConfigurationSignals) -> None:
        self.driver = driver
        self.signals = signals

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceConfiguration':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = GPIOInterfaceConfigurationSignals.from_dict(obj.get("signals"))
        return GPIOInterfaceConfiguration(driver, signals)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(GPIOInterfaceConfigurationSignals, self.signals)
        return result


class GPIOInterfaceConfigurationWriteSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceConfigurationWriteSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return GPIOInterfaceConfigurationWriteSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class GPIOInterfaceConfigurationWrite:
    driver: Optional[str]
    signals: GPIOInterfaceConfigurationWriteSignals

    def __init__(self, driver: Optional[str], signals: GPIOInterfaceConfigurationWriteSignals) -> None:
        self.driver = driver
        self.signals = signals

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceConfigurationWrite':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = GPIOInterfaceConfigurationWriteSignals.from_dict(obj.get("signals"))
        return GPIOInterfaceConfigurationWrite(driver, signals)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(GPIOInterfaceConfigurationWriteSignals, self.signals)
        return result


class GPIOInterfaceConfigurationReadSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceConfigurationReadSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return GPIOInterfaceConfigurationReadSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class GPIOInterfaceConfigurationRead:
    driver: Optional[str]
    signals: GPIOInterfaceConfigurationReadSignals

    def __init__(self, driver: Optional[str], signals: GPIOInterfaceConfigurationReadSignals) -> None:
        self.driver = driver
        self.signals = signals

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceConfigurationRead':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = GPIOInterfaceConfigurationReadSignals.from_dict(obj.get("signals"))
        return GPIOInterfaceConfigurationRead(driver, signals)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(GPIOInterfaceConfigurationReadSignals, self.signals)
        return result


class State(Enum):
    ERROR = "error"
    HIGH_Z = "highZ"
    STRONG_H = "strongH"
    STRONG_L = "strongL"
    UNKNOWN = "unknown"
    WEAK_H = "weakH"
    WEAK_L = "weakL"


class GPIOInterfaceData:
    """Data for a GPIO interface"""
    driver: str
    state: State

    def __init__(self, driver: str, state: State) -> None:
        self.driver = driver
        self.state = state

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceData':
        assert isinstance(obj, dict)
        driver = from_str(obj.get("driver"))
        state = State(obj.get("state"))
        return GPIOInterfaceData(driver, state)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_str(self.driver)
        result["state"] = to_enum(State, self.state)
        return result


class GPIOInterfaceDataWrite:
    """Data for a GPIO interface"""
    driver: str
    state: State

    def __init__(self, driver: str, state: State) -> None:
        self.driver = driver
        self.state = state

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceDataWrite':
        assert isinstance(obj, dict)
        driver = from_str(obj.get("driver"))
        state = State(obj.get("state"))
        return GPIOInterfaceDataWrite(driver, state)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_str(self.driver)
        result["state"] = to_enum(State, self.state)
        return result


class GPIOInterfaceDataRead:
    """Data for a GPIO interface"""
    driver: str
    state: State

    def __init__(self, driver: str, state: State) -> None:
        self.driver = driver
        self.state = state

    @staticmethod
    def from_dict(obj: Any) -> 'GPIOInterfaceDataRead':
        assert isinstance(obj, dict)
        driver = from_str(obj.get("driver"))
        state = State(obj.get("state"))
        return GPIOInterfaceDataRead(driver, state)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_str(self.driver)
        result["state"] = to_enum(State, self.state)
        return result


class SignalInterfaceConfigurationSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'SignalInterfaceConfigurationSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return SignalInterfaceConfigurationSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class SignalInterfaceConfiguration:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: SignalInterfaceConfigurationSignals

    def __init__(self, driver: Optional[str], signals: SignalInterfaceConfigurationSignals) -> None:
        self.driver = driver
        self.signals = signals

    @staticmethod
    def from_dict(obj: Any) -> 'SignalInterfaceConfiguration':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = SignalInterfaceConfigurationSignals.from_dict(obj.get("signals"))
        return SignalInterfaceConfiguration(driver, signals)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(SignalInterfaceConfigurationSignals, self.signals)
        return result


class SignalInterfaceConfigurationWriteSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'SignalInterfaceConfigurationWriteSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return SignalInterfaceConfigurationWriteSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class SignalInterfaceConfigurationWrite:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: SignalInterfaceConfigurationWriteSignals

    def __init__(self, driver: Optional[str], signals: SignalInterfaceConfigurationWriteSignals) -> None:
        self.driver = driver
        self.signals = signals

    @staticmethod
    def from_dict(obj: Any) -> 'SignalInterfaceConfigurationWrite':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = SignalInterfaceConfigurationWriteSignals.from_dict(obj.get("signals"))
        return SignalInterfaceConfigurationWrite(driver, signals)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(SignalInterfaceConfigurationWriteSignals, self.signals)
        return result


class SignalInterfaceConfigurationReadSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'SignalInterfaceConfigurationReadSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return SignalInterfaceConfigurationReadSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class SignalInterfaceConfigurationRead:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: SignalInterfaceConfigurationReadSignals

    def __init__(self, driver: Optional[str], signals: SignalInterfaceConfigurationReadSignals) -> None:
        self.driver = driver
        self.signals = signals

    @staticmethod
    def from_dict(obj: Any) -> 'SignalInterfaceConfigurationRead':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = SignalInterfaceConfigurationReadSignals.from_dict(obj.get("signals"))
        return SignalInterfaceConfigurationRead(driver, signals)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(SignalInterfaceConfigurationReadSignals, self.signals)
        return result


class UpstreamSignalInterfaceConfigurationSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'UpstreamSignalInterfaceConfigurationSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return UpstreamSignalInterfaceConfigurationSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class UpstreamSignalInterfaceConfiguration:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: UpstreamSignalInterfaceConfigurationSignals
    bus_id: str
    interface_id: str
    interface_type: str

    def __init__(self, driver: Optional[str], signals: UpstreamSignalInterfaceConfigurationSignals, bus_id: str, interface_id: str, interface_type: str) -> None:
        self.driver = driver
        self.signals = signals
        self.bus_id = bus_id
        self.interface_id = interface_id
        self.interface_type = interface_type

    @staticmethod
    def from_dict(obj: Any) -> 'UpstreamSignalInterfaceConfiguration':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = UpstreamSignalInterfaceConfigurationSignals.from_dict(obj.get("signals"))
        bus_id = from_str(obj.get("busId"))
        interface_id = from_str(obj.get("interfaceId"))
        interface_type = from_str(obj.get("interfaceType"))
        return UpstreamSignalInterfaceConfiguration(driver, signals, bus_id, interface_id, interface_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(UpstreamSignalInterfaceConfigurationSignals, self.signals)
        result["busId"] = from_str(self.bus_id)
        result["interfaceId"] = from_str(self.interface_id)
        result["interfaceType"] = from_str(self.interface_type)
        return result


class UpstreamSignalInterfaceConfigurationWriteSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'UpstreamSignalInterfaceConfigurationWriteSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return UpstreamSignalInterfaceConfigurationWriteSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class UpstreamSignalInterfaceConfigurationWrite:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: UpstreamSignalInterfaceConfigurationWriteSignals
    bus_id: str
    interface_id: str
    interface_type: str

    def __init__(self, driver: Optional[str], signals: UpstreamSignalInterfaceConfigurationWriteSignals, bus_id: str, interface_id: str, interface_type: str) -> None:
        self.driver = driver
        self.signals = signals
        self.bus_id = bus_id
        self.interface_id = interface_id
        self.interface_type = interface_type

    @staticmethod
    def from_dict(obj: Any) -> 'UpstreamSignalInterfaceConfigurationWrite':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = UpstreamSignalInterfaceConfigurationWriteSignals.from_dict(obj.get("signals"))
        bus_id = from_str(obj.get("busId"))
        interface_id = from_str(obj.get("interfaceId"))
        interface_type = from_str(obj.get("interfaceType"))
        return UpstreamSignalInterfaceConfigurationWrite(driver, signals, bus_id, interface_id, interface_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(UpstreamSignalInterfaceConfigurationWriteSignals, self.signals)
        result["busId"] = from_str(self.bus_id)
        result["interfaceId"] = from_str(self.interface_id)
        result["interfaceType"] = from_str(self.interface_type)
        return result


class UpstreamSignalInterfaceConfigurationReadSignals:
    gpio: Optional[str]

    def __init__(self, gpio: Optional[str]) -> None:
        self.gpio = gpio

    @staticmethod
    def from_dict(obj: Any) -> 'UpstreamSignalInterfaceConfigurationReadSignals':
        assert isinstance(obj, dict)
        gpio = from_union([from_str, from_none], obj.get("gpio"))
        return UpstreamSignalInterfaceConfigurationReadSignals(gpio)

    def to_dict(self) -> dict:
        result: dict = {}
        result["gpio"] = from_union([from_str, from_none], self.gpio)
        return result


class UpstreamSignalInterfaceConfigurationRead:
    """Configuration for a signal interface"""
    driver: Optional[str]
    signals: UpstreamSignalInterfaceConfigurationReadSignals
    bus_id: str
    interface_id: str
    interface_type: str

    def __init__(self, driver: Optional[str], signals: UpstreamSignalInterfaceConfigurationReadSignals, bus_id: str, interface_id: str, interface_type: str) -> None:
        self.driver = driver
        self.signals = signals
        self.bus_id = bus_id
        self.interface_id = interface_id
        self.interface_type = interface_type

    @staticmethod
    def from_dict(obj: Any) -> 'UpstreamSignalInterfaceConfigurationRead':
        assert isinstance(obj, dict)
        driver = from_union([from_str, from_none], obj.get("driver"))
        signals = UpstreamSignalInterfaceConfigurationReadSignals.from_dict(obj.get("signals"))
        bus_id = from_str(obj.get("busId"))
        interface_id = from_str(obj.get("interfaceId"))
        interface_type = from_str(obj.get("interfaceType"))
        return UpstreamSignalInterfaceConfigurationRead(driver, signals, bus_id, interface_id, interface_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["driver"] = from_union([from_str, from_none], self.driver)
        result["signals"] = to_class(UpstreamSignalInterfaceConfigurationReadSignals, self.signals)
        result["busId"] = from_str(self.bus_id)
        result["interfaceId"] = from_str(self.interface_id)
        result["interfaceType"] = from_str(self.interface_type)
        return result


def electrical_service_configuration_from_dict(s: Any) -> ElectricalServiceConfiguration:
    return ElectricalServiceConfiguration.from_dict(s)


def electrical_service_configuration_to_dict(x: ElectricalServiceConfiguration) -> Any:
    return to_class(ElectricalServiceConfiguration, x)


def electrical_service_configuration_write_from_dict(s: Any) -> ElectricalServiceConfigurationWrite:
    return ElectricalServiceConfigurationWrite.from_dict(s)


def electrical_service_configuration_write_to_dict(x: ElectricalServiceConfigurationWrite) -> Any:
    return to_class(ElectricalServiceConfigurationWrite, x)


def electrical_service_configuration_read_from_dict(s: Any) -> ElectricalServiceConfigurationRead:
    return ElectricalServiceConfigurationRead.from_dict(s)


def electrical_service_configuration_read_to_dict(x: ElectricalServiceConfigurationRead) -> Any:
    return to_class(ElectricalServiceConfigurationRead, x)


def gpio_interface_configuration_from_dict(s: Any) -> GPIOInterfaceConfiguration:
    return GPIOInterfaceConfiguration.from_dict(s)


def gpio_interface_configuration_to_dict(x: GPIOInterfaceConfiguration) -> Any:
    return to_class(GPIOInterfaceConfiguration, x)


def gpio_interface_configuration_write_from_dict(s: Any) -> GPIOInterfaceConfigurationWrite:
    return GPIOInterfaceConfigurationWrite.from_dict(s)


def gpio_interface_configuration_write_to_dict(x: GPIOInterfaceConfigurationWrite) -> Any:
    return to_class(GPIOInterfaceConfigurationWrite, x)


def gpio_interface_configuration_read_from_dict(s: Any) -> GPIOInterfaceConfigurationRead:
    return GPIOInterfaceConfigurationRead.from_dict(s)


def gpio_interface_configuration_read_to_dict(x: GPIOInterfaceConfigurationRead) -> Any:
    return to_class(GPIOInterfaceConfigurationRead, x)


def gpio_interface_data_from_dict(s: Any) -> GPIOInterfaceData:
    return GPIOInterfaceData.from_dict(s)


def gpio_interface_data_to_dict(x: GPIOInterfaceData) -> Any:
    return to_class(GPIOInterfaceData, x)


def gpio_interface_data_write_from_dict(s: Any) -> GPIOInterfaceDataWrite:
    return GPIOInterfaceDataWrite.from_dict(s)


def gpio_interface_data_write_to_dict(x: GPIOInterfaceDataWrite) -> Any:
    return to_class(GPIOInterfaceDataWrite, x)


def gpio_interface_data_read_from_dict(s: Any) -> GPIOInterfaceDataRead:
    return GPIOInterfaceDataRead.from_dict(s)


def gpio_interface_data_read_to_dict(x: GPIOInterfaceDataRead) -> Any:
    return to_class(GPIOInterfaceDataRead, x)


def signal_interface_configuration_from_dict(s: Any) -> SignalInterfaceConfiguration:
    return SignalInterfaceConfiguration.from_dict(s)


def signal_interface_configuration_to_dict(x: SignalInterfaceConfiguration) -> Any:
    return to_class(SignalInterfaceConfiguration, x)


def signal_interface_configuration_write_from_dict(s: Any) -> SignalInterfaceConfigurationWrite:
    return SignalInterfaceConfigurationWrite.from_dict(s)


def signal_interface_configuration_write_to_dict(x: SignalInterfaceConfigurationWrite) -> Any:
    return to_class(SignalInterfaceConfigurationWrite, x)


def signal_interface_configuration_read_from_dict(s: Any) -> SignalInterfaceConfigurationRead:
    return SignalInterfaceConfigurationRead.from_dict(s)


def signal_interface_configuration_read_to_dict(x: SignalInterfaceConfigurationRead) -> Any:
    return to_class(SignalInterfaceConfigurationRead, x)


def upstream_signal_interface_configuration_from_dict(s: Any) -> UpstreamSignalInterfaceConfiguration:
    return UpstreamSignalInterfaceConfiguration.from_dict(s)


def upstream_signal_interface_configuration_to_dict(x: UpstreamSignalInterfaceConfiguration) -> Any:
    return to_class(UpstreamSignalInterfaceConfiguration, x)


def upstream_signal_interface_configuration_write_from_dict(s: Any) -> UpstreamSignalInterfaceConfigurationWrite:
    return UpstreamSignalInterfaceConfigurationWrite.from_dict(s)


def upstream_signal_interface_configuration_write_to_dict(x: UpstreamSignalInterfaceConfigurationWrite) -> Any:
    return to_class(UpstreamSignalInterfaceConfigurationWrite, x)


def upstream_signal_interface_configuration_read_from_dict(s: Any) -> UpstreamSignalInterfaceConfigurationRead:
    return UpstreamSignalInterfaceConfigurationRead.from_dict(s)


def upstream_signal_interface_configuration_read_to_dict(x: UpstreamSignalInterfaceConfigurationRead) -> Any:
    return to_class(UpstreamSignalInterfaceConfigurationRead, x)
