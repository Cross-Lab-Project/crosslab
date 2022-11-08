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
#     result = post_login_response_body201_from_dict(json.loads(json_string))
#     result = post_logout_request_body_from_dict(json.loads(json_string))
#     result = post_device_token_response_body200_from_dict(json.loads(json_string))
#     result = get_users_response_body200_from_dict(json.loads(json_string))
#     result = post_users_request_body_from_dict(json.loads(json_string))
#     result = post_users_response_body201_from_dict(json.loads(json_string))
#     result = get_user_response_body200_from_dict(json.loads(json_string))
#     result = patch_user_request_body_from_dict(json.loads(json_string))
#     result = patch_user_response_body200_from_dict(json.loads(json_string))
#     result = put_user_roles_response_body200_from_dict(json.loads(json_string))
#     result = get_identity_response_body200_from_dict(json.loads(json_string))
#     result = patch_identity_request_body_from_dict(json.loads(json_string))
#     result = patch_identity_response_body200_from_dict(json.loads(json_string))
#     result = post_schedule_request_body_from_dict(json.loads(json_string))
#     result = post_schedule_response_body200_from_dict(json.loads(json_string))
#     result = post_schedule_response_body404_from_dict(json.loads(json_string))
#     result = post_schedule_response_body422_from_dict(json.loads(json_string))
#     result = post_schedule_response_body500_from_dict(json.loads(json_string))
#     result = put_booking_request_body_from_dict(json.loads(json_string))
#     result = put_booking_response_body200_from_dict(json.loads(json_string))
#     result = put_booking_response_body500_from_dict(json.loads(json_string))
#     result = patch_booking_request_body_from_dict(json.loads(json_string))
#     result = patch_booking_response_body200_from_dict(json.loads(json_string))
#     result = patch_booking_response_body500_from_dict(json.loads(json_string))
#     result = delete_booking_response_body500_from_dict(json.loads(json_string))
#     result = get_booking_response_body200_from_dict(json.loads(json_string))
#     result = get_booking_response_body500_from_dict(json.loads(json_string))
#     result = delete_booking_destroy_response_body500_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body200_from_dict(json.loads(json_string))
#     result = put_booking_lock_response_body500_from_dict(json.loads(json_string))
#     result = delete_booking_lock_response_body500_from_dict(json.loads(json_string))
#     result = post_booking_callback_response_body500_from_dict(json.loads(json_string))
#     result = get_devices_response_body200_from_dict(json.loads(json_string))
#     result = post_devices_request_body_from_dict(json.loads(json_string))
#     result = post_devices_response_body201_from_dict(json.loads(json_string))
#     result = get_device_response_body200_from_dict(json.loads(json_string))
#     result = patch_device_request_body_from_dict(json.loads(json_string))
#     result = patch_device_response_body200_from_dict(json.loads(json_string))
#     result = post_device_response_body201_from_dict(json.loads(json_string))
#     result = post_device_availability_request_body_from_dict(json.loads(json_string))
#     result = post_device_availability_response_body200_from_dict(json.loads(json_string))
#     result = purple_post_device_token_response_body200_from_dict(json.loads(json_string))
#     result = post_device_signaling_request_body_from_dict(json.loads(json_string))
#     result = get_peerconnections_response_body200_from_dict(json.loads(json_string))
#     result = post_peerconnections_request_body_from_dict(json.loads(json_string))
#     result = post_peerconnections_response_body201_from_dict(json.loads(json_string))
#     result = get_peerconnection_response_body200_from_dict(json.loads(json_string))
#     result = get_experiments_response_body200_from_dict(json.loads(json_string))
#     result = post_experiments_request_body_from_dict(json.loads(json_string))
#     result = post_experiments_response_body201_from_dict(json.loads(json_string))
#     result = get_experiment_response_body200_from_dict(json.loads(json_string))
#     result = patch_experiment_request_body_from_dict(json.loads(json_string))
#     result = patch_experiment_response_body200_from_dict(json.loads(json_string))

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
    LOCAL = "local"
    TUI = "tui"


class PostLoginRequestBody:
    password: str
    username: str
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
        result["method"] = from_union([lambda x: to_enum(AuthMethod, x), from_none], self.method)
        return result


class PostLogoutRequestBody:
    """The token to be invalidated"""
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
        result["token"] = from_union([from_str, from_none], self.token)
        return result


class GetUsersResponseBody200_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'GetUsersResponseBody200_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return GetUsersResponseBody200_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class User:
    password: Optional[str]
    roles: Optional[List[GetUsersResponseBody200_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[GetUsersResponseBody200_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'User':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUsersResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return User(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUsersResponseBody200_Role, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PostUsersRequestBodyRole:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersRequestBodyRole':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PostUsersRequestBodyRole(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PostUsersRequestBody:
    password: Optional[str]
    roles: Optional[List[PostUsersRequestBodyRole]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PostUsersRequestBodyRole]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersRequestBody':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PostUsersRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PostUsersRequestBody(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostUsersRequestBodyRole, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PostUsersResponseBody201_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PostUsersResponseBody201_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PostUsersResponseBody201:
    password: Optional[str]
    roles: Optional[List[PostUsersResponseBody201_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PostUsersResponseBody201_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PostUsersResponseBody201':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PostUsersResponseBody201_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PostUsersResponseBody201(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostUsersResponseBody201_Role, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetUserResponseBody200_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return GetUserResponseBody200_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class GetUserResponseBody200:
    password: Optional[str]
    roles: Optional[List[GetUserResponseBody200_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[GetUserResponseBody200_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetUserResponseBody200':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetUserResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetUserResponseBody200(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetUserResponseBody200_Role, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserRequestBodyRole:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserRequestBodyRole':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PatchUserRequestBodyRole(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PatchUserRequestBody:
    password: Optional[str]
    roles: Optional[List[PatchUserRequestBodyRole]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PatchUserRequestBodyRole]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserRequestBody':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchUserRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserRequestBody(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchUserRequestBodyRole, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchUserResponseBody200_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PatchUserResponseBody200_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PatchUserResponseBody200:
    password: Optional[str]
    roles: Optional[List[PatchUserResponseBody200_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PatchUserResponseBody200_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchUserResponseBody200':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchUserResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchUserResponseBody200(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchUserResponseBody200_Role, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PutUserRolesResponseBody200_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PutUserRolesResponseBody200_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PutUserRolesResponseBody200_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PutUserRolesResponseBody200:
    password: Optional[str]
    roles: Optional[List[PutUserRolesResponseBody200_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PutUserRolesResponseBody200_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PutUserRolesResponseBody200':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PutUserRolesResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PutUserRolesResponseBody200(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PutUserRolesResponseBody200_Role, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class GetIdentityResponseBody200_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return GetIdentityResponseBody200_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class GetIdentityResponseBody200:
    password: Optional[str]
    roles: Optional[List[GetIdentityResponseBody200_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[GetIdentityResponseBody200_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'GetIdentityResponseBody200':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(GetIdentityResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return GetIdentityResponseBody200(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetIdentityResponseBody200_Role, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityRequestBodyRole:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBodyRole':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PatchIdentityRequestBodyRole(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PatchIdentityRequestBody:
    password: Optional[str]
    roles: Optional[List[PatchIdentityRequestBodyRole]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PatchIdentityRequestBodyRole]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityRequestBody':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityRequestBody(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityRequestBodyRole, x), x), from_none], self.roles)
        result["username"] = from_union([from_str, from_none], self.username)
        return result


class PatchIdentityResponseBody200_Role:
    name: Optional[str]
    scopes: Optional[List[str]]

    def __init__(self, name: Optional[str], scopes: Optional[List[str]]) -> None:
        self.name = name
        self.scopes = scopes

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200_Role':
        assert isinstance(obj, dict)
        name = from_union([from_str, from_none], obj.get("name"))
        scopes = from_union([lambda x: from_list(from_str, x), from_none], obj.get("scopes"))
        return PatchIdentityResponseBody200_Role(name, scopes)

    def to_dict(self) -> dict:
        result: dict = {}
        result["name"] = from_union([from_str, from_none], self.name)
        result["scopes"] = from_union([lambda x: from_list(from_str, x), from_none], self.scopes)
        return result


class PatchIdentityResponseBody200:
    password: Optional[str]
    roles: Optional[List[PatchIdentityResponseBody200_Role]]
    username: Optional[str]

    def __init__(self, password: Optional[str], roles: Optional[List[PatchIdentityResponseBody200_Role]], username: Optional[str]) -> None:
        self.password = password
        self.roles = roles
        self.username = username

    @staticmethod
    def from_dict(obj: Any) -> 'PatchIdentityResponseBody200':
        assert isinstance(obj, dict)
        password = from_union([from_str, from_none], obj.get("password"))
        roles = from_union([lambda x: from_list(PatchIdentityResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        username = from_union([from_str, from_none], obj.get("username"))
        return PatchIdentityResponseBody200(password, roles, username)

    def to_dict(self) -> dict:
        result: dict = {}
        result["password"] = from_union([from_str, from_none], self.password)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchIdentityResponseBody200_Role, x), x), from_none], self.roles)
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
        result["Combined"] = from_union([from_bool, from_none], self.combined)
        result["Experiment"] = to_class(PostScheduleRequestBodyExperiment, self.experiment)
        result["onlyOwn"] = from_union([from_bool, from_none], self.only_own)
        result["Time"] = to_class(PostScheduleRequestBodyTime, self.time)
        return result


class Booked:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'Booked':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return Booked(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class Free:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'Free':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return Free(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["End"] = self.end.isoformat()
        result["Start"] = self.start.isoformat()
        return result


class PostScheduleResponseBody200_Element:
    """Array of booked times."""
    booked: List[Booked]
    """ID of the device (or * if combined)."""
    device: str
    """Array of free times."""
    free: List[Free]

    def __init__(self, booked: List[Booked], device: str, free: List[Free]) -> None:
        self.booked = booked
        self.device = device
        self.free = free

    @staticmethod
    def from_dict(obj: Any) -> 'PostScheduleResponseBody200_Element':
        assert isinstance(obj, dict)
        booked = from_list(Booked.from_dict, obj.get("Booked"))
        device = from_str(obj.get("Device"))
        free = from_list(Free.from_dict, obj.get("Free"))
        return PostScheduleResponseBody200_Element(booked, device, free)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booked"] = from_list(lambda x: to_class(Booked, x), self.booked)
        result["Device"] = from_str(self.device)
        result["Free"] = from_list(lambda x: to_class(Free, x), self.free)
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


class PutBookingRequestBodyExperiment:
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
    def from_dict(obj: Any) -> 'PutBookingRequestBodyExperiment':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("Description"))
        devices = from_list(FluffyDevice.from_dict, obj.get("Devices"))
        return PutBookingRequestBodyExperiment(description, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Description"] = from_union([from_str, from_none], self.description)
        result["Devices"] = from_list(lambda x: to_class(FluffyDevice, x), self.devices)
        return result


class PutBookingRequestBodyTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingRequestBodyTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PutBookingRequestBodyTime(end, start)

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


class PutBookingRequestBody:
    """An experiment describes a set of devices and how they should be connected (potentially
    among other metadata).
    """
    experiment: PutBookingRequestBodyExperiment
    """A time slot represents a slice of time used for bookings."""
    time: PutBookingRequestBodyTime
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]

    def __init__(self, experiment: PutBookingRequestBodyExperiment, time: PutBookingRequestBodyTime, type: Optional[TypeEnum]) -> None:
        self.experiment = experiment
        self.time = time
        self.type = type

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingRequestBody':
        assert isinstance(obj, dict)
        experiment = PutBookingRequestBodyExperiment.from_dict(obj.get("Experiment"))
        time = PutBookingRequestBodyTime.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        return PutBookingRequestBody(experiment, time, type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Experiment"] = to_class(PutBookingRequestBodyExperiment, self.experiment)
        result["Time"] = to_class(PutBookingRequestBodyTime, self.time)
        result["Type"] = from_union([lambda x: to_enum(TypeEnum, x), from_none], self.type)
        return result


class PutBookingResponseBody200:
    """ID at which the booking can be managed."""
    booking_id: str

    def __init__(self, booking_id: str) -> None:
        self.booking_id = booking_id

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingResponseBody200':
        assert isinstance(obj, dict)
        booking_id = from_str(obj.get("BookingID"))
        return PutBookingResponseBody200(booking_id)

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
        result["Devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchBookingRequestBodyDevice, x), x), from_none], self.devices)
        result["Locked"] = from_union([from_bool, from_none], self.locked)
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


class PurpleTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PurpleTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return PurpleTime(end, start)

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
    time: PurpleTime
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: PurpleTime, type: Optional[TypeEnum], you: bool) -> None:
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
        time = PurpleTime.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return GetBookingResponseBody200_Booking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(PurpleTime, self.time)
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


class FluffyTime:
    """A time slot represents a slice of time used for bookings."""
    """End time of the booking."""
    end: datetime
    """Start time of the booking."""
    start: datetime

    def __init__(self, end: datetime, start: datetime) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'FluffyTime':
        assert isinstance(obj, dict)
        end = from_datetime(obj.get("End"))
        start = from_datetime(obj.get("Start"))
        return FluffyTime(end, start)

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
    time: FluffyTime
    """Type of booking. Currently, only one type is defined, but others might follow (e.g.
    priority booking). If empty, 'normal' is assumed.
    """
    type: Optional[TypeEnum]
    """If true, this booking was done by you."""
    you: bool

    def __init__(self, devices: List[str], external: bool, id: str, message: Optional[str], status: Status, time: FluffyTime, type: Optional[TypeEnum], you: bool) -> None:
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
        time = FluffyTime.from_dict(obj.get("Time"))
        type = from_union([TypeEnum, from_none], obj.get("Type"))
        you = from_bool(obj.get("You"))
        return PutBookingLockResponseBody200_Booking(devices, external, id, message, status, time, type, you)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Devices"] = from_list(from_str, self.devices)
        result["External"] = from_bool(self.external)
        result["ID"] = from_str(self.id)
        result["Message"] = from_union([from_str, from_none], self.message)
        result["Status"] = to_enum(Status, self.status)
        result["Time"] = to_class(FluffyTime, self.time)
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


class Token:
    device: Optional[str]
    token: Optional[str]

    def __init__(self, device: Optional[str], token: Optional[str]) -> None:
        self.device = device
        self.token = token

    @staticmethod
    def from_dict(obj: Any) -> 'Token':
        assert isinstance(obj, dict)
        device = from_union([from_str, from_none], obj.get("Device"))
        token = from_union([from_str, from_none], obj.get("Token"))
        return Token(device, token)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Device"] = from_union([from_str, from_none], self.device)
        result["Token"] = from_union([from_str, from_none], self.token)
        return result


class PutBookingLockResponseBody200:
    """A booking in the booking system."""
    booking: PutBookingLockResponseBody200_Booking
    """A time slot represents a slice of time used for bookings."""
    time: PutBookingLockResponseBody200_Time
    """A list of access tokens"""
    tokens: List[Token]

    def __init__(self, booking: PutBookingLockResponseBody200_Booking, time: PutBookingLockResponseBody200_Time, tokens: List[Token]) -> None:
        self.booking = booking
        self.time = time
        self.tokens = tokens

    @staticmethod
    def from_dict(obj: Any) -> 'PutBookingLockResponseBody200':
        assert isinstance(obj, dict)
        booking = PutBookingLockResponseBody200_Booking.from_dict(obj.get("Booking"))
        time = PutBookingLockResponseBody200_Time.from_dict(obj.get("Time"))
        tokens = from_list(Token.from_dict, obj.get("Tokens"))
        return PutBookingLockResponseBody200(booking, time, tokens)

    def to_dict(self) -> dict:
        result: dict = {}
        result["Booking"] = to_class(PutBookingLockResponseBody200_Booking, self.booking)
        result["Time"] = to_class(PutBookingLockResponseBody200_Time, self.time)
        result["Tokens"] = from_list(lambda x: to_class(Token, x), self.tokens)
        return result


class GetDevicesResponseBody200_Type(Enum):
    """Type of the device"""
    DEVICE = "device"
    GROUP = "group"
    VIRTUAL = "virtual"


class DeviceOverview:
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
    def from_dict(obj: Any) -> 'DeviceOverview':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        return DeviceOverview(description, name, owner, type, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
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
        result["count"] = from_union([from_int, from_none], self.count)
        result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
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
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        result["available"] = from_union([from_bool, from_none], self.available)
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

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesRequestBodyAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesRequestBodyDevice]]) -> None:
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
        return PostDevicesRequestBody(description, name, owner, type, url, announced_availability, connected, experiment, services, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        result["url"] = from_union([from_str, from_none], self.url)
        result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyAvailabilityRule, x), x), from_none], self.announced_availability)
        result["connected"] = from_union([from_bool, from_none], self.connected)
        result["experiment"] = from_union([from_str, from_none], self.experiment)
        result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesRequestBodyDevice, x), x), from_none], self.devices)
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
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
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

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDevicesResponseBody201_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PostDevicesResponseBody201_Device]]) -> None:
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
        return PostDevicesResponseBody201(description, name, owner, type, url, announced_availability, connected, experiment, services, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        result["url"] = from_union([from_str, from_none], self.url)
        result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        result["connected"] = from_union([from_bool, from_none], self.connected)
        result["experiment"] = from_union([from_str, from_none], self.experiment)
        result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostDevicesResponseBody201_Device, x), x), from_none], self.devices)
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
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
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

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[GetDeviceResponseBody200_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[GetDeviceResponseBody200_Device]]) -> None:
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
        return GetDeviceResponseBody200(description, name, owner, type, url, announced_availability, connected, experiment, services, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        result["url"] = from_union([from_str, from_none], self.url)
        result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        result["connected"] = from_union([from_bool, from_none], self.connected)
        result["experiment"] = from_union([from_str, from_none], self.experiment)
        result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetDeviceResponseBody200_Device, x), x), from_none], self.devices)
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
        result["count"] = from_union([from_int, from_none], self.count)
        result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PatchDeviceRequestBodyAvailabilityRule:
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
    def from_dict(obj: Any) -> 'PatchDeviceRequestBodyAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([FluffyRepeat.from_dict, from_none], obj.get("repeat"))
        return PatchDeviceRequestBodyAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        result["available"] = from_union([from_bool, from_none], self.available)
        result["repeat"] = from_union([lambda x: to_class(FluffyRepeat, x), from_none], self.repeat)
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

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceRequestBodyAvailabilityRule]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceRequestBodyDevice]]) -> None:
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
        return PatchDeviceRequestBody(description, name, owner, type, url, announced_availability, connected, experiment, services, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        result["url"] = from_union([from_str, from_none], self.url)
        result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyAvailabilityRule, x), x), from_none], self.announced_availability)
        result["connected"] = from_union([from_bool, from_none], self.connected)
        result["experiment"] = from_union([from_str, from_none], self.experiment)
        result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceRequestBodyDevice, x), x), from_none], self.devices)
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
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
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

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PatchDeviceResponseBody200_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]], devices: Optional[List[PatchDeviceResponseBody200_Device]]) -> None:
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
        return PatchDeviceResponseBody200(description, name, owner, type, url, announced_availability, connected, experiment, services, devices)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        result["url"] = from_union([from_str, from_none], self.url)
        result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        result["connected"] = from_union([from_bool, from_none], self.connected)
        result["experiment"] = from_union([from_str, from_none], self.experiment)
        result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchDeviceResponseBody200_Device, x), x), from_none], self.devices)
        return result


class PostDeviceResponseBody201_AnnouncedAvailability:
    end: Optional[datetime]
    start: Optional[datetime]

    def __init__(self, end: Optional[datetime], start: Optional[datetime]) -> None:
        self.end = end
        self.start = start

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceResponseBody201_AnnouncedAvailability':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        return PostDeviceResponseBody201_AnnouncedAvailability(end, start)

    def to_dict(self) -> dict:
        result: dict = {}
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class PostDeviceResponseBody201:
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
    announced_availability: Optional[List[PostDeviceResponseBody201_AnnouncedAvailability]]
    """If true, the device is connected to the service and can be used."""
    connected: Optional[bool]
    experiment: Optional[str]
    services: Optional[List[Dict[str, Any]]]

    def __init__(self, description: Optional[str], name: Optional[str], owner: Optional[str], type: Optional[GetDevicesResponseBody200_Type], url: Optional[str], announced_availability: Optional[List[PostDeviceResponseBody201_AnnouncedAvailability]], connected: Optional[bool], experiment: Optional[str], services: Optional[List[Dict[str, Any]]]) -> None:
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
    def from_dict(obj: Any) -> 'PostDeviceResponseBody201':
        assert isinstance(obj, dict)
        description = from_union([from_str, from_none], obj.get("description"))
        name = from_union([from_str, from_none], obj.get("name"))
        owner = from_union([from_str, from_none], obj.get("owner"))
        type = from_union([GetDevicesResponseBody200_Type, from_none], obj.get("type"))
        url = from_union([from_str, from_none], obj.get("url"))
        announced_availability = from_union([lambda x: from_list(PostDeviceResponseBody201_AnnouncedAvailability.from_dict, x), from_none], obj.get("announcedAvailability"))
        connected = from_union([from_bool, from_none], obj.get("connected"))
        experiment = from_union([from_str, from_none], obj.get("experiment"))
        services = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], obj.get("services"))
        return PostDeviceResponseBody201(description, name, owner, type, url, announced_availability, connected, experiment, services)

    def to_dict(self) -> dict:
        result: dict = {}
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        result["owner"] = from_union([from_str, from_none], self.owner)
        result["type"] = from_union([lambda x: to_enum(GetDevicesResponseBody200_Type, x), from_none], self.type)
        result["url"] = from_union([from_str, from_none], self.url)
        result["announcedAvailability"] = from_union([lambda x: from_list(lambda x: to_class(PostDeviceResponseBody201_AnnouncedAvailability, x), x), from_none], self.announced_availability)
        result["connected"] = from_union([from_bool, from_none], self.connected)
        result["experiment"] = from_union([from_str, from_none], self.experiment)
        result["services"] = from_union([lambda x: from_list(lambda x: from_dict(lambda x: x, x), x), from_none], self.services)
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
        result["count"] = from_union([from_int, from_none], self.count)
        result["frequency"] = from_union([lambda x: to_enum(Frequency, x), from_none], self.frequency)
        result["until"] = from_union([lambda x: x.isoformat(), from_none], self.until)
        return result


class PurpleAvailabilityRule:
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
    def from_dict(obj: Any) -> 'PurpleAvailabilityRule':
        assert isinstance(obj, dict)
        end = from_union([from_datetime, from_none], obj.get("end"))
        start = from_union([from_datetime, from_none], obj.get("start"))
        available = from_union([from_bool, from_none], obj.get("available"))
        repeat = from_union([TentacledRepeat.from_dict, from_none], obj.get("repeat"))
        return PurpleAvailabilityRule(end, start, available, repeat)

    def to_dict(self) -> dict:
        result: dict = {}
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        result["available"] = from_union([from_bool, from_none], self.available)
        result["repeat"] = from_union([lambda x: to_class(TentacledRepeat, x), from_none], self.repeat)
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
        result["end"] = from_union([lambda x: x.isoformat(), from_none], self.end)
        result["start"] = from_union([lambda x: x.isoformat(), from_none], self.start)
        return result


class ConnectionType(Enum):
    WEBRTC = "webrtc"
    WEBSOCKET = "websocket"


class PostDeviceSignalingRequestBodyService:
    remote_service_id: Optional[str]
    service_id: Optional[str]
    service_type: Optional[str]

    def __init__(self, remote_service_id: Optional[str], service_id: Optional[str], service_type: Optional[str]) -> None:
        self.remote_service_id = remote_service_id
        self.service_id = service_id
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBodyService':
        assert isinstance(obj, dict)
        remote_service_id = from_union([from_str, from_none], obj.get("remoteServiceId"))
        service_id = from_union([from_str, from_none], obj.get("serviceId"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostDeviceSignalingRequestBodyService(remote_service_id, service_id, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        result["serviceId"] = from_union([from_str, from_none], self.service_id)
        result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class SignalingType(Enum):
    ANSWER = "answer"
    CANDIDATE = "candidate"
    OFFER = "offer"


class PostDeviceSignalingRequestBody:
    message_type: str
    command: Optional[str]
    connection_type: Optional[ConnectionType]
    connection_url: str
    services: Optional[List[PostDeviceSignalingRequestBodyService]]
    tiebreaker: Optional[bool]
    content: Optional[Dict[str, Any]]
    signaling_type: Optional[SignalingType]

    def __init__(self, message_type: str, command: Optional[str], connection_type: Optional[ConnectionType], connection_url: str, services: Optional[List[PostDeviceSignalingRequestBodyService]], tiebreaker: Optional[bool], content: Optional[Dict[str, Any]], signaling_type: Optional[SignalingType]) -> None:
        self.message_type = message_type
        self.command = command
        self.connection_type = connection_type
        self.connection_url = connection_url
        self.services = services
        self.tiebreaker = tiebreaker
        self.content = content
        self.signaling_type = signaling_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostDeviceSignalingRequestBody':
        assert isinstance(obj, dict)
        message_type = from_str(obj.get("messageType"))
        command = from_union([from_str, from_none], obj.get("command"))
        connection_type = from_union([ConnectionType, from_none], obj.get("connectionType"))
        connection_url = from_str(obj.get("connectionUrl"))
        services = from_union([lambda x: from_list(PostDeviceSignalingRequestBodyService.from_dict, x), from_none], obj.get("services"))
        tiebreaker = from_union([from_bool, from_none], obj.get("tiebreaker"))
        content = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("content"))
        signaling_type = from_union([SignalingType, from_none], obj.get("signalingType"))
        return PostDeviceSignalingRequestBody(message_type, command, connection_type, connection_url, services, tiebreaker, content, signaling_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["messageType"] = from_str(self.message_type)
        result["command"] = from_union([from_str, from_none], self.command)
        result["connectionType"] = from_union([lambda x: to_enum(ConnectionType, x), from_none], self.connection_type)
        result["connectionUrl"] = from_str(self.connection_url)
        result["services"] = from_union([lambda x: from_list(lambda x: to_class(PostDeviceSignalingRequestBodyService, x), x), from_none], self.services)
        result["tiebreaker"] = from_union([from_bool, from_none], self.tiebreaker)
        result["content"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.content)
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
        result["url"] = from_union([from_str, from_none], self.url)
        return result


class PeerconnectionOverview:
    devices: Optional[List[GetPeerconnectionsResponseBody200_Device]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[GetPeerconnectionsResponseBody200_Device]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PeerconnectionOverview':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionsResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PeerconnectionOverview(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionsResponseBody200_Device, x), x), from_none], self.devices)
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
        result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        result["serviceId"] = from_union([from_str, from_none], self.service_id)
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
        result["config"] = from_union([lambda x: to_class(PurpleConfig, x), from_none], self.config)
        result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsRequestBody:
    devices: Optional[List[PostPeerconnectionsRequestBodyDevice]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[PostPeerconnectionsRequestBodyDevice]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsRequestBody':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsRequestBody(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsRequestBodyDevice, x), x), from_none], self.devices)
        result["url"] = from_union([from_str, from_none], self.url)
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
        result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        result["serviceId"] = from_union([from_str, from_none], self.service_id)
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
        result["services"] = from_union([lambda x: from_list(lambda x: to_class(FluffyServiceConfig, x), x), from_none], self.services)
        return result


class PostPeerconnectionsResponseBody201_Device:
    config: Optional[FluffyConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[FluffyConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201_Device':
        assert isinstance(obj, dict)
        config = from_union([FluffyConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody201_Device(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["config"] = from_union([lambda x: to_class(FluffyConfig, x), from_none], self.config)
        result["url"] = from_union([from_str, from_none], self.url)
        return result


class PostPeerconnectionsResponseBody201:
    devices: Optional[List[PostPeerconnectionsResponseBody201_Device]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[PostPeerconnectionsResponseBody201_Device]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'PostPeerconnectionsResponseBody201':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(PostPeerconnectionsResponseBody201_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return PostPeerconnectionsResponseBody201(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostPeerconnectionsResponseBody201_Device, x), x), from_none], self.devices)
        result["url"] = from_union([from_str, from_none], self.url)
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
        result["remoteServiceId"] = from_union([from_str, from_none], self.remote_service_id)
        result["serviceId"] = from_union([from_str, from_none], self.service_id)
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
        result["services"] = from_union([lambda x: from_list(lambda x: to_class(TentacledServiceConfig, x), x), from_none], self.services)
        return result


class GetPeerconnectionResponseBody200_Device:
    config: Optional[TentacledConfig]
    """URL of the device"""
    url: Optional[str]

    def __init__(self, config: Optional[TentacledConfig], url: Optional[str]) -> None:
        self.config = config
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200_Device':
        assert isinstance(obj, dict)
        config = from_union([TentacledConfig.from_dict, from_none], obj.get("config"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionResponseBody200_Device(config, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["config"] = from_union([lambda x: to_class(TentacledConfig, x), from_none], self.config)
        result["url"] = from_union([from_str, from_none], self.url)
        return result


class GetPeerconnectionResponseBody200:
    devices: Optional[List[GetPeerconnectionResponseBody200_Device]]
    """URL of the peerconnection"""
    url: Optional[str]

    def __init__(self, devices: Optional[List[GetPeerconnectionResponseBody200_Device]], url: Optional[str]) -> None:
        self.devices = devices
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetPeerconnectionResponseBody200':
        assert isinstance(obj, dict)
        devices = from_union([lambda x: from_list(GetPeerconnectionResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetPeerconnectionResponseBody200(devices, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetPeerconnectionResponseBody200_Device, x), x), from_none], self.devices)
        result["url"] = from_union([from_str, from_none], self.url)
        return result


class StatusEnum(Enum):
    """Status of the experiment"""
    BOOKED = "booked"
    CREATED = "created"
    FINISHED = "finished"
    RUNNING = "running"


class GetExperimentsResponseBody200_Element:
    """Status of the experiment"""
    status: Optional[StatusEnum]
    """URL of the experiment"""
    url: Optional[str]

    def __init__(self, status: Optional[StatusEnum], url: Optional[str]) -> None:
        self.status = status
        self.url = url

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentsResponseBody200_Element':
        assert isinstance(obj, dict)
        status = from_union([StatusEnum, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        return GetExperimentsResponseBody200_Element(status, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["status"] = from_union([lambda x: to_enum(StatusEnum, x), from_none], self.status)
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
        result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsRequestBodyDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """Name for an experiment role."""
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
        result["device"] = from_union([from_str, from_none], self.device)
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
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        return result


class PurpleParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """Name for an experiment role."""
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
        result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        result["role"] = from_union([from_str, from_none], self.role)
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
        result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        result["participants"] = from_union([lambda x: from_list(lambda x: to_class(PurpleParticipant, x), x), from_none], self.participants)
        result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsRequestBody:
    """Status of the experiment"""
    status: Optional[StatusEnum]
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

    def __init__(self, status: Optional[StatusEnum], url: Optional[str], booking_time: Optional[PostExperimentsRequestBodyBookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsRequestBodyDevice]], roles: Optional[List[PostExperimentsRequestBodyRole]], service_configurations: Optional[List[PostExperimentsRequestBodyServiceConfiguration]]) -> None:
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
        status = from_union([StatusEnum, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsRequestBodyBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsRequestBodyServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsRequestBody(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        result["status"] = from_union([lambda x: to_enum(StatusEnum, x), from_none], self.status)
        result["url"] = from_union([from_str, from_none], self.url)
        result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsRequestBodyBookingTime, x), from_none], self.booking_time)
        result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyDevice, x), x), from_none], self.devices)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyRole, x), x), from_none], self.roles)
        result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsRequestBodyServiceConfiguration, x), x), from_none], self.service_configurations)
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
        result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PostExperimentsResponseBody201_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """Name for an experiment role."""
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
        result["device"] = from_union([from_str, from_none], self.device)
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
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        return result


class FluffyParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """Name for an experiment role."""
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
        result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        result["role"] = from_union([from_str, from_none], self.role)
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
    participants: Optional[List[FluffyParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[FluffyParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PostExperimentsResponseBody201_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(FluffyParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PostExperimentsResponseBody201_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        result["participants"] = from_union([lambda x: from_list(lambda x: to_class(FluffyParticipant, x), x), from_none], self.participants)
        result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PostExperimentsResponseBody201:
    """Status of the experiment"""
    status: Optional[StatusEnum]
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

    def __init__(self, status: Optional[StatusEnum], url: Optional[str], booking_time: Optional[PostExperimentsResponseBody201_BookingTime], connections: Optional[List[str]], devices: Optional[List[PostExperimentsResponseBody201_Device]], roles: Optional[List[PostExperimentsResponseBody201_Role]], service_configurations: Optional[List[PostExperimentsResponseBody201_ServiceConfiguration]]) -> None:
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
        status = from_union([StatusEnum, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PostExperimentsResponseBody201_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PostExperimentsResponseBody201_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PostExperimentsResponseBody201_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PostExperimentsResponseBody201_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PostExperimentsResponseBody201(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        result["status"] = from_union([lambda x: to_enum(StatusEnum, x), from_none], self.status)
        result["url"] = from_union([from_str, from_none], self.url)
        result["bookingTime"] = from_union([lambda x: to_class(PostExperimentsResponseBody201_BookingTime, x), from_none], self.booking_time)
        result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_Device, x), x), from_none], self.devices)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_Role, x), x), from_none], self.roles)
        result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PostExperimentsResponseBody201_ServiceConfiguration, x), x), from_none], self.service_configurations)
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
        result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class GetExperimentResponseBody200_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """Name for an experiment role."""
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
        result["device"] = from_union([from_str, from_none], self.device)
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
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        return result


class TentacledParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """Name for an experiment role."""
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
        result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        result["role"] = from_union([from_str, from_none], self.role)
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
    participants: Optional[List[TentacledParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[TentacledParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'GetExperimentResponseBody200_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(TentacledParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return GetExperimentResponseBody200_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        result["participants"] = from_union([lambda x: from_list(lambda x: to_class(TentacledParticipant, x), x), from_none], self.participants)
        result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class GetExperimentResponseBody200:
    """Status of the experiment"""
    status: Optional[StatusEnum]
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

    def __init__(self, status: Optional[StatusEnum], url: Optional[str], booking_time: Optional[GetExperimentResponseBody200_BookingTime], connections: Optional[List[str]], devices: Optional[List[GetExperimentResponseBody200_Device]], roles: Optional[List[GetExperimentResponseBody200_Role]], service_configurations: Optional[List[GetExperimentResponseBody200_ServiceConfiguration]]) -> None:
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
        status = from_union([StatusEnum, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([GetExperimentResponseBody200_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(GetExperimentResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(GetExperimentResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(GetExperimentResponseBody200_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return GetExperimentResponseBody200(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        result["status"] = from_union([lambda x: to_enum(StatusEnum, x), from_none], self.status)
        result["url"] = from_union([from_str, from_none], self.url)
        result["bookingTime"] = from_union([lambda x: to_class(GetExperimentResponseBody200_BookingTime, x), from_none], self.booking_time)
        result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_Device, x), x), from_none], self.devices)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_Role, x), x), from_none], self.roles)
        result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(GetExperimentResponseBody200_ServiceConfiguration, x), x), from_none], self.service_configurations)
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
        result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentRequestBodyDevice:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """Name for an experiment role."""
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
        result["device"] = from_union([from_str, from_none], self.device)
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
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        return result


class StickyParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """Name for an experiment role."""
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
        result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        result["role"] = from_union([from_str, from_none], self.role)
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
    participants: Optional[List[StickyParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[StickyParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentRequestBodyServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(StickyParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentRequestBodyServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        result["participants"] = from_union([lambda x: from_list(lambda x: to_class(StickyParticipant, x), x), from_none], self.participants)
        result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentRequestBody:
    """Status of the experiment"""
    status: Optional[StatusEnum]
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

    def __init__(self, status: Optional[StatusEnum], url: Optional[str], booking_time: Optional[PatchExperimentRequestBodyBookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentRequestBodyDevice]], roles: Optional[List[PatchExperimentRequestBodyRole]], service_configurations: Optional[List[PatchExperimentRequestBodyServiceConfiguration]]) -> None:
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
        status = from_union([StatusEnum, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentRequestBodyBookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentRequestBodyDevice.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentRequestBodyRole.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentRequestBodyServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentRequestBody(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        result["status"] = from_union([lambda x: to_enum(StatusEnum, x), from_none], self.status)
        result["url"] = from_union([from_str, from_none], self.url)
        result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentRequestBodyBookingTime, x), from_none], self.booking_time)
        result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyDevice, x), x), from_none], self.devices)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyRole, x), x), from_none], self.roles)
        result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentRequestBodyServiceConfiguration, x), x), from_none], self.service_configurations)
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
        result["endTime"] = from_union([lambda x: x.isoformat(), from_none], self.end_time)
        result["startTime"] = from_union([lambda x: x.isoformat(), from_none], self.start_time)
        return result


class PatchExperimentResponseBody200_Device:
    """URL to the
    [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    """
    device: Optional[str]
    """Name for an experiment role."""
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
        result["device"] = from_union([from_str, from_none], self.device)
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
        result["description"] = from_union([from_str, from_none], self.description)
        result["name"] = from_union([from_str, from_none], self.name)
        return result


class IndigoParticipant:
    """Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the
    service configuration send to the participant (fields of the participant configuration
    override the service configuration).
    """
    config: Optional[Dict[str, Any]]
    """Name for an experiment role."""
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
        result["config"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.config)
        result["role"] = from_union([from_str, from_none], self.role)
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
    participants: Optional[List[IndigoParticipant]]
    """Type of the service"""
    service_type: Optional[str]

    def __init__(self, configuration: Optional[Dict[str, Any]], participants: Optional[List[IndigoParticipant]], service_type: Optional[str]) -> None:
        self.configuration = configuration
        self.participants = participants
        self.service_type = service_type

    @staticmethod
    def from_dict(obj: Any) -> 'PatchExperimentResponseBody200_ServiceConfiguration':
        assert isinstance(obj, dict)
        configuration = from_union([lambda x: from_dict(lambda x: x, x), from_none], obj.get("configuration"))
        participants = from_union([lambda x: from_list(IndigoParticipant.from_dict, x), from_none], obj.get("participants"))
        service_type = from_union([from_str, from_none], obj.get("serviceType"))
        return PatchExperimentResponseBody200_ServiceConfiguration(configuration, participants, service_type)

    def to_dict(self) -> dict:
        result: dict = {}
        result["configuration"] = from_union([lambda x: from_dict(lambda x: x, x), from_none], self.configuration)
        result["participants"] = from_union([lambda x: from_list(lambda x: to_class(IndigoParticipant, x), x), from_none], self.participants)
        result["serviceType"] = from_union([from_str, from_none], self.service_type)
        return result


class PatchExperimentResponseBody200:
    """Status of the experiment"""
    status: Optional[StatusEnum]
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

    def __init__(self, status: Optional[StatusEnum], url: Optional[str], booking_time: Optional[PatchExperimentResponseBody200_BookingTime], connections: Optional[List[str]], devices: Optional[List[PatchExperimentResponseBody200_Device]], roles: Optional[List[PatchExperimentResponseBody200_Role]], service_configurations: Optional[List[PatchExperimentResponseBody200_ServiceConfiguration]]) -> None:
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
        status = from_union([StatusEnum, from_none], obj.get("status"))
        url = from_union([from_str, from_none], obj.get("url"))
        booking_time = from_union([PatchExperimentResponseBody200_BookingTime.from_dict, from_none], obj.get("bookingTime"))
        connections = from_union([lambda x: from_list(from_str, x), from_none], obj.get("connections"))
        devices = from_union([lambda x: from_list(PatchExperimentResponseBody200_Device.from_dict, x), from_none], obj.get("devices"))
        roles = from_union([lambda x: from_list(PatchExperimentResponseBody200_Role.from_dict, x), from_none], obj.get("roles"))
        service_configurations = from_union([lambda x: from_list(PatchExperimentResponseBody200_ServiceConfiguration.from_dict, x), from_none], obj.get("serviceConfigurations"))
        return PatchExperimentResponseBody200(status, url, booking_time, connections, devices, roles, service_configurations)

    def to_dict(self) -> dict:
        result: dict = {}
        result["status"] = from_union([lambda x: to_enum(StatusEnum, x), from_none], self.status)
        result["url"] = from_union([from_str, from_none], self.url)
        result["bookingTime"] = from_union([lambda x: to_class(PatchExperimentResponseBody200_BookingTime, x), from_none], self.booking_time)
        result["connections"] = from_union([lambda x: from_list(from_str, x), from_none], self.connections)
        result["devices"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_Device, x), x), from_none], self.devices)
        result["roles"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_Role, x), x), from_none], self.roles)
        result["serviceConfigurations"] = from_union([lambda x: from_list(lambda x: to_class(PatchExperimentResponseBody200_ServiceConfiguration, x), x), from_none], self.service_configurations)
        return result


def post_login_request_body_from_dict(s: Any) -> PostLoginRequestBody:
    return PostLoginRequestBody.from_dict(s)


def post_login_request_body_to_dict(x: PostLoginRequestBody) -> Any:
    return to_class(PostLoginRequestBody, x)


def post_login_response_body201_from_dict(s: Any) -> str:
    return from_str(s)


def post_login_response_body201_to_dict(x: str) -> Any:
    return from_str(x)


def post_logout_request_body_from_dict(s: Any) -> PostLogoutRequestBody:
    return PostLogoutRequestBody.from_dict(s)


def post_logout_request_body_to_dict(x: PostLogoutRequestBody) -> Any:
    return to_class(PostLogoutRequestBody, x)


def post_device_token_response_body200_from_dict(s: Any) -> str:
    return from_str(s)


def post_device_token_response_body200_to_dict(x: str) -> Any:
    return from_str(x)


def get_users_response_body200_from_dict(s: Any) -> List[User]:
    return from_list(User.from_dict, s)


def get_users_response_body200_to_dict(x: List[User]) -> Any:
    return from_list(lambda x: to_class(User, x), x)


def post_users_request_body_from_dict(s: Any) -> PostUsersRequestBody:
    return PostUsersRequestBody.from_dict(s)


def post_users_request_body_to_dict(x: PostUsersRequestBody) -> Any:
    return to_class(PostUsersRequestBody, x)


def post_users_response_body201_from_dict(s: Any) -> PostUsersResponseBody201:
    return PostUsersResponseBody201.from_dict(s)


def post_users_response_body201_to_dict(x: PostUsersResponseBody201) -> Any:
    return to_class(PostUsersResponseBody201, x)


def get_user_response_body200_from_dict(s: Any) -> GetUserResponseBody200:
    return GetUserResponseBody200.from_dict(s)


def get_user_response_body200_to_dict(x: GetUserResponseBody200) -> Any:
    return to_class(GetUserResponseBody200, x)


def patch_user_request_body_from_dict(s: Any) -> PatchUserRequestBody:
    return PatchUserRequestBody.from_dict(s)


def patch_user_request_body_to_dict(x: PatchUserRequestBody) -> Any:
    return to_class(PatchUserRequestBody, x)


def patch_user_response_body200_from_dict(s: Any) -> PatchUserResponseBody200:
    return PatchUserResponseBody200.from_dict(s)


def patch_user_response_body200_to_dict(x: PatchUserResponseBody200) -> Any:
    return to_class(PatchUserResponseBody200, x)


def put_user_roles_response_body200_from_dict(s: Any) -> PutUserRolesResponseBody200:
    return PutUserRolesResponseBody200.from_dict(s)


def put_user_roles_response_body200_to_dict(x: PutUserRolesResponseBody200) -> Any:
    return to_class(PutUserRolesResponseBody200, x)


def get_identity_response_body200_from_dict(s: Any) -> GetIdentityResponseBody200:
    return GetIdentityResponseBody200.from_dict(s)


def get_identity_response_body200_to_dict(x: GetIdentityResponseBody200) -> Any:
    return to_class(GetIdentityResponseBody200, x)


def patch_identity_request_body_from_dict(s: Any) -> PatchIdentityRequestBody:
    return PatchIdentityRequestBody.from_dict(s)


def patch_identity_request_body_to_dict(x: PatchIdentityRequestBody) -> Any:
    return to_class(PatchIdentityRequestBody, x)


def patch_identity_response_body200_from_dict(s: Any) -> PatchIdentityResponseBody200:
    return PatchIdentityResponseBody200.from_dict(s)


def patch_identity_response_body200_to_dict(x: PatchIdentityResponseBody200) -> Any:
    return to_class(PatchIdentityResponseBody200, x)


def post_schedule_request_body_from_dict(s: Any) -> PostScheduleRequestBody:
    return PostScheduleRequestBody.from_dict(s)


def post_schedule_request_body_to_dict(x: PostScheduleRequestBody) -> Any:
    return to_class(PostScheduleRequestBody, x)


def post_schedule_response_body200_from_dict(s: Any) -> List[PostScheduleResponseBody200_Element]:
    return from_list(PostScheduleResponseBody200_Element.from_dict, s)


def post_schedule_response_body200_to_dict(x: List[PostScheduleResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(PostScheduleResponseBody200_Element, x), x)


def post_schedule_response_body404_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body404_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body422_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body422_to_dict(x: str) -> Any:
    return from_str(x)


def post_schedule_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def post_schedule_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def put_booking_request_body_from_dict(s: Any) -> PutBookingRequestBody:
    return PutBookingRequestBody.from_dict(s)


def put_booking_request_body_to_dict(x: PutBookingRequestBody) -> Any:
    return to_class(PutBookingRequestBody, x)


def put_booking_response_body200_from_dict(s: Any) -> PutBookingResponseBody200:
    return PutBookingResponseBody200.from_dict(s)


def put_booking_response_body200_to_dict(x: PutBookingResponseBody200) -> Any:
    return to_class(PutBookingResponseBody200, x)


def put_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def put_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def patch_booking_request_body_from_dict(s: Any) -> PatchBookingRequestBody:
    return PatchBookingRequestBody.from_dict(s)


def patch_booking_request_body_to_dict(x: PatchBookingRequestBody) -> Any:
    return to_class(PatchBookingRequestBody, x)


def patch_booking_response_body200_from_dict(s: Any) -> PatchBookingResponseBody200:
    return PatchBookingResponseBody200.from_dict(s)


def patch_booking_response_body200_to_dict(x: PatchBookingResponseBody200) -> Any:
    return to_class(PatchBookingResponseBody200, x)


def patch_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def patch_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def get_booking_response_body200_from_dict(s: Any) -> GetBookingResponseBody200:
    return GetBookingResponseBody200.from_dict(s)


def get_booking_response_body200_to_dict(x: GetBookingResponseBody200) -> Any:
    return to_class(GetBookingResponseBody200, x)


def get_booking_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def get_booking_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_destroy_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_destroy_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def put_booking_lock_response_body200_from_dict(s: Any) -> PutBookingLockResponseBody200:
    return PutBookingLockResponseBody200.from_dict(s)


def put_booking_lock_response_body200_to_dict(x: PutBookingLockResponseBody200) -> Any:
    return to_class(PutBookingLockResponseBody200, x)


def put_booking_lock_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def put_booking_lock_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def delete_booking_lock_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def delete_booking_lock_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def post_booking_callback_response_body500_from_dict(s: Any) -> str:
    return from_str(s)


def post_booking_callback_response_body500_to_dict(x: str) -> Any:
    return from_str(x)


def get_devices_response_body200_from_dict(s: Any) -> List[DeviceOverview]:
    return from_list(DeviceOverview.from_dict, s)


def get_devices_response_body200_to_dict(x: List[DeviceOverview]) -> Any:
    return from_list(lambda x: to_class(DeviceOverview, x), x)


def post_devices_request_body_from_dict(s: Any) -> PostDevicesRequestBody:
    return PostDevicesRequestBody.from_dict(s)


def post_devices_request_body_to_dict(x: PostDevicesRequestBody) -> Any:
    return to_class(PostDevicesRequestBody, x)


def post_devices_response_body201_from_dict(s: Any) -> PostDevicesResponseBody201:
    return PostDevicesResponseBody201.from_dict(s)


def post_devices_response_body201_to_dict(x: PostDevicesResponseBody201) -> Any:
    return to_class(PostDevicesResponseBody201, x)


def get_device_response_body200_from_dict(s: Any) -> GetDeviceResponseBody200:
    return GetDeviceResponseBody200.from_dict(s)


def get_device_response_body200_to_dict(x: GetDeviceResponseBody200) -> Any:
    return to_class(GetDeviceResponseBody200, x)


def patch_device_request_body_from_dict(s: Any) -> PatchDeviceRequestBody:
    return PatchDeviceRequestBody.from_dict(s)


def patch_device_request_body_to_dict(x: PatchDeviceRequestBody) -> Any:
    return to_class(PatchDeviceRequestBody, x)


def patch_device_response_body200_from_dict(s: Any) -> PatchDeviceResponseBody200:
    return PatchDeviceResponseBody200.from_dict(s)


def patch_device_response_body200_to_dict(x: PatchDeviceResponseBody200) -> Any:
    return to_class(PatchDeviceResponseBody200, x)


def post_device_response_body201_from_dict(s: Any) -> PostDeviceResponseBody201:
    return PostDeviceResponseBody201.from_dict(s)


def post_device_response_body201_to_dict(x: PostDeviceResponseBody201) -> Any:
    return to_class(PostDeviceResponseBody201, x)


def post_device_availability_request_body_from_dict(s: Any) -> List[PurpleAvailabilityRule]:
    return from_list(PurpleAvailabilityRule.from_dict, s)


def post_device_availability_request_body_to_dict(x: List[PurpleAvailabilityRule]) -> Any:
    return from_list(lambda x: to_class(PurpleAvailabilityRule, x), x)


def post_device_availability_response_body200_from_dict(s: Any) -> List[PostDeviceAvailabilityResponseBody200_Element]:
    return from_list(PostDeviceAvailabilityResponseBody200_Element.from_dict, s)


def post_device_availability_response_body200_to_dict(x: List[PostDeviceAvailabilityResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(PostDeviceAvailabilityResponseBody200_Element, x), x)


def purple_post_device_token_response_body200_from_dict(s: Any) -> str:
    return from_str(s)


def purple_post_device_token_response_body200_to_dict(x: str) -> Any:
    return from_str(x)


def post_device_signaling_request_body_from_dict(s: Any) -> PostDeviceSignalingRequestBody:
    return PostDeviceSignalingRequestBody.from_dict(s)


def post_device_signaling_request_body_to_dict(x: PostDeviceSignalingRequestBody) -> Any:
    return to_class(PostDeviceSignalingRequestBody, x)


def get_peerconnections_response_body200_from_dict(s: Any) -> List[PeerconnectionOverview]:
    return from_list(PeerconnectionOverview.from_dict, s)


def get_peerconnections_response_body200_to_dict(x: List[PeerconnectionOverview]) -> Any:
    return from_list(lambda x: to_class(PeerconnectionOverview, x), x)


def post_peerconnections_request_body_from_dict(s: Any) -> PostPeerconnectionsRequestBody:
    return PostPeerconnectionsRequestBody.from_dict(s)


def post_peerconnections_request_body_to_dict(x: PostPeerconnectionsRequestBody) -> Any:
    return to_class(PostPeerconnectionsRequestBody, x)


def post_peerconnections_response_body201_from_dict(s: Any) -> PostPeerconnectionsResponseBody201:
    return PostPeerconnectionsResponseBody201.from_dict(s)


def post_peerconnections_response_body201_to_dict(x: PostPeerconnectionsResponseBody201) -> Any:
    return to_class(PostPeerconnectionsResponseBody201, x)


def get_peerconnection_response_body200_from_dict(s: Any) -> GetPeerconnectionResponseBody200:
    return GetPeerconnectionResponseBody200.from_dict(s)


def get_peerconnection_response_body200_to_dict(x: GetPeerconnectionResponseBody200) -> Any:
    return to_class(GetPeerconnectionResponseBody200, x)


def get_experiments_response_body200_from_dict(s: Any) -> List[GetExperimentsResponseBody200_Element]:
    return from_list(GetExperimentsResponseBody200_Element.from_dict, s)


def get_experiments_response_body200_to_dict(x: List[GetExperimentsResponseBody200_Element]) -> Any:
    return from_list(lambda x: to_class(GetExperimentsResponseBody200_Element, x), x)


def post_experiments_request_body_from_dict(s: Any) -> PostExperimentsRequestBody:
    return PostExperimentsRequestBody.from_dict(s)


def post_experiments_request_body_to_dict(x: PostExperimentsRequestBody) -> Any:
    return to_class(PostExperimentsRequestBody, x)


def post_experiments_response_body201_from_dict(s: Any) -> PostExperimentsResponseBody201:
    return PostExperimentsResponseBody201.from_dict(s)


def post_experiments_response_body201_to_dict(x: PostExperimentsResponseBody201) -> Any:
    return to_class(PostExperimentsResponseBody201, x)


def get_experiment_response_body200_from_dict(s: Any) -> GetExperimentResponseBody200:
    return GetExperimentResponseBody200.from_dict(s)


def get_experiment_response_body200_to_dict(x: GetExperimentResponseBody200) -> Any:
    return to_class(GetExperimentResponseBody200, x)


def patch_experiment_request_body_from_dict(s: Any) -> PatchExperimentRequestBody:
    return PatchExperimentRequestBody.from_dict(s)


def patch_experiment_request_body_to_dict(x: PatchExperimentRequestBody) -> Any:
    return to_class(PatchExperimentRequestBody, x)


def patch_experiment_response_body200_from_dict(s: Any) -> PatchExperimentResponseBody200:
    return PatchExperimentResponseBody200.from_dict(s)


def patch_experiment_response_body200_to_dict(x: PatchExperimentResponseBody200) -> Any:
    return to_class(PatchExperimentResponseBody200, x)
