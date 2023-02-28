# This code parses date/times, so please
#
#     pip install python-dateutil
#
# To use this code, make sure you
#
#     import json
#
# and then, to convert JSON from a string, do
#
#     result = post_login_request_body_from_dict(json.loads(json_string))
#     result = post_login_request_body_write_from_dict(json.loads(json_string))
#     result = post_login_request_body_read_from_dict(json.loads(json_string))
#     result = post_login_response_body201_from_dict(json.loads(json_string))
#     result = post_login_response_body201_write_from_dict(json.loads(json_string))
#     result = post_login_response_body201_read_from_dict(json.loads(json_string))
#     result = post_logout_request_body_from_dict(json.loads(json_string))
#     result = post_logout_request_body_write_from_dict(json.loads(json_string))
#     result = post_logout_request_body_read_from_dict(json.loads(json_string))
#     result = post_device_authentication_token_response_body201_from_dict(json.loads(json_string))
#     result = post_device_authentication_token_response_body201_write_from_dict(json.loads(json_string))
#     result = post_device_authentication_token_response_body201_read_from_dict(json.loads(json_string))
#     result = get_users_response_body200_from_dict(json.loads(json_string))
#     result = get_users_response_body200_write_from_dict(json.loads(json_string))
#     result = get_users_response_body200_read_from_dict(json.loads(json_string))
#     result = post_users_request_body_from_dict(json.loads(json_string))
#     result = post_users_request_body_write_from_dict(json.loads(json_string))
#     result = post_users_request_body_read_from_dict(json.loads(json_string))
#     result = post_users_response_body201_from_dict(json.loads(json_string))
#     result = post_users_response_body201_write_from_dict(json.loads(json_string))
#     result = post_users_response_body201_read_from_dict(json.loads(json_string))
#     result = get_user_response_body200_from_dict(json.loads(json_string))
#     result = get_user_response_body200_write_from_dict(json.loads(json_string))
#     result = get_user_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_user_request_body_from_dict(json.loads(json_string))
#     result = patch_user_request_body_write_from_dict(json.loads(json_string))
#     result = patch_user_request_body_read_from_dict(json.loads(json_string))
#     result = patch_user_response_body200_from_dict(json.loads(json_string))
#     result = patch_user_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_user_response_body200_read_from_dict(json.loads(json_string))
#     result = get_user_roles_response_body200_from_dict(json.loads(json_string))
#     result = get_user_roles_response_body200_write_from_dict(json.loads(json_string))
#     result = get_user_roles_response_body200_read_from_dict(json.loads(json_string))
#     result = post_user_roles_request_body_from_dict(json.loads(json_string))
#     result = post_user_roles_request_body_write_from_dict(json.loads(json_string))
#     result = post_user_roles_request_body_read_from_dict(json.loads(json_string))
#     result = delete_user_roles_request_body_from_dict(json.loads(json_string))
#     result = delete_user_roles_request_body_write_from_dict(json.loads(json_string))
#     result = delete_user_roles_request_body_read_from_dict(json.loads(json_string))
#     result = get_roles_response_body200_from_dict(json.loads(json_string))
#     result = get_roles_response_body200_write_from_dict(json.loads(json_string))
#     result = get_roles_response_body200_read_from_dict(json.loads(json_string))
#     result = post_roles_request_body_from_dict(json.loads(json_string))
#     result = post_roles_request_body_write_from_dict(json.loads(json_string))
#     result = post_roles_request_body_read_from_dict(json.loads(json_string))
#     result = post_roles_response_body201_from_dict(json.loads(json_string))
#     result = post_roles_response_body201_write_from_dict(json.loads(json_string))
#     result = post_roles_response_body201_read_from_dict(json.loads(json_string))
#     result = get_role_response_body200_from_dict(json.loads(json_string))
#     result = get_role_response_body200_write_from_dict(json.loads(json_string))
#     result = get_role_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_role_request_body_from_dict(json.loads(json_string))
#     result = patch_role_request_body_write_from_dict(json.loads(json_string))
#     result = patch_role_request_body_read_from_dict(json.loads(json_string))
#     result = patch_role_response_body200_from_dict(json.loads(json_string))
#     result = patch_role_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_role_response_body200_read_from_dict(json.loads(json_string))
#     result = get_role_users_response_body200_from_dict(json.loads(json_string))
#     result = get_role_users_response_body200_write_from_dict(json.loads(json_string))
#     result = get_role_users_response_body200_read_from_dict(json.loads(json_string))
#     result = post_role_users_request_body_from_dict(json.loads(json_string))
#     result = post_role_users_request_body_write_from_dict(json.loads(json_string))
#     result = post_role_users_request_body_read_from_dict(json.loads(json_string))
#     result = delete_role_users_request_body_from_dict(json.loads(json_string))
#     result = delete_role_users_request_body_write_from_dict(json.loads(json_string))
#     result = delete_role_users_request_body_read_from_dict(json.loads(json_string))
#     result = get_identity_response_body200_from_dict(json.loads(json_string))
#     result = get_identity_response_body200_write_from_dict(json.loads(json_string))
#     result = get_identity_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_identity_request_body_from_dict(json.loads(json_string))
#     result = patch_identity_request_body_write_from_dict(json.loads(json_string))
#     result = patch_identity_request_body_read_from_dict(json.loads(json_string))
#     result = patch_identity_response_body200_from_dict(json.loads(json_string))
#     result = patch_identity_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_identity_response_body200_read_from_dict(json.loads(json_string))
#     result = post_schedule_request_body_from_dict(json.loads(json_string))
#     result = post_schedule_request_body_write_from_dict(json.loads(json_string))
#     result = post_schedule_request_body_read_from_dict(json.loads(json_string))
#     result = post_schedule_response_body200_from_dict(json.loads(json_string))
#     result = post_schedule_response_body200_write_from_dict(json.loads(json_string))
#     result = post_schedule_response_body200_read_from_dict(json.loads(json_string))
#     result = post_schedule_response_body404_from_dict(json.loads(json_string))
#     result = post_schedule_response_body404_write_from_dict(json.loads(json_string))
#     result = post_schedule_response_body404_read_from_dict(json.loads(json_string))
#     result = post_schedule_response_body422_from_dict(json.loads(json_string))
#     result = post_schedule_response_body422_write_from_dict(json.loads(json_string))
#     result = post_schedule_response_body422_read_from_dict(json.loads(json_string))
#     result = post_schedule_response_body500_from_dict(json.loads(json_string))
#     result = post_schedule_response_body500_write_from_dict(json.loads(json_string))
#     result = post_schedule_response_body500_read_from_dict(json.loads(json_string))
#     result = post_booking_request_body_from_dict(json.loads(json_string))
#     result = post_booking_request_body_write_from_dict(json.loads(json_string))
#     result = post_booking_request_body_read_from_dict(json.loads(json_string))
#     result = post_booking_response_body200_from_dict(json.loads(json_string))
#     result = post_booking_response_body200_write_from_dict(json.loads(json_string))
#     result = post_booking_response_body200_read_from_dict(json.loads(json_string))
#     result = post_booking_response_body500_from_dict(json.loads(json_string))
#     result = post_booking_response_body500_write_from_dict(json.loads(json_string))
#     result = post_booking_response_body500_read_from_dict(json.loads(json_string))
#     result = patch_booking_request_body_from_dict(json.loads(json_string))
#     result = patch_booking_request_body_write_from_dict(json.loads(json_string))
#     result = patch_booking_request_body_read_from_dict(json.loads(json_string))
#     result = patch_booking_response_body200_from_dict(json.loads(json_string))
#     result = patch_booking_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_booking_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_booking_response_body500_from_dict(json.loads(json_string))
#     result = patch_booking_response_body500_write_from_dict(json.loads(json_string))
#     result = patch_booking_response_body500_read_from_dict(json.loads(json_string))
#     result = delete_booking_response_body500_from_dict(json.loads(json_string))
#     result = delete_booking_response_body500_write_from_dict(json.loads(json_string))
#     result = delete_booking_response_body500_read_from_dict(json.loads(json_string))
#     result = get_booking_response_body200_from_dict(json.loads(json_string))
#     result = get_booking_response_body200_write_from_dict(json.loads(json_string))
#     result = get_booking_response_body200_read_from_dict(json.loads(json_string))
#     result = get_booking_response_body500_from_dict(json.loads(json_string))
#     result = get_booking_response_body500_write_from_dict(json.loads(json_string))
#     result = get_booking_response_body500_read_from_dict(json.loads(json_string))
#     result = delete_booking_destroy_response_body500_from_dict(json.loads(json_string))
#     result = delete_booking_destroy_response_body500_write_from_dict(json.loads(json_string))
#     result = delete_booking_destroy_response_body500_read_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body200_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body200_write_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body200_read_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body500_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body500_write_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body500_read_from_dict(json.loads(json_string))
#     result = delete_booking_lock_response_body500_from_dict(json.loads(json_string))
#     result = delete_booking_lock_response_body500_write_from_dict(json.loads(json_string))
#     result = delete_booking_lock_response_body500_read_from_dict(json.loads(json_string))
#     result = get_devices_response_body200_from_dict(json.loads(json_string))
#     result = get_devices_response_body200_write_from_dict(json.loads(json_string))
#     result = get_devices_response_body200_read_from_dict(json.loads(json_string))
#     result = post_devices_request_body_from_dict(json.loads(json_string))
#     result = post_devices_request_body_write_from_dict(json.loads(json_string))
#     result = post_devices_request_body_read_from_dict(json.loads(json_string))
#     result = post_devices_response_body201_from_dict(json.loads(json_string))
#     result = post_devices_response_body201_write_from_dict(json.loads(json_string))
#     result = post_devices_response_body201_read_from_dict(json.loads(json_string))
#     result = get_device_response_body200_from_dict(json.loads(json_string))
#     result = get_device_response_body200_write_from_dict(json.loads(json_string))
#     result = get_device_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_device_request_body_from_dict(json.loads(json_string))
#     result = patch_device_request_body_write_from_dict(json.loads(json_string))
#     result = patch_device_request_body_read_from_dict(json.loads(json_string))
#     result = patch_device_response_body200_from_dict(json.loads(json_string))
#     result = patch_device_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_device_response_body200_read_from_dict(json.loads(json_string))
#     result = post_device_response_body201_from_dict(json.loads(json_string))
#     result = post_device_response_body201_write_from_dict(json.loads(json_string))
#     result = post_device_response_body201_read_from_dict(json.loads(json_string))
#     result = post_device_availability_request_body_from_dict(json.loads(json_string))
#     result = post_device_availability_request_body_write_from_dict(json.loads(json_string))
#     result = post_device_availability_request_body_read_from_dict(json.loads(json_string))
#     result = post_device_availability_response_body200_from_dict(json.loads(json_string))
#     result = post_device_availability_response_body200_write_from_dict(json.loads(json_string))
#     result = post_device_availability_response_body200_read_from_dict(json.loads(json_string))
#     result = post_device_websocket_response_body200_from_dict(json.loads(json_string))
#     result = post_device_websocket_response_body200_write_from_dict(json.loads(json_string))
#     result = post_device_websocket_response_body200_read_from_dict(json.loads(json_string))
#     result = post_device_signaling_request_body_from_dict(json.loads(json_string))
#     result = post_device_signaling_request_body_write_from_dict(json.loads(json_string))
#     result = post_device_signaling_request_body_read_from_dict(json.loads(json_string))
#     result = get_peerconnections_response_body200_from_dict(json.loads(json_string))
#     result = get_peerconnections_response_body200_write_from_dict(json.loads(json_string))
#     result = get_peerconnections_response_body200_read_from_dict(json.loads(json_string))
#     result = post_peerconnections_request_body_from_dict(json.loads(json_string))
#     result = post_peerconnections_request_body_write_from_dict(json.loads(json_string))
#     result = post_peerconnections_request_body_read_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body201_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body201_write_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body201_read_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body202_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body202_write_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body202_read_from_dict(json.loads(json_string))
#     result = get_peerconnection_response_body200_from_dict(json.loads(json_string))
#     result = get_peerconnection_response_body200_write_from_dict(json.loads(json_string))
#     result = get_peerconnection_response_body200_read_from_dict(json.loads(json_string))
#     result = get_experiments_response_body200_from_dict(json.loads(json_string))
#     result = get_experiments_response_body200_write_from_dict(json.loads(json_string))
#     result = get_experiments_response_body200_read_from_dict(json.loads(json_string))
#     result = post_experiments_request_body_from_dict(json.loads(json_string))
#     result = post_experiments_request_body_write_from_dict(json.loads(json_string))
#     result = post_experiments_request_body_read_from_dict(json.loads(json_string))
#     result = post_experiments_response_body201_from_dict(json.loads(json_string))
#     result = post_experiments_response_body201_write_from_dict(json.loads(json_string))
#     result = post_experiments_response_body201_read_from_dict(json.loads(json_string))
#     result = post_experiments_response_body202_from_dict(json.loads(json_string))
#     result = post_experiments_response_body202_write_from_dict(json.loads(json_string))
#     result = post_experiments_response_body202_read_from_dict(json.loads(json_string))
#     result = get_experiment_response_body200_from_dict(json.loads(json_string))
#     result = get_experiment_response_body200_write_from_dict(json.loads(json_string))
#     result = get_experiment_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_experiment_request_body_from_dict(json.loads(json_string))
#     result = patch_experiment_request_body_write_from_dict(json.loads(json_string))
#     result = patch_experiment_request_body_read_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body200_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body202_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body202_write_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body202_read_from_dict(json.loads(json_string))
#     result = get_institutions_response_body200_from_dict(json.loads(json_string))
#     result = get_institutions_response_body200_write_from_dict(json.loads(json_string))
#     result = get_institutions_response_body200_read_from_dict(json.loads(json_string))
#     result = post_institutions_request_body_from_dict(json.loads(json_string))
#     result = post_institutions_request_body_write_from_dict(json.loads(json_string))
#     result = post_institutions_request_body_read_from_dict(json.loads(json_string))
#     result = post_institutions_response_body201_from_dict(json.loads(json_string))
#     result = post_institutions_response_body201_write_from_dict(json.loads(json_string))
#     result = post_institutions_response_body201_read_from_dict(json.loads(json_string))
#     result = get_institution_response_body200_from_dict(json.loads(json_string))
#     result = get_institution_response_body200_write_from_dict(json.loads(json_string))
#     result = get_institution_response_body200_read_from_dict(json.loads(json_string))
#     result = patch_institution_request_body_from_dict(json.loads(json_string))
#     result = patch_institution_request_body_write_from_dict(json.loads(json_string))
#     result = patch_institution_request_body_read_from_dict(json.loads(json_string))
#     result = patch_institution_response_body200_from_dict(json.loads(json_string))
#     result = patch_institution_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_institution_response_body200_read_from_dict(json.loads(json_string))
#     result = get_updates_response_body200_from_dict(json.loads(json_string))
#     result = get_updates_response_body200_write_from_dict(json.loads(json_string))
#     result = get_updates_response_body200_read_from_dict(json.loads(json_string))
#     result = post_updates_request_body_from_dict(json.loads(json_string))
#     result = post_updates_request_body_write_from_dict(json.loads(json_string))
#     result = post_updates_request_body_read_from_dict(json.loads(json_string))
#     result = post_updates_response_body201_from_dict(json.loads(json_string))
#     result = post_updates_response_body201_write_from_dict(json.loads(json_string))
#     result = post_updates_response_body201_read_from_dict(json.loads(json_string))
#     result = patch_update_request_body_from_dict(json.loads(json_string))
#     result = patch_update_request_body_write_from_dict(json.loads(json_string))
#     result = patch_update_request_body_read_from_dict(json.loads(json_string))
#     result = patch_update_response_body200_from_dict(json.loads(json_string))
#     result = patch_update_response_body200_write_from_dict(json.loads(json_string))
#     result = patch_update_response_body200_read_from_dict(json.loads(json_string))

from enum import Enum
from typing import Optional, Any, List, Dict, TypeVar, Type, Callable, cast
from datetime import datetime
import dateutil.parser


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


def to_enum(c: Type[EnumT], x: Any) -> EnumT:
    assert isinstance(x, c)
    return x.value


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


def from_datetime(x: Any) -> datetime:
    return dateutil.parser.parse(x)


def from_bool(x: Any) -> bool:
    assert isinstance(x, bool)
    return x


def from_int(x: Any) -> int:
    assert isinstance(x, int) and not isinstance(x, bool)
    return x


def from_dict(f: Callable[[Any], T], x: Any) -> Dict[str, T]:
    assert isinstance(x, dict)
    return { k: f(v) for (k, v) in x.items() }


class AuthMethod(Enum):
    """Authentication method."""
    LOCAL = "local"
    TUI = "tui"


class PostLoginRequestBody:
    """Password of the user."""
    password: str
    """Username of the user."""
    username: str
    """Authentication method."""
    method: Optional[AuthMethod]

    def __init__(self, password: str, username: str, method: Optional[AuthMethod]) -> None:
        self.password = password
        self.username = username
        self.method = method

    @staticmethod
    def from_dict(obj: Any) -> 'PostLoginRequestBody':
        assert isinstance(obj, dict)
        password = from_str(obj.get("password"))
        username = from_str(obj.get("username"))
        method = from_union([AuthMethod, from_none], obj.get("method"))
        return PostLoginRequestBody(password, username, method)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_str(self.password)
        result["username"] = from_str(self.username)
        if self.method is not None:
            result["method"] = from_union([lambda x: to_enum(AuthMethod, x), from_none], self.method)
        return result


class PostLoginRequestBodyWrite:
    """Password of the user."""
    password: str
    """Username of the user."""
    username: str
    """Authentication method."""
    method: Optional[AuthMethod]

    def __init__(self, password: str, username: str, method: Optional[AuthMethod]) -> None:
        self.password = password
        self.username = username
        self.method = method

    @staticmethod
    def from_dict(obj: Any) -> 'PostLoginRequestBodyWrite':
        assert isinstance(obj, dict)
        password = from_str(obj.get("password"))
        username = from_str(obj.get("username"))
        method = from_union([AuthMethod, from_none], obj.get("method"))
        return PostLoginRequestBodyWrite(password, username, method)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_str(self.password)
        result["username"] = from_str(self.username)
        if self.method is not None:
            result["method"] = from_union([lambda x: to_enum(AuthMethod, x), from_none], self.method)
        return result


class PostLoginRequestBodyRead:
    """Password of the user."""
    password: str
    """Username of the user."""
    username: str
    """Authentication method."""
    method: Optional[AuthMethod]

    def __init__(self, password: str, username: str, method: Optional[AuthMethod]) -> None:
        self.password = password
        self.username = username
        self.method = method

    @staticmethod
    def from_dict(obj: Any) -> 'PostLoginRequestBodyRead':
        assert isinstance(obj, dict)
        password = from_str(obj.get("password"))
        username = from_str(obj.get("username"))
        method = from_union([AuthMethod, from_none], obj.get("method"))
        return PostLoginRequestBodyRead(password, username, method)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_str(self.password)
        result["username"] = from_str(self.username)
        if self.method is not None:
            result["method"] = from_union([lambda x: to_enum(AuthMethod, x), from_none], self.method)
        return result


class PostLogoutRequestBody:
    """The token to be invalidated."""
    token: Optional[str]

    def __init__(self, token: Optional[str]) -> None:
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'PostLogoutRequestBody':
        assert isinstance(obj, dict)
        token = from_union([from_str, from_none], obj.get("token"))
        return PostLogoutRequestBody(token)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.token is not None:
            result["token"] = from_union([from_str, from_none], self.token)
        return result


class PostLogoutRequestBodyWrite:
    """The token to be invalidated."""
    token: Optional[str]

    def __init__(self, token: Optional[str]) -> None:
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'PostLogoutRequestBodyWrite':
        assert isinstance(obj, dict)
        token = from_union([from_str, from_none], obj.get("token"))
        return PostLogoutRequestBodyWrite(token)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.token is not None:
            result["token"] = from_union([from_str, from_none], self.token)
        return result


class PostLogoutRequestBodyRead:
    """The token to be invalidated."""
    token: Optional[str]

    def __init__(self, token: Optional[str]) -> None:
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'PostLogoutRequestBodyRead':
        assert isinstance(obj, dict)
        token = from_union([from_str, from_none], obj.get("token"))
        return PostLogoutRequestBodyRead(token)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.token is not None:
            result["token"] = from_union([from_str, from_none], self.token)
        return result


class GetUsersResponseBody200_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUsersResponseBody200_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUsersResponseBody200_Element:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetUsersResponseBody200_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetUsersResponseBody200_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_Element':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUsersResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUsersResponseBody200_Element(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUsersResponseBody200_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUsersResponseBody200_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUsersResponseBody200_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUsersResponseBody200_WriteElement:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetUsersResponseBody200_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetUsersResponseBody200_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUsersResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUsersResponseBody200_WriteElement(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUsersResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUsersResponseBody200_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUsersResponseBody200_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUsersResponseBody200_ReadElement:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetUsersResponseBody200_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetUsersResponseBody200_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUsersResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUsersResponseBody200_ReadElement(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUsersResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PostUsersRequestBody:
    password: str
    username: str

    def __init__(self, password: str, username: str) -> None:
        self.password = password
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersRequestBody':
        assert isinstance(obj, dict)
        password = from_str(obj.get("password"))
        username = from_str(obj.get("username"))
        return PostUsersRequestBody(password, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_str(self.password)
        result["username"] = from_str(self.username)
        return result


class PostUsersRequestBodyWrite:
    password: str
    username: str

    def __init__(self, password: str, username: str) -> None:
        self.password = password
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersRequestBodyWrite':
        assert isinstance(obj, dict)
        password = from_str(obj.get("password"))
        username = from_str(obj.get("username"))
        return PostUsersRequestBodyWrite(password, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_str(self.password)
        result["username"] = from_str(self.username)
        return result


class PostUsersRequestBodyRead:
    password: str
    username: str

    def __init__(self, password: str, username: str) -> None:
        self.password = password
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersRequestBodyRead':
        assert isinstance(obj, dict)
        password = from_str(obj.get("password"))
        username = from_str(obj.get("username"))
        return PostUsersRequestBodyRead(password, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_str(self.password)
        result["username"] = from_str(self.username)
        return result


class PostUsersResponseBody201_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostUsersResponseBody201_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostUsersResponseBody201:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PostUsersResponseBody201_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PostUsersResponseBody201_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PostUsersResponseBody201_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PostUsersResponseBody201(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostUsersResponseBody201_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PostUsersResponseBody201_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostUsersResponseBody201_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostUsersResponseBody201_Write:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PostUsersResponseBody201_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PostUsersResponseBody201_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PostUsersResponseBody201_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PostUsersResponseBody201_Write(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostUsersResponseBody201_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PostUsersResponseBody201_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostUsersResponseBody201_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostUsersResponseBody201_Read:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PostUsersResponseBody201_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PostUsersResponseBody201_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PostUsersResponseBody201_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PostUsersResponseBody201_Read(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostUsersResponseBody201_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUserResponseBody200_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUserResponseBody200_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUserResponseBody200:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetUserResponseBody200_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetUserResponseBody200_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUserResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUserResponseBody200(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUserResponseBody200_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUserResponseBody200_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUserResponseBody200_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUserResponseBody200_Write:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetUserResponseBody200_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetUserResponseBody200_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUserResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUserResponseBody200_Write(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUserResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUserResponseBody200_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUserResponseBody200_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUserResponseBody200_Read:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetUserResponseBody200_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetUserResponseBody200_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUserResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUserResponseBody200_Read(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUserResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserRequestBody:
    password: Optional[str]
    username: Optional[str]

    def __init__(self, password: Optional[str], username: Optional[str]) -> None:
        self.password = password
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserRequestBody':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserRequestBody(password, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserRequestBodyWrite:
    password: Optional[str]
    username: Optional[str]

    def __init__(self, password: Optional[str], username: Optional[str]) -> None:
        self.password = password
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserRequestBodyWrite':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserRequestBodyWrite(password, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserRequestBodyRead:
    password: Optional[str]
    username: Optional[str]

    def __init__(self, password: Optional[str], username: Optional[str]) -> None:
        self.password = password
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserRequestBodyRead':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserRequestBodyRead(password, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserResponseBody200_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchUserResponseBody200_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchUserResponseBody200:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchUserResponseBody200_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchUserResponseBody200_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchUserResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserResponseBody200(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchUserResponseBody200_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserResponseBody200_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchUserResponseBody200_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchUserResponseBody200_Write:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchUserResponseBody200_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchUserResponseBody200_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchUserResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserResponseBody200_Write(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchUserResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserResponseBody200_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchUserResponseBody200_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchUserResponseBody200_Read:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchUserResponseBody200_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchUserResponseBody200_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchUserResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserResponseBody200_Read(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchUserResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUserRolesResponseBody200_Element:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserRolesResponseBody200_Element':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUserRolesResponseBody200_Element(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUserRolesResponseBody200_WriteElement:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserRolesResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUserRolesResponseBody200_WriteElement(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetUserRolesResponseBody200_ReadElement:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserRolesResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetUserRolesResponseBody200_ReadElement(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRolesResponseBody200_Element:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRolesResponseBody200_Element':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRolesResponseBody200_Element(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRolesResponseBody200_WriteElement:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRolesResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRolesResponseBody200_WriteElement(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRolesResponseBody200_ReadElement:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRolesResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRolesResponseBody200_ReadElement(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostRolesRequestBody:
    name: str
    scopes: List[str]

    def __init__(self, name: str, scopes: List[str]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PostRolesRequestBody':
        assert isinstance(obj, dict)
        name = from_str(obj.get("name"))
        scopes = from_list(from_str, obj.get("scopes"))
        return PostRolesRequestBody(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_str(self.name)
        result["scopes"] = from_list(from_str, self.scopes)
        return result


class PostRolesRequestBodyWrite:
    name: str
    scopes: List[str]

    def __init__(self, name: str, scopes: List[str]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PostRolesRequestBodyWrite':
        assert isinstance(obj, dict)
        name = from_str(obj.get("name"))
        scopes = from_list(from_str, obj.get("scopes"))
        return PostRolesRequestBodyWrite(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_str(self.name)
        result["scopes"] = from_list(from_str, self.scopes)
        return result


class PostRolesRequestBodyRead:
    name: str
    scopes: List[str]

    def __init__(self, name: str, scopes: List[str]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PostRolesRequestBodyRead':
        assert isinstance(obj, dict)
        name = from_str(obj.get("name"))
        scopes = from_list(from_str, obj.get("scopes"))
        return PostRolesRequestBodyRead(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_str(self.name)
        result["scopes"] = from_list(from_str, self.scopes)
        return result


class PostRolesResponseBody201:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostRolesResponseBody201':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostRolesResponseBody201(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostRolesResponseBody201_Write:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostRolesResponseBody201_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostRolesResponseBody201_Write(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostRolesResponseBody201_Read:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostRolesResponseBody201_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostRolesResponseBody201_Read(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleResponseBody200:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleResponseBody200':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRoleResponseBody200(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleResponseBody200_Write:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleResponseBody200_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRoleResponseBody200_Write(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleResponseBody200_Read:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleResponseBody200_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRoleResponseBody200_Read(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchRoleRequestBody:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchRoleRequestBody':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchRoleRequestBody(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchRoleRequestBodyWrite:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchRoleRequestBodyWrite':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchRoleRequestBodyWrite(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchRoleRequestBodyRead:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchRoleRequestBodyRead':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchRoleRequestBodyRead(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchRoleResponseBody200:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchRoleResponseBody200':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchRoleResponseBody200(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchRoleResponseBody200_Write:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchRoleResponseBody200_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchRoleResponseBody200_Write(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchRoleResponseBody200_Read:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchRoleResponseBody200_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchRoleResponseBody200_Read(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleUsersResponseBody200_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleUsersResponseBody200_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRoleUsersResponseBody200_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleUsersResponseBody200_Element:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetRoleUsersResponseBody200_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetRoleUsersResponseBody200_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleUsersResponseBody200_Element':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetRoleUsersResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetRoleUsersResponseBody200_Element(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetRoleUsersResponseBody200_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetRoleUsersResponseBody200_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleUsersResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRoleUsersResponseBody200_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleUsersResponseBody200_WriteElement:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetRoleUsersResponseBody200_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetRoleUsersResponseBody200_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleUsersResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetRoleUsersResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetRoleUsersResponseBody200_WriteElement(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetRoleUsersResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetRoleUsersResponseBody200_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleUsersResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetRoleUsersResponseBody200_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetRoleUsersResponseBody200_ReadElement:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetRoleUsersResponseBody200_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetRoleUsersResponseBody200_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetRoleUsersResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetRoleUsersResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetRoleUsersResponseBody200_ReadElement(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetRoleUsersResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetIdentityResponseBody200_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetIdentityResponseBody200_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetIdentityResponseBody200:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetIdentityResponseBody200_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetIdentityResponseBody200_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetIdentityResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetIdentityResponseBody200(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetIdentityResponseBody200_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetIdentityResponseBody200_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetIdentityResponseBody200_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetIdentityResponseBody200_Write:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetIdentityResponseBody200_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetIdentityResponseBody200_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetIdentityResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetIdentityResponseBody200_Write(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetIdentityResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetIdentityResponseBody200_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetIdentityResponseBody200_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetIdentityResponseBody200_Read:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[GetIdentityResponseBody200_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[GetIdentityResponseBody200_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetIdentityResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetIdentityResponseBody200_Read(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetIdentityResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityRequestBodyRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBodyRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchIdentityRequestBodyRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchIdentityRequestBody:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchIdentityRequestBodyRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchIdentityRequestBodyRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBody':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityRequestBody(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityRequestBodyRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityRequestBodyWriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBodyWriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchIdentityRequestBodyWriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchIdentityRequestBodyWrite:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchIdentityRequestBodyWriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchIdentityRequestBodyWriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBodyWrite':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityRequestBodyWriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityRequestBodyWrite(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityRequestBodyWriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityRequestBodyReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBodyReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchIdentityRequestBodyReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchIdentityRequestBodyRead:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchIdentityRequestBodyReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchIdentityRequestBodyReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBodyRead':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityRequestBodyReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityRequestBodyRead(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityRequestBodyReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityResponseBody200_Role:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200_Role':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchIdentityResponseBody200_Role(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchIdentityResponseBody200:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchIdentityResponseBody200_Role]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchIdentityResponseBody200_Role]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityResponseBody200(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityResponseBody200_Role, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityResponseBody200_WriteRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchIdentityResponseBody200_WriteRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchIdentityResponseBody200_Write:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchIdentityResponseBody200_WriteRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchIdentityResponseBody200_WriteRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200_Write':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityResponseBody200_Write(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityResponseBody200_ReadRole:
    id: Optional[str]
    name: Optional[str]
    scopes: Optional[List[str]]
    url: Optional[str]

    def __init__(self, id: Optional[str], name: Optional[str], scopes: Optional[List[str]], url: Optional[str]) -> None:
        self.id = id
        self.name = name
        self.scopes = scopes
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchIdentityResponseBody200_ReadRole(id, name, scopes, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.scopes is not None:
            result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchIdentityResponseBody200_Read:
    id: Optional[str]
    password: Optional[str]
    roles: Optional[List[PatchIdentityResponseBody200_ReadRole]]
    url: Optional[str]
    username: Optional[str]

    def __init__(self, id: Optional[str], password: Optional[str], roles: Optional[List[PatchIdentityResponseBody200_ReadRole]], url: Optional[str], username: Optional[str]) -> None:
        self.id = id
        self.password = password
        self.roles = roles
        self.url = url
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200_Read':
        assert isinstance(obj, dict)
        id = from_union([from_str, from_none], obj.get("id"))
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        url = from_union([from_str, from_none], obj.get("url"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityResponseBody200_Read(id, password, roles, url, username)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.id is not None:
            result["id"] = from_union([from_str, from_none], self.id)
        if self.password is not None:
            result["password"] = from_union([from_str, from_none], self.password)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.username is not None:
            result["username"] = from_union([from_str, from_none], self.username)
        return result


class PurpleDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return PurpleDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PostScheduleRequestBodyExperiment:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    """User provided description, for example might be a reason for the booking (e.g.
    maintenance) or a link to the experiment. Might be empty or missing.
    """
    description: Optional[str]
    """List of devices used in experiment."""
    devices: List[PurpleDevice]

    def __init__(self, description: Optional[str], devices: List[PurpleDevice]) -> None:
        self.description = description
        self.devices = devices

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(PurpleDevice.from_dict, obj.get("Devices"))
        return PostScheduleRequestBodyExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(PurpleDevice, x), self.devices)
        return result


class PostScheduleRequestBodyTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleRequestBodyTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleRequestBody:
    """If true, show only one timetable per device instead of one for all available physical
    devices.
    """
    combined: Optional[bool]
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PostScheduleRequestBodyExperiment
    """(private) Show only devices of this institution. Give an error if a device of an other
    institution is requested.
    """
    only_own: Optional[bool]
    """A time slot represents a slice of time used for bookings."""
    time: PostScheduleRequestBodyTime

    def __init__(self, combined: Optional[bool], experiment: PostScheduleRequestBodyExperiment, only_own: Optional[bool], time: PostScheduleRequestBodyTime) -> None:
        self.combined = combined
        self.experiment = experiment
        self.only_own = only_own
        self.time = time

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBody':
        assert isinstance(obj, dict)
        combined = from_union([from_bool, from_none], obj.get("Combined"))
        experiment = PostScheduleRequestBodyExperiment.from_dict(obj.get("Experiment"))
        only_own = from_union([from_bool, from_none], obj.get("onlyOwn"))
        time = PostScheduleRequestBodyTime.from_dict(obj.get("Time"))
        return PostScheduleRequestBody(combined, experiment, only_own, time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.combined is not None:
            result["Combined"] = from_union([from_bool, from_none], self.combined)
        result["Experiment"] = to_class(PostScheduleRequestBodyExperiment, self.experiment)
        if self.only_own is not None:
            result["onlyOwn"] = from_union([from_bool, from_none], self.only_own)
        result["Time"] = to_class(PostScheduleRequestBodyTime, self.time)
        return result


class FluffyDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return FluffyDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PostScheduleRequestBodyWriteExperiment:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    """User provided description, for example might be a reason for the booking (e.g.
    maintenance) or a link to the experiment. Might be empty or missing.
    """
    description: Optional[str]
    """List of devices used in experiment."""
    devices: List[FluffyDevice]

    def __init__(self, description: Optional[str], devices: List[FluffyDevice]) -> None:
        self.description = description
        self.devices = devices

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyWriteExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(FluffyDevice.from_dict, obj.get("Devices"))
        return PostScheduleRequestBodyWriteExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(FluffyDevice, x), self.devices)
        return result


class PostScheduleRequestBodyWriteTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyWriteTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleRequestBodyWriteTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleRequestBodyWrite:
    """If true, show only one timetable per device instead of one for all available physical
    devices.
    """
    combined: Optional[bool]
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PostScheduleRequestBodyWriteExperiment
    """(private) Show only devices of this institution. Give an error if a device of an other
    institution is requested.
    """
    only_own: Optional[bool]
    """A time slot represents a slice of time used for bookings."""
    time: PostScheduleRequestBodyWriteTime

    def __init__(self, combined: Optional[bool], experiment: PostScheduleRequestBodyWriteExperiment, only_own: Optional[bool], time: PostScheduleRequestBodyWriteTime) -> None:
        self.combined = combined
        self.experiment = experiment
        self.only_own = only_own
        self.time = time

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyWrite':
        assert isinstance(obj, dict)
        combined = from_union([from_bool, from_none], obj.get("Combined"))
        experiment = PostScheduleRequestBodyWriteExperiment.from_dict(obj.get("Experiment"))
        only_own = from_union([from_bool, from_none], obj.get("onlyOwn"))
        time = PostScheduleRequestBodyWriteTime.from_dict(obj.get("Time"))
        return PostScheduleRequestBodyWrite(combined, experiment, only_own, time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.combined is not None:
            result["Combined"] = from_union([from_bool, from_none], self.combined)
        result["Experiment"] = to_class(PostScheduleRequestBodyWriteExperiment, self.experiment)
        if self.only_own is not None:
            result["onlyOwn"] = from_union([from_bool, from_none], self.only_own)
        result["Time"] = to_class(PostScheduleRequestBodyWriteTime, self.time)
        return result


class TentacledDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return TentacledDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PostScheduleRequestBodyReadExperiment:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    """User provided description, for example might be a reason for the booking (e.g.
    maintenance) or a link to the experiment. Might be empty or missing.
    """
    description: Optional[str]
    """List of devices used in experiment."""
    devices: List[TentacledDevice]

    def __init__(self, description: Optional[str], devices: List[TentacledDevice]) -> None:
        self.description = description
        self.devices = devices

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyReadExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(TentacledDevice.from_dict, obj.get("Devices"))
        return PostScheduleRequestBodyReadExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(TentacledDevice, x), self.devices)
        return result


class PostScheduleRequestBodyReadTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyReadTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleRequestBodyReadTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleRequestBodyRead:
    """If true, show only one timetable per device instead of one for all available physical
    devices.
    """
    combined: Optional[bool]
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PostScheduleRequestBodyReadExperiment
    """(private) Show only devices of this institution. Give an error if a device of an other
    institution is requested.
    """
    only_own: Optional[bool]
    """A time slot represents a slice of time used for bookings."""
    time: PostScheduleRequestBodyReadTime

    def __init__(self, combined: Optional[bool], experiment: PostScheduleRequestBodyReadExperiment, only_own: Optional[bool], time: PostScheduleRequestBodyReadTime) -> None:
        self.combined = combined
        self.experiment = experiment
        self.only_own = only_own
        self.time = time

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleRequestBodyRead':
        assert isinstance(obj, dict)
        combined = from_union([from_bool, from_none], obj.get("Combined"))
        experiment = PostScheduleRequestBodyReadExperiment.from_dict(obj.get("Experiment"))
        only_own = from_union([from_bool, from_none], obj.get("onlyOwn"))
        time = PostScheduleRequestBodyReadTime.from_dict(obj.get("Time"))
        return PostScheduleRequestBodyRead(combined, experiment, only_own, time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.combined is not None:
            result["Combined"] = from_union([from_bool, from_none], self.combined)
        result["Experiment"] = to_class(PostScheduleRequestBodyReadExperiment, self.experiment)
        if self.only_own is not None:
            result["onlyOwn"] = from_union([from_bool, from_none], self.only_own)
        result["Time"] = to_class(PostScheduleRequestBodyReadTime, self.time)
        return result


class PostScheduleResponseBody200_Booked:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_Booked':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleResponseBody200_Booked(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_Free:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_Free':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleResponseBody200_Free(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_Element:
    """Array of booked times."""
    booked: List[PostScheduleResponseBody200_Booked]
    """ID of the device (or * if combined)."""
    device: str
    """Array of free times."""
    free: List[PostScheduleResponseBody200_Free]

    def __init__(self, booked: List[PostScheduleResponseBody200_Booked], device: str, free: List[PostScheduleResponseBody200_Free]) -> None:
        self.booked = booked
        self.device = device
        self.free = free

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_Element':
        assert isinstance(obj, dict)
        booked = from_list(PostScheduleResponseBody200_Booked.from_dict, obj.get("Booked"))
        device = from_str(obj.get("Device"))
        free = from_list(PostScheduleResponseBody200_Free.from_dict, obj.get("Free"))
        return PostScheduleResponseBody200_Element(booked, device, free)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booked"] = from_list(lambda x: to_class(PostScheduleResponseBody200_Booked, x), self.booked)
        result["Device"] = from_str(self.device)
        result["Free"] = from_list(lambda x: to_class(PostScheduleResponseBody200_Free, x), self.free)
        return result


class PostScheduleResponseBody200_WriteBooked:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_WriteBooked':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleResponseBody200_WriteBooked(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_WriteFree:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_WriteFree':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleResponseBody200_WriteFree(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_WriteElement:
    """Array of booked times."""
    booked: List[PostScheduleResponseBody200_WriteBooked]
    """ID of the device (or * if combined)."""
    device: str
    """Array of free times."""
    free: List[PostScheduleResponseBody200_WriteFree]

    def __init__(self, booked: List[PostScheduleResponseBody200_WriteBooked], device: str, free: List[PostScheduleResponseBody200_WriteFree]) -> None:
        self.booked = booked
        self.device = device
        self.free = free

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        booked = from_list(PostScheduleResponseBody200_WriteBooked.from_dict, obj.get("Booked"))
        device = from_str(obj.get("Device"))
        free = from_list(PostScheduleResponseBody200_WriteFree.from_dict, obj.get("Free"))
        return PostScheduleResponseBody200_WriteElement(booked, device, free)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booked"] = from_list(lambda x: to_class(PostScheduleResponseBody200_WriteBooked, x), self.booked)
        result["Device"] = from_str(self.device)
        result["Free"] = from_list(lambda x: to_class(PostScheduleResponseBody200_WriteFree, x), self.free)
        return result


class PostScheduleResponseBody200_ReadBooked:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_ReadBooked':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleResponseBody200_ReadBooked(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_ReadFree:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_ReadFree':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostScheduleResponseBody200_ReadFree(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_ReadElement:
    """Array of booked times."""
    booked: List[PostScheduleResponseBody200_ReadBooked]
    """ID of the device (or * if combined)."""
    device: str
    """Array of free times."""
    free: List[PostScheduleResponseBody200_ReadFree]

    def __init__(self, booked: List[PostScheduleResponseBody200_ReadBooked], device: str, free: List[PostScheduleResponseBody200_ReadFree]) -> None:
        self.booked = booked
        self.device = device
        self.free = free

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        booked = from_list(PostScheduleResponseBody200_ReadBooked.from_dict, obj.get("Booked"))
        device = from_str(obj.get("Device"))
        free = from_list(PostScheduleResponseBody200_ReadFree.from_dict, obj.get("Free"))
        return PostScheduleResponseBody200_ReadElement(booked, device, free)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booked"] = from_list(lambda x: to_class(PostScheduleResponseBody200_ReadBooked, x), self.booked)
        result["Device"] = from_str(self.device)
        result["Free"] = from_list(lambda x: to_class(PostScheduleResponseBody200_ReadFree, x), self.free)
        return result


class StickyDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'StickyDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return StickyDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PostBookingRequestBodyExperiment:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    """User provided description, for example might be a reason for the booking (e.g.
    maintenance) or a link to the experiment. Might be empty or missing.
    """
    description: Optional[str]
    """List of devices used in experiment."""
    devices: List[StickyDevice]

    def __init__(self, description: Optional[str], devices: List[StickyDevice]) -> None:
        self.description = description
        self.devices = devices

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(StickyDevice.from_dict, obj.get("Devices"))
        return PostBookingRequestBodyExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(StickyDevice, x), self.devices)
        return result


class PostBookingRequestBodyTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostBookingRequestBodyTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class TypeEnum(Enum):
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    NORMAL = "normal"


class PostBookingRequestBody:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PostBookingRequestBodyExperiment
    """A time slot represents a slice of time used for bookings."""
    time: PostBookingRequestBodyTime
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]

    def __init__(self, experiment: PostBookingRequestBodyExperiment, time: PostBookingRequestBodyTime, type: Optional[TypeEnum]) -> None:
        self.experiment = experiment
        self.time = time
        self.type = type

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBody':
        assert isinstance(obj, dict)
        experiment = PostBookingRequestBodyExperiment.from_dict(obj.get("Experiment"))
        time = PostBookingRequestBodyTime.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        return PostBookingRequestBody(experiment, time, type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Experiment"] = to_class(PostBookingRequestBodyExperiment, self.experiment)
        result["Time"] = to_class(PostBookingRequestBodyTime, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        return result


class IndigoDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'IndigoDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return IndigoDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PostBookingRequestBodyWriteExperiment:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    """User provided description, for example might be a reason for the booking (e.g.
    maintenance) or a link to the experiment. Might be empty or missing.
    """
    description: Optional[str]
    """List of devices used in experiment."""
    devices: List[IndigoDevice]

    def __init__(self, description: Optional[str], devices: List[IndigoDevice]) -> None:
        self.description = description
        self.devices = devices

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyWriteExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(IndigoDevice.from_dict, obj.get("Devices"))
        return PostBookingRequestBodyWriteExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(IndigoDevice, x), self.devices)
        return result


class PostBookingRequestBodyWriteTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyWriteTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostBookingRequestBodyWriteTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostBookingRequestBodyWrite:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PostBookingRequestBodyWriteExperiment
    """A time slot represents a slice of time used for bookings."""
    time: PostBookingRequestBodyWriteTime
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]

    def __init__(self, experiment: PostBookingRequestBodyWriteExperiment, time: PostBookingRequestBodyWriteTime, type: Optional[TypeEnum]) -> None:
        self.experiment = experiment
        self.time = time
        self.type = type

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyWrite':
        assert isinstance(obj, dict)
        experiment = PostBookingRequestBodyWriteExperiment.from_dict(obj.get("Experiment"))
        time = PostBookingRequestBodyWriteTime.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        return PostBookingRequestBodyWrite(experiment, time, type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Experiment"] = to_class(PostBookingRequestBodyWriteExperiment, self.experiment)
        result["Time"] = to_class(PostBookingRequestBodyWriteTime, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        return result


class IndecentDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'IndecentDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return IndecentDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PostBookingRequestBodyReadExperiment:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    """User provided description, for example might be a reason for the booking (e.g.
    maintenance) or a link to the experiment. Might be empty or missing.
    """
    description: Optional[str]
    """List of devices used in experiment."""
    devices: List[IndecentDevice]

    def __init__(self, description: Optional[str], devices: List[IndecentDevice]) -> None:
        self.description = description
        self.devices = devices

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyReadExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(IndecentDevice.from_dict, obj.get("Devices"))
        return PostBookingRequestBodyReadExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(IndecentDevice, x), self.devices)
        return result


class PostBookingRequestBodyReadTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyReadTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PostBookingRequestBodyReadTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostBookingRequestBodyRead:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PostBookingRequestBodyReadExperiment
    """A time slot represents a slice of time used for bookings."""
    time: PostBookingRequestBodyReadTime
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]

    def __init__(self, experiment: PostBookingRequestBodyReadExperiment, time: PostBookingRequestBodyReadTime, type: Optional[TypeEnum]) -> None:
        self.experiment = experiment
        self.time = time
        self.type = type

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingRequestBodyRead':
        assert isinstance(obj, dict)
        experiment = PostBookingRequestBodyReadExperiment.from_dict(obj.get("Experiment"))
        time = PostBookingRequestBodyReadTime.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        return PostBookingRequestBodyRead(experiment, time, type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Experiment"] = to_class(PostBookingRequestBodyReadExperiment, self.experiment)
        result["Time"] = to_class(PostBookingRequestBodyReadTime, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        return result


class PostBookingResponseBody200:
    """ID at which the booking can be managed."""
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingResponseBody200':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PostBookingResponseBody200(booking_id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["BookingID"] = from_str(self.booking_id)
        return result


class PostBookingResponseBody200_Write:
    """ID at which the booking can be managed."""
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingResponseBody200_Write':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PostBookingResponseBody200_Write(booking_id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["BookingID"] = from_str(self.booking_id)
        return result


class PostBookingResponseBody200_Read:
    """ID at which the booking can be managed."""
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PostBookingResponseBody200_Read':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PostBookingResponseBody200_Read(booking_id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["BookingID"] = from_str(self.booking_id)
        return result


class PatchBookingRequestBodyDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingRequestBodyDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return PatchBookingRequestBodyDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PatchBookingRequestBody:
    """Use this request for adding devices.
    
    Use this request for adding callbacks.
    """
    """List of devices which should be added."""
    devices: Optional[List[PatchBookingRequestBodyDevice]]
    """Expresses whether the devices should be locked. Must match current status of booking."""
    locked: Optional[bool]
    """Callback which should be called at changes."""
    callback: Optional[str]

    def __init__(self, devices: Optional[List[PatchBookingRequestBodyDevice]], locked: Optional[bool], callback: Optional[str]) -> None:
        self.devices = devices
        self.locked = locked
        self.callback = callback

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingRequestBody':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PatchBookingRequestBodyDevice.from_dict, x), from_none], obj.get("Devices"))
        locked = from_union([from_bool, from_none], obj.get("Locked"))
        callback = from_union([from_str, from_none], obj.get("Callback"))
        return PatchBookingRequestBody(devices, locked, callback)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["Devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchBookingRequestBodyDevice, x), x), from_none], self.devices)
        if self.locked is not None:
            result["Locked"] = from_union([from_bool, from_none], self.locked)
        if self.callback is not None:
            result["Callback"] = from_union([from_str, from_none], self.callback)
        return result


class PatchBookingRequestBodyWriteDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingRequestBodyWriteDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return PatchBookingRequestBodyWriteDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PatchBookingRequestBodyWrite:
    """Use this request for adding devices.
    
    Use this request for adding callbacks.
    """
    """List of devices which should be added."""
    devices: Optional[List[PatchBookingRequestBodyWriteDevice]]
    """Expresses whether the devices should be locked. Must match current status of booking."""
    locked: Optional[bool]
    """Callback which should be called at changes."""
    callback: Optional[str]

    def __init__(self, devices: Optional[List[PatchBookingRequestBodyWriteDevice]], locked: Optional[bool], callback: Optional[str]) -> None:
        self.devices = devices
        self.locked = locked
        self.callback = callback

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingRequestBodyWrite':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PatchBookingRequestBodyWriteDevice.from_dict, x), from_none], obj.get("Devices"))
        locked = from_union([from_bool, from_none], obj.get("Locked"))
        callback = from_union([from_str, from_none], obj.get("Callback"))
        return PatchBookingRequestBodyWrite(devices, locked, callback)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["Devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchBookingRequestBodyWriteDevice, x), x), from_none], self.devices)
        if self.locked is not None:
            result["Locked"] = from_union([from_bool, from_none], self.locked)
        if self.callback is not None:
            result["Callback"] = from_union([from_str, from_none], self.callback)
        return result


class PatchBookingRequestBodyReadDevice:
    """A device might either be a physical/virtual device or a group of device."""
    """Unique ID of the device. Contains the institution (by having an end point at that
    institution)
    """
    id: str

    def __init__(self, id: str) -> None:
        self.id = id

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingRequestBodyReadDevice':
        assert isinstance(obj, dict)
        id = from_str(obj.get("ID"))
        return PatchBookingRequestBodyReadDevice(id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["ID"] = from_str(self.id)
        return result


class PatchBookingRequestBodyRead:
    """Use this request for adding devices.
    
    Use this request for adding callbacks.
    """
    """List of devices which should be added."""
    devices: Optional[List[PatchBookingRequestBodyReadDevice]]
    """Expresses whether the devices should be locked. Must match current status of booking."""
    locked: Optional[bool]
    """Callback which should be called at changes."""
    callback: Optional[str]

    def __init__(self, devices: Optional[List[PatchBookingRequestBodyReadDevice]], locked: Optional[bool], callback: Optional[str]) -> None:
        self.devices = devices
        self.locked = locked
        self.callback = callback

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingRequestBodyRead':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PatchBookingRequestBodyReadDevice.from_dict, x), from_none], obj.get("Devices"))
        locked = from_union([from_bool, from_none], obj.get("Locked"))
        callback = from_union([from_str, from_none], obj.get("Callback"))
        return PatchBookingRequestBodyRead(devices, locked, callback)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["Devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchBookingRequestBodyReadDevice, x), x), from_none], self.devices)
        if self.locked is not None:
            result["Locked"] = from_union([from_bool, from_none], self.locked)
        if self.callback is not None:
            result["Callback"] = from_union([from_str, from_none], self.callback)
        return result


class PatchBookingResponseBody200:
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingResponseBody200':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PatchBookingResponseBody200(booking_id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["BookingID"] = from_str(self.booking_id)
        return result


class PatchBookingResponseBody200_Write:
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingResponseBody200_Write':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PatchBookingResponseBody200_Write(booking_id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["BookingID"] = from_str(self.booking_id)
        return result


class PatchBookingResponseBody200_Read:
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PatchBookingResponseBody200_Read':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PatchBookingResponseBody200_Read(booking_id)

    def to_dict(self) -> dict:
        result: dict = {}
        result["BookingID"] = from_str(self.booking_id)
        return result


class Status(Enum):
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    ACTIVE = "active"
    ACTIVE_PENDING = "active-pending"
    ACTIVE_REJECTED = "active-rejected"
    BOOKED = "booked"
    CANCELLED = "cancelled"
    PENDING = "pending"
    REJECTED = "rejected"


class PurpleTimeslot:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleTimeslot':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PurpleTimeslot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class GetBookingResponseBody200_Booking:
    """A booking in the booking system."""
    devices: List[str]
    """Shows whether the booking was done by an external institution."""
    external: bool
    """Unique ID of the booking."""
    id: str
    """User readable notes about the status of the booking (e.g. if devices are unknown)."""
    message: Optional[str]
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    status: Status
    """A time slot represents a slice of time used for bookings."""
    time: PurpleTimeslot
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: PurpleTimeslot, type: Optional[TypeEnum], you: bool) -> None:
        self.devices = devices
        self.external = external
        self.id = id
        self.message = message
        self.status = status
        self.time = time
        self.type = type
        self.you = you

    @staticmethod
    def from_dict(obj: Any) -> 'GetBookingResponseBody200_Booking':
        assert isinstance(obj, dict)
        devices = from_list(from_str, obj.get("Devices"))
        external = from_bool(obj.get("External"))
        id = from_str(obj.get("ID"))
        message = from_union([from_str, from_none], obj.get("Message"))
        status = Status(obj.get("Status"))
        time = PurpleTimeslot.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return GetBookingResponseBody200_Booking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        if self.message is not None:
            result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(PurpleTimeslot, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        result["You"] = from_bool(self.you)
        return result


class GetBookingResponseBody200:
    """A booking in the booking system."""
    booking: GetBookingResponseBody200_Booking
    """Shows if the booking is in a locked status."""
    locked: bool
    experiment: Any
    time: Any

    def __init__(self, booking: GetBookingResponseBody200_Booking, locked: bool, experiment: Any, time: Any) -> None:
        self.booking = booking
        self.locked = locked
        self.experiment = experiment
        self.time = time

    @staticmethod
    def from_dict(obj: Any) -> 'GetBookingResponseBody200':
        assert isinstance(obj, dict)
        booking = GetBookingResponseBody200_Booking.from_dict(obj.get("Booking"))
        locked = from_bool(obj.get("Locked"))
        experiment = obj.get("Experiment")
        time = obj.get("Time")
        return GetBookingResponseBody200(booking, locked, experiment, time)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(GetBookingResponseBody200_Booking, self.booking)
        result["Locked"] = from_bool(self.locked)
        result["Experiment"] = self.experiment
        result["Time"] = self.time
        return result


class FluffyTimeslot:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyTimeslot':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return FluffyTimeslot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class GetBookingResponseBody200_WriteBooking:
    """A booking in the booking system."""
    devices: List[str]
    """Shows whether the booking was done by an external institution."""
    external: bool
    """Unique ID of the booking."""
    id: str
    """User readable notes about the status of the booking (e.g. if devices are unknown)."""
    message: Optional[str]
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    status: Status
    """A time slot represents a slice of time used for bookings."""
    time: FluffyTimeslot
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: FluffyTimeslot, type: Optional[TypeEnum], you: bool) -> None:
        self.devices = devices
        self.external = external
        self.id = id
        self.message = message
        self.status = status
        self.time = time
        self.type = type
        self.you = you

    @staticmethod
    def from_dict(obj: Any) -> 'GetBookingResponseBody200_WriteBooking':
        assert isinstance(obj, dict)
        devices = from_list(from_str, obj.get("Devices"))
        external = from_bool(obj.get("External"))
        id = from_str(obj.get("ID"))
        message = from_union([from_str, from_none], obj.get("Message"))
        status = Status(obj.get("Status"))
        time = FluffyTimeslot.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return GetBookingResponseBody200_WriteBooking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        if self.message is not None:
            result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(FluffyTimeslot, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        result["You"] = from_bool(self.you)
        return result


class GetBookingResponseBody200_Write:
    """A booking in the booking system."""
    booking: GetBookingResponseBody200_WriteBooking
    """Shows if the booking is in a locked status."""
    locked: bool
    experiment: Any
    time: Any

    def __init__(self, booking: GetBookingResponseBody200_WriteBooking, locked: bool, experiment: Any, time: Any) -> None:
        self.booking = booking
        self.locked = locked
        self.experiment = experiment
        self.time = time

    @staticmethod
    def from_dict(obj: Any) -> 'GetBookingResponseBody200_Write':
        assert isinstance(obj, dict)
        booking = GetBookingResponseBody200_WriteBooking.from_dict(obj.get("Booking"))
        locked = from_bool(obj.get("Locked"))
        experiment = obj.get("Experiment")
        time = obj.get("Time")
        return GetBookingResponseBody200_Write(booking, locked, experiment, time)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(GetBookingResponseBody200_WriteBooking, self.booking)
        result["Locked"] = from_bool(self.locked)
        result["Experiment"] = self.experiment
        result["Time"] = self.time
        return result


class TentacledTimeslot:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledTimeslot':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return TentacledTimeslot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class GetBookingResponseBody200_ReadBooking:
    """A booking in the booking system."""
    devices: List[str]
    """Shows whether the booking was done by an external institution."""
    external: bool
    """Unique ID of the booking."""
    id: str
    """User readable notes about the status of the booking (e.g. if devices are unknown)."""
    message: Optional[str]
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    status: Status
    """A time slot represents a slice of time used for bookings."""
    time: TentacledTimeslot
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: TentacledTimeslot, type: Optional[TypeEnum], you: bool) -> None:
        self.devices = devices
        self.external = external
        self.id = id
        self.message = message
        self.status = status
        self.time = time
        self.type = type
        self.you = you

    @staticmethod
    def from_dict(obj: Any) -> 'GetBookingResponseBody200_ReadBooking':
        assert isinstance(obj, dict)
        devices = from_list(from_str, obj.get("Devices"))
        external = from_bool(obj.get("External"))
        id = from_str(obj.get("ID"))
        message = from_union([from_str, from_none], obj.get("Message"))
        status = Status(obj.get("Status"))
        time = TentacledTimeslot.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return GetBookingResponseBody200_ReadBooking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        if self.message is not None:
            result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(TentacledTimeslot, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        result["You"] = from_bool(self.you)
        return result


class GetBookingResponseBody200_Read:
    """A booking in the booking system."""
    booking: GetBookingResponseBody200_ReadBooking
    """Shows if the booking is in a locked status."""
    locked: bool
    experiment: Any
    time: Any

    def __init__(self, booking: GetBookingResponseBody200_ReadBooking, locked: bool, experiment: Any, time: Any) -> None:
        self.booking = booking
        self.locked = locked
        self.experiment = experiment
        self.time = time

    @staticmethod
    def from_dict(obj: Any) -> 'GetBookingResponseBody200_Read':
        assert isinstance(obj, dict)
        booking = GetBookingResponseBody200_ReadBooking.from_dict(obj.get("Booking"))
        locked = from_bool(obj.get("Locked"))
        experiment = obj.get("Experiment")
        time = obj.get("Time")
        return GetBookingResponseBody200_Read(booking, locked, experiment, time)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(GetBookingResponseBody200_ReadBooking, self.booking)
        result["Locked"] = from_bool(self.locked)
        result["Experiment"] = self.experiment
        result["Time"] = self.time
        return result


class StickyTimeslot:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'StickyTimeslot':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return StickyTimeslot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PutBookingLockResponseBody200_Booking:
    """A booking in the booking system."""
    devices: List[str]
    """Shows whether the booking was done by an external institution."""
    external: bool
    """Unique ID of the booking."""
    id: str
    """User readable notes about the status of the booking (e.g. if devices are unknown)."""
    message: Optional[str]
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    status: Status
    """A time slot represents a slice of time used for bookings."""
    time: StickyTimeslot
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: StickyTimeslot, type: Optional[TypeEnum], you: bool) -> None:
        self.devices = devices
        self.external = external
        self.id = id
        self.message = message
        self.status = status
        self.time = time
        self.type = type
        self.you = you

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_Booking':
        assert isinstance(obj, dict)
        devices = from_list(from_str, obj.get("Devices"))
        external = from_bool(obj.get("External"))
        id = from_str(obj.get("ID"))
        message = from_union([from_str, from_none], obj.get("Message"))
        status = Status(obj.get("Status"))
        time = StickyTimeslot.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return PutBookingLockResponseBody200_Booking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        if self.message is not None:
            result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(StickyTimeslot, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        result["You"] = from_bool(self.you)
        return result


class PutBookingLockResponseBody200_Time:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_Time':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PutBookingLockResponseBody200_Time(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PutBookingLockResponseBody200_Token:
    device: Optional[str]
    token: Optional[str]

    def __init__(self, device: Optional[str], token: Optional[str]) -> None:
        self.device = device
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_Token':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("Device"))
        token = from_union([from_str, from_none], obj.get("Token"))
        return PutBookingLockResponseBody200_Token(device, token)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["Device"] = from_union([from_str, from_none], self.device)
        if self.token is not None:
            result["Token"] = from_union([from_str, from_none], self.token)
        return result


class PutBookingLockResponseBody200:
    """A booking in the booking system."""
    booking: PutBookingLockResponseBody200_Booking
    """A time slot represents a slice of time used for bookings."""
    time: PutBookingLockResponseBody200_Time
    """A list of access tokens"""
    tokens: List[PutBookingLockResponseBody200_Token]

    def __init__(self, booking: PutBookingLockResponseBody200_Booking, time: PutBookingLockResponseBody200_Time, tokens: List[PutBookingLockResponseBody200_Token]) -> None:
        self.booking = booking
        self.time = time
        self.tokens = tokens

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200':
        assert isinstance(obj, dict)
        booking = PutBookingLockResponseBody200_Booking.from_dict(obj.get("Booking"))
        time = PutBookingLockResponseBody200_Time.from_dict(obj.get("Time"))
        tokens = from_list(PutBookingLockResponseBody200_Token.from_dict, obj.get("Tokens"))
        return PutBookingLockResponseBody200(booking, time, tokens)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(PutBookingLockResponseBody200_Booking, self.booking)
        result["Time"] = to_class(PutBookingLockResponseBody200_Time, self.time)
        result["Tokens"] = from_list(lambda x: to_class(PutBookingLockResponseBody200_Token, x), self.tokens)
        return result


class IndigoTimeslot:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'IndigoTimeslot':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return IndigoTimeslot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PutBookingLockResponseBody200_WriteBooking:
    """A booking in the booking system."""
    devices: List[str]
    """Shows whether the booking was done by an external institution."""
    external: bool
    """Unique ID of the booking."""
    id: str
    """User readable notes about the status of the booking (e.g. if devices are unknown)."""
    message: Optional[str]
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    status: Status
    """A time slot represents a slice of time used for bookings."""
    time: IndigoTimeslot
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: IndigoTimeslot, type: Optional[TypeEnum], you: bool) -> None:
        self.devices = devices
        self.external = external
        self.id = id
        self.message = message
        self.status = status
        self.time = time
        self.type = type
        self.you = you

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_WriteBooking':
        assert isinstance(obj, dict)
        devices = from_list(from_str, obj.get("Devices"))
        external = from_bool(obj.get("External"))
        id = from_str(obj.get("ID"))
        message = from_union([from_str, from_none], obj.get("Message"))
        status = Status(obj.get("Status"))
        time = IndigoTimeslot.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return PutBookingLockResponseBody200_WriteBooking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        if self.message is not None:
            result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(IndigoTimeslot, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        result["You"] = from_bool(self.you)
        return result


class PutBookingLockResponseBody200_WriteTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_WriteTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PutBookingLockResponseBody200_WriteTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PutBookingLockResponseBody200_WriteToken:
    device: Optional[str]
    token: Optional[str]

    def __init__(self, device: Optional[str], token: Optional[str]) -> None:
        self.device = device
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_WriteToken':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("Device"))
        token = from_union([from_str, from_none], obj.get("Token"))
        return PutBookingLockResponseBody200_WriteToken(device, token)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["Device"] = from_union([from_str, from_none], self.device)
        if self.token is not None:
            result["Token"] = from_union([from_str, from_none], self.token)
        return result


class PutBookingLockResponseBody200_Write:
    """A booking in the booking system."""
    booking: PutBookingLockResponseBody200_WriteBooking
    """A time slot represents a slice of time used for bookings."""
    time: PutBookingLockResponseBody200_WriteTime
    """A list of access tokens"""
    tokens: List[PutBookingLockResponseBody200_WriteToken]

    def __init__(self, booking: PutBookingLockResponseBody200_WriteBooking, time: PutBookingLockResponseBody200_WriteTime, tokens: List[PutBookingLockResponseBody200_WriteToken]) -> None:
        self.booking = booking
        self.time = time
        self.tokens = tokens

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_Write':
        assert isinstance(obj, dict)
        booking = PutBookingLockResponseBody200_WriteBooking.from_dict(obj.get("Booking"))
        time = PutBookingLockResponseBody200_WriteTime.from_dict(obj.get("Time"))
        tokens = from_list(PutBookingLockResponseBody200_WriteToken.from_dict, obj.get("Tokens"))
        return PutBookingLockResponseBody200_Write(booking, time, tokens)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(PutBookingLockResponseBody200_WriteBooking, self.booking)
        result["Time"] = to_class(PutBookingLockResponseBody200_WriteTime, self.time)
        result["Tokens"] = from_list(lambda x: to_class(PutBookingLockResponseBody200_WriteToken, x), self.tokens)
        return result


class IndecentTimeslot:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'IndecentTimeslot':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return IndecentTimeslot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PutBookingLockResponseBody200_ReadBooking:
    """A booking in the booking system."""
    devices: List[str]
    """Shows whether the booking was done by an external institution."""
    external: bool
    """Unique ID of the booking."""
    id: str
    """User readable notes about the status of the booking (e.g. if devices are unknown)."""
    message: Optional[str]
    """Current status of the booking. While the booking is pending, it can not be used. Will
    change automatically and can not be set by user. 'rejected' is set when the initial
    booking failed, 'cancelled' when the booking was deleted / cancelled after it was once
    active. The 'active-*' will be used when a device was added after the booking was locked.
    """
    status: Status
    """A time slot represents a slice of time used for bookings."""
    time: IndecentTimeslot
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: IndecentTimeslot, type: Optional[TypeEnum], you: bool) -> None:
        self.devices = devices
        self.external = external
        self.id = id
        self.message = message
        self.status = status
        self.time = time
        self.type = type
        self.you = you

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_ReadBooking':
        assert isinstance(obj, dict)
        devices = from_list(from_str, obj.get("Devices"))
        external = from_bool(obj.get("External"))
        id = from_str(obj.get("ID"))
        message = from_union([from_str, from_none], obj.get("Message"))
        status = Status(obj.get("Status"))
        time = IndecentTimeslot.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return PutBookingLockResponseBody200_ReadBooking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        if self.message is not None:
            result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(IndecentTimeslot, self.time)
        if self.type is not None:
            result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        result["You"] = from_bool(self.you)
        return result


class PutBookingLockResponseBody200_ReadTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_ReadTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PutBookingLockResponseBody200_ReadTime(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PutBookingLockResponseBody200_ReadToken:
    device: Optional[str]
    token: Optional[str]

    def __init__(self, device: Optional[str], token: Optional[str]) -> None:
        self.device = device
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_ReadToken':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("Device"))
        token = from_union([from_str, from_none], obj.get("Token"))
        return PutBookingLockResponseBody200_ReadToken(device, token)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["Device"] = from_union([from_str, from_none], self.device)
        if self.token is not None:
            result["Token"] = from_union([from_str, from_none], self.token)
        return result


class PutBookingLockResponseBody200_Read:
    """A booking in the booking system."""
    booking: PutBookingLockResponseBody200_ReadBooking
    """A time slot represents a slice of time used for bookings."""
    time: PutBookingLockResponseBody200_ReadTime
    """A list of access tokens"""
    tokens: List[PutBookingLockResponseBody200_ReadToken]

    def __init__(self, booking: PutBookingLockResponseBody200_ReadBooking, time: PutBookingLockResponseBody200_ReadTime, tokens: List[PutBookingLockResponseBody200_ReadToken]) -> None:
        self.booking = booking
        self.time = time
        self.tokens = tokens

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200_Read':
        assert isinstance(obj, dict)
        booking = PutBookingLockResponseBody200_ReadBooking.from_dict(obj.get("Booking"))
        time = PutBookingLockResponseBody200_ReadTime.from_dict(obj.get("Time"))
        tokens = from_list(PutBookingLockResponseBody200_ReadToken.from_dict, obj.get("Tokens"))
        return PutBookingLockResponseBody200_Read(booking, time, tokens)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(PutBookingLockResponseBody200_ReadBooking, self.booking)
        result["Time"] = to_class(PutBookingLockResponseBody200_ReadTime, self.time)
        result["Tokens"] = from_list(lambda x: to_class(PutBookingLockResponseBody200_ReadToken, x), self.tokens)
        return result


class GetDevicesResponseBody200_Type(Enum):
    """Type of the device"""
    CLOUD_INSTANTIABLE = "cloud instantiable"
    DEVICE = "device"
    EDGE_INSTANTIABLE = "edge instantiable"
    GROUP = "group"


class GetDevicesResponseBody200_Element:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDevicesResponseBody200_Element':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetDevicesResponseBody200_Element(description, name, owner, type, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetDevicesResponseBody200_WriteElement:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDevicesResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetDevicesResponseBody200_WriteElement(description, name, owner, type, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetDevicesResponseBody200_ReadElement:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDevicesResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetDevicesResponseBody200_ReadElement(description, name, owner, type, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class Frequency(Enum):
    DAILY = "DAILY"
    HOURLY = "HOURLY"
    MONTHLY = "MONTHLY"
    WEEKLY = "WEEKLY"
    YEARLY = "YEARLY"


class PurpleRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return PurpleRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PostDevicesRequestBodyAvailabilityRule:
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[PurpleRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[PurpleRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([PurpleRepeat.from_dict, from_none], obj.get("repeat"))
        return PostDevicesRequestBodyAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(PurpleRepeat, x), from_none], self.repeat)
        return result


class PostDevicesRequestBodyDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PostDevicesRequestBodyDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostDevicesRequestBody:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PostDevicesRequestBodyAvailabilityRule]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PostDevicesRequestBodyDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesRequestBodyAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesRequestBodyDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBody':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDevicesRequestBodyAvailabilityRule.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PostDevicesRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PostDevicesRequestBody(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyAvailabilityRule, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class FluffyRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return FluffyRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PostDevicesRequestBodyWriteAvailabilityRule:
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[FluffyRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[FluffyRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyWriteAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([FluffyRepeat.from_dict, from_none], obj.get("repeat"))
        return PostDevicesRequestBodyWriteAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(FluffyRepeat, x), from_none], self.repeat)
        return result


class PostDevicesRequestBodyWriteDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyWriteDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PostDevicesRequestBodyWriteDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostDevicesRequestBodyWrite:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PostDevicesRequestBodyWriteAvailabilityRule]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PostDevicesRequestBodyWriteDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesRequestBodyWriteAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesRequestBodyWriteDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyWrite':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDevicesRequestBodyWriteAvailabilityRule.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PostDevicesRequestBodyWriteDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PostDevicesRequestBodyWrite(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyWriteAvailabilityRule, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyWriteDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class TentacledRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return TentacledRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PostDevicesRequestBodyReadAvailabilityRule:
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[TentacledRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[TentacledRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyReadAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([TentacledRepeat.from_dict, from_none], obj.get("repeat"))
        return PostDevicesRequestBodyReadAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(TentacledRepeat, x), from_none], self.repeat)
        return result


class PostDevicesRequestBodyReadDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyReadDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PostDevicesRequestBodyReadDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostDevicesRequestBodyRead:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PostDevicesRequestBodyReadAvailabilityRule]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PostDevicesRequestBodyReadDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesRequestBodyReadAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesRequestBodyReadDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesRequestBodyRead':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDevicesRequestBodyReadAvailabilityRule.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PostDevicesRequestBodyReadDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PostDevicesRequestBodyRead(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyReadAvailabilityRule, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyReadDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PostDevicesResponseBody201_AnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_AnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDevicesResponseBody201_AnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PostDevicesResponseBody201_Device:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_Device':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PostDevicesResponseBody201_Device(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostDevicesResponseBody201:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PostDevicesResponseBody201_AnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PostDevicesResponseBody201_Device]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesResponseBody201_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesResponseBody201_Device]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDevicesResponseBody201_AnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PostDevicesResponseBody201_Device.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PostDevicesResponseBody201(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_Device, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PostDevicesResponseBody201_WriteAnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_WriteAnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDevicesResponseBody201_WriteAnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PostDevicesResponseBody201_WriteDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_WriteDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PostDevicesResponseBody201_WriteDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostDevicesResponseBody201_Write:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PostDevicesResponseBody201_WriteAnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PostDevicesResponseBody201_WriteDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesResponseBody201_WriteAnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesResponseBody201_WriteDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_Write':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDevicesResponseBody201_WriteAnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PostDevicesResponseBody201_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PostDevicesResponseBody201_Write(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_WriteAnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_WriteDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PostDevicesResponseBody201_ReadAnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_ReadAnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDevicesResponseBody201_ReadAnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PostDevicesResponseBody201_ReadDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_ReadDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PostDevicesResponseBody201_ReadDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostDevicesResponseBody201_Read:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PostDevicesResponseBody201_ReadAnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PostDevicesResponseBody201_ReadDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesResponseBody201_ReadAnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesResponseBody201_ReadDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PostDevicesResponseBody201_Read':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDevicesResponseBody201_ReadAnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PostDevicesResponseBody201_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PostDevicesResponseBody201_Read(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_ReadAnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_ReadDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class GetDeviceResponseBody200_AnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_AnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return GetDeviceResponseBody200_AnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class GetDeviceResponseBody200_Device:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_Device':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return GetDeviceResponseBody200_Device(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetDeviceResponseBody200:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[GetDeviceResponseBody200_AnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[GetDeviceResponseBody200_Device]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[GetDeviceResponseBody200_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[GetDeviceResponseBody200_Device]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(GetDeviceResponseBody200_AnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(GetDeviceResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return GetDeviceResponseBody200(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_Device, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class GetDeviceResponseBody200_WriteAnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_WriteAnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return GetDeviceResponseBody200_WriteAnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class GetDeviceResponseBody200_WriteDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_WriteDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return GetDeviceResponseBody200_WriteDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetDeviceResponseBody200_Write:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[GetDeviceResponseBody200_WriteAnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[GetDeviceResponseBody200_WriteDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[GetDeviceResponseBody200_WriteAnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[GetDeviceResponseBody200_WriteDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_Write':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(GetDeviceResponseBody200_WriteAnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(GetDeviceResponseBody200_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return GetDeviceResponseBody200_Write(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_WriteAnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_WriteDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class GetDeviceResponseBody200_ReadAnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_ReadAnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return GetDeviceResponseBody200_ReadAnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class GetDeviceResponseBody200_ReadDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_ReadDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return GetDeviceResponseBody200_ReadDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetDeviceResponseBody200_Read:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[GetDeviceResponseBody200_ReadAnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[GetDeviceResponseBody200_ReadDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[GetDeviceResponseBody200_ReadAnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[GetDeviceResponseBody200_ReadDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'GetDeviceResponseBody200_Read':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(GetDeviceResponseBody200_ReadAnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(GetDeviceResponseBody200_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return GetDeviceResponseBody200_Read(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_ReadAnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_ReadDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class StickyRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'StickyRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return StickyRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PatchDeviceRequestBodyAvailabilityRule:
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[StickyRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[StickyRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([StickyRepeat.from_dict, from_none], obj.get("repeat"))
        return PatchDeviceRequestBodyAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(StickyRepeat, x), from_none], self.repeat)
        return result


class PatchDeviceRequestBodyDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchDeviceRequestBodyDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchDeviceRequestBody:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PatchDeviceRequestBodyAvailabilityRule]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PatchDeviceRequestBodyDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceRequestBodyAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceRequestBodyDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBody':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PatchDeviceRequestBodyAvailabilityRule.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PatchDeviceRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PatchDeviceRequestBody(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyAvailabilityRule, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class IndigoRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'IndigoRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return IndigoRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PatchDeviceRequestBodyWriteAvailabilityRule:
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[IndigoRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[IndigoRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyWriteAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([IndigoRepeat.from_dict, from_none], obj.get("repeat"))
        return PatchDeviceRequestBodyWriteAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(IndigoRepeat, x), from_none], self.repeat)
        return result


class PatchDeviceRequestBodyWriteDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyWriteDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchDeviceRequestBodyWriteDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchDeviceRequestBodyWrite:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PatchDeviceRequestBodyWriteAvailabilityRule]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PatchDeviceRequestBodyWriteDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceRequestBodyWriteAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceRequestBodyWriteDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyWrite':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PatchDeviceRequestBodyWriteAvailabilityRule.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PatchDeviceRequestBodyWriteDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PatchDeviceRequestBodyWrite(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyWriteAvailabilityRule, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyWriteDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class IndecentRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'IndecentRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return IndecentRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PatchDeviceRequestBodyReadAvailabilityRule:
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[IndecentRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[IndecentRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyReadAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([IndecentRepeat.from_dict, from_none], obj.get("repeat"))
        return PatchDeviceRequestBodyReadAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(IndecentRepeat, x), from_none], self.repeat)
        return result


class PatchDeviceRequestBodyReadDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyReadDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchDeviceRequestBodyReadDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchDeviceRequestBodyRead:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PatchDeviceRequestBodyReadAvailabilityRule]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PatchDeviceRequestBodyReadDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceRequestBodyReadAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceRequestBodyReadDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyRead':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PatchDeviceRequestBodyReadAvailabilityRule.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PatchDeviceRequestBodyReadDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PatchDeviceRequestBodyRead(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyReadAvailabilityRule, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyReadDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PatchDeviceResponseBody200_AnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_AnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PatchDeviceResponseBody200_AnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PatchDeviceResponseBody200_Device:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_Device':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchDeviceResponseBody200_Device(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchDeviceResponseBody200:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PatchDeviceResponseBody200_AnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PatchDeviceResponseBody200_Device]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceResponseBody200_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceResponseBody200_Device]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PatchDeviceResponseBody200_AnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PatchDeviceResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PatchDeviceResponseBody200(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_Device, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PatchDeviceResponseBody200_WriteAnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_WriteAnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PatchDeviceResponseBody200_WriteAnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PatchDeviceResponseBody200_WriteDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_WriteDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchDeviceResponseBody200_WriteDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchDeviceResponseBody200_Write:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PatchDeviceResponseBody200_WriteAnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PatchDeviceResponseBody200_WriteDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceResponseBody200_WriteAnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceResponseBody200_WriteDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_Write':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PatchDeviceResponseBody200_WriteAnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PatchDeviceResponseBody200_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PatchDeviceResponseBody200_Write(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_WriteAnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_WriteDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PatchDeviceResponseBody200_ReadAnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_ReadAnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PatchDeviceResponseBody200_ReadAnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PatchDeviceResponseBody200_ReadDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_ReadDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return PatchDeviceResponseBody200_ReadDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PatchDeviceResponseBody200_Read:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[GetDevicesResponseBody200_Type]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PatchDeviceResponseBody200_ReadAnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]
    devices: Optional[List[PatchDeviceResponseBody200_ReadDevice]]
    instantiate_url: Optional[str]
    code_url: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceResponseBody200_ReadAnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceResponseBody200_ReadDevice]], instantiate_url: Optional[str], code_url: Optional[str]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services
        self.devices = devices
        self.instantiate_url = instantiate_url
        self.code_url = code_url

    @staticmethod
    def from_dict(obj: Any) -> 'PatchDeviceResponseBody200_Read':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PatchDeviceResponseBody200_ReadAnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        devices = from_union([lambda x: from_list(PatchDeviceResponseBody200_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        instantiate_url = from_union([from_str, from_none], obj.get("instantiate_url"))
        code_url = from_union([from_str, from_none], obj.get("code_url"))
        return PatchDeviceResponseBody200_Read(description, name, owner, type, url, announced_availability, connected, experiment, services, devices, instantiate_url, code_url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_ReadAnnouncedAvailability, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_ReadDevice, x), x), from_none], self.devices)
        if self.instantiate_url is not None:
            result["instantiate_url"] = from_union([from_str, from_none], self.instantiate_url)
        if self.code_url is not None:
            result["code_url"] = from_union([from_str, from_none], self.code_url)
        return result


class PurpleTimeSlot:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleTimeSlot':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PurpleTimeSlot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class ConcreteDeviceType(Enum):
    """Type of the device"""
    DEVICE = "device"


class PurpleConcreteDevice:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[ConcreteDeviceType]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[PurpleTimeSlot]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[ConcreteDeviceType], url: Optional[str], announced_availability: Optional[List[PurpleTimeSlot]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleConcreteDevice':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([ConcreteDeviceType, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PurpleTimeSlot.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        return PurpleConcreteDevice(description, name, owner, type, url, announced_availability, connected, experiment, services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(ConcreteDeviceType, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PurpleTimeSlot, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        return result


class PostDeviceResponseBody201:
    device_token: Optional[str]
    instance: Optional[PurpleConcreteDevice]

    def __init__(self, device_token: Optional[str], instance: Optional[PurpleConcreteDevice]) -> None:
        self.device_token = device_token
        self.instance = instance

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceResponseBody201':
        assert isinstance(obj, dict)
        device_token = from_union([from_str, from_none], obj.get("deviceToken"))
        instance = from_union([PurpleConcreteDevice.from_dict, from_none], obj.get("instance"))
        return PostDeviceResponseBody201(device_token, instance)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device_token is not None:
            result["deviceToken"] = from_union([from_str, from_none], self.device_token)
        if self.instance is not None:
            result["instance"] = from_union([lambda x: to_class(PurpleConcreteDevice, x), from_none], self.instance)
        return result


class FluffyTimeSlot:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyTimeSlot':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return FluffyTimeSlot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class FluffyConcreteDevice:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[ConcreteDeviceType]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[FluffyTimeSlot]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[ConcreteDeviceType], url: Optional[str], announced_availability: Optional[List[FluffyTimeSlot]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyConcreteDevice':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([ConcreteDeviceType, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(FluffyTimeSlot.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        return FluffyConcreteDevice(description, name, owner, type, url, announced_availability, connected, experiment, services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(ConcreteDeviceType, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(FluffyTimeSlot, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        return result


class PostDeviceResponseBody201_Write:
    device_token: Optional[str]
    instance: Optional[FluffyConcreteDevice]

    def __init__(self, device_token: Optional[str], instance: Optional[FluffyConcreteDevice]) -> None:
        self.device_token = device_token
        self.instance = instance

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceResponseBody201_Write':
        assert isinstance(obj, dict)
        device_token = from_union([from_str, from_none], obj.get("deviceToken"))
        instance = from_union([FluffyConcreteDevice.from_dict, from_none], obj.get("instance"))
        return PostDeviceResponseBody201_Write(device_token, instance)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device_token is not None:
            result["deviceToken"] = from_union([from_str, from_none], self.device_token)
        if self.instance is not None:
            result["instance"] = from_union([lambda x: to_class(FluffyConcreteDevice, x), from_none], self.instance)
        return result


class TentacledTimeSlot:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledTimeSlot':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return TentacledTimeSlot(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class TentacledConcreteDevice:
    """Extended description of the device, features, etc."""
    description: Optional[str]
    """Name of the device"""
    name: Optional[str]
    owner: Optional[str]
    """Type of the device"""
    type: Optional[ConcreteDeviceType]
    """URL of the device"""
    url: Optional[str]
    """A list of time slots that the maintainer of the device announced it is available"""
    announced_availability: Optional[List[TentacledTimeSlot]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[ConcreteDeviceType], url: Optional[str], announced_availability: Optional[List[TentacledTimeSlot]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]]) -> None:
        self.description = description
        self.name = name
        self.owner = owner
        self.type = type
        self.url = url
        self.announced_availability = announced_availability
        self.connected = connected
        self.experiment = experiment
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledConcreteDevice':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([ConcreteDeviceType, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(TentacledTimeSlot.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        return TentacledConcreteDevice(description, name, owner, type, url, announced_availability, connected, experiment, services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        if self.owner is not None:
            result["owner"] = from_union([from_str, from_none], self.owner)
        if self.type is not None:
            result["type"] = from_union([lambda x: to_enum(ConcreteDeviceType, x), from_none], self.type)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.announced_availability is not None:
            result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(TentacledTimeSlot, x), x), from_none], self.announced_availability)
        if self.connected is not None:
            result["connected"] = from_union([from_bool, from_none], self.connected)
        if self.experiment is not None:
            result["experiment"] = from_union([from_str, from_none], self.experiment)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        return result


class PostDeviceResponseBody201_Read:
    device_token: Optional[str]
    instance: Optional[TentacledConcreteDevice]

    def __init__(self, device_token: Optional[str], instance: Optional[TentacledConcreteDevice]) -> None:
        self.device_token = device_token
        self.instance = instance

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceResponseBody201_Read':
        assert isinstance(obj, dict)
        device_token = from_union([from_str, from_none], obj.get("deviceToken"))
        instance = from_union([TentacledConcreteDevice.from_dict, from_none], obj.get("instance"))
        return PostDeviceResponseBody201_Read(device_token, instance)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device_token is not None:
            result["deviceToken"] = from_union([from_str, from_none], self.device_token)
        if self.instance is not None:
            result["instance"] = from_union([lambda x: to_class(TentacledConcreteDevice, x), from_none], self.instance)
        return result


class HilariousRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'HilariousRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return HilariousRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PurpleAvailabilityRule:
    """The availability rule to be applied."""
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[HilariousRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[HilariousRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([HilariousRepeat.from_dict, from_none], obj.get("repeat"))
        return PurpleAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(HilariousRepeat, x), from_none], self.repeat)
        return result


class AmbitiousRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'AmbitiousRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return AmbitiousRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class FluffyAvailabilityRule:
    """The availability rule to be applied."""
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[AmbitiousRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[AmbitiousRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([AmbitiousRepeat.from_dict, from_none], obj.get("repeat"))
        return FluffyAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(AmbitiousRepeat, x), from_none], self.repeat)
        return result


class CunningRepeat:
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    """How often the time slot will be repeated"""
    count: Optional[int]
    frequency: Optional[Frequency]
    """Up to this date-time the time slot will be repeated."""
    until: Optional[datetime]

    def __init__(self, count: Optional[int], frequency: Optional[Frequency], until: Optional[datetime]) -> None:
        self.count = count
        self.frequency = frequency
        self.until = until

    @staticmethod
    def from_dict(obj: Any) -> 'CunningRepeat':
        assert isinstance(obj, dict)
        count = from_union([from_int, from_none], obj.get("count"))
        frequency = from_union([Frequency, from_none], obj.get("frequency"))
        until = from_union([from_datetime, from_none], obj.get("until"))
        return CunningRepeat(count, frequency, until)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.count is not None:
            result["count"] = from_union([from_int, from_none], self.count)
        if self.frequency is not None:
            result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        if self.until is not None:
            result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class TentacledAvailabilityRule:
    """The availability rule to be applied."""
    end: Optional[datetime]
    start: Optional[datetime]
    available: Optional[bool]
    """If specified the time slot is repeated in a fixed offset specified by the frequency"""
    repeat: Optional[CunningRepeat]

    def __init__(self, end: Optional[datetime], start: Optional[datetime], available: Optional[bool], repeat: Optional[CunningRepeat]) -> None:
        self.end = end
        self.start = start
        self.available = available
        self.repeat = repeat

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([CunningRepeat.from_dict, from_none], obj.get("repeat"))
        return TentacledAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        if self.available is not None:
            result["available"] = from_union([from_bool, from_none], self.available)
        if self.repeat is not None:
            result["repeat"] = from_union([lambda x: to_class(CunningRepeat, x), from_none], self.repeat)
        return result


class PostDeviceAvailabilityResponseBody200_Element:
    """A list of time slots that the maintainer of the device announced it is available"""
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceAvailabilityResponseBody200_Element':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDeviceAvailabilityResponseBody200_Element(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PostDeviceAvailabilityResponseBody200_WriteElement:
    """A list of time slots that the maintainer of the device announced it is available"""
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceAvailabilityResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDeviceAvailabilityResponseBody200_WriteElement(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PostDeviceAvailabilityResponseBody200_ReadElement:
    """A list of time slots that the maintainer of the device announced it is available"""
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceAvailabilityResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDeviceAvailabilityResponseBody200_ReadElement(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end is not None:
            result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        if self.start is not None:
            result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class CommandEnum(Enum):
    """The access token.
    
    First unknown device ID.
    
    First virtual device ID.
    
    Error description.
    
    Error description
    
    Error code
    
    Error string
    
    URL to the [peer
    connection](https://cross-lab-project.github.io/crosslab/api/device.html#get-/peerconnections/-peerconnection_id-).
    """
    CLOSE_PEERCONNECTION = "closePeerconnection"
    CREATE_PEERCONNECTION = "createPeerconnection"


class ConnectionType(Enum):
    WEBRTC = "webrtc"
    WEBSOCKET = "websocket"


class MessageTypeEnum(Enum):
    """The access token.
    
    First unknown device ID.
    
    First virtual device ID.
    
    Error description.
    
    Error description
    
    Error code
    
    Error string
    
    URL to the [peer
    connection](https://cross-lab-project.github.io/crosslab/api/device.html#get-/peerconnections/-peerconnection_id-).
    """
    COMMAND = "command"
    SIGNALING = "signaling"


class PostDeviceSignalingRequestBodyService:
    remote_service_id: str
    service_id: str
    service_type: str

    def __init__(self, remote_service_id: str, service_id: str, service_type: str) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBodyService':
        assert isinstance(obj, dict)
        remote_service_id = from_str(obj.get("remoteServiceId"))
        service_id = from_str(obj.get("serviceId"))
        service_type = from_str(obj.get("serviceType"))
        return PostDeviceSignalingRequestBodyService(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["remoteServiceId"] = from_str(self.remote_service_id)
        result["serviceId"] = from_str(self.service_id)
        result["serviceType"] = from_str(self.service_type)
        return result


class SignalingType(Enum):
    ANSWER = "answer"
    CANDIDATE = "candidate"
    OFFER = "offer"


class PostDeviceSignalingRequestBody:
    message_type: MessageTypeEnum
    command: Optional[CommandEnum]
    config: Optional[Dict[str, Any]]
    connection_type: Optional[ConnectionType]
    connection_url: str
    services: Optional[List[PostDeviceSignalingRequestBodyService]]
    tiebreaker: Optional[bool]
    content: Optional[Dict[str, Any]]
    signaling_type: Optional[SignalingType]

    def __init__(self, message_type: MessageTypeEnum, command: Optional[CommandEnum], config: Optional[Dict[str, Any]], connection_type: Optional[ConnectionType], connection_url: str, services: Optional[List[PostDeviceSignalingRequestBodyService]], tiebreaker: Optional[bool], content: Optional[Dict[str, Any]], signaling_type: Optional[SignalingType]) -> None:
        self.message_type = message_type
        self.command = command
        self.config = config
        self.connection_type = connection_type
        self.connection_url = connection_url
        self.services = services
        self.tiebreaker = tiebreaker
        self.content = content
        self.signaling_type = signaling_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBody':
        assert isinstance(obj, dict)
        message_type = MessageTypeEnum(obj.get("messageType"))
        command = from_union([CommandEnum, from_none], obj.get("command"))
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        connection_type = from_union([ConnectionType, from_none], obj.get("connectionType"))
        connection_url = from_str(obj.get("connectionUrl"))
        services = from_union([lambda x: from_list(PostDeviceSignalingRequestBodyService.from_dict, x), from_none], obj.get("services"))
        tiebreaker = from_union([from_bool, from_none], obj.get("tiebreaker"))
        content = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("content"))
        signaling_type = from_union([SignalingType, from_none], obj.get("signalingType"))
        return PostDeviceSignalingRequestBody(message_type, command, config, connection_type, connection_url, services, tiebreaker, content, signaling_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["messageType"] = to_enum(MessageTypeEnum, self.message_type)
        if self.command is not None:
            result["command"] = from_union([lambda x: to_enum(CommandEnum, x), from_none], self.command)
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.connection_type is not None:
            result["connectionType"] = from_union([lambda x: to_enum(ConnectionType, x), from_none], self.connection_type)
        result["connectionUrl"] = from_str(self.connection_url)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(PostDeviceSignalingRequestBodyService, x), x), from_none], self.services)
        if self.tiebreaker is not None:
            result["tiebreaker"] = from_union([from_bool, from_none], self.tiebreaker)
        if self.content is not None:
            result["content"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.content)
        if self.signaling_type is not None:
            result["signalingType"] = from_union([lambda x: to_enum(SignalingType, x), from_none], self.signaling_type)
        return result


class PostDeviceSignalingRequestBodyWriteService:
    remote_service_id: str
    service_id: str
    service_type: str

    def __init__(self, remote_service_id: str, service_id: str, service_type: str) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBodyWriteService':
        assert isinstance(obj, dict)
        remote_service_id = from_str(obj.get("remoteServiceId"))
        service_id = from_str(obj.get("serviceId"))
        service_type = from_str(obj.get("serviceType"))
        return PostDeviceSignalingRequestBodyWriteService(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["remoteServiceId"] = from_str(self.remote_service_id)
        result["serviceId"] = from_str(self.service_id)
        result["serviceType"] = from_str(self.service_type)
        return result


class PostDeviceSignalingRequestBodyWrite:
    message_type: MessageTypeEnum
    command: Optional[CommandEnum]
    config: Optional[Dict[str, Any]]
    connection_type: Optional[ConnectionType]
    connection_url: str
    services: Optional[List[PostDeviceSignalingRequestBodyWriteService]]
    tiebreaker: Optional[bool]
    content: Optional[Dict[str, Any]]
    signaling_type: Optional[SignalingType]

    def __init__(self, message_type: MessageTypeEnum, command: Optional[CommandEnum], config: Optional[Dict[str, Any]], connection_type: Optional[ConnectionType], connection_url: str, services: Optional[List[PostDeviceSignalingRequestBodyWriteService]], tiebreaker: Optional[bool], content: Optional[Dict[str, Any]], signaling_type: Optional[SignalingType]) -> None:
        self.message_type = message_type
        self.command = command
        self.config = config
        self.connection_type = connection_type
        self.connection_url = connection_url
        self.services = services
        self.tiebreaker = tiebreaker
        self.content = content
        self.signaling_type = signaling_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBodyWrite':
        assert isinstance(obj, dict)
        message_type = MessageTypeEnum(obj.get("messageType"))
        command = from_union([CommandEnum, from_none], obj.get("command"))
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        connection_type = from_union([ConnectionType, from_none], obj.get("connectionType"))
        connection_url = from_str(obj.get("connectionUrl"))
        services = from_union([lambda x: from_list(PostDeviceSignalingRequestBodyWriteService.from_dict, x), from_none], obj.get("services"))
        tiebreaker = from_union([from_bool, from_none], obj.get("tiebreaker"))
        content = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("content"))
        signaling_type = from_union([SignalingType, from_none], obj.get("signalingType"))
        return PostDeviceSignalingRequestBodyWrite(message_type, command, config, connection_type, connection_url, services, tiebreaker, content, signaling_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["messageType"] = to_enum(MessageTypeEnum, self.message_type)
        if self.command is not None:
            result["command"] = from_union([lambda x: to_enum(CommandEnum, x), from_none], self.command)
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.connection_type is not None:
            result["connectionType"] = from_union([lambda x: to_enum(ConnectionType, x), from_none], self.connection_type)
        result["connectionUrl"] = from_str(self.connection_url)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(PostDeviceSignalingRequestBodyWriteService, x), x), from_none], self.services)
        if self.tiebreaker is not None:
            result["tiebreaker"] = from_union([from_bool, from_none], self.tiebreaker)
        if self.content is not None:
            result["content"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.content)
        if self.signaling_type is not None:
            result["signalingType"] = from_union([lambda x: to_enum(SignalingType, x), from_none], self.signaling_type)
        return result


class PostDeviceSignalingRequestBodyReadService:
    remote_service_id: str
    service_id: str
    service_type: str

    def __init__(self, remote_service_id: str, service_id: str, service_type: str) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBodyReadService':
        assert isinstance(obj, dict)
        remote_service_id = from_str(obj.get("remoteServiceId"))
        service_id = from_str(obj.get("serviceId"))
        service_type = from_str(obj.get("serviceType"))
        return PostDeviceSignalingRequestBodyReadService(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["remoteServiceId"] = from_str(self.remote_service_id)
        result["serviceId"] = from_str(self.service_id)
        result["serviceType"] = from_str(self.service_type)
        return result


class PostDeviceSignalingRequestBodyRead:
    message_type: MessageTypeEnum
    command: Optional[CommandEnum]
    config: Optional[Dict[str, Any]]
    connection_type: Optional[ConnectionType]
    connection_url: str
    services: Optional[List[PostDeviceSignalingRequestBodyReadService]]
    tiebreaker: Optional[bool]
    content: Optional[Dict[str, Any]]
    signaling_type: Optional[SignalingType]

    def __init__(self, message_type: MessageTypeEnum, command: Optional[CommandEnum], config: Optional[Dict[str, Any]], connection_type: Optional[ConnectionType], connection_url: str, services: Optional[List[PostDeviceSignalingRequestBodyReadService]], tiebreaker: Optional[bool], content: Optional[Dict[str, Any]], signaling_type: Optional[SignalingType]) -> None:
        self.message_type = message_type
        self.command = command
        self.config = config
        self.connection_type = connection_type
        self.connection_url = connection_url
        self.services = services
        self.tiebreaker = tiebreaker
        self.content = content
        self.signaling_type = signaling_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBodyRead':
        assert isinstance(obj, dict)
        message_type = MessageTypeEnum(obj.get("messageType"))
        command = from_union([CommandEnum, from_none], obj.get("command"))
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        connection_type = from_union([ConnectionType, from_none], obj.get("connectionType"))
        connection_url = from_str(obj.get("connectionUrl"))
        services = from_union([lambda x: from_list(PostDeviceSignalingRequestBodyReadService.from_dict, x), from_none], obj.get("services"))
        tiebreaker = from_union([from_bool, from_none], obj.get("tiebreaker"))
        content = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("content"))
        signaling_type = from_union([SignalingType, from_none], obj.get("signalingType"))
        return PostDeviceSignalingRequestBodyRead(message_type, command, config, connection_type, connection_url, services, tiebreaker, content, signaling_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["messageType"] = to_enum(MessageTypeEnum, self.message_type)
        if self.command is not None:
            result["command"] = from_union([lambda x: to_enum(CommandEnum, x), from_none], self.command)
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.connection_type is not None:
            result["connectionType"] = from_union([lambda x: to_enum(ConnectionType, x), from_none], self.connection_type)
        result["connectionUrl"] = from_str(self.connection_url)
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(PostDeviceSignalingRequestBodyReadService, x), x), from_none], self.services)
        if self.tiebreaker is not None:
            result["tiebreaker"] = from_union([from_bool, from_none], self.tiebreaker)
        if self.content is not None:
            result["content"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.content)
        if self.signaling_type is not None:
            result["signalingType"] = from_union([lambda x: to_enum(SignalingType, x), from_none], self.signaling_type)
        return result


class GetPeerconnectionsResponseBody200_Device:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionsResponseBody200_Device':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionsResponseBody200_Device(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionsResponseBody200_Element:
    devices: Optional[List[GetPeerconnectionsResponseBody200_Device]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[GetPeerconnectionsResponseBody200_Device]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionsResponseBody200_Element':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionsResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionsResponseBody200_Element(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_Device, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionsResponseBody200_WriteDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionsResponseBody200_WriteDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionsResponseBody200_WriteDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionsResponseBody200_WriteElement:
    devices: Optional[List[GetPeerconnectionsResponseBody200_WriteDevice]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[GetPeerconnectionsResponseBody200_WriteDevice]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionsResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionsResponseBody200_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionsResponseBody200_WriteElement(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_WriteDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionsResponseBody200_ReadDevice:
    """URL of the device"""
    url: Optional[str]

    def __init__(self, url: Optional[str]) -> None:
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionsResponseBody200_ReadDevice':
        assert isinstance(obj, dict)
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionsResponseBody200_ReadDevice(url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionsResponseBody200_ReadElement:
    devices: Optional[List[GetPeerconnectionsResponseBody200_ReadDevice]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[GetPeerconnectionsResponseBody200_ReadDevice]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionsResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionsResponseBody200_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionsResponseBody200_ReadElement(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_ReadDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PurpleServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PurpleServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PurpleConfig:
    services: Optional[List[PurpleServiceConfig]]

    def __init__(self, services: Optional[List[PurpleServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(PurpleServiceConfig.from_dict, x), from_none], obj.get("services"))
        return PurpleConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(PurpleServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsRequestBodyDevice:
    config: Optional[PurpleConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[PurpleConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBodyDevice':
        assert isinstance(obj, dict)
        config = from_union([PurpleConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsRequestBodyDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(PurpleConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsRequestBodyStatus(Enum):
    """The status of the peerconnection."""
    CLOSED = "closed"
    CONNECTED = "connected"
    FAILED = "failed"
    WAITING_FOR_DEVICES = "waiting-for-devices"


class PostPeerconnectionsRequestBody:
    devices: Optional[List[PostPeerconnectionsRequestBodyDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsRequestBodyDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBody':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsRequestBody(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsRequestBodyDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class FluffyServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return FluffyServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class FluffyConfig:
    services: Optional[List[FluffyServiceConfig]]

    def __init__(self, services: Optional[List[FluffyServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(FluffyServiceConfig.from_dict, x), from_none], obj.get("services"))
        return FluffyConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(FluffyServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsRequestBodyWriteDevice:
    config: Optional[FluffyConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[FluffyConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBodyWriteDevice':
        assert isinstance(obj, dict)
        config = from_union([FluffyConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsRequestBodyWriteDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(FluffyConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsRequestBodyWrite:
    devices: Optional[List[PostPeerconnectionsRequestBodyWriteDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsRequestBodyWriteDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBodyWrite':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsRequestBodyWriteDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsRequestBodyWrite(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsRequestBodyWriteDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class TentacledServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return TentacledServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class TentacledConfig:
    services: Optional[List[TentacledServiceConfig]]

    def __init__(self, services: Optional[List[TentacledServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(TentacledServiceConfig.from_dict, x), from_none], obj.get("services"))
        return TentacledConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(TentacledServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsRequestBodyReadDevice:
    config: Optional[TentacledConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[TentacledConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBodyReadDevice':
        assert isinstance(obj, dict)
        config = from_union([TentacledConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsRequestBodyReadDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(TentacledConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsRequestBodyRead:
    devices: Optional[List[PostPeerconnectionsRequestBodyReadDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsRequestBodyReadDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBodyRead':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsRequestBodyReadDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsRequestBodyRead(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsRequestBodyReadDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class StickyServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'StickyServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return StickyServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class StickyConfig:
    services: Optional[List[StickyServiceConfig]]

    def __init__(self, services: Optional[List[StickyServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'StickyConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(StickyServiceConfig.from_dict, x), from_none], obj.get("services"))
        return StickyConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(StickyServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody201_Device:
    config: Optional[StickyConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[StickyConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201_Device':
        assert isinstance(obj, dict)
        config = from_union([StickyConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody201_Device(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(StickyConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody201:
    devices: Optional[List[PostPeerconnectionsResponseBody201_Device]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody201_Device]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody201_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsResponseBody201(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody201_Device, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class IndigoServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'IndigoServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return IndigoServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class IndigoConfig:
    services: Optional[List[IndigoServiceConfig]]

    def __init__(self, services: Optional[List[IndigoServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'IndigoConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(IndigoServiceConfig.from_dict, x), from_none], obj.get("services"))
        return IndigoConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(IndigoServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody201_WriteDevice:
    config: Optional[IndigoConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[IndigoConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201_WriteDevice':
        assert isinstance(obj, dict)
        config = from_union([IndigoConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody201_WriteDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(IndigoConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody201_Write:
    devices: Optional[List[PostPeerconnectionsResponseBody201_WriteDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody201_WriteDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201_Write':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody201_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsResponseBody201_Write(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody201_WriteDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class IndecentServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'IndecentServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return IndecentServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class IndecentConfig:
    services: Optional[List[IndecentServiceConfig]]

    def __init__(self, services: Optional[List[IndecentServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'IndecentConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(IndecentServiceConfig.from_dict, x), from_none], obj.get("services"))
        return IndecentConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(IndecentServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody201_ReadDevice:
    config: Optional[IndecentConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[IndecentConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201_ReadDevice':
        assert isinstance(obj, dict)
        config = from_union([IndecentConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody201_ReadDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(IndecentConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody201_Read:
    devices: Optional[List[PostPeerconnectionsResponseBody201_ReadDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody201_ReadDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201_Read':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody201_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsResponseBody201_Read(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody201_ReadDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class HilariousServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'HilariousServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return HilariousServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class HilariousConfig:
    services: Optional[List[HilariousServiceConfig]]

    def __init__(self, services: Optional[List[HilariousServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'HilariousConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(HilariousServiceConfig.from_dict, x), from_none], obj.get("services"))
        return HilariousConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(HilariousServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody202_Device:
    config: Optional[HilariousConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[HilariousConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody202_Device':
        assert isinstance(obj, dict)
        config = from_union([HilariousConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody202_Device(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(HilariousConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody202:
    devices: Optional[List[PostPeerconnectionsResponseBody202_Device]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody202_Device]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody202':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody202_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsResponseBody202(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody202_Device, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class AmbitiousServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'AmbitiousServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return AmbitiousServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class AmbitiousConfig:
    services: Optional[List[AmbitiousServiceConfig]]

    def __init__(self, services: Optional[List[AmbitiousServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'AmbitiousConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(AmbitiousServiceConfig.from_dict, x), from_none], obj.get("services"))
        return AmbitiousConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(AmbitiousServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody202_WriteDevice:
    config: Optional[AmbitiousConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[AmbitiousConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody202_WriteDevice':
        assert isinstance(obj, dict)
        config = from_union([AmbitiousConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody202_WriteDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(AmbitiousConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody202_Write:
    devices: Optional[List[PostPeerconnectionsResponseBody202_WriteDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody202_WriteDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody202_Write':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody202_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsResponseBody202_Write(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody202_WriteDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class CunningServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'CunningServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return CunningServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class CunningConfig:
    services: Optional[List[CunningServiceConfig]]

    def __init__(self, services: Optional[List[CunningServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'CunningConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(CunningServiceConfig.from_dict, x), from_none], obj.get("services"))
        return CunningConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(CunningServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody202_ReadDevice:
    config: Optional[CunningConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[CunningConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody202_ReadDevice':
        assert isinstance(obj, dict)
        config = from_union([CunningConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody202_ReadDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(CunningConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody202_Read:
    devices: Optional[List[PostPeerconnectionsResponseBody202_ReadDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody202_ReadDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody202_Read':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody202_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return PostPeerconnectionsResponseBody202_Read(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody202_ReadDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class MagentaServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'MagentaServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return MagentaServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class MagentaConfig:
    services: Optional[List[MagentaServiceConfig]]

    def __init__(self, services: Optional[List[MagentaServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'MagentaConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(MagentaServiceConfig.from_dict, x), from_none], obj.get("services"))
        return MagentaConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(MagentaServiceConfig, x), x), from_none], self.services)
        return result


class GetPeerconnectionResponseBody200_Device:
    config: Optional[MagentaConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[MagentaConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200_Device':
        assert isinstance(obj, dict)
        config = from_union([MagentaConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionResponseBody200_Device(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(MagentaConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionResponseBody200:
    devices: Optional[List[GetPeerconnectionResponseBody200_Device]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[GetPeerconnectionResponseBody200_Device]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return GetPeerconnectionResponseBody200(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionResponseBody200_Device, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class FriskyServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'FriskyServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return FriskyServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class FriskyConfig:
    services: Optional[List[FriskyServiceConfig]]

    def __init__(self, services: Optional[List[FriskyServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'FriskyConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(FriskyServiceConfig.from_dict, x), from_none], obj.get("services"))
        return FriskyConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(FriskyServiceConfig, x), x), from_none], self.services)
        return result


class GetPeerconnectionResponseBody200_WriteDevice:
    config: Optional[FriskyConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[FriskyConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200_WriteDevice':
        assert isinstance(obj, dict)
        config = from_union([FriskyConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionResponseBody200_WriteDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(FriskyConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionResponseBody200_Write:
    devices: Optional[List[GetPeerconnectionResponseBody200_WriteDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[GetPeerconnectionResponseBody200_WriteDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200_Write':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionResponseBody200_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return GetPeerconnectionResponseBody200_Write(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionResponseBody200_WriteDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class MischievousServiceConfig:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'MischievousServiceConfig':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return MischievousServiceConfig(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.remote_service_id is not None:
            result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class MischievousConfig:
    services: Optional[List[MischievousServiceConfig]]

    def __init__(self, services: Optional[List[MischievousServiceConfig]]) -> None:
        self.services = services

    @staticmethod
    def from_dict(obj: Any) -> 'MischievousConfig':
        assert isinstance(obj, dict)
        services = from_union([lambda x: from_list(MischievousServiceConfig.from_dict, x), from_none], obj.get("services"))
        return MischievousConfig(services)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.services is not None:
            result["services"] = from_union([lambda x: from_list(lambda x: to_class(MischievousServiceConfig, x), x), from_none], self.services)
        return result


class GetPeerconnectionResponseBody200_ReadDevice:
    config: Optional[MischievousConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[MischievousConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200_ReadDevice':
        assert isinstance(obj, dict)
        config = from_union([MischievousConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionResponseBody200_ReadDevice(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: to_class(MischievousConfig, x), from_none], self.config)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionResponseBody200_Read:
    devices: Optional[List[GetPeerconnectionResponseBody200_ReadDevice]]
    """URL of the peerconnection"""
    url: Optional[str]
    """The status of the peerconnection."""
    status: Optional[PostPeerconnectionsRequestBodyStatus]

    def __init__(self, devices: Optional[List[GetPeerconnectionResponseBody200_ReadDevice]], url: Optional[str], status: Optional[PostPeerconnectionsRequestBodyStatus]) -> None:
        self.devices = devices
        self.url = url
        self.status = status

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200_Read':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionResponseBody200_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        status = from_union([PostPeerconnectionsRequestBodyStatus, from_none], obj.get("status"))
        return GetPeerconnectionResponseBody200_Read(devices, url, status)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionResponseBody200_ReadDevice, x), x), from_none], self.devices)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(PostPeerconnectionsRequestBodyStatus, x), from_none], self.status)
        return result


class GetExperimentsResponseBody200_Status(Enum):
    """Status of the experiment"""
    BOOKED = "booked"
    CREATED = "created"
    FINISHED = "finished"
    RUNNING = "running"
    SETUP = "setup"


class GetExperimentsResponseBody200_Element:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str]) -> None:
        self.status = status
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentsResponseBody200_Element':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetExperimentsResponseBody200_Element(status, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetExperimentsResponseBody200_WriteElement:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str]) -> None:
        self.status = status
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentsResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetExperimentsResponseBody200_WriteElement(status, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetExperimentsResponseBody200_ReadElement:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str]) -> None:
        self.status = status
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentsResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetExperimentsResponseBody200_ReadElement(status, url)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostExperimentsRequestBodyBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsRequestBodyBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsRequestBodyDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsRequestBodyDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsRequestBodyRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsRequestBodyRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PurpleParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return PurpleParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsRequestBodyServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[PurpleParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[PurpleParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(PurpleParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsRequestBodyServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(PurpleParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsRequestBody:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsRequestBodyBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsRequestBodyDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsRequestBodyRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsRequestBodyServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsRequestBodyBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsRequestBodyDevice]], roles: Optional[List[PostExperimentsRequestBodyRole]], service_configurations: Optional[List[PostExperimentsRequestBodyServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBody':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsRequestBodyBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsRequestBodyServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsRequestBody(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsRequestBodyBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsRequestBodyWriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyWriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsRequestBodyWriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsRequestBodyWriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyWriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsRequestBodyWriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsRequestBodyWriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyWriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsRequestBodyWriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class FluffyParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return FluffyParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsRequestBodyWriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[FluffyParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[FluffyParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyWriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(FluffyParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsRequestBodyWriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(FluffyParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsRequestBodyWrite:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsRequestBodyWriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsRequestBodyWriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsRequestBodyWriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsRequestBodyWriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsRequestBodyWriteBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsRequestBodyWriteDevice]], roles: Optional[List[PostExperimentsRequestBodyWriteRole]], service_configurations: Optional[List[PostExperimentsRequestBodyWriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyWrite':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsRequestBodyWriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsRequestBodyWriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsRequestBodyWriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsRequestBodyWriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsRequestBodyWrite(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsRequestBodyWriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyWriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyWriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyWriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsRequestBodyReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsRequestBodyReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsRequestBodyReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsRequestBodyReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsRequestBodyReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsRequestBodyReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class TentacledParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'TentacledParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return TentacledParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsRequestBodyReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[TentacledParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[TentacledParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(TentacledParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsRequestBodyReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(TentacledParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsRequestBodyRead:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsRequestBodyReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsRequestBodyReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsRequestBodyReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsRequestBodyReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsRequestBodyReadBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsRequestBodyReadDevice]], roles: Optional[List[PostExperimentsRequestBodyReadRole]], service_configurations: Optional[List[PostExperimentsRequestBodyReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsRequestBodyRead':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsRequestBodyReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsRequestBodyReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsRequestBodyReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsRequestBodyReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsRequestBodyRead(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsRequestBodyReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsResponseBody201_BookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_BookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsResponseBody201_BookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody201_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_Device':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsResponseBody201_Device(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsResponseBody201_Role:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_Role':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsResponseBody201_Role(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class StickyParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'StickyParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return StickyParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsResponseBody201_ServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[StickyParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[StickyParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(StickyParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody201_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(StickyParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody201:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsResponseBody201_BookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsResponseBody201_Device]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsResponseBody201_Role]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsResponseBody201_ServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody201_BookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody201_Device]], roles: Optional[List[PostExperimentsResponseBody201_Role]], service_configurations: Optional[List[PostExperimentsResponseBody201_ServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody201_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody201_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody201_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody201_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody201(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody201_BookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_Device, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_Role, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_ServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsResponseBody201_WriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_WriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsResponseBody201_WriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody201_WriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_WriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsResponseBody201_WriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsResponseBody201_WriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_WriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsResponseBody201_WriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class IndigoParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'IndigoParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return IndigoParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsResponseBody201_WriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[IndigoParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[IndigoParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_WriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(IndigoParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody201_WriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(IndigoParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody201_Write:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsResponseBody201_WriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsResponseBody201_WriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsResponseBody201_WriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsResponseBody201_WriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody201_WriteBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody201_WriteDevice]], roles: Optional[List[PostExperimentsResponseBody201_WriteRole]], service_configurations: Optional[List[PostExperimentsResponseBody201_WriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_Write':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody201_WriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody201_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody201_WriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody201_WriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody201_Write(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody201_WriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_WriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_WriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_WriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsResponseBody201_ReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_ReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsResponseBody201_ReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody201_ReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_ReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsResponseBody201_ReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsResponseBody201_ReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_ReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsResponseBody201_ReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class IndecentParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'IndecentParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return IndecentParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsResponseBody201_ReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[IndecentParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[IndecentParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_ReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(IndecentParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody201_ReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(IndecentParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody201_Read:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsResponseBody201_ReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsResponseBody201_ReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsResponseBody201_ReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsResponseBody201_ReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody201_ReadBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody201_ReadDevice]], roles: Optional[List[PostExperimentsResponseBody201_ReadRole]], service_configurations: Optional[List[PostExperimentsResponseBody201_ReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_Read':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody201_ReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody201_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody201_ReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody201_ReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody201_Read(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody201_ReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_ReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_ReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_ReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsResponseBody202_BookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_BookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsResponseBody202_BookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody202_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_Device':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsResponseBody202_Device(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsResponseBody202_Role:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_Role':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsResponseBody202_Role(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class HilariousParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'HilariousParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return HilariousParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsResponseBody202_ServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[HilariousParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[HilariousParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(HilariousParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody202_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(HilariousParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody202:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsResponseBody202_BookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsResponseBody202_Device]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsResponseBody202_Role]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsResponseBody202_ServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody202_BookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody202_Device]], roles: Optional[List[PostExperimentsResponseBody202_Role]], service_configurations: Optional[List[PostExperimentsResponseBody202_ServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody202_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody202_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody202_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody202_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody202(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody202_BookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_Device, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_Role, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_ServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsResponseBody202_WriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_WriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsResponseBody202_WriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody202_WriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_WriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsResponseBody202_WriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsResponseBody202_WriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_WriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsResponseBody202_WriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class AmbitiousParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'AmbitiousParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return AmbitiousParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsResponseBody202_WriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[AmbitiousParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[AmbitiousParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_WriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(AmbitiousParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody202_WriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(AmbitiousParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody202_Write:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsResponseBody202_WriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsResponseBody202_WriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsResponseBody202_WriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsResponseBody202_WriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody202_WriteBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody202_WriteDevice]], roles: Optional[List[PostExperimentsResponseBody202_WriteRole]], service_configurations: Optional[List[PostExperimentsResponseBody202_WriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_Write':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody202_WriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody202_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody202_WriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody202_WriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody202_Write(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody202_WriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_WriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_WriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_WriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PostExperimentsResponseBody202_ReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_ReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PostExperimentsResponseBody202_ReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody202_ReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_ReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PostExperimentsResponseBody202_ReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PostExperimentsResponseBody202_ReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_ReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostExperimentsResponseBody202_ReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class CunningParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'CunningParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return CunningParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PostExperimentsResponseBody202_ReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[CunningParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[CunningParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_ReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(CunningParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody202_ReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(CunningParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody202_Read:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PostExperimentsResponseBody202_ReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PostExperimentsResponseBody202_ReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PostExperimentsResponseBody202_ReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PostExperimentsResponseBody202_ReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody202_ReadBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody202_ReadDevice]], roles: Optional[List[PostExperimentsResponseBody202_ReadRole]], service_configurations: Optional[List[PostExperimentsResponseBody202_ReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody202_Read':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody202_ReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody202_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody202_ReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody202_ReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody202_Read(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody202_ReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_ReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_ReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody202_ReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class GetExperimentResponseBody200_BookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_BookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return GetExperimentResponseBody200_BookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class GetExperimentResponseBody200_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_Device':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return GetExperimentResponseBody200_Device(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class GetExperimentResponseBody200_Role:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_Role':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetExperimentResponseBody200_Role(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class MagentaParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'MagentaParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return MagentaParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class GetExperimentResponseBody200_ServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[MagentaParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[MagentaParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(MagentaParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return GetExperimentResponseBody200_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(MagentaParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class GetExperimentResponseBody200:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[GetExperimentResponseBody200_BookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[GetExperimentResponseBody200_Device]]
    """Roles that are used in this experiment"""
    roles: Optional[List[GetExperimentResponseBody200_Role]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[GetExperimentResponseBody200_ServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[GetExperimentResponseBody200_BookingTime], connections: Optional[List[str]], devices: Optional[List[GetExperimentResponseBody200_Device]], roles: Optional[List[GetExperimentResponseBody200_Role]], service_configurations: Optional[List[GetExperimentResponseBody200_ServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([GetExperimentResponseBody200_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(GetExperimentResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(GetExperimentResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(GetExperimentResponseBody200_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return GetExperimentResponseBody200(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(GetExperimentResponseBody200_BookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_Device, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_Role, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_ServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class GetExperimentResponseBody200_WriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_WriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return GetExperimentResponseBody200_WriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class GetExperimentResponseBody200_WriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_WriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return GetExperimentResponseBody200_WriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class GetExperimentResponseBody200_WriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetExperimentResponseBody200_WriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class FriskyParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'FriskyParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return FriskyParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class GetExperimentResponseBody200_WriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[FriskyParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[FriskyParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_WriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(FriskyParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return GetExperimentResponseBody200_WriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(FriskyParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class GetExperimentResponseBody200_Write:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[GetExperimentResponseBody200_WriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[GetExperimentResponseBody200_WriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[GetExperimentResponseBody200_WriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[GetExperimentResponseBody200_WriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[GetExperimentResponseBody200_WriteBookingTime], connections: Optional[List[str]], devices: Optional[List[GetExperimentResponseBody200_WriteDevice]], roles: Optional[List[GetExperimentResponseBody200_WriteRole]], service_configurations: Optional[List[GetExperimentResponseBody200_WriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_Write':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([GetExperimentResponseBody200_WriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(GetExperimentResponseBody200_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(GetExperimentResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(GetExperimentResponseBody200_WriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return GetExperimentResponseBody200_Write(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(GetExperimentResponseBody200_WriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_WriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_WriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class GetExperimentResponseBody200_ReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_ReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return GetExperimentResponseBody200_ReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class GetExperimentResponseBody200_ReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_ReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return GetExperimentResponseBody200_ReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class GetExperimentResponseBody200_ReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetExperimentResponseBody200_ReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class MischievousParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'MischievousParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return MischievousParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class GetExperimentResponseBody200_ReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[MischievousParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[MischievousParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_ReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(MischievousParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return GetExperimentResponseBody200_ReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(MischievousParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class GetExperimentResponseBody200_Read:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[GetExperimentResponseBody200_ReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[GetExperimentResponseBody200_ReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[GetExperimentResponseBody200_ReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[GetExperimentResponseBody200_ReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[GetExperimentResponseBody200_ReadBookingTime], connections: Optional[List[str]], devices: Optional[List[GetExperimentResponseBody200_ReadDevice]], roles: Optional[List[GetExperimentResponseBody200_ReadRole]], service_configurations: Optional[List[GetExperimentResponseBody200_ReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_Read':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([GetExperimentResponseBody200_ReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(GetExperimentResponseBody200_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(GetExperimentResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(GetExperimentResponseBody200_ReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return GetExperimentResponseBody200_Read(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(GetExperimentResponseBody200_ReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_ReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_ReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentRequestBodyBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentRequestBodyBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentRequestBodyDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentRequestBodyDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentRequestBodyRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentRequestBodyRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class BraggadociousParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'BraggadociousParticipant':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return BraggadociousParticipant(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentRequestBodyServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[BraggadociousParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[BraggadociousParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(BraggadociousParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentRequestBodyServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(BraggadociousParticipant, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentRequestBody:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentRequestBodyBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentRequestBodyDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentRequestBodyRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentRequestBodyServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentRequestBodyBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentRequestBodyDevice]], roles: Optional[List[PatchExperimentRequestBodyRole]], service_configurations: Optional[List[PatchExperimentRequestBodyServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBody':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentRequestBodyBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentRequestBodyServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentRequestBody(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentRequestBodyBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentRequestBodyWriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyWriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentRequestBodyWriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentRequestBodyWriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyWriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentRequestBodyWriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentRequestBodyWriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyWriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentRequestBodyWriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant1:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant1':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant1(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentRequestBodyWriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant1]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant1]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyWriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant1.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentRequestBodyWriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant1, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentRequestBodyWrite:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentRequestBodyWriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentRequestBodyWriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentRequestBodyWriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentRequestBodyWriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentRequestBodyWriteBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentRequestBodyWriteDevice]], roles: Optional[List[PatchExperimentRequestBodyWriteRole]], service_configurations: Optional[List[PatchExperimentRequestBodyWriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyWrite':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentRequestBodyWriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentRequestBodyWriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentRequestBodyWriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentRequestBodyWriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentRequestBodyWrite(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentRequestBodyWriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyWriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyWriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyWriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentRequestBodyReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentRequestBodyReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentRequestBodyReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentRequestBodyReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentRequestBodyReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentRequestBodyReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant2:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant2':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant2(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentRequestBodyReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant2]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant2]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant2.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentRequestBodyReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant2, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentRequestBodyRead:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentRequestBodyReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentRequestBodyReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentRequestBodyReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentRequestBodyReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentRequestBodyReadBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentRequestBodyReadDevice]], roles: Optional[List[PatchExperimentRequestBodyReadRole]], service_configurations: Optional[List[PatchExperimentRequestBodyReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyRead':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentRequestBodyReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentRequestBodyReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentRequestBodyReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentRequestBodyReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentRequestBodyRead(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentRequestBodyReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentResponseBody200_BookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_BookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentResponseBody200_BookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody200_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_Device':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentResponseBody200_Device(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentResponseBody200_Role:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_Role':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentResponseBody200_Role(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant3:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant3':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant3(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentResponseBody200_ServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant3]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant3]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant3.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody200_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant3, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody200:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentResponseBody200_BookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentResponseBody200_Device]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentResponseBody200_Role]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentResponseBody200_ServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody200_BookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody200_Device]], roles: Optional[List[PatchExperimentResponseBody200_Role]], service_configurations: Optional[List[PatchExperimentResponseBody200_ServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody200_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody200_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody200(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody200_BookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_Device, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_Role, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_ServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentResponseBody200_WriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_WriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentResponseBody200_WriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody200_WriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_WriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentResponseBody200_WriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentResponseBody200_WriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_WriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentResponseBody200_WriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant4:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant4':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant4(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentResponseBody200_WriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant4]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant4]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_WriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant4.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody200_WriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant4, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody200_Write:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentResponseBody200_WriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentResponseBody200_WriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentResponseBody200_WriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentResponseBody200_WriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody200_WriteBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody200_WriteDevice]], roles: Optional[List[PatchExperimentResponseBody200_WriteRole]], service_configurations: Optional[List[PatchExperimentResponseBody200_WriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_Write':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody200_WriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody200_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody200_WriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody200_WriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody200_Write(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody200_WriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_WriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_WriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_WriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentResponseBody200_ReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_ReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentResponseBody200_ReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody200_ReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_ReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentResponseBody200_ReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentResponseBody200_ReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_ReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentResponseBody200_ReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant5:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant5':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant5(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentResponseBody200_ReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant5]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant5]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_ReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant5.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody200_ReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant5, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody200_Read:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentResponseBody200_ReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentResponseBody200_ReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentResponseBody200_ReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentResponseBody200_ReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody200_ReadBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody200_ReadDevice]], roles: Optional[List[PatchExperimentResponseBody200_ReadRole]], service_configurations: Optional[List[PatchExperimentResponseBody200_ReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_Read':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody200_ReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody200_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody200_ReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody200_ReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody200_Read(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody200_ReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_ReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_ReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_ReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentResponseBody202_BookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_BookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentResponseBody202_BookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody202_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_Device':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentResponseBody202_Device(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentResponseBody202_Role:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_Role':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentResponseBody202_Role(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant6:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant6':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant6(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentResponseBody202_ServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant6]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant6]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant6.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody202_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant6, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody202:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentResponseBody202_BookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentResponseBody202_Device]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentResponseBody202_Role]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentResponseBody202_ServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody202_BookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody202_Device]], roles: Optional[List[PatchExperimentResponseBody202_Role]], service_configurations: Optional[List[PatchExperimentResponseBody202_ServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody202_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody202_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody202_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody202_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody202(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody202_BookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_Device, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_Role, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_ServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentResponseBody202_WriteBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_WriteBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentResponseBody202_WriteBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody202_WriteDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_WriteDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentResponseBody202_WriteDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentResponseBody202_WriteRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_WriteRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentResponseBody202_WriteRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant7:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant7':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant7(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentResponseBody202_WriteServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant7]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant7]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_WriteServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant7.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody202_WriteServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant7, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody202_Write:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentResponseBody202_WriteBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentResponseBody202_WriteDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentResponseBody202_WriteRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentResponseBody202_WriteServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody202_WriteBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody202_WriteDevice]], roles: Optional[List[PatchExperimentResponseBody202_WriteRole]], service_configurations: Optional[List[PatchExperimentResponseBody202_WriteServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_Write':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody202_WriteBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody202_WriteDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody202_WriteRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody202_WriteServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody202_Write(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody202_WriteBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_WriteDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_WriteRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_WriteServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class PatchExperimentResponseBody202_ReadBookingTime:
    end_time: Optional[datetime]
    start_time: Optional[datetime]

    def __init__(self, end_time: Optional[datetime], start_time: Optional[datetime]) -> None:
        self.end_time = end_time
        self.start_time = start_time

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_ReadBookingTime':
        assert isinstance(obj, dict)
        end_time = from_union([from_datetime, from_none], obj.get("endTime"))
        start_time = from_union([from_datetime, from_none], obj.get("startTime"))
        return PatchExperimentResponseBody202_ReadBookingTime(end_time, start_time)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.end_time is not None:
            result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        if self.start_time is not None:
            result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody202_ReadDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """The name of the device's role."""
    role: Optional[str]

    def __init__(self, device: Optional[str], role: Optional[str]) -> None:
        self.device = device
        self.role = role

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_ReadDevice':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("device"))
        role = from_union([from_str, from_none], obj.get("role"))
        return PatchExperimentResponseBody202_ReadDevice(device, role)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.device is not None:
            result["device"] = from_union([from_str, from_none], self.device)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        return result


class PatchExperimentResponseBody202_ReadRole:
    description: Optional[str]
    """Name for an experiment role."""
    name: Optional[str]

    def __init__(self, description: Optional[str], name: Optional[str]) -> None:
        self.description = description
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_ReadRole':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchExperimentResponseBody202_ReadRole(description, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.description is not None:
            result["description"] = from_union([from_str, from_none], self.description)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class Participant8:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """The name of the participant's role."""
    role: Optional[str]
    service_id: Optional[str]

    def __init__(self, config: Optional[Dict[str, Any]], role: Optional[str], service_id: Optional[str]) -> None:
        self.config = config
        self.role = role
        self.service_id = service_id

    @staticmethod
    def from_dict(obj: Any) -> 'Participant8':
        assert isinstance(obj, dict)
        config = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("config"))
        role = from_union([from_str, from_none], obj.get("role"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        return Participant8(config, role, service_id)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.config is not None:
            result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        if self.role is not None:
            result["role"] = from_union([from_str, from_none], self.role)
        if self.service_id is not None:
            result["serviceId"] = from_union([from_str, from_none], self.service_id)
        return result


class PatchExperimentResponseBody202_ReadServiceConfiguration:
    """Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    configuration: Optional[Dict[str, Any]]
    """List of participants for the service"""
    participants: Optional[List[Participant8]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[Participant8]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_ReadServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(Participant8.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody202_ReadServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.configuration is not None:
            result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        if self.participants is not None:
            result["participants"] = from_union([lambda x: from_list(lambda x: to_class(Participant8, x), x), from_none], self.participants)
        if self.service_type is not None:
            result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody202_Read:
    """Status of the experiment"""
    status: Optional[GetExperimentsResponseBody200_Status]
    """URL of the experiment"""
    url: Optional[str]
    booking_time: Optional[PatchExperimentResponseBody202_ReadBookingTime]
    """Connections associated with the experiment"""
    connections: Optional[List[str]]
    """Devices associated with the experiment"""
    devices: Optional[List[PatchExperimentResponseBody202_ReadDevice]]
    """Roles that are used in this experiment"""
    roles: Optional[List[PatchExperimentResponseBody202_ReadRole]]
    """Services associated with the experiment"""
    service_configurations: Optional[List[PatchExperimentResponseBody202_ReadServiceConfiguration]]

    def __init__(self, status: Optional[GetExperimentsResponseBody200_Status], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody202_ReadBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody202_ReadDevice]], roles: Optional[List[PatchExperimentResponseBody202_ReadRole]], service_configurations: Optional[List[PatchExperimentResponseBody202_ReadServiceConfiguration]]) -> None:
        self.status = status
        self.url = url
        self.booking_time = booking_time
        self.connections = connections
        self.devices = devices
        self.roles = roles
        self.service_configurations = service_configurations

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody202_Read':
        assert isinstance(obj, dict)
        status = from_union([GetExperimentsResponseBody200_Status, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody202_ReadBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody202_ReadDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody202_ReadRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody202_ReadServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody202_Read(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.status is not None:
            result["status"] = from_union([lambda x: to_enum(GetExperimentsResponseBody200_Status, x), from_none], self.status)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        if self.booking_time is not None:
            result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody202_ReadBookingTime, x), from_none], self.booking_time)
        if self.connections is not None:
            result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        if self.devices is not None:
            result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_ReadDevice, x), x), from_none], self.devices)
        if self.roles is not None:
            result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_ReadRole, x), x), from_none], self.roles)
        if self.service_configurations is not None:
            result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody202_ReadServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


class GetInstitutionsResponseBody200_Element:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetInstitutionsResponseBody200_Element':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetInstitutionsResponseBody200_Element(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class GetInstitutionsResponseBody200_WriteElement:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetInstitutionsResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetInstitutionsResponseBody200_WriteElement(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class GetInstitutionsResponseBody200_ReadElement:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetInstitutionsResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetInstitutionsResponseBody200_ReadElement(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PostInstitutionsRequestBody:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostInstitutionsRequestBody':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostInstitutionsRequestBody(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PostInstitutionsRequestBodyWrite:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostInstitutionsRequestBodyWrite':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostInstitutionsRequestBodyWrite(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PostInstitutionsRequestBodyRead:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostInstitutionsRequestBodyRead':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostInstitutionsRequestBodyRead(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PostInstitutionsResponseBody201:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostInstitutionsResponseBody201':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostInstitutionsResponseBody201(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PostInstitutionsResponseBody201_Write:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostInstitutionsResponseBody201_Write':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostInstitutionsResponseBody201_Write(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PostInstitutionsResponseBody201_Read:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PostInstitutionsResponseBody201_Read':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PostInstitutionsResponseBody201_Read(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class GetInstitutionResponseBody200:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetInstitutionResponseBody200':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetInstitutionResponseBody200(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class GetInstitutionResponseBody200_Write:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetInstitutionResponseBody200_Write':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetInstitutionResponseBody200_Write(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class GetInstitutionResponseBody200_Read:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'GetInstitutionResponseBody200_Read':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return GetInstitutionResponseBody200_Read(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PatchInstitutionRequestBody:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchInstitutionRequestBody':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchInstitutionRequestBody(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PatchInstitutionRequestBodyWrite:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchInstitutionRequestBodyWrite':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchInstitutionRequestBodyWrite(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PatchInstitutionRequestBodyRead:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchInstitutionRequestBodyRead':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchInstitutionRequestBodyRead(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PatchInstitutionResponseBody200:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchInstitutionResponseBody200':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchInstitutionResponseBody200(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PatchInstitutionResponseBody200_Write:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchInstitutionResponseBody200_Write':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchInstitutionResponseBody200_Write(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class PatchInstitutionResponseBody200_Read:
    api: Optional[str]
    api_token: Optional[str]
    federated_api: Optional[str]
    homepage: Optional[str]
    name: Optional[str]

    def __init__(self, api: Optional[str], api_token: Optional[str], federated_api: Optional[str], homepage: Optional[str], name: Optional[str]) -> None:
        self.api = api
        self.api_token = api_token
        self.federated_api = federated_api
        self.homepage = homepage
        self.name = name

    @staticmethod
    def from_dict(obj: Any) -> 'PatchInstitutionResponseBody200_Read':
        assert isinstance(obj, dict)
        api = from_union([from_str, from_none], obj.get("api"))
        api_token = from_union([from_str, from_none], obj.get("apiToken"))
        federated_api = from_union([from_str, from_none], obj.get("federatedApi"))
        homepage = from_union([from_str, from_none], obj.get("homepage"))
        name = from_union([from_str, from_none], obj.get("name"))
        return PatchInstitutionResponseBody200_Read(api, api_token, federated_api, homepage, name)

    def to_dict(self) -> dict:
        result: dict = {}
        if self.api is not None:
            result["api"] = from_union([from_str, from_none], self.api)
        if self.api_token is not None:
            result["apiToken"] = from_union([from_str, from_none], self.api_token)
        if self.federated_api is not None:
            result["federatedApi"] = from_union([from_str, from_none], self.federated_api)
        if self.homepage is not None:
            result["homepage"] = from_union([from_str, from_none], self.homepage)
        if self.name is not None:
            result["name"] = from_union([from_str, from_none], self.name)
        return result


class GetUpdatesResponseBody200_Element:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'GetUpdatesResponseBody200_Element':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return GetUpdatesResponseBody200_Element(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class GetUpdatesResponseBody200_WriteElement:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'GetUpdatesResponseBody200_WriteElement':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return GetUpdatesResponseBody200_WriteElement(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class GetUpdatesResponseBody200_ReadElement:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'GetUpdatesResponseBody200_ReadElement':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return GetUpdatesResponseBody200_ReadElement(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PostUpdatesRequestBody:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PostUpdatesRequestBody':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PostUpdatesRequestBody(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PostUpdatesRequestBodyWrite:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PostUpdatesRequestBodyWrite':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PostUpdatesRequestBodyWrite(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PostUpdatesRequestBodyRead:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PostUpdatesRequestBodyRead':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PostUpdatesRequestBodyRead(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PostUpdatesResponseBody201:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PostUpdatesResponseBody201':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PostUpdatesResponseBody201(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PostUpdatesResponseBody201_Write:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PostUpdatesResponseBody201_Write':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PostUpdatesResponseBody201_Write(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PostUpdatesResponseBody201_Read:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PostUpdatesResponseBody201_Read':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PostUpdatesResponseBody201_Read(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PatchUpdateRequestBody:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUpdateRequestBody':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PatchUpdateRequestBody(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PatchUpdateRequestBodyWrite:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUpdateRequestBodyWrite':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PatchUpdateRequestBodyWrite(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PatchUpdateRequestBodyRead:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUpdateRequestBodyRead':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PatchUpdateRequestBodyRead(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PatchUpdateResponseBody200:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUpdateResponseBody200':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PatchUpdateResponseBody200(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PatchUpdateResponseBody200_Write:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUpdateResponseBody200_Write':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PatchUpdateResponseBody200_Write(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


class PatchUpdateResponseBody200_Read:
    """Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    """
    device_id: str
    latest_version: str
    latest_version_link: str

    def __init__(self, device_id: str, latest_version: str, latest_version_link: str) -> None:
        self.device_id = device_id
        self.latest_version = latest_version
        self.latest_version_link = latest_version_link

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUpdateResponseBody200_Read':
        assert isinstance(obj, dict)
        device_id = from_str(obj.get("device_id"))
        latest_version = from_str(obj.get("latest_version"))
        latest_version_link = from_str(obj.get("latest_version_link"))
        return PatchUpdateResponseBody200_Read(device_id, latest_version, latest_version_link)

    def to_dict(self) -> dict:
        result: dict = {}
        result["device_id"] = from_str(self.device_id)
        result["latest_version"] = from_str(self.latest_version)
        result["latest_version_link"] = from_str(self.latest_version_link)
        return result


def post_login_request_body_from_dict(s: Any) -> PostLoginRequestBody:
    return PostLoginRequestBody.from_dict(s)


def post_login_request_body_to_dict(x: PostLoginRequestBody) -> Any:
    return to_class(PostLoginRequestBody, x)


def post_login_request_body_write_from_dict(s: Any) -> PostLoginRequestBodyWrite:
    return PostLoginRequestBodyWrite.from_dict(s)


def post_login_request_body_write_to_dict(x: PostLoginRequestBodyWrite) -> Any:
    return to_class(PostLoginRequestBodyWrite, x)


def post_login_request_body_read_from_dict(s: Any) -> PostLoginRequestBodyRead:
    return PostLoginRequestBodyRead.from_dict(s)


def post_login_request_body_read_to_dict(x: PostLoginRequestBodyRead) -> Any:
    return to_class(PostLoginRequestBodyRead, x)


def post_login_response_body201_from_dict(s: Any) -> str:
    return from_str(s)


def post_login_response_body201_to_dict(x: str) -> Any:
    return from_str(x)


def post_login_response_body201_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_login_response_body201_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_login_response_body201_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_login_response_body201_read_to_dict(x: str) -> Any:
    return from_str(x)


def post_logout_request_body_from_dict(s: Any) -> PostLogoutRequestBody:
    return PostLogoutRequestBody.from_dict(s)


def post_logout_request_body_to_dict(x: PostLogoutRequestBody) -> Any:
    return to_class(PostLogoutRequestBody, x)


def post_logout_request_body_write_from_dict(s: Any) -> PostLogoutRequestBodyWrite:
    return PostLogoutRequestBodyWrite.from_dict(s)


def post_logout_request_body_write_to_dict(x: PostLogoutRequestBodyWrite) -> Any:
    return to_class(PostLogoutRequestBodyWrite, x)


def post_logout_request_body_read_from_dict(s: Any) -> PostLogoutRequestBodyRead:
    return PostLogoutRequestBodyRead.from_dict(s)


def post_logout_request_body_read_to_dict(x: PostLogoutRequestBodyRead) -> Any:
    return to_class(PostLogoutRequestBodyRead, x)


def post_device_authentication_token_response_body201_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_authentication_token_response_body201_to_dict(x: str) -> Any:
    return from_str(x)


def post_device_authentication_token_response_body201_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_authentication_token_response_body201_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_device_authentication_token_response_body201_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_authentication_token_response_body201_read_to_dict(x: str) -> Any:
    return from_str(x)


def get_users_response_body200_from_dict(s: Any) -> List[GetUsersResponseBody200_Element]:
    return from_list(GetUsersResponseBody200_Element.from_dict, s)


def get_users_response_body200_to_dict(x: List[GetUsersResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetUsersResponseBody200_Element, x), x)


def get_users_response_body200_write_from_dict(s: Any) -> List[GetUsersResponseBody200_WriteElement]:
    return from_list(GetUsersResponseBody200_WriteElement.from_dict, s)


def get_users_response_body200_write_to_dict(x: List[GetUsersResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetUsersResponseBody200_WriteElement, x), x)


def get_users_response_body200_read_from_dict(s: Any) -> List[GetUsersResponseBody200_ReadElement]:
    return from_list(GetUsersResponseBody200_ReadElement.from_dict, s)


def get_users_response_body200_read_to_dict(x: List[GetUsersResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetUsersResponseBody200_ReadElement, x), x)


def post_users_request_body_from_dict(s: Any) -> PostUsersRequestBody:
    return PostUsersRequestBody.from_dict(s)


def post_users_request_body_to_dict(x: PostUsersRequestBody) -> Any:
    return to_class(PostUsersRequestBody, x)


def post_users_request_body_write_from_dict(s: Any) -> PostUsersRequestBodyWrite:
    return PostUsersRequestBodyWrite.from_dict(s)


def post_users_request_body_write_to_dict(x: PostUsersRequestBodyWrite) -> Any:
    return to_class(PostUsersRequestBodyWrite, x)


def post_users_request_body_read_from_dict(s: Any) -> PostUsersRequestBodyRead:
    return PostUsersRequestBodyRead.from_dict(s)


def post_users_request_body_read_to_dict(x: PostUsersRequestBodyRead) -> Any:
    return to_class(PostUsersRequestBodyRead, x)


def post_users_response_body201_from_dict(s: Any) -> PostUsersResponseBody201:
    return PostUsersResponseBody201.from_dict(s)


def post_users_response_body201_to_dict(x: PostUsersResponseBody201) -> Any:
    return to_class(PostUsersResponseBody201, x)


def post_users_response_body201_write_from_dict(s: Any) -> PostUsersResponseBody201_Write:
    return PostUsersResponseBody201_Write.from_dict(s)


def post_users_response_body201_write_to_dict(x: PostUsersResponseBody201_Write) -> Any:
    return to_class(PostUsersResponseBody201_Write, x)


def post_users_response_body201_read_from_dict(s: Any) -> PostUsersResponseBody201_Read:
    return PostUsersResponseBody201_Read.from_dict(s)


def post_users_response_body201_read_to_dict(x: PostUsersResponseBody201_Read) -> Any:
    return to_class(PostUsersResponseBody201_Read, x)


def get_user_response_body200_from_dict(s: Any) -> GetUserResponseBody200:
    return GetUserResponseBody200.from_dict(s)


def get_user_response_body200_to_dict(x: GetUserResponseBody200) -> Any:
    return to_class(GetUserResponseBody200, x)


def get_user_response_body200_write_from_dict(s: Any) -> GetUserResponseBody200_Write:
    return GetUserResponseBody200_Write.from_dict(s)


def get_user_response_body200_write_to_dict(x: GetUserResponseBody200_Write) -> Any:
    return to_class(GetUserResponseBody200_Write, x)


def get_user_response_body200_read_from_dict(s: Any) -> GetUserResponseBody200_Read:
    return GetUserResponseBody200_Read.from_dict(s)


def get_user_response_body200_read_to_dict(x: GetUserResponseBody200_Read) -> Any:
    return to_class(GetUserResponseBody200_Read, x)


def patch_user_request_body_from_dict(s: Any) -> PatchUserRequestBody:
    return PatchUserRequestBody.from_dict(s)


def patch_user_request_body_to_dict(x: PatchUserRequestBody) -> Any:
    return to_class(PatchUserRequestBody, x)


def patch_user_request_body_write_from_dict(s: Any) -> PatchUserRequestBodyWrite:
    return PatchUserRequestBodyWrite.from_dict(s)


def patch_user_request_body_write_to_dict(x: PatchUserRequestBodyWrite) -> Any:
    return to_class(PatchUserRequestBodyWrite, x)


def patch_user_request_body_read_from_dict(s: Any) -> PatchUserRequestBodyRead:
    return PatchUserRequestBodyRead.from_dict(s)


def patch_user_request_body_read_to_dict(x: PatchUserRequestBodyRead) -> Any:
    return to_class(PatchUserRequestBodyRead, x)


def patch_user_response_body200_from_dict(s: Any) -> PatchUserResponseBody200:
    return PatchUserResponseBody200.from_dict(s)


def patch_user_response_body200_to_dict(x: PatchUserResponseBody200) -> Any:
    return to_class(PatchUserResponseBody200, x)


def patch_user_response_body200_write_from_dict(s: Any) -> PatchUserResponseBody200_Write:
    return PatchUserResponseBody200_Write.from_dict(s)


def patch_user_response_body200_write_to_dict(x: PatchUserResponseBody200_Write) -> Any:
    return to_class(PatchUserResponseBody200_Write, x)


def patch_user_response_body200_read_from_dict(s: Any) -> PatchUserResponseBody200_Read:
    return PatchUserResponseBody200_Read.from_dict(s)


def patch_user_response_body200_read_to_dict(x: PatchUserResponseBody200_Read) -> Any:
    return to_class(PatchUserResponseBody200_Read, x)


def get_user_roles_response_body200_from_dict(s: Any) -> List[GetUserRolesResponseBody200_Element]:
    return from_list(GetUserRolesResponseBody200_Element.from_dict, s)


def get_user_roles_response_body200_to_dict(x: List[GetUserRolesResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetUserRolesResponseBody200_Element, x), x)


def get_user_roles_response_body200_write_from_dict(s: Any) -> List[GetUserRolesResponseBody200_WriteElement]:
    return from_list(GetUserRolesResponseBody200_WriteElement.from_dict, s)


def get_user_roles_response_body200_write_to_dict(x: List[GetUserRolesResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetUserRolesResponseBody200_WriteElement, x), x)


def get_user_roles_response_body200_read_from_dict(s: Any) -> List[GetUserRolesResponseBody200_ReadElement]:
    return from_list(GetUserRolesResponseBody200_ReadElement.from_dict, s)


def get_user_roles_response_body200_read_to_dict(x: List[GetUserRolesResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetUserRolesResponseBody200_ReadElement, x), x)


def post_user_roles_request_body_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def post_user_roles_request_body_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def post_user_roles_request_body_write_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def post_user_roles_request_body_write_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def post_user_roles_request_body_read_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def post_user_roles_request_body_read_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def delete_user_roles_request_body_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def delete_user_roles_request_body_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def delete_user_roles_request_body_write_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def delete_user_roles_request_body_write_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def delete_user_roles_request_body_read_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def delete_user_roles_request_body_read_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def get_roles_response_body200_from_dict(s: Any) -> List[GetRolesResponseBody200_Element]:
    return from_list(GetRolesResponseBody200_Element.from_dict, s)


def get_roles_response_body200_to_dict(x: List[GetRolesResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetRolesResponseBody200_Element, x), x)


def get_roles_response_body200_write_from_dict(s: Any) -> List[GetRolesResponseBody200_WriteElement]:
    return from_list(GetRolesResponseBody200_WriteElement.from_dict, s)


def get_roles_response_body200_write_to_dict(x: List[GetRolesResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetRolesResponseBody200_WriteElement, x), x)


def get_roles_response_body200_read_from_dict(s: Any) -> List[GetRolesResponseBody200_ReadElement]:
    return from_list(GetRolesResponseBody200_ReadElement.from_dict, s)


def get_roles_response_body200_read_to_dict(x: List[GetRolesResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetRolesResponseBody200_ReadElement, x), x)


def post_roles_request_body_from_dict(s: Any) -> PostRolesRequestBody:
    return PostRolesRequestBody.from_dict(s)


def post_roles_request_body_to_dict(x: PostRolesRequestBody) -> Any:
    return to_class(PostRolesRequestBody, x)


def post_roles_request_body_write_from_dict(s: Any) -> PostRolesRequestBodyWrite:
    return PostRolesRequestBodyWrite.from_dict(s)


def post_roles_request_body_write_to_dict(x: PostRolesRequestBodyWrite) -> Any:
    return to_class(PostRolesRequestBodyWrite, x)


def post_roles_request_body_read_from_dict(s: Any) -> PostRolesRequestBodyRead:
    return PostRolesRequestBodyRead.from_dict(s)


def post_roles_request_body_read_to_dict(x: PostRolesRequestBodyRead) -> Any:
    return to_class(PostRolesRequestBodyRead, x)


def post_roles_response_body201_from_dict(s: Any) -> PostRolesResponseBody201:
    return PostRolesResponseBody201.from_dict(s)


def post_roles_response_body201_to_dict(x: PostRolesResponseBody201) -> Any:
    return to_class(PostRolesResponseBody201, x)


def post_roles_response_body201_write_from_dict(s: Any) -> PostRolesResponseBody201_Write:
    return PostRolesResponseBody201_Write.from_dict(s)


def post_roles_response_body201_write_to_dict(x: PostRolesResponseBody201_Write) -> Any:
    return to_class(PostRolesResponseBody201_Write, x)


def post_roles_response_body201_read_from_dict(s: Any) -> PostRolesResponseBody201_Read:
    return PostRolesResponseBody201_Read.from_dict(s)


def post_roles_response_body201_read_to_dict(x: PostRolesResponseBody201_Read) -> Any:
    return to_class(PostRolesResponseBody201_Read, x)


def get_role_response_body200_from_dict(s: Any) -> GetRoleResponseBody200:
    return GetRoleResponseBody200.from_dict(s)


def get_role_response_body200_to_dict(x: GetRoleResponseBody200) -> Any:
    return to_class(GetRoleResponseBody200, x)


def get_role_response_body200_write_from_dict(s: Any) -> GetRoleResponseBody200_Write:
    return GetRoleResponseBody200_Write.from_dict(s)


def get_role_response_body200_write_to_dict(x: GetRoleResponseBody200_Write) -> Any:
    return to_class(GetRoleResponseBody200_Write, x)


def get_role_response_body200_read_from_dict(s: Any) -> GetRoleResponseBody200_Read:
    return GetRoleResponseBody200_Read.from_dict(s)


def get_role_response_body200_read_to_dict(x: GetRoleResponseBody200_Read) -> Any:
    return to_class(GetRoleResponseBody200_Read, x)


def patch_role_request_body_from_dict(s: Any) -> PatchRoleRequestBody:
    return PatchRoleRequestBody.from_dict(s)


def patch_role_request_body_to_dict(x: PatchRoleRequestBody) -> Any:
    return to_class(PatchRoleRequestBody, x)


def patch_role_request_body_write_from_dict(s: Any) -> PatchRoleRequestBodyWrite:
    return PatchRoleRequestBodyWrite.from_dict(s)


def patch_role_request_body_write_to_dict(x: PatchRoleRequestBodyWrite) -> Any:
    return to_class(PatchRoleRequestBodyWrite, x)


def patch_role_request_body_read_from_dict(s: Any) -> PatchRoleRequestBodyRead:
    return PatchRoleRequestBodyRead.from_dict(s)


def patch_role_request_body_read_to_dict(x: PatchRoleRequestBodyRead) -> Any:
    return to_class(PatchRoleRequestBodyRead, x)


def patch_role_response_body200_from_dict(s: Any) -> PatchRoleResponseBody200:
    return PatchRoleResponseBody200.from_dict(s)


def patch_role_response_body200_to_dict(x: PatchRoleResponseBody200) -> Any:
    return to_class(PatchRoleResponseBody200, x)


def patch_role_response_body200_write_from_dict(s: Any) -> PatchRoleResponseBody200_Write:
    return PatchRoleResponseBody200_Write.from_dict(s)


def patch_role_response_body200_write_to_dict(x: PatchRoleResponseBody200_Write) -> Any:
    return to_class(PatchRoleResponseBody200_Write, x)


def patch_role_response_body200_read_from_dict(s: Any) -> PatchRoleResponseBody200_Read:
    return PatchRoleResponseBody200_Read.from_dict(s)


def patch_role_response_body200_read_to_dict(x: PatchRoleResponseBody200_Read) -> Any:
    return to_class(PatchRoleResponseBody200_Read, x)


def get_role_users_response_body200_from_dict(s: Any) -> List[GetRoleUsersResponseBody200_Element]:
    return from_list(GetRoleUsersResponseBody200_Element.from_dict, s)


def get_role_users_response_body200_to_dict(x: List[GetRoleUsersResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetRoleUsersResponseBody200_Element, x), x)


def get_role_users_response_body200_write_from_dict(s: Any) -> List[GetRoleUsersResponseBody200_WriteElement]:
    return from_list(GetRoleUsersResponseBody200_WriteElement.from_dict, s)


def get_role_users_response_body200_write_to_dict(x: List[GetRoleUsersResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetRoleUsersResponseBody200_WriteElement, x), x)


def get_role_users_response_body200_read_from_dict(s: Any) -> List[GetRoleUsersResponseBody200_ReadElement]:
    return from_list(GetRoleUsersResponseBody200_ReadElement.from_dict, s)


def get_role_users_response_body200_read_to_dict(x: List[GetRoleUsersResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetRoleUsersResponseBody200_ReadElement, x), x)


def post_role_users_request_body_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def post_role_users_request_body_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def post_role_users_request_body_write_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def post_role_users_request_body_write_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def post_role_users_request_body_read_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def post_role_users_request_body_read_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def delete_role_users_request_body_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def delete_role_users_request_body_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def delete_role_users_request_body_write_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def delete_role_users_request_body_write_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def delete_role_users_request_body_read_from_dict(s: Any) -> List[str]:
    return from_list(from_str, s)


def delete_role_users_request_body_read_to_dict(x: List[str]) -> Any:
    return from_list(from_str, x)


def get_identity_response_body200_from_dict(s: Any) -> GetIdentityResponseBody200:
    return GetIdentityResponseBody200.from_dict(s)


def get_identity_response_body200_to_dict(x: GetIdentityResponseBody200) -> Any:
    return to_class(GetIdentityResponseBody200, x)


def get_identity_response_body200_write_from_dict(s: Any) -> GetIdentityResponseBody200_Write:
    return GetIdentityResponseBody200_Write.from_dict(s)


def get_identity_response_body200_write_to_dict(x: GetIdentityResponseBody200_Write) -> Any:
    return to_class(GetIdentityResponseBody200_Write, x)


def get_identity_response_body200_read_from_dict(s: Any) -> GetIdentityResponseBody200_Read:
    return GetIdentityResponseBody200_Read.from_dict(s)


def get_identity_response_body200_read_to_dict(x: GetIdentityResponseBody200_Read) -> Any:
    return to_class(GetIdentityResponseBody200_Read, x)


def patch_identity_request_body_from_dict(s: Any) -> PatchIdentityRequestBody:
    return PatchIdentityRequestBody.from_dict(s)


def patch_identity_request_body_to_dict(x: PatchIdentityRequestBody) -> Any:
    return to_class(PatchIdentityRequestBody, x)


def patch_identity_request_body_write_from_dict(s: Any) -> PatchIdentityRequestBodyWrite:
    return PatchIdentityRequestBodyWrite.from_dict(s)


def patch_identity_request_body_write_to_dict(x: PatchIdentityRequestBodyWrite) -> Any:
    return to_class(PatchIdentityRequestBodyWrite, x)


def patch_identity_request_body_read_from_dict(s: Any) -> PatchIdentityRequestBodyRead:
    return PatchIdentityRequestBodyRead.from_dict(s)


def patch_identity_request_body_read_to_dict(x: PatchIdentityRequestBodyRead) -> Any:
    return to_class(PatchIdentityRequestBodyRead, x)


def patch_identity_response_body200_from_dict(s: Any) -> PatchIdentityResponseBody200:
    return PatchIdentityResponseBody200.from_dict(s)


def patch_identity_response_body200_to_dict(x: PatchIdentityResponseBody200) -> Any:
    return to_class(PatchIdentityResponseBody200, x)


def patch_identity_response_body200_write_from_dict(s: Any) -> PatchIdentityResponseBody200_Write:
    return PatchIdentityResponseBody200_Write.from_dict(s)


def patch_identity_response_body200_write_to_dict(x: PatchIdentityResponseBody200_Write) -> Any:
    return to_class(PatchIdentityResponseBody200_Write, x)


def patch_identity_response_body200_read_from_dict(s: Any) -> PatchIdentityResponseBody200_Read:
    return PatchIdentityResponseBody200_Read.from_dict(s)


def patch_identity_response_body200_read_to_dict(x: PatchIdentityResponseBody200_Read) -> Any:
    return to_class(PatchIdentityResponseBody200_Read, x)


def post_schedule_request_body_from_dict(s: Any) -> PostScheduleRequestBody:
    return PostScheduleRequestBody.from_dict(s)


def post_schedule_request_body_to_dict(x: PostScheduleRequestBody) -> Any:
    return to_class(PostScheduleRequestBody, x)


def post_schedule_request_body_write_from_dict(s: Any) -> PostScheduleRequestBodyWrite:
    return PostScheduleRequestBodyWrite.from_dict(s)


def post_schedule_request_body_write_to_dict(x: PostScheduleRequestBodyWrite) -> Any:
    return to_class(PostScheduleRequestBodyWrite, x)


def post_schedule_request_body_read_from_dict(s: Any) -> PostScheduleRequestBodyRead:
    return PostScheduleRequestBodyRead.from_dict(s)


def post_schedule_request_body_read_to_dict(x: PostScheduleRequestBodyRead) -> Any:
    return to_class(PostScheduleRequestBodyRead, x)


def post_schedule_response_body200_from_dict(s: Any) -> List[PostScheduleResponseBody200_Element]:
    return from_list(PostScheduleResponseBody200_Element.from_dict, s)


def post_schedule_response_body200_to_dict(x: List[PostScheduleResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(PostScheduleResponseBody200_Element, x), x)


def post_schedule_response_body200_write_from_dict(s: Any) -> List[PostScheduleResponseBody200_WriteElement]:
    return from_list(PostScheduleResponseBody200_WriteElement.from_dict, s)


def post_schedule_response_body200_write_to_dict(x: List[PostScheduleResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(PostScheduleResponseBody200_WriteElement, x), x)


def post_schedule_response_body200_read_from_dict(s: Any) -> List[PostScheduleResponseBody200_ReadElement]:
    return from_list(PostScheduleResponseBody200_ReadElement.from_dict, s)


def post_schedule_response_body200_read_to_dict(x: List[PostScheduleResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(PostScheduleResponseBody200_ReadElement, x), x)


def post_schedule_response_body404_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body404_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body404_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body404_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body404_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body404_read_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body422_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body422_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body422_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body422_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body422_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body422_read_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def post_booking_request_body_from_dict(s: Any) -> PostBookingRequestBody:
    return PostBookingRequestBody.from_dict(s)


def post_booking_request_body_to_dict(x: PostBookingRequestBody) -> Any:
    return to_class(PostBookingRequestBody, x)


def post_booking_request_body_write_from_dict(s: Any) -> PostBookingRequestBodyWrite:
    return PostBookingRequestBodyWrite.from_dict(s)


def post_booking_request_body_write_to_dict(x: PostBookingRequestBodyWrite) -> Any:
    return to_class(PostBookingRequestBodyWrite, x)


def post_booking_request_body_read_from_dict(s: Any) -> PostBookingRequestBodyRead:
    return PostBookingRequestBodyRead.from_dict(s)


def post_booking_request_body_read_to_dict(x: PostBookingRequestBodyRead) -> Any:
    return to_class(PostBookingRequestBodyRead, x)


def post_booking_response_body200_from_dict(s: Any) -> PostBookingResponseBody200:
    return PostBookingResponseBody200.from_dict(s)


def post_booking_response_body200_to_dict(x: PostBookingResponseBody200) -> Any:
    return to_class(PostBookingResponseBody200, x)


def post_booking_response_body200_write_from_dict(s: Any) -> PostBookingResponseBody200_Write:
    return PostBookingResponseBody200_Write.from_dict(s)


def post_booking_response_body200_write_to_dict(x: PostBookingResponseBody200_Write) -> Any:
    return to_class(PostBookingResponseBody200_Write, x)


def post_booking_response_body200_read_from_dict(s: Any) -> PostBookingResponseBody200_Read:
    return PostBookingResponseBody200_Read.from_dict(s)


def post_booking_response_body200_read_to_dict(x: PostBookingResponseBody200_Read) -> Any:
    return to_class(PostBookingResponseBody200_Read, x)


def post_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def post_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def post_booking_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_booking_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_booking_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_booking_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def patch_booking_request_body_from_dict(s: Any) -> PatchBookingRequestBody:
    return PatchBookingRequestBody.from_dict(s)


def patch_booking_request_body_to_dict(x: PatchBookingRequestBody) -> Any:
    return to_class(PatchBookingRequestBody, x)


def patch_booking_request_body_write_from_dict(s: Any) -> PatchBookingRequestBodyWrite:
    return PatchBookingRequestBodyWrite.from_dict(s)


def patch_booking_request_body_write_to_dict(x: PatchBookingRequestBodyWrite) -> Any:
    return to_class(PatchBookingRequestBodyWrite, x)


def patch_booking_request_body_read_from_dict(s: Any) -> PatchBookingRequestBodyRead:
    return PatchBookingRequestBodyRead.from_dict(s)


def patch_booking_request_body_read_to_dict(x: PatchBookingRequestBodyRead) -> Any:
    return to_class(PatchBookingRequestBodyRead, x)


def patch_booking_response_body200_from_dict(s: Any) -> PatchBookingResponseBody200:
    return PatchBookingResponseBody200.from_dict(s)


def patch_booking_response_body200_to_dict(x: PatchBookingResponseBody200) -> Any:
    return to_class(PatchBookingResponseBody200, x)


def patch_booking_response_body200_write_from_dict(s: Any) -> PatchBookingResponseBody200_Write:
    return PatchBookingResponseBody200_Write.from_dict(s)


def patch_booking_response_body200_write_to_dict(x: PatchBookingResponseBody200_Write) -> Any:
    return to_class(PatchBookingResponseBody200_Write, x)


def patch_booking_response_body200_read_from_dict(s: Any) -> PatchBookingResponseBody200_Read:
    return PatchBookingResponseBody200_Read.from_dict(s)


def patch_booking_response_body200_read_to_dict(x: PatchBookingResponseBody200_Read) -> Any:
    return to_class(PatchBookingResponseBody200_Read, x)


def patch_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def patch_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def patch_booking_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def patch_booking_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def patch_booking_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def patch_booking_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def get_booking_response_body200_from_dict(s: Any) -> GetBookingResponseBody200:
    return GetBookingResponseBody200.from_dict(s)


def get_booking_response_body200_to_dict(x: GetBookingResponseBody200) -> Any:
    return to_class(GetBookingResponseBody200, x)


def get_booking_response_body200_write_from_dict(s: Any) -> GetBookingResponseBody200_Write:
    return GetBookingResponseBody200_Write.from_dict(s)


def get_booking_response_body200_write_to_dict(x: GetBookingResponseBody200_Write) -> Any:
    return to_class(GetBookingResponseBody200_Write, x)


def get_booking_response_body200_read_from_dict(s: Any) -> GetBookingResponseBody200_Read:
    return GetBookingResponseBody200_Read.from_dict(s)


def get_booking_response_body200_read_to_dict(x: GetBookingResponseBody200_Read) -> Any:
    return to_class(GetBookingResponseBody200_Read, x)


def get_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def get_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def get_booking_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def get_booking_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def get_booking_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def get_booking_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_destroy_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_destroy_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_destroy_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_destroy_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_destroy_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_destroy_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def put_booking_lock_response_body200_from_dict(s: Any) -> PutBookingLockResponseBody200:
    return PutBookingLockResponseBody200.from_dict(s)


def put_booking_lock_response_body200_to_dict(x: PutBookingLockResponseBody200) -> Any:
    return to_class(PutBookingLockResponseBody200, x)


def put_booking_lock_response_body200_write_from_dict(s: Any) -> PutBookingLockResponseBody200_Write:
    return PutBookingLockResponseBody200_Write.from_dict(s)


def put_booking_lock_response_body200_write_to_dict(x: PutBookingLockResponseBody200_Write) -> Any:
    return to_class(PutBookingLockResponseBody200_Write, x)


def put_booking_lock_response_body200_read_from_dict(s: Any) -> PutBookingLockResponseBody200_Read:
    return PutBookingLockResponseBody200_Read.from_dict(s)


def put_booking_lock_response_body200_read_to_dict(x: PutBookingLockResponseBody200_Read) -> Any:
    return to_class(PutBookingLockResponseBody200_Read, x)


def put_booking_lock_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def put_booking_lock_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def put_booking_lock_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def put_booking_lock_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def put_booking_lock_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def put_booking_lock_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_lock_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_lock_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_lock_response_body500_write_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_lock_response_body500_write_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_lock_response_body500_read_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_lock_response_body500_read_to_dict(x: str) -> Any:
    return from_str(x)


def get_devices_response_body200_from_dict(s: Any) -> List[GetDevicesResponseBody200_Element]:
    return from_list(GetDevicesResponseBody200_Element.from_dict, s)


def get_devices_response_body200_to_dict(x: List[GetDevicesResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetDevicesResponseBody200_Element, x), x)


def get_devices_response_body200_write_from_dict(s: Any) -> List[GetDevicesResponseBody200_WriteElement]:
    return from_list(GetDevicesResponseBody200_WriteElement.from_dict, s)


def get_devices_response_body200_write_to_dict(x: List[GetDevicesResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetDevicesResponseBody200_WriteElement, x), x)


def get_devices_response_body200_read_from_dict(s: Any) -> List[GetDevicesResponseBody200_ReadElement]:
    return from_list(GetDevicesResponseBody200_ReadElement.from_dict, s)


def get_devices_response_body200_read_to_dict(x: List[GetDevicesResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetDevicesResponseBody200_ReadElement, x), x)


def post_devices_request_body_from_dict(s: Any) -> PostDevicesRequestBody:
    return PostDevicesRequestBody.from_dict(s)


def post_devices_request_body_to_dict(x: PostDevicesRequestBody) -> Any:
    return to_class(PostDevicesRequestBody, x)


def post_devices_request_body_write_from_dict(s: Any) -> PostDevicesRequestBodyWrite:
    return PostDevicesRequestBodyWrite.from_dict(s)


def post_devices_request_body_write_to_dict(x: PostDevicesRequestBodyWrite) -> Any:
    return to_class(PostDevicesRequestBodyWrite, x)


def post_devices_request_body_read_from_dict(s: Any) -> PostDevicesRequestBodyRead:
    return PostDevicesRequestBodyRead.from_dict(s)


def post_devices_request_body_read_to_dict(x: PostDevicesRequestBodyRead) -> Any:
    return to_class(PostDevicesRequestBodyRead, x)


def post_devices_response_body201_from_dict(s: Any) -> PostDevicesResponseBody201:
    return PostDevicesResponseBody201.from_dict(s)


def post_devices_response_body201_to_dict(x: PostDevicesResponseBody201) -> Any:
    return to_class(PostDevicesResponseBody201, x)


def post_devices_response_body201_write_from_dict(s: Any) -> PostDevicesResponseBody201_Write:
    return PostDevicesResponseBody201_Write.from_dict(s)


def post_devices_response_body201_write_to_dict(x: PostDevicesResponseBody201_Write) -> Any:
    return to_class(PostDevicesResponseBody201_Write, x)


def post_devices_response_body201_read_from_dict(s: Any) -> PostDevicesResponseBody201_Read:
    return PostDevicesResponseBody201_Read.from_dict(s)


def post_devices_response_body201_read_to_dict(x: PostDevicesResponseBody201_Read) -> Any:
    return to_class(PostDevicesResponseBody201_Read, x)


def get_device_response_body200_from_dict(s: Any) -> GetDeviceResponseBody200:
    return GetDeviceResponseBody200.from_dict(s)


def get_device_response_body200_to_dict(x: GetDeviceResponseBody200) -> Any:
    return to_class(GetDeviceResponseBody200, x)


def get_device_response_body200_write_from_dict(s: Any) -> GetDeviceResponseBody200_Write:
    return GetDeviceResponseBody200_Write.from_dict(s)


def get_device_response_body200_write_to_dict(x: GetDeviceResponseBody200_Write) -> Any:
    return to_class(GetDeviceResponseBody200_Write, x)


def get_device_response_body200_read_from_dict(s: Any) -> GetDeviceResponseBody200_Read:
    return GetDeviceResponseBody200_Read.from_dict(s)


def get_device_response_body200_read_to_dict(x: GetDeviceResponseBody200_Read) -> Any:
    return to_class(GetDeviceResponseBody200_Read, x)


def patch_device_request_body_from_dict(s: Any) -> PatchDeviceRequestBody:
    return PatchDeviceRequestBody.from_dict(s)


def patch_device_request_body_to_dict(x: PatchDeviceRequestBody) -> Any:
    return to_class(PatchDeviceRequestBody, x)


def patch_device_request_body_write_from_dict(s: Any) -> PatchDeviceRequestBodyWrite:
    return PatchDeviceRequestBodyWrite.from_dict(s)


def patch_device_request_body_write_to_dict(x: PatchDeviceRequestBodyWrite) -> Any:
    return to_class(PatchDeviceRequestBodyWrite, x)


def patch_device_request_body_read_from_dict(s: Any) -> PatchDeviceRequestBodyRead:
    return PatchDeviceRequestBodyRead.from_dict(s)


def patch_device_request_body_read_to_dict(x: PatchDeviceRequestBodyRead) -> Any:
    return to_class(PatchDeviceRequestBodyRead, x)


def patch_device_response_body200_from_dict(s: Any) -> PatchDeviceResponseBody200:
    return PatchDeviceResponseBody200.from_dict(s)


def patch_device_response_body200_to_dict(x: PatchDeviceResponseBody200) -> Any:
    return to_class(PatchDeviceResponseBody200, x)


def patch_device_response_body200_write_from_dict(s: Any) -> PatchDeviceResponseBody200_Write:
    return PatchDeviceResponseBody200_Write.from_dict(s)


def patch_device_response_body200_write_to_dict(x: PatchDeviceResponseBody200_Write) -> Any:
    return to_class(PatchDeviceResponseBody200_Write, x)


def patch_device_response_body200_read_from_dict(s: Any) -> PatchDeviceResponseBody200_Read:
    return PatchDeviceResponseBody200_Read.from_dict(s)


def patch_device_response_body200_read_to_dict(x: PatchDeviceResponseBody200_Read) -> Any:
    return to_class(PatchDeviceResponseBody200_Read, x)


def post_device_response_body201_from_dict(s: Any) -> PostDeviceResponseBody201:
    return PostDeviceResponseBody201.from_dict(s)


def post_device_response_body201_to_dict(x: PostDeviceResponseBody201) -> Any:
    return to_class(PostDeviceResponseBody201, x)


def post_device_response_body201_write_from_dict(s: Any) -> PostDeviceResponseBody201_Write:
    return PostDeviceResponseBody201_Write.from_dict(s)


def post_device_response_body201_write_to_dict(x: PostDeviceResponseBody201_Write) -> Any:
    return to_class(PostDeviceResponseBody201_Write, x)


def post_device_response_body201_read_from_dict(s: Any) -> PostDeviceResponseBody201_Read:
    return PostDeviceResponseBody201_Read.from_dict(s)


def post_device_response_body201_read_to_dict(x: PostDeviceResponseBody201_Read) -> Any:
    return to_class(PostDeviceResponseBody201_Read, x)


def post_device_availability_request_body_from_dict(s: Any) -> List[PurpleAvailabilityRule]:
    return from_list(PurpleAvailabilityRule.from_dict, s)


def post_device_availability_request_body_to_dict(x: List[PurpleAvailabilityRule]) -> Any:
    return from_list(lambda x: to_class(PurpleAvailabilityRule, x), x)


def post_device_availability_request_body_write_from_dict(s: Any) -> List[FluffyAvailabilityRule]:
    return from_list(FluffyAvailabilityRule.from_dict, s)


def post_device_availability_request_body_write_to_dict(x: List[FluffyAvailabilityRule]) -> Any:
    return from_list(lambda x: to_class(FluffyAvailabilityRule, x), x)


def post_device_availability_request_body_read_from_dict(s: Any) -> List[TentacledAvailabilityRule]:
    return from_list(TentacledAvailabilityRule.from_dict, s)


def post_device_availability_request_body_read_to_dict(x: List[TentacledAvailabilityRule]) -> Any:
    return from_list(lambda x: to_class(TentacledAvailabilityRule, x), x)


def post_device_availability_response_body200_from_dict(s: Any) -> List[PostDeviceAvailabilityResponseBody200_Element]:
    return from_list(PostDeviceAvailabilityResponseBody200_Element.from_dict, s)


def post_device_availability_response_body200_to_dict(x: List[PostDeviceAvailabilityResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(PostDeviceAvailabilityResponseBody200_Element, x), x)


def post_device_availability_response_body200_write_from_dict(s: Any) -> List[PostDeviceAvailabilityResponseBody200_WriteElement]:
    return from_list(PostDeviceAvailabilityResponseBody200_WriteElement.from_dict, s)


def post_device_availability_response_body200_write_to_dict(x: List[PostDeviceAvailabilityResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(PostDeviceAvailabilityResponseBody200_WriteElement, x), x)


def post_device_availability_response_body200_read_from_dict(s: Any) -> List[PostDeviceAvailabilityResponseBody200_ReadElement]:
    return from_list(PostDeviceAvailabilityResponseBody200_ReadElement.from_dict, s)


def post_device_availability_response_body200_read_to_dict(x: List[PostDeviceAvailabilityResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(PostDeviceAvailabilityResponseBody200_ReadElement, x), x)


def post_device_websocket_response_body200_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_websocket_response_body200_to_dict(x: str) -> Any:
    return from_str(x)


def post_device_websocket_response_body200_write_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_websocket_response_body200_write_to_dict(x: str) -> Any:
    return from_str(x)


def post_device_websocket_response_body200_read_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_websocket_response_body200_read_to_dict(x: str) -> Any:
    return from_str(x)


def post_device_signaling_request_body_from_dict(s: Any) -> PostDeviceSignalingRequestBody:
    return PostDeviceSignalingRequestBody.from_dict(s)


def post_device_signaling_request_body_to_dict(x: PostDeviceSignalingRequestBody) -> Any:
    return to_class(PostDeviceSignalingRequestBody, x)


def post_device_signaling_request_body_write_from_dict(s: Any) -> PostDeviceSignalingRequestBodyWrite:
    return PostDeviceSignalingRequestBodyWrite.from_dict(s)


def post_device_signaling_request_body_write_to_dict(x: PostDeviceSignalingRequestBodyWrite) -> Any:
    return to_class(PostDeviceSignalingRequestBodyWrite, x)


def post_device_signaling_request_body_read_from_dict(s: Any) -> PostDeviceSignalingRequestBodyRead:
    return PostDeviceSignalingRequestBodyRead.from_dict(s)


def post_device_signaling_request_body_read_to_dict(x: PostDeviceSignalingRequestBodyRead) -> Any:
    return to_class(PostDeviceSignalingRequestBodyRead, x)


def get_peerconnections_response_body200_from_dict(s: Any) -> List[GetPeerconnectionsResponseBody200_Element]:
    return from_list(GetPeerconnectionsResponseBody200_Element.from_dict, s)


def get_peerconnections_response_body200_to_dict(x: List[GetPeerconnectionsResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_Element, x), x)


def get_peerconnections_response_body200_write_from_dict(s: Any) -> List[GetPeerconnectionsResponseBody200_WriteElement]:
    return from_list(GetPeerconnectionsResponseBody200_WriteElement.from_dict, s)


def get_peerconnections_response_body200_write_to_dict(x: List[GetPeerconnectionsResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_WriteElement, x), x)


def get_peerconnections_response_body200_read_from_dict(s: Any) -> List[GetPeerconnectionsResponseBody200_ReadElement]:
    return from_list(GetPeerconnectionsResponseBody200_ReadElement.from_dict, s)


def get_peerconnections_response_body200_read_to_dict(x: List[GetPeerconnectionsResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_ReadElement, x), x)


def post_peerconnections_request_body_from_dict(s: Any) -> PostPeerconnectionsRequestBody:
    return PostPeerconnectionsRequestBody.from_dict(s)


def post_peerconnections_request_body_to_dict(x: PostPeerconnectionsRequestBody) -> Any:
    return to_class(PostPeerconnectionsRequestBody, x)


def post_peerconnections_request_body_write_from_dict(s: Any) -> PostPeerconnectionsRequestBodyWrite:
    return PostPeerconnectionsRequestBodyWrite.from_dict(s)


def post_peerconnections_request_body_write_to_dict(x: PostPeerconnectionsRequestBodyWrite) -> Any:
    return to_class(PostPeerconnectionsRequestBodyWrite, x)


def post_peerconnections_request_body_read_from_dict(s: Any) -> PostPeerconnectionsRequestBodyRead:
    return PostPeerconnectionsRequestBodyRead.from_dict(s)


def post_peerconnections_request_body_read_to_dict(x: PostPeerconnectionsRequestBodyRead) -> Any:
    return to_class(PostPeerconnectionsRequestBodyRead, x)


def post_peerconnections_response_body201_from_dict(s: Any) -> PostPeerconnectionsResponseBody201:
    return PostPeerconnectionsResponseBody201.from_dict(s)


def post_peerconnections_response_body201_to_dict(x: PostPeerconnectionsResponseBody201) -> Any:
    return to_class(PostPeerconnectionsResponseBody201, x)


def post_peerconnections_response_body201_write_from_dict(s: Any) -> PostPeerconnectionsResponseBody201_Write:
    return PostPeerconnectionsResponseBody201_Write.from_dict(s)


def post_peerconnections_response_body201_write_to_dict(x: PostPeerconnectionsResponseBody201_Write) -> Any:
    return to_class(PostPeerconnectionsResponseBody201_Write, x)


def post_peerconnections_response_body201_read_from_dict(s: Any) -> PostPeerconnectionsResponseBody201_Read:
    return PostPeerconnectionsResponseBody201_Read.from_dict(s)


def post_peerconnections_response_body201_read_to_dict(x: PostPeerconnectionsResponseBody201_Read) -> Any:
    return to_class(PostPeerconnectionsResponseBody201_Read, x)


def post_peerconnections_response_body202_from_dict(s: Any) -> PostPeerconnectionsResponseBody202:
    return PostPeerconnectionsResponseBody202.from_dict(s)


def post_peerconnections_response_body202_to_dict(x: PostPeerconnectionsResponseBody202) -> Any:
    return to_class(PostPeerconnectionsResponseBody202, x)


def post_peerconnections_response_body202_write_from_dict(s: Any) -> PostPeerconnectionsResponseBody202_Write:
    return PostPeerconnectionsResponseBody202_Write.from_dict(s)


def post_peerconnections_response_body202_write_to_dict(x: PostPeerconnectionsResponseBody202_Write) -> Any:
    return to_class(PostPeerconnectionsResponseBody202_Write, x)


def post_peerconnections_response_body202_read_from_dict(s: Any) -> PostPeerconnectionsResponseBody202_Read:
    return PostPeerconnectionsResponseBody202_Read.from_dict(s)


def post_peerconnections_response_body202_read_to_dict(x: PostPeerconnectionsResponseBody202_Read) -> Any:
    return to_class(PostPeerconnectionsResponseBody202_Read, x)


def get_peerconnection_response_body200_from_dict(s: Any) -> GetPeerconnectionResponseBody200:
    return GetPeerconnectionResponseBody200.from_dict(s)


def get_peerconnection_response_body200_to_dict(x: GetPeerconnectionResponseBody200) -> Any:
    return to_class(GetPeerconnectionResponseBody200, x)


def get_peerconnection_response_body200_write_from_dict(s: Any) -> GetPeerconnectionResponseBody200_Write:
    return GetPeerconnectionResponseBody200_Write.from_dict(s)


def get_peerconnection_response_body200_write_to_dict(x: GetPeerconnectionResponseBody200_Write) -> Any:
    return to_class(GetPeerconnectionResponseBody200_Write, x)


def get_peerconnection_response_body200_read_from_dict(s: Any) -> GetPeerconnectionResponseBody200_Read:
    return GetPeerconnectionResponseBody200_Read.from_dict(s)


def get_peerconnection_response_body200_read_to_dict(x: GetPeerconnectionResponseBody200_Read) -> Any:
    return to_class(GetPeerconnectionResponseBody200_Read, x)


def get_experiments_response_body200_from_dict(s: Any) -> List[GetExperimentsResponseBody200_Element]:
    return from_list(GetExperimentsResponseBody200_Element.from_dict, s)


def get_experiments_response_body200_to_dict(x: List[GetExperimentsResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetExperimentsResponseBody200_Element, x), x)


def get_experiments_response_body200_write_from_dict(s: Any) -> List[GetExperimentsResponseBody200_WriteElement]:
    return from_list(GetExperimentsResponseBody200_WriteElement.from_dict, s)


def get_experiments_response_body200_write_to_dict(x: List[GetExperimentsResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetExperimentsResponseBody200_WriteElement, x), x)


def get_experiments_response_body200_read_from_dict(s: Any) -> List[GetExperimentsResponseBody200_ReadElement]:
    return from_list(GetExperimentsResponseBody200_ReadElement.from_dict, s)


def get_experiments_response_body200_read_to_dict(x: List[GetExperimentsResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetExperimentsResponseBody200_ReadElement, x), x)


def post_experiments_request_body_from_dict(s: Any) -> PostExperimentsRequestBody:
    return PostExperimentsRequestBody.from_dict(s)


def post_experiments_request_body_to_dict(x: PostExperimentsRequestBody) -> Any:
    return to_class(PostExperimentsRequestBody, x)


def post_experiments_request_body_write_from_dict(s: Any) -> PostExperimentsRequestBodyWrite:
    return PostExperimentsRequestBodyWrite.from_dict(s)


def post_experiments_request_body_write_to_dict(x: PostExperimentsRequestBodyWrite) -> Any:
    return to_class(PostExperimentsRequestBodyWrite, x)


def post_experiments_request_body_read_from_dict(s: Any) -> PostExperimentsRequestBodyRead:
    return PostExperimentsRequestBodyRead.from_dict(s)


def post_experiments_request_body_read_to_dict(x: PostExperimentsRequestBodyRead) -> Any:
    return to_class(PostExperimentsRequestBodyRead, x)


def post_experiments_response_body201_from_dict(s: Any) -> PostExperimentsResponseBody201:
    return PostExperimentsResponseBody201.from_dict(s)


def post_experiments_response_body201_to_dict(x: PostExperimentsResponseBody201) -> Any:
    return to_class(PostExperimentsResponseBody201, x)


def post_experiments_response_body201_write_from_dict(s: Any) -> PostExperimentsResponseBody201_Write:
    return PostExperimentsResponseBody201_Write.from_dict(s)


def post_experiments_response_body201_write_to_dict(x: PostExperimentsResponseBody201_Write) -> Any:
    return to_class(PostExperimentsResponseBody201_Write, x)


def post_experiments_response_body201_read_from_dict(s: Any) -> PostExperimentsResponseBody201_Read:
    return PostExperimentsResponseBody201_Read.from_dict(s)


def post_experiments_response_body201_read_to_dict(x: PostExperimentsResponseBody201_Read) -> Any:
    return to_class(PostExperimentsResponseBody201_Read, x)


def post_experiments_response_body202_from_dict(s: Any) -> PostExperimentsResponseBody202:
    return PostExperimentsResponseBody202.from_dict(s)


def post_experiments_response_body202_to_dict(x: PostExperimentsResponseBody202) -> Any:
    return to_class(PostExperimentsResponseBody202, x)


def post_experiments_response_body202_write_from_dict(s: Any) -> PostExperimentsResponseBody202_Write:
    return PostExperimentsResponseBody202_Write.from_dict(s)


def post_experiments_response_body202_write_to_dict(x: PostExperimentsResponseBody202_Write) -> Any:
    return to_class(PostExperimentsResponseBody202_Write, x)


def post_experiments_response_body202_read_from_dict(s: Any) -> PostExperimentsResponseBody202_Read:
    return PostExperimentsResponseBody202_Read.from_dict(s)


def post_experiments_response_body202_read_to_dict(x: PostExperimentsResponseBody202_Read) -> Any:
    return to_class(PostExperimentsResponseBody202_Read, x)


def get_experiment_response_body200_from_dict(s: Any) -> GetExperimentResponseBody200:
    return GetExperimentResponseBody200.from_dict(s)


def get_experiment_response_body200_to_dict(x: GetExperimentResponseBody200) -> Any:
    return to_class(GetExperimentResponseBody200, x)


def get_experiment_response_body200_write_from_dict(s: Any) -> GetExperimentResponseBody200_Write:
    return GetExperimentResponseBody200_Write.from_dict(s)


def get_experiment_response_body200_write_to_dict(x: GetExperimentResponseBody200_Write) -> Any:
    return to_class(GetExperimentResponseBody200_Write, x)


def get_experiment_response_body200_read_from_dict(s: Any) -> GetExperimentResponseBody200_Read:
    return GetExperimentResponseBody200_Read.from_dict(s)


def get_experiment_response_body200_read_to_dict(x: GetExperimentResponseBody200_Read) -> Any:
    return to_class(GetExperimentResponseBody200_Read, x)


def patch_experiment_request_body_from_dict(s: Any) -> PatchExperimentRequestBody:
    return PatchExperimentRequestBody.from_dict(s)


def patch_experiment_request_body_to_dict(x: PatchExperimentRequestBody) -> Any:
    return to_class(PatchExperimentRequestBody, x)


def patch_experiment_request_body_write_from_dict(s: Any) -> PatchExperimentRequestBodyWrite:
    return PatchExperimentRequestBodyWrite.from_dict(s)


def patch_experiment_request_body_write_to_dict(x: PatchExperimentRequestBodyWrite) -> Any:
    return to_class(PatchExperimentRequestBodyWrite, x)


def patch_experiment_request_body_read_from_dict(s: Any) -> PatchExperimentRequestBodyRead:
    return PatchExperimentRequestBodyRead.from_dict(s)


def patch_experiment_request_body_read_to_dict(x: PatchExperimentRequestBodyRead) -> Any:
    return to_class(PatchExperimentRequestBodyRead, x)


def patch_experiment_response_body200_from_dict(s: Any) -> PatchExperimentResponseBody200:
    return PatchExperimentResponseBody200.from_dict(s)


def patch_experiment_response_body200_to_dict(x: PatchExperimentResponseBody200) -> Any:
    return to_class(PatchExperimentResponseBody200, x)


def patch_experiment_response_body200_write_from_dict(s: Any) -> PatchExperimentResponseBody200_Write:
    return PatchExperimentResponseBody200_Write.from_dict(s)


def patch_experiment_response_body200_write_to_dict(x: PatchExperimentResponseBody200_Write) -> Any:
    return to_class(PatchExperimentResponseBody200_Write, x)


def patch_experiment_response_body200_read_from_dict(s: Any) -> PatchExperimentResponseBody200_Read:
    return PatchExperimentResponseBody200_Read.from_dict(s)


def patch_experiment_response_body200_read_to_dict(x: PatchExperimentResponseBody200_Read) -> Any:
    return to_class(PatchExperimentResponseBody200_Read, x)


def patch_experiment_response_body202_from_dict(s: Any) -> PatchExperimentResponseBody202:
    return PatchExperimentResponseBody202.from_dict(s)


def patch_experiment_response_body202_to_dict(x: PatchExperimentResponseBody202) -> Any:
    return to_class(PatchExperimentResponseBody202, x)


def patch_experiment_response_body202_write_from_dict(s: Any) -> PatchExperimentResponseBody202_Write:
    return PatchExperimentResponseBody202_Write.from_dict(s)


def patch_experiment_response_body202_write_to_dict(x: PatchExperimentResponseBody202_Write) -> Any:
    return to_class(PatchExperimentResponseBody202_Write, x)


def patch_experiment_response_body202_read_from_dict(s: Any) -> PatchExperimentResponseBody202_Read:
    return PatchExperimentResponseBody202_Read.from_dict(s)


def patch_experiment_response_body202_read_to_dict(x: PatchExperimentResponseBody202_Read) -> Any:
    return to_class(PatchExperimentResponseBody202_Read, x)


def get_institutions_response_body200_from_dict(s: Any) -> List[GetInstitutionsResponseBody200_Element]:
    return from_list(GetInstitutionsResponseBody200_Element.from_dict, s)


def get_institutions_response_body200_to_dict(x: List[GetInstitutionsResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetInstitutionsResponseBody200_Element, x), x)


def get_institutions_response_body200_write_from_dict(s: Any) -> List[GetInstitutionsResponseBody200_WriteElement]:
    return from_list(GetInstitutionsResponseBody200_WriteElement.from_dict, s)


def get_institutions_response_body200_write_to_dict(x: List[GetInstitutionsResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetInstitutionsResponseBody200_WriteElement, x), x)


def get_institutions_response_body200_read_from_dict(s: Any) -> List[GetInstitutionsResponseBody200_ReadElement]:
    return from_list(GetInstitutionsResponseBody200_ReadElement.from_dict, s)


def get_institutions_response_body200_read_to_dict(x: List[GetInstitutionsResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetInstitutionsResponseBody200_ReadElement, x), x)


def post_institutions_request_body_from_dict(s: Any) -> PostInstitutionsRequestBody:
    return PostInstitutionsRequestBody.from_dict(s)


def post_institutions_request_body_to_dict(x: PostInstitutionsRequestBody) -> Any:
    return to_class(PostInstitutionsRequestBody, x)


def post_institutions_request_body_write_from_dict(s: Any) -> PostInstitutionsRequestBodyWrite:
    return PostInstitutionsRequestBodyWrite.from_dict(s)


def post_institutions_request_body_write_to_dict(x: PostInstitutionsRequestBodyWrite) -> Any:
    return to_class(PostInstitutionsRequestBodyWrite, x)


def post_institutions_request_body_read_from_dict(s: Any) -> PostInstitutionsRequestBodyRead:
    return PostInstitutionsRequestBodyRead.from_dict(s)


def post_institutions_request_body_read_to_dict(x: PostInstitutionsRequestBodyRead) -> Any:
    return to_class(PostInstitutionsRequestBodyRead, x)


def post_institutions_response_body201_from_dict(s: Any) -> PostInstitutionsResponseBody201:
    return PostInstitutionsResponseBody201.from_dict(s)


def post_institutions_response_body201_to_dict(x: PostInstitutionsResponseBody201) -> Any:
    return to_class(PostInstitutionsResponseBody201, x)


def post_institutions_response_body201_write_from_dict(s: Any) -> PostInstitutionsResponseBody201_Write:
    return PostInstitutionsResponseBody201_Write.from_dict(s)


def post_institutions_response_body201_write_to_dict(x: PostInstitutionsResponseBody201_Write) -> Any:
    return to_class(PostInstitutionsResponseBody201_Write, x)


def post_institutions_response_body201_read_from_dict(s: Any) -> PostInstitutionsResponseBody201_Read:
    return PostInstitutionsResponseBody201_Read.from_dict(s)


def post_institutions_response_body201_read_to_dict(x: PostInstitutionsResponseBody201_Read) -> Any:
    return to_class(PostInstitutionsResponseBody201_Read, x)


def get_institution_response_body200_from_dict(s: Any) -> GetInstitutionResponseBody200:
    return GetInstitutionResponseBody200.from_dict(s)


def get_institution_response_body200_to_dict(x: GetInstitutionResponseBody200) -> Any:
    return to_class(GetInstitutionResponseBody200, x)


def get_institution_response_body200_write_from_dict(s: Any) -> GetInstitutionResponseBody200_Write:
    return GetInstitutionResponseBody200_Write.from_dict(s)


def get_institution_response_body200_write_to_dict(x: GetInstitutionResponseBody200_Write) -> Any:
    return to_class(GetInstitutionResponseBody200_Write, x)


def get_institution_response_body200_read_from_dict(s: Any) -> GetInstitutionResponseBody200_Read:
    return GetInstitutionResponseBody200_Read.from_dict(s)


def get_institution_response_body200_read_to_dict(x: GetInstitutionResponseBody200_Read) -> Any:
    return to_class(GetInstitutionResponseBody200_Read, x)


def patch_institution_request_body_from_dict(s: Any) -> PatchInstitutionRequestBody:
    return PatchInstitutionRequestBody.from_dict(s)


def patch_institution_request_body_to_dict(x: PatchInstitutionRequestBody) -> Any:
    return to_class(PatchInstitutionRequestBody, x)


def patch_institution_request_body_write_from_dict(s: Any) -> PatchInstitutionRequestBodyWrite:
    return PatchInstitutionRequestBodyWrite.from_dict(s)


def patch_institution_request_body_write_to_dict(x: PatchInstitutionRequestBodyWrite) -> Any:
    return to_class(PatchInstitutionRequestBodyWrite, x)


def patch_institution_request_body_read_from_dict(s: Any) -> PatchInstitutionRequestBodyRead:
    return PatchInstitutionRequestBodyRead.from_dict(s)


def patch_institution_request_body_read_to_dict(x: PatchInstitutionRequestBodyRead) -> Any:
    return to_class(PatchInstitutionRequestBodyRead, x)


def patch_institution_response_body200_from_dict(s: Any) -> PatchInstitutionResponseBody200:
    return PatchInstitutionResponseBody200.from_dict(s)


def patch_institution_response_body200_to_dict(x: PatchInstitutionResponseBody200) -> Any:
    return to_class(PatchInstitutionResponseBody200, x)


def patch_institution_response_body200_write_from_dict(s: Any) -> PatchInstitutionResponseBody200_Write:
    return PatchInstitutionResponseBody200_Write.from_dict(s)


def patch_institution_response_body200_write_to_dict(x: PatchInstitutionResponseBody200_Write) -> Any:
    return to_class(PatchInstitutionResponseBody200_Write, x)


def patch_institution_response_body200_read_from_dict(s: Any) -> PatchInstitutionResponseBody200_Read:
    return PatchInstitutionResponseBody200_Read.from_dict(s)


def patch_institution_response_body200_read_to_dict(x: PatchInstitutionResponseBody200_Read) -> Any:
    return to_class(PatchInstitutionResponseBody200_Read, x)


def get_updates_response_body200_from_dict(s: Any) -> List[GetUpdatesResponseBody200_Element]:
    return from_list(GetUpdatesResponseBody200_Element.from_dict, s)


def get_updates_response_body200_to_dict(x: List[GetUpdatesResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetUpdatesResponseBody200_Element, x), x)


def get_updates_response_body200_write_from_dict(s: Any) -> List[GetUpdatesResponseBody200_WriteElement]:
    return from_list(GetUpdatesResponseBody200_WriteElement.from_dict, s)


def get_updates_response_body200_write_to_dict(x: List[GetUpdatesResponseBody200_WriteElement]) -> Any:
    return from_list(lambda x: to_class(GetUpdatesResponseBody200_WriteElement, x), x)


def get_updates_response_body200_read_from_dict(s: Any) -> List[GetUpdatesResponseBody200_ReadElement]:
    return from_list(GetUpdatesResponseBody200_ReadElement.from_dict, s)


def get_updates_response_body200_read_to_dict(x: List[GetUpdatesResponseBody200_ReadElement]) -> Any:
    return from_list(lambda x: to_class(GetUpdatesResponseBody200_ReadElement, x), x)


def post_updates_request_body_from_dict(s: Any) -> PostUpdatesRequestBody:
    return PostUpdatesRequestBody.from_dict(s)


def post_updates_request_body_to_dict(x: PostUpdatesRequestBody) -> Any:
    return to_class(PostUpdatesRequestBody, x)


def post_updates_request_body_write_from_dict(s: Any) -> PostUpdatesRequestBodyWrite:
    return PostUpdatesRequestBodyWrite.from_dict(s)


def post_updates_request_body_write_to_dict(x: PostUpdatesRequestBodyWrite) -> Any:
    return to_class(PostUpdatesRequestBodyWrite, x)


def post_updates_request_body_read_from_dict(s: Any) -> PostUpdatesRequestBodyRead:
    return PostUpdatesRequestBodyRead.from_dict(s)


def post_updates_request_body_read_to_dict(x: PostUpdatesRequestBodyRead) -> Any:
    return to_class(PostUpdatesRequestBodyRead, x)


def post_updates_response_body201_from_dict(s: Any) -> PostUpdatesResponseBody201:
    return PostUpdatesResponseBody201.from_dict(s)


def post_updates_response_body201_to_dict(x: PostUpdatesResponseBody201) -> Any:
    return to_class(PostUpdatesResponseBody201, x)


def post_updates_response_body201_write_from_dict(s: Any) -> PostUpdatesResponseBody201_Write:
    return PostUpdatesResponseBody201_Write.from_dict(s)


def post_updates_response_body201_write_to_dict(x: PostUpdatesResponseBody201_Write) -> Any:
    return to_class(PostUpdatesResponseBody201_Write, x)


def post_updates_response_body201_read_from_dict(s: Any) -> PostUpdatesResponseBody201_Read:
    return PostUpdatesResponseBody201_Read.from_dict(s)


def post_updates_response_body201_read_to_dict(x: PostUpdatesResponseBody201_Read) -> Any:
    return to_class(PostUpdatesResponseBody201_Read, x)


def patch_update_request_body_from_dict(s: Any) -> PatchUpdateRequestBody:
    return PatchUpdateRequestBody.from_dict(s)


def patch_update_request_body_to_dict(x: PatchUpdateRequestBody) -> Any:
    return to_class(PatchUpdateRequestBody, x)


def patch_update_request_body_write_from_dict(s: Any) -> PatchUpdateRequestBodyWrite:
    return PatchUpdateRequestBodyWrite.from_dict(s)


def patch_update_request_body_write_to_dict(x: PatchUpdateRequestBodyWrite) -> Any:
    return to_class(PatchUpdateRequestBodyWrite, x)


def patch_update_request_body_read_from_dict(s: Any) -> PatchUpdateRequestBodyRead:
    return PatchUpdateRequestBodyRead.from_dict(s)


def patch_update_request_body_read_to_dict(x: PatchUpdateRequestBodyRead) -> Any:
    return to_class(PatchUpdateRequestBodyRead, x)


def patch_update_response_body200_from_dict(s: Any) -> PatchUpdateResponseBody200:
    return PatchUpdateResponseBody200.from_dict(s)


def patch_update_response_body200_to_dict(x: PatchUpdateResponseBody200) -> Any:
    return to_class(PatchUpdateResponseBody200, x)


def patch_update_response_body200_write_from_dict(s: Any) -> PatchUpdateResponseBody200_Write:
    return PatchUpdateResponseBody200_Write.from_dict(s)


def patch_update_response_body200_write_to_dict(x: PatchUpdateResponseBody200_Write) -> Any:
    return to_class(PatchUpdateResponseBody200_Write, x)


def patch_update_response_body200_read_from_dict(s: Any) -> PatchUpdateResponseBody200_Read:
    return PatchUpdateResponseBody200_Read.from_dict(s)


def patch_update_response_body200_read_to_dict(x: PatchUpdateResponseBody200_Read) -> Any:
    return to_class(PatchUpdateResponseBody200_Read, x)
