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
async def test_create_device_authentication_token(aioresponses: aioresponses):
    url = r'/device_authentication_token'
    url_variant = r'device_authentication_token'
    full_url = BASE_URL+r'/device_authentication_token'

    parameter_list = [{"device_url": "test_string", }, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device_authentication_token(**parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device_authentication_token(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device_authentication_token(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device_authentication_token(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_device_authentication_token(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_list_users(aioresponses: aioresponses):
    url = r'/users'
    url_variant = r'users'
    full_url = BASE_URL+r'/users'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_users(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
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

    request = json.loads(r'{"username":"occaecat ex exercitation proident dolore","password":"laborum"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_user(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
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
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_user(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
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

    request = json.loads(r'{"username":"tempor","password":"ad"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_user(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
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
async def test_get_roles_of_user(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_roles_of_user(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_roles_of_user(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_roles_of_user(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_roles_of_user(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_add_roles_to_user(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'

    request = json.loads(r'["enim","consequat aute Ut sit anim"]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_roles_to_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_roles_to_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_roles_to_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_roles_to_user(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_remove_roles_from_user(aioresponses: aioresponses):
    url = r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'
    url_variant = r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'
    full_url = BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles'

    request = json.loads(r'["enim","consequat aute Ut sit anim"]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.remove_roles_from_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.remove_roles_from_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.remove_roles_from_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_roles_from_user(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_list_roles(aioresponses: aioresponses):
    url = r'/roles'
    url_variant = r'roles'
    full_url = BASE_URL+r'/roles'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_roles(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_roles(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_roles(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"id":"nisi nostrud nulla sit","url":"https://aeUhNJdx.hxjnM137Xzngz--,VAiwP","name":"ipsum ullamco in","scopes":["Ut Duis","non consequat labore dolor Duis","anim elit sed nisi","Ut sunt exercitation non"]},{"name":"mollit qui enim ad Ut","id":"in ut eiusmod"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_roles(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.list_roles(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_create_role(aioresponses: aioresponses):
    url = r'/roles'
    url_variant = r'roles'
    full_url = BASE_URL+r'/roles'

    request = json.loads(r'{"name":"nulla nisi","scopes":["in amet et in","cupidatat","adipisicing ad","dolore aliqua in","Ut esse ad"]}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_role(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_role(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_role(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_role(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.create_role(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_role(aioresponses: aioresponses):
    url = r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_role(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_role(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_role(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_role(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_update_role(aioresponses: aioresponses):
    url = r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_role(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_role(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"scopes":["dolor commodo id in","ut"],"name":"commodo ad nulla nisi et"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_role(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_role(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_delete_role(aioresponses: aioresponses):
    url = r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_role(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_users_with_role(aioresponses: aioresponses):
    url = r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'
    url_variant = r'roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'
    full_url = BASE_URL+r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_users_with_role(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_users_with_role(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"url":"https://DeURFWCx.onpu.Mw7RTfb2f0l1WRLzoCO5oU","id":"enim anim","name":"non incididunt Duis pariatur minim","scopes":["anim voluptate aute Duis"]}],"url":"https://dhvskgVWHiqwVntPoDQGF.ovePGeHEMw62XGwjeRU8wlzpIq5MThVrmqRhgckA-PLHLyY,zw+oQY"},{"roles":[{"url":"http://guBFBXETlaqfTdLLERbYNLLxZfDPO.cpikrn3,,iXCReR4ttNoe-tMnW,hKH1KPFSPED.4dVYJyHO3rzehHFgRkEY5teKM06BwHocOzVHwyg,"}],"password":"elit esse aute","username":"culpa","url":"http://ulxpvZToDIljIFfbjoFuAGBWNAOtS.fqegaiBJIsMZvyhownQK8JUbyjybkXJh,jzugkWn1ynn,-Ns3FAcYzdlQsMoygSVAjcS"},{"username":"proident Ut ad reprehenderit","roles":[{"url":"http://YfHcCjfNllGG.jvkhcj3bIX7FusXR++ln7ptUnTRvS9tw"},{"name":"aliquip ullamco culpa consequat","id":"in adipisicing","url":"https://PSkjL.rbUkxB9XvO+SAZ-s5iURdPqEn88GdVFYDNTUhtH8XsdZNZFuVC"},{"url":"http://vPvLleEDIbPSRvhKNMrErekJWIK.eibvkaeIbOawfCEA4OcE8mDAn8qofAP0Vr3cpaxvhabQWVecNZOqDCz5oJ3","scopes":["veniam non ut","exercitation commodo elit","adipisicing tempor","cupidatat Ut dolor reprehenderit","reprehenderit ut ipsum et cupidatat"],"id":"velit Excepteur occaecat"}],"url":"https://GXYKIhsWipBeJUIcBNukIdJE.hvVmOk85dI5oEflv,EDD+0-eJOa2qdHKltLPwsg9GJbzaQtJhzdVuNw3KucXXHSJzZckeMPFcGv"},{"roles":[{"url":"https://zjihqqLRdlnACjMmxxukpKeC.dovQ0iw-ZmN6q8sTZyw6F0FTZSbziJGvEeIVH1GN0ttobx0vNnfyrpwTmV5TmlGc2KNvdrmx","id":"elit sint non consectetur do","name":"laborum incididunt exercitation","scopes":["fugiat aute eiusmod aliquip","in eu Lorem","voluptate incididunt dolore dolore"]},{"url":"http://fcJDGAMVZZteWEL.lrZBLoqWr,-OhEIp52w5ni6b1KGQTs.B","scopes":["id labore ut voluptate","ex magna deserunt culpa Ut","aliquip","eu adipisicing dolore aliqua reprehenderit","elit enim commodo"]}],"password":"dolore in","id":"Excepteur dolor consectetur cupidatat","url":"https://LsSgDHAqAGEtaRzEMBLYlkq.keaOZMqdQo6mUVs3RF6NaIKRDy45Edaa6bLzykKVsfHjYxnH+qEgP5HsYmgYrYeX4","username":"cupidatat nostrud esse dolore nulla"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_users_with_role(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_users_with_role(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_add_users_to_role(aioresponses: aioresponses):
    url = r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'
    url_variant = r'roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'
    full_url = BASE_URL+r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'

    request = json.loads(r'["enim","consequat aute Ut sit anim"]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_users_to_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_users_to_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_users_to_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_users_to_role(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_remove_users_from_role(aioresponses: aioresponses):
    url = r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'
    url_variant = r'roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'
    full_url = BASE_URL+r'/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c/users'

    request = json.loads(r'["enim","consequat aute Ut sit anim"]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.remove_users_from_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.remove_users_from_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.remove_users_from_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.remove_users_from_role(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_get_identity(aioresponses: aioresponses):
    url = r'/identity'
    url_variant = r'identity'
    full_url = BASE_URL+r'/identity'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_identity(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
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

    request = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_identity(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://wjhCRJVAMrw.qsvc6FSHdo,VugWBeX,e5eUtd-dX6uBD2M7ZYriEcfD+","id":"Lorem","username":"enim magna eu","password":"ut elit quis anim","roles":[{"scopes":["magna culpa dolore","ad laboris amet","laboris","deserunt ullamco eiusmod voluptate","Excepteur ipsum consequat nisi exercitation"],"url":"http://hHdqGncjesLInHvCUzWEKnM.adcCMugPEJR,2x+RQlqh,QgDtridgq","name":"irure magna sed et","id":"ipsum"},{"url":"http://DszIzhdPiXvExSMPFsYnovghHvYrW.joDZz,Yq-izLjyXwqxBdI16MCIOUT31qScyrQBgqbR","id":"deserunt est aliqua","name":"dolore consectetur commodo"}]}')
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
async def test_get_schedule(aioresponses: aioresponses):
    url = r'/schedule'
    url_variant = r'schedule'
    full_url = BASE_URL+r'/schedule'

    request = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://cHaylvBKdWJSNBxjFMsRIFtEoQDGDi.kucakbCJEWoYBT7b+w9mFqQ"}],"Description":"veniam dolore elit incididunt aliquip"},"Time":{"Start":"2013-01-14T23:45:15.0Z","End":"2009-06-17T21:25:10.0Z"},"Combined":true,"onlyOwn":true}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_schedule(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-05-28T02:28:12.0Z","End":"2011-12-30T01:38:02.0Z"},{"Start":"1985-12-18T10:09:01.0Z","End":"1978-01-18T18:32:01.0Z"}],"Free":[{"Start":"1961-12-22T19:04:41.0Z","End":"2001-11-27T06:05:08.0Z"},{"Start":"2012-02-02T16:18:57.0Z","End":"1966-03-15T22:35:31.0Z"},{"Start":"1982-08-02T04:58:59.0Z","End":"1994-05-06T05:04:50.0Z"},{"Start":"2008-12-26T17:21:24.0Z","End":"1983-12-05T17:38:55.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-11-17T05:48:45.0Z","End":"1998-12-07T01:30:34.0Z"},{"Start":"1984-09-11T04:11:16.0Z","End":"1970-10-28T01:19:38.0Z"},{"Start":"1958-04-10T07:56:51.0Z","End":"1960-07-18T04:47:46.0Z"}],"Free":[{"Start":"1982-08-29T04:12:21.0Z","End":"1968-11-30T13:07:01.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-02-25T04:35:02.0Z","End":"1959-09-10T01:34:53.0Z"}],"Free":[{"Start":"2001-04-09T22:29:19.0Z","End":"2005-06-04T08:28:39.0Z"},{"Start":"1979-01-07T05:35:26.0Z","End":"2019-06-10T21:57:56.0Z"},{"Start":"1971-01-18T04:03:03.0Z","End":"1960-05-19T05:07:48.0Z"}]},{"Device":"est et","Booked":[{"Start":"1969-01-26T21:55:52.0Z","End":"2014-09-15T10:37:51.0Z"},{"Start":"1976-11-11T14:44:42.0Z","End":"2013-12-15T19:03:32.0Z"}],"Free":[{"Start":"1963-05-16T13:25:55.0Z","End":"2011-06-21T19:03:17.0Z"},{"Start":"1944-05-29T20:44:47.0Z","End":"1962-03-04T14:52:27.0Z"},{"Start":"1977-04-02T14:22:19.0Z","End":"2011-07-11T16:07:14.0Z"}]}]')
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
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_404_dict = json.loads(r'"commodo in"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404, payload=response_404_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_422_dict = json.loads(r'"mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=422, payload=response_422_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_schedule(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_book_experiment(aioresponses: aioresponses):
    url = r'/booking'
    url_variant = r'booking'
    full_url = BASE_URL+r'/booking'

    request = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://egpZNfFBa.tvnlNGgk0v"},{"ID":"https://buBjeTLpmnTgKUztkGK.pqvsEwkiZmyNgeSImHsnvoQUf.3KIvtTb"}]},"Time":{"Start":"1947-01-15T03:43:26.0Z","End":"1952-10-14T16:17:07.0Z"},"Type":"normal"}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.book_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.book_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.book_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.book_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.book_experiment(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_update_booking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    request = json.loads(r'{}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_booking(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_booking(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"http://akJjTPgNsQCcPFMaZe.zlmvloXia0bqBjdT1Rfy3PSFGpCVkgqoAa9GgiZHg4r"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_booking(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

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
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.update_booking(url=full_url, body=request, **parameters)


@pytest.mark.asyncio
async def test_cancel_booking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.cancel_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.cancel_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.cancel_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.cancel_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_get_booking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://meMsm.xdigcAH1DeqS7KYg00WMVFvdHFi9jENfN","Time":{"Start":"2003-12-05T17:28:14.0Z","End":"1989-09-22T05:58:40.0Z"},"Devices":["https://AYKQXTFTAgMPOcXJuFVwxQmupPoOCjX.hkkyfuLSxo4lm2Iwil1QaifOIqKj2zjsJq9oZuORAi","http://enbJtSBUvWZK.dydyTKbknuYuIPvFzBhOYI82qnBEvaAxDzF,v-ZNsdk1rfaRChhXMqKKQXaKob"],"Status":"pending","You":true,"External":true,"Message":"sed sunt non enim occaecat"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_booking(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://meMsm.xdigcAH1DeqS7KYg00WMVFvdHFi9jENfN","Time":{"Start":"2003-12-05T17:28:14.0Z","End":"1989-09-22T05:58:40.0Z"},"Devices":["https://AYKQXTFTAgMPOcXJuFVwxQmupPoOCjX.hkkyfuLSxo4lm2Iwil1QaifOIqKj2zjsJq9oZuORAi","http://enbJtSBUvWZK.dydyTKbknuYuIPvFzBhOYI82qnBEvaAxDzF,v-ZNsdk1rfaRChhXMqKKQXaKob"],"Status":"pending","You":true,"External":true,"Message":"sed sunt non enim occaecat"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_booking(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://meMsm.xdigcAH1DeqS7KYg00WMVFvdHFi9jENfN","Time":{"Start":"2003-12-05T17:28:14.0Z","End":"1989-09-22T05:58:40.0Z"},"Devices":["https://AYKQXTFTAgMPOcXJuFVwxQmupPoOCjX.hkkyfuLSxo4lm2Iwil1QaifOIqKj2zjsJq9oZuORAi","http://enbJtSBUvWZK.dydyTKbknuYuIPvFzBhOYI82qnBEvaAxDzF,v-ZNsdk1rfaRChhXMqKKQXaKob"],"Status":"pending","You":true,"External":true,"Message":"sed sunt non enim occaecat"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_booking(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

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
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.get_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_delete_booking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
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
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.delete_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_lock_booking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://yoMAnxJpiGEEkJWmzKnSqBtqhCnvIdMSr.cbrqcVvPcrHoB7.QLta4DcDk.jczRQZu-TfKCushfW+nJ6G0o2G1leLXCDu3a42jPisVbqbz","Time":{"Start":"1991-10-08T01:22:07.0Z","End":"2022-11-10T18:20:43.0Z"},"Devices":["https://xqNbClEPdpHKig.dhiiSiYrU3DYITw6tF1lmUdif8O07Y.LfqivCk3JNt7iUd9J,N4eDsNZfLZ70M","https://yTxELhUrJEDpBapgc.ttgsbLDKBsuj096crVKGCv,kj,hrV-RVDFyUhRLpwvGOaInHu1ZSt1drc5","http://urgvYKPgJ.wss5xn,ZSCgIP5RqnKMw5sFSj27mwK6wfLkBSkbnpwsw2hYZFqmdh+80zT-NM"],"Status":"active","You":false,"External":true,"Message":"Lorem ipsum incididunt","Type":"normal"},"Time":{"Start":"1983-04-17T07:30:29.0Z","End":"2022-12-07T12:03:19.0Z"},"Tokens":[{"Token":"ea Duis anim"},{"Device":"https://lujjGqZNTwEvcLV.nyfEzuMfcb,byZ1.XCuvg+T","Token":"consectetur aute nisi"},{"Device":"https://kFwUbbqqJHNFECezWeTvNmjTlr.ymDXzxt7.mNmOJ7P,4rOs","Token":"cillum sunt qui Lorem dolor"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lock_booking(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://yoMAnxJpiGEEkJWmzKnSqBtqhCnvIdMSr.cbrqcVvPcrHoB7.QLta4DcDk.jczRQZu-TfKCushfW+nJ6G0o2G1leLXCDu3a42jPisVbqbz","Time":{"Start":"1991-10-08T01:22:07.0Z","End":"2022-11-10T18:20:43.0Z"},"Devices":["https://xqNbClEPdpHKig.dhiiSiYrU3DYITw6tF1lmUdif8O07Y.LfqivCk3JNt7iUd9J,N4eDsNZfLZ70M","https://yTxELhUrJEDpBapgc.ttgsbLDKBsuj096crVKGCv,kj,hrV-RVDFyUhRLpwvGOaInHu1ZSt1drc5","http://urgvYKPgJ.wss5xn,ZSCgIP5RqnKMw5sFSj27mwK6wfLkBSkbnpwsw2hYZFqmdh+80zT-NM"],"Status":"active","You":false,"External":true,"Message":"Lorem ipsum incididunt","Type":"normal"},"Time":{"Start":"1983-04-17T07:30:29.0Z","End":"2022-12-07T12:03:19.0Z"},"Tokens":[{"Token":"ea Duis anim"},{"Device":"https://lujjGqZNTwEvcLV.nyfEzuMfcb,byZ1.XCuvg+T","Token":"consectetur aute nisi"},{"Device":"https://kFwUbbqqJHNFECezWeTvNmjTlr.ymDXzxt7.mNmOJ7P,4rOs","Token":"cillum sunt qui Lorem dolor"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lock_booking(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://yoMAnxJpiGEEkJWmzKnSqBtqhCnvIdMSr.cbrqcVvPcrHoB7.QLta4DcDk.jczRQZu-TfKCushfW+nJ6G0o2G1leLXCDu3a42jPisVbqbz","Time":{"Start":"1991-10-08T01:22:07.0Z","End":"2022-11-10T18:20:43.0Z"},"Devices":["https://xqNbClEPdpHKig.dhiiSiYrU3DYITw6tF1lmUdif8O07Y.LfqivCk3JNt7iUd9J,N4eDsNZfLZ70M","https://yTxELhUrJEDpBapgc.ttgsbLDKBsuj096crVKGCv,kj,hrV-RVDFyUhRLpwvGOaInHu1ZSt1drc5","http://urgvYKPgJ.wss5xn,ZSCgIP5RqnKMw5sFSj27mwK6wfLkBSkbnpwsw2hYZFqmdh+80zT-NM"],"Status":"active","You":false,"External":true,"Message":"Lorem ipsum incididunt","Type":"normal"},"Time":{"Start":"1983-04-17T07:30:29.0Z","End":"2022-12-07T12:03:19.0Z"},"Tokens":[{"Token":"ea Duis anim"},{"Device":"https://lujjGqZNTwEvcLV.nyfEzuMfcb,byZ1.XCuvg+T","Token":"consectetur aute nisi"},{"Device":"https://kFwUbbqqJHNFECezWeTvNmjTlr.ymDXzxt7.mNmOJ7P,4rOs","Token":"cillum sunt qui Lorem dolor"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.lock_booking(url=full_url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

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
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.lock_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_unlock_booking(aioresponses: aioresponses):
    url = r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant = r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url = BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
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
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=url_variant, **parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.unlock_booking(url=full_url, **parameters)


@pytest.mark.asyncio
async def test_list_devices(aioresponses: aioresponses):
    url = r'/devices'
    url_variant = r'devices'
    full_url = BASE_URL+r'/devices'

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://CBBZavgAmnNDP.cozaaKD+VaFn-J2Ta4Dp9BeG8","type":"edge instantiable","name":"non velit minim dolore","owner":"https://RUz.umOAmQVVxIGHaSFxPN7ZkMCyH20hZFJ2xhFFyvqhjswohpHuSKDsWRPbLDobXP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://CBBZavgAmnNDP.cozaaKD+VaFn-J2Ta4Dp9BeG8","type":"edge instantiable","name":"non velit minim dolore","owner":"https://RUz.umOAmQVVxIGHaSFxPN7ZkMCyH20hZFJ2xhFFyvqhjswohpHuSKDsWRPbLDobXP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://CBBZavgAmnNDP.cozaaKD+VaFn-J2Ta4Dp9BeG8","type":"edge instantiable","name":"non velit minim dolore","owner":"https://RUz.umOAmQVVxIGHaSFxPN7ZkMCyH20hZFJ2xhFFyvqhjswohpHuSKDsWRPbLDobXP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_devices(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://CBBZavgAmnNDP.cozaaKD+VaFn-J2Ta4Dp9BeG8","type":"edge instantiable","name":"non velit minim dolore","owner":"https://RUz.umOAmQVVxIGHaSFxPN7ZkMCyH20hZFJ2xhFFyvqhjswohpHuSKDsWRPbLDobXP"}]')
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

    request = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
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
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
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

    request = json.loads(r'{"type":"edge instantiable","name":"sunt occaecat eu aliquip dolor","description":"dolor elit","codeUrl":"https://cG.onvj8"}')

    parameter_list = [{"changedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_device(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://rKemGKMlhNcfBAeYBDdlNW.ieM9N.ZnfxWisMIs34TWLplCB-AYjE6sICZDnfHOU1at","type":"group","name":"proident in anim aute veniam","owner":"https://HeFvjzydnbDafLWsZ.ixrN4oC-Om8TxgI0e.UVQRAyQNqrmskvLXxQSwdSjMZxmIrHvBPiS307XfTFjCY4..V.NUWa","devices":[{"url":"http://EERXg.nkpheF89-oujBOjoCcKDypbFgx0i"},{"url":"http://fdUnFNwDkNezzoCuEPhlYWOEvUdg.rhvBAUIwDQHkbofP-+BcBFqXBdlYPoNVsh,fx4"},{"url":"https://rY.hhvlVeTbT7OW,x1xiuZKPifCtJtDRbd4VNKiO3vRRWzabEtMoO"},{"url":"https://JXERGYXtciXGYWUmSxLRqwnekbIe.pdrQmp3KnpoCaCEYnMowadp7L9pb6m3slUHiiyUGjJY-aE5oeJyEY1m3V3"}],"description":"sint sit"}')
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
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","owner":"http://qXJqGDlmidYcvasqfsCCA.eljeTAmkIX2L2AzMelvRPbXU2YfsxCWZ,n7TfiEJDoV5cMeYV97+9gjfC","connected":false,"description":"sint","announcedAvailability":[{"end":"1963-07-05T07:30:35.0Z"},{"end":"1944-01-03T21:37:04.0Z","start":"2008-03-20T19:50:34.0Z"},{"end":"1949-11-16T11:53:26.0Z","start":"1959-09-24T01:59:32.0Z"}],"experiment":"https://hSjlrWjjdOTifzKcyxsUt.wnzgp6pqUPFhd9zE6zHT1PW-LHrPsEIuTVAlx-pza8oCKVda","services":[{"serviceType":"http://UlpUhSJkIblJFycFQKfNQ.uytgIvHKxi7VK3RVSvVkGu.8MgKITDwWuLEVTBJkV,4qA7tV6OGerfaUrZw4wcN,o","serviceId":"mollit veniam proident occaecat","serviceDirection":"prosumer"},{"serviceId":"quis ad commodo nostrud dolor","serviceDirection":"prosumer","serviceType":"http://MOaPANKswMkLZU.gayowe-SJNQJJxwE91c"},{"serviceDirection":"prosumer","serviceId":"irure dolor exercitation pariatur consectetur"},{"serviceType":"http://AgJRgzRBfjnukmtIBBFrlUlDU.galiTbGmNW-xMV4pZWb8DrVytQtTCB1cSVCL4n2l-a3OPVNlMJjDnRSf2tBLukDnnhMUGt7M9G","serviceId":"sunt tempor sed ut nulla"},{"serviceDirection":"prosumer","serviceType":"https://KyJelqOfDmRxnJPzuJBtlBq.hobIWQQ1fv9+"}]},"deviceToken":"cillum ullamco"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","owner":"http://qXJqGDlmidYcvasqfsCCA.eljeTAmkIX2L2AzMelvRPbXU2YfsxCWZ,n7TfiEJDoV5cMeYV97+9gjfC","connected":false,"description":"sint","announcedAvailability":[{"end":"1963-07-05T07:30:35.0Z"},{"end":"1944-01-03T21:37:04.0Z","start":"2008-03-20T19:50:34.0Z"},{"end":"1949-11-16T11:53:26.0Z","start":"1959-09-24T01:59:32.0Z"}],"experiment":"https://hSjlrWjjdOTifzKcyxsUt.wnzgp6pqUPFhd9zE6zHT1PW-LHrPsEIuTVAlx-pza8oCKVda","services":[{"serviceType":"http://UlpUhSJkIblJFycFQKfNQ.uytgIvHKxi7VK3RVSvVkGu.8MgKITDwWuLEVTBJkV,4qA7tV6OGerfaUrZw4wcN,o","serviceId":"mollit veniam proident occaecat","serviceDirection":"prosumer"},{"serviceId":"quis ad commodo nostrud dolor","serviceDirection":"prosumer","serviceType":"http://MOaPANKswMkLZU.gayowe-SJNQJJxwE91c"},{"serviceDirection":"prosumer","serviceId":"irure dolor exercitation pariatur consectetur"},{"serviceType":"http://AgJRgzRBfjnukmtIBBFrlUlDU.galiTbGmNW-xMV4pZWb8DrVytQtTCB1cSVCL4n2l-a3OPVNlMJjDnRSf2tBLukDnnhMUGt7M9G","serviceId":"sunt tempor sed ut nulla"},{"serviceDirection":"prosumer","serviceType":"https://KyJelqOfDmRxnJPzuJBtlBq.hobIWQQ1fv9+"}]},"deviceToken":"cillum ullamco"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.instantiate_device(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"instance":{"url":"https://CqYON.xmnuGYeEv6A,Y1Xd","type":"device","name":"fugiat labore Lorem nostrud","owner":"http://qXJqGDlmidYcvasqfsCCA.eljeTAmkIX2L2AzMelvRPbXU2YfsxCWZ,n7TfiEJDoV5cMeYV97+9gjfC","connected":false,"description":"sint","announcedAvailability":[{"end":"1963-07-05T07:30:35.0Z"},{"end":"1944-01-03T21:37:04.0Z","start":"2008-03-20T19:50:34.0Z"},{"end":"1949-11-16T11:53:26.0Z","start":"1959-09-24T01:59:32.0Z"}],"experiment":"https://hSjlrWjjdOTifzKcyxsUt.wnzgp6pqUPFhd9zE6zHT1PW-LHrPsEIuTVAlx-pza8oCKVda","services":[{"serviceType":"http://UlpUhSJkIblJFycFQKfNQ.uytgIvHKxi7VK3RVSvVkGu.8MgKITDwWuLEVTBJkV,4qA7tV6OGerfaUrZw4wcN,o","serviceId":"mollit veniam proident occaecat","serviceDirection":"prosumer"},{"serviceId":"quis ad commodo nostrud dolor","serviceDirection":"prosumer","serviceType":"http://MOaPANKswMkLZU.gayowe-SJNQJJxwE91c"},{"serviceDirection":"prosumer","serviceId":"irure dolor exercitation pariatur consectetur"},{"serviceType":"http://AgJRgzRBfjnukmtIBBFrlUlDU.galiTbGmNW-xMV4pZWb8DrVytQtTCB1cSVCL4n2l-a3OPVNlMJjDnRSf2tBLukDnnhMUGt7M9G","serviceId":"sunt tempor sed ut nulla"},{"serviceDirection":"prosumer","serviceType":"https://KyJelqOfDmRxnJPzuJBtlBq.hobIWQQ1fv9+"}]},"deviceToken":"cillum ullamco"}')
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
async def test_add_availability_rules(aioresponses: aioresponses):
    url = r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    url_variant = r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    full_url = BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'

    request = json.loads(r'[{"start":"1976-10-07T22:53:32.0Z","end":"2021-01-23T10:58:58.0Z","available":true,"repeat":{"frequency":"DAILY","count":-28462768,"until":"2022-08-07T23:17:41.0Z"}},{"repeat":{"frequency":"HOURLY"},"start":"1943-11-02T13:33:50.0Z","available":true}]')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_availability_rules(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_availability_rules(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1992-10-14T09:14:27.0Z"},{"start":"1978-02-16T19:07:22.0Z","end":"2008-06-15T01:24:43.0Z"},{"end":"1972-02-03T10:17:33.0Z"},{"start":"1973-01-02T03:15:47.0Z","end":"1987-10-14T09:42:59.0Z"},{"end":"1980-02-28T18:27:09.0Z","start":"1991-04-19T08:25:57.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.add_availability_rules(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=full_url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.add_availability_rules(url=full_url, body=request, **parameters)


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

    request = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')

    parameter_list = [{"closedUrl": "test_string", "statusChangedUrl": "test_string", }, {"statusChangedUrl": "test_string", }, {"closedUrl": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_peerconnection(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
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
        response_200_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_peerconnection(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://DELkhyRFPtjZoXBJnD.mpcH-J-JNY1XZPh","type":"webrtc","devices":[{"url":"http://ZjhlonrKlRrZfkk.cliFiylu2KXtjdx9AydImIgMsoHaqpuiwNWj3uTBNYtyoe","config":{"services":[{"serviceType":"https://SWNzRYsADEeZRcyrFQOtuscS.hiMmf5TYqhwWOKUVSmIihYgJxiBZNtkHAhW","serviceId":"deserunt nisi est","remoteServiceId":"in veniam fugiat minim commodo"},{"serviceType":"http://sLogGylMTrxCdLCTjU.oyeyhc-FDU+4wS6XsRVXXtooW8F-DWTPS","serviceId":"Duis","remoteServiceId":"irure consequat ex"},{"serviceType":"http://wbLPLVffzYINTKXmbvyjMAVYH.ujvGmBNAwITuJI89n.iLhmgn.8146VOut-xP75Idys5rN00pHkXEDlz","serviceId":"sunt quis minim aliqua veniam","remoteServiceId":"ipsum fugiat laborum"},{"serviceType":"https://BkfmvWkW.wadmo2WfhYb.IKKeUSq9lrY","serviceId":"Duis magna","remoteServiceId":"consequat ea"},{"serviceType":"https://tBrMngaVgCtVgsi.anMa0BCd.Qisg16arV","serviceId":"eu est culpa ullamco veniam","remoteServiceId":"in ut laborum anim esse"}]}},{"url":"http://iDPxrWlVcZpRStKCKyhCkpdQXu.xxvqtfx.DmAlHgtPMRok-pXizJJ3izr6w7Dk8E.dwuqUKIav2WVdmfv8,L,Cta4C1M2HAs","config":{"services":[{"serviceType":"https://XyGLXYXytmmyqWC.azti68D6mjzmwdOhFZg6XVC9BmswoCJtC-bsVCRfK4SdL8h+.wsBgobiqGZSyWyDitY3CeWP","serviceId":"dolore qui aliqua","remoteServiceId":"dolore incididunt sit Excepteur elit"},{"serviceType":"http://OF.hhvXtULjAIq2crOh-g.FntOP8iXLGUhfWCxnkRxPaWkB","serviceId":"ut","remoteServiceId":"occaecat nisi consequat"},{"serviceType":"https://PknLXTVMCtlNoGJBAfcadpdhuGu.qsaU7Y8bqud-Ly2XyFKd9xbJFkNOdkYTCgSwjta8aiQl7OGseQAwxqcLU.1iGmJW","serviceId":"eu","remoteServiceId":"ut velit consequat Ut"}]}}],"status":"closed"}')
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
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_peerconnection_device_status(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
        async with APIClient(BASE_URL) as client:
            resp = await client.patch_peerconnection_device_status(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201)
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
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(**parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.list_experiments(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{},{"status":"finished","url":"https://BhyolnlHwo.vigvwYRXrGvTctinm4bD6mAFEB,G3GjZbm3PIA7Ol+JNMUumyt0"},{"status":"finished","url":"https://gsYIkbvdZLBXqpwanqbvKdHppdZrdHY.snGgXKR.n+A6zyeKl2ZHX"},{"url":"https://oYvRCkEjCOExundq.qbzih9w3Q8CUKWCMEoNeMO79mu4r","status":"running"}]')
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

    request = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')

    parameter_list = [{}, ]

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.create_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
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
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=url, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.get_experiment(url=url_variant, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
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

    request = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')

    parameter_list = [{"changedURL": "test_string", }, {}, ]

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=full_url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=202, payload=response_202_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.update_experiment(url=url_variant, body=request, **parameters)
            assert normalize_result(resp) == normalize_result(response_202_dict)

    for parameters in parameter_list:
        response_202_dict = json.loads(r'{"serviceConfigurations":[{"serviceType":"https://IXZOfMP.rzhvMvg4iLrkdXyhDeA9H4pqmcpRj3O265bh5nvxd9FDN45pLu4K2drZRE","participants":[{"role":"culpa","serviceId":"magna mollit culpa ullamco"},{"serviceId":"sint exercitation","role":"ipsum quis eu Duis"},{"serviceId":"ut","role":"fugiat ad nisi"},{"role":"magna","serviceId":"sint labore adipisicing irure"}]},{"participants":[{"role":"id consectetur","serviceId":"et in Duis ex"},{"serviceId":"elit ex","role":"exercitation officia"},{"role":"cillum"},{"role":"enim","serviceId":"eiusmod in exercitation dolor"}],"serviceType":"http://umRRzhl.sfgzT1DQ3Tj2m2zEhAY76w9dG,4G6nky6OFWCkt8HlCEsQ"},{"serviceType":"https://otLDMGJmSIZCDLKFdMtjUIklvxIZxKUG.pghtJNv9Viw18dTP","participants":[]}],"status":"running","url":"https://OtfusAGhcySWtkDDwg.usEkzpi3QbivBEGBU4kK1fUNf8ePt1T1Ga6ZT","bookingTime":{"startTime":"2014-12-23T04:32:46.0Z"},"roles":[{"name":"in minim incididunt"},{"name":"ut deserunt","description":"amet in in"},{"description":"Ut","name":"culpa ut nulla"}]}')
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
