from typing import List, Literal, TypedDict, Union

from typing_extensions import TypeAlias, NotRequired


class LoginRequest(TypedDict):
    """
    Properties:
    - username: Username of the user.
    - password: Password of the user.
    - method: Authentication method.
    """
    username: str
    password: str
    method: NotRequired[Literal["tui", "local"]]


LoginResponse201: TypeAlias = str


LoginResponse: TypeAlias = LoginResponse201


class LogoutRequest(TypedDict):
    """
    Properties:
    - token: The token to be invalidated.
    """
    token: NotRequired[str]


LogoutResponse: TypeAlias = None


class ListUsersResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: str
    id: str
    username: str
    password: NotRequired[str]
    admin: NotRequired[bool]


ListUsersResponse200: TypeAlias = List[ListUsersResponse200Items]


ListUsersResponse: TypeAlias = ListUsersResponse200


class CreateUserRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: str
    password: str
    admin: NotRequired[bool]


class CreateUserResponse201(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: str
    id: str
    username: str
    password: NotRequired[str]
    admin: NotRequired[bool]


CreateUserResponse: TypeAlias = CreateUserResponse201


class GetUserResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: str
    id: str
    username: str
    password: NotRequired[str]
    admin: NotRequired[bool]


GetUserResponse: TypeAlias = GetUserResponse200


class UpdateUserRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    admin: NotRequired[bool]


class UpdateUserResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: str
    id: str
    username: str
    password: NotRequired[str]
    admin: NotRequired[bool]


UpdateUserResponse: TypeAlias = UpdateUserResponse200


DeleteUserResponse: TypeAlias = None


class GetIdentityResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    admin: NotRequired[bool]


GetIdentityResponse: TypeAlias = GetIdentityResponse200


class UpdateIdentityRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    admin: NotRequired[bool]


class UpdateIdentityResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - admin
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    admin: NotRequired[bool]


UpdateIdentityResponse: TypeAlias = UpdateIdentityResponse200


class CreateTokenRequestAlt1Claims(TypedDict):
    """
    The claims that will be added to the token. If left empty, the token will have the full scope of the user.
    Properties:
    """


class CreateTokenRequestAlt1(TypedDict):
    """
    Properties:
    - user: Url or uuid of the user that will be used to create the token.
    - claims: The claims that will be added to the token. If left empty, the token will have the full scope of the user.

    """
    user: str
    claims: NotRequired[CreateTokenRequestAlt1Claims]


class CreateTokenRequestAlt2Claims(TypedDict):
    """
    The claims that will be added to the token. If left empty, the token will have the full scope of the user.
    Properties:
    """


class CreateTokenRequestAlt2(TypedDict):
    """
    Properties:
    - username: Url or uuid of the user that will be used to create the token.
    - claims: The claims that will be added to the token. If left empty, the token will have the full scope of the user.

    """
    username: str
    claims: NotRequired[CreateTokenRequestAlt2Claims]


CreateTokenRequest = Union[CreateTokenRequestAlt1, CreateTokenRequestAlt2]


CreateTokenResponse201: TypeAlias = str


CreateTokenResponse: TypeAlias = CreateTokenResponse201


class ListDevicesResponse200ItemsViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class ListDevicesResponse200ItemsOwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class ListDevicesResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device", "group", "edge instantiable", "cloud instantiable"]
    isPublic: bool
    viewer: NotRequired[List[ListDevicesResponse200ItemsViewerItems]]
    owner: NotRequired[List[ListDevicesResponse200ItemsOwnerItems]]


ListDevicesResponse200: TypeAlias = List[ListDevicesResponse200Items]


ListDevicesResponse: TypeAlias = ListDevicesResponse200


class CreateDeviceRequestAlt1ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt1OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceRequestAlt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceRequestAlt1ViewerItems]]
    owner: NotRequired[List[CreateDeviceRequestAlt1OwnerItems]]
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt1ServicesItems]]


class CreateDeviceRequestAlt2ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt2OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class CreateDeviceRequestAlt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceRequestAlt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceRequestAlt2ViewerItems]]
    owner: NotRequired[List[CreateDeviceRequestAlt2OwnerItems]]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[CreateDeviceRequestAlt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt2ServicesItems]]


class CreateDeviceRequestAlt3ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt3OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceRequestAlt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceRequestAlt3ViewerItems]]
    owner: NotRequired[List[CreateDeviceRequestAlt3OwnerItems]]
    codeUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt3ServicesItems]]


class CreateDeviceRequestAlt4ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt4OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceRequestAlt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class CreateDeviceRequestAlt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceRequestAlt4ViewerItems]]
    owner: NotRequired[List[CreateDeviceRequestAlt4OwnerItems]]
    devices: List[CreateDeviceRequestAlt4DevicesItems]


CreateDeviceRequest = Union[CreateDeviceRequestAlt1, CreateDeviceRequestAlt2, CreateDeviceRequestAlt3, CreateDeviceRequestAlt4]


class CreateDeviceResponse201Alt1ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt1OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceResponse201Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceResponse201Alt1ViewerItems]]
    owner: NotRequired[List[CreateDeviceResponse201Alt1OwnerItems]]
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt1ServicesItems]]


class CreateDeviceResponse201Alt2ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt2OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class CreateDeviceResponse201Alt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceResponse201Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceResponse201Alt2ViewerItems]]
    owner: NotRequired[List[CreateDeviceResponse201Alt2OwnerItems]]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[CreateDeviceResponse201Alt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt2ServicesItems]]


class CreateDeviceResponse201Alt3ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt3OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceResponse201Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceResponse201Alt3ViewerItems]]
    owner: NotRequired[List[CreateDeviceResponse201Alt3OwnerItems]]
    codeUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt3ServicesItems]]


class CreateDeviceResponse201Alt4ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt4OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class CreateDeviceResponse201Alt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class CreateDeviceResponse201Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    isPublic: bool
    viewer: NotRequired[List[CreateDeviceResponse201Alt4ViewerItems]]
    owner: NotRequired[List[CreateDeviceResponse201Alt4OwnerItems]]
    devices: List[CreateDeviceResponse201Alt4DevicesItems]


CreateDeviceResponse201 = Union[CreateDeviceResponse201Alt1, CreateDeviceResponse201Alt2, CreateDeviceResponse201Alt3, CreateDeviceResponse201Alt4]


CreateDeviceResponse: TypeAlias = CreateDeviceResponse201


class GetDeviceResponse200Alt1ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt1OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class GetDeviceResponse200Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    isPublic: bool
    viewer: NotRequired[List[GetDeviceResponse200Alt1ViewerItems]]
    owner: NotRequired[List[GetDeviceResponse200Alt1OwnerItems]]
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt1ServicesItems]]


class GetDeviceResponse200Alt2ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt2OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class GetDeviceResponse200Alt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class GetDeviceResponse200Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: bool
    viewer: NotRequired[List[GetDeviceResponse200Alt2ViewerItems]]
    owner: NotRequired[List[GetDeviceResponse200Alt2OwnerItems]]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[GetDeviceResponse200Alt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt2ServicesItems]]


class GetDeviceResponse200Alt3ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt3OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class GetDeviceResponse200Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    isPublic: bool
    viewer: NotRequired[List[GetDeviceResponse200Alt3ViewerItems]]
    owner: NotRequired[List[GetDeviceResponse200Alt3OwnerItems]]
    codeUrl: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt3ServicesItems]]


class GetDeviceResponse200Alt4ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt4OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class GetDeviceResponse200Alt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class GetDeviceResponse200Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    isPublic: bool
    viewer: NotRequired[List[GetDeviceResponse200Alt4ViewerItems]]
    owner: NotRequired[List[GetDeviceResponse200Alt4OwnerItems]]
    devices: List[GetDeviceResponse200Alt4DevicesItems]


GetDeviceResponse200 = Union[GetDeviceResponse200Alt1, GetDeviceResponse200Alt2, GetDeviceResponse200Alt3, GetDeviceResponse200Alt4]


GetDeviceResponse: TypeAlias = GetDeviceResponse200


class UpdateDeviceRequestAlt1ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt1OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceRequestAlt1(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - instantiateUrl
    - services
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    isPublic: NotRequired[bool]
    viewer: NotRequired[List[UpdateDeviceRequestAlt1ViewerItems]]
    owner: NotRequired[List[UpdateDeviceRequestAlt1OwnerItems]]
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt1ServicesItems]]


class UpdateDeviceRequestAlt2ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt2OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceRequestAlt2(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - experiment
    - services
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: NotRequired[bool]
    viewer: NotRequired[List[UpdateDeviceRequestAlt2ViewerItems]]
    owner: NotRequired[List[UpdateDeviceRequestAlt2OwnerItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt2ServicesItems]]


class UpdateDeviceRequestAlt3ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt3OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceRequestAlt3(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - codeUrl
    - services
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    isPublic: NotRequired[bool]
    viewer: NotRequired[List[UpdateDeviceRequestAlt3ViewerItems]]
    owner: NotRequired[List[UpdateDeviceRequestAlt3OwnerItems]]
    codeUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt3ServicesItems]]


class UpdateDeviceRequestAlt4ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt4OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceRequestAlt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class UpdateDeviceRequestAlt4(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - devices
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["group"]
    isPublic: NotRequired[bool]
    viewer: NotRequired[List[UpdateDeviceRequestAlt4ViewerItems]]
    owner: NotRequired[List[UpdateDeviceRequestAlt4OwnerItems]]
    devices: NotRequired[List[UpdateDeviceRequestAlt4DevicesItems]]


UpdateDeviceRequest = Union[UpdateDeviceRequestAlt1, UpdateDeviceRequestAlt2, UpdateDeviceRequestAlt3, UpdateDeviceRequestAlt4]


class UpdateDeviceResponse200Alt1ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt1OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceResponse200Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    isPublic: bool
    viewer: NotRequired[List[UpdateDeviceResponse200Alt1ViewerItems]]
    owner: NotRequired[List[UpdateDeviceResponse200Alt1OwnerItems]]
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt1ServicesItems]]


class UpdateDeviceResponse200Alt2ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt2OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class UpdateDeviceResponse200Alt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceResponse200Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: bool
    viewer: NotRequired[List[UpdateDeviceResponse200Alt2ViewerItems]]
    owner: NotRequired[List[UpdateDeviceResponse200Alt2OwnerItems]]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[UpdateDeviceResponse200Alt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt2ServicesItems]]


class UpdateDeviceResponse200Alt3ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt3OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceResponse200Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    isPublic: bool
    viewer: NotRequired[List[UpdateDeviceResponse200Alt3ViewerItems]]
    owner: NotRequired[List[UpdateDeviceResponse200Alt3OwnerItems]]
    codeUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt3ServicesItems]]


class UpdateDeviceResponse200Alt4ViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt4OwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class UpdateDeviceResponse200Alt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class UpdateDeviceResponse200Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    isPublic: bool
    viewer: NotRequired[List[UpdateDeviceResponse200Alt4ViewerItems]]
    owner: NotRequired[List[UpdateDeviceResponse200Alt4OwnerItems]]
    devices: List[UpdateDeviceResponse200Alt4DevicesItems]


UpdateDeviceResponse200 = Union[UpdateDeviceResponse200Alt1, UpdateDeviceResponse200Alt2, UpdateDeviceResponse200Alt3, UpdateDeviceResponse200Alt4]


UpdateDeviceResponse: TypeAlias = UpdateDeviceResponse200


DeleteDeviceResponse: TypeAlias = None


class InstantiateDeviceResponse201InstanceViewerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class InstantiateDeviceResponse201InstanceOwnerItems(TypedDict):
    """
    Properties:
    - url: URL of the user
    """
    url: str


class InstantiateDeviceResponse201InstanceAnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class InstantiateDeviceResponse201InstanceServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class InstantiateDeviceResponse201Instance(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - viewer: List of users who can view the device
    - owner: List of users who own the device
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: bool
    viewer: NotRequired[List[InstantiateDeviceResponse201InstanceViewerItems]]
    owner: NotRequired[List[InstantiateDeviceResponse201InstanceOwnerItems]]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[InstantiateDeviceResponse201InstanceAnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[InstantiateDeviceResponse201InstanceServicesItems]]


class InstantiateDeviceResponse201(TypedDict):
    """
    Properties:
    - instance
    - deviceToken
    """
    instance: InstantiateDeviceResponse201Instance
    deviceToken: str


InstantiateDeviceResponse: TypeAlias = InstantiateDeviceResponse201


class GetDeviceAvailabilityResponse200Items(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


GetDeviceAvailabilityResponse200: TypeAlias = List[GetDeviceAvailabilityResponse200Items]


GetDeviceAvailabilityResponse: TypeAlias = GetDeviceAvailabilityResponse200


DeleteDeviceAvailabilityRulesResponse: TypeAlias = None


class AddDeviceAvailabilityRulesRequestItems(TypedDict):
    """
    Properties:
    """


AddDeviceAvailabilityRulesRequest: TypeAlias = List[AddDeviceAvailabilityRulesRequestItems]


class AddDeviceAvailabilityRulesResponse200Items(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


AddDeviceAvailabilityRulesResponse200: TypeAlias = List[AddDeviceAvailabilityRulesResponse200Items]


AddDeviceAvailabilityRulesResponse: TypeAlias = AddDeviceAvailabilityRulesResponse200


CreateWebsocketTokenResponse200: TypeAlias = str


CreateWebsocketTokenResponse: TypeAlias = CreateWebsocketTokenResponse200


class SendSignalingMessageRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class SendSignalingMessageRequestAlt1Config(TypedDict):
    """
    Properties:
    """


class SendSignalingMessageRequestAlt1(TypedDict):
    """
    Properties:
    - messageType
    - command
    - connectionType
    - connectionUrl
    - services
    - tiebreaker
    - config
    """
    messageType: Literal["command"]
    command: Literal["createPeerconnection"]
    connectionType: Literal["webrtc", "websocket", "local"]
    connectionUrl: str
    services: List[SendSignalingMessageRequestAlt1ServicesItems]
    tiebreaker: bool
    config: NotRequired[SendSignalingMessageRequestAlt1Config]


class SendSignalingMessageRequestAlt2(TypedDict):
    """
    Properties:
    - messageType
    - command
    - connectionUrl
    """
    messageType: Literal["command"]
    command: Literal["closePeerconnection"]
    connectionUrl: str


class SendSignalingMessageRequestAlt3Content(TypedDict):
    """
    Properties:
    """


class SendSignalingMessageRequestAlt3(TypedDict):
    """
    Properties:
    - messageType
    - signalingType
    - connectionUrl
    - content
    """
    messageType: Literal["signaling"]
    signalingType: Literal["offer", "answer", "candidate"]
    connectionUrl: str
    content: SendSignalingMessageRequestAlt3Content


class SendSignalingMessageRequestAlt4Configuration(TypedDict):
    """
    Properties:
    """


class SendSignalingMessageRequestAlt4(TypedDict):
    """
    Properties:
    - messageType
    - configuration
    """
    messageType: Literal["configuration"]
    configuration: SendSignalingMessageRequestAlt4Configuration


class SendSignalingMessageRequestAlt5(TypedDict):
    """
    Properties:
    - messageType
    - status
    - message
    """
    messageType: Literal["experiment-status-changed"]
    status: str
    message: NotRequired[str]


SendSignalingMessageRequest = Union[SendSignalingMessageRequestAlt1, SendSignalingMessageRequestAlt2, SendSignalingMessageRequestAlt3, SendSignalingMessageRequestAlt4, SendSignalingMessageRequestAlt5]


SendSignalingMessageResponse: TypeAlias = None


class ListPeerconnectionsResponse200ItemsDevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class ListPeerconnectionsResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]
    devices: List[ListPeerconnectionsResponse200ItemsDevicesItems]


ListPeerconnectionsResponse200: TypeAlias = List[ListPeerconnectionsResponse200Items]


ListPeerconnectionsResponse: TypeAlias = ListPeerconnectionsResponse200


class CreatePeerconnectionRequestDevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerconnectionRequestDevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[CreatePeerconnectionRequestDevicesItemsConfigServicesItems]]


class CreatePeerconnectionRequestDevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[CreatePeerconnectionRequestDevicesItemsConfig]


class CreatePeerconnectionRequest(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]
    devices: List[CreatePeerconnectionRequestDevicesItems]


class CreatePeerconnectionResponse201DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerconnectionResponse201DevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[CreatePeerconnectionResponse201DevicesItemsConfigServicesItems]]


class CreatePeerconnectionResponse201DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[CreatePeerconnectionResponse201DevicesItemsConfig]


class CreatePeerconnectionResponse201(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]
    devices: List[CreatePeerconnectionResponse201DevicesItems]


class CreatePeerconnectionResponse202DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerconnectionResponse202DevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[CreatePeerconnectionResponse202DevicesItemsConfigServicesItems]]


class CreatePeerconnectionResponse202DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[CreatePeerconnectionResponse202DevicesItemsConfig]


class CreatePeerconnectionResponse202(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]
    devices: List[CreatePeerconnectionResponse202DevicesItems]


CreatePeerconnectionResponse: TypeAlias = Union[CreatePeerconnectionResponse201, CreatePeerconnectionResponse202]


class GetPeerconnectionResponse200DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class GetPeerconnectionResponse200DevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[GetPeerconnectionResponse200DevicesItemsConfigServicesItems]]


class GetPeerconnectionResponse200DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[GetPeerconnectionResponse200DevicesItemsConfig]


class GetPeerconnectionResponse200(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]
    devices: List[GetPeerconnectionResponse200DevicesItems]


GetPeerconnectionResponse: TypeAlias = GetPeerconnectionResponse200


DeletePeerconnectionResponse: TypeAlias = None


class PatchPeerconnectionDeviceStatusRequest(TypedDict):
    """
    Properties:
    - status: The status of the peerconnection.
    """
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]


PatchPeerconnectionDeviceStatusResponse: TypeAlias = None


ListExperimentsResponse200ItemsStatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


ListExperimentsResponse200ItemsStatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


ListExperimentsResponse200ItemsStatus = Union[ListExperimentsResponse200ItemsStatusAlt1, ListExperimentsResponse200ItemsStatusAlt2]


class ListExperimentsResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    """
    url: str
    status: ListExperimentsResponse200ItemsStatus


ListExperimentsResponse200: TypeAlias = List[ListExperimentsResponse200Items]


ListExperimentsResponse: TypeAlias = ListExperimentsResponse200


CreateExperimentRequestStatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


CreateExperimentRequestStatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


CreateExperimentRequestStatus = Union[CreateExperimentRequestStatusAlt1, CreateExperimentRequestStatusAlt2]


class CreateExperimentRequestBookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class CreateExperimentRequestDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class CreateExperimentRequestRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class CreateExperimentRequestRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[CreateExperimentRequestRolesItemsConfiguration]


class CreateExperimentRequestServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentRequestServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig]


class CreateExperimentRequestServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateExperimentRequestServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateExperimentRequestServiceconfigurationsItemsParticipantsItems]]


class CreateExperimentRequestInstantiateddevicesItems(TypedDict):
    """
    Properties:
    - codeUrl
    - url
    - token
    - instanceOf
    """
    codeUrl: str
    url: str
    token: str
    instanceOf: str


class CreateExperimentRequest(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: str
    status: CreateExperimentRequestStatus
    bookingTime: NotRequired[CreateExperimentRequestBookingtime]
    devices: List[CreateExperimentRequestDevicesItems]
    roles: List[CreateExperimentRequestRolesItems]
    connections: List[str]
    serviceConfigurations: List[CreateExperimentRequestServiceconfigurationsItems]
    instantiatedDevices: List[CreateExperimentRequestInstantiateddevicesItems]


CreateExperimentResponse201StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


CreateExperimentResponse201StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


CreateExperimentResponse201Status = Union[CreateExperimentResponse201StatusAlt1, CreateExperimentResponse201StatusAlt2]


class CreateExperimentResponse201Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class CreateExperimentResponse201DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class CreateExperimentResponse201RolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class CreateExperimentResponse201RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[CreateExperimentResponse201RolesItemsConfiguration]


class CreateExperimentResponse201ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItemsConfig]


class CreateExperimentResponse201ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateExperimentResponse201ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItems]]


class CreateExperimentResponse201InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - codeUrl
    - url
    - token
    - instanceOf
    """
    codeUrl: str
    url: str
    token: str
    instanceOf: str


class CreateExperimentResponse201(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: str
    status: CreateExperimentResponse201Status
    bookingTime: NotRequired[CreateExperimentResponse201Bookingtime]
    devices: List[CreateExperimentResponse201DevicesItems]
    roles: List[CreateExperimentResponse201RolesItems]
    connections: List[str]
    serviceConfigurations: List[CreateExperimentResponse201ServiceconfigurationsItems]
    instantiatedDevices: List[CreateExperimentResponse201InstantiateddevicesItems]


CreateExperimentResponse202StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


CreateExperimentResponse202StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


CreateExperimentResponse202Status = Union[CreateExperimentResponse202StatusAlt1, CreateExperimentResponse202StatusAlt2]


class CreateExperimentResponse202Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class CreateExperimentResponse202DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class CreateExperimentResponse202RolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class CreateExperimentResponse202RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[CreateExperimentResponse202RolesItemsConfiguration]


class CreateExperimentResponse202ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig]


class CreateExperimentResponse202ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateExperimentResponse202ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItems]]


class CreateExperimentResponse202InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - codeUrl
    - url
    - token
    - instanceOf
    """
    codeUrl: str
    url: str
    token: str
    instanceOf: str


class CreateExperimentResponse202(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: str
    status: CreateExperimentResponse202Status
    bookingTime: NotRequired[CreateExperimentResponse202Bookingtime]
    devices: List[CreateExperimentResponse202DevicesItems]
    roles: List[CreateExperimentResponse202RolesItems]
    connections: List[str]
    serviceConfigurations: List[CreateExperimentResponse202ServiceconfigurationsItems]
    instantiatedDevices: List[CreateExperimentResponse202InstantiateddevicesItems]


CreateExperimentResponse: TypeAlias = Union[CreateExperimentResponse201, CreateExperimentResponse202]


GetExperimentResponse200StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


GetExperimentResponse200StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


GetExperimentResponse200Status = Union[GetExperimentResponse200StatusAlt1, GetExperimentResponse200StatusAlt2]


class GetExperimentResponse200Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class GetExperimentResponse200DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class GetExperimentResponse200RolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class GetExperimentResponse200RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[GetExperimentResponse200RolesItemsConfiguration]


class GetExperimentResponse200ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class GetExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class GetExperimentResponse200ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[GetExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig]


class GetExperimentResponse200ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[GetExperimentResponse200ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[GetExperimentResponse200ServiceconfigurationsItemsParticipantsItems]]


class GetExperimentResponse200InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - codeUrl
    - url
    - token
    - instanceOf
    """
    codeUrl: str
    url: str
    token: str
    instanceOf: str


class GetExperimentResponse200(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: str
    status: GetExperimentResponse200Status
    bookingTime: NotRequired[GetExperimentResponse200Bookingtime]
    devices: List[GetExperimentResponse200DevicesItems]
    roles: List[GetExperimentResponse200RolesItems]
    connections: List[str]
    serviceConfigurations: List[GetExperimentResponse200ServiceconfigurationsItems]
    instantiatedDevices: List[GetExperimentResponse200InstantiateddevicesItems]


GetExperimentResponse: TypeAlias = GetExperimentResponse200


UpdateExperimentRequestStatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


UpdateExperimentRequestStatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


UpdateExperimentRequestStatus = Union[UpdateExperimentRequestStatusAlt1, UpdateExperimentRequestStatusAlt2]


class UpdateExperimentRequestBookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class UpdateExperimentRequestDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class UpdateExperimentRequestRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class UpdateExperimentRequestRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[UpdateExperimentRequestRolesItemsConfiguration]


class UpdateExperimentRequestServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentRequestServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateExperimentRequestServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateExperimentRequestServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateExperimentRequestServiceconfigurationsItemsParticipantsItems]]


class UpdateExperimentRequest(TypedDict):
    """
    Properties:
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - serviceConfigurations: Services associated with the experiment
    """
    status: NotRequired[UpdateExperimentRequestStatus]
    bookingTime: NotRequired[UpdateExperimentRequestBookingtime]
    devices: NotRequired[List[UpdateExperimentRequestDevicesItems]]
    roles: NotRequired[List[UpdateExperimentRequestRolesItems]]
    serviceConfigurations: NotRequired[List[UpdateExperimentRequestServiceconfigurationsItems]]


UpdateExperimentResponse200StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


UpdateExperimentResponse200StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


UpdateExperimentResponse200Status = Union[UpdateExperimentResponse200StatusAlt1, UpdateExperimentResponse200StatusAlt2]


class UpdateExperimentResponse200Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class UpdateExperimentResponse200DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class UpdateExperimentResponse200RolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class UpdateExperimentResponse200RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[UpdateExperimentResponse200RolesItemsConfiguration]


class UpdateExperimentResponse200ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateExperimentResponse200ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateExperimentResponse200ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItems]]


class UpdateExperimentResponse200InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - codeUrl
    - url
    - token
    - instanceOf
    """
    codeUrl: str
    url: str
    token: str
    instanceOf: str


class UpdateExperimentResponse200(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: str
    status: UpdateExperimentResponse200Status
    bookingTime: NotRequired[UpdateExperimentResponse200Bookingtime]
    devices: List[UpdateExperimentResponse200DevicesItems]
    roles: List[UpdateExperimentResponse200RolesItems]
    connections: List[str]
    serviceConfigurations: List[UpdateExperimentResponse200ServiceconfigurationsItems]
    instantiatedDevices: List[UpdateExperimentResponse200InstantiateddevicesItems]


UpdateExperimentResponse202StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


UpdateExperimentResponse202StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


UpdateExperimentResponse202Status = Union[UpdateExperimentResponse202StatusAlt1, UpdateExperimentResponse202StatusAlt2]


class UpdateExperimentResponse202Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class UpdateExperimentResponse202DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class UpdateExperimentResponse202RolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class UpdateExperimentResponse202RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[UpdateExperimentResponse202RolesItemsConfiguration]


class UpdateExperimentResponse202ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateExperimentResponse202ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateExperimentResponse202ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItems]]


class UpdateExperimentResponse202InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - codeUrl
    - url
    - token
    - instanceOf
    """
    codeUrl: str
    url: str
    token: str
    instanceOf: str


class UpdateExperimentResponse202(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: str
    status: UpdateExperimentResponse202Status
    bookingTime: NotRequired[UpdateExperimentResponse202Bookingtime]
    devices: List[UpdateExperimentResponse202DevicesItems]
    roles: List[UpdateExperimentResponse202RolesItems]
    connections: List[str]
    serviceConfigurations: List[UpdateExperimentResponse202ServiceconfigurationsItems]
    instantiatedDevices: List[UpdateExperimentResponse202InstantiateddevicesItems]


UpdateExperimentResponse: TypeAlias = Union[UpdateExperimentResponse200, UpdateExperimentResponse202]


DeleteExperimentResponse: TypeAlias = None


class ListTemplateResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    """
    url: str
    name: str
    description: NotRequired[str]


ListTemplateResponse200: TypeAlias = List[ListTemplateResponse200Items]


ListTemplateResponse: TypeAlias = ListTemplateResponse200


class CreateTemplateRequestConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class CreateTemplateRequestConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class CreateTemplateRequestConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[CreateTemplateRequestConfigurationRolesItemsConfiguration]


class CreateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class CreateTemplateRequestConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems]]


class CreateTemplateRequestConfiguration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: List[CreateTemplateRequestConfigurationDevicesItems]
    roles: List[CreateTemplateRequestConfigurationRolesItems]
    serviceConfigurations: List[CreateTemplateRequestConfigurationServiceconfigurationsItems]


class CreateTemplateRequest(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    url: str
    name: str
    description: NotRequired[str]
    configuration: CreateTemplateRequestConfiguration


class CreateTemplateResponse201ConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class CreateTemplateResponse201ConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class CreateTemplateResponse201ConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[CreateTemplateResponse201ConfigurationRolesItemsConfiguration]


class CreateTemplateResponse201ConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class CreateTemplateResponse201ConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateTemplateResponse201ConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItems]]


class CreateTemplateResponse201Configuration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: List[CreateTemplateResponse201ConfigurationDevicesItems]
    roles: List[CreateTemplateResponse201ConfigurationRolesItems]
    serviceConfigurations: List[CreateTemplateResponse201ConfigurationServiceconfigurationsItems]


class CreateTemplateResponse201(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    url: str
    name: str
    description: NotRequired[str]
    configuration: CreateTemplateResponse201Configuration


class CreateTemplateResponse202ConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class CreateTemplateResponse202ConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class CreateTemplateResponse202ConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[CreateTemplateResponse202ConfigurationRolesItemsConfiguration]


class CreateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class CreateTemplateResponse202ConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems]]


class CreateTemplateResponse202Configuration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: List[CreateTemplateResponse202ConfigurationDevicesItems]
    roles: List[CreateTemplateResponse202ConfigurationRolesItems]
    serviceConfigurations: List[CreateTemplateResponse202ConfigurationServiceconfigurationsItems]


class CreateTemplateResponse202(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    url: str
    name: str
    description: NotRequired[str]
    configuration: CreateTemplateResponse202Configuration


CreateTemplateResponse: TypeAlias = Union[CreateTemplateResponse201, CreateTemplateResponse202]


class GetTemplateResponse200ConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class GetTemplateResponse200ConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class GetTemplateResponse200ConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[GetTemplateResponse200ConfigurationRolesItemsConfiguration]


class GetTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class GetTemplateResponse200ConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[GetTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems]]


class GetTemplateResponse200Configuration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: List[GetTemplateResponse200ConfigurationDevicesItems]
    roles: List[GetTemplateResponse200ConfigurationRolesItems]
    serviceConfigurations: List[GetTemplateResponse200ConfigurationServiceconfigurationsItems]


class GetTemplateResponse200(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    url: str
    name: str
    description: NotRequired[str]
    configuration: GetTemplateResponse200Configuration


GetTemplateResponse: TypeAlias = GetTemplateResponse200


class UpdateTemplateRequestConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class UpdateTemplateRequestConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class UpdateTemplateRequestConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[UpdateTemplateRequestConfigurationRolesItemsConfiguration]


class UpdateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateTemplateRequestConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems]]


class UpdateTemplateRequestConfiguration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: NotRequired[List[UpdateTemplateRequestConfigurationDevicesItems]]
    roles: NotRequired[List[UpdateTemplateRequestConfigurationRolesItems]]
    serviceConfigurations: NotRequired[List[UpdateTemplateRequestConfigurationServiceconfigurationsItems]]


class UpdateTemplateRequest(TypedDict):
    """
    Properties:
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    name: NotRequired[str]
    description: NotRequired[str]
    configuration: NotRequired[UpdateTemplateRequestConfiguration]


class UpdateTemplateResponse200ConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class UpdateTemplateResponse200ConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class UpdateTemplateResponse200ConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[UpdateTemplateResponse200ConfigurationRolesItemsConfiguration]


class UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateTemplateResponse200ConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems]]


class UpdateTemplateResponse200Configuration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: List[UpdateTemplateResponse200ConfigurationDevicesItems]
    roles: List[UpdateTemplateResponse200ConfigurationRolesItems]
    serviceConfigurations: List[UpdateTemplateResponse200ConfigurationServiceconfigurationsItems]


class UpdateTemplateResponse200(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    url: str
    name: str
    description: NotRequired[str]
    configuration: UpdateTemplateResponse200Configuration


class UpdateTemplateResponse202ConfigurationDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: str
    role: str


class UpdateTemplateResponse202ConfigurationRolesItemsConfiguration(TypedDict):
    """
    Configuration for all devices with this role.Properties:
    """


class UpdateTemplateResponse202ConfigurationRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    - configuration: Configuration for all devices with this role.
    """
    name: str
    description: NotRequired[str]
    configuration: NotRequired[UpdateTemplateResponse202ConfigurationRolesItemsConfiguration]


class UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateTemplateResponse202ConfigurationServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems]]


class UpdateTemplateResponse202Configuration(TypedDict):
    """
    Configuration of the templated experimentProperties:
    - devices: Devices associated with the templated experiment
    - roles: Roles that are used in this templated experiment
    - serviceConfigurations: Services associated with the templated experiment
    """
    devices: List[UpdateTemplateResponse202ConfigurationDevicesItems]
    roles: List[UpdateTemplateResponse202ConfigurationRolesItems]
    serviceConfigurations: List[UpdateTemplateResponse202ConfigurationServiceconfigurationsItems]


class UpdateTemplateResponse202(TypedDict):
    """
    Properties:
    - url: URL of the template
    - name: Name of the template
    - description: Description of the template
    - configuration: Configuration of the templated experiment
    """
    url: str
    name: str
    description: NotRequired[str]
    configuration: UpdateTemplateResponse202Configuration


UpdateTemplateResponse: TypeAlias = Union[UpdateTemplateResponse200, UpdateTemplateResponse202]


DeleteTemplateResponse: TypeAlias = None


class ListInstitutionsResponse200Items(TypedDict):
    """
    Properties:
    - url
    - name
    - homepage
    - api
    - apiToken
    """
    url: str
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    apiToken: NotRequired[str]


ListInstitutionsResponse200: TypeAlias = List[ListInstitutionsResponse200Items]


ListInstitutionsResponse: TypeAlias = ListInstitutionsResponse200


class CreateInstitutionRequest(TypedDict):
    """
    Properties:
    - url
    - name
    - homepage
    - api
    - apiToken
    """
    url: str
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    apiToken: NotRequired[str]


class CreateInstitutionResponse201(TypedDict):
    """
    Properties:
    - url
    - name
    - homepage
    - api
    - apiToken
    """
    url: str
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    apiToken: NotRequired[str]


CreateInstitutionResponse: TypeAlias = CreateInstitutionResponse201


class GetInstitutionResponse200(TypedDict):
    """
    Properties:
    - url
    - name
    - homepage
    - api
    - apiToken
    """
    url: str
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    apiToken: NotRequired[str]


GetInstitutionResponse: TypeAlias = GetInstitutionResponse200


class UpdateInstitutionRequest(TypedDict):
    """
    Properties:
    - url
    - name
    - homepage
    - api
    - apiToken
    """
    url: str
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    apiToken: NotRequired[str]


class UpdateInstitutionResponse200(TypedDict):
    """
    Properties:
    - url
    - name
    - homepage
    - api
    - apiToken
    """
    url: str
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    apiToken: NotRequired[str]


UpdateInstitutionResponse: TypeAlias = UpdateInstitutionResponse200


DeleteInstitutionResponse: TypeAlias = None
