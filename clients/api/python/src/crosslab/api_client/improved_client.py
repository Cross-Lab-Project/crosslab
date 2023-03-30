from typing import Optional

from crosslab.api_client.client import APIClient as BasicAPIClient
from crosslab.api_client.schemas import (
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
)


class APIClient(BasicAPIClient):
    async def login(self, body: LoginRequest, url: str = "/login") -> LoginResponse:
        token = await super().login(body, url)
        self.set_auth_token(token)
        return token

    async def logout(
        self, body: Optional[LogoutRequest] = None, url: str = "/logout"
    ) -> LogoutResponse:
        if self.authToken is not None:
            if body is None:
                body = {"token": self.authToken}
            self.set_auth_token(None)
            return await super().logout(body, url)
        else:
            return None
