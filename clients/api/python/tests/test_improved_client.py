import datetime
import json
import re

import aioresponses
import pytest
from aioresponses import aioresponses

from crosslab.api_client import APIClient

BASE_URL = "https://api.example.com"


@pytest.mark.asyncio
async def test_login_logout(aioresponses: aioresponses):

    request = json.loads(r'{"username":"user","password":"pw"}')
    aioresponses.post(BASE_URL + r"/login", status=201, payload="token")
    aioresponses.post(BASE_URL + r"/logout", status=204)

    async with APIClient(BASE_URL) as client:
        await client.logout(body={"token": "token"})
        await client.login(body=request)
        assert client.authToken == "token"
        await client.logout()
        assert client.authToken is None
