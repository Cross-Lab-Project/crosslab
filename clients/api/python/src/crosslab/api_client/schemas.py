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


CreateDeviceAuthenticationTokenResponse201: TypeAlias = str


CreateDeviceAuthenticationTokenResponse: TypeAlias = CreateDeviceAuthenticationTokenResponse201


class ListUsersResponse200ItemsRolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class ListUsersResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[ListUsersResponse200ItemsRolesItems]]


ListUsersResponse200: TypeAlias = List[ListUsersResponse200Items]


ListUsersResponse: TypeAlias = ListUsersResponse200


class CreateUserRequest(TypedDict):
    """
    Properties:
    - username
    - password
    """
    username: str
    password: str


class CreateUserResponse201RolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class CreateUserResponse201(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[CreateUserResponse201RolesItems]]


CreateUserResponse: TypeAlias = CreateUserResponse201


class GetUserResponse200RolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class GetUserResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[GetUserResponse200RolesItems]]


GetUserResponse: TypeAlias = GetUserResponse200


class UpdateUserRequest(TypedDict):
    """
    Properties:
    - username
    - password
    """
    username: NotRequired[str]
    password: NotRequired[str]


class UpdateUserResponse200RolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class UpdateUserResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[UpdateUserResponse200RolesItems]]


UpdateUserResponse: TypeAlias = UpdateUserResponse200


DeleteUserResponse: TypeAlias = None


class GetRolesOfUserResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


GetRolesOfUserResponse200: TypeAlias = List[GetRolesOfUserResponse200Items]


GetRolesOfUserResponse: TypeAlias = GetRolesOfUserResponse200


AddRolesToUserRequest: TypeAlias = List[str]


AddRolesToUserResponse: TypeAlias = None


RemoveRolesFromUserRequest: TypeAlias = List[str]


RemoveRolesFromUserResponse: TypeAlias = None


class ListRolesResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


ListRolesResponse200: TypeAlias = List[ListRolesResponse200Items]


ListRolesResponse: TypeAlias = ListRolesResponse200


class CreateRoleRequest(TypedDict):
    """
    Properties:
    - name
    - scopes
    """
    name: str
    scopes: List[str]


class CreateRoleResponse201(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


CreateRoleResponse: TypeAlias = CreateRoleResponse201


class GetRoleResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


GetRoleResponse: TypeAlias = GetRoleResponse200


class UpdateRoleRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class UpdateRoleResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


UpdateRoleResponse: TypeAlias = UpdateRoleResponse200


DeleteRoleResponse: TypeAlias = None


class GetUsersWithRoleResponse200ItemsRolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class GetUsersWithRoleResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[GetUsersWithRoleResponse200ItemsRolesItems]]


GetUsersWithRoleResponse200: TypeAlias = List[GetUsersWithRoleResponse200Items]


GetUsersWithRoleResponse: TypeAlias = GetUsersWithRoleResponse200


AddUsersToRoleRequest: TypeAlias = List[str]


AddUsersToRoleResponse: TypeAlias = None


RemoveUsersFromRoleRequest: TypeAlias = List[str]


RemoveUsersFromRoleResponse: TypeAlias = None


class GetIdentityResponse200RolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class GetIdentityResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[GetIdentityResponse200RolesItems]]


GetIdentityResponse: TypeAlias = GetIdentityResponse200


class UpdateIdentityRequestRolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class UpdateIdentityRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[UpdateIdentityRequestRolesItems]]


class UpdateIdentityResponse200RolesItems(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: NotRequired[str]
    id: NotRequired[str]
    name: NotRequired[str]
    scopes: NotRequired[List[str]]


class UpdateIdentityResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    - roles
    """
    url: NotRequired[str]
    id: NotRequired[str]
    username: NotRequired[str]
    password: NotRequired[str]
    roles: NotRequired[List[UpdateIdentityResponse200RolesItems]]


UpdateIdentityResponse: TypeAlias = UpdateIdentityResponse200


class GetScheduleRequestExperimentDevicesItems(TypedDict):
    """
    A device might either be a physical/virtual device or a group of device.Properties:
    - ID: Unique ID of the device. Contains the institution (by having an end point at that institution)
    """
    ID: str


class GetScheduleRequestExperiment(TypedDict):
    """
    An experiment describes a set of devices and how they should be connected (potentially among other metadata).Properties:
    - Devices: List of devices used in experiment.
    - Description: User provided description, for example might be a reason for the booking (e.g. maintenance) or a link to the experiment. Might be empty or missing.
    """
    Devices: List[GetScheduleRequestExperimentDevicesItems]
    Description: NotRequired[str]


class GetScheduleRequestTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class GetScheduleRequest(TypedDict):
    """
    Properties:
    - Experiment: An experiment describes a set of devices and how they should be connected (potentially among other metadata).
    - Time: A time slot represents a slice of time used for bookings.
    - Combined: If true, show only one timetable per device instead of one for all available physical devices.
    - onlyOwn: (private) Show only devices of this institution. Give an error if a device of an other institution is requested.
    """
    Experiment: GetScheduleRequestExperiment
    Time: GetScheduleRequestTime
    Combined: NotRequired[bool]
    onlyOwn: NotRequired[bool]


class GetScheduleResponse200ItemsBookedItems(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class GetScheduleResponse200ItemsFreeItems(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class GetScheduleResponse200Items(TypedDict):
    """
    Properties:
    - Device: ID of the device (or * if combined).
    - Booked: Array of booked times.
    - Free: Array of free times.
    """
    Device: str
    Booked: List[GetScheduleResponse200ItemsBookedItems]
    Free: List[GetScheduleResponse200ItemsFreeItems]


GetScheduleResponse200: TypeAlias = List[GetScheduleResponse200Items]


GetScheduleResponse404: TypeAlias = str


GetScheduleResponse422: TypeAlias = str


GetScheduleResponse500: TypeAlias = str


GetScheduleResponse: TypeAlias = Union[GetScheduleResponse200, GetScheduleResponse404, GetScheduleResponse422, GetScheduleResponse500]


class BookExperimentRequestExperimentDevicesItems(TypedDict):
    """
    A device might either be a physical/virtual device or a group of device.Properties:
    - ID: Unique ID of the device. Contains the institution (by having an end point at that institution)
    """
    ID: str


class BookExperimentRequestExperiment(TypedDict):
    """
    An experiment describes a set of devices and how they should be connected (potentially among other metadata).Properties:
    - Devices: List of devices used in experiment.
    - Description: User provided description, for example might be a reason for the booking (e.g. maintenance) or a link to the experiment. Might be empty or missing.
    """
    Devices: List[BookExperimentRequestExperimentDevicesItems]
    Description: NotRequired[str]


class BookExperimentRequestTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class BookExperimentRequest(TypedDict):
    """
    Properties:
    - Experiment: An experiment describes a set of devices and how they should be connected (potentially among other metadata).
    - Time: A time slot represents a slice of time used for bookings.
    - Type: Type of booking. Currently, only one type is defined, but others might follow (e.g. priority booking). If empty, 'normal' is assumed.
    """
    Experiment: BookExperimentRequestExperiment
    Time: BookExperimentRequestTime
    Type: NotRequired[Literal["normal"]]


class BookExperimentResponse200(TypedDict):
    """
    Properties:
    - BookingID: ID at which the booking can be managed.
    """
    BookingID: str


BookExperimentResponse500: TypeAlias = str


BookExperimentResponse: TypeAlias = Union[BookExperimentResponse200, BookExperimentResponse500]


class UpdateBookingRequestAlt1DevicesItems(TypedDict):
    """
    A device might either be a physical/virtual device or a group of device.Properties:
    - ID: Unique ID of the device. Contains the institution (by having an end point at that institution)
    """
    ID: str


class UpdateBookingRequestAlt1(TypedDict):
    """
    Use this request for adding devices.Properties:
    - Locked: Expresses whether the devices should be locked. Must match current status of booking.
    - Devices: List of devices which should be added.
    """
    Locked: NotRequired[bool]
    Devices: NotRequired[List[UpdateBookingRequestAlt1DevicesItems]]


class UpdateBookingRequestAlt2(TypedDict):
    """
    Use this request for adding callbacks.Properties:
    - Callback: Callback which should be called at changes.
    """
    Callback: NotRequired[str]


UpdateBookingRequest = Union[UpdateBookingRequestAlt1, UpdateBookingRequestAlt2]


class UpdateBookingResponse200(TypedDict):
    """
    Properties:
    - BookingID
    """
    BookingID: str


UpdateBookingResponse500: TypeAlias = str


UpdateBookingResponse: TypeAlias = Union[UpdateBookingResponse200, UpdateBookingResponse500]


CancelBookingResponse500: TypeAlias = str


CancelBookingResponse: TypeAlias = CancelBookingResponse500


class GetBookingResponse200BookingTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class GetBookingResponse200Booking(TypedDict):
    """
    A booking in the booking system.Properties:
    - ID: Unique ID of the booking.
    - Time: A time slot represents a slice of time used for bookings.
    - Devices
    - Type: Type of booking. Currently, only one type is defined, but others might follow (e.g. priority booking). If empty, 'normal' is assumed.
    - Status: Current status of the booking. While the booking is pending, it can not be used. Will change automatically and can not be set by user. 'rejected' is set when the initial booking failed, 'cancelled' when the booking was deleted / cancelled after it was once active. The 'active-*' will be used when a device was added after the booking was locked.
    - You: If true, this booking was done by you.
    - External: Shows whether the booking was done by an external institution.
    - Message: User readable notes about the status of the booking (e.g. if devices are unknown).
    """
    ID: str
    Time: GetBookingResponse200BookingTime
    Devices: List[str]
    Type: NotRequired[Literal["normal"]]
    Status: Literal["pending", "booked", "rejected", "cancelled", "active", "active-pending", "active-rejected"]
    You: bool
    External: bool
    Message: NotRequired[str]


class GetBookingResponse200(TypedDict):
    """
    Properties:
    - Booking: A booking in the booking system.
    - Locked: Shows if the booking is in a locked status.
    """
    Booking: GetBookingResponse200Booking
    Locked: bool


GetBookingResponse500: TypeAlias = str


GetBookingResponse: TypeAlias = Union[GetBookingResponse200, GetBookingResponse500]


DeleteBookingResponse500: TypeAlias = str


DeleteBookingResponse: TypeAlias = DeleteBookingResponse500


class LockBookingResponse200BookingTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class LockBookingResponse200Booking(TypedDict):
    """
    A booking in the booking system.Properties:
    - ID: Unique ID of the booking.
    - Time: A time slot represents a slice of time used for bookings.
    - Devices
    - Type: Type of booking. Currently, only one type is defined, but others might follow (e.g. priority booking). If empty, 'normal' is assumed.
    - Status: Current status of the booking. While the booking is pending, it can not be used. Will change automatically and can not be set by user. 'rejected' is set when the initial booking failed, 'cancelled' when the booking was deleted / cancelled after it was once active. The 'active-*' will be used when a device was added after the booking was locked.
    - You: If true, this booking was done by you.
    - External: Shows whether the booking was done by an external institution.
    - Message: User readable notes about the status of the booking (e.g. if devices are unknown).
    """
    ID: str
    Time: LockBookingResponse200BookingTime
    Devices: List[str]
    Type: NotRequired[Literal["normal"]]
    Status: Literal["pending", "booked", "rejected", "cancelled", "active", "active-pending", "active-rejected"]
    You: bool
    External: bool
    Message: NotRequired[str]


class LockBookingResponse200Time(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class LockBookingResponse200TokensItems(TypedDict):
    """
    Properties:
    - Device
    - Token
    """
    Device: NotRequired[str]
    Token: NotRequired[str]


class LockBookingResponse200(TypedDict):
    """
    Properties:
    - Booking: A booking in the booking system.
    - Time: A time slot represents a slice of time used for bookings.
    - Tokens: A list of access tokens
    """
    Booking: LockBookingResponse200Booking
    Time: LockBookingResponse200Time
    Tokens: List[LockBookingResponse200TokensItems]


LockBookingResponse500: TypeAlias = str


LockBookingResponse: TypeAlias = Union[LockBookingResponse200, LockBookingResponse500]


UnlockBookingResponse500: TypeAlias = str


UnlockBookingResponse: TypeAlias = UnlockBookingResponse500


class ListDevicesResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device", "group", "edge instantiable", "cloud instantiable"]]
    owner: NotRequired[str]


ListDevicesResponse200: TypeAlias = List[ListDevicesResponse200Items]


ListDevicesResponse: TypeAlias = ListDevicesResponse200


class CreateDeviceRequestAlt1AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    """


class CreateDeviceRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    """


class CreateDeviceRequestAlt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device"]]
    owner: NotRequired[str]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[CreateDeviceRequestAlt1AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt1ServicesItems]]


class CreateDeviceRequestAlt2DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: NotRequired[str]


class CreateDeviceRequestAlt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - devices
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["group"]]
    owner: NotRequired[str]
    devices: NotRequired[List[CreateDeviceRequestAlt2DevicesItems]]


class CreateDeviceRequestAlt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - instantiate_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["cloud instantiable"]]
    owner: NotRequired[str]
    instantiate_url: NotRequired[str]


class CreateDeviceRequestAlt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - code_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["edge instantiable"]]
    owner: NotRequired[str]
    code_url: NotRequired[str]


CreateDeviceRequest = Union[CreateDeviceRequestAlt1, CreateDeviceRequestAlt2, CreateDeviceRequestAlt3, CreateDeviceRequestAlt4]


class CreateDeviceResponse201Alt1AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class CreateDeviceResponse201Alt1ServicesItems(TypedDict):
    """
    Properties:
    """


class CreateDeviceResponse201Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device"]]
    owner: NotRequired[str]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[CreateDeviceResponse201Alt1AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt1ServicesItems]]


class CreateDeviceResponse201Alt2DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: NotRequired[str]


class CreateDeviceResponse201Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - devices
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["group"]]
    owner: NotRequired[str]
    devices: NotRequired[List[CreateDeviceResponse201Alt2DevicesItems]]


class CreateDeviceResponse201Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - instantiate_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["cloud instantiable"]]
    owner: NotRequired[str]
    instantiate_url: NotRequired[str]


class CreateDeviceResponse201Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - code_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["edge instantiable"]]
    owner: NotRequired[str]
    code_url: NotRequired[str]


CreateDeviceResponse201 = Union[CreateDeviceResponse201Alt1, CreateDeviceResponse201Alt2, CreateDeviceResponse201Alt3, CreateDeviceResponse201Alt4]


CreateDeviceResponse: TypeAlias = CreateDeviceResponse201


class GetDeviceResponse200Alt1AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class GetDeviceResponse200Alt1ServicesItems(TypedDict):
    """
    Properties:
    """


class GetDeviceResponse200Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device"]]
    owner: NotRequired[str]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[GetDeviceResponse200Alt1AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt1ServicesItems]]


class GetDeviceResponse200Alt2DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: NotRequired[str]


class GetDeviceResponse200Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - devices
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["group"]]
    owner: NotRequired[str]
    devices: NotRequired[List[GetDeviceResponse200Alt2DevicesItems]]


class GetDeviceResponse200Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - instantiate_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["cloud instantiable"]]
    owner: NotRequired[str]
    instantiate_url: NotRequired[str]


class GetDeviceResponse200Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - code_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["edge instantiable"]]
    owner: NotRequired[str]
    code_url: NotRequired[str]


GetDeviceResponse200 = Union[GetDeviceResponse200Alt1, GetDeviceResponse200Alt2, GetDeviceResponse200Alt3, GetDeviceResponse200Alt4]


GetDeviceResponse: TypeAlias = GetDeviceResponse200


class UpdateDeviceRequestAlt1AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    """


class UpdateDeviceRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    """


class UpdateDeviceRequestAlt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device"]]
    owner: NotRequired[str]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[UpdateDeviceRequestAlt1AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt1ServicesItems]]


class UpdateDeviceRequestAlt2DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: NotRequired[str]


class UpdateDeviceRequestAlt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - devices
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["group"]]
    owner: NotRequired[str]
    devices: NotRequired[List[UpdateDeviceRequestAlt2DevicesItems]]


class UpdateDeviceRequestAlt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - instantiate_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["cloud instantiable"]]
    owner: NotRequired[str]
    instantiate_url: NotRequired[str]


class UpdateDeviceRequestAlt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - code_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["edge instantiable"]]
    owner: NotRequired[str]
    code_url: NotRequired[str]


UpdateDeviceRequest = Union[UpdateDeviceRequestAlt1, UpdateDeviceRequestAlt2, UpdateDeviceRequestAlt3, UpdateDeviceRequestAlt4]


class UpdateDeviceResponse200Alt1AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class UpdateDeviceResponse200Alt1ServicesItems(TypedDict):
    """
    Properties:
    """


class UpdateDeviceResponse200Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device"]]
    owner: NotRequired[str]
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[UpdateDeviceResponse200Alt1AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt1ServicesItems]]


class UpdateDeviceResponse200Alt2DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: NotRequired[str]


class UpdateDeviceResponse200Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - devices
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["group"]]
    owner: NotRequired[str]
    devices: NotRequired[List[UpdateDeviceResponse200Alt2DevicesItems]]


class UpdateDeviceResponse200Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - instantiate_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["cloud instantiable"]]
    owner: NotRequired[str]
    instantiate_url: NotRequired[str]


class UpdateDeviceResponse200Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - code_url
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["edge instantiable"]]
    owner: NotRequired[str]
    code_url: NotRequired[str]


UpdateDeviceResponse200 = Union[UpdateDeviceResponse200Alt1, UpdateDeviceResponse200Alt2, UpdateDeviceResponse200Alt3, UpdateDeviceResponse200Alt4]


UpdateDeviceResponse: TypeAlias = UpdateDeviceResponse200


DeleteDeviceResponse: TypeAlias = None


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
    """


class InstantiateDeviceResponse201Instance(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: NotRequired[str]
    name: NotRequired[str]
    description: NotRequired[str]
    type: NotRequired[Literal["device"]]
    owner: NotRequired[str]
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
    instance: NotRequired[InstantiateDeviceResponse201Instance]
    deviceToken: NotRequired[str]


InstantiateDeviceResponse: TypeAlias = InstantiateDeviceResponse201


class AddAvailabilityRulesRequestItems(TypedDict):
    """
    Properties:
    """


AddAvailabilityRulesRequest: TypeAlias = List[AddAvailabilityRulesRequestItems]


class AddAvailabilityRulesResponse200Items(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


AddAvailabilityRulesResponse200: TypeAlias = List[AddAvailabilityRulesResponse200Items]


AddAvailabilityRulesResponse: TypeAlias = AddAvailabilityRulesResponse200


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
    connectionType: Literal["webrtc", "websocket"]
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


SendSignalingMessageRequest = Union[SendSignalingMessageRequestAlt1, SendSignalingMessageRequestAlt2, SendSignalingMessageRequestAlt3]


SendSignalingMessageResponse: TypeAlias = None


class ListPeerconnectionsResponse200ItemsDevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: NotRequired[str]


class ListPeerconnectionsResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - devices
    """
    url: NotRequired[str]
    devices: NotRequired[List[ListPeerconnectionsResponse200ItemsDevicesItems]]


ListPeerconnectionsResponse200: TypeAlias = List[ListPeerconnectionsResponse200Items]


ListPeerconnectionsResponse: TypeAlias = ListPeerconnectionsResponse200


class CreatePeerconnectionRequestDevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    remoteServiceId: NotRequired[str]


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
    url: NotRequired[str]
    config: NotRequired[CreatePeerconnectionRequestDevicesItemsConfig]


class CreatePeerconnectionRequest(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - devices
    - status: The status of the peerconnection.
    """
    url: NotRequired[str]
    devices: NotRequired[List[CreatePeerconnectionRequestDevicesItems]]
    status: NotRequired[Literal["waiting-for-devices", "connected", "failed", "closed"]]


class CreatePeerconnectionResponse201DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    remoteServiceId: NotRequired[str]


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
    url: NotRequired[str]
    config: NotRequired[CreatePeerconnectionResponse201DevicesItemsConfig]


class CreatePeerconnectionResponse201(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - devices
    - status: The status of the peerconnection.
    """
    url: NotRequired[str]
    devices: NotRequired[List[CreatePeerconnectionResponse201DevicesItems]]
    status: NotRequired[Literal["waiting-for-devices", "connected", "failed", "closed"]]


class CreatePeerconnectionResponse202DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    remoteServiceId: NotRequired[str]


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
    url: NotRequired[str]
    config: NotRequired[CreatePeerconnectionResponse202DevicesItemsConfig]


class CreatePeerconnectionResponse202(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - devices
    - status: The status of the peerconnection.
    """
    url: NotRequired[str]
    devices: NotRequired[List[CreatePeerconnectionResponse202DevicesItems]]
    status: NotRequired[Literal["waiting-for-devices", "connected", "failed", "closed"]]


CreatePeerconnectionResponse: TypeAlias = Union[CreatePeerconnectionResponse201, CreatePeerconnectionResponse202]


class GetPeerconnectionResponse200DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    remoteServiceId: NotRequired[str]


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
    url: NotRequired[str]
    config: NotRequired[GetPeerconnectionResponse200DevicesItemsConfig]


class GetPeerconnectionResponse200(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - devices
    - status: The status of the peerconnection.
    """
    url: NotRequired[str]
    devices: NotRequired[List[GetPeerconnectionResponse200DevicesItems]]
    status: NotRequired[Literal["waiting-for-devices", "connected", "failed", "closed"]]


GetPeerconnectionResponse: TypeAlias = GetPeerconnectionResponse200


DeletePeerconnectionResponse: TypeAlias = None


class ListExperimentsResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]


ListExperimentsResponse200: TypeAlias = List[ListExperimentsResponse200Items]


ListExperimentsResponse: TypeAlias = ListExperimentsResponse200


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
    device: NotRequired[str]
    role: NotRequired[str]


class CreateExperimentRequestRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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


class CreateExperimentRequest(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[CreateExperimentRequestBookingtime]
    devices: NotRequired[List[CreateExperimentRequestDevicesItems]]
    roles: NotRequired[List[CreateExperimentRequestRolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[CreateExperimentRequestServiceconfigurationsItems]]


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
    device: NotRequired[str]
    role: NotRequired[str]


class CreateExperimentResponse201RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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


class CreateExperimentResponse201(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[CreateExperimentResponse201Bookingtime]
    devices: NotRequired[List[CreateExperimentResponse201DevicesItems]]
    roles: NotRequired[List[CreateExperimentResponse201RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[CreateExperimentResponse201ServiceconfigurationsItems]]


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
    device: NotRequired[str]
    role: NotRequired[str]


class CreateExperimentResponse202RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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


class CreateExperimentResponse202(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[CreateExperimentResponse202Bookingtime]
    devices: NotRequired[List[CreateExperimentResponse202DevicesItems]]
    roles: NotRequired[List[CreateExperimentResponse202RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[CreateExperimentResponse202ServiceconfigurationsItems]]


CreateExperimentResponse: TypeAlias = Union[CreateExperimentResponse201, CreateExperimentResponse202]


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
    device: NotRequired[str]
    role: NotRequired[str]


class GetExperimentResponse200RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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


class GetExperimentResponse200(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[GetExperimentResponse200Bookingtime]
    devices: NotRequired[List[GetExperimentResponse200DevicesItems]]
    roles: NotRequired[List[GetExperimentResponse200RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[GetExperimentResponse200ServiceconfigurationsItems]]


GetExperimentResponse: TypeAlias = GetExperimentResponse200


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
    device: NotRequired[str]
    role: NotRequired[str]


class UpdateExperimentRequestRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[UpdateExperimentRequestBookingtime]
    devices: NotRequired[List[UpdateExperimentRequestDevicesItems]]
    roles: NotRequired[List[UpdateExperimentRequestRolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[UpdateExperimentRequestServiceconfigurationsItems]]


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
    device: NotRequired[str]
    role: NotRequired[str]


class UpdateExperimentResponse200RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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


class UpdateExperimentResponse200(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[UpdateExperimentResponse200Bookingtime]
    devices: NotRequired[List[UpdateExperimentResponse200DevicesItems]]
    roles: NotRequired[List[UpdateExperimentResponse200RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[UpdateExperimentResponse200ServiceconfigurationsItems]]


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
    device: NotRequired[str]
    role: NotRequired[str]


class UpdateExperimentResponse202RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


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


class UpdateExperimentResponse202(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status: Status of the experiment
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    """
    url: NotRequired[str]
    status: NotRequired[Literal["created", "booked", "setup", "running", "finished"]]
    bookingTime: NotRequired[UpdateExperimentResponse202Bookingtime]
    devices: NotRequired[List[UpdateExperimentResponse202DevicesItems]]
    roles: NotRequired[List[UpdateExperimentResponse202RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[UpdateExperimentResponse202ServiceconfigurationsItems]]


UpdateExperimentResponse: TypeAlias = Union[UpdateExperimentResponse200, UpdateExperimentResponse202]


DeleteExperimentResponse: TypeAlias = None


class ListInstitutionsResponse200Items(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


ListInstitutionsResponse200: TypeAlias = List[ListInstitutionsResponse200Items]


ListInstitutionsResponse: TypeAlias = ListInstitutionsResponse200


class CreateInstitutionRequest(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


class CreateInstitutionResponse201(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


CreateInstitutionResponse: TypeAlias = CreateInstitutionResponse201


class GetInstitutionResponse200(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


GetInstitutionResponse: TypeAlias = GetInstitutionResponse200


class UpdateInstitutionRequest(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


class UpdateInstitutionResponse200(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


UpdateInstitutionResponse: TypeAlias = UpdateInstitutionResponse200


DeleteInstitutionResponse: TypeAlias = None


class ListUpdatesResponse200Items(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


ListUpdatesResponse200: TypeAlias = List[ListUpdatesResponse200Items]


ListUpdatesResponse: TypeAlias = ListUpdatesResponse200


class CreateUpdateRequest(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


class CreateUpdateResponse201(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


CreateUpdateResponse: TypeAlias = CreateUpdateResponse201


GetUpdateResponse: TypeAlias = None


class PatchUpdateRequest(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


class PatchUpdateResponse200(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


PatchUpdateResponse: TypeAlias = PatchUpdateResponse200


DeleteUpdateResponse: TypeAlias = None
