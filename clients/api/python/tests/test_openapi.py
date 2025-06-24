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
        response_200_dict = json.loads(r'[{"url":"https://ywksMQ.azJ,,Nw0l.t-ssD8N64Vnr-LNtJmyvZnPUSOeEw81kz","id":"eu","username":"tempor elit","admin":false,"password":"Ut mollit exercitation do"},{"url":"https://pYWBcACqOaHPIeqOIx.cmhtIFC54LRLzuPz-","id":"in dolore velit veniam","username":"cillum commodo et Lorem"},{"url":"http://DLrkvFgFhItukqdSMqaHFDU.khPqvmmSDErZDWIehH2x.u2jah1rirOUMOgrC-BQ","id":"ea","username":"cillum velit","admin":false,"password":"reprehenderit dolor magna"},{"url":"http://njFiEmNrTDWYVrgw.uodCtnJNyi.c+Iz4nSsuXZZKXNxP-g64GJ3Wu","id":"veniam ipsum eiusmod dolor","username":"in ut aliqua","admin":true,"password":"commodo Excepteur"},{"url":"http://MVdiprdrGwHgFEXwGogdRSLxKdMN.owKNXuL","id":"est aliqua proident et","username":"commodo elit ea et non"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://ywksMQ.azJ,,Nw0l.t-ssD8N64Vnr-LNtJmyvZnPUSOeEw81kz","id":"eu","username":"tempor elit","admin":false,"password":"Ut mollit exercitation do"},{"url":"https://pYWBcACqOaHPIeqOIx.cmhtIFC54LRLzuPz-","id":"in dolore velit veniam","username":"cillum commodo et Lorem"},{"url":"http://DLrkvFgFhItukqdSMqaHFDU.khPqvmmSDErZDWIehH2x.u2jah1rirOUMOgrC-BQ","id":"ea","username":"cillum velit","admin":false,"password":"reprehenderit dolor magna"},{"url":"http://njFiEmNrTDWYVrgw.uodCtnJNyi.c+Iz4nSsuXZZKXNxP-g64GJ3Wu","id":"veniam ipsum eiusmod dolor","username":"in ut aliqua","admin":true,"password":"commodo Excepteur"},{"url":"http://MVdiprdrGwHgFEXwGogdRSLxKdMN.owKNXuL","id":"est aliqua proident et","username":"commodo elit ea et non"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://ywksMQ.azJ,,Nw0l.t-ssD8N64Vnr-LNtJmyvZnPUSOeEw81kz","id":"eu","username":"tempor elit","admin":false,"password":"Ut mollit exercitation do"},{"url":"https://pYWBcACqOaHPIeqOIx.cmhtIFC54LRLzuPz-","id":"in dolore velit veniam","username":"cillum commodo et Lorem"},{"url":"http://DLrkvFgFhItukqdSMqaHFDU.khPqvmmSDErZDWIehH2x.u2jah1rirOUMOgrC-BQ","id":"ea","username":"cillum velit","admin":false,"password":"reprehenderit dolor magna"},{"url":"http://njFiEmNrTDWYVrgw.uodCtnJNyi.c+Iz4nSsuXZZKXNxP-g64GJ3Wu","id":"veniam ipsum eiusmod dolor","username":"in ut aliqua","admin":true,"password":"commodo Excepteur"},{"url":"http://MVdiprdrGwHgFEXwGogdRSLxKdMN.owKNXuL","id":"est aliqua proident et","username":"commodo elit ea et non"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://ywksMQ.azJ,,Nw0l.t-ssD8N64Vnr-LNtJmyvZnPUSOeEw81kz","id":"eu","username":"tempor elit","admin":false,"password":"Ut mollit exercitation do"},{"url":"https://pYWBcACqOaHPIeqOIx.cmhtIFC54LRLzuPz-","id":"in dolore velit veniam","username":"cillum commodo et Lorem"},{"url":"http://DLrkvFgFhItukqdSMqaHFDU.khPqvmmSDErZDWIehH2x.u2jah1rirOUMOgrC-BQ","id":"ea","username":"cillum velit","admin":false,"password":"reprehenderit dolor magna"},{"url":"http://njFiEmNrTDWYVrgw.uodCtnJNyi.c+Iz4nSsuXZZKXNxP-g64GJ3Wu","id":"veniam ipsum eiusmod dolor","username":"in ut aliqua","admin":true,"password":"commodo Excepteur"},{"url":"http://MVdiprdrGwHgFEXwGogdRSLxKdMN.owKNXuL","id":"est aliqua proident et","username":"commodo elit ea et non"}]')
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

    request = json.loads(r'{"username":"dolor ad","password":"amet cupidatat","id":"voluptate","admin":false,"url":"http://FSBGBNvZnJ.jzPyMN+sJN3tB80puC-0lslw1H6lxXQtUGr.2"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
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
        response_200_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
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

    request = json.loads(r'{}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://GSmeOay.zuyvL9Yb23FIc2aCKGb0.AtYSOFTqM30gB5p34mXcT6N","id":"laborum aliqua","username":"pariatur anim et Lorem ipsum","password":"sed ipsum dolor laboris","admin":false}')
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
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
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

    request = json.loads(r'{}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
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
        response_200_dict = json.loads(r'[{"url":"http://sAsYaDUmX.olkrnaJIJxN8ZMAcK","type":"cloud instantiable","name":"occaecat in non","isPublic":true,"description":"do voluptate id"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://sAsYaDUmX.olkrnaJIJxN8ZMAcK","type":"cloud instantiable","name":"occaecat in non","isPublic":true,"description":"do voluptate id"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://sAsYaDUmX.olkrnaJIJxN8ZMAcK","type":"cloud instantiable","name":"occaecat in non","isPublic":true,"description":"do voluptate id"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://sAsYaDUmX.olkrnaJIJxN8ZMAcK","type":"cloud instantiable","name":"occaecat in non","isPublic":true,"description":"do voluptate id"}]')
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

    request = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
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
        response_200_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
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

    request = json.loads(r'{"type":"edge instantiable","viewer":[{"url":"http://vpVKkfvqGjq.fhhkfKLuAJ..ErHHZQBjGPTLhfKOsofFUiVw9qoSFqWEoS2UcQxHikW1utUrk"},{"url":"https://MQEgzZbslDTVoYeqOXtD.heqzJf4,1pJGc31LvmJCrOQHaVpQ6VddniG0eLpBIg-emg8ddOyKAELq3f0gOBTyerGwtJ4UD9"}],"name":"laborum consequat nisi nulla pariatur","services":[{"serviceDirection":"prosumer","serviceType":"https://twmHElPRmLoD.uavw8ZZHuJsVdTg-4IG7lS","serviceId":"dolore exercitation","supportedConnectionTypes":["adipisicing dolor mollit","aliquip aliqua ut pariatur dolore"]},{"serviceDirection":"prosumer","supportedConnectionTypes":["exercitation","est id amet in dolore","exercitation pariatur aliqua cupidatat aliquip","in ut veniam Lorem","pariatur ut ut ad"],"serviceType":"https://IPrmmkkP.eazKgiRPGbKtsWbULISnbzZn","serviceId":"elit"},{"supportedConnectionTypes":["ipsum anim adipisicing mollit","pariatur dolor non","dolore do mollit pariatur","laboris"],"serviceType":"https://iEFts.qqhuA7SGknB5TZ8xc1MJg"}],"codeUrl":"https://fJVSKhocdQjLLSbV.agvbEsivRJ3PTHA57VdfuA6LCDOwf42HPznFIxAa8.rQxcaAWK.pBz3PLXFjwAzMUK+F7RLi","owner":[{"url":"https://RjAIvnpadDLehi.ruwbP+Oclh0FJW5G4XsQJr3A+AlpbhKC"},{"url":"https://kidNxzGfEgjdIYswYuOIkuax.uzaKL-,et73pWOhopwKhEZfwEGpXc3CA-eXcti-Ud7sR1ynOtR"},{"url":"https://DvxkiogIhmSYkzJfWxv.jmxoakitKAR5k5+THIPS6oXgMyP5Q7UW6I.OHMVeyI"}],"description":"sed dolor tempor ullamco laboris","isPublic":false}')

    parameter_list = [{"changedUrl": "test_string", "deletedUrl": "test_string", }, {"deletedUrl": "test_string", }, {"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://KMlhNcfBAeYBDdlNWpqiS.uhisZnfxWisWyA346eVjpoeK4BZYjE6oK.ZDneOU1atITfp","type":"group","name":"deserunt est sint magna labore","isPublic":false,"devices":[{"url":"https://YOSZZLZEKMazHeFvjzy.gajTDGgI0e.7QLRAyQNvsosnxLXxQSwdSjMZxmIrHvBPiS307XfTFj"},{"url":"https://whIdyVWYlqjGvFh.laf9x.hv8W"},{"url":"https://ArxHAialfPGZWvcvzmXeBBci.qftdxpbzFf0kcgN3,iyJvCKIeH3"}],"description":"ullamco voluptate","owner":[{"url":"http://LzJabypElGcrYPpoRwUMrR.egvcVYYKiO3vR"},{"url":"https://pO.oyfalCavEYnWwwa"},{"url":"https://YaDyTldBsEGNQkRLRSJXERGYXt.eyRdoDLiiFKUzJ"},{"url":"https://MXGuntpubSQBEWaFeD.rnlWp4EV3uCrfkIbi4uyKVsM2f8Y.I.N+8VVCJDodc+0qPPltOEcKiJfWd"},{"url":"http://zkxkKeJlGcaYu.udivLLttm6JR"}],"viewer":[{"url":"http://AEyxcJP.swmuJJqo6Vy-HPro8lm3WqKE3XOIfbopdGzXwAOsfaxcOlmihCF5aqk,F2"},{"url":"https://uUYlDOKMyeYnpfdudQZJODtjcpYIno.dxovc.5ldQCWcwLC4eTyRTGL9UHyN+U9wDarJbTwAUPO4ZV+fxGmoG6vfXuPFI"}]}')
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
        response_201_dict = json.loads(r'{"instance":{"url":"http://HSkbwlfjGsIgPsHRGlAgBXZfgfpmVvN.gtwzA,Y1+idjKqZY+7GH0WP3mf-S11QSXkHvnBkELuZWdN","type":"device","name":"laborum in","isPublic":true,"instanceOf":"incididunt aute","announcedAvailability":[{"start":"2021-09-12T01:48:42.0Z","end":"1961-07-24T07:59:20.0Z"},{"start":"1984-04-20T14:23:41.0Z","end":"1992-05-27T08:01:27.0Z"},{"start":"1952-09-25T19:03:01.0Z","end":"1954-06-22T20:06:55.0Z"},{"start":"1944-12-20T10:38:23.0Z","end":"1964-09-12T08:52:06.0Z"},{"start":"1947-01-20T16:41:10.0Z","end":"2019-08-12T09:03:25.0Z"}],"services":[{"serviceDirection":"producer"},{"serviceType":"http://EPjdEVgf.xuupZXiZNI","supportedConnectionTypes":["sunt commodo irure do mollit","Lorem ut in do quis"],"serviceId":"sunt dolore irure"},{"serviceType":"https://zPWpIWTs.rfZSGkgBciHihDPylLJROu.hqgrSoXIyxVgVyX7zj16RRhWt","serviceId":"magna","serviceDirection":"producer","supportedConnectionTypes":["elit","deserunt culpa et aliquip","dolore culpa Lorem","minim sed adipisicing deserunt irure"]}],"owner":[{"url":"http://zMYrluWE.gkyjmqVgPxfXr5GIWQQ1fv9+KFSfouZhD3Dn0GzSJypBQtKcr9QseKk"},{"url":"http://GEvhSwIAMtWGNttUsECLh.qziibJKDjuPd9vtFlDvRPniE3PtPzSYAGb"},{"url":"http://bHIaqlfooFjhOPqjgKBjEwuSoHlW.ijoEREr1C5w5K3zF0l-M7VXlb07dOEZm."},{"url":"https://njAFRoAPGhvKyxlXlxovBIkYYahnWO.xtnjyd5-vLp8BkP4k-D5T4-c24HnyRioZH3jRWavCXQLid,e+7WlrM5zaEyHHZRQ-IaFxNgN"}],"viewer":[{"url":"https://oTdpFphakpCmAOkWR.pefiyjVxV4iWQz0VNC39Lb3rcc,lYQx5Jw,6yUqswYAAdYQO4e-9rPWVX-CFF8pdNdcDBL"},{"url":"https://VkEyeJCYKivApZj.wnbZfotJPTpIFi,s81WtZqhW5gxWqdduiVQVjmGDCQr"},{"url":"https://LbWQILOvhFcTdAHGjbolapmFOIwZxe.hdCKnGzJVA5Uue9mAn3e,Qn5nIsWx8ebZfPYDoNdk"},{"url":"https://ZxjYYDCBzekqQfzDLpNdjt.ukniaifSSMczNFjOu-Yc4bS0wx.6RMOQHjEtbfnzKuyagPIU7gsDxPQl"},{"url":"http://BiSCfPREUpb.hpyyOn6y1irjdBZUiQrCa-EhO2HgAT5fAefJB8fwRNQG0bUBJPOWrSo,H1HPMKkZINbziBg8+UhmOzwMFOcCSgYECNRaNQU"}],"experiment":"http://GVZqnvKCAWArMubsiOv.odagIyzaBOhGnBFxOMQVndxi2twtPJiPItoZRQXyPuF7NdtZjz0K","description":"magna do dolor","connected":false},"deviceToken":"aute ut deserunt"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"http://HSkbwlfjGsIgPsHRGlAgBXZfgfpmVvN.gtwzA,Y1+idjKqZY+7GH0WP3mf-S11QSXkHvnBkELuZWdN","type":"device","name":"laborum in","isPublic":true,"instanceOf":"incididunt aute","announcedAvailability":[{"start":"2021-09-12T01:48:42.0Z","end":"1961-07-24T07:59:20.0Z"},{"start":"1984-04-20T14:23:41.0Z","end":"1992-05-27T08:01:27.0Z"},{"start":"1952-09-25T19:03:01.0Z","end":"1954-06-22T20:06:55.0Z"},{"start":"1944-12-20T10:38:23.0Z","end":"1964-09-12T08:52:06.0Z"},{"start":"1947-01-20T16:41:10.0Z","end":"2019-08-12T09:03:25.0Z"}],"services":[{"serviceDirection":"producer"},{"serviceType":"http://EPjdEVgf.xuupZXiZNI","supportedConnectionTypes":["sunt commodo irure do mollit","Lorem ut in do quis"],"serviceId":"sunt dolore irure"},{"serviceType":"https://zPWpIWTs.rfZSGkgBciHihDPylLJROu.hqgrSoXIyxVgVyX7zj16RRhWt","serviceId":"magna","serviceDirection":"producer","supportedConnectionTypes":["elit","deserunt culpa et aliquip","dolore culpa Lorem","minim sed adipisicing deserunt irure"]}],"owner":[{"url":"http://zMYrluWE.gkyjmqVgPxfXr5GIWQQ1fv9+KFSfouZhD3Dn0GzSJypBQtKcr9QseKk"},{"url":"http://GEvhSwIAMtWGNttUsECLh.qziibJKDjuPd9vtFlDvRPniE3PtPzSYAGb"},{"url":"http://bHIaqlfooFjhOPqjgKBjEwuSoHlW.ijoEREr1C5w5K3zF0l-M7VXlb07dOEZm."},{"url":"https://njAFRoAPGhvKyxlXlxovBIkYYahnWO.xtnjyd5-vLp8BkP4k-D5T4-c24HnyRioZH3jRWavCXQLid,e+7WlrM5zaEyHHZRQ-IaFxNgN"}],"viewer":[{"url":"https://oTdpFphakpCmAOkWR.pefiyjVxV4iWQz0VNC39Lb3rcc,lYQx5Jw,6yUqswYAAdYQO4e-9rPWVX-CFF8pdNdcDBL"},{"url":"https://VkEyeJCYKivApZj.wnbZfotJPTpIFi,s81WtZqhW5gxWqdduiVQVjmGDCQr"},{"url":"https://LbWQILOvhFcTdAHGjbolapmFOIwZxe.hdCKnGzJVA5Uue9mAn3e,Qn5nIsWx8ebZfPYDoNdk"},{"url":"https://ZxjYYDCBzekqQfzDLpNdjt.ukniaifSSMczNFjOu-Yc4bS0wx.6RMOQHjEtbfnzKuyagPIU7gsDxPQl"},{"url":"http://BiSCfPREUpb.hpyyOn6y1irjdBZUiQrCa-EhO2HgAT5fAefJB8fwRNQG0bUBJPOWrSo,H1HPMKkZINbziBg8+UhmOzwMFOcCSgYECNRaNQU"}],"experiment":"http://GVZqnvKCAWArMubsiOv.odagIyzaBOhGnBFxOMQVndxi2twtPJiPItoZRQXyPuF7NdtZjz0K","description":"magna do dolor","connected":false},"deviceToken":"aute ut deserunt"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"http://HSkbwlfjGsIgPsHRGlAgBXZfgfpmVvN.gtwzA,Y1+idjKqZY+7GH0WP3mf-S11QSXkHvnBkELuZWdN","type":"device","name":"laborum in","isPublic":true,"instanceOf":"incididunt aute","announcedAvailability":[{"start":"2021-09-12T01:48:42.0Z","end":"1961-07-24T07:59:20.0Z"},{"start":"1984-04-20T14:23:41.0Z","end":"1992-05-27T08:01:27.0Z"},{"start":"1952-09-25T19:03:01.0Z","end":"1954-06-22T20:06:55.0Z"},{"start":"1944-12-20T10:38:23.0Z","end":"1964-09-12T08:52:06.0Z"},{"start":"1947-01-20T16:41:10.0Z","end":"2019-08-12T09:03:25.0Z"}],"services":[{"serviceDirection":"producer"},{"serviceType":"http://EPjdEVgf.xuupZXiZNI","supportedConnectionTypes":["sunt commodo irure do mollit","Lorem ut in do quis"],"serviceId":"sunt dolore irure"},{"serviceType":"https://zPWpIWTs.rfZSGkgBciHihDPylLJROu.hqgrSoXIyxVgVyX7zj16RRhWt","serviceId":"magna","serviceDirection":"producer","supportedConnectionTypes":["elit","deserunt culpa et aliquip","dolore culpa Lorem","minim sed adipisicing deserunt irure"]}],"owner":[{"url":"http://zMYrluWE.gkyjmqVgPxfXr5GIWQQ1fv9+KFSfouZhD3Dn0GzSJypBQtKcr9QseKk"},{"url":"http://GEvhSwIAMtWGNttUsECLh.qziibJKDjuPd9vtFlDvRPniE3PtPzSYAGb"},{"url":"http://bHIaqlfooFjhOPqjgKBjEwuSoHlW.ijoEREr1C5w5K3zF0l-M7VXlb07dOEZm."},{"url":"https://njAFRoAPGhvKyxlXlxovBIkYYahnWO.xtnjyd5-vLp8BkP4k-D5T4-c24HnyRioZH3jRWavCXQLid,e+7WlrM5zaEyHHZRQ-IaFxNgN"}],"viewer":[{"url":"https://oTdpFphakpCmAOkWR.pefiyjVxV4iWQz0VNC39Lb3rcc,lYQx5Jw,6yUqswYAAdYQO4e-9rPWVX-CFF8pdNdcDBL"},{"url":"https://VkEyeJCYKivApZj.wnbZfotJPTpIFi,s81WtZqhW5gxWqdduiVQVjmGDCQr"},{"url":"https://LbWQILOvhFcTdAHGjbolapmFOIwZxe.hdCKnGzJVA5Uue9mAn3e,Qn5nIsWx8ebZfPYDoNdk"},{"url":"https://ZxjYYDCBzekqQfzDLpNdjt.ukniaifSSMczNFjOu-Yc4bS0wx.6RMOQHjEtbfnzKuyagPIU7gsDxPQl"},{"url":"http://BiSCfPREUpb.hpyyOn6y1irjdBZUiQrCa-EhO2HgAT5fAefJB8fwRNQG0bUBJPOWrSo,H1HPMKkZINbziBg8+UhmOzwMFOcCSgYECNRaNQU"}],"experiment":"http://GVZqnvKCAWArMubsiOv.odagIyzaBOhGnBFxOMQVndxi2twtPJiPItoZRQXyPuF7NdtZjz0K","description":"magna do dolor","connected":false},"deviceToken":"aute ut deserunt"}')
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
        response_200_dict = json.loads(r'[{"start":"1970-02-05T07:11:50.0Z","end":"1961-05-01T19:59:41.0Z"},{"start":"2021-11-22T13:22:11.0Z","end":"2020-04-28T13:02:24.0Z"},{"start":"1987-02-21T07:58:44.0Z","end":"1945-12-03T01:41:49.0Z"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device_availability(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1970-02-05T07:11:50.0Z","end":"1961-05-01T19:59:41.0Z"},{"start":"2021-11-22T13:22:11.0Z","end":"2020-04-28T13:02:24.0Z"},{"start":"1987-02-21T07:58:44.0Z","end":"1945-12-03T01:41:49.0Z"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device_availability(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1970-02-05T07:11:50.0Z","end":"1961-05-01T19:59:41.0Z"},{"start":"2021-11-22T13:22:11.0Z","end":"2020-04-28T13:02:24.0Z"},{"start":"1987-02-21T07:58:44.0Z","end":"1945-12-03T01:41:49.0Z"}]')
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
        response_200_dict = json.loads(r'[{"start":"1970-02-05T07:11:50.0Z","end":"1961-05-01T19:59:41.0Z"},{"start":"2021-11-22T13:22:11.0Z","end":"2020-04-28T13:02:24.0Z"},{"start":"1987-02-21T07:58:44.0Z","end":"1945-12-03T01:41:49.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_device_availability_rules(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1970-02-05T07:11:50.0Z","end":"1961-05-01T19:59:41.0Z"},{"start":"2021-11-22T13:22:11.0Z","end":"2020-04-28T13:02:24.0Z"},{"start":"1987-02-21T07:58:44.0Z","end":"1945-12-03T01:41:49.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_device_availability_rules(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1970-02-05T07:11:50.0Z","end":"1961-05-01T19:59:41.0Z"},{"start":"2021-11-22T13:22:11.0Z","end":"2020-04-28T13:02:24.0Z"},{"start":"1987-02-21T07:58:44.0Z","end":"1945-12-03T01:41:49.0Z"}]')
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

    request = json.loads(r'{"messageType":"configuration","configuration":{}}')

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
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","status":"closed","devices":[{"url":"https://rJNQLyPcQVLNw.yraHT3"},{"url":"http://qRiwEoE.potvrsMFI4ANMjv0kh15v6NcEvF3WXcD"}],"configuration":{}},{"url":"https://nObQowgXIbFEJIqVUszBtNaxcvs.qcfpwjW78qqRkUwL31pYoVVBby3LIRM15oLc","type":"websocket","status":"connecting","devices":[{"url":"https://TmugjQrJ.pnhxezijwlG9UGGliE,00YNBH18unLiV4NyqDKPZckn7l5O6k11fQrKB8n5Vb+"},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwqPDfq4O"}],"configuration":{}},{"url":"https://LsxZPiVLh.rhbKoN-JrrHv6gAWyAoimbQ+KeslN,n1ITCNVvqZSE","type":"webrtc","status":"failed","devices":[{"url":"https://JtTwtOZMoMfAlO.poijU01YAcwamgz7SsH2qwbIf8dItM,LQpxMLZb8fnWFpMgHKez"},{"url":"https://grKctfBFKScUY.yqdL4RnrN6CuAOYDUIm,fF"}],"configuration":{}},{"url":"http://HLGohkhyLXIuyclfuimxfXPeE.rboJDEoN6H6E2wz8YGx5","type":"websocket","status":"failed","devices":[{"url":"https://iVljKwCoObDTwhQ.bqS9Udo3NZUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}],"configuration":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","status":"closed","devices":[{"url":"https://rJNQLyPcQVLNw.yraHT3"},{"url":"http://qRiwEoE.potvrsMFI4ANMjv0kh15v6NcEvF3WXcD"}],"configuration":{}},{"url":"https://nObQowgXIbFEJIqVUszBtNaxcvs.qcfpwjW78qqRkUwL31pYoVVBby3LIRM15oLc","type":"websocket","status":"connecting","devices":[{"url":"https://TmugjQrJ.pnhxezijwlG9UGGliE,00YNBH18unLiV4NyqDKPZckn7l5O6k11fQrKB8n5Vb+"},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwqPDfq4O"}],"configuration":{}},{"url":"https://LsxZPiVLh.rhbKoN-JrrHv6gAWyAoimbQ+KeslN,n1ITCNVvqZSE","type":"webrtc","status":"failed","devices":[{"url":"https://JtTwtOZMoMfAlO.poijU01YAcwamgz7SsH2qwbIf8dItM,LQpxMLZb8fnWFpMgHKez"},{"url":"https://grKctfBFKScUY.yqdL4RnrN6CuAOYDUIm,fF"}],"configuration":{}},{"url":"http://HLGohkhyLXIuyclfuimxfXPeE.rboJDEoN6H6E2wz8YGx5","type":"websocket","status":"failed","devices":[{"url":"https://iVljKwCoObDTwhQ.bqS9Udo3NZUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}],"configuration":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","status":"closed","devices":[{"url":"https://rJNQLyPcQVLNw.yraHT3"},{"url":"http://qRiwEoE.potvrsMFI4ANMjv0kh15v6NcEvF3WXcD"}],"configuration":{}},{"url":"https://nObQowgXIbFEJIqVUszBtNaxcvs.qcfpwjW78qqRkUwL31pYoVVBby3LIRM15oLc","type":"websocket","status":"connecting","devices":[{"url":"https://TmugjQrJ.pnhxezijwlG9UGGliE,00YNBH18unLiV4NyqDKPZckn7l5O6k11fQrKB8n5Vb+"},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwqPDfq4O"}],"configuration":{}},{"url":"https://LsxZPiVLh.rhbKoN-JrrHv6gAWyAoimbQ+KeslN,n1ITCNVvqZSE","type":"webrtc","status":"failed","devices":[{"url":"https://JtTwtOZMoMfAlO.poijU01YAcwamgz7SsH2qwbIf8dItM,LQpxMLZb8fnWFpMgHKez"},{"url":"https://grKctfBFKScUY.yqdL4RnrN6CuAOYDUIm,fF"}],"configuration":{}},{"url":"http://HLGohkhyLXIuyclfuimxfXPeE.rboJDEoN6H6E2wz8YGx5","type":"websocket","status":"failed","devices":[{"url":"https://iVljKwCoObDTwhQ.bqS9Udo3NZUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}],"configuration":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_peerconnections(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"http://ZdTGPafFTFdOrlsRXKyoRQQ.ykdvKuq2vr32FegxRPOh7SbwHe","type":"local","status":"closed","devices":[{"url":"https://rJNQLyPcQVLNw.yraHT3"},{"url":"http://qRiwEoE.potvrsMFI4ANMjv0kh15v6NcEvF3WXcD"}],"configuration":{}},{"url":"https://nObQowgXIbFEJIqVUszBtNaxcvs.qcfpwjW78qqRkUwL31pYoVVBby3LIRM15oLc","type":"websocket","status":"connecting","devices":[{"url":"https://TmugjQrJ.pnhxezijwlG9UGGliE,00YNBH18unLiV4NyqDKPZckn7l5O6k11fQrKB8n5Vb+"},{"url":"http://atiqKdIcgcdciNqJELLbebsHu.fwqPDfq4O"}],"configuration":{}},{"url":"https://LsxZPiVLh.rhbKoN-JrrHv6gAWyAoimbQ+KeslN,n1ITCNVvqZSE","type":"webrtc","status":"failed","devices":[{"url":"https://JtTwtOZMoMfAlO.poijU01YAcwamgz7SsH2qwbIf8dItM,LQpxMLZb8fnWFpMgHKez"},{"url":"https://grKctfBFKScUY.yqdL4RnrN6CuAOYDUIm,fF"}],"configuration":{}},{"url":"http://HLGohkhyLXIuyclfuimxfXPeE.rboJDEoN6H6E2wz8YGx5","type":"websocket","status":"failed","devices":[{"url":"https://iVljKwCoObDTwhQ.bqS9Udo3NZUTYErE,1ovLOXv-jv-Hfn3vfTb.VBpjQyEkuotIBsl8I-"},{"url":"https://iqxBcnpgrxqNks.xioyynXEHn4le2aIxURnGf7yU-xVT6GfYt6NCgSZxHT0zxLPX-wffwgvDZS7iTm"}],"configuration":{}}]')
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

    request = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')

    parameter_list = [{"closedUrl": "test_string", "statusChangedUrl": "test_string", }, {"statusChangedUrl": "test_string", }, {"closedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
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
        response_200_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"http://HWsenjwtldF.oufaxsH0wiaJIG1zcA.rqCDL-dC","type":"webrtc","status":"closed","devices":[{"url":"http://cc.xbaxafSY0HoKDjJT3s3N0-ygToGFAyhL6t9Z5kPfg7rqUCoSY9LyMOvQZV2,"},{"url":"http://VMVSdYkXYwuHINxUTfCxZjHTgAfserC.qjyGSF25bErHyPkPI46tuYe9Fp,Aaa8qEQZziQoYWaSzbwf+","config":{"services":[{"serviceType":"http://kVhSaWRIJiRhCDqyKhxHoidu.ycydq+r.lP6Dig0cpjt","serviceId":"exercitation ad","remoteServiceId":"Ut laborum","remoteServiceDescription":{"serviceType":"http://VStNMeLEwvjaTZ.abfgT1lOKbpK6KEA.ufnEL-qkLB7vcMz,jjKxj+CEqknkIMYsAt6","supportedConnectionTypes":["aliqua laboris aute ullamco reprehenderit","proident","nostrud proident labore aute","sint in"],"serviceId":"proident ut officia","serviceDirection":"producer"}},{"serviceType":"http://mrOWg.zdlvdzGIwe+cs2-0eQ","serviceId":"labore laborum tempor","remoteServiceId":"est sint elit consequat id","remoteServiceDescription":{"serviceId":"Duis Excepteur dolor pariatur non","serviceType":"http://kNpwzqGKcujNr.bqS4C-o9-vr59K+hSUSRNfKRilxTKcCtnuWuEWjJfWsH","supportedConnectionTypes":["aliquip","elit","sit esse","voluptate consequat labore nulla anim","ullamco magna"]}},{"serviceType":"http://HrWfMLTdqOr.uwaZjrBcDQZhQfmYwVu13Sc5Z","serviceId":"sit exercitation Excepteur","remoteServiceId":"adipisicing ut irure","remoteServiceDescription":{"serviceType":"https://jNREZEp.hfvrpGWOJR0,ZaivEECCEWErJYD4KbktAjnuB.IsF","supportedConnectionTypes":["Excepteur mollit","ut ad commodo dolor"],"serviceId":"eiusmod Ut laboris in cupidatat"}},{"serviceType":"http://NqyZhwI.pcnrl2CXDhzEJEW0p0pD+U8FSHFfnIVSRWNjLlVc,Tjec0gP+wiwdPQ.ti4bnJk","serviceId":"sit","remoteServiceId":"aliqua","remoteServiceDescription":{"supportedConnectionTypes":["occaecat eu in","esse proident qui Excepteur","pariatur culpa irure","eiusmod ad incididunt Duis dolor","dolor Ut qui"],"serviceType":"https://MSbzLCewSfguAwxJYxKb.coeRqCUNMDq4cEn1-PZDOA4","serviceId":"proident eiusmod deserunt ipsum","serviceDirection":"consumer"}},{"serviceType":"https://sSWnIaKSLISdZeEk.vmqhj8A+","serviceId":"in nulla id irure","remoteServiceId":"est velit Excepteur","remoteServiceDescription":{"supportedConnectionTypes":["mollit dolor sit","dolor nisi ad occaecat voluptate","et dolore sint magna ut","magna ea","reprehenderit esse"],"serviceType":"http://MsYANLMWPEEBOkOLXDwqrUIWnGiusKAKr.rpN.zGX7mFnHuOUOr0ukItSqC","serviceId":"aute exercitation pariatur","serviceDirection":"producer"}}]}}],"configuration":{}}')
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

    parameter_list = [{"experimentStatus": "test_string", }, {}, ]

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


@pytest.mark.asyncio
async def test_list_bookings(aioresponses: aioresponses):
    url = r'/bookings'
    url_variant = r'bookings'
    full_url = BASE_URL+r'/bookings'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"do anim non ex","status":"rejected","timeslot":{"start":"2000-07-06T23:16:24.0Z","end":"1947-02-01T22:01:05.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_bookings(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"do anim non ex","status":"rejected","timeslot":{"start":"2000-07-06T23:16:24.0Z","end":"1947-02-01T22:01:05.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_bookings(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"do anim non ex","status":"rejected","timeslot":{"start":"2000-07-06T23:16:24.0Z","end":"1947-02-01T22:01:05.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_bookings(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"do anim non ex","status":"rejected","timeslot":{"start":"2000-07-06T23:16:24.0Z","end":"1947-02-01T22:01:05.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_bookings(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_bookings(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_booking(aioresponses: aioresponses):
    url = r'/bookings'
    url_variant = r'bookings'
    full_url = BASE_URL+r'/bookings'

    request = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')

    parameter_list = [{"changedUrl": "test_string", "deletedUrl": "test_string", }, {"deletedUrl": "test_string", }, {"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_booking(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_booking(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_booking(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_booking(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_booking(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_booking(aioresponses: aioresponses):
    url = r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_booking(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_booking(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_booking(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_booking(aioresponses: aioresponses):
    url = r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"url":"et pariatur ut","status":"accepted","isLocked":true,"selectedDevices":{},"devices":{},"timeslot":{"start":"1949-09-08T18:37:25.0Z","end":"2008-08-28T13:11:38.0Z"}}')

    parameter_list = [{"changedUrl": "test_string", "deletedUrl": "test_string", }, {"deletedUrl": "test_string", }, {"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_booking(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_booking(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"aliqua Excepteur elit","status":"rejected","timeslot":{"start":"2022-01-15T20:42:35.0Z","end":"1994-10-27T07:45:49.0Z"},"devices":{},"isLocked":true,"selectedDevices":{}}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_booking(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_booking(aioresponses: aioresponses):
    url = r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_lock_booking(aioresponses: aioresponses):
    url = r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lock_booking(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lock_booking(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lock_booking(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_unlock_booking(aioresponses: aioresponses):
    url = r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/bookings/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_schedule(aioresponses: aioresponses):
    url = r'/schedule'
    url_variant = r'schedule'
    full_url = BASE_URL+r'/schedule'

    request = json.loads(r'{"devices":["Excepteur in sunt","velit cillum","amet cupidatat","do labore consequat voluptate","nulla aliqua anim incididunt nostrud"],"timeframe":{"start":"1967-01-28T23:58:10.0Z","end":"1998-08-19T08:22:08.0Z"}}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1985-02-04T03:27:15.0Z","end":"2005-05-15T16:08:57.0Z"},{"start":"1949-08-18T22:29:50.0Z","end":"2017-02-27T04:06:50.0Z"},{"start":"1971-10-25T16:21:06.0Z","end":"1949-01-11T17:05:29.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1985-02-04T03:27:15.0Z","end":"2005-05-15T16:08:57.0Z"},{"start":"1949-08-18T22:29:50.0Z","end":"2017-02-27T04:06:50.0Z"},{"start":"1971-10-25T16:21:06.0Z","end":"1949-01-11T17:05:29.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1985-02-04T03:27:15.0Z","end":"2005-05-15T16:08:57.0Z"},{"start":"1949-08-18T22:29:50.0Z","end":"2017-02-27T04:06:50.0Z"},{"start":"1971-10-25T16:21:06.0Z","end":"1949-01-11T17:05:29.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"start":"1985-02-04T03:27:15.0Z","end":"2005-05-15T16:08:57.0Z"},{"start":"1949-08-18T22:29:50.0Z","end":"2017-02-27T04:06:50.0Z"},{"start":"1971-10-25T16:21:06.0Z","end":"1949-01-11T17:05:29.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_list_platform(aioresponses: aioresponses):
    url = r'/lti/platform'
    url_variant = r'lti/platform'
    full_url = BASE_URL+r'/lti/platform'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"https://LkzZLxHUBtInyAGZVeLJqdfBoek.bvxstbiJTC3OsYQmTwBHRqzKwttFxZO035BBRM+","registration":{"state":"pending","token":"sunt sit"},"login_uri":"https://tcQLflOPfextPAiKtbSf.mnoH-XJpQpL-LWl1u,U0jMyb3Ip-FgtFJX1H9BEX,G7uk","launch_uri":"https://sQCw.hazVvwIeOiVdKssGZA8yZrJSTQnjKdnkL-CP9gQCLfsAyA","jwks_uri":"https://ZwnCkXWWqicYgLcgNidUjV.hjca4DAUSX,mV.DUt8p6rWMbyLTLXHkjX5qXZJWyDwYdhBEAEZ6qtS2y-q5CYMnBKWrYaH","issuer":"fugiat dolore","deployment_id":"esse in","client_id":"tempor eu sed voluptate deserunt"},{"uri":"http://UqQNcKmVOFHrxOgiyR.spnAnkmwtt4XTPxbVXpQhHqDFWotH-RPA9tmB","registration":{"state":"pending","token":"proident ex"},"login_uri":"http://wfUuMrVXymXDiOxiuvP.huvdIjKF3sO0-6zdfl9iIyudJNDRQfDjyRts5Z","launch_uri":"http://F.wnjUx+OvR.UgVr9PbNM,kjgY2BVZfRE1vDNw3hjJiY7P0+10rDcQHi.PEm","jwks_uri":"http://YPytYmKqleEON.cevomIfZswRdvgWJzW9Bysl4UebwWEjo42QcJRKKDSc1rCaeReMeV4wEALwZnrG6","issuer":"velit","deployment_id":"officia ipsum","client_id":"id commodo non ut"},{"uri":"http://keWYBOhFDbqASViNGnAAIoHQoSBWfO.jkkrz8v00mszfsjGaykgtJpensPS1qsekj","registration":{"state":"complete","token":"sit sint Lorem ullamco eu"},"login_uri":"http://cscceNTnmgdsBp.hdtoCJsz6v9ZS6xyNMyJdHN,JG.U7uHWAhDxtiz56.","launch_uri":"https://BPBa.ueufRMw1ygpAhlYD-FEjjkyf9GFqCualcfwrwvIf","jwks_uri":"http://aQHZMKClcURrLnXEmiSxJHBdQDb.eeof3MR+KL-jU,b+KQNCem","issuer":"sunt ad","client_id":"anim Lorem ullamco laboris","deployment_id":"adipisicing sint minim"},{"uri":"https://DRxLqKYIgJZgXKlfJBSwojxXcFlwBvM.snxhLX3Hd0YqddhhUNWrbqI-GVco7Uq4K3kyy2vBaRM+lv","registration":{"state":"pending","token":"dolore amet"},"login_uri":"http://TsFTbBDadENUDcwzNHKjaK.nnvkn73ig+F9lRtWMsn0vL32ib4,Jvf6oxbgtnt-rsjOHo","launch_uri":"https://pJeGetbMhjjvEDM.rbtgzrCFPhooPTVE4..eZPp+5p27L0BwLYG8eF0","jwks_uri":"https://SpRkGEVPEOd.pjxrKtYb0OmN0IWeeUiH3DbG+ogDWY.PTPj","deployment_id":"quis non nisi cillum occaecat","issuer":"in","client_id":"non Excepteur culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_platform(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"https://LkzZLxHUBtInyAGZVeLJqdfBoek.bvxstbiJTC3OsYQmTwBHRqzKwttFxZO035BBRM+","registration":{"state":"pending","token":"sunt sit"},"login_uri":"https://tcQLflOPfextPAiKtbSf.mnoH-XJpQpL-LWl1u,U0jMyb3Ip-FgtFJX1H9BEX,G7uk","launch_uri":"https://sQCw.hazVvwIeOiVdKssGZA8yZrJSTQnjKdnkL-CP9gQCLfsAyA","jwks_uri":"https://ZwnCkXWWqicYgLcgNidUjV.hjca4DAUSX,mV.DUt8p6rWMbyLTLXHkjX5qXZJWyDwYdhBEAEZ6qtS2y-q5CYMnBKWrYaH","issuer":"fugiat dolore","deployment_id":"esse in","client_id":"tempor eu sed voluptate deserunt"},{"uri":"http://UqQNcKmVOFHrxOgiyR.spnAnkmwtt4XTPxbVXpQhHqDFWotH-RPA9tmB","registration":{"state":"pending","token":"proident ex"},"login_uri":"http://wfUuMrVXymXDiOxiuvP.huvdIjKF3sO0-6zdfl9iIyudJNDRQfDjyRts5Z","launch_uri":"http://F.wnjUx+OvR.UgVr9PbNM,kjgY2BVZfRE1vDNw3hjJiY7P0+10rDcQHi.PEm","jwks_uri":"http://YPytYmKqleEON.cevomIfZswRdvgWJzW9Bysl4UebwWEjo42QcJRKKDSc1rCaeReMeV4wEALwZnrG6","issuer":"velit","deployment_id":"officia ipsum","client_id":"id commodo non ut"},{"uri":"http://keWYBOhFDbqASViNGnAAIoHQoSBWfO.jkkrz8v00mszfsjGaykgtJpensPS1qsekj","registration":{"state":"complete","token":"sit sint Lorem ullamco eu"},"login_uri":"http://cscceNTnmgdsBp.hdtoCJsz6v9ZS6xyNMyJdHN,JG.U7uHWAhDxtiz56.","launch_uri":"https://BPBa.ueufRMw1ygpAhlYD-FEjjkyf9GFqCualcfwrwvIf","jwks_uri":"http://aQHZMKClcURrLnXEmiSxJHBdQDb.eeof3MR+KL-jU,b+KQNCem","issuer":"sunt ad","client_id":"anim Lorem ullamco laboris","deployment_id":"adipisicing sint minim"},{"uri":"https://DRxLqKYIgJZgXKlfJBSwojxXcFlwBvM.snxhLX3Hd0YqddhhUNWrbqI-GVco7Uq4K3kyy2vBaRM+lv","registration":{"state":"pending","token":"dolore amet"},"login_uri":"http://TsFTbBDadENUDcwzNHKjaK.nnvkn73ig+F9lRtWMsn0vL32ib4,Jvf6oxbgtnt-rsjOHo","launch_uri":"https://pJeGetbMhjjvEDM.rbtgzrCFPhooPTVE4..eZPp+5p27L0BwLYG8eF0","jwks_uri":"https://SpRkGEVPEOd.pjxrKtYb0OmN0IWeeUiH3DbG+ogDWY.PTPj","deployment_id":"quis non nisi cillum occaecat","issuer":"in","client_id":"non Excepteur culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_platform(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"https://LkzZLxHUBtInyAGZVeLJqdfBoek.bvxstbiJTC3OsYQmTwBHRqzKwttFxZO035BBRM+","registration":{"state":"pending","token":"sunt sit"},"login_uri":"https://tcQLflOPfextPAiKtbSf.mnoH-XJpQpL-LWl1u,U0jMyb3Ip-FgtFJX1H9BEX,G7uk","launch_uri":"https://sQCw.hazVvwIeOiVdKssGZA8yZrJSTQnjKdnkL-CP9gQCLfsAyA","jwks_uri":"https://ZwnCkXWWqicYgLcgNidUjV.hjca4DAUSX,mV.DUt8p6rWMbyLTLXHkjX5qXZJWyDwYdhBEAEZ6qtS2y-q5CYMnBKWrYaH","issuer":"fugiat dolore","deployment_id":"esse in","client_id":"tempor eu sed voluptate deserunt"},{"uri":"http://UqQNcKmVOFHrxOgiyR.spnAnkmwtt4XTPxbVXpQhHqDFWotH-RPA9tmB","registration":{"state":"pending","token":"proident ex"},"login_uri":"http://wfUuMrVXymXDiOxiuvP.huvdIjKF3sO0-6zdfl9iIyudJNDRQfDjyRts5Z","launch_uri":"http://F.wnjUx+OvR.UgVr9PbNM,kjgY2BVZfRE1vDNw3hjJiY7P0+10rDcQHi.PEm","jwks_uri":"http://YPytYmKqleEON.cevomIfZswRdvgWJzW9Bysl4UebwWEjo42QcJRKKDSc1rCaeReMeV4wEALwZnrG6","issuer":"velit","deployment_id":"officia ipsum","client_id":"id commodo non ut"},{"uri":"http://keWYBOhFDbqASViNGnAAIoHQoSBWfO.jkkrz8v00mszfsjGaykgtJpensPS1qsekj","registration":{"state":"complete","token":"sit sint Lorem ullamco eu"},"login_uri":"http://cscceNTnmgdsBp.hdtoCJsz6v9ZS6xyNMyJdHN,JG.U7uHWAhDxtiz56.","launch_uri":"https://BPBa.ueufRMw1ygpAhlYD-FEjjkyf9GFqCualcfwrwvIf","jwks_uri":"http://aQHZMKClcURrLnXEmiSxJHBdQDb.eeof3MR+KL-jU,b+KQNCem","issuer":"sunt ad","client_id":"anim Lorem ullamco laboris","deployment_id":"adipisicing sint minim"},{"uri":"https://DRxLqKYIgJZgXKlfJBSwojxXcFlwBvM.snxhLX3Hd0YqddhhUNWrbqI-GVco7Uq4K3kyy2vBaRM+lv","registration":{"state":"pending","token":"dolore amet"},"login_uri":"http://TsFTbBDadENUDcwzNHKjaK.nnvkn73ig+F9lRtWMsn0vL32ib4,Jvf6oxbgtnt-rsjOHo","launch_uri":"https://pJeGetbMhjjvEDM.rbtgzrCFPhooPTVE4..eZPp+5p27L0BwLYG8eF0","jwks_uri":"https://SpRkGEVPEOd.pjxrKtYb0OmN0IWeeUiH3DbG+ogDWY.PTPj","deployment_id":"quis non nisi cillum occaecat","issuer":"in","client_id":"non Excepteur culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_platform(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"https://LkzZLxHUBtInyAGZVeLJqdfBoek.bvxstbiJTC3OsYQmTwBHRqzKwttFxZO035BBRM+","registration":{"state":"pending","token":"sunt sit"},"login_uri":"https://tcQLflOPfextPAiKtbSf.mnoH-XJpQpL-LWl1u,U0jMyb3Ip-FgtFJX1H9BEX,G7uk","launch_uri":"https://sQCw.hazVvwIeOiVdKssGZA8yZrJSTQnjKdnkL-CP9gQCLfsAyA","jwks_uri":"https://ZwnCkXWWqicYgLcgNidUjV.hjca4DAUSX,mV.DUt8p6rWMbyLTLXHkjX5qXZJWyDwYdhBEAEZ6qtS2y-q5CYMnBKWrYaH","issuer":"fugiat dolore","deployment_id":"esse in","client_id":"tempor eu sed voluptate deserunt"},{"uri":"http://UqQNcKmVOFHrxOgiyR.spnAnkmwtt4XTPxbVXpQhHqDFWotH-RPA9tmB","registration":{"state":"pending","token":"proident ex"},"login_uri":"http://wfUuMrVXymXDiOxiuvP.huvdIjKF3sO0-6zdfl9iIyudJNDRQfDjyRts5Z","launch_uri":"http://F.wnjUx+OvR.UgVr9PbNM,kjgY2BVZfRE1vDNw3hjJiY7P0+10rDcQHi.PEm","jwks_uri":"http://YPytYmKqleEON.cevomIfZswRdvgWJzW9Bysl4UebwWEjo42QcJRKKDSc1rCaeReMeV4wEALwZnrG6","issuer":"velit","deployment_id":"officia ipsum","client_id":"id commodo non ut"},{"uri":"http://keWYBOhFDbqASViNGnAAIoHQoSBWfO.jkkrz8v00mszfsjGaykgtJpensPS1qsekj","registration":{"state":"complete","token":"sit sint Lorem ullamco eu"},"login_uri":"http://cscceNTnmgdsBp.hdtoCJsz6v9ZS6xyNMyJdHN,JG.U7uHWAhDxtiz56.","launch_uri":"https://BPBa.ueufRMw1ygpAhlYD-FEjjkyf9GFqCualcfwrwvIf","jwks_uri":"http://aQHZMKClcURrLnXEmiSxJHBdQDb.eeof3MR+KL-jU,b+KQNCem","issuer":"sunt ad","client_id":"anim Lorem ullamco laboris","deployment_id":"adipisicing sint minim"},{"uri":"https://DRxLqKYIgJZgXKlfJBSwojxXcFlwBvM.snxhLX3Hd0YqddhhUNWrbqI-GVco7Uq4K3kyy2vBaRM+lv","registration":{"state":"pending","token":"dolore amet"},"login_uri":"http://TsFTbBDadENUDcwzNHKjaK.nnvkn73ig+F9lRtWMsn0vL32ib4,Jvf6oxbgtnt-rsjOHo","launch_uri":"https://pJeGetbMhjjvEDM.rbtgzrCFPhooPTVE4..eZPp+5p27L0BwLYG8eF0","jwks_uri":"https://SpRkGEVPEOd.pjxrKtYb0OmN0IWeeUiH3DbG+ogDWY.PTPj","deployment_id":"quis non nisi cillum occaecat","issuer":"in","client_id":"non Excepteur culpa"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_platform(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_platform(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_platform(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_register_platform(aioresponses: aioresponses):
    url = r'/lti/platform'
    url_variant = r'lti/platform'
    full_url = BASE_URL+r'/lti/platform'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.register_platform(**parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.register_platform(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.register_platform(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.register_platform(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.register_platform(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.register_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.register_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.register_platform(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_platform(aioresponses: aioresponses):
    url = r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_platform(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_platform(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_platform(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_platform(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_platform(aioresponses: aioresponses):
    url = r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_platform(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_platform(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://FVLZoaTWIuNaQfAOtMsvbEuVPW.fjszk.r7pLbf4v-qkm.2U5BOdZjU3RfnLTtH1Ce6yBwm","registration":{"state":"complete","token":"in eiusmod labore"},"login_uri":"https://HAXEjyDaKa.thtsmBKQnx-","launch_uri":"http://sXNHTpJnB.kekhvPO.PhTGl1twaUdrkuLwFLt4WQKheCTMMOSpijkFKu31EXGdX8W4","jwks_uri":"http://CJzZsjNZBnBNuFNm.uiuV.I.NyL8sxdvM0HKgbuyfgL-wxrhOJ2C"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_platform(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_platform(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_platform(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_delete_platform(aioresponses: aioresponses):
    url = r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_platform(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_platform(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_platform(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_platform(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_lti_login(aioresponses: aioresponses):
    url = r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/login'
    url_variant = r'lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/login'
    full_url = BASE_URL+r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/login'

    request = json.loads(r'{"iss":"ea dolore","client_id":"ut irure deserunt","target_link_uri":"magna et occaecat","login_hint":"id in amet consequat pariatur","lti_message_hint":"anim esse sed cillum","lti_deployment_id":"et"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"authentication_request_url":"aute amet"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_login(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"authentication_request_url":"aute amet"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_login(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"authentication_request_url":"aute amet"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_login(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)


@pytest.mark.asyncio
async def test_lti_launch(aioresponses: aioresponses):
    url = r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/launch'
    url_variant = r'lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/launch'
    full_url = BASE_URL+r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/launch'

    request = json.loads(r'{"state":"dolor","id_token":"deserunt ullamco magna proident id"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"access_token":"minim","session":{"uri":"https://UAASLLwMkIdSNpj.wqkfaWe27csDqjjyN4uoI0wBNeOxjzZQ0L3sxpp-gC7-yhXWoorWGz8fBND","resource_uri":"https://n.piehX1nLz1YXqezrcYPqFxkDqpJn","roles":["instructor"],"role_mapping":[{"role":"nulla consectetur in deserunt","device":"https://zwhUGaSJTKpCDHkMQBSesScIRgPFcawXv.pdkplKNDxrdcet10LCf3UWFD-rpJQA0PvPxRm91vTppQ.X3cVcK"}],"experiment_change_uri":"https://hfRtAMwM.rwimFRW0jzG,d,fuZPtpckqvdsgkiZhTUXU4wXW","experiment_uri":"http://xSlTWCzgHiovQVtNPLskSop.nlflb35YtpaK8DY"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_launch(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"access_token":"minim","session":{"uri":"https://UAASLLwMkIdSNpj.wqkfaWe27csDqjjyN4uoI0wBNeOxjzZQ0L3sxpp-gC7-yhXWoorWGz8fBND","resource_uri":"https://n.piehX1nLz1YXqezrcYPqFxkDqpJn","roles":["instructor"],"role_mapping":[{"role":"nulla consectetur in deserunt","device":"https://zwhUGaSJTKpCDHkMQBSesScIRgPFcawXv.pdkplKNDxrdcet10LCf3UWFD-rpJQA0PvPxRm91vTppQ.X3cVcK"}],"experiment_change_uri":"https://hfRtAMwM.rwimFRW0jzG,d,fuZPtpckqvdsgkiZhTUXU4wXW","experiment_uri":"http://xSlTWCzgHiovQVtNPLskSop.nlflb35YtpaK8DY"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_launch(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"access_token":"minim","session":{"uri":"https://UAASLLwMkIdSNpj.wqkfaWe27csDqjjyN4uoI0wBNeOxjzZQ0L3sxpp-gC7-yhXWoorWGz8fBND","resource_uri":"https://n.piehX1nLz1YXqezrcYPqFxkDqpJn","roles":["instructor"],"role_mapping":[{"role":"nulla consectetur in deserunt","device":"https://zwhUGaSJTKpCDHkMQBSesScIRgPFcawXv.pdkplKNDxrdcet10LCf3UWFD-rpJQA0PvPxRm91vTppQ.X3cVcK"}],"experiment_change_uri":"https://hfRtAMwM.rwimFRW0jzG,d,fuZPtpckqvdsgkiZhTUXU4wXW","experiment_uri":"http://xSlTWCzgHiovQVtNPLskSop.nlflb35YtpaK8DY"}}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_launch(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)


@pytest.mark.asyncio
async def test_lti_jwks(aioresponses: aioresponses):
    url = r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/jwks'
    url_variant = r'lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/jwks'
    full_url = BASE_URL+r'/lti/platform/c799cc2e-cdc5-4143-973a-6f56a5afa82c/jwks'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_jwks(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_jwks(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lti_jwks(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)


@pytest.mark.asyncio
async def test_list_resource(aioresponses: aioresponses):
    url = r'/lti/resource'
    url_variant = r'lti/resource'
    full_url = BASE_URL+r'/lti/resource'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://ZpUggNuUtsxpeyVhCiBLJJB.dfpUDy2hSlMWzNd8SHLSlkfccCSpRyTl1","students_uri":"http://XkpxusyIaaSSHox.zneBBgWNk2g41"},{"uri":"https://qNWAjtYiKlHfyhvzcCHlHiwcceNwTK.uwooy-KTb1WeArCukYb1+AGg33ooiYECAnf","students_uri":"http://DXTaVWCJDVSRuzsWKduMBvt.ueqNfJi7qkzGSCPFkH","experiment_template_uri":"http://clhhk.nsrYN5j2-OyfN9v6Dk9w+Ffe9M74dI1Gr5DdNnKjR1zwPPkRhNTuvcqbYnHyTs2AwDG42v62S"},{"uri":"http://GiPhpwfbLdvQYrWSeHoJLGrgk.lehywPqSF6HlxJFrgYz","students_uri":"https://m.zgrScQfbPnT0fvyneAsJBQAblHPpJOC,Kgy"},{"uri":"https://dKlANHMIZKWgVMhDjVUgAOxIlUpS.uuflgkOIxk6bf3TTyAjGUvaaAjMZmQNU,+y1yMzkhk-B.xcuCcra6","students_uri":"https://qOghqoJaiIFCvb.dgbsZYtzQp71ihA-3MZ,sah7Nu.n9cQL3Nz0x","experiment_template_uri":"http://zsECFohsmJvhpo.xiudZX8.soolNeHVV"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://ZpUggNuUtsxpeyVhCiBLJJB.dfpUDy2hSlMWzNd8SHLSlkfccCSpRyTl1","students_uri":"http://XkpxusyIaaSSHox.zneBBgWNk2g41"},{"uri":"https://qNWAjtYiKlHfyhvzcCHlHiwcceNwTK.uwooy-KTb1WeArCukYb1+AGg33ooiYECAnf","students_uri":"http://DXTaVWCJDVSRuzsWKduMBvt.ueqNfJi7qkzGSCPFkH","experiment_template_uri":"http://clhhk.nsrYN5j2-OyfN9v6Dk9w+Ffe9M74dI1Gr5DdNnKjR1zwPPkRhNTuvcqbYnHyTs2AwDG42v62S"},{"uri":"http://GiPhpwfbLdvQYrWSeHoJLGrgk.lehywPqSF6HlxJFrgYz","students_uri":"https://m.zgrScQfbPnT0fvyneAsJBQAblHPpJOC,Kgy"},{"uri":"https://dKlANHMIZKWgVMhDjVUgAOxIlUpS.uuflgkOIxk6bf3TTyAjGUvaaAjMZmQNU,+y1yMzkhk-B.xcuCcra6","students_uri":"https://qOghqoJaiIFCvb.dgbsZYtzQp71ihA-3MZ,sah7Nu.n9cQL3Nz0x","experiment_template_uri":"http://zsECFohsmJvhpo.xiudZX8.soolNeHVV"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://ZpUggNuUtsxpeyVhCiBLJJB.dfpUDy2hSlMWzNd8SHLSlkfccCSpRyTl1","students_uri":"http://XkpxusyIaaSSHox.zneBBgWNk2g41"},{"uri":"https://qNWAjtYiKlHfyhvzcCHlHiwcceNwTK.uwooy-KTb1WeArCukYb1+AGg33ooiYECAnf","students_uri":"http://DXTaVWCJDVSRuzsWKduMBvt.ueqNfJi7qkzGSCPFkH","experiment_template_uri":"http://clhhk.nsrYN5j2-OyfN9v6Dk9w+Ffe9M74dI1Gr5DdNnKjR1zwPPkRhNTuvcqbYnHyTs2AwDG42v62S"},{"uri":"http://GiPhpwfbLdvQYrWSeHoJLGrgk.lehywPqSF6HlxJFrgYz","students_uri":"https://m.zgrScQfbPnT0fvyneAsJBQAblHPpJOC,Kgy"},{"uri":"https://dKlANHMIZKWgVMhDjVUgAOxIlUpS.uuflgkOIxk6bf3TTyAjGUvaaAjMZmQNU,+y1yMzkhk-B.xcuCcra6","students_uri":"https://qOghqoJaiIFCvb.dgbsZYtzQp71ihA-3MZ,sah7Nu.n9cQL3Nz0x","experiment_template_uri":"http://zsECFohsmJvhpo.xiudZX8.soolNeHVV"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://ZpUggNuUtsxpeyVhCiBLJJB.dfpUDy2hSlMWzNd8SHLSlkfccCSpRyTl1","students_uri":"http://XkpxusyIaaSSHox.zneBBgWNk2g41"},{"uri":"https://qNWAjtYiKlHfyhvzcCHlHiwcceNwTK.uwooy-KTb1WeArCukYb1+AGg33ooiYECAnf","students_uri":"http://DXTaVWCJDVSRuzsWKduMBvt.ueqNfJi7qkzGSCPFkH","experiment_template_uri":"http://clhhk.nsrYN5j2-OyfN9v6Dk9w+Ffe9M74dI1Gr5DdNnKjR1zwPPkRhNTuvcqbYnHyTs2AwDG42v62S"},{"uri":"http://GiPhpwfbLdvQYrWSeHoJLGrgk.lehywPqSF6HlxJFrgYz","students_uri":"https://m.zgrScQfbPnT0fvyneAsJBQAblHPpJOC,Kgy"},{"uri":"https://dKlANHMIZKWgVMhDjVUgAOxIlUpS.uuflgkOIxk6bf3TTyAjGUvaaAjMZmQNU,+y1yMzkhk-B.xcuCcra6","students_uri":"https://qOghqoJaiIFCvb.dgbsZYtzQp71ihA-3MZ,sah7Nu.n9cQL3Nz0x","experiment_template_uri":"http://zsECFohsmJvhpo.xiudZX8.soolNeHVV"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_resource(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"http://hWOEYSCreXwQxFocRhKxvJloaIt.oxHgpJBNpI4uTAgE7yQ++VYBpok.pibIVuMTm.9Y,fyfUEW0n7xX2fvhBjNEa","students_uri":"https://WiBlta.gqHn3IGHXHFdlVxTQxPB8SOhj7KrENAyEceAkbd08Y-."}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_resource(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"http://hWOEYSCreXwQxFocRhKxvJloaIt.oxHgpJBNpI4uTAgE7yQ++VYBpok.pibIVuMTm.9Y,fyfUEW0n7xX2fvhBjNEa","students_uri":"https://WiBlta.gqHn3IGHXHFdlVxTQxPB8SOhj7KrENAyEceAkbd08Y-."}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_resource(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"http://hWOEYSCreXwQxFocRhKxvJloaIt.oxHgpJBNpI4uTAgE7yQ++VYBpok.pibIVuMTm.9Y,fyfUEW0n7xX2fvhBjNEa","students_uri":"https://WiBlta.gqHn3IGHXHFdlVxTQxPB8SOhj7KrENAyEceAkbd08Y-."}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_resource(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_resource(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_resource(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_resource(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_resource(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"http://hWOEYSCreXwQxFocRhKxvJloaIt.oxHgpJBNpI4uTAgE7yQ++VYBpok.pibIVuMTm.9Y,fyfUEW0n7xX2fvhBjNEa","students_uri":"https://WiBlta.gqHn3IGHXHFdlVxTQxPB8SOhj7KrENAyEceAkbd08Y-."}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"http://hWOEYSCreXwQxFocRhKxvJloaIt.oxHgpJBNpI4uTAgE7yQ++VYBpok.pibIVuMTm.9Y,fyfUEW0n7xX2fvhBjNEa","students_uri":"https://WiBlta.gqHn3IGHXHFdlVxTQxPB8SOhj7KrENAyEceAkbd08Y-."}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"http://hWOEYSCreXwQxFocRhKxvJloaIt.oxHgpJBNpI4uTAgE7yQ++VYBpok.pibIVuMTm.9Y,fyfUEW0n7xX2fvhBjNEa","students_uri":"https://WiBlta.gqHn3IGHXHFdlVxTQxPB8SOhj7KrENAyEceAkbd08Y-."}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_resource(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_resource(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_resource(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_resource(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_resource(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_resource(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_resource(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_list_resource_students(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://awMwPNkwQBsQUqQhpAU.ouuAd3ByZLpTx8xWpiGyfEESgsiBbH9","external_id":"laboris non dolore qui","role_mapping":[{"role":"exercitation eiusmod cillum et veniam","device":"GROUP"},{"role":"officia aliqua ea","device":"GROUP"},{"role":"ea ipsum reprehenderit","device":"GROUP"}],"name":"ut","email":"KJUeSTFKr@gqPbsRrfDuUaiMsveMFD.djh"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource_students(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://awMwPNkwQBsQUqQhpAU.ouuAd3ByZLpTx8xWpiGyfEESgsiBbH9","external_id":"laboris non dolore qui","role_mapping":[{"role":"exercitation eiusmod cillum et veniam","device":"GROUP"},{"role":"officia aliqua ea","device":"GROUP"},{"role":"ea ipsum reprehenderit","device":"GROUP"}],"name":"ut","email":"KJUeSTFKr@gqPbsRrfDuUaiMsveMFD.djh"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource_students(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://awMwPNkwQBsQUqQhpAU.ouuAd3ByZLpTx8xWpiGyfEESgsiBbH9","external_id":"laboris non dolore qui","role_mapping":[{"role":"exercitation eiusmod cillum et veniam","device":"GROUP"},{"role":"officia aliqua ea","device":"GROUP"},{"role":"ea ipsum reprehenderit","device":"GROUP"}],"name":"ut","email":"KJUeSTFKr@gqPbsRrfDuUaiMsveMFD.djh"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_resource_students(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource_students(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource_students(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_resource_students(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_resource_students(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students'

    request = json.loads(r'[{"uri":"https://yiLsZE.lbyHrhppTzzzg.cq,gEcjGu1ZhfjtKeiF69Ub2,+nt-fO1bzsh260dwo","data":{"uri":"http://uYYqgMzKVXapPOspQxDrgHj.nihexDS1h8e45jaWavpETbOK7wj+Eq","external_id":"consectetur","role_mapping":[{"role":"commodo proident in","device":"https://SVltjERWqroKdTUWC.wtK6YDEk-l7u4TpuwNPZmo7fDyP6gKz"}],"email":"rlJqiu7wixJAC@ZBaBBqgQkgNQmJwIEJOoO.wr","name":"id"}},{"uri":"http://MNCgvyjwHGbfRnVAg.aqq6bRcagGgLiBbrfXUcLE.vaFO","data":{"uri":"https://dyquuRmVhceKVhftcWwNtCbVjXyslvFIr.lsVYN1BgXOQv51s-SKIBRX0DOGeBA+.7zeAvkNK04FpA5Uwsp","external_id":"eu consequat","role_mapping":[{"role":"dolore anim eiusmod Lorem","device":"http://apHhejPmZnhdwkUKAdNbIFt.rjYsQFpx35+RKtR"}],"email":"1BxZnn@nGloZZLYEDUNlWldt.cbqu","name":"labore dolor incididunt mollit"}}]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://awMwPNkwQBsQUqQhpAU.ouuAd3ByZLpTx8xWpiGyfEESgsiBbH9","external_id":"laboris non dolore qui","role_mapping":[{"role":"exercitation eiusmod cillum et veniam","device":"GROUP"},{"role":"officia aliqua ea","device":"GROUP"},{"role":"ea ipsum reprehenderit","device":"GROUP"}],"name":"ut","email":"KJUeSTFKr@gqPbsRrfDuUaiMsveMFD.djh"}]')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource_students(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://awMwPNkwQBsQUqQhpAU.ouuAd3ByZLpTx8xWpiGyfEESgsiBbH9","external_id":"laboris non dolore qui","role_mapping":[{"role":"exercitation eiusmod cillum et veniam","device":"GROUP"},{"role":"officia aliqua ea","device":"GROUP"},{"role":"ea ipsum reprehenderit","device":"GROUP"}],"name":"ut","email":"KJUeSTFKr@gqPbsRrfDuUaiMsveMFD.djh"}]')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource_students(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"uri":"http://awMwPNkwQBsQUqQhpAU.ouuAd3ByZLpTx8xWpiGyfEESgsiBbH9","external_id":"laboris non dolore qui","role_mapping":[{"role":"exercitation eiusmod cillum et veniam","device":"GROUP"},{"role":"officia aliqua ea","device":"GROUP"},{"role":"ea ipsum reprehenderit","device":"GROUP"}],"name":"ut","email":"KJUeSTFKr@gqPbsRrfDuUaiMsveMFD.djh"}]')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource_students(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource_students(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource_students(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource_students(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_resource_student(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_resource_student(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_resource_student(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_resource_student(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_resource_student(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_resource_student(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_resource_student(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_resource_student(aioresponses: aioresponses):
    url = r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/lti/resource/c799cc2e-cdc5-4143-973a-6f56a5afa82c/students/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource_student(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource_student(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"uri":"https://VeT.enPcQCeeMcBRCP+2ZiaihiUG07stybyfoMHegzw0NOaPLQHY92Magk1GQxUYca0vYMUwbQSFVjCzY","external_id":"fugiat","role_mapping":[{"role":"nostrud","device":"GROUP"},{"role":"nulla","device":"GROUP"}],"name":"in ipsum cupidatat eiusmod tempor","email":"fZ2FB1@sVIkbtDjAVmOgSTlDERsDOtNoYklvu.tf"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_resource_student(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource_student(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource_student(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_resource_student(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_update_lti_experiment(aioresponses: aioresponses):
    url = r'/lti/session/c799cc2e-cdc5-4143-973a-6f56a5afa82c/experiment'
    url_variant = r'lti/session/c799cc2e-cdc5-4143-973a-6f56a5afa82c/experiment'
    full_url = BASE_URL+r'/lti/session/c799cc2e-cdc5-4143-973a-6f56a5afa82c/experiment'

    request = json.loads(r'{"impersonate":"http://WVWmSjaVXcayyefykFZxXlwcwg.eauGXvmp2rfcExQfpT.jVjvGD+VnPxNxbjw,YKqcKH5h72iJ4"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_lti_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_lti_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_lti_experiment(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_update_lti_experiment_callback(aioresponses: aioresponses):
    url = r'/lti/session/c799cc2e-cdc5-4143-973a-6f56a5afa82c/experiment_callback'
    url_variant = r'lti/session/c799cc2e-cdc5-4143-973a-6f56a5afa82c/experiment_callback'
    full_url = BASE_URL+r'/lti/session/c799cc2e-cdc5-4143-973a-6f56a5afa82c/experiment_callback'

    request = json.loads(r'{"callbackType":"event","eventType":"experiment-changed"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_lti_experiment_callback(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_lti_experiment_callback(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_lti_experiment_callback(url=full_url, body=request, **parameters)
