import re
import pytest
from aioresponses import aioresponses
import json
import datetime

from crosslab_api_client import APIClient
from crosslab_api_client.schemas import *  # noqa: F403

BASE_URL = 'https://api.example.com'


def normalize_result(_dict):
    if isinstance(_dict, dict):
        for key, value in list(_dict.items()):
            if value is None:
                del _dict[key]
            else:
                try:
                    value = value.replace('Z', '+00:00')
                    value = value.replace('.0+', '.000+')
                    value = value.replace('.00+', '.000+')
                    _dict[key] = datetime.fromisoformat(value).replace(tzinfo=None).isoformat()
                except:  # noqa: E722
                    normalize_result(value)
    elif isinstance(_dict, list):
        for v_i in _dict:
            if isinstance(v_i, dict):
                normalize_result(v_i)
    return _dict


@pytest.mark.asyncio
async def test_postLogin(aioresponses: aioresponses):
    url = r'/login'
    url_variant = r'login'
    full_url = BASE_URL+r'/login'

    request_dict = json.loads(r'{"username":"aute in","password":"do in"}')
    request = post_login_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(url=url, body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(url=url_variant, body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(url=full_url, body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_postLogout(aioresponses: aioresponses):
    url = r'/logout'
    url_variant = r'logout'
    full_url = BASE_URL+r'/logout'

    request_dict = json.loads(r'{"token":"dolore"}')
    request = post_logout_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogout(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogout(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_postDeviceAuthenticationToken(aioresponses: aioresponses):
    url = r'/device_authentication_token'
    url_variant = r'device_authentication_token'
    full_url = BASE_URL+r'/device_authentication_token'

    parameter_list = [{"device_url": "test_string", }, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAuthenticationToken(**parameters)
            assert normalize_result(post_device_authentication_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAuthenticationToken(url=url, **parameters)
            assert normalize_result(post_device_authentication_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAuthenticationToken(url=url_variant, **parameters)
            assert normalize_result(post_device_authentication_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAuthenticationToken(url=full_url, **parameters)
            assert normalize_result(post_device_authentication_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAuthenticationToken(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getUsers(aioresponses: aioresponses):
    url = r'/users'
    url_variant = r'users'
    full_url = BASE_URL+r'/users'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"username":"ipsum do","password":"fugiat incididunt nisi","roles":[{"scopes":["nulla ut dolore in Excepteur","laborum esse culpa tempor nulla","magna nostrud","esse"],"name":"deserunt"},{"name":"non in esse","scopes":["Ut labore Lorem","nostrud enim quis","Lorem Duis","proident adipisicing"]},{"name":"consectetur laborum exercitation velit labore"}]},{"username":"reprehenderit Ut ex","password":"officia pariatur irure eu amet","roles":[{"name":"non pariatur laboris"}]},{"username":"reprehenderit quis enim","password":"voluptate aute"},{},{"password":"mollit amet","username":"nostrud ut","roles":[{"name":"Duis","scopes":["eu veniam","Lorem veniam","amet qui"]}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(**parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"username":"ipsum do","password":"fugiat incididunt nisi","roles":[{"scopes":["nulla ut dolore in Excepteur","laborum esse culpa tempor nulla","magna nostrud","esse"],"name":"deserunt"},{"name":"non in esse","scopes":["Ut labore Lorem","nostrud enim quis","Lorem Duis","proident adipisicing"]},{"name":"consectetur laborum exercitation velit labore"}]},{"username":"reprehenderit Ut ex","password":"officia pariatur irure eu amet","roles":[{"name":"non pariatur laboris"}]},{"username":"reprehenderit quis enim","password":"voluptate aute"},{},{"password":"mollit amet","username":"nostrud ut","roles":[{"name":"Duis","scopes":["eu veniam","Lorem veniam","amet qui"]}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(url=url, **parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"username":"ipsum do","password":"fugiat incididunt nisi","roles":[{"scopes":["nulla ut dolore in Excepteur","laborum esse culpa tempor nulla","magna nostrud","esse"],"name":"deserunt"},{"name":"non in esse","scopes":["Ut labore Lorem","nostrud enim quis","Lorem Duis","proident adipisicing"]},{"name":"consectetur laborum exercitation velit labore"}]},{"username":"reprehenderit Ut ex","password":"officia pariatur irure eu amet","roles":[{"name":"non pariatur laboris"}]},{"username":"reprehenderit quis enim","password":"voluptate aute"},{},{"password":"mollit amet","username":"nostrud ut","roles":[{"name":"Duis","scopes":["eu veniam","Lorem veniam","amet qui"]}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(url=url_variant, **parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"username":"ipsum do","password":"fugiat incididunt nisi","roles":[{"scopes":["nulla ut dolore in Excepteur","laborum esse culpa tempor nulla","magna nostrud","esse"],"name":"deserunt"},{"name":"non in esse","scopes":["Ut labore Lorem","nostrud enim quis","Lorem Duis","proident adipisicing"]},{"name":"consectetur laborum exercitation velit labore"}]},{"username":"reprehenderit Ut ex","password":"officia pariatur irure eu amet","roles":[{"name":"non pariatur laboris"}]},{"username":"reprehenderit quis enim","password":"voluptate aute"},{},{"password":"mollit amet","username":"nostrud ut","roles":[{"name":"Duis","scopes":["eu veniam","Lorem veniam","amet qui"]}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(url=full_url, **parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postUsers(aioresponses: aioresponses):
    url = r'/users'
    url_variant = r'users'
    full_url = BASE_URL+r'/users'

    request_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
    request = post_users_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(url=url, body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(url=url_variant, body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(url=full_url, body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getUser(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUser(url=url, **parameters)
            assert normalize_result(get_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUser(url=url_variant, **parameters)
            assert normalize_result(get_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUser(url=full_url, **parameters)
            assert normalize_result(get_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patchUser(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
    request = patch_user_request_body_from_dict(request_dict)

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUser(url=url, body=request, **parameters)
            assert normalize_result(patch_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUser(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUser(url=full_url, body=request, **parameters)
            assert normalize_result(patch_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUser(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_deleteUser(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_putUserRoles(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putUserRoles(url=url, **parameters)
            assert normalize_result(put_user_roles_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putUserRoles(url=url_variant, **parameters)
            assert normalize_result(put_user_roles_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putUserRoles(url=full_url, **parameters)
            assert normalize_result(put_user_roles_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_deleteUserRoles(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getIdentity(aioresponses: aioresponses):
    url = r'/identity'
    url_variant = r'identity'
    full_url = BASE_URL+r'/identity'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(**parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(url=url, **parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(url=url_variant, **parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(url=full_url, **parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patchIdentity(aioresponses: aioresponses):
    url = r'/identity'
    url_variant = r'identity'
    full_url = BASE_URL+r'/identity'

    request_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
    request = patch_identity_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(url=url, body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"password":"nisi quis ex cillum cupidatat","username":"dolore est"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(url=full_url, body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_postSchedule(aioresponses: aioresponses):
    url = r'/schedule'
    url_variant = r'schedule'
    full_url = BASE_URL+r'/schedule'

    request_dict = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://cHaylvBKdWJSNBxjFMsRIFtEoQDGDi.kucakbCJEWoYBT7b+w9mFqQ"}],"Description":"veniam dolore elit incididunt aliquip"},"Time":{"Start":"2013-01-13T12:46:49.0Z","End":"2009-06-16T10:26:44.0Z"},"Combined":true,"onlyOwn":true}')
    request = post_schedule_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-26T15:29:46.0Z","End":"2011-12-28T13:39:36.0Z"},{"Start":"1985-12-16T23:10:35.0Z","End":"1978-01-17T07:33:34.0Z"}],"Free":[{"Start":"1961-12-21T08:06:15.0Z","End":"2001-11-25T19:06:42.0Z"},{"Start":"2012-02-01T05:20:31.0Z","End":"1966-03-14T11:37:05.0Z"},{"Start":"1982-07-31T18:01:33.0Z","End":"1994-05-04T18:06:25.0Z"},{"Start":"2008-12-25T06:22:59.0Z","End":"1983-12-04T06:40:29.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-15T18:50:20.0Z","End":"1998-12-05T14:32:08.0Z"},{"Start":"1984-09-09T17:12:50.0Z","End":"1970-10-26T13:21:13.0Z"},{"Start":"1958-04-08T20:58:26.0Z","End":"1960-07-16T17:49:21.0Z"}],"Free":[{"Start":"1982-08-27T17:13:55.0Z","End":"1968-11-29T02:08:34.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-23T17:36:36.0Z","End":"1959-09-08T13:36:27.0Z"}],"Free":[{"Start":"2001-04-08T11:30:53.0Z","End":"2005-06-02T21:30:14.0Z"},{"Start":"1979-01-05T18:37:01.0Z","End":"2019-06-09T10:59:31.0Z"},{"Start":"1971-01-16T17:04:38.0Z","End":"1960-05-17T18:09:22.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-25T10:57:26.0Z","End":"2014-09-13T23:39:26.0Z"},{"Start":"1976-11-10T03:46:16.0Z","End":"2013-12-14T08:05:07.0Z"}],"Free":[{"Start":"1963-05-15T02:27:29.0Z","End":"2011-06-20T08:04:52.0Z"},{"Start":"1944-05-28T09:46:22.0Z","End":"1962-03-03T03:54:01.0Z"},{"Start":"1977-04-01T03:23:53.0Z","End":"2011-07-10T05:08:49.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-26T15:29:46.0Z","End":"2011-12-28T13:39:36.0Z"},{"Start":"1985-12-16T23:10:35.0Z","End":"1978-01-17T07:33:34.0Z"}],"Free":[{"Start":"1961-12-21T08:06:15.0Z","End":"2001-11-25T19:06:42.0Z"},{"Start":"2012-02-01T05:20:31.0Z","End":"1966-03-14T11:37:05.0Z"},{"Start":"1982-07-31T18:01:33.0Z","End":"1994-05-04T18:06:25.0Z"},{"Start":"2008-12-25T06:22:59.0Z","End":"1983-12-04T06:40:29.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-15T18:50:20.0Z","End":"1998-12-05T14:32:08.0Z"},{"Start":"1984-09-09T17:12:50.0Z","End":"1970-10-26T13:21:13.0Z"},{"Start":"1958-04-08T20:58:26.0Z","End":"1960-07-16T17:49:21.0Z"}],"Free":[{"Start":"1982-08-27T17:13:55.0Z","End":"1968-11-29T02:08:34.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-23T17:36:36.0Z","End":"1959-09-08T13:36:27.0Z"}],"Free":[{"Start":"2001-04-08T11:30:53.0Z","End":"2005-06-02T21:30:14.0Z"},{"Start":"1979-01-05T18:37:01.0Z","End":"2019-06-09T10:59:31.0Z"},{"Start":"1971-01-16T17:04:38.0Z","End":"1960-05-17T18:09:22.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-25T10:57:26.0Z","End":"2014-09-13T23:39:26.0Z"},{"Start":"1976-11-10T03:46:16.0Z","End":"2013-12-14T08:05:07.0Z"}],"Free":[{"Start":"1963-05-15T02:27:29.0Z","End":"2011-06-20T08:04:52.0Z"},{"Start":"1944-05-28T09:46:22.0Z","End":"1962-03-03T03:54:01.0Z"},{"Start":"1977-04-01T03:23:53.0Z","End":"2011-07-10T05:08:49.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(url=url, body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-26T15:29:46.0Z","End":"2011-12-28T13:39:36.0Z"},{"Start":"1985-12-16T23:10:35.0Z","End":"1978-01-17T07:33:34.0Z"}],"Free":[{"Start":"1961-12-21T08:06:15.0Z","End":"2001-11-25T19:06:42.0Z"},{"Start":"2012-02-01T05:20:31.0Z","End":"1966-03-14T11:37:05.0Z"},{"Start":"1982-07-31T18:01:33.0Z","End":"1994-05-04T18:06:25.0Z"},{"Start":"2008-12-25T06:22:59.0Z","End":"1983-12-04T06:40:29.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-15T18:50:20.0Z","End":"1998-12-05T14:32:08.0Z"},{"Start":"1984-09-09T17:12:50.0Z","End":"1970-10-26T13:21:13.0Z"},{"Start":"1958-04-08T20:58:26.0Z","End":"1960-07-16T17:49:21.0Z"}],"Free":[{"Start":"1982-08-27T17:13:55.0Z","End":"1968-11-29T02:08:34.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-23T17:36:36.0Z","End":"1959-09-08T13:36:27.0Z"}],"Free":[{"Start":"2001-04-08T11:30:53.0Z","End":"2005-06-02T21:30:14.0Z"},{"Start":"1979-01-05T18:37:01.0Z","End":"2019-06-09T10:59:31.0Z"},{"Start":"1971-01-16T17:04:38.0Z","End":"1960-05-17T18:09:22.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-25T10:57:26.0Z","End":"2014-09-13T23:39:26.0Z"},{"Start":"1976-11-10T03:46:16.0Z","End":"2013-12-14T08:05:07.0Z"}],"Free":[{"Start":"1963-05-15T02:27:29.0Z","End":"2011-06-20T08:04:52.0Z"},{"Start":"1944-05-28T09:46:22.0Z","End":"1962-03-03T03:54:01.0Z"},{"Start":"1977-04-01T03:23:53.0Z","End":"2011-07-10T05:08:49.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(url=url_variant, body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-26T15:29:46.0Z","End":"2011-12-28T13:39:36.0Z"},{"Start":"1985-12-16T23:10:35.0Z","End":"1978-01-17T07:33:34.0Z"}],"Free":[{"Start":"1961-12-21T08:06:15.0Z","End":"2001-11-25T19:06:42.0Z"},{"Start":"2012-02-01T05:20:31.0Z","End":"1966-03-14T11:37:05.0Z"},{"Start":"1982-07-31T18:01:33.0Z","End":"1994-05-04T18:06:25.0Z"},{"Start":"2008-12-25T06:22:59.0Z","End":"1983-12-04T06:40:29.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-15T18:50:20.0Z","End":"1998-12-05T14:32:08.0Z"},{"Start":"1984-09-09T17:12:50.0Z","End":"1970-10-26T13:21:13.0Z"},{"Start":"1958-04-08T20:58:26.0Z","End":"1960-07-16T17:49:21.0Z"}],"Free":[{"Start":"1982-08-27T17:13:55.0Z","End":"1968-11-29T02:08:34.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-23T17:36:36.0Z","End":"1959-09-08T13:36:27.0Z"}],"Free":[{"Start":"2001-04-08T11:30:53.0Z","End":"2005-06-02T21:30:14.0Z"},{"Start":"1979-01-05T18:37:01.0Z","End":"2019-06-09T10:59:31.0Z"},{"Start":"1971-01-16T17:04:38.0Z","End":"1960-05-17T18:09:22.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-25T10:57:26.0Z","End":"2014-09-13T23:39:26.0Z"},{"Start":"1976-11-10T03:46:16.0Z","End":"2013-12-14T08:05:07.0Z"}],"Free":[{"Start":"1963-05-15T02:27:29.0Z","End":"2011-06-20T08:04:52.0Z"},{"Start":"1944-05-28T09:46:22.0Z","End":"1962-03-03T03:54:01.0Z"},{"Start":"1977-04-01T03:23:53.0Z","End":"2011-07-10T05:08:49.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(url=full_url, body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_postBooking(aioresponses: aioresponses):
    url = r'/booking'
    url_variant = r'booking'
    full_url = BASE_URL+r'/booking'

    request_dict = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://egpZNfFBa.tvnlNGgk0v"},{"ID":"https://buBjeTLpmnTgKUztkGK.pqvsEwkiZmyNgeSImHsnvoQUf.3KIvtTb"}]},"Time":{"Start":"1947-01-13T16:45:01.0Z","End":"1952-10-13T05:18:42.0Z"},"Type":"normal"}')
    request = post_booking_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBooking(body=request, **parameters)
            assert normalize_result(post_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBooking(url=url, body=request, **parameters)
            assert normalize_result(post_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBooking(url=url_variant, body=request, **parameters)
            assert normalize_result(post_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBooking(url=full_url, body=request, **parameters)
            assert normalize_result(post_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBooking(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_patchBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request_dict = json.loads(r'{}')
    request = patch_booking_request_body_from_dict(request_dict)

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchBooking(url=url, body=request, **parameters)
            assert normalize_result(patch_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchBooking(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchBooking(url=full_url, body=request, **parameters)
            assert normalize_result(patch_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchBooking(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_deleteBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://meMsm.xdigcAH1DeqS7KYg00WMVFvdHFi9jENfN","Time":{"Start":"2003-12-04T06:29:48.0Z","End":"1989-09-20T19:01:14.0Z"},"Devices":["https://AYKQXTFTAgMPOcXJuFVwxQmupPoOCjX.hkkyfuLSxo4lm2Iwil1QaifOIqKj2zjsJq9oZuORAi","http://enbJtSBUvWZK.dydyTKbknuYuIPvFzBhOYI82qnBEvaAxDzF,v-ZNsdk1rfaRChhXMqKKQXaKob"],"Status":"pending","You":true,"External":true,"Message":"sed sunt non enim occaecat"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=url, **parameters)
            assert normalize_result(get_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://meMsm.xdigcAH1DeqS7KYg00WMVFvdHFi9jENfN","Time":{"Start":"2003-12-04T06:29:48.0Z","End":"1989-09-20T19:01:14.0Z"},"Devices":["https://AYKQXTFTAgMPOcXJuFVwxQmupPoOCjX.hkkyfuLSxo4lm2Iwil1QaifOIqKj2zjsJq9oZuORAi","http://enbJtSBUvWZK.dydyTKbknuYuIPvFzBhOYI82qnBEvaAxDzF,v-ZNsdk1rfaRChhXMqKKQXaKob"],"Status":"pending","You":true,"External":true,"Message":"sed sunt non enim occaecat"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=url_variant, **parameters)
            assert normalize_result(get_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://meMsm.xdigcAH1DeqS7KYg00WMVFvdHFi9jENfN","Time":{"Start":"2003-12-04T06:29:48.0Z","End":"1989-09-20T19:01:14.0Z"},"Devices":["https://AYKQXTFTAgMPOcXJuFVwxQmupPoOCjX.hkkyfuLSxo4lm2Iwil1QaifOIqKj2zjsJq9oZuORAi","http://enbJtSBUvWZK.dydyTKbknuYuIPvFzBhOYI82qnBEvaAxDzF,v-ZNsdk1rfaRChhXMqKKQXaKob"],"Status":"pending","You":true,"External":true,"Message":"sed sunt non enim occaecat"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=full_url, **parameters)
            assert normalize_result(get_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_deleteBookingDestroy(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingDestroy(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingDestroy(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingDestroy(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_putBookingLock(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://yoMAnxJpiGEEkJWmzKnSqBtqhCnvIdMSr.cbrqcVvPcrHoB7.QLta4DcDk.jczRQZu-TfKCushfW+nJ6G0o2G1leLXCDu3a42jPisVbqbz","Time":{"Start":"1991-10-06T13:23:41.0Z","End":"2022-11-09T07:22:18.0Z"},"Devices":["https://xqNbClEPdpHKig.dhiiSiYrU3DYITw6tF1lmUdif8O07Y.LfqivCk3JNt7iUd9J,N4eDsNZfLZ70M","https://yTxELhUrJEDpBapgc.ttgsbLDKBsuj096crVKGCv,kj,hrV-RVDFyUhRLpwvGOaInHu1ZSt1drc5","http://urgvYKPgJ.wss5xn,ZSCgIP5RqnKMw5sFSj27mwK6wfLkBSkbnpwsw2hYZFqmdh+80zT-NM"],"Status":"active","You":false,"External":true,"Message":"Lorem ipsum incididunt","Type":"normal"},"Time":{"Start":"1983-04-15T20:32:04.0Z","End":"2022-12-06T01:04:53.0Z"},"Tokens":[{"Token":"ea Duis anim"},{"Device":"https://lujjGqZNTwEvcLV.nyfEzuMfcb,byZ1.XCuvg+T","Token":"consectetur aute nisi"},{"Device":"https://kFwUbbqqJHNFECezWeTvNmjTlr.ymDXzxt7.mNmOJ7P,4rOs","Token":"cillum sunt qui Lorem dolor"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBookingLock(url=url, **parameters)
            assert normalize_result(put_booking_lock_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://yoMAnxJpiGEEkJWmzKnSqBtqhCnvIdMSr.cbrqcVvPcrHoB7.QLta4DcDk.jczRQZu-TfKCushfW+nJ6G0o2G1leLXCDu3a42jPisVbqbz","Time":{"Start":"1991-10-06T13:23:41.0Z","End":"2022-11-09T07:22:18.0Z"},"Devices":["https://xqNbClEPdpHKig.dhiiSiYrU3DYITw6tF1lmUdif8O07Y.LfqivCk3JNt7iUd9J,N4eDsNZfLZ70M","https://yTxELhUrJEDpBapgc.ttgsbLDKBsuj096crVKGCv,kj,hrV-RVDFyUhRLpwvGOaInHu1ZSt1drc5","http://urgvYKPgJ.wss5xn,ZSCgIP5RqnKMw5sFSj27mwK6wfLkBSkbnpwsw2hYZFqmdh+80zT-NM"],"Status":"active","You":false,"External":true,"Message":"Lorem ipsum incididunt","Type":"normal"},"Time":{"Start":"1983-04-15T20:32:04.0Z","End":"2022-12-06T01:04:53.0Z"},"Tokens":[{"Token":"ea Duis anim"},{"Device":"https://lujjGqZNTwEvcLV.nyfEzuMfcb,byZ1.XCuvg+T","Token":"consectetur aute nisi"},{"Device":"https://kFwUbbqqJHNFECezWeTvNmjTlr.ymDXzxt7.mNmOJ7P,4rOs","Token":"cillum sunt qui Lorem dolor"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBookingLock(url=url_variant, **parameters)
            assert normalize_result(put_booking_lock_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://yoMAnxJpiGEEkJWmzKnSqBtqhCnvIdMSr.cbrqcVvPcrHoB7.QLta4DcDk.jczRQZu-TfKCushfW+nJ6G0o2G1leLXCDu3a42jPisVbqbz","Time":{"Start":"1991-10-06T13:23:41.0Z","End":"2022-11-09T07:22:18.0Z"},"Devices":["https://xqNbClEPdpHKig.dhiiSiYrU3DYITw6tF1lmUdif8O07Y.LfqivCk3JNt7iUd9J,N4eDsNZfLZ70M","https://yTxELhUrJEDpBapgc.ttgsbLDKBsuj096crVKGCv,kj,hrV-RVDFyUhRLpwvGOaInHu1ZSt1drc5","http://urgvYKPgJ.wss5xn,ZSCgIP5RqnKMw5sFSj27mwK6wfLkBSkbnpwsw2hYZFqmdh+80zT-NM"],"Status":"active","You":false,"External":true,"Message":"Lorem ipsum incididunt","Type":"normal"},"Time":{"Start":"1983-04-15T20:32:04.0Z","End":"2022-12-06T01:04:53.0Z"},"Tokens":[{"Token":"ea Duis anim"},{"Device":"https://lujjGqZNTwEvcLV.nyfEzuMfcb,byZ1.XCuvg+T","Token":"consectetur aute nisi"},{"Device":"https://kFwUbbqqJHNFECezWeTvNmjTlr.ymDXzxt7.mNmOJ7P,4rOs","Token":"cillum sunt qui Lorem dolor"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBookingLock(url=full_url, **parameters)
            assert normalize_result(put_booking_lock_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_deleteBookingLock(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getDevices(aioresponses: aioresponses):
    url = r'/devices'
    url_variant = r'devices'
    full_url = BASE_URL+r'/devices'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"occaecat ut non anim","owner":"http://XtyFMjWKLqVNOjoFVOCibGChfLnTd.elheA5xrKYP,KYInBcyGXAo7fWTRAFLv-I66+UEa11nOnUW,yrp7vU8tJDvqx-FBcm","url":"https://gUzGKHPeV.xtseja4ThHmONE6IMx"},{"description":"officia nisi ut","name":"ad amet dolore Duis","url":"https://xuSaiEaHtcvtcAzTVACnzItZUP.dpbsi.4CSbCelm2XPG6GJifZP5BwV","type":"cloud instantiable","owner":"http://knWGbtFvjEZogFuZq.jnbimyOtjLoxNnW04vVg+28XxLvtiBbTVsIXxMSxfV-cnpmwROVBavvKOxqv7Q"},{"description":"amet eu labore","url":"https://wrEF.iaf.vje-57RTm9JYGspOOJfsTdt0qLvKg914AbmBdlJfKZA4BFoJ","name":"sint cupidatat ipsum pariatur dolore","type":"device","owner":"http://NOdjkLvvuy.fihbxtyikUqV-5dwSkcBP+E4deORAAG2KGBsiq"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(**parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"occaecat ut non anim","owner":"http://XtyFMjWKLqVNOjoFVOCibGChfLnTd.elheA5xrKYP,KYInBcyGXAo7fWTRAFLv-I66+UEa11nOnUW,yrp7vU8tJDvqx-FBcm","url":"https://gUzGKHPeV.xtseja4ThHmONE6IMx"},{"description":"officia nisi ut","name":"ad amet dolore Duis","url":"https://xuSaiEaHtcvtcAzTVACnzItZUP.dpbsi.4CSbCelm2XPG6GJifZP5BwV","type":"cloud instantiable","owner":"http://knWGbtFvjEZogFuZq.jnbimyOtjLoxNnW04vVg+28XxLvtiBbTVsIXxMSxfV-cnpmwROVBavvKOxqv7Q"},{"description":"amet eu labore","url":"https://wrEF.iaf.vje-57RTm9JYGspOOJfsTdt0qLvKg914AbmBdlJfKZA4BFoJ","name":"sint cupidatat ipsum pariatur dolore","type":"device","owner":"http://NOdjkLvvuy.fihbxtyikUqV-5dwSkcBP+E4deORAAG2KGBsiq"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(url=url, **parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"occaecat ut non anim","owner":"http://XtyFMjWKLqVNOjoFVOCibGChfLnTd.elheA5xrKYP,KYInBcyGXAo7fWTRAFLv-I66+UEa11nOnUW,yrp7vU8tJDvqx-FBcm","url":"https://gUzGKHPeV.xtseja4ThHmONE6IMx"},{"description":"officia nisi ut","name":"ad amet dolore Duis","url":"https://xuSaiEaHtcvtcAzTVACnzItZUP.dpbsi.4CSbCelm2XPG6GJifZP5BwV","type":"cloud instantiable","owner":"http://knWGbtFvjEZogFuZq.jnbimyOtjLoxNnW04vVg+28XxLvtiBbTVsIXxMSxfV-cnpmwROVBavvKOxqv7Q"},{"description":"amet eu labore","url":"https://wrEF.iaf.vje-57RTm9JYGspOOJfsTdt0qLvKg914AbmBdlJfKZA4BFoJ","name":"sint cupidatat ipsum pariatur dolore","type":"device","owner":"http://NOdjkLvvuy.fihbxtyikUqV-5dwSkcBP+E4deORAAG2KGBsiq"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(url=url_variant, **parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"occaecat ut non anim","owner":"http://XtyFMjWKLqVNOjoFVOCibGChfLnTd.elheA5xrKYP,KYInBcyGXAo7fWTRAFLv-I66+UEa11nOnUW,yrp7vU8tJDvqx-FBcm","url":"https://gUzGKHPeV.xtseja4ThHmONE6IMx"},{"description":"officia nisi ut","name":"ad amet dolore Duis","url":"https://xuSaiEaHtcvtcAzTVACnzItZUP.dpbsi.4CSbCelm2XPG6GJifZP5BwV","type":"cloud instantiable","owner":"http://knWGbtFvjEZogFuZq.jnbimyOtjLoxNnW04vVg+28XxLvtiBbTVsIXxMSxfV-cnpmwROVBavvKOxqv7Q"},{"description":"amet eu labore","url":"https://wrEF.iaf.vje-57RTm9JYGspOOJfsTdt0qLvKg914AbmBdlJfKZA4BFoJ","name":"sint cupidatat ipsum pariatur dolore","type":"device","owner":"http://NOdjkLvvuy.fihbxtyikUqV-5dwSkcBP+E4deORAAG2KGBsiq"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(url=full_url, **parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postDevices(aioresponses: aioresponses):
    url = r'/devices'
    url_variant = r'devices'
    full_url = BASE_URL+r'/devices'

    request_dict = json.loads(r'{"services":[],"url":"https://FFtBZqePJevWvqANceH.erzuirQaTbcwUTzpisvYDrbm0JMrsFw.-U1iS5kUOo","type":"device","connected":true,"owner":"https://mDCjpDPqCPPtDeHBrJuRtfOZdAkcLQgiM.kjDA0FCmSOocI6lV.q9RAXULVivUlme.Yb+A5VglKZF9jsM33IUv5MmtYkt4tbqo7-gGC4","description":"consequat id commodo","name":"amet Duis eiusmod dolor deserunt","experiment":"https://yZjFsGlZmXSOaJmchy.ezuSwTSEZ9RaYnbjr-R86Gm5bddW7BbgjWvaia3qfQMtJd,JFhTVyi7xYNvwoq.FegAtFIqvVB","announcedAvailability":[{"repeat":{"frequency":"DAILY","until":"1996-05-07T13:37:26.0Z"}}]}')
    request = post_devices_request_body_from_dict(request_dict)

    parameter_list = [{"changedUrl": "test_string", }, {}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(url=url, body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(url=url_variant, body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(url=full_url, body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getDevice(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{"flat_group": True, }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevice(url=url, **parameters)
            assert normalize_result(get_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevice(url=url_variant, **parameters)
            assert normalize_result(get_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevice(url=full_url, **parameters)
            assert normalize_result(get_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patchDevice(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request_dict = json.loads(r'{"services":[],"url":"https://FFtBZqePJevWvqANceH.erzuirQaTbcwUTzpisvYDrbm0JMrsFw.-U1iS5kUOo","type":"device","connected":true,"owner":"https://mDCjpDPqCPPtDeHBrJuRtfOZdAkcLQgiM.kjDA0FCmSOocI6lV.q9RAXULVivUlme.Yb+A5VglKZF9jsM33IUv5MmtYkt4tbqo7-gGC4","description":"consequat id commodo","name":"amet Duis eiusmod dolor deserunt","experiment":"https://yZjFsGlZmXSOaJmchy.ezuSwTSEZ9RaYnbjr-R86Gm5bddW7BbgjWvaia3qfQMtJd,JFhTVyi7xYNvwoq.FegAtFIqvVB","announcedAvailability":[{"repeat":{"frequency":"DAILY","until":"1996-05-07T13:37:26.0Z"}}]}')
    request = patch_device_request_body_from_dict(request_dict)

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchDevice(url=url, body=request, **parameters)
            assert normalize_result(patch_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchDevice(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"device","owner":"http://wrvuppqewWdH.omhcAwZEk9qD7opUiXkFBrRItQoqFDF7XVlUNBNhMuyCMYhjfpg7qrt-Fj5hqnNkDvd8tzmY60V61j","url":"http://uFaodEpKyQkGvFI.gotilvYR.udrlbOB-hlPogvYKzKk","description":"fugiat eiusmod","name":"aute consequat veniam","services":[],"experiment":"http://RdmTyMiQYSUxtCuahvebSpQ.enR73CD5qG","connected":false}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchDevice(url=full_url, body=request, **parameters)
            assert normalize_result(patch_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchDevice(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_deleteDevice(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postDevice(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"announcedAvailability":[{"start":"1955-04-05T13:24:33.0Z","end":"1995-07-09T01:01:49.0Z"},{"end":"2006-05-21T03:59:35.0Z","start":"1956-06-28T07:18:09.0Z"},{"end":"2013-11-26T20:05:24.0Z"},{"end":"2015-04-20T07:20:39.0Z","start":"1975-07-12T21:18:12.0Z"}],"url":"http://uqyLriKDNyKa.qeZcaJtVX9mfvD76xUF+W4nYYFiXhN--1QmKZdxJnnq","services":[],"type":"device","connected":true,"name":"in","owner":"http://XtPxmagFFBylFzvNnkgMTYi.yvmlIqZeAORZPbJktCdGBIj2aFx5zB","description":"nostrud Lorem commodo Excepteur","experiment":"http://ziGqQoyUsaiCVXWUsGq.vgYEjjfQYlaoNU0.TNshwmZX97ESZapPxeXRR6oyHetq"},"deviceToken":"irure eu"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevice(url=url, **parameters)
            assert normalize_result(post_device_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"announcedAvailability":[{"start":"1955-04-05T13:24:33.0Z","end":"1995-07-09T01:01:49.0Z"},{"end":"2006-05-21T03:59:35.0Z","start":"1956-06-28T07:18:09.0Z"},{"end":"2013-11-26T20:05:24.0Z"},{"end":"2015-04-20T07:20:39.0Z","start":"1975-07-12T21:18:12.0Z"}],"url":"http://uqyLriKDNyKa.qeZcaJtVX9mfvD76xUF+W4nYYFiXhN--1QmKZdxJnnq","services":[],"type":"device","connected":true,"name":"in","owner":"http://XtPxmagFFBylFzvNnkgMTYi.yvmlIqZeAORZPbJktCdGBIj2aFx5zB","description":"nostrud Lorem commodo Excepteur","experiment":"http://ziGqQoyUsaiCVXWUsGq.vgYEjjfQYlaoNU0.TNshwmZX97ESZapPxeXRR6oyHetq"},"deviceToken":"irure eu"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevice(url=url_variant, **parameters)
            assert normalize_result(post_device_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"announcedAvailability":[{"start":"1955-04-05T13:24:33.0Z","end":"1995-07-09T01:01:49.0Z"},{"end":"2006-05-21T03:59:35.0Z","start":"1956-06-28T07:18:09.0Z"},{"end":"2013-11-26T20:05:24.0Z"},{"end":"2015-04-20T07:20:39.0Z","start":"1975-07-12T21:18:12.0Z"}],"url":"http://uqyLriKDNyKa.qeZcaJtVX9mfvD76xUF+W4nYYFiXhN--1QmKZdxJnnq","services":[],"type":"device","connected":true,"name":"in","owner":"http://XtPxmagFFBylFzvNnkgMTYi.yvmlIqZeAORZPbJktCdGBIj2aFx5zB","description":"nostrud Lorem commodo Excepteur","experiment":"http://ziGqQoyUsaiCVXWUsGq.vgYEjjfQYlaoNU0.TNshwmZX97ESZapPxeXRR6oyHetq"},"deviceToken":"irure eu"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevice(url=full_url, **parameters)
            assert normalize_result(post_device_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postDeviceAvailability(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'

    request_dict = json.loads(r'[{"start":"1976-10-06T11:55:07.0Z","end":"2021-01-22T01:01:32.0Z","available":true,"repeat":{"until":"1999-06-30T15:47:13.0Z"}},{"end":"1987-01-03T13:09:50.0Z"}]')
    request = post_device_availability_request_body_from_dict(request_dict)

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-12T22:16:02.0Z"},{"start":"1978-02-15T08:08:56.0Z","end":"2008-06-13T13:26:17.0Z"},{"end":"1972-02-01T23:19:08.0Z"},{"start":"1972-12-31T16:17:22.0Z","end":"1987-10-12T22:44:33.0Z"},{"end":"1980-02-27T07:28:44.0Z","start":"1991-04-17T21:27:31.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAvailability(url=url, body=request, **parameters)
            assert normalize_result(post_device_availability_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-12T22:16:02.0Z"},{"start":"1978-02-15T08:08:56.0Z","end":"2008-06-13T13:26:17.0Z"},{"end":"1972-02-01T23:19:08.0Z"},{"start":"1972-12-31T16:17:22.0Z","end":"1987-10-12T22:44:33.0Z"},{"end":"1980-02-27T07:28:44.0Z","start":"1991-04-17T21:27:31.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)
            assert normalize_result(post_device_availability_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-12T22:16:02.0Z"},{"start":"1978-02-15T08:08:56.0Z","end":"2008-06-13T13:26:17.0Z"},{"end":"1972-02-01T23:19:08.0Z"},{"start":"1972-12-31T16:17:22.0Z","end":"1987-10-12T22:44:33.0Z"},{"end":"1980-02-27T07:28:44.0Z","start":"1991-04-17T21:27:31.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAvailability(url=full_url, body=request, **parameters)
            assert normalize_result(post_device_availability_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceAvailability(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_postDeviceWebsocket(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/websocket'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/websocket'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/websocket'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceWebsocket(url=url, **parameters)
            assert normalize_result(post_device_websocket_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceWebsocket(url=url_variant, **parameters)
            assert normalize_result(post_device_websocket_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceWebsocket(url=full_url, **parameters)
            assert normalize_result(post_device_websocket_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceWebsocket(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postDeviceSignaling(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'

    request_dict = json.loads(r'{"messageType":"command","command":"createPeerconnection","connectionType":"websocket","connectionUrl":"http://mSxcAxcNBEEObpLmSlWMbhgcDFFq.phuibR+NAH9qR2hG,VoGNZCgZKXd5f-JF","services":[{"serviceType":"https://WN.yyqil0X0kH-nSbucxHwUKTp6riWuOEsxSyNTZz","serviceId":"ad reprehenderit","remoteServiceId":"laborum velit"},{"serviceType":"https://GaxqG.fcVGX0FK","serviceId":"exercitation","remoteServiceId":"dolor magna in proident"}],"tiebreaker":true,"config":{}}')
    request = post_device_signaling_request_body_from_dict(request_dict)

    parameter_list = [{"peerconnection_url": "test_string", }, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceSignaling(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceSignaling(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceSignaling(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceSignaling(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getPeerconnections(aioresponses: aioresponses):
    url = r'/peerconnections'
    url_variant = r'peerconnections'
    full_url = BASE_URL+r'/peerconnections'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"devices":[{"url":"https://AcAm.lbXLj6e"},{"url":"http://XrTgiHePnXvRPczPBULvYtI.wsavVsuGOEjKj7O3CmZC3P2wKB4,hn4VXd6cXxcgqpSF9gDwinLCTPN0xjFVloE.mcO9"}],"url":"https://HdGqlUwYyIraClLraHacgbNvWINA.clJ3KvdUzu2GNj4hKj,RdgY6seg"},{"devices":[{"url":"https://iIRIvlwbF.obmg.EeycdcbdoSy62ARR1HP7BQpX"},{"url":"https://XnJbyygWStGohyNKERsjdkm.urE4I2GeltAe-"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(**parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"devices":[{"url":"https://AcAm.lbXLj6e"},{"url":"http://XrTgiHePnXvRPczPBULvYtI.wsavVsuGOEjKj7O3CmZC3P2wKB4,hn4VXd6cXxcgqpSF9gDwinLCTPN0xjFVloE.mcO9"}],"url":"https://HdGqlUwYyIraClLraHacgbNvWINA.clJ3KvdUzu2GNj4hKj,RdgY6seg"},{"devices":[{"url":"https://iIRIvlwbF.obmg.EeycdcbdoSy62ARR1HP7BQpX"},{"url":"https://XnJbyygWStGohyNKERsjdkm.urE4I2GeltAe-"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(url=url, **parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"devices":[{"url":"https://AcAm.lbXLj6e"},{"url":"http://XrTgiHePnXvRPczPBULvYtI.wsavVsuGOEjKj7O3CmZC3P2wKB4,hn4VXd6cXxcgqpSF9gDwinLCTPN0xjFVloE.mcO9"}],"url":"https://HdGqlUwYyIraClLraHacgbNvWINA.clJ3KvdUzu2GNj4hKj,RdgY6seg"},{"devices":[{"url":"https://iIRIvlwbF.obmg.EeycdcbdoSy62ARR1HP7BQpX"},{"url":"https://XnJbyygWStGohyNKERsjdkm.urE4I2GeltAe-"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(url=url_variant, **parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"devices":[{"url":"https://AcAm.lbXLj6e"},{"url":"http://XrTgiHePnXvRPczPBULvYtI.wsavVsuGOEjKj7O3CmZC3P2wKB4,hn4VXd6cXxcgqpSF9gDwinLCTPN0xjFVloE.mcO9"}],"url":"https://HdGqlUwYyIraClLraHacgbNvWINA.clJ3KvdUzu2GNj4hKj,RdgY6seg"},{"devices":[{"url":"https://iIRIvlwbF.obmg.EeycdcbdoSy62ARR1HP7BQpX"},{"url":"https://XnJbyygWStGohyNKERsjdkm.urE4I2GeltAe-"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(url=full_url, **parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postPeerconnections(aioresponses: aioresponses):
    url = r'/peerconnections'
    url_variant = r'peerconnections'
    full_url = BASE_URL+r'/peerconnections'

    request_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
    request = post_peerconnections_request_body_from_dict(request_dict)

    parameter_list = [{"closedUrl": "test_string", "statusChangedUrl": "test_string", }, {"statusChangedUrl": "test_string", }, {"closedUrl": "test_string", }, {}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=url, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=url, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body202_to_dict(resp)) == normalize_result(response_202_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getPeerconnection(aioresponses: aioresponses):
    url = r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnection(url=url, **parameters)
            assert normalize_result(get_peerconnection_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnection(url=url_variant, **parameters)
            assert normalize_result(get_peerconnection_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"config":{"services":[{"remoteServiceId":"aliquip cillum sit laboris proident","serviceType":"http://KQNKmkiBeAKZTYtYeKBfWScV.lrytkFxV,ZrP-XBrNY-Pt"},{"remoteServiceId":"non aliqua proident","serviceType":"https://WnrvOdiQDOMpdYMcTq.noO+WfcTGn-SJlF,gLZ.+0sd4lfOBqeRcm0VW3vdF-s5","serviceId":"occaecat"},{"serviceType":"http://ZoSEaDhJkgXvaseY.myrzUuSpBSXiaGe4n-+KHudVEZQfvK3O+nRIwYJTSE5Ny,L","serviceId":"laboris"},{"serviceType":"https://GkopJXScAvTsPblHOnULiGlmEmOkeEn.uwbJBdQI"}]}}],"status":"failed","url":"https://bMJFHTrmqHvixazrXAYqbQYHMSCMKO.yjkNKx6ocxMqy"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnection(url=full_url, **parameters)
            assert normalize_result(get_peerconnection_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_deletePeerconnection(aioresponses: aioresponses):
    url = r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deletePeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deletePeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deletePeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getExperiments(aioresponses: aioresponses):
    url = r'/experiments'
    url_variant = r'experiments'
    full_url = BASE_URL+r'/experiments'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(**parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(url=url, **parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(url=url_variant, **parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(url=full_url, **parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postExperiments(aioresponses: aioresponses):
    url = r'/experiments'
    url_variant = r'experiments'
    full_url = BASE_URL+r'/experiments'

    request_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
    request = post_experiments_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=url, body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=url_variant, body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=full_url, body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(body=request, **parameters)
            assert normalize_result(post_experiments_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=url, body=request, **parameters)
            assert normalize_result(post_experiments_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=url_variant, body=request, **parameters)
            assert normalize_result(post_experiments_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=full_url, body=request, **parameters)
            assert normalize_result(post_experiments_response_body202_to_dict(resp)) == normalize_result(response_202_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getExperiment(aioresponses: aioresponses):
    url = r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiment(url=url, **parameters)
            assert normalize_result(get_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiment(url=url_variant, **parameters)
            assert normalize_result(get_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiment(url=full_url, **parameters)
            assert normalize_result(get_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patchExperiment(aioresponses: aioresponses):
    url = r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
    request = patch_experiment_request_body_from_dict(request_dict)

    parameter_list = [{"changedURL": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=url, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=full_url, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=url, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-21T17:34:21.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=full_url, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body202_to_dict(resp)) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_deleteExperiment(aioresponses: aioresponses):
    url = r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getInstitutions(aioresponses: aioresponses):
    url = r'/institutions'
    url_variant = r'institutions'
    full_url = BASE_URL+r'/institutions'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitutions(**parameters)
            assert normalize_result(get_institutions_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitutions(url=url, **parameters)
            assert normalize_result(get_institutions_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitutions(url=url_variant, **parameters)
            assert normalize_result(get_institutions_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitutions(url=full_url, **parameters)
            assert normalize_result(get_institutions_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitutions(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postInstitutions(aioresponses: aioresponses):
    url = r'/institutions'
    url_variant = r'institutions'
    full_url = BASE_URL+r'/institutions'

    request_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
    request = post_institutions_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postInstitutions(body=request, **parameters)
            assert normalize_result(post_institutions_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postInstitutions(url=url, body=request, **parameters)
            assert normalize_result(post_institutions_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postInstitutions(url=url_variant, body=request, **parameters)
            assert normalize_result(post_institutions_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postInstitutions(url=full_url, body=request, **parameters)
            assert normalize_result(post_institutions_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postInstitutions(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getInstitution(aioresponses: aioresponses):
    url = r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitution(url=url, **parameters)
            assert normalize_result(get_institution_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitution(url=url_variant, **parameters)
            assert normalize_result(get_institution_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getInstitution(url=full_url, **parameters)
            assert normalize_result(get_institution_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getInstitution(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patchInstitution(aioresponses: aioresponses):
    url = r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
    request = patch_institution_request_body_from_dict(request_dict)

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchInstitution(url=url, body=request, **parameters)
            assert normalize_result(patch_institution_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchInstitution(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_institution_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchInstitution(url=full_url, body=request, **parameters)
            assert normalize_result(patch_institution_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchInstitution(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_deleteInstitution(aioresponses: aioresponses):
    url = r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteInstitution(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_getUpdates(aioresponses: aioresponses):
    url = r'/updates'
    url_variant = r'updates'
    full_url = BASE_URL+r'/updates'

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"amet proident","latest_version":"sunt","latest_version_link":"http://PFzkKlx.ikRP2N+CI-nv-GYdvXXiO,ngMrQev"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdates(**parameters)
            assert normalize_result(get_updates_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"amet proident","latest_version":"sunt","latest_version_link":"http://PFzkKlx.ikRP2N+CI-nv-GYdvXXiO,ngMrQev"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdates(url=url, **parameters)
            assert normalize_result(get_updates_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"amet proident","latest_version":"sunt","latest_version_link":"http://PFzkKlx.ikRP2N+CI-nv-GYdvXXiO,ngMrQev"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdates(url=url_variant, **parameters)
            assert normalize_result(get_updates_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"amet proident","latest_version":"sunt","latest_version_link":"http://PFzkKlx.ikRP2N+CI-nv-GYdvXXiO,ngMrQev"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdates(url=full_url, **parameters)
            assert normalize_result(get_updates_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=full_url, **parameters)
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdates(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_postUpdates(aioresponses: aioresponses):
    url = r'/updates'
    url_variant = r'updates'
    full_url = BASE_URL+r'/updates'

    request_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
    request = post_updates_request_body_from_dict(request_dict)

    parameter_list = [{}, ]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUpdates(body=request, **parameters)
            assert normalize_result(post_updates_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUpdates(url=url, body=request, **parameters)
            assert normalize_result(post_updates_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUpdates(url=url_variant, body=request, **parameters)
            assert normalize_result(post_updates_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUpdates(url=full_url, body=request, **parameters)
            assert normalize_result(post_updates_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=full_url, body=request, **parameters)
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUpdates(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_getUpdate(aioresponses: aioresponses):
    url = r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{"current_version": "test_string", }, {}, ]

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=303)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=303)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=303)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUpdate(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patchUpdate(aioresponses: aioresponses):
    url = r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
    request = patch_update_request_body_from_dict(request_dict)

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUpdate(url=url, body=request, **parameters)
            assert normalize_result(patch_update_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUpdate(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_update_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"device_id":"enim incididunt in ipsum quis","latest_version":"magna velit aliquip cillum","latest_version_link":"http://MbDqRBByEQRnrHexTQexr.mmMcwHTtG5LNpgZN8S25xYB1GbMREwkXLgPol2Mce"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUpdate(url=full_url, body=request, **parameters)
            assert normalize_result(patch_update_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchUpdate(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_deleteUpdate(aioresponses: aioresponses):
    url = r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUpdate(url=full_url, **parameters)
