import re
import pytest
from aioresponses import aioresponses
import json
import datetime

from crosslab.api_client.client import APIClient
from crosslab.api_client.schemas import *  # noqa: F403

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
async def test_login(aioresponses: aioresponses):
    url = r'/login'
    url_variant = r'login'
    full_url = BASE_URL+r'/login'

    request = json.loads(r'{"username":"aute in","password":"do in"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.login(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.login(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.login(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"voluptate Ut nulla aliquip"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.login(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.login(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_logout(aioresponses: aioresponses):
    url = r'/logout'
    url_variant = r'logout'
    full_url = BASE_URL+r'/logout'

    request = json.loads(r'{"token":"dolore"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.logout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.logout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.logout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.logout(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.logout(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_list_users(aioresponses: aioresponses):
    url = r'/users'
    url_variant = r'users'
    full_url = BASE_URL+r'/users'

    parameter_list = [{"username": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://SyrjwTQktCePOwvKc.blfpSOA","id":"amet in irure ullamco","username":"proident occaecat","password":"do"},{"url":"https://FZTzXTceuBxxrAqTMCqKPQwFuhRlTkh.ozV,iY4Cq5F6ByZLCcSu8yqfCD","id":"dolor mollit in","username":"do in dolor aliquip anim","password":"adipisicing"},{"url":"http://ShyjZbZHQpYRrA.yqwHM27xmpypXQe.OAYKAUMLLLKDlgGO2MpdZKOinzOJ4Iz.QZxUUB4WRkvFk6O5kNaDA","id":"minim adipisicing consequat nostrud","username":"id ut officia aute","password":"ullamco irure nulla magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://SyrjwTQktCePOwvKc.blfpSOA","id":"amet in irure ullamco","username":"proident occaecat","password":"do"},{"url":"https://FZTzXTceuBxxrAqTMCqKPQwFuhRlTkh.ozV,iY4Cq5F6ByZLCcSu8yqfCD","id":"dolor mollit in","username":"do in dolor aliquip anim","password":"adipisicing"},{"url":"http://ShyjZbZHQpYRrA.yqwHM27xmpypXQe.OAYKAUMLLLKDlgGO2MpdZKOinzOJ4Iz.QZxUUB4WRkvFk6O5kNaDA","id":"minim adipisicing consequat nostrud","username":"id ut officia aute","password":"ullamco irure nulla magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://SyrjwTQktCePOwvKc.blfpSOA","id":"amet in irure ullamco","username":"proident occaecat","password":"do"},{"url":"https://FZTzXTceuBxxrAqTMCqKPQwFuhRlTkh.ozV,iY4Cq5F6ByZLCcSu8yqfCD","id":"dolor mollit in","username":"do in dolor aliquip anim","password":"adipisicing"},{"url":"http://ShyjZbZHQpYRrA.yqwHM27xmpypXQe.OAYKAUMLLLKDlgGO2MpdZKOinzOJ4Iz.QZxUUB4WRkvFk6O5kNaDA","id":"minim adipisicing consequat nostrud","username":"id ut officia aute","password":"ullamco irure nulla magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://SyrjwTQktCePOwvKc.blfpSOA","id":"amet in irure ullamco","username":"proident occaecat","password":"do"},{"url":"https://FZTzXTceuBxxrAqTMCqKPQwFuhRlTkh.ozV,iY4Cq5F6ByZLCcSu8yqfCD","id":"dolor mollit in","username":"do in dolor aliquip anim","password":"adipisicing"},{"url":"http://ShyjZbZHQpYRrA.yqwHM27xmpypXQe.OAYKAUMLLLKDlgGO2MpdZKOinzOJ4Iz.QZxUUB4WRkvFk6O5kNaDA","id":"minim adipisicing consequat nostrud","username":"id ut officia aute","password":"ullamco irure nulla magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_users(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_user(aioresponses: aioresponses):
    url = r'/users'
    url_variant = r'users'
    full_url = BASE_URL+r'/users'

    request = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_user(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_user(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_user(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_user(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"password":"cupidatat veniam"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_user(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_user(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_user(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_identity(aioresponses: aioresponses):
    url = r'/identity'
    url_variant = r'identity'
    full_url = BASE_URL+r'/identity'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_identity(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_identity(aioresponses: aioresponses):
    url = r'/identity'
    url_variant = r'identity'
    full_url = BASE_URL+r'/identity'

    request = json.loads(r'{"password":"cupidatat veniam"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://FBpFkjeMvxKCcBpxVjYLeOQ.jmhVgh-F,O,iQ6yI+,lfJZ9fx7cG5,1eX.UCVrA.QH+YJ","id":"adipisicing labore Duis aliquip consectetur","username":"irure ullamco reprehenderit cillum et","password":"ea eiusmod consequat commodo"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_identity(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_createToken(aioresponses: aioresponses):
    url = r'/token'
    url_variant = r'token'
    full_url = BASE_URL+r'/token'

    request = json.loads(r'{"username":"anim officia pariatur","claims":{}}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.createToken(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.createToken(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.createToken(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.createToken(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)


@pytest.mark.asyncio
async def test_list_devices(aioresponses: aioresponses):
    url = r'/devices'
    url_variant = r'devices'
    full_url = BASE_URL+r'/devices'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://aNrdMzPFuWzisBONmjQRMN.llolC2I5qLvemVzYfUzKsUi9xovhp","type":"device","name":"aute ullamco pariatur culpa","isPublic":true,"description":"voluptate ullamco ad do"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://aNrdMzPFuWzisBONmjQRMN.llolC2I5qLvemVzYfUzKsUi9xovhp","type":"device","name":"aute ullamco pariatur culpa","isPublic":true,"description":"voluptate ullamco ad do"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://aNrdMzPFuWzisBONmjQRMN.llolC2I5qLvemVzYfUzKsUi9xovhp","type":"device","name":"aute ullamco pariatur culpa","isPublic":true,"description":"voluptate ullamco ad do"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://aNrdMzPFuWzisBONmjQRMN.llolC2I5qLvemVzYfUzKsUi9xovhp","type":"device","name":"aute ullamco pariatur culpa","isPublic":true,"description":"voluptate ullamco ad do"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_devices(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_device(aioresponses: aioresponses):
    url = r'/devices'
    url_variant = r'devices'
    full_url = BASE_URL+r'/devices'

    request = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_device(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{"flat_group": True, }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_device(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"type":"edge instantiable","description":"pariatur in eiusmod labore","isPublic":false,"name":"laboris cillum","codeUrl":"http://QblO.ffcGKH1ED3fPOBTyerGwtJ4UD9E1NiF.bxoD8s-fuY+yLMmP,oAFUW3gS4B-wVcgatjsvw","services":[{"serviceType":"http://C.tdmMm4hNgkVgLuSf-j6aZsAvSV4G43m6xYh-C0Zhw8ZZHuJsVdTg-4IG7lSsCpQNl3qWrLCZbQzsf8qdakz"},{"serviceType":"http://PFR.vemnVwEHi7XcdhWuusxwnb5dv-NIUYp"}]}')

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","isPublic":true,"devices":[{"url":"http://nbD.csEoC-Om8TDGf0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWazfNBmGF"},{"url":"https://Kr.jgaZvVDCiSeF89YumGOjoC"},{"url":"http://iO.ftdf0kcgN3,iyJvCKIeH3KwDQHkah0G+BcBFq+fII"},{"url":"https://WOEvUdgAIpRBEVeeKJbJUFMYxRPsgpOCG.coy,e42gdrOXCLnYfGzKAMPo"}],"description":"in reprehenderit"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_device(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_device(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_instantiate_device(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","isPublic":false,"connected":true,"description":"laborum esse mollit qui id","announcedAvailability":[{"start":"1987-03-23T05:14:41.0Z"},{"end":"1965-03-11T12:53:01.0Z"},{"start":"1954-07-06T20:01:02.0Z","end":"1974-11-27T02:51:08.0Z"}],"experiment":"https://nNgZjFBlEPjdEVgfMVPOFpZTmnKGzfcWu.jxkiLd4ha7gCcBsCOABLkAHn1bYFt4-W+cLaDmUm4NdFK5HarmBXql","services":[{"serviceDirection":"prosumer","serviceId":"in cillum","serviceType":"https://YLJrLizqZVEgQDBKxrMqDElLJBgB.rsK3"},{"serviceId":"velit do ut incididunt","serviceType":"https://pfLtXZUuhQUIHgMplzPWpIWTsmJkTh.hiikIN6CQC.H.DSGkgIfiHihDPylLJROu.hqgrSoXIyx"}]},"deviceToken":"esse"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","isPublic":false,"connected":true,"description":"laborum esse mollit qui id","announcedAvailability":[{"start":"1987-03-23T05:14:41.0Z"},{"end":"1965-03-11T12:53:01.0Z"},{"start":"1954-07-06T20:01:02.0Z","end":"1974-11-27T02:51:08.0Z"}],"experiment":"https://nNgZjFBlEPjdEVgfMVPOFpZTmnKGzfcWu.jxkiLd4ha7gCcBsCOABLkAHn1bYFt4-W+cLaDmUm4NdFK5HarmBXql","services":[{"serviceDirection":"prosumer","serviceId":"in cillum","serviceType":"https://YLJrLizqZVEgQDBKxrMqDElLJBgB.rsK3"},{"serviceId":"velit do ut incididunt","serviceType":"https://pfLtXZUuhQUIHgMplzPWpIWTsmJkTh.hiikIN6CQC.H.DSGkgIfiHihDPylLJROu.hqgrSoXIyx"}]},"deviceToken":"esse"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","isPublic":false,"connected":true,"description":"laborum esse mollit qui id","announcedAvailability":[{"start":"1987-03-23T05:14:41.0Z"},{"end":"1965-03-11T12:53:01.0Z"},{"start":"1954-07-06T20:01:02.0Z","end":"1974-11-27T02:51:08.0Z"}],"experiment":"https://nNgZjFBlEPjdEVgfMVPOFpZTmnKGzfcWu.jxkiLd4ha7gCcBsCOABLkAHn1bYFt4-W+cLaDmUm4NdFK5HarmBXql","services":[{"serviceDirection":"prosumer","serviceId":"in cillum","serviceType":"https://YLJrLizqZVEgQDBKxrMqDElLJBgB.rsK3"},{"serviceId":"velit do ut incididunt","serviceType":"https://pfLtXZUuhQUIHgMplzPWpIWTsmJkTh.hiikIN6CQC.H.DSGkgIfiHihDPylLJROu.hqgrSoXIyx"}]},"deviceToken":"esse"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.instantiate_device(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_device_availability(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'

    parameter_list = [{"startTime": "test_string", "endTime": "test_string", }, {"endTime": "test_string", }, {"startTime": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device_availability(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device_availability(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device_availability(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_device_availability(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_delete_device_availability_rules(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_device_availability_rules(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_device_availability_rules(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_device_availability_rules(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_device_availability_rules(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_add_device_availability_rules(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'

    request = json.loads(r'[{"start":"1976-10-07T22:53:32.0Z","end":"2021-01-23T10:58:58.0Z","available":true,"repeat":{"frequency":"DAILY","count":-28462768,"until":"2022-08-07T23:17:41.0Z"}},{"repeat":{"frequency":"HOURLY"},"start":"1943-11-02T13:33:50.0Z","available":true}]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_device_availability_rules(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_device_availability_rules(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_device_availability_rules(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_create_websocket_token(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/websocket'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/websocket'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/websocket'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_websocket_token(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_websocket_token(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_websocket_token(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_websocket_token(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_send_signaling_message(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'

    request = json.loads(r'{"messageType":"command","command":"closePeerconnection","connectionUrl":"http://XuAPamxDhfIsAsnxNretlqneCY.avbkCVtwesEEf,Dkiw.md"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.send_signaling_message(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.send_signaling_message(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.send_signaling_message(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.send_signaling_message(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_list_peerconnections(aioresponses: aioresponses):
    url = r'/peerconnections'
    url_variant = r'peerconnections'
    full_url = BASE_URL+r'/peerconnections'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://KyoRQQYXuhRcWsIdHlKRtrJNQLyPcQVL.loyroBUNq2vo2FfhgDMRPF7JkHgaJe6P1agO5OeOpw3","type":"local","status":"new","devices":[{"url":"http://bxjqRiwE.pyoFSG4ANEBNkh15v6NcAvF3W+"},{"url":"https://owgXIbFEJIqVUszBtNaxcvsWHfkF.irvnNrOFl.LCXjM8qqRk6CwLRtjYsuVVBby3LIRM15oLcPZc"}]},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwdijwlzUO6GliE,00NIKH18ukk+V4NymKPZckn7l5O6k11fQrKB8n5Vb+mpAhl2wTFMBCgvADfq4Zc","type":"webrtc","status":"closed","devices":[{"url":"https://xRQUlPQYzvcrakgdzTVIoAQnrb.cyxAtoN-TSrnv6gA9TAoimb+KfzslNXC1ACXLVvqZIqVxD.P8LQJdN"},{"url":"http://MfAlOZEDr.xesp,LQpxWsZb8hsnLtIMgHDzuy6CyZ-W"}]},{"url":"https://XIuyclfuimxfXPeEGIcDKNBA.wrysIrNUAtAOOLUIm,fyivTctJF4d6-P,PhOVokkT8DEl6H6E2wz8YGx5MVOsinjF","type":"local","status":"connecting","devices":[{"url":"https://iVljKwCoObDTwhQ.bqUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}]},{"url":"http://lQxLOheIR.wrdcGhkFofSBB0DjYRoxbhHZ5f90YT0TH7T1xRRWXeySaSQyoNjrk","type":"local","status":"new","devices":[{"url":"https://xEFDGdwGuJuQsUVJQSMlTBYiLwEMDPPbX.kpwat2zO6VQ0mUKSU6A5fLr-HwK90DYD31JE1dPz.MguVngRXo7TKyOBic7zw"},{"url":"http://FeNTUUJUyfAngKomi.jabuY-i"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://KyoRQQYXuhRcWsIdHlKRtrJNQLyPcQVL.loyroBUNq2vo2FfhgDMRPF7JkHgaJe6P1agO5OeOpw3","type":"local","status":"new","devices":[{"url":"http://bxjqRiwE.pyoFSG4ANEBNkh15v6NcAvF3W+"},{"url":"https://owgXIbFEJIqVUszBtNaxcvsWHfkF.irvnNrOFl.LCXjM8qqRk6CwLRtjYsuVVBby3LIRM15oLcPZc"}]},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwdijwlzUO6GliE,00NIKH18ukk+V4NymKPZckn7l5O6k11fQrKB8n5Vb+mpAhl2wTFMBCgvADfq4Zc","type":"webrtc","status":"closed","devices":[{"url":"https://xRQUlPQYzvcrakgdzTVIoAQnrb.cyxAtoN-TSrnv6gA9TAoimb+KfzslNXC1ACXLVvqZIqVxD.P8LQJdN"},{"url":"http://MfAlOZEDr.xesp,LQpxWsZb8hsnLtIMgHDzuy6CyZ-W"}]},{"url":"https://XIuyclfuimxfXPeEGIcDKNBA.wrysIrNUAtAOOLUIm,fyivTctJF4d6-P,PhOVokkT8DEl6H6E2wz8YGx5MVOsinjF","type":"local","status":"connecting","devices":[{"url":"https://iVljKwCoObDTwhQ.bqUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}]},{"url":"http://lQxLOheIR.wrdcGhkFofSBB0DjYRoxbhHZ5f90YT0TH7T1xRRWXeySaSQyoNjrk","type":"local","status":"new","devices":[{"url":"https://xEFDGdwGuJuQsUVJQSMlTBYiLwEMDPPbX.kpwat2zO6VQ0mUKSU6A5fLr-HwK90DYD31JE1dPz.MguVngRXo7TKyOBic7zw"},{"url":"http://FeNTUUJUyfAngKomi.jabuY-i"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://KyoRQQYXuhRcWsIdHlKRtrJNQLyPcQVL.loyroBUNq2vo2FfhgDMRPF7JkHgaJe6P1agO5OeOpw3","type":"local","status":"new","devices":[{"url":"http://bxjqRiwE.pyoFSG4ANEBNkh15v6NcAvF3W+"},{"url":"https://owgXIbFEJIqVUszBtNaxcvsWHfkF.irvnNrOFl.LCXjM8qqRk6CwLRtjYsuVVBby3LIRM15oLcPZc"}]},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwdijwlzUO6GliE,00NIKH18ukk+V4NymKPZckn7l5O6k11fQrKB8n5Vb+mpAhl2wTFMBCgvADfq4Zc","type":"webrtc","status":"closed","devices":[{"url":"https://xRQUlPQYzvcrakgdzTVIoAQnrb.cyxAtoN-TSrnv6gA9TAoimb+KfzslNXC1ACXLVvqZIqVxD.P8LQJdN"},{"url":"http://MfAlOZEDr.xesp,LQpxWsZb8hsnLtIMgHDzuy6CyZ-W"}]},{"url":"https://XIuyclfuimxfXPeEGIcDKNBA.wrysIrNUAtAOOLUIm,fyivTctJF4d6-P,PhOVokkT8DEl6H6E2wz8YGx5MVOsinjF","type":"local","status":"connecting","devices":[{"url":"https://iVljKwCoObDTwhQ.bqUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}]},{"url":"http://lQxLOheIR.wrdcGhkFofSBB0DjYRoxbhHZ5f90YT0TH7T1xRRWXeySaSQyoNjrk","type":"local","status":"new","devices":[{"url":"https://xEFDGdwGuJuQsUVJQSMlTBYiLwEMDPPbX.kpwat2zO6VQ0mUKSU6A5fLr-HwK90DYD31JE1dPz.MguVngRXo7TKyOBic7zw"},{"url":"http://FeNTUUJUyfAngKomi.jabuY-i"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://KyoRQQYXuhRcWsIdHlKRtrJNQLyPcQVL.loyroBUNq2vo2FfhgDMRPF7JkHgaJe6P1agO5OeOpw3","type":"local","status":"new","devices":[{"url":"http://bxjqRiwE.pyoFSG4ANEBNkh15v6NcAvF3W+"},{"url":"https://owgXIbFEJIqVUszBtNaxcvsWHfkF.irvnNrOFl.LCXjM8qqRk6CwLRtjYsuVVBby3LIRM15oLcPZc"}]},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwdijwlzUO6GliE,00NIKH18ukk+V4NymKPZckn7l5O6k11fQrKB8n5Vb+mpAhl2wTFMBCgvADfq4Zc","type":"webrtc","status":"closed","devices":[{"url":"https://xRQUlPQYzvcrakgdzTVIoAQnrb.cyxAtoN-TSrnv6gA9TAoimb+KfzslNXC1ACXLVvqZIqVxD.P8LQJdN"},{"url":"http://MfAlOZEDr.xesp,LQpxWsZb8hsnLtIMgHDzuy6CyZ-W"}]},{"url":"https://XIuyclfuimxfXPeEGIcDKNBA.wrysIrNUAtAOOLUIm,fyivTctJF4d6-P,PhOVokkT8DEl6H6E2wz8YGx5MVOsinjF","type":"local","status":"connecting","devices":[{"url":"https://iVljKwCoObDTwhQ.bqUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}]},{"url":"http://lQxLOheIR.wrdcGhkFofSBB0DjYRoxbhHZ5f90YT0TH7T1xRRWXeySaSQyoNjrk","type":"local","status":"new","devices":[{"url":"https://xEFDGdwGuJuQsUVJQSMlTBYiLwEMDPPbX.kpwat2zO6VQ0mUKSU6A5fLr-HwK90DYD31JE1dPz.MguVngRXo7TKyOBic7zw"},{"url":"http://FeNTUUJUyfAngKomi.jabuY-i"}]}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_peerconnections(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_peerconnection(aioresponses: aioresponses):
    url = r'/peerconnections'
    url_variant = r'peerconnections'
    full_url = BASE_URL+r'/peerconnections'

    request = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')

    parameter_list = [{"closedUrl": "test_string", "statusChangedUrl": "test_string", }, {"statusChangedUrl": "test_string", }, {"closedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_peerconnection(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_peerconnection(aioresponses: aioresponses):
    url = r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://ZnmCaDwDZcwqHW.cgeHADwo0CkibZIG1zc","type":"local","status":"connected","devices":[{"url":"https://PEGrHOLQYcccMVdb.ipnlkFEXbKcWazfSNQFoKDjJ5Ws3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9L","config":{"services":[{"serviceType":"https://iGIrSTp.bzworHEa0","serviceId":"aliqua cillum Excepteur laboris esse","remoteServiceId":"in sint"},{"serviceType":"https://VoymRVmLubggNTTFPrug.zoAJXL-VfGPB8uHe-rwssK91gVYcJBKz1u2ReUC52p","serviceId":"consectetur sint Excepteur sunt officia","remoteServiceId":"culpa non proident"},{"serviceType":"https://haJUSAKEUERVbgfpmAHvoyuJDCtqOvZw.rysHf3v3Sqbin-tFAcXUejgpwy1jEljshsePGHbXgNYg-P,D.CWrQTQavnZgMBdsEacpA5bS8OD9L,GQ0rD+I.sa","serviceId":"amet","remoteServiceId":"irure"},{"serviceType":"https://kzvRkiTrnnGqTPmFzc.mlBzYqtNIei+1Pp+.8HjiW5N3heOD,Lv.tk4ah-ULS.","serviceId":"dolor ad","remoteServiceId":"velit consectetur"},{"serviceType":"http://bumUiBhZlPqOdNyDAmecElfIp.faR5vf+JE96JSPBwTwNqDS4dyVolmK9RkXqa6mu8U","serviceId":"magna consequat dolore consectetur in","remoteServiceId":"Duis pariatur"}]}},{"url":"http://RCC.xnh9RqBp21NezRSBM9qBu.lYZ","config":{"services":[{"serviceType":"http://GkobAvGdWTGUkFMlsAQgzOS.cfhbmzyMaodW1PTYPnB1pv","serviceId":"amet pariatur","remoteServiceId":"ad aliquip culpa id ut"},{"serviceType":"https://olefbn.bhqYmlvv4LeXDAigedv5j9pFsXJ2AQHHqoo9BnjSZ4zbNN4iFgQi","serviceId":"eiusmod cillum consectetur","remoteServiceId":"nulla ullamco aliquip"},{"serviceType":"http://JWF.gmkADnB5hEoPtbJZPzYqcGada,dKkcp-nkfRmFXI529EIS.","serviceId":"aliquip cillum do fugiat","remoteServiceId":"Lorem"},{"serviceType":"https://CdFNRIuYfRAkxzvWuWSeiLlq.wsGakGAtuwXmkNAFqseNQ49Q1jy70afvQcAKID","serviceId":"nisi in dolore culpa","remoteServiceId":"dolore aliqua"},{"serviceType":"http://NtCgOQPenFkFCpBSmQvIWRbNaPEA.fwrX2H+Kg7fZBauVS5IwTMWpfJd8zw2Edu8azpFu-xukP+lJZgqPOaFf.gxISeK-","serviceId":"incididunt deserunt reprehenderit dolore non","remoteServiceId":"pariatur"}]}}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_peerconnection(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_delete_peerconnection(aioresponses: aioresponses):
    url = r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_peerconnection(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patch_peerconnection_device_status(aioresponses: aioresponses):
    url = r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c/device_status'
    url_variant = r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c/device_status'
    full_url = BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c/device_status'

    request = json.loads(r'{"status":"closed"}')

    parameter_list = [{"device_url": "test_string", }, ]

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_peerconnection_device_status(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_peerconnection_device_status(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_list_experiments(aioresponses: aioresponses):
    url = r'/experiments'
    url_variant = r'experiments'
    full_url = BASE_URL+r'/experiments'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://NwclrXAIoAJHMVyKoIoS.xxfoad9OtNWxMyq2kGx5D4","status":"created"},{"url":"https://gpvQwLgrWBBvxozT.rdbpyyMAR8WSBkoXtkDeX7BysNkrZe.8SlFVwdKIGbmewpJjeU0ayCar6q74SqFK8vAvqSrmK1BfSqgJCQPcF","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://NwclrXAIoAJHMVyKoIoS.xxfoad9OtNWxMyq2kGx5D4","status":"created"},{"url":"https://gpvQwLgrWBBvxozT.rdbpyyMAR8WSBkoXtkDeX7BysNkrZe.8SlFVwdKIGbmewpJjeU0ayCar6q74SqFK8vAvqSrmK1BfSqgJCQPcF","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://NwclrXAIoAJHMVyKoIoS.xxfoad9OtNWxMyq2kGx5D4","status":"created"},{"url":"https://gpvQwLgrWBBvxozT.rdbpyyMAR8WSBkoXtkDeX7BysNkrZe.8SlFVwdKIGbmewpJjeU0ayCar6q74SqFK8vAvqSrmK1BfSqgJCQPcF","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://NwclrXAIoAJHMVyKoIoS.xxfoad9OtNWxMyq2kGx5D4","status":"created"},{"url":"https://gpvQwLgrWBBvxozT.rdbpyyMAR8WSBkoXtkDeX7BysNkrZe.8SlFVwdKIGbmewpJjeU0ayCar6q74SqFK8vAvqSrmK1BfSqgJCQPcF","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_experiments(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_experiment(aioresponses: aioresponses):
    url = r'/experiments'
    url_variant = r'experiments'
    full_url = BASE_URL+r'/experiments'

    request = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')

    parameter_list = [{"changedURL": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_experiment(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_experiment(aioresponses: aioresponses):
    url = r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_experiment(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_experiment(aioresponses: aioresponses):
    url = r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{}')

    parameter_list = [{"changedURL": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://sDsoOPRmkjI.fantp2-m6xNh1nbnRinYaY0StC.h8DVQ.HHlxgx8vbhcX7PGf4cDTebrE+MzJDU7O8tcZM","status":"finished","devices":[{"device":"http://XCSbVyX.blmlfg.yeMXbXPUXYN1sQ5J,V-l8yup-sQREU7Sl7CbxmawUZedWb0geUJsAEa","role":"enim Lorem eu Duis do"},{"device":"https://iwFlKRRwCqApZzrf.qoWRZdL,qLMoXL6WuVWyUg2zunyNJ5F","role":"tempor nulla"}],"roles":[{"name":"cillum culpa ad sed"},{"name":"eiusmod sunt ea sit"},{"name":"Lorem qui adipisicing pariatur","description":"aliquip adipisicing sit sint"},{"name":"aute eiusmod Duis qui officia"}],"serviceConfigurations":[{"serviceType":"https://eWogvyvrSzzkIVVzOeFDwkpWq.rcwyaHlTdACsCVArlrxltHGGplQEA-","participants":[{"role":"enim fugiat esse proident et","serviceId":"ad commodo esse exercitation"},{"role":"ea","serviceId":"eiusmod velit amet nisi ut"},{"role":"cupidatat proident laborum"},{"serviceId":"velit fugiat tempor officia deserunt","role":"laboris officia"}]}],"connections":["https://ByEhVICZNH.vkGHCVd1C0,fcvmuWSm6vS.3lTtzqv.ZQozV2dUvu"],"instantiatedDevices":[{"codeUrl":"https://LmeHCXSiRBoBpb.gpcdSUeIPMY3MNujB7qsa2ej4Rfuof","url":"https://dJrEFfM.esqiFDScB-quK6T","token":"culpa aute dolor","instanceOf":"https://wSsZqjtJZQORyVs.razHf8fAyahkFEXskHi4Z.n68iE7Wj3PzL+"},{"codeUrl":"http://QyCMnENVZCazMcVWnfbJRuipADOHFF.unFEX,+SQXRNgybZ6sqmow16LocOv+ORofQHAjfgBZGZ2BNJJF0,MEdxqjLbvnsK1RFGUtCvu","url":"https://OasRsrJ.eue,yoVQnpztVBcEakrMXt6DZxJ3gMQfezWUqhCs,Beuor4tVe-R","token":"irure","instanceOf":"http://ZrANaqicWqDeQVXiyFNLygHEmJ.lhxunzZohWBR,P4WsOhN"},{"codeUrl":"http://tqGvzZRYMnIpbEq.dfd3KzGqEbY7nGET,MIRa,4yA9Jcvp+w4JsvUVV5Xf6B3mbGN2EtFOIoUmRpQEcmPtprjPGoyDlfMa9","url":"http://aFiFOpAtCIkycbkjwlVufjwyFlIuq.yzmoDagHx,g+A","token":"velit est reprehenderit ullamco","instanceOf":"https://ABbqtDNNWcsjDbqMTUpcvchBr.ozkamzZi.YFMOM8uWkr6imPBIZZg6zpuN3WE+y"}],"bookingTime":{"startTime":"1966-10-04T13:42:57.0Z","endTime":"2014-06-20T19:58:45.0Z"}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_experiment(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_experiment(aioresponses: aioresponses):
    url = r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_experiment(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_list_template(aioresponses: aioresponses):
    url = r'/templates'
    url_variant = r'templates'
    full_url = BASE_URL+r'/templates'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://dEnPTTaJuYsWuMSMJ.hzcOi3Oby3vCu6b5UG8s5jenJOlkxf","name":"amet","description":"cillum officia proident"},{"url":"https://Kc.qubPO,JL1ZSXkeu9GvR4G8l9s7.HDOqrfh,gvdfPn-MUBCBIBFXnev","name":"Excepteur incididunt pariatur non amet","description":"non id amet"},{"url":"http://InEoUuVomSJSUzLltNkjhcfmMepfy.hnYp2p-Uqd41mMSc-,4agJLIBuf0N9VKHHI+j2pfzB.+Sk7GMggGRkhVufnMtivMY","name":"laboris anim tempor"},{"url":"http://qCDKcSdOGBnYCFuiiuwNE.srsuitsZr1jRDYBu4jlPBJQQUBDp26Fih3xmsTxdzMJv","name":"non","description":"sit cillum qui"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://dEnPTTaJuYsWuMSMJ.hzcOi3Oby3vCu6b5UG8s5jenJOlkxf","name":"amet","description":"cillum officia proident"},{"url":"https://Kc.qubPO,JL1ZSXkeu9GvR4G8l9s7.HDOqrfh,gvdfPn-MUBCBIBFXnev","name":"Excepteur incididunt pariatur non amet","description":"non id amet"},{"url":"http://InEoUuVomSJSUzLltNkjhcfmMepfy.hnYp2p-Uqd41mMSc-,4agJLIBuf0N9VKHHI+j2pfzB.+Sk7GMggGRkhVufnMtivMY","name":"laboris anim tempor"},{"url":"http://qCDKcSdOGBnYCFuiiuwNE.srsuitsZr1jRDYBu4jlPBJQQUBDp26Fih3xmsTxdzMJv","name":"non","description":"sit cillum qui"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://dEnPTTaJuYsWuMSMJ.hzcOi3Oby3vCu6b5UG8s5jenJOlkxf","name":"amet","description":"cillum officia proident"},{"url":"https://Kc.qubPO,JL1ZSXkeu9GvR4G8l9s7.HDOqrfh,gvdfPn-MUBCBIBFXnev","name":"Excepteur incididunt pariatur non amet","description":"non id amet"},{"url":"http://InEoUuVomSJSUzLltNkjhcfmMepfy.hnYp2p-Uqd41mMSc-,4agJLIBuf0N9VKHHI+j2pfzB.+Sk7GMggGRkhVufnMtivMY","name":"laboris anim tempor"},{"url":"http://qCDKcSdOGBnYCFuiiuwNE.srsuitsZr1jRDYBu4jlPBJQQUBDp26Fih3xmsTxdzMJv","name":"non","description":"sit cillum qui"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://dEnPTTaJuYsWuMSMJ.hzcOi3Oby3vCu6b5UG8s5jenJOlkxf","name":"amet","description":"cillum officia proident"},{"url":"https://Kc.qubPO,JL1ZSXkeu9GvR4G8l9s7.HDOqrfh,gvdfPn-MUBCBIBFXnev","name":"Excepteur incididunt pariatur non amet","description":"non id amet"},{"url":"http://InEoUuVomSJSUzLltNkjhcfmMepfy.hnYp2p-Uqd41mMSc-,4agJLIBuf0N9VKHHI+j2pfzB.+Sk7GMggGRkhVufnMtivMY","name":"laboris anim tempor"},{"url":"http://qCDKcSdOGBnYCFuiiuwNE.srsuitsZr1jRDYBu4jlPBJQQUBDp26Fih3xmsTxdzMJv","name":"non","description":"sit cillum qui"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_template(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_template(aioresponses: aioresponses):
    url = r'/templates'
    url_variant = r'templates'
    full_url = BASE_URL+r'/templates'

    request = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_template(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_template(aioresponses: aioresponses):
    url = r'/templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_template(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_template(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_template(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_template(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_template(aioresponses: aioresponses):
    url = r'/templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"configuration":{"devices":[{"device":"http://TjClcMTsTneVvyh.oxymgamdguHtSHGDrAGyQD6rpWRyir98NrwW-0E-+rqw-uAhGB1UWya","role":"in qui ea"},{"device":"https://rfrCZCogtTmVNomYpC.oopoTPC+NV51NRqd+LD7YkelP","role":"sunt ut pariatur"},{"device":"https://TxPxGfrBpXPSOyKfrqELLjoFhNtD.pgFIPq4JtnnZAV-PYAAkvZ0f4.e+fMGC2MI2blmPIN3aYMgatFAdbdjyOaLcOxY.","role":"nulla"},{"device":"https://OUmszbEQDNaNeBnH.onbWfaLcHQJQ6GEqi9jKCd2PyH9gnaGD9L7xg1-c","role":"est"},{"device":"https://bfyh.gzwlNukzh3bAKRBytEXUfPmfaZdgnjuEx","role":"Duis laboris ad dolor"}],"roles":[{"name":"ex consequat enim ad nulla"},{"name":"ullamco voluptate","description":"qui consectetur"}]}}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://JSuXHAumyAeyFukMkfiyRDHDwU.xtqEVymni78ho8N0sJIk1SIx7EKNkXbNzTb-m2Xe","name":"in ut labore","configuration":{"devices":[{"device":"http://YcrwHnzlJbqvraJdPzskkpMAJ.lmknpOKwA76k","role":"in dolor"}],"roles":[{"name":"eiusmod est","description":"et dolor"}],"serviceConfigurations":[{"participants":[{"role":"ut cupidatat dolore","serviceId":"id reprehenderit dolor ut nulla"},{"role":"est","serviceId":"eu do magna consectetur ex"}],"serviceType":"https://w.dkhbdbztwqw3OP5q-nUFG3mE47ecnOztwA28qTxsoV7YnlGj"},{"serviceType":"http://kfLcbo.kpbseWMX+jtlWwpQK-zIT--o8x5y-B6Pb,WYRxi","participants":[{"serviceId":"eu id cupidatat voluptate laborum"}]},{"serviceType":"http://GqIOzEsKTsdPOuvbbmglqA.xdBikvJheG3+3saiSyZCbc+KdUxjgN3GR"},{"serviceType":"http://vHKHUZisVuOPjNtLXkxNjogAQ.mpqWznmMNn2K+qKQw","participants":[{"role":"culpa aliqua officia","serviceId":"tempor proident"},{"serviceId":"dolor pariatur","role":"ut eiusmod dolore"},{"role":"pariatur dolore Duis","serviceId":"culpa laboris nisi nostrud mollit"},{"role":"culpa","serviceId":"occaecat id"}]}]},"description":"exercitation Excepteur laborum ut laboris"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_template(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_template(aioresponses: aioresponses):
    url = r'/templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/templates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_template(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_list_institutions(aioresponses: aioresponses):
    url = r'/institutions'
    url_variant = r'institutions'
    full_url = BASE_URL+r'/institutions'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"velit ullamco","api":"https://OspHTToGIfAMsZZtpkYjoblfmZijZr.fvnzaLN9XLJ.l1g0uBjLN3g-+P8qUpSS2szVKv37SUuYc4mxJcKKTj.1DWBrTonGhQ","name":"velit","apiToken":"veniam consectetur dolor"},{"url":"aliquip labore laboris culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"velit ullamco","api":"https://OspHTToGIfAMsZZtpkYjoblfmZijZr.fvnzaLN9XLJ.l1g0uBjLN3g-+P8qUpSS2szVKv37SUuYc4mxJcKKTj.1DWBrTonGhQ","name":"velit","apiToken":"veniam consectetur dolor"},{"url":"aliquip labore laboris culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"velit ullamco","api":"https://OspHTToGIfAMsZZtpkYjoblfmZijZr.fvnzaLN9XLJ.l1g0uBjLN3g-+P8qUpSS2szVKv37SUuYc4mxJcKKTj.1DWBrTonGhQ","name":"velit","apiToken":"veniam consectetur dolor"},{"url":"aliquip labore laboris culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"velit ullamco","api":"https://OspHTToGIfAMsZZtpkYjoblfmZijZr.fvnzaLN9XLJ.l1g0uBjLN3g-+P8qUpSS2szVKv37SUuYc4mxJcKKTj.1DWBrTonGhQ","name":"velit","apiToken":"veniam consectetur dolor"},{"url":"aliquip labore laboris culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_institutions(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_institution(aioresponses: aioresponses):
    url = r'/institutions'
    url_variant = r'institutions'
    full_url = BASE_URL+r'/institutions'

    request = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_institution(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_institution(aioresponses: aioresponses):
    url = r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_institution(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_institution(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_institution(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_institution(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_institution(aioresponses: aioresponses):
    url = r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_institution(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_institution(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"velit laborum veniam esse","name":"sit aute deserunt dolor laborum","homepage":"https://rLUUzVntQAYYuxFKofW.nsoW.sUJQUrn,eKn-An+bYSGB","api":"http://LTfWiqREaPgqMPvYgWDPM.nrtf+nU1HeZ,Oim7BUybJkQS.68OdFKFrFsscg,NXwpqHlYvGCbc,J7khIH16p2vB49epr8pAJQtzhj8j4nbH5k2","apiToken":"in"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_institution(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_institution(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_institution(aioresponses: aioresponses):
    url = r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/institutions/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_institution(url=full_url, **parameters)
