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

    parameter_list = [{}, ]

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
async def test_schedule(aioresponses: aioresponses):
    url = r'/schedule'
    url_variant = r'schedule'
    full_url = BASE_URL+r'/schedule'

    request = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://eoKzcaLEO.jigrLrN,QtmSeOrwdDkjY4"},{"ID":"https://dJaL.omM0GRYOmeEyMOG8,lOwfYgxMRtEfPZWHiX,HISaF0nFZxn37U4ILuINMGozBLrh.aOLN8uc6"}],"Description":"in dolore pariatur ut"},"Time":{"Start":"1981-06-10T04:14:08.0Z","End":"1951-06-17T02:47:39.0Z"}}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.schedule(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.schedule(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.schedule(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.schedule(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.schedule(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_newBooking(aioresponses: aioresponses):
    url = r'/booking'
    url_variant = r'booking'
    full_url = BASE_URL+r'/booking'

    request = json.loads(r'{"Devices":[{"ID":"https://oCCTTNStvcBbcmLKslaSMmqVGx.auzBY3BJWu8x-QporrHYcC9bqsef8NDutN5ohOWawZbhZ8r"},{"ID":"http://fxAFgbruxuEEUzmlpkQyPQjTvbNrEUlw.dbgFCsvm,LZ+kIzgghTNqyNTtrGAlQq2MjmMn1grGk2ZkZRGoZxQ+A0N"}],"Time":{"Start":"1957-06-19T20:42:50.0Z","End":"2017-12-16T17:13:02.0Z"},"Type":"normal"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.newBooking(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.newBooking(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.newBooking(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.newBooking(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.newBooking(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_updateBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"Locked":true,"Devices":[{"ID":"http://k.wgaOIBHxZfiNzV7AkaVuQ1UvsgVbtXmOHr3UacIqwT3BazSLm68y1Js"},{"ID":"https://ohlnuiclAHELGBqVjSlJNnwurIJTY.dfpkNwARhVGSLnPEP8jC7LYUNTZu-+lz9F5bZHXYqjq"}]}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.updateBooking(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.updateBooking(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.updateBooking(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.updateBooking(url=full_url, body=request, **parameters)


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
        response_200_dict = json.loads(r'{"Booking":{"ID":"https://qhQkiiruUxtUtbGmjaXwNC.neZld0VWn5OHMWi2rZ8oi-sv2W7RJlGiu6E4TtMQzwHyNISGmkg+CY2OCvHTxFBaYGO0u","Time":{"Start":"1964-12-11T17:12:39.0Z","End":"1983-03-23T22:36:39.0Z"},"Devices":["https://MSoPGR.qbojgUH2Y+tqKvMJEQorqAvvxtqCXZthUzmwJuZ-2MkJyv5WEWtPYwH9n,F","http://dvGWLhbJbQJ.ejdS","https://gVgJcnupaGdLWloiORp.eroxDq3cPowUmAwFkPcgEW,oivqBNl1+MGJFwwoJyw,Hn","http://ySSHqBm.dwyCPbuiqQ0Xmz-.4"],"Status":"rejected","You":false,"External":false,"Message":"adipisicing ad id pariatur nulla","Type":"normal"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"https://qhQkiiruUxtUtbGmjaXwNC.neZld0VWn5OHMWi2rZ8oi-sv2W7RJlGiu6E4TtMQzwHyNISGmkg+CY2OCvHTxFBaYGO0u","Time":{"Start":"1964-12-11T17:12:39.0Z","End":"1983-03-23T22:36:39.0Z"},"Devices":["https://MSoPGR.qbojgUH2Y+tqKvMJEQorqAvvxtqCXZthUzmwJuZ-2MkJyv5WEWtPYwH9n,F","http://dvGWLhbJbQJ.ejdS","https://gVgJcnupaGdLWloiORp.eroxDq3cPowUmAwFkPcgEW,oivqBNl1+MGJFwwoJyw,Hn","http://ySSHqBm.dwyCPbuiqQ0Xmz-.4"],"Status":"rejected","You":false,"External":false,"Message":"adipisicing ad id pariatur nulla","Type":"normal"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"https://qhQkiiruUxtUtbGmjaXwNC.neZld0VWn5OHMWi2rZ8oi-sv2W7RJlGiu6E4TtMQzwHyNISGmkg+CY2OCvHTxFBaYGO0u","Time":{"Start":"1964-12-11T17:12:39.0Z","End":"1983-03-23T22:36:39.0Z"},"Devices":["https://MSoPGR.qbojgUH2Y+tqKvMJEQorqAvvxtqCXZthUzmwJuZ-2MkJyv5WEWtPYwH9n,F","http://dvGWLhbJbQJ.ejdS","https://gVgJcnupaGdLWloiORp.eroxDq3cPowUmAwFkPcgEW,oivqBNl1+MGJFwwoJyw,Hn","http://ySSHqBm.dwyCPbuiqQ0Xmz-.4"],"Status":"rejected","You":false,"External":false,"Message":"adipisicing ad id pariatur nulla","Type":"normal"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

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
async def test_destroyBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.destroyBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.destroyBooking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_lockBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Requested":"http://yiRyQY.upcxSE+-Dt+yeL","Selected":"https://aEfpYLsPzTiKHUjDdaZqyoDJwdYyi.rfmpCGiIatB7d6ON,0Wr2XkcBvhL3t6nyVirx8SDzb"},{"Requested":"https://toVVoQmUnSXuahwfeTRxpNnDE.yug7Zz9nBIdQhW2GZYygo31sewyh.G","Selected":"https://XQIUSphplmT.pubUJoCRaU9etAf0uivpRC0jsje"},{"Requested":"http://Kvsu.pyqaRVJ1uwJ8xaFz1uG4rpgnZCX9zyfTcIwWdiBhXpoISjdduhUDF7E.vDe","Selected":"https://zNdrBJZQW.dqqlUM1nRzvtbRxn7+Fb6zHE3eCJCd,5rMpCPM3tut64+SnKGZIOayPKVhIItvniaBYx5zat7b"},{"Requested":"https://fdZmspjHNxJbzMQYgWwCJpuojNSkAVlOa.ngfhBC3TgaCQn-pN,xiJngw3PjoMMmYluRriS33e","Selected":"https://VhHcokmycuzIDimdpNZcNDEwblRDme.fdciB9nT,qyP8szCg9nMT2EnE-lfj7LQEbLZ0owZ7Q,WJbT"},{"Requested":"https://JzNxIalMPxPXEijJi.uumgKo-dgJE","Selected":"https://tuN.faDII-kaqNvW"}]')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lockBooking(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Requested":"http://yiRyQY.upcxSE+-Dt+yeL","Selected":"https://aEfpYLsPzTiKHUjDdaZqyoDJwdYyi.rfmpCGiIatB7d6ON,0Wr2XkcBvhL3t6nyVirx8SDzb"},{"Requested":"https://toVVoQmUnSXuahwfeTRxpNnDE.yug7Zz9nBIdQhW2GZYygo31sewyh.G","Selected":"https://XQIUSphplmT.pubUJoCRaU9etAf0uivpRC0jsje"},{"Requested":"http://Kvsu.pyqaRVJ1uwJ8xaFz1uG4rpgnZCX9zyfTcIwWdiBhXpoISjdduhUDF7E.vDe","Selected":"https://zNdrBJZQW.dqqlUM1nRzvtbRxn7+Fb6zHE3eCJCd,5rMpCPM3tut64+SnKGZIOayPKVhIItvniaBYx5zat7b"},{"Requested":"https://fdZmspjHNxJbzMQYgWwCJpuojNSkAVlOa.ngfhBC3TgaCQn-pN,xiJngw3PjoMMmYluRriS33e","Selected":"https://VhHcokmycuzIDimdpNZcNDEwblRDme.fdciB9nT,qyP8szCg9nMT2EnE-lfj7LQEbLZ0owZ7Q,WJbT"},{"Requested":"https://JzNxIalMPxPXEijJi.uumgKo-dgJE","Selected":"https://tuN.faDII-kaqNvW"}]')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lockBooking(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Requested":"http://yiRyQY.upcxSE+-Dt+yeL","Selected":"https://aEfpYLsPzTiKHUjDdaZqyoDJwdYyi.rfmpCGiIatB7d6ON,0Wr2XkcBvhL3t6nyVirx8SDzb"},{"Requested":"https://toVVoQmUnSXuahwfeTRxpNnDE.yug7Zz9nBIdQhW2GZYygo31sewyh.G","Selected":"https://XQIUSphplmT.pubUJoCRaU9etAf0uivpRC0jsje"},{"Requested":"http://Kvsu.pyqaRVJ1uwJ8xaFz1uG4rpgnZCX9zyfTcIwWdiBhXpoISjdduhUDF7E.vDe","Selected":"https://zNdrBJZQW.dqqlUM1nRzvtbRxn7+Fb6zHE3eCJCd,5rMpCPM3tut64+SnKGZIOayPKVhIItvniaBYx5zat7b"},{"Requested":"https://fdZmspjHNxJbzMQYgWwCJpuojNSkAVlOa.ngfhBC3TgaCQn-pN,xiJngw3PjoMMmYluRriS33e","Selected":"https://VhHcokmycuzIDimdpNZcNDEwblRDme.fdciB9nT,qyP8szCg9nMT2EnE-lfj7LQEbLZ0owZ7Q,WJbT"},{"Requested":"https://JzNxIalMPxPXEijJi.uumgKo-dgJE","Selected":"https://tuN.faDII-kaqNvW"}]')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lockBooking(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=412)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=412)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=412)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lockBooking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_unlockBooking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=412)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=412)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=412)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlockBooking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_bookingCallback(aioresponses: aioresponses):
    url = r'/booking_callback/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking_callback/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking_callback/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.bookingCallback(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.bookingCallback(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.bookingCallback(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.bookingCallback(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_list_devices(aioresponses: aioresponses):
    url = r'/devices'
    url_variant = r'devices'
    full_url = BASE_URL+r'/devices'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://Mja.mhslcWq1PsxTwwF3afIyJWDuiDm1VoZBmKoX3ysiLCBewxleeJCAtpRwXU3gwdEyPt7WkFNLt-,u9","type":"device","name":"proident occaecat Duis Ut","owner":"https://PkJrVeTsXGawCvBEJtZoJqaRkbyKD.bizje.DF4MnJVMELxQ7YW4FnYVV8TrcB6EfrCrLkR2b9o.S.QD9rIHZQusXtIRHVXUgGPcFmVbOczqwdpD7QyMiS+g","isPublic":false,"description":"fugiat dolore"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://Mja.mhslcWq1PsxTwwF3afIyJWDuiDm1VoZBmKoX3ysiLCBewxleeJCAtpRwXU3gwdEyPt7WkFNLt-,u9","type":"device","name":"proident occaecat Duis Ut","owner":"https://PkJrVeTsXGawCvBEJtZoJqaRkbyKD.bizje.DF4MnJVMELxQ7YW4FnYVV8TrcB6EfrCrLkR2b9o.S.QD9rIHZQusXtIRHVXUgGPcFmVbOczqwdpD7QyMiS+g","isPublic":false,"description":"fugiat dolore"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://Mja.mhslcWq1PsxTwwF3afIyJWDuiDm1VoZBmKoX3ysiLCBewxleeJCAtpRwXU3gwdEyPt7WkFNLt-,u9","type":"device","name":"proident occaecat Duis Ut","owner":"https://PkJrVeTsXGawCvBEJtZoJqaRkbyKD.bizje.DF4MnJVMELxQ7YW4FnYVV8TrcB6EfrCrLkR2b9o.S.QD9rIHZQusXtIRHVXUgGPcFmVbOczqwdpD7QyMiS+g","isPublic":false,"description":"fugiat dolore"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://Mja.mhslcWq1PsxTwwF3afIyJWDuiDm1VoZBmKoX3ysiLCBewxleeJCAtpRwXU3gwdEyPt7WkFNLt-,u9","type":"device","name":"proident occaecat Duis Ut","owner":"https://PkJrVeTsXGawCvBEJtZoJqaRkbyKD.bizje.DF4MnJVMELxQ7YW4FnYVV8TrcB6EfrCrLkR2b9o.S.QD9rIHZQusXtIRHVXUgGPcFmVbOczqwdpD7QyMiS+g","isPublic":false,"description":"fugiat dolore"}]')
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

    request = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
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
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
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
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","isPublic":true,"devices":[{"url":"http://bKrxtmbtyfsPicg.pvyIy9-oumPBOjo"},{"url":"http://lNhLsyfXesSQfdUnFNwDk.cmmhBOCKId3UIwDHkboh0G+BcBFq+fIIcY"},{"url":"https://RPsgpOCGheCupCp.vjaEjo-9ZMA7dHI3IMVeTbT7OW,"}],"description":"sit veniam commodo Excepteur qui"}')
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
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","owner":"http://qXJqGDlmidYcvasqfsCCA.eljeTAmkIX2L2AzMelvRPbXU2YfsxCWZ,n7TfiEJDoV5cMeYV97+9gjfC","isPublic":false,"connected":false,"description":"nisi elit","announcedAvailability":[{"end":"2002-09-21T07:31:21.0Z","start":"2009-05-26T22:33:21.0Z"}],"experiment":"https://nKGzfcWu.jxkN.jIoM0meEihX80ZNt-6","services":[{"serviceDirection":"prosumer","serviceId":"in cillum","serviceType":"https://YLJrLizqZVEgQDBKxrMqDElLJBgB.rsK3"},{"serviceId":"velit do ut incididunt","serviceType":"https://pfLtXZUuhQUIHgMplzPWpIWTsmJkTh.hiikIN6CQC.H.DSGkgIfiHihDPylLJROu.hqgrSoXIyx"}]},"deviceToken":"esse"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","owner":"http://qXJqGDlmidYcvasqfsCCA.eljeTAmkIX2L2AzMelvRPbXU2YfsxCWZ,n7TfiEJDoV5cMeYV97+9gjfC","isPublic":false,"connected":false,"description":"nisi elit","announcedAvailability":[{"end":"2002-09-21T07:31:21.0Z","start":"2009-05-26T22:33:21.0Z"}],"experiment":"https://nKGzfcWu.jxkN.jIoM0meEihX80ZNt-6","services":[{"serviceDirection":"prosumer","serviceId":"in cillum","serviceType":"https://YLJrLizqZVEgQDBKxrMqDElLJBgB.rsK3"},{"serviceId":"velit do ut incididunt","serviceType":"https://pfLtXZUuhQUIHgMplzPWpIWTsmJkTh.hiikIN6CQC.H.DSGkgIfiHihDPylLJROu.hqgrSoXIyx"}]},"deviceToken":"esse"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","owner":"http://qXJqGDlmidYcvasqfsCCA.eljeTAmkIX2L2AzMelvRPbXU2YfsxCWZ,n7TfiEJDoV5cMeYV97+9gjfC","isPublic":false,"connected":false,"description":"nisi elit","announcedAvailability":[{"end":"2002-09-21T07:31:21.0Z","start":"2009-05-26T22:33:21.0Z"}],"experiment":"https://nKGzfcWu.jxkN.jIoM0meEihX80ZNt-6","services":[{"serviceDirection":"prosumer","serviceId":"in cillum","serviceType":"https://YLJrLizqZVEgQDBKxrMqDElLJBgB.rsK3"},{"serviceId":"velit do ut incididunt","serviceType":"https://pfLtXZUuhQUIHgMplzPWpIWTsmJkTh.hiikIN6CQC.H.DSGkgIfiHihDPylLJROu.hqgrSoXIyx"}]},"deviceToken":"esse"}')
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

    request = json.loads(r'{"messageType":"command","command":"createPeerconnection","connectionType":"local","connectionUrl":"http://mSxcAxcNBEEObpLmSlWMbhgcDFFq.phuibR+NAH9qR2hG,VoGNZCgZKXd5f-JF","services":[{"serviceType":"https://WN.yyqil0X0kH-nSbucxHwUKTp6riWuOEsxSyNTZz","serviceId":"ad reprehenderit","remoteServiceId":"laborum velit"},{"serviceType":"https://GaxqG.fcVGX0FK","serviceId":"exercitation","remoteServiceId":"dolor magna in proident"}],"tiebreaker":true,"config":{}}')

    parameter_list = [{"peerconnection_url": "test_string", }, ]

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
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","devices":[{"url":"http://MhMUVnnIiUwsDRP.dudoT3yvSYQE1d27VYw9SbeCwsMFSzANMjBX0khQv6NcHEvF3MocDmv3lCMsENLY2rOFl.L"},{"url":"http://bFEJIqVUszBtNaxcvsWHfk.sirLBbny3VnBXE15oLcPZcQCi+"}],"status":"failed"},{"url":"http://LSFtmxDGOckRkViTFUiPPfXHnDvVkTLb.gwgkhwi9UO6GjEY0YNIKH18qLk","type":"local","devices":[{"url":"https://iqKdIcgcdciNq.pssaJMJuCgqPDfq4OM"},{"url":"http://TAKplEZJJnnAqUfuWTtulgjbHWC.khszpn3K.Y"}],"status":"connecting"},{"url":"http://fXVcBpEXDHmsMsDObV.hfACXLVvqZIqVxD.P8LQJdNN217pP,GAcwamid57SsHQwb","type":"webrtc","devices":[{"url":"http://upvFODDKBjYeysg.sbEHDzuy6CyZ-WogHoZ.MMvsmVR4RnrN6"},{"url":"http://JVwylE.nwmvBU4d6-PXj6OVok"}],"status":"connected"},{"url":"https://rMqZjtqZAenxRreKbLZLvmhHtE.eifsXQVOsinjFLRzFcohzkpDf1fMPRcLTYJA3S9Udo3NZUTYErE,1ovL","type":"local","devices":[{"url":"https://D.ldvaox8BCk8omTCJrY"},{"url":"http://dfUr.ilZEln+qEHrE4jQIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-w"}],"status":"failed"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","devices":[{"url":"http://MhMUVnnIiUwsDRP.dudoT3yvSYQE1d27VYw9SbeCwsMFSzANMjBX0khQv6NcHEvF3MocDmv3lCMsENLY2rOFl.L"},{"url":"http://bFEJIqVUszBtNaxcvsWHfk.sirLBbny3VnBXE15oLcPZcQCi+"}],"status":"failed"},{"url":"http://LSFtmxDGOckRkViTFUiPPfXHnDvVkTLb.gwgkhwi9UO6GjEY0YNIKH18qLk","type":"local","devices":[{"url":"https://iqKdIcgcdciNq.pssaJMJuCgqPDfq4OM"},{"url":"http://TAKplEZJJnnAqUfuWTtulgjbHWC.khszpn3K.Y"}],"status":"connecting"},{"url":"http://fXVcBpEXDHmsMsDObV.hfACXLVvqZIqVxD.P8LQJdNN217pP,GAcwamid57SsHQwb","type":"webrtc","devices":[{"url":"http://upvFODDKBjYeysg.sbEHDzuy6CyZ-WogHoZ.MMvsmVR4RnrN6"},{"url":"http://JVwylE.nwmvBU4d6-PXj6OVok"}],"status":"connected"},{"url":"https://rMqZjtqZAenxRreKbLZLvmhHtE.eifsXQVOsinjFLRzFcohzkpDf1fMPRcLTYJA3S9Udo3NZUTYErE,1ovL","type":"local","devices":[{"url":"https://D.ldvaox8BCk8omTCJrY"},{"url":"http://dfUr.ilZEln+qEHrE4jQIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-w"}],"status":"failed"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","devices":[{"url":"http://MhMUVnnIiUwsDRP.dudoT3yvSYQE1d27VYw9SbeCwsMFSzANMjBX0khQv6NcHEvF3MocDmv3lCMsENLY2rOFl.L"},{"url":"http://bFEJIqVUszBtNaxcvsWHfk.sirLBbny3VnBXE15oLcPZcQCi+"}],"status":"failed"},{"url":"http://LSFtmxDGOckRkViTFUiPPfXHnDvVkTLb.gwgkhwi9UO6GjEY0YNIKH18qLk","type":"local","devices":[{"url":"https://iqKdIcgcdciNq.pssaJMJuCgqPDfq4OM"},{"url":"http://TAKplEZJJnnAqUfuWTtulgjbHWC.khszpn3K.Y"}],"status":"connecting"},{"url":"http://fXVcBpEXDHmsMsDObV.hfACXLVvqZIqVxD.P8LQJdNN217pP,GAcwamid57SsHQwb","type":"webrtc","devices":[{"url":"http://upvFODDKBjYeysg.sbEHDzuy6CyZ-WogHoZ.MMvsmVR4RnrN6"},{"url":"http://JVwylE.nwmvBU4d6-PXj6OVok"}],"status":"connected"},{"url":"https://rMqZjtqZAenxRreKbLZLvmhHtE.eifsXQVOsinjFLRzFcohzkpDf1fMPRcLTYJA3S9Udo3NZUTYErE,1ovL","type":"local","devices":[{"url":"https://D.ldvaox8BCk8omTCJrY"},{"url":"http://dfUr.ilZEln+qEHrE4jQIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-w"}],"status":"failed"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","devices":[{"url":"http://MhMUVnnIiUwsDRP.dudoT3yvSYQE1d27VYw9SbeCwsMFSzANMjBX0khQv6NcHEvF3MocDmv3lCMsENLY2rOFl.L"},{"url":"http://bFEJIqVUszBtNaxcvsWHfk.sirLBbny3VnBXE15oLcPZcQCi+"}],"status":"failed"},{"url":"http://LSFtmxDGOckRkViTFUiPPfXHnDvVkTLb.gwgkhwi9UO6GjEY0YNIKH18qLk","type":"local","devices":[{"url":"https://iqKdIcgcdciNq.pssaJMJuCgqPDfq4OM"},{"url":"http://TAKplEZJJnnAqUfuWTtulgjbHWC.khszpn3K.Y"}],"status":"connecting"},{"url":"http://fXVcBpEXDHmsMsDObV.hfACXLVvqZIqVxD.P8LQJdNN217pP,GAcwamid57SsHQwb","type":"webrtc","devices":[{"url":"http://upvFODDKBjYeysg.sbEHDzuy6CyZ-WogHoZ.MMvsmVR4RnrN6"},{"url":"http://JVwylE.nwmvBU4d6-PXj6OVok"}],"status":"connected"},{"url":"https://rMqZjtqZAenxRreKbLZLvmhHtE.eifsXQVOsinjFLRzFcohzkpDf1fMPRcLTYJA3S9Udo3NZUTYErE,1ovL","type":"local","devices":[{"url":"https://D.ldvaox8BCk8omTCJrY"},{"url":"http://dfUr.ilZEln+qEHrE4jQIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-w"}],"status":"failed"}]')
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

    request = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')

    parameter_list = [{"closedUrl": "test_string", "statusChangedUrl": "test_string", }, {"statusChangedUrl": "test_string", }, {"closedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
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
        response_200_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://NUsZam.pmvmjWau+Ph,D9Kizb5M2zxh7k0Uj.Czl8LbRshyWiYUqZxG3f.xQmFwI,Bh8mvJ2Xmj52lbaQchRlD5Yv30m3U.uXlp","type":"webrtc","devices":[{"url":"https://gzrZFBqKVZFfqOYrUiJLAUBXuBxC.wscnVnMEUSgVN","config":{"services":[{"serviceType":"http://QOArMoIr.gfjAQxbNfWUSKF,naCXkA3Ynq+FdP","serviceId":"laboris et qui Ut reprehenderit","remoteServiceId":"esse"},{"serviceType":"https://vfzc.pvqkkcKLwRrM1g6yZUFd53s1yPxKPvQxiwmU","serviceId":"sunt ullamco","remoteServiceId":"ipsum dolore in"},{"serviceType":"http://hoWDBcimBnYJ.rgjerWB7tNJ6g","serviceId":"anim","remoteServiceId":"cillum laboris"},{"serviceType":"https://ZJHacPU.aylfO","serviceId":"culpa esse","remoteServiceId":"ullamco ea"},{"serviceType":"http://EGzWGAYZSBCEnMDhXUCzj.pyeyEkXtKgm6NMAEUD.vwSzJ2JygglMlRFzXxdS25PLHrovUq9","serviceId":"sint laboris deserunt dolore","remoteServiceId":"reprehenderit cillum"}]}},{"url":"http://eVthH.qixh12Phhx2aGy.nHs8ESmlFu-xW3IHuF","config":{"services":[{"serviceType":"http://GtrJIeAclcvSYd.uogtDQHmD0PM8zGvurI4F1f3zpHbeyxlEcmGndrFZvtGY8xcFAwsoxFSximryYuws","serviceId":"Lorem sed cupidatat amet eu","remoteServiceId":"magna irure occaecat proident consectetur"}]}}],"status":"connecting"}')
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
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://vFEKqmptpPoBhyolnlHwoPR.gvzRXrGA-TcpnjbD6plAO1EvG3GjZbDm3PBC7Ol+"},{"status":"running","url":"http://v.bqhha5NR.n+A6tEeKl2OlX8ix-SkvZI+utCarv"},{"status":"running","url":"https://ylFezEFUWjujSnyoYvRC.perMvDKBjj9CES8CUUNWC"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://vFEKqmptpPoBhyolnlHwoPR.gvzRXrGA-TcpnjbD6plAO1EvG3GjZbDm3PBC7Ol+"},{"status":"running","url":"http://v.bqhha5NR.n+A6tEeKl2OlX8ix-SkvZI+utCarv"},{"status":"running","url":"https://ylFezEFUWjujSnyoYvRC.perMvDKBjj9CES8CUUNWC"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://vFEKqmptpPoBhyolnlHwoPR.gvzRXrGA-TcpnjbD6plAO1EvG3GjZbDm3PBC7Ol+"},{"status":"running","url":"http://v.bqhha5NR.n+A6tEeKl2OlX8ix-SkvZI+utCarv"},{"status":"running","url":"https://ylFezEFUWjujSnyoYvRC.perMvDKBjj9CES8CUUNWC"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://vFEKqmptpPoBhyolnlHwoPR.gvzRXrGA-TcpnjbD6plAO1EvG3GjZbDm3PBC7Ol+"},{"status":"running","url":"http://v.bqhha5NR.n+A6tEeKl2OlX8ix-SkvZI+utCarv"},{"status":"running","url":"https://ylFezEFUWjujSnyoYvRC.perMvDKBjj9CES8CUUNWC"}]')
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

    request = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
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
        response_200_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
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

    request = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')

    parameter_list = [{"changedURL": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"devices":[{"role":"irure"},{"device":"http://mQVBjRxbgYT.dxMS9.P88zw2XYkf4,9FmTaqfRv1pv40it.VwrXR","role":"amet nostrud elit"}],"roles":[{"name":"id dolor officia pariatur nisi","description":"pariatur adipisicing ut Lorem"},{"description":"nostrud ea in exercitation Lorem"}],"serviceConfigurations":[{"participants":[]},{"serviceType":"https://YpWxUsYmnlSQXTSdBLmwN.crgxJSt7NzVWiMiOG336Jg+TpniGxO1CkxnfX9ocVCzNsqax-,N","participants":[{"serviceId":"id"}]}],"status":"booked","instantiatedDevices":[{"codeUrl":"http://QeqKWqcdFpMxdyvzrzsEVgqKZVOpSu.ipavlwZf,BciCB2DroHwWaWJDzu1XSYZV7ViqB49RABrWLF2WkUviRFISfzFtyASg1N","url":"http://bOfOPXymJzdHIwpQtkK.njxcBvrL+tDJrsRozPQ,zd.EdNXojNRb7o54kO5QL","token":"eiusmod reprehenderit enim nulla","instanceOf":"https://lIYXPIauGMCHByEBI.iydG9xJiNpTZh98cCoedIWuTh.BnLGYIcukWYpobyoqpJ7eoocZLSYrxITe5Tyr1XR-LXHX7AOPGJ"}],"connections":["https://JUJKnySf.dwlohvpSDLQyF8XxU6pbNH.3w9FJOSC8-vD+3uy","https://wQYyS.ohHlI"]}')
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
        response_200_dict = json.loads(r'[{"url":"http://fNmvkNdandj.lmRiFOpuBhXz6c","name":"dolor incididunt aliquip id","configuration":{"devices":[{"role":"ipsum","device":"http://fwssZRib.nepoBPqmIadnXHJszVzCDdKWdVUt5,RomrlagyAg5"},{"role":"ut sed"},{"device":"http://YdgrPeLaSfM.ycRTT.2Mnj"},{"device":"http://GJqyYpInHIJjpnlaL.fdinyqgMFPJwG+gV8qZvQU2CLh8rD,1zAeZ6wYl0jyt4DL71RbPTJR-56cQ5vkkS9Xn4vH+.AjaiP.dgP1,Go","role":"laborum"}],"roles":[{"name":"reprehenderit ut dolore nulla","description":"dolor amet commodo"},{"description":"dolor Lorem","name":"velit nostrud est cupidatat nulla"}],"serviceConfigurations":[{"serviceType":"http://jGsKjAsVYokGsZUznsjofDhStIuLrTv.ieb6TXz2RXJ3KH7KVYUu8CpO7ui.4u,ueA+f9jEB"},{"serviceType":"http://iRVzjRFJwCCTWOZGgqoguowT.hsTOKZypigTjIaCnbuV8VtvLt50qH"}]},"description":"elit nisi laboris fugiat aliqua"},{"url":"https://fKzmJTigmKbHkHjzGs.uqpkUKdxjT4BwLSQDIAlB44","name":"ea irure esse anim","configuration":{"devices":[{"role":"sed sit nisi mollit"},{"role":"incididunt cupidatat tempor ut proident","device":"http://jDhizZXkbzHgfFT.sfbfy3a5E0W72AoacRpO7JIjgy6S9SV,L7kmMvfQNSjMnulkRrA,5HVCSI5rMpohvDcUVdP-KFZzs,F"},{"device":"https://AWWJAWEeskEU.chdAVLgxtnXlpljWoEN0Yuasv9D+Vx4ECt,yPjY4gAY","role":"in dolore in"}],"roles":[{"description":"labore in laborum consectetur tempor","name":"sed magna dolor ea occaecat"}],"serviceConfigurations":[{"participants":[{"serviceId":"id adipisicing"},{"serviceId":"culpa","role":"adipisicing in"},{"serviceId":"Ut ex laborum ut dolor","role":"sed consectetur veniam nostrud"}],"serviceType":"https://XwxeimtCftlFrTMSKLkBFlblCZ.htrsjFpdS"},{"serviceType":"http://rA.mmoflTJQ1OdZvSXVpUCAL1wC","participants":[{"serviceId":"cillum reprehenderit qui consequat","role":"mollit ad in deserunt"},{"role":"nulla magna incididunt ut tempor"},{"serviceId":"aliquip do in est","role":"culpa"},{"role":"adipisicing ut sint id"}]},{"participants":[{"role":"nostrud","serviceId":"voluptate ut fugiat"},{"serviceId":"officia","role":"est occaecat adipisicing aute irure"},{"serviceId":"laboris aliquip in","role":"minim"},{"role":"Ut reprehenderit Lorem","serviceId":"Excepteur esse dolore aliqua"}],"serviceType":"https://WyppuKyQgOmchzsHa.jhuWn4SuvNtijIfnVh0aDE7ZSREZsweq..d1Bh2sQ"},{"participants":[{"serviceId":"id","role":"ut nulla pariatur Duis"},{"serviceId":"consectetur laborum","role":"dolore do sunt"},{"serviceId":"tempor exercitation Excepteur ullamco","role":"proident cillum Duis"}]},{"serviceType":"http://UNjwfZqlcdTLTLjZTUxLmoeS.nusbT9YpIfkz5zNx,3OpU6o1hP7jNlt3CWd2Esi"}]},"description":"labore sunt reprehenderit magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://fNmvkNdandj.lmRiFOpuBhXz6c","name":"dolor incididunt aliquip id","configuration":{"devices":[{"role":"ipsum","device":"http://fwssZRib.nepoBPqmIadnXHJszVzCDdKWdVUt5,RomrlagyAg5"},{"role":"ut sed"},{"device":"http://YdgrPeLaSfM.ycRTT.2Mnj"},{"device":"http://GJqyYpInHIJjpnlaL.fdinyqgMFPJwG+gV8qZvQU2CLh8rD,1zAeZ6wYl0jyt4DL71RbPTJR-56cQ5vkkS9Xn4vH+.AjaiP.dgP1,Go","role":"laborum"}],"roles":[{"name":"reprehenderit ut dolore nulla","description":"dolor amet commodo"},{"description":"dolor Lorem","name":"velit nostrud est cupidatat nulla"}],"serviceConfigurations":[{"serviceType":"http://jGsKjAsVYokGsZUznsjofDhStIuLrTv.ieb6TXz2RXJ3KH7KVYUu8CpO7ui.4u,ueA+f9jEB"},{"serviceType":"http://iRVzjRFJwCCTWOZGgqoguowT.hsTOKZypigTjIaCnbuV8VtvLt50qH"}]},"description":"elit nisi laboris fugiat aliqua"},{"url":"https://fKzmJTigmKbHkHjzGs.uqpkUKdxjT4BwLSQDIAlB44","name":"ea irure esse anim","configuration":{"devices":[{"role":"sed sit nisi mollit"},{"role":"incididunt cupidatat tempor ut proident","device":"http://jDhizZXkbzHgfFT.sfbfy3a5E0W72AoacRpO7JIjgy6S9SV,L7kmMvfQNSjMnulkRrA,5HVCSI5rMpohvDcUVdP-KFZzs,F"},{"device":"https://AWWJAWEeskEU.chdAVLgxtnXlpljWoEN0Yuasv9D+Vx4ECt,yPjY4gAY","role":"in dolore in"}],"roles":[{"description":"labore in laborum consectetur tempor","name":"sed magna dolor ea occaecat"}],"serviceConfigurations":[{"participants":[{"serviceId":"id adipisicing"},{"serviceId":"culpa","role":"adipisicing in"},{"serviceId":"Ut ex laborum ut dolor","role":"sed consectetur veniam nostrud"}],"serviceType":"https://XwxeimtCftlFrTMSKLkBFlblCZ.htrsjFpdS"},{"serviceType":"http://rA.mmoflTJQ1OdZvSXVpUCAL1wC","participants":[{"serviceId":"cillum reprehenderit qui consequat","role":"mollit ad in deserunt"},{"role":"nulla magna incididunt ut tempor"},{"serviceId":"aliquip do in est","role":"culpa"},{"role":"adipisicing ut sint id"}]},{"participants":[{"role":"nostrud","serviceId":"voluptate ut fugiat"},{"serviceId":"officia","role":"est occaecat adipisicing aute irure"},{"serviceId":"laboris aliquip in","role":"minim"},{"role":"Ut reprehenderit Lorem","serviceId":"Excepteur esse dolore aliqua"}],"serviceType":"https://WyppuKyQgOmchzsHa.jhuWn4SuvNtijIfnVh0aDE7ZSREZsweq..d1Bh2sQ"},{"participants":[{"serviceId":"id","role":"ut nulla pariatur Duis"},{"serviceId":"consectetur laborum","role":"dolore do sunt"},{"serviceId":"tempor exercitation Excepteur ullamco","role":"proident cillum Duis"}]},{"serviceType":"http://UNjwfZqlcdTLTLjZTUxLmoeS.nusbT9YpIfkz5zNx,3OpU6o1hP7jNlt3CWd2Esi"}]},"description":"labore sunt reprehenderit magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://fNmvkNdandj.lmRiFOpuBhXz6c","name":"dolor incididunt aliquip id","configuration":{"devices":[{"role":"ipsum","device":"http://fwssZRib.nepoBPqmIadnXHJszVzCDdKWdVUt5,RomrlagyAg5"},{"role":"ut sed"},{"device":"http://YdgrPeLaSfM.ycRTT.2Mnj"},{"device":"http://GJqyYpInHIJjpnlaL.fdinyqgMFPJwG+gV8qZvQU2CLh8rD,1zAeZ6wYl0jyt4DL71RbPTJR-56cQ5vkkS9Xn4vH+.AjaiP.dgP1,Go","role":"laborum"}],"roles":[{"name":"reprehenderit ut dolore nulla","description":"dolor amet commodo"},{"description":"dolor Lorem","name":"velit nostrud est cupidatat nulla"}],"serviceConfigurations":[{"serviceType":"http://jGsKjAsVYokGsZUznsjofDhStIuLrTv.ieb6TXz2RXJ3KH7KVYUu8CpO7ui.4u,ueA+f9jEB"},{"serviceType":"http://iRVzjRFJwCCTWOZGgqoguowT.hsTOKZypigTjIaCnbuV8VtvLt50qH"}]},"description":"elit nisi laboris fugiat aliqua"},{"url":"https://fKzmJTigmKbHkHjzGs.uqpkUKdxjT4BwLSQDIAlB44","name":"ea irure esse anim","configuration":{"devices":[{"role":"sed sit nisi mollit"},{"role":"incididunt cupidatat tempor ut proident","device":"http://jDhizZXkbzHgfFT.sfbfy3a5E0W72AoacRpO7JIjgy6S9SV,L7kmMvfQNSjMnulkRrA,5HVCSI5rMpohvDcUVdP-KFZzs,F"},{"device":"https://AWWJAWEeskEU.chdAVLgxtnXlpljWoEN0Yuasv9D+Vx4ECt,yPjY4gAY","role":"in dolore in"}],"roles":[{"description":"labore in laborum consectetur tempor","name":"sed magna dolor ea occaecat"}],"serviceConfigurations":[{"participants":[{"serviceId":"id adipisicing"},{"serviceId":"culpa","role":"adipisicing in"},{"serviceId":"Ut ex laborum ut dolor","role":"sed consectetur veniam nostrud"}],"serviceType":"https://XwxeimtCftlFrTMSKLkBFlblCZ.htrsjFpdS"},{"serviceType":"http://rA.mmoflTJQ1OdZvSXVpUCAL1wC","participants":[{"serviceId":"cillum reprehenderit qui consequat","role":"mollit ad in deserunt"},{"role":"nulla magna incididunt ut tempor"},{"serviceId":"aliquip do in est","role":"culpa"},{"role":"adipisicing ut sint id"}]},{"participants":[{"role":"nostrud","serviceId":"voluptate ut fugiat"},{"serviceId":"officia","role":"est occaecat adipisicing aute irure"},{"serviceId":"laboris aliquip in","role":"minim"},{"role":"Ut reprehenderit Lorem","serviceId":"Excepteur esse dolore aliqua"}],"serviceType":"https://WyppuKyQgOmchzsHa.jhuWn4SuvNtijIfnVh0aDE7ZSREZsweq..d1Bh2sQ"},{"participants":[{"serviceId":"id","role":"ut nulla pariatur Duis"},{"serviceId":"consectetur laborum","role":"dolore do sunt"},{"serviceId":"tempor exercitation Excepteur ullamco","role":"proident cillum Duis"}]},{"serviceType":"http://UNjwfZqlcdTLTLjZTUxLmoeS.nusbT9YpIfkz5zNx,3OpU6o1hP7jNlt3CWd2Esi"}]},"description":"labore sunt reprehenderit magna"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_template(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://fNmvkNdandj.lmRiFOpuBhXz6c","name":"dolor incididunt aliquip id","configuration":{"devices":[{"role":"ipsum","device":"http://fwssZRib.nepoBPqmIadnXHJszVzCDdKWdVUt5,RomrlagyAg5"},{"role":"ut sed"},{"device":"http://YdgrPeLaSfM.ycRTT.2Mnj"},{"device":"http://GJqyYpInHIJjpnlaL.fdinyqgMFPJwG+gV8qZvQU2CLh8rD,1zAeZ6wYl0jyt4DL71RbPTJR-56cQ5vkkS9Xn4vH+.AjaiP.dgP1,Go","role":"laborum"}],"roles":[{"name":"reprehenderit ut dolore nulla","description":"dolor amet commodo"},{"description":"dolor Lorem","name":"velit nostrud est cupidatat nulla"}],"serviceConfigurations":[{"serviceType":"http://jGsKjAsVYokGsZUznsjofDhStIuLrTv.ieb6TXz2RXJ3KH7KVYUu8CpO7ui.4u,ueA+f9jEB"},{"serviceType":"http://iRVzjRFJwCCTWOZGgqoguowT.hsTOKZypigTjIaCnbuV8VtvLt50qH"}]},"description":"elit nisi laboris fugiat aliqua"},{"url":"https://fKzmJTigmKbHkHjzGs.uqpkUKdxjT4BwLSQDIAlB44","name":"ea irure esse anim","configuration":{"devices":[{"role":"sed sit nisi mollit"},{"role":"incididunt cupidatat tempor ut proident","device":"http://jDhizZXkbzHgfFT.sfbfy3a5E0W72AoacRpO7JIjgy6S9SV,L7kmMvfQNSjMnulkRrA,5HVCSI5rMpohvDcUVdP-KFZzs,F"},{"device":"https://AWWJAWEeskEU.chdAVLgxtnXlpljWoEN0Yuasv9D+Vx4ECt,yPjY4gAY","role":"in dolore in"}],"roles":[{"description":"labore in laborum consectetur tempor","name":"sed magna dolor ea occaecat"}],"serviceConfigurations":[{"participants":[{"serviceId":"id adipisicing"},{"serviceId":"culpa","role":"adipisicing in"},{"serviceId":"Ut ex laborum ut dolor","role":"sed consectetur veniam nostrud"}],"serviceType":"https://XwxeimtCftlFrTMSKLkBFlblCZ.htrsjFpdS"},{"serviceType":"http://rA.mmoflTJQ1OdZvSXVpUCAL1wC","participants":[{"serviceId":"cillum reprehenderit qui consequat","role":"mollit ad in deserunt"},{"role":"nulla magna incididunt ut tempor"},{"serviceId":"aliquip do in est","role":"culpa"},{"role":"adipisicing ut sint id"}]},{"participants":[{"role":"nostrud","serviceId":"voluptate ut fugiat"},{"serviceId":"officia","role":"est occaecat adipisicing aute irure"},{"serviceId":"laboris aliquip in","role":"minim"},{"role":"Ut reprehenderit Lorem","serviceId":"Excepteur esse dolore aliqua"}],"serviceType":"https://WyppuKyQgOmchzsHa.jhuWn4SuvNtijIfnVh0aDE7ZSREZsweq..d1Bh2sQ"},{"participants":[{"serviceId":"id","role":"ut nulla pariatur Duis"},{"serviceId":"consectetur laborum","role":"dolore do sunt"},{"serviceId":"tempor exercitation Excepteur ullamco","role":"proident cillum Duis"}]},{"serviceType":"http://UNjwfZqlcdTLTLjZTUxLmoeS.nusbT9YpIfkz5zNx,3OpU6o1hP7jNlt3CWd2Esi"}]},"description":"labore sunt reprehenderit magna"}]')
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

    request = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
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
        response_200_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_template(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_template(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
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

    request = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_template(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://GHGlCNoOXfmmQePveRQnIaBdCbZkSltF.ryA-b2Oh,H","name":"ad proident","configuration":{"devices":[{"device":"https://wyCOJBrpVQVKlkMJkRgAVSjPsDHD.hnjk21gBO7AdySNqkhpMKUWCR-clntjER-ws2DNfM9gPJbU7g.VAMpcJL7QMjw+ecgGqF+","role":"officia commodo"},{"role":"Duis Ut","device":"https://RkwyyTzHzIkzrBqf.cpxpEUuJs8jwhQYvkKXbXtENdt,SqyW-ZOsOKcFSmWkAHR"},{"role":"sed labore minim","device":"http://qqwNNeOqB.jbdnOY,V"}],"roles":[{"name":"minim Ut ipsum","description":"ut ullamco in sed"},{"description":"cupidatat ipsum pariatur mollit","name":"culpa sint eiusmod ullamco dolore"},{"name":"Ut mollit sed","description":"proident id"},{"name":"Lorem dolor Duis nulla"}],"serviceConfigurations":[{"serviceType":"https://XVxLPOUAmnxpHhFQBnRerYipJ.qwofcQpobPvwD54MKhB5bCf5rZIt+KURCsykmCT"},{"serviceType":"http://lakFX.wqznJTZZTX36FJ8ljHjnvDs-1XqHGY2q.Mszi-Up9cevxy.+d1Kf2bSD9NGc5zeFDUeR"},{"serviceType":"https://JiXuEaUr.xoqXWdxIABoBnWWQSVzt8rOHn+oGWcruU6jw3E"}]}}')
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
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_institutions(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"apiToken":"in","homepage":"http://AD.srkrwnE","federatedApi":"https://biGcjlhbXIfU.fobmMh5kJdzqTQTq,+,5NFaaHwy","name":"laboris quis laborum nostrud","api":"https://lmwVKpUfU.qmZ5NXKtqrvyDDhPi6J,,vVOl2-hR+Kf694QBp.CZ"},{"apiToken":"voluptate enim mollit dolore reprehenderit","name":"ut qui quis","federatedApi":"http://dDsLV.zalLjx-X7AMbA0k,LJFvo4lCNtMopJ0hh5DJspMxmoLkHl5a","api":"https://FTkfIDuZXcsKUwVx.ceNT3kiETNdewalDCrYwNRv5loWq2","homepage":"http://aaNvNuixGVmKFHADrqIGBlguqQIu.annhUqRD"},{"name":"aliquip","homepage":"https://vQoOZjOxsUkLpmtBvSh.nusbvrXkK"}]')
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

    request = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_institution(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
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
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_institution(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_institution(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
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

    request = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_institution(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_institution(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"apiToken":"magna","homepage":"http://dnHzghTNxuBrmqAWZv.fwhbkLyXjhTbPAPq,q.G2UiIeLAil4SFtxYpK","federatedApi":"http://OctPepLeLlhbGXRDmOjZUiaXvkFfg.tugbAFLU.k4TvtlGrpw","api":"http://h.tefFdL9KZgYjwLl,9RGFYTdC88cnq6EKQCGH4ZyYkM6b","name":"eu dolor"}')
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


@pytest.mark.asyncio
async def test_list_updates(aioresponses: aioresponses):
    url = r'/updates'
    url_variant = r'updates'
    full_url = BASE_URL+r'/updates'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"laboris id esse voluptate","latest_version":"consectetur dolore eiusmod irure Ut","latest_version_link":"http://yDIRQywQVj.itoplrH.5.ZvDoQAWF,+mygysRlPEudD4CAcFtfH9T0nhlJ6Xs"},{"device_id":"ad sed in sit","latest_version":"do","latest_version_link":"https://ewOyOPLCYvOABMcIGaCT.wdbr+"},{"device_id":"commodo culpa non","latest_version":"commodo","latest_version_link":"https://qCFBSmpDECUttVJHEYqhktwLjsTJYA.enjwytNETkqFXbq9hn+bSYQ4qZDe+bGKYIm9.qQm07sEa4PKCM4uVmzNuDK4QWej"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_updates(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"laboris id esse voluptate","latest_version":"consectetur dolore eiusmod irure Ut","latest_version_link":"http://yDIRQywQVj.itoplrH.5.ZvDoQAWF,+mygysRlPEudD4CAcFtfH9T0nhlJ6Xs"},{"device_id":"ad sed in sit","latest_version":"do","latest_version_link":"https://ewOyOPLCYvOABMcIGaCT.wdbr+"},{"device_id":"commodo culpa non","latest_version":"commodo","latest_version_link":"https://qCFBSmpDECUttVJHEYqhktwLjsTJYA.enjwytNETkqFXbq9hn+bSYQ4qZDe+bGKYIm9.qQm07sEa4PKCM4uVmzNuDK4QWej"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_updates(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"laboris id esse voluptate","latest_version":"consectetur dolore eiusmod irure Ut","latest_version_link":"http://yDIRQywQVj.itoplrH.5.ZvDoQAWF,+mygysRlPEudD4CAcFtfH9T0nhlJ6Xs"},{"device_id":"ad sed in sit","latest_version":"do","latest_version_link":"https://ewOyOPLCYvOABMcIGaCT.wdbr+"},{"device_id":"commodo culpa non","latest_version":"commodo","latest_version_link":"https://qCFBSmpDECUttVJHEYqhktwLjsTJYA.enjwytNETkqFXbq9hn+bSYQ4qZDe+bGKYIm9.qQm07sEa4PKCM4uVmzNuDK4QWej"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_updates(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"device_id":"laboris id esse voluptate","latest_version":"consectetur dolore eiusmod irure Ut","latest_version_link":"http://yDIRQywQVj.itoplrH.5.ZvDoQAWF,+mygysRlPEudD4CAcFtfH9T0nhlJ6Xs"},{"device_id":"ad sed in sit","latest_version":"do","latest_version_link":"https://ewOyOPLCYvOABMcIGaCT.wdbr+"},{"device_id":"commodo culpa non","latest_version":"commodo","latest_version_link":"https://qCFBSmpDECUttVJHEYqhktwLjsTJYA.enjwytNETkqFXbq9hn+bSYQ4qZDe+bGKYIm9.qQm07sEa4PKCM4uVmzNuDK4QWej"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_updates(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_updates(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_update(aioresponses: aioresponses):
    url = r'/updates'
    url_variant = r'updates'
    full_url = BASE_URL+r'/updates'

    request = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_update(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_update(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_update(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_update(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_update(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_update(aioresponses: aioresponses):
    url = r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{"current_version": "test_string", }, {}, ]

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=303)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=303)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=303)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_update(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_patch_update(aioresponses: aioresponses):
    url = r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_update(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_update(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"device_id":"culpa esse dolore","latest_version":"minim magna","latest_version_link":"https://IncbR.bfnzF7cIrhjd,1W9EMaAzC-1GmY65i,reRg+EUT-LzYBJyYRGXPSJ4O42lEVIqKOr"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_update(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patch_update(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_update(aioresponses: aioresponses):
    url = r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/updates/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_update(url=full_url, **parameters)
