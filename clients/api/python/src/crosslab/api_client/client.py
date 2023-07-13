import aiohttp
import re
from typing import Optional, Any, Dict, List, Tuple, Union
from crosslab.api_client.exceptions import AuthorizationException

from crosslab.api_client.schemas import (
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
    CreateDeviceAuthenticationTokenResponse,
    ListUsersResponse,
    CreateUserRequest,
    CreateUserResponse,
    GetUserResponse,
    UpdateUserRequest,
    UpdateUserResponse,
    DeleteUserResponse,
    GetRolesOfUserResponse,
    AddRolesToUserRequest,
    AddRolesToUserResponse,
    RemoveRolesFromUserRequest,
    RemoveRolesFromUserResponse,
    ListRolesResponse,
    CreateRoleRequest,
    CreateRoleResponse,
    GetRoleResponse,
    UpdateRoleRequest,
    UpdateRoleResponse,
    DeleteRoleResponse,
    GetUsersWithRoleResponse,
    AddUsersToRoleRequest,
    AddUsersToRoleResponse,
    RemoveUsersFromRoleRequest,
    RemoveUsersFromRoleResponse,
    GetIdentityResponse,
    UpdateIdentityRequest,
    UpdateIdentityResponse,
    RegisterRequest,
    RegisterResponse,
    ScheduleRequest,
    ScheduleResponse,
    NewBookingRequest,
    NewBookingResponse,
    UpdateBookingRequest,
    UpdateBookingResponse,
    DeleteBookingResponse,
    GetBookingResponse,
    DestroyBookingResponse,
    LockBookingResponse,
    UnlockBookingResponse,
    BookingCallbackResponse,
    ListDevicesResponse,
    CreateDeviceRequest,
    CreateDeviceResponse,
    GetDeviceResponse,
    UpdateDeviceRequest,
    UpdateDeviceResponse,
    DeleteDeviceResponse,
    InstantiateDeviceResponse,
    AddAvailabilityRulesRequest,
    AddAvailabilityRulesResponse,
    CreateWebsocketTokenResponse,
    SendSignalingMessageRequest,
    SendSignalingMessageResponse,
    ListPeerconnectionsResponse,
    CreatePeerconnectionRequest,
    CreatePeerconnectionResponse,
    GetPeerconnectionResponse,
    DeletePeerconnectionResponse,
    PatchPeerconnectionDeviceStatusRequest,
    PatchPeerconnectionDeviceStatusResponse,
    ListExperimentsResponse,
    CreateExperimentRequest,
    CreateExperimentResponse,
    GetExperimentResponse,
    UpdateExperimentRequest,
    UpdateExperimentResponse,
    DeleteExperimentResponse,
    ListInstitutionsResponse,
    CreateInstitutionRequest,
    CreateInstitutionResponse,
    GetInstitutionResponse,
    UpdateInstitutionRequest,
    UpdateInstitutionResponse,
    DeleteInstitutionResponse,
    ListUpdatesResponse,
    CreateUpdateRequest,
    CreateUpdateResponse,
    GetUpdateResponse,
    PatchUpdateRequest,
    PatchUpdateResponse,
    DeleteUpdateResponse
)


class APIClient:
    BASE_URL: Optional[str] = None
    authToken: Optional[str] = None

    def __init__(self, base_url: Optional[str] = None, authToken: Optional[str] = None):
        if base_url is None:
            base_url = self.BASE_URL
        elif base_url.endswith('/'):
            base_url = base_url[:-1]
        self.BASE_URL = base_url
        self.authToken = authToken

    def set_auth_token(self, authToken: Optional[str]):
        self.authToken = authToken
        if self.http_session is not None:
            if authToken is not None:
                self.http_session.headers.update(
                    {"Authorization": f"Bearer {authToken}"}
                )
            else:
                if "Authorization" in self.http_session.headers:
                    del self.http_session.headers["Authorization"]

    async def __aenter__(self):
        self.http_session = aiohttp.ClientSession()
        if self.authToken is not None:
            self.http_session.headers.update({"Authorization": f'Bearer {self.authToken}'})
        return self

    async def __aexit__(self, *err):
        await self.http_session.close()

    async def _fetch(
        self,
        url,
        method: str = "GET",
        params: Optional[Dict[str, Union[List[str], str]]] = None,
        body: Any = None,
        asText=False,
    ) -> Tuple[int, Any]:
        fun = {"get": self.http_session.get,
               "post": self.http_session.post,
               "patch": self.http_session.patch,
               "put": self.http_session.put,
               "delete": self.http_session.delete}.get(method)

        if fun is None:
            raise Exception("")

        normalized_query = []
        if params is not None:
            for key in params:
                if isinstance(params[key], list):
                    for value in params[key]:
                        normalized_query.append(f'{key}={value}')
                else:
                    normalized_query.append(f'{key}={params[key]}')

        query_string = ("?" if len(normalized_query) >
                        0 else "")+"&".join(normalized_query)
        async with fun(self.BASE_URL+url+query_string, json=body) as resp:
            if resp.status in [401, 403]:
                raise AuthorizationException(
                    resp.headers.get('WWW-Authenticate', ""))
            if resp.status not in [200, 201, 202, 204, 303]:
                raise Exception(f'{resp.status}: {await resp.text()}')
            if asText:
                return resp.status, await resp.text()
            else:
                try:
                    return resp.status, await resp.json()
                except aiohttp.ContentTypeError:
                    return resp.status, await resp.text()

    async def login(self, body: LoginRequest, url: str = "/login") -> LoginResponse:  # noqa: E501
        """
        Login user
        
        This endpoint will login a user and return an access token for the use of the microservice architecture."""  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(login)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/login'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def logout(self, body: LogoutRequest, url: str = "/logout") -> LogoutResponse:  # noqa: E501
        """
        Logout user
        
        This endpoint will logout a user and remove the corresponding access token for the use of the microservice architecture."""  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(logout)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/logout'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_device_authentication_token(self, device_url: str, url: str = "/device_authentication_token") -> CreateDeviceAuthenticationTokenResponse:  # noqa: E501
        """
        Create a device authentication token
        
        This endpoint will create a new device authentication token."""  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(device_authentication_token)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/device_authentication_token'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if device_url:
            if isinstance(device_url, list):
                query_params['device_url'] = device_url
            else:
                query_params['device_url'] = str(device_url)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="post", params=query_params)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_users(self, url: str = "/users") -> ListUsersResponse:  # noqa: E501
        """
        Get all users
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(users)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/users'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_user(self, body: CreateUserRequest, url: str = "/users") -> CreateUserResponse:  # noqa: E501
        """
        Create a user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(users)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/users'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_user(self, url: str) -> GetUserResponse:  # noqa: E501
        """
        Get a user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(users\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def update_user(self, url: str, body: Optional[UpdateUserRequest] = None) -> UpdateUserResponse:  # noqa: E501
        """
        Update a user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(users\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_user(self, url: str) -> DeleteUserResponse:  # noqa: E501
        """
        Delete a user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(users\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_roles_of_user(self, url: str) -> GetRolesOfUserResponse:  # noqa: E501
        """
        Get roles of user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(users\/[^?]*?)(\/roles)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/roles'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def add_roles_to_user(self, url: str, body: Optional[AddRolesToUserRequest] = None) -> AddRolesToUserResponse:  # noqa: E501
        """
        Add roles to user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(users\/[^?]*?)(\/roles)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/roles'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def remove_roles_from_user(self, url: str, body: Optional[RemoveRolesFromUserRequest] = None) -> RemoveRolesFromUserResponse:  # noqa: E501
        """
        Remove roles from user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(users\/[^?]*?)(\/roles)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/roles'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete", body=body)
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_roles(self, url: str = "/roles") -> ListRolesResponse:  # noqa: E501
        """
        Get all roles
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(roles)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/roles'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_role(self, url: str = "/roles", body: Optional[CreateRoleRequest] = None) -> CreateRoleResponse:  # noqa: E501
        """
        Create a role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(roles)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/roles'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_role(self, url: str) -> GetRoleResponse:  # noqa: E501
        """
        Get a role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(roles\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def update_role(self, url: str, body: Optional[UpdateRoleRequest] = None) -> UpdateRoleResponse:  # noqa: E501
        """
        Update a role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(roles\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_role(self, url: str) -> DeleteRoleResponse:  # noqa: E501
        """
        Delete a role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(roles\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_users_with_role(self, url: str) -> GetUsersWithRoleResponse:  # noqa: E501
        """
        Get users with role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(roles\/[^?]*?)(\/users)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/users'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def add_users_to_role(self, url: str, body: Optional[AddUsersToRoleRequest] = None) -> AddUsersToRoleResponse:  # noqa: E501
        """
        Add users to role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(roles\/[^?]*?)(\/users)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/users'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def remove_users_from_role(self, url: str, body: Optional[RemoveUsersFromRoleRequest] = None) -> RemoveUsersFromRoleResponse:  # noqa: E501
        """
        Remove users from role
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(roles\/[^?]*?)(\/users)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/users'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete", body=body)
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_identity(self, url: str = "/identity") -> GetIdentityResponse:  # noqa: E501
        """
        Get identity
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(identity)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/identity'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def update_identity(self, url: str = "/identity", body: Optional[UpdateIdentityRequest] = None) -> UpdateIdentityResponse:  # noqa: E501
        """
        Update identity
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(identity)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/identity'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def register(self, body: RegisterRequest, url: str = "/register") -> RegisterResponse:  # noqa: E501
        """
        Register user
        
        This endpoint will register a new user."""  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(register)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/register'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def schedule(self, url: str = "/schedule", body: Optional[ScheduleRequest] = None) -> ScheduleResponse:  # noqa: E501
        """
        Returns the free / booked times for given experiment.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(schedule)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/schedule'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def newBooking(self, url: str = "/booking", body: Optional[NewBookingRequest] = None) -> NewBookingResponse:  # noqa: E501
        """
        Books an experiment.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(booking)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/booking'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def updateBooking(self, url: str, body: UpdateBookingRequest) -> UpdateBookingResponse:  # noqa: E501
        """
        Allows the addition of devices to a booking (removing of devices is not supportet) or the registration of callbacks.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def deleteBooking(self, url: str) -> DeleteBookingResponse:  # noqa: E501
        """
        Cancels a booking, as long as the booking was originally done by you.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def getBooking(self, url: str) -> GetBookingResponse:  # noqa: E501
        """
        Returns whether a list of devices is currently booked for a user
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def destroyBooking(self, url: str) -> DestroyBookingResponse:  # noqa: E501
        """
        Allows selected persons (like lab manager) to remove a user booking. To avoid mistakes, this is a different path than normal delete.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking\/[^?]*?)(\/destroy)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/destroy'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def lockBooking(self, url: str) -> LockBookingResponse:  # noqa: E501
        """
        Locks the current booking so the devices can be used. This sets the status to "active" This means that the booking can not be cancelled or (currently not implemented) the end time can not be set to a prior time. If called multiple times, the booking will be locked only once.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking\/[^?]*?)(\/lock)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/lock'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="put")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def unlockBooking(self, url: str) -> UnlockBookingResponse:  # noqa: E501
        """
        Unlocks all devices belonging to a booking, status will be set to 'booked'.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking\/[^?]*?)(\/lock)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/lock'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def bookingCallback(self, url: str) -> BookingCallbackResponse:  # noqa: E501
        """
        Callback used for updating device info / booking info.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(booking_callback\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_devices(self, url: str = "/devices") -> ListDevicesResponse:  # noqa: E501
        """
        List devices
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(devices)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/devices'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_device(self, body: CreateDeviceRequest, url: str = "/devices", changedUrl: Optional[str] = None) -> CreateDeviceResponse:  # noqa: E501
        """
        Create a new device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(devices)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/devices'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if changedUrl:
            if isinstance(changedUrl, list):
                query_params['changedUrl'] = changedUrl
            else:
                query_params['changedUrl'] = str(changedUrl)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body, params=query_params)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_device(self, url: str, flat_group: Optional[bool] = None) -> GetDeviceResponse:  # noqa: E501
        """
        View a registered device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if flat_group:
            if isinstance(flat_group, list):
                query_params['flat_group'] = flat_group
            else:
                query_params['flat_group'] = str(flat_group)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="get", params=query_params)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def update_device(self, url: str, body: Optional[UpdateDeviceRequest] = None, changedUrl: Optional[str] = None) -> UpdateDeviceResponse:  # noqa: E501
        """
        Update an existing device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if changedUrl:
            if isinstance(changedUrl, list):
                query_params['changedUrl'] = changedUrl
            else:
                query_params['changedUrl'] = str(changedUrl)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body, params=query_params)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_device(self, url: str) -> DeleteDeviceResponse:  # noqa: E501
        """
        Delete a registered device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def instantiate_device(self, url: str, changedUrl: Optional[str] = None) -> InstantiateDeviceResponse:  # noqa: E501
        """
        Instantiate a cloud instantiable device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if changedUrl:
            if isinstance(changedUrl, list):
                query_params['changedUrl'] = changedUrl
            else:
                query_params['changedUrl'] = str(changedUrl)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="post", params=query_params)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def add_availability_rules(self, url: str, body: Optional[AddAvailabilityRulesRequest] = None) -> AddAvailabilityRulesResponse:  # noqa: E501
        """
        Update the device availability
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)(\/availability)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/availability'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_websocket_token(self, url: str) -> CreateWebsocketTokenResponse:  # noqa: E501
        """
        Create new websocket token for device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)(\/websocket)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/websocket'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def send_signaling_message(self, url: str, body: SendSignalingMessageRequest, peerconnection_url: str) -> SendSignalingMessageResponse:  # noqa: E501
        """
        Send signaling message to device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(devices\/[^?]*?)(\/signaling)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/signaling'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if peerconnection_url:
            if isinstance(peerconnection_url, list):
                query_params['peerconnection_url'] = peerconnection_url
            else:
                query_params['peerconnection_url'] = str(peerconnection_url)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body, params=query_params)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_peerconnections(self, url: str = "/peerconnections") -> ListPeerconnectionsResponse:  # noqa: E501
        """
        List Peer Connection
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(peerconnections)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/peerconnections'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_peerconnection(self, body: CreatePeerconnectionRequest, url: str = "/peerconnections", closedUrl: Optional[str] = None, statusChangedUrl: Optional[str] = None) -> CreatePeerconnectionResponse:  # noqa: E501
        """
        Create a new Peer Connection
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(peerconnections)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/peerconnections'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if closedUrl:
            if isinstance(closedUrl, list):
                query_params['closedUrl'] = closedUrl
            else:
                query_params['closedUrl'] = str(closedUrl)
        if statusChangedUrl:
            if isinstance(statusChangedUrl, list):
                query_params['statusChangedUrl'] = statusChangedUrl
            else:
                query_params['statusChangedUrl'] = str(statusChangedUrl)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body, params=query_params)
           
        # transform response
        if status == 201:
            return resp
        if status == 202:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_peerconnection(self, url: str) -> GetPeerconnectionResponse:  # noqa: E501
        """
        View a peer connection
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(peerconnections\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_peerconnection(self, url: str) -> DeletePeerconnectionResponse:  # noqa: E501
        """
        Delete a peer connection
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(peerconnections\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def patch_peerconnection_device_status(self, url: str, body: PatchPeerconnectionDeviceStatusRequest, device_url: str) -> PatchPeerconnectionDeviceStatusResponse:  # noqa: E501
        """
        Sets the peerconnection status of a single device.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(peerconnections\/[^?]*?)(\/device_status)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/device_status'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if device_url:
            if isinstance(device_url, list):
                query_params['device_url'] = device_url
            else:
                query_params['device_url'] = str(device_url)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body, params=query_params)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_experiments(self, url: str = "/experiments") -> ListExperimentsResponse:  # noqa: E501
        """
        List experiments
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(experiments)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/experiments'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_experiment(self, body: CreateExperimentRequest, url: str = "/experiments") -> CreateExperimentResponse:  # noqa: E501
        """
        Create a new experiment
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(experiments)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/experiments'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        if status == 202:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_experiment(self, url: str) -> GetExperimentResponse:  # noqa: E501
        """
        View an experiment.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(experiments\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def update_experiment(self, url: str, body: Optional[UpdateExperimentRequest] = None, changedURL: Optional[str] = None) -> UpdateExperimentResponse:  # noqa: E501
        """
        Update an existing experiment.
        
        With this endpoint an experiment can be changed. The request body may be skipped if you just want to set a hook via the query string parameters.
        
        If a body is supplied you can choose to include any first level fields which will fully replace the field in the existing experiment.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(experiments\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if changedURL:
            if isinstance(changedURL, list):
                query_params['changedURL'] = changedURL
            else:
                query_params['changedURL'] = str(changedURL)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body, params=query_params)
           
        # transform response
        if status == 200:
            return resp
        if status == 202:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_experiment(self, url: str) -> DeleteExperimentResponse:  # noqa: E501
        """
        Delete an experiment
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(experiments\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_institutions(self, url: str = "/institutions") -> ListInstitutionsResponse:  # noqa: E501
        """
        List institutions
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(institutions)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/institutions'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_institution(self, body: CreateInstitutionRequest, url: str = "/institutions") -> CreateInstitutionResponse:  # noqa: E501
        """
        Create a new institution
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(institutions)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/institutions'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_institution(self, url: str) -> GetInstitutionResponse:  # noqa: E501
        """
        View an institution.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(institutions\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def update_institution(self, url: str, body: Optional[UpdateInstitutionRequest] = None) -> UpdateInstitutionResponse:  # noqa: E501
        """
        Update an institution.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(institutions\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_institution(self, url: str) -> DeleteInstitutionResponse:  # noqa: E501
        """
        Delete an institution
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(institutions\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def list_updates(self, url: str = "/updates") -> ListUpdatesResponse:  # noqa: E501
        """
        Get update information for all devices
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(updates)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/updates'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_update(self, body: CreateUpdateRequest, url: str = "/updates") -> CreateUpdateResponse:  # noqa: E501
        """
        Create new update information
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(updates)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/updates'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def get_update(self, url: str, current_version: Optional[str] = None) -> GetUpdateResponse:  # noqa: E501
        """
        Get update for device
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(updates\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if current_version:
            if isinstance(current_version, list):
                query_params['current_version'] = current_version
            else:
                query_params['current_version'] = str(current_version)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="get", params=query_params)
           
        # transform response
        if status == 200:
            return resp
        if status == 303:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def patch_update(self, url: str, body: PatchUpdateRequest) -> PatchUpdateResponse:  # noqa: E501
        """
        Edit update information
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(updates\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="patch", body=body)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_update(self, url: str) -> DeleteUpdateResponse:  # noqa: E501
        """
        Delete update information
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(updates\/[^?]*?)()?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+''
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")
