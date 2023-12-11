import aiohttp
import re
from typing import Optional, Any, Dict, List, Tuple, Union
from crosslab.api_client.exceptions import AuthorizationException

from crosslab.api_client.schemas import (
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
    ListUsersResponse,
    CreateUserRequest,
    CreateUserResponse,
    GetUserResponse,
    UpdateUserRequest,
    UpdateUserResponse,
    DeleteUserResponse,
    GetIdentityResponse,
    UpdateIdentityRequest,
    UpdateIdentityResponse,
    CreateTokenRequest,
    CreateTokenResponse,
    ListDevicesResponse,
    CreateDeviceRequest,
    CreateDeviceResponse,
    GetDeviceResponse,
    UpdateDeviceRequest,
    UpdateDeviceResponse,
    DeleteDeviceResponse,
    InstantiateDeviceResponse,
    GetDeviceAvailabilityResponse,
    DeleteDeviceAvailabilityRulesResponse,
    AddDeviceAvailabilityRulesRequest,
    AddDeviceAvailabilityRulesResponse,
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
    ListTemplateResponse,
    CreateTemplateRequest,
    CreateTemplateResponse,
    GetTemplateResponse,
    UpdateTemplateRequest,
    UpdateTemplateResponse,
    DeleteTemplateResponse,
    ListInstitutionsResponse,
    CreateInstitutionRequest,
    CreateInstitutionResponse,
    GetInstitutionResponse,
    UpdateInstitutionRequest,
    UpdateInstitutionResponse,
    DeleteInstitutionResponse
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

    async def list_users(self, url: str = "/users", username: Optional[str] = None) -> ListUsersResponse:  # noqa: E501
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

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if username:
            if isinstance(username, list):
                query_params['username'] = username
            else:
                query_params['username'] = str(username)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="get", params=query_params)
           
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

    async def update_user(self, url: str, body: UpdateUserRequest) -> UpdateUserResponse:  # noqa: E501
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

    async def createToken(self, body: CreateTokenRequest, url: str = "/token") -> CreateTokenResponse:  # noqa: E501
        """
        Create a new token
        
        This endpoint will create a new token for the use of the microservice architecture."""  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(token)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/token'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
        # transform response
        if status == 201:
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

    async def get_device_availability(self, url: str, startTime: Optional[str] = None, endTime: Optional[str] = None) -> GetDeviceAvailabilityResponse:  # noqa: E501
        """
        Get the availability of a device
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

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if startTime:
            if isinstance(startTime, list):
                query_params['startTime'] = startTime
            else:
                query_params['startTime'] = str(startTime)
        if endTime:
            if isinstance(endTime, list):
                query_params['endTime'] = endTime
            else:
                query_params['endTime'] = str(endTime)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="get", params=query_params)
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_device_availability_rules(self, url: str) -> DeleteDeviceAvailabilityRulesResponse:  # noqa: E501
        """
        Delete the availability rules of a device
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
        status, resp = await self._fetch(valid_url, method="delete")
           
        # transform response
        if status == 204:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def add_device_availability_rules(self, url: str, body: Optional[AddDeviceAvailabilityRulesRequest] = None) -> AddDeviceAvailabilityRulesResponse:  # noqa: E501
        """
        Add availability rules for a device
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

    async def send_signaling_message(self, url: str, body: SendSignalingMessageRequest) -> SendSignalingMessageResponse:  # noqa: E501
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
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body)
           
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
        if status == 202:
            return resp
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
        if status == 204:
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

    async def create_experiment(self, body: CreateExperimentRequest, url: str = "/experiments", changedURL: Optional[str] = None) -> CreateExperimentResponse:  # noqa: E501
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

        # build query params
        query_params: Dict[str, Union[List[str], str]] = {}
        if changedURL:
            if isinstance(changedURL, list):
                query_params['changedURL'] = changedURL
            else:
                query_params['changedURL'] = str(changedURL)
        
        # make http call
        status, resp = await self._fetch(valid_url, method="post", body=body, params=query_params)
           
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

    async def list_template(self, url: str = "/templates") -> ListTemplateResponse:  # noqa: E501
        """
        List templates
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(templates)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/templates'
        if valid_url.startswith('//'):
            valid_url = valid_url[1:]
        # make http call
        status, resp = await self._fetch(valid_url, method="get")
           
        # transform response
        if status == 200:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def create_template(self, body: CreateTemplateRequest, url: str = "/templates") -> CreateTemplateResponse:  # noqa: E501
        """
        Create a new template
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?()(templates)?$', url)
        if m is None:
            raise Exception("Invalid url")
        valid_url = '/'+m.group(2)+'/templates'
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

    async def get_template(self, url: str) -> GetTemplateResponse:  # noqa: E501
        """
        View an template.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(templates\/[^?]*?)()?$', url)
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

    async def update_template(self, url: str, body: UpdateTemplateRequest) -> UpdateTemplateResponse:  # noqa: E501
        """
        Update an existing template.
        
        With this endpoint an template can be changed. The request body may be skipped if you just want to set a hook via the query string parameters.
        
        If a body is supplied you can choose to include any first level fields which will fully replace the field in the existing template.
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(templates\/[^?]*?)()?$', url)
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
        if status == 202:
            return resp
        raise Exception(f"Unexpected status code: {status}")

    async def delete_template(self, url: str) -> DeleteTemplateResponse:  # noqa: E501
        """
        Delete an template
        """  # noqa: E501
        if not self.BASE_URL:
            raise Exception("No base url set")

        # match path to url schema
        m = re.search(r'^('+re.escape(self.BASE_URL)+r')?\/?(templates\/[^?]*?)()?$', url)
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
