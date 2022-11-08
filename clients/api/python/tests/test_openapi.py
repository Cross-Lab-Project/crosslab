import re
import pytest
from aioresponses import aioresponses
import asyncio
import json
import datetime

from crosslab_api_client import APIClient
from crosslab_api_client.schemas import *

BASE_URL = 'https://api.example.com'

def normalize_result(_dict):
    if isinstance(_dict, dict):
        for key, value in list(_dict.items()):
            if value is None:
                del _dict[key]
            else:
                try:
                    value=value.replace('Z', '+00:00')
                    value=value.replace('.0+', '.000+')
                    value=value.replace('.00+', '.000+')
                    _dict[key]=datetime.fromisoformat(value).replace(tzinfo=None).isoformat()
                except:
                    normalize_result(value)
    elif isinstance(_dict, list):
        for v_i in _dict:
            if isinstance(v_i, dict):
                normalize_result(v_i)
    return _dict
@pytest.mark.asyncio
async def test_postLogin(aioresponses: aioresponses):
    url=r'/login'
    url_variant=r'login'
    full_url=BASE_URL+r'/login'
        
    request_dict = json.loads(r'{"username":"eiusmod consequat nulla","password":"Lorem pariatur magna","method":"local"}')
    request = post_login_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'"ipsum in reprehenderit Lorem irure"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin( body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        response_201_dict = json.loads(r'"ipsum in reprehenderit Lorem irure"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(url=url, body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"ipsum in reprehenderit Lorem irure"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(url=url_variant, body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'"ipsum in reprehenderit Lorem irure"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogin(url=full_url, body=request, **parameters)
            assert normalize_result(post_login_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postLogin( body=request, **parameters)
        
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
                resp = await client.postLogin( body=request, **parameters)
        
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
                resp = await client.postLogin( body=request, **parameters)
        
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
                resp = await client.postLogin( body=request, **parameters)
        
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
                resp = await client.postLogin( body=request, **parameters)
        
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
    url=r'/logout'
    url_variant=r'logout'
    full_url=BASE_URL+r'/logout'
        
    request_dict = json.loads(r'{"token":"in Duis"}')
    request = post_logout_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postLogout( body=request, **parameters)
        
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
                resp = await client.postLogout( body=request, **parameters)
        
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
                resp = await client.postLogout( body=request, **parameters)
        
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
                resp = await client.postLogout( body=request, **parameters)
        
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
                resp = await client.postLogout( body=request, **parameters)
        
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
                resp = await client.postLogout( body=request, **parameters)
        
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
async def test_postDeviceToken(aioresponses: aioresponses):
    url=r'/device_token'
    url_variant=r'device_token'
    full_url=BASE_URL+r'/device_token'
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(**parameters)
            assert normalize_result(post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(url=url,**parameters)
            assert normalize_result(post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(url=url_variant,**parameters)
            assert normalize_result(post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(url=full_url,**parameters)
            assert normalize_result(post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(**parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_getUsers(aioresponses: aioresponses):
    url=r'/users'
    url_variant=r'users'
    full_url=BASE_URL+r'/users'
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"name":"eu voluptate"},{"name":"officia aliqua nisi ullamco qui"}],"password":"aute","username":"anim nulla sunt nostrud et"},{"password":"in Duis esse eu in","username":"nisi","roles":[{"name":"proident laboris ullamco deserunt","scopes":["velit minim ullamco","quis cillum exercitation ex Excepteur","aute magna","mollit","pariatur qui exercitation"]},{"name":"sunt dolor anim","scopes":["consectetur mollit laboris aute","dolor","qui officia"]},{"name":"id cupidatat aliqua ut in"},{"name":"nostrud fugiat et minim","scopes":["exercitation eu","eiusmod exercitation","dolor in sunt","sunt incididunt amet","aute sunt"]},{"name":"minim laboris velit laborum","scopes":["voluptate dolor"]}]},{"username":"reprehenderit in","password":"qui laboris","roles":[{"name":"esse in id","scopes":["in aute adipisicing tempor"]},{"name":"proident officia consequat in","scopes":["aute non in irure dolor","cupidatat laboris"]},{"scopes":["exercitation occaecat qui nisi sed"],"name":"deserunt"}]},{"roles":[{"scopes":["officia qui dolore","aliqua cillum proident nulla","ad","commodo nostrud in quis ut","velit elit id"],"name":"velit"}],"username":"eu in velit Ut"},{"roles":[{"name":"ullamco","scopes":["deserunt","in dolore Excepteur et","officia tempor eiusmod","elit"]},{"name":"dolore","scopes":["exercitation minim commodo"]},{"name":"officia et dolore","scopes":["enim ex sed"]}],"password":"fugiat eiusmod adipisicing id sunt"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(**parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"name":"eu voluptate"},{"name":"officia aliqua nisi ullamco qui"}],"password":"aute","username":"anim nulla sunt nostrud et"},{"password":"in Duis esse eu in","username":"nisi","roles":[{"name":"proident laboris ullamco deserunt","scopes":["velit minim ullamco","quis cillum exercitation ex Excepteur","aute magna","mollit","pariatur qui exercitation"]},{"name":"sunt dolor anim","scopes":["consectetur mollit laboris aute","dolor","qui officia"]},{"name":"id cupidatat aliqua ut in"},{"name":"nostrud fugiat et minim","scopes":["exercitation eu","eiusmod exercitation","dolor in sunt","sunt incididunt amet","aute sunt"]},{"name":"minim laboris velit laborum","scopes":["voluptate dolor"]}]},{"username":"reprehenderit in","password":"qui laboris","roles":[{"name":"esse in id","scopes":["in aute adipisicing tempor"]},{"name":"proident officia consequat in","scopes":["aute non in irure dolor","cupidatat laboris"]},{"scopes":["exercitation occaecat qui nisi sed"],"name":"deserunt"}]},{"roles":[{"scopes":["officia qui dolore","aliqua cillum proident nulla","ad","commodo nostrud in quis ut","velit elit id"],"name":"velit"}],"username":"eu in velit Ut"},{"roles":[{"name":"ullamco","scopes":["deserunt","in dolore Excepteur et","officia tempor eiusmod","elit"]},{"name":"dolore","scopes":["exercitation minim commodo"]},{"name":"officia et dolore","scopes":["enim ex sed"]}],"password":"fugiat eiusmod adipisicing id sunt"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(url=url,**parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"name":"eu voluptate"},{"name":"officia aliqua nisi ullamco qui"}],"password":"aute","username":"anim nulla sunt nostrud et"},{"password":"in Duis esse eu in","username":"nisi","roles":[{"name":"proident laboris ullamco deserunt","scopes":["velit minim ullamco","quis cillum exercitation ex Excepteur","aute magna","mollit","pariatur qui exercitation"]},{"name":"sunt dolor anim","scopes":["consectetur mollit laboris aute","dolor","qui officia"]},{"name":"id cupidatat aliqua ut in"},{"name":"nostrud fugiat et minim","scopes":["exercitation eu","eiusmod exercitation","dolor in sunt","sunt incididunt amet","aute sunt"]},{"name":"minim laboris velit laborum","scopes":["voluptate dolor"]}]},{"username":"reprehenderit in","password":"qui laboris","roles":[{"name":"esse in id","scopes":["in aute adipisicing tempor"]},{"name":"proident officia consequat in","scopes":["aute non in irure dolor","cupidatat laboris"]},{"scopes":["exercitation occaecat qui nisi sed"],"name":"deserunt"}]},{"roles":[{"scopes":["officia qui dolore","aliqua cillum proident nulla","ad","commodo nostrud in quis ut","velit elit id"],"name":"velit"}],"username":"eu in velit Ut"},{"roles":[{"name":"ullamco","scopes":["deserunt","in dolore Excepteur et","officia tempor eiusmod","elit"]},{"name":"dolore","scopes":["exercitation minim commodo"]},{"name":"officia et dolore","scopes":["enim ex sed"]}],"password":"fugiat eiusmod adipisicing id sunt"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(url=url_variant,**parameters)
            assert normalize_result(get_users_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"roles":[{"name":"eu voluptate"},{"name":"officia aliqua nisi ullamco qui"}],"password":"aute","username":"anim nulla sunt nostrud et"},{"password":"in Duis esse eu in","username":"nisi","roles":[{"name":"proident laboris ullamco deserunt","scopes":["velit minim ullamco","quis cillum exercitation ex Excepteur","aute magna","mollit","pariatur qui exercitation"]},{"name":"sunt dolor anim","scopes":["consectetur mollit laboris aute","dolor","qui officia"]},{"name":"id cupidatat aliqua ut in"},{"name":"nostrud fugiat et minim","scopes":["exercitation eu","eiusmod exercitation","dolor in sunt","sunt incididunt amet","aute sunt"]},{"name":"minim laboris velit laborum","scopes":["voluptate dolor"]}]},{"username":"reprehenderit in","password":"qui laboris","roles":[{"name":"esse in id","scopes":["in aute adipisicing tempor"]},{"name":"proident officia consequat in","scopes":["aute non in irure dolor","cupidatat laboris"]},{"scopes":["exercitation occaecat qui nisi sed"],"name":"deserunt"}]},{"roles":[{"scopes":["officia qui dolore","aliqua cillum proident nulla","ad","commodo nostrud in quis ut","velit elit id"],"name":"velit"}],"username":"eu in velit Ut"},{"roles":[{"name":"ullamco","scopes":["deserunt","in dolore Excepteur et","officia tempor eiusmod","elit"]},{"name":"dolore","scopes":["exercitation minim commodo"]},{"name":"officia et dolore","scopes":["enim ex sed"]}],"password":"fugiat eiusmod adipisicing id sunt"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUsers(url=full_url,**parameters)
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
                resp = await client.getUsers(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUsers(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postUsers(aioresponses: aioresponses):
    url=r'/users'
    url_variant=r'users'
    full_url=BASE_URL+r'/users'
        
    request_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
    request = post_users_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers( body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(url=url, body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(url=url_variant, body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postUsers(url=full_url, body=request, **parameters)
            assert normalize_result(post_users_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postUsers( body=request, **parameters)
        
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
                resp = await client.postUsers( body=request, **parameters)
        
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
                resp = await client.postUsers( body=request, **parameters)
        
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
                resp = await client.postUsers( body=request, **parameters)
        
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
                resp = await client.postUsers( body=request, **parameters)
        
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
    url=r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUser(url=url,**parameters)
            assert normalize_result(get_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUser(url=url_variant,**parameters)
            assert normalize_result(get_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getUser(url=full_url,**parameters)
            assert normalize_result(get_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getUser(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_patchUser(aioresponses: aioresponses):
    url=r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    request_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
    request = patch_user_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUser(url=url, body=request, **parameters)
            assert normalize_result(patch_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchUser(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_user_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
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
    url=r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUser(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_putUserRoles(aioresponses: aioresponses):
    url=r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putUserRoles(url=url,**parameters)
            assert normalize_result(put_user_roles_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putUserRoles(url=url_variant,**parameters)
            assert normalize_result(put_user_roles_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putUserRoles(url=full_url,**parameters)
            assert normalize_result(put_user_roles_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putUserRoles(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_deleteUserRoles(aioresponses: aioresponses):
    url=r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/users/c799cc2e-cdc5-4143-973a-6f56a5afa82c/roles/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteUserRoles(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_getIdentity(aioresponses: aioresponses):
    url=r'/identity'
    url_variant=r'identity'
    full_url=BASE_URL+r'/identity'
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(**parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(url=url,**parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(url=url_variant,**parameters)
            assert normalize_result(get_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getIdentity(url=full_url,**parameters)
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
                resp = await client.getIdentity(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getIdentity(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_patchIdentity(aioresponses: aioresponses):
    url=r'/identity'
    url_variant=r'identity'
    full_url=BASE_URL+r'/identity'
        
    request_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
    request = patch_identity_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity( body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(url=url, body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"username":"et est anim","password":"esse cupidatat aute ea labore","roles":[{"name":"laboris incididunt irure nostrud"},{"scopes":["in qui magna","ad aliqua ullamco labore laboris","quis occaecat et esse in"]},{"name":"ullamco labore est enim eiusmod"},{"name":"dolor tempor veniam"},{"name":"magna labore officia Ut"}]}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchIdentity(url=full_url, body=request, **parameters)
            assert normalize_result(patch_identity_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchIdentity( body=request, **parameters)
        
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
                resp = await client.patchIdentity( body=request, **parameters)
        
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
                resp = await client.patchIdentity( body=request, **parameters)
        
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
                resp = await client.patchIdentity( body=request, **parameters)
        
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
                resp = await client.patchIdentity( body=request, **parameters)
        
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
    url=r'/schedule'
    url_variant=r'schedule'
    full_url=BASE_URL+r'/schedule'
        
    request_dict = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://NSrMtPi.snsspczxY5Xt.lcE1f"}],"Description":"adipisicing ea et"},"Time":{"Start":"2020-02-16T09:28:38.0Z","End":"1944-01-14T13:41:49.0Z"},"Combined":true,"onlyOwn":false}')
    request = post_schedule_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-04-22T01:32:21.0Z","End":"2011-11-23T22:42:11.0Z"},{"Start":"1985-11-12T08:13:10.0Z","End":"1977-12-13T16:36:09.0Z"}],"Free":[{"Start":"1961-11-16T17:08:50.0Z","End":"2001-10-22T04:09:17.0Z"},{"Start":"2011-12-28T14:23:06.0Z","End":"1966-02-07T20:39:40.0Z"},{"Start":"1982-06-27T03:03:08.0Z","End":"1994-03-31T03:09:01.0Z"},{"Start":"2008-11-20T15:25:34.0Z","End":"1983-10-30T15:43:04.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-10-12T03:52:54.0Z","End":"1998-10-31T23:34:43.0Z"},{"Start":"1984-08-06T02:15:25.0Z","End":"1970-09-21T22:23:48.0Z"},{"Start":"1958-03-05T06:01:01.0Z","End":"1960-06-12T02:51:56.0Z"}],"Free":[{"Start":"1982-07-24T02:16:30.0Z","End":"1968-10-25T11:11:09.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-01-20T02:39:11.0Z","End":"1959-08-04T22:39:02.0Z"}],"Free":[{"Start":"2001-03-04T20:33:28.0Z","End":"2005-04-29T06:32:49.0Z"},{"Start":"1978-12-02T03:39:36.0Z","End":"2019-05-05T20:02:06.0Z"},{"Start":"1970-12-13T02:07:13.0Z","End":"1960-04-13T03:11:57.0Z"}]},{"Device":"est et","Booked":[{"Start":"1968-12-21T20:01:01.0Z","End":"2014-08-10T08:42:01.0Z"},{"Start":"1976-10-06T12:48:51.0Z","End":"2013-11-09T17:07:42.0Z"}],"Free":[{"Start":"1963-04-10T11:30:04.0Z","End":"2011-05-16T17:07:27.0Z"},{"Start":"1944-04-23T18:48:57.0Z","End":"1962-01-27T12:56:36.0Z"},{"Start":"1977-02-25T12:26:28.0Z","End":"2011-06-05T14:11:24.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule( body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-04-22T01:32:21.0Z","End":"2011-11-23T22:42:11.0Z"},{"Start":"1985-11-12T08:13:10.0Z","End":"1977-12-13T16:36:09.0Z"}],"Free":[{"Start":"1961-11-16T17:08:50.0Z","End":"2001-10-22T04:09:17.0Z"},{"Start":"2011-12-28T14:23:06.0Z","End":"1966-02-07T20:39:40.0Z"},{"Start":"1982-06-27T03:03:08.0Z","End":"1994-03-31T03:09:01.0Z"},{"Start":"2008-11-20T15:25:34.0Z","End":"1983-10-30T15:43:04.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-10-12T03:52:54.0Z","End":"1998-10-31T23:34:43.0Z"},{"Start":"1984-08-06T02:15:25.0Z","End":"1970-09-21T22:23:48.0Z"},{"Start":"1958-03-05T06:01:01.0Z","End":"1960-06-12T02:51:56.0Z"}],"Free":[{"Start":"1982-07-24T02:16:30.0Z","End":"1968-10-25T11:11:09.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-01-20T02:39:11.0Z","End":"1959-08-04T22:39:02.0Z"}],"Free":[{"Start":"2001-03-04T20:33:28.0Z","End":"2005-04-29T06:32:49.0Z"},{"Start":"1978-12-02T03:39:36.0Z","End":"2019-05-05T20:02:06.0Z"},{"Start":"1970-12-13T02:07:13.0Z","End":"1960-04-13T03:11:57.0Z"}]},{"Device":"est et","Booked":[{"Start":"1968-12-21T20:01:01.0Z","End":"2014-08-10T08:42:01.0Z"},{"Start":"1976-10-06T12:48:51.0Z","End":"2013-11-09T17:07:42.0Z"}],"Free":[{"Start":"1963-04-10T11:30:04.0Z","End":"2011-05-16T17:07:27.0Z"},{"Start":"1944-04-23T18:48:57.0Z","End":"1962-01-27T12:56:36.0Z"},{"Start":"1977-02-25T12:26:28.0Z","End":"2011-06-05T14:11:24.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(url=url, body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-04-22T01:32:21.0Z","End":"2011-11-23T22:42:11.0Z"},{"Start":"1985-11-12T08:13:10.0Z","End":"1977-12-13T16:36:09.0Z"}],"Free":[{"Start":"1961-11-16T17:08:50.0Z","End":"2001-10-22T04:09:17.0Z"},{"Start":"2011-12-28T14:23:06.0Z","End":"1966-02-07T20:39:40.0Z"},{"Start":"1982-06-27T03:03:08.0Z","End":"1994-03-31T03:09:01.0Z"},{"Start":"2008-11-20T15:25:34.0Z","End":"1983-10-30T15:43:04.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-10-12T03:52:54.0Z","End":"1998-10-31T23:34:43.0Z"},{"Start":"1984-08-06T02:15:25.0Z","End":"1970-09-21T22:23:48.0Z"},{"Start":"1958-03-05T06:01:01.0Z","End":"1960-06-12T02:51:56.0Z"}],"Free":[{"Start":"1982-07-24T02:16:30.0Z","End":"1968-10-25T11:11:09.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-01-20T02:39:11.0Z","End":"1959-08-04T22:39:02.0Z"}],"Free":[{"Start":"2001-03-04T20:33:28.0Z","End":"2005-04-29T06:32:49.0Z"},{"Start":"1978-12-02T03:39:36.0Z","End":"2019-05-05T20:02:06.0Z"},{"Start":"1970-12-13T02:07:13.0Z","End":"1960-04-13T03:11:57.0Z"}]},{"Device":"est et","Booked":[{"Start":"1968-12-21T20:01:01.0Z","End":"2014-08-10T08:42:01.0Z"},{"Start":"1976-10-06T12:48:51.0Z","End":"2013-11-09T17:07:42.0Z"}],"Free":[{"Start":"1963-04-10T11:30:04.0Z","End":"2011-05-16T17:07:27.0Z"},{"Start":"1944-04-23T18:48:57.0Z","End":"1962-01-27T12:56:36.0Z"},{"Start":"1977-02-25T12:26:28.0Z","End":"2011-06-05T14:11:24.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(url=url_variant, body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"Device":"deserunt","Booked":[{"Start":"1948-04-22T01:32:21.0Z","End":"2011-11-23T22:42:11.0Z"},{"Start":"1985-11-12T08:13:10.0Z","End":"1977-12-13T16:36:09.0Z"}],"Free":[{"Start":"1961-11-16T17:08:50.0Z","End":"2001-10-22T04:09:17.0Z"},{"Start":"2011-12-28T14:23:06.0Z","End":"1966-02-07T20:39:40.0Z"},{"Start":"1982-06-27T03:03:08.0Z","End":"1994-03-31T03:09:01.0Z"},{"Start":"2008-11-20T15:25:34.0Z","End":"1983-10-30T15:43:04.0Z"}]},{"Device":"voluptate sed","Booked":[{"Start":"2013-10-12T03:52:54.0Z","End":"1998-10-31T23:34:43.0Z"},{"Start":"1984-08-06T02:15:25.0Z","End":"1970-09-21T22:23:48.0Z"},{"Start":"1958-03-05T06:01:01.0Z","End":"1960-06-12T02:51:56.0Z"}],"Free":[{"Start":"1982-07-24T02:16:30.0Z","End":"1968-10-25T11:11:09.0Z"}]},{"Device":"irure laboris consequat minim","Booked":[{"Start":"2010-01-20T02:39:11.0Z","End":"1959-08-04T22:39:02.0Z"}],"Free":[{"Start":"2001-03-04T20:33:28.0Z","End":"2005-04-29T06:32:49.0Z"},{"Start":"1978-12-02T03:39:36.0Z","End":"2019-05-05T20:02:06.0Z"},{"Start":"1970-12-13T02:07:13.0Z","End":"1960-04-13T03:11:57.0Z"}]},{"Device":"est et","Booked":[{"Start":"1968-12-21T20:01:01.0Z","End":"2014-08-10T08:42:01.0Z"},{"Start":"1976-10-06T12:48:51.0Z","End":"2013-11-09T17:07:42.0Z"}],"Free":[{"Start":"1963-04-10T11:30:04.0Z","End":"2011-05-16T17:07:27.0Z"},{"Start":"1944-04-23T18:48:57.0Z","End":"1962-01-27T12:56:36.0Z"},{"Start":"1977-02-25T12:26:28.0Z","End":"2011-06-05T14:11:24.0Z"}]}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postSchedule(url=full_url, body=request, **parameters)
            assert normalize_result(post_schedule_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postSchedule( body=request, **parameters)
        
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
                resp = await client.postSchedule( body=request, **parameters)
        
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
                resp = await client.postSchedule( body=request, **parameters)
        
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
                resp = await client.postSchedule( body=request, **parameters)
        
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
                resp = await client.postSchedule( body=request, **parameters)
        
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
                resp = await client.postSchedule( body=request, **parameters)
        
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
async def test_putBooking(aioresponses: aioresponses):
    url=r'/booking'
    url_variant=r'booking'
    full_url=BASE_URL+r'/booking'
        
    request_dict = json.loads(r'{"Experiment":{"Devices":[{"ID":"https://G.alDi2awByMVsEA.rsbBfOHU1k8"},{"ID":"http://qtTajnJTVSRMHFqrENyehwtEhLkgDyS.nmnvVOJm0GaNxM,bemB1q7vC3jctc3+ntv3vfE"},{"ID":"https://wRhN.gmckoLHqn6pPufEk1Cvmabb,0tkfqp054.4kQZ4x"},{"ID":"https://NGFVPXwTXDRQqZXYyKNyFWEIHlIdO.ppXOZ++-ZyU8"}],"Description":"tempor dolore pariatur"},"Time":{"Start":"2003-01-04T05:44:31.0Z","End":"1993-12-20T16:32:46.0Z"},"Type":"normal"}')
    request = put_booking_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBooking( body=request, **parameters)
            assert normalize_result(put_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBooking(url=url, body=request, **parameters)
            assert normalize_result(put_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBooking(url=url_variant, body=request, **parameters)
            assert normalize_result(put_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"BookingID":"https://zurWHxnuNekdQetiawWc.uncovYoMyvENFntDMplEsNtcFgBUP17FfZ2Wkcx1SeQnu+iggAOfJGk"}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBooking(url=full_url, body=request, **parameters)
            assert normalize_result(put_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking( body=request, **parameters)
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=full_url, body=request, **parameters)
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking( body=request, **parameters)
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ea mollit"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=full_url, body=request, **parameters)
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking( body=request, **parameters)
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBooking(url=full_url, body=request, **parameters)
        
    
@pytest.mark.asyncio
async def test_patchBooking(aioresponses: aioresponses):
    url=r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    request_dict = json.loads(r'{"Locked":true,"Devices":[{"ID":"http://k.wgaOIBHxZfiNzV7AkaVuQ1UvsgVbtXmOHr3UacIqwT3BazSLm68y1Js"},{"ID":"https://ohlnuiclAHELGBqVjSlJNnwurIJTY.dfpkNwARhVGSLnPEP8jC7LYUNTZu-+lz9F5bZHXYqjq"}]}')
    request = patch_booking_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
        
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
    url=r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBooking(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_getBooking(aioresponses: aioresponses):
    url=r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://FDC.cnpdI9xsOjELGtpz0O7qVsDdkRQX3SJWItTRDKr0tuUt17Dg65N7YeRbSRaWOo9-2hK1sflWdgj4qS","Time":{"Start":"1948-04-09T19:06:39.0Z","End":"1990-02-28T01:27:18.0Z"},"Devices":["http://SHtxsbxLo.wqIgwif1pMZUR"],"Status":"pending","You":true,"External":false,"Type":"normal"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=url,**parameters)
            assert normalize_result(get_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://FDC.cnpdI9xsOjELGtpz0O7qVsDdkRQX3SJWItTRDKr0tuUt17Dg65N7YeRbSRaWOo9-2hK1sflWdgj4qS","Time":{"Start":"1948-04-09T19:06:39.0Z","End":"1990-02-28T01:27:18.0Z"},"Devices":["http://SHtxsbxLo.wqIgwif1pMZUR"],"Status":"pending","You":true,"External":false,"Type":"normal"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=url_variant,**parameters)
            assert normalize_result(get_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"http://FDC.cnpdI9xsOjELGtpz0O7qVsDdkRQX3SJWItTRDKr0tuUt17Dg65N7YeRbSRaWOo9-2hK1sflWdgj4qS","Time":{"Start":"1948-04-09T19:06:39.0Z","End":"1990-02-28T01:27:18.0Z"},"Devices":["http://SHtxsbxLo.wqIgwif1pMZUR"],"Status":"pending","You":true,"External":false,"Type":"normal"},"Locked":false}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getBooking(url=full_url,**parameters)
            assert normalize_result(get_booking_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"elit commodo minim eu"')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getBooking(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_deleteBookingDestroy(aioresponses: aioresponses):
    url=r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    url_variant=r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
    full_url=BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/destroy'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingDestroy(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingDestroy(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingDestroy(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=423)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"ad fugiat"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingDestroy(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_putBookingLock(aioresponses: aioresponses):
    url=r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant=r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url=BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"https://ixZKvSbdm.biioWz.et4gJy0IVihY47RnSXPAViTXPvWi.7OGjZoc8oDBz33DYrUOQC2Deh05K","Time":{"Start":"2001-05-25T03:54:48.0Z","End":"1964-03-15T19:25:26.0Z"},"Devices":["http://iQlu.coiyUSQaa1VQQ1lU6Czrn8egHKyphjT3dx7TNJmfRoWEknGBa","https://bzjwdwYxE.onkB,hdWFRc9NODrtrb83rAkUwlO","http://RHJibdVfRTBTaOwu.dlhnR9Cy+zBSdztoDYZqJg6qt-fssrXvJU.cN2H57lGZZzL0Ci9S"],"Status":"active","You":false,"External":false,"Type":"normal","Message":"magna consequat"},"Time":{"Start":"1994-03-19T11:59:33.0Z","End":"1963-05-25T11:06:44.0Z"},"Tokens":[{"Device":"http://FuIsLiR.loxN7PL+eIGRDK+o6t5mM","Token":"incididunt magna"},{"Token":"dolor adipisicing","Device":"https://XYbXNArCkQWsSFsLsk.eynbg28"},{"Token":"enim ut"},{"Device":"https://GDiHyoYIsmVAdUleOt.hpyTT78X6ONoaxVhydU-s8VrmArixNq,7Z9bCVw,-iwN9,F+pFFIz+wBfERWqBDjRtmVJ+MNUTs9jGORTrYNp0uR","Token":"mollit Excepteur ea"},{"Device":"https://VGQXuvVzzHOKgNdCXoJZ.uieSE5iUp1hgpPCD4Rr8Y3ekGVaT6Sq+PdbSxg-lbp","Token":"ut ea aute ad adipisicing"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBookingLock(url=url,**parameters)
            assert normalize_result(put_booking_lock_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"https://ixZKvSbdm.biioWz.et4gJy0IVihY47RnSXPAViTXPvWi.7OGjZoc8oDBz33DYrUOQC2Deh05K","Time":{"Start":"2001-05-25T03:54:48.0Z","End":"1964-03-15T19:25:26.0Z"},"Devices":["http://iQlu.coiyUSQaa1VQQ1lU6Czrn8egHKyphjT3dx7TNJmfRoWEknGBa","https://bzjwdwYxE.onkB,hdWFRc9NODrtrb83rAkUwlO","http://RHJibdVfRTBTaOwu.dlhnR9Cy+zBSdztoDYZqJg6qt-fssrXvJU.cN2H57lGZZzL0Ci9S"],"Status":"active","You":false,"External":false,"Type":"normal","Message":"magna consequat"},"Time":{"Start":"1994-03-19T11:59:33.0Z","End":"1963-05-25T11:06:44.0Z"},"Tokens":[{"Device":"http://FuIsLiR.loxN7PL+eIGRDK+o6t5mM","Token":"incididunt magna"},{"Token":"dolor adipisicing","Device":"https://XYbXNArCkQWsSFsLsk.eynbg28"},{"Token":"enim ut"},{"Device":"https://GDiHyoYIsmVAdUleOt.hpyTT78X6ONoaxVhydU-s8VrmArixNq,7Z9bCVw,-iwN9,F+pFFIz+wBfERWqBDjRtmVJ+MNUTs9jGORTrYNp0uR","Token":"mollit Excepteur ea"},{"Device":"https://VGQXuvVzzHOKgNdCXoJZ.uieSE5iUp1hgpPCD4Rr8Y3ekGVaT6Sq+PdbSxg-lbp","Token":"ut ea aute ad adipisicing"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBookingLock(url=url_variant,**parameters)
            assert normalize_result(put_booking_lock_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"Booking":{"ID":"https://ixZKvSbdm.biioWz.et4gJy0IVihY47RnSXPAViTXPvWi.7OGjZoc8oDBz33DYrUOQC2Deh05K","Time":{"Start":"2001-05-25T03:54:48.0Z","End":"1964-03-15T19:25:26.0Z"},"Devices":["http://iQlu.coiyUSQaa1VQQ1lU6Czrn8egHKyphjT3dx7TNJmfRoWEknGBa","https://bzjwdwYxE.onkB,hdWFRc9NODrtrb83rAkUwlO","http://RHJibdVfRTBTaOwu.dlhnR9Cy+zBSdztoDYZqJg6qt-fssrXvJU.cN2H57lGZZzL0Ci9S"],"Status":"active","You":false,"External":false,"Type":"normal","Message":"magna consequat"},"Time":{"Start":"1994-03-19T11:59:33.0Z","End":"1963-05-25T11:06:44.0Z"},"Tokens":[{"Device":"http://FuIsLiR.loxN7PL+eIGRDK+o6t5mM","Token":"incididunt magna"},{"Token":"dolor adipisicing","Device":"https://XYbXNArCkQWsSFsLsk.eynbg28"},{"Token":"enim ut"},{"Device":"https://GDiHyoYIsmVAdUleOt.hpyTT78X6ONoaxVhydU-s8VrmArixNq,7Z9bCVw,-iwN9,F+pFFIz+wBfERWqBDjRtmVJ+MNUTs9jGORTrYNp0uR","Token":"mollit Excepteur ea"},{"Device":"https://VGQXuvVzzHOKgNdCXoJZ.uieSE5iUp1hgpPCD4Rr8Y3ekGVaT6Sq+PdbSxg-lbp","Token":"ut ea aute ad adipisicing"}]}')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.putBookingLock(url=full_url,**parameters)
            assert normalize_result(put_booking_lock_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"enim culpa"')
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.put(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.putBookingLock(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_deleteBookingLock(aioresponses: aioresponses):
    url=r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    url_variant=r'booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
    full_url=BASE_URL+r'/booking/c799cc2e-cdc5-4143-973a-6f56a5afa82c/lock'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteBookingLock(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postBookingCallback(aioresponses: aioresponses):
    url=r'/booking_callback/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'booking_callback/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/booking_callback/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBookingCallback(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBookingCallback(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200)
        async with APIClient(BASE_URL) as client:
            resp = await client.postBookingCallback(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=url,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=url_variant,**parameters)

    for parameters in parameter_list:
        response_500_dict = json.loads(r'"veniam ex eu"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500, payload=response_500_dict)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=503)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postBookingCallback(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_getDevices(aioresponses: aioresponses):
    url=r'/devices'
    url_variant=r'devices'
    full_url=BASE_URL+r'/devices'
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"eu","url":"http://JAxoeSTxWfcXDLEcZvEMhqaZgBJffW.ldugkiV+OTZ8qBl4vb52p7AVgbAVY--RV0OZE1pgrTabodsypoRIRlGQYD-iO","name":"consequat dolore labore"},{"name":"sit ex et anim ut","owner":"http://ipFbHctKJEyJYjGRbYNwzDvnNTmGaYQp.spuqmsWyBmUF4oDiraWs+MaBi+hYRcv6lYeXQYb-,shHRNl8hFoFpe6llBPe7yXL0VKtld0q","type":"group","description":"commodo"},{"description":"deserunt quis","url":"https://tTIKJuMliPmiYFBXhkkOZtn.xrK2wkwiejJN-bJ8UYQVi-YxE5KTaBCD7F","name":"non deserunt ut","owner":"https://sPWmQPpTwqexIKPLxXJP.vdaSH28M,SI0GUdLMinkx.epHWJxxjm6Q9"},{"url":"https://xkYQt.reCVJ0SUgxtM2Gbjvz51frsTHKzNthnKVQf9V1mDQcgCUP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(**parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"eu","url":"http://JAxoeSTxWfcXDLEcZvEMhqaZgBJffW.ldugkiV+OTZ8qBl4vb52p7AVgbAVY--RV0OZE1pgrTabodsypoRIRlGQYD-iO","name":"consequat dolore labore"},{"name":"sit ex et anim ut","owner":"http://ipFbHctKJEyJYjGRbYNwzDvnNTmGaYQp.spuqmsWyBmUF4oDiraWs+MaBi+hYRcv6lYeXQYb-,shHRNl8hFoFpe6llBPe7yXL0VKtld0q","type":"group","description":"commodo"},{"description":"deserunt quis","url":"https://tTIKJuMliPmiYFBXhkkOZtn.xrK2wkwiejJN-bJ8UYQVi-YxE5KTaBCD7F","name":"non deserunt ut","owner":"https://sPWmQPpTwqexIKPLxXJP.vdaSH28M,SI0GUdLMinkx.epHWJxxjm6Q9"},{"url":"https://xkYQt.reCVJ0SUgxtM2Gbjvz51frsTHKzNthnKVQf9V1mDQcgCUP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(url=url,**parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"eu","url":"http://JAxoeSTxWfcXDLEcZvEMhqaZgBJffW.ldugkiV+OTZ8qBl4vb52p7AVgbAVY--RV0OZE1pgrTabodsypoRIRlGQYD-iO","name":"consequat dolore labore"},{"name":"sit ex et anim ut","owner":"http://ipFbHctKJEyJYjGRbYNwzDvnNTmGaYQp.spuqmsWyBmUF4oDiraWs+MaBi+hYRcv6lYeXQYb-,shHRNl8hFoFpe6llBPe7yXL0VKtld0q","type":"group","description":"commodo"},{"description":"deserunt quis","url":"https://tTIKJuMliPmiYFBXhkkOZtn.xrK2wkwiejJN-bJ8UYQVi-YxE5KTaBCD7F","name":"non deserunt ut","owner":"https://sPWmQPpTwqexIKPLxXJP.vdaSH28M,SI0GUdLMinkx.epHWJxxjm6Q9"},{"url":"https://xkYQt.reCVJ0SUgxtM2Gbjvz51frsTHKzNthnKVQf9V1mDQcgCUP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(url=url_variant,**parameters)
            assert normalize_result(get_devices_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"description":"eu","url":"http://JAxoeSTxWfcXDLEcZvEMhqaZgBJffW.ldugkiV+OTZ8qBl4vb52p7AVgbAVY--RV0OZE1pgrTabodsypoRIRlGQYD-iO","name":"consequat dolore labore"},{"name":"sit ex et anim ut","owner":"http://ipFbHctKJEyJYjGRbYNwzDvnNTmGaYQp.spuqmsWyBmUF4oDiraWs+MaBi+hYRcv6lYeXQYb-,shHRNl8hFoFpe6llBPe7yXL0VKtld0q","type":"group","description":"commodo"},{"description":"deserunt quis","url":"https://tTIKJuMliPmiYFBXhkkOZtn.xrK2wkwiejJN-bJ8UYQVi-YxE5KTaBCD7F","name":"non deserunt ut","owner":"https://sPWmQPpTwqexIKPLxXJP.vdaSH28M,SI0GUdLMinkx.epHWJxxjm6Q9"},{"url":"https://xkYQt.reCVJ0SUgxtM2Gbjvz51frsTHKzNthnKVQf9V1mDQcgCUP"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevices(url=full_url,**parameters)
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
                resp = await client.getDevices(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevices(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postDevices(aioresponses: aioresponses):
    url=r'/devices'
    url_variant=r'devices'
    full_url=BASE_URL+r'/devices'
        
    request_dict = json.loads(r'{"description":"sit elit Excepteur","owner":"http://RdjxBJAYltUMscOzVXnyLCvWSNiXlf.uohhsztEoiAeH-zWLVOyEPMY7","devices":[{"url":"http://QCXPlBjDffIubQQQFbNCPBnAxz.vjxsps2W+2N75PapFAWHczM33MvxfLC8N.s1-DfNEyWl96+"}],"type":"group","name":"dolor","url":"http://sKwRubOGKdyTmCPsnlKkwrwrnyxbG.iefkja.IV8HsrN1D9Aea320na3TmDR3G.ZT0Tc.DQO.Yd3aLH"}')
    request = post_devices_request_body_from_dict(request_dict)
        
    parameter_list=[{"changedUrl" : "test_string"},{},]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices( body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(url=url, body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(url=url_variant, body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevices(url=full_url, body=request, **parameters)
            assert normalize_result(post_devices_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevices( body=request, **parameters)
        
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
                resp = await client.postDevices( body=request, **parameters)
        
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
                resp = await client.postDevices( body=request, **parameters)
        
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
                resp = await client.postDevices( body=request, **parameters)
        
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
                resp = await client.postDevices( body=request, **parameters)
        
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
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{"flat_group" : True},{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevice(url=url,**parameters)
            assert normalize_result(get_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevice(url=url_variant,**parameters)
            assert normalize_result(get_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getDevice(url=full_url,**parameters)
            assert normalize_result(get_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getDevice(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_patchDevice(aioresponses: aioresponses):
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    request_dict = json.loads(r'{"description":"sit elit Excepteur","owner":"http://RdjxBJAYltUMscOzVXnyLCvWSNiXlf.uohhsztEoiAeH-zWLVOyEPMY7","devices":[{"url":"http://QCXPlBjDffIubQQQFbNCPBnAxz.vjxsps2W+2N75PapFAWHczM33MvxfLC8N.s1-DfNEyWl96+"}],"type":"group","name":"dolor","url":"http://sKwRubOGKdyTmCPsnlKkwrwrnyxbG.iefkja.IV8HsrN1D9Aea320na3TmDR3G.ZT0Tc.DQO.Yd3aLH"}')
    request = patch_device_request_body_from_dict(request_dict)
        
    parameter_list=[{"changedUrl" : "test_string"},{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchDevice(url=url, body=request, **parameters)
            assert normalize_result(patch_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchDevice(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_device_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"type":"virtual","description":"incididunt nulla dolore","url":"http://MjaSFMpxwbPd.msmtqkK5Y,3mmEYSqqUlOs-lnxLUVqPU4N,,MN.Y.Cf9wUJhUEtrQ+hYh3DfKtHD1aDNykAt4kzK7"}')
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
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteDevice(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postDevice(aioresponses: aioresponses):
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{"changedUrl" : "test_string"},{},]
        
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://HoSQrPpYqsu.wfpsZ4Hy,GjWxt33NyCz1AsjLk3ZdRnqMYlc","owner":"http://QjRDsgVxkSiEGCiQPrQjZLpQfzGBN.yewAOP+ZtILjy1VChJo7KDNICLew"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevice(url=url,**parameters)
            assert normalize_result(post_device_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://HoSQrPpYqsu.wfpsZ4Hy,GjWxt33NyCz1AsjLk3ZdRnqMYlc","owner":"http://QjRDsgVxkSiEGCiQPrQjZLpQfzGBN.yewAOP+ZtILjy1VChJo7KDNICLew"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevice(url=url_variant,**parameters)
            assert normalize_result(post_device_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://HoSQrPpYqsu.wfpsZ4Hy,GjWxt33NyCz1AsjLk3ZdRnqMYlc","owner":"http://QjRDsgVxkSiEGCiQPrQjZLpQfzGBN.yewAOP+ZtILjy1VChJo7KDNICLew"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDevice(url=full_url,**parameters)
            assert normalize_result(post_device_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDevice(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postDeviceAvailability(aioresponses: aioresponses):
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/availability'
        
    request_dict = json.loads(r'[{},{"available":true,"end":"2011-02-10T06:23:38.0Z","start":"1954-07-07T03:53:24.0Z","repeat":{"frequency":"DAILY","until":"1950-09-07T15:42:19.0Z","count":90799529}},{"repeat":{"frequency":"YEARLY","until":"1944-10-30T16:50:47.0Z"}},{"available":true},{"end":"1969-12-10T21:32:34.0Z","repeat":{},"start":"1956-04-03T08:21:31.0Z","available":false}]')
    request = post_device_availability_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1975-06-01T05:08:22.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAvailability(url=url, body=request, **parameters)
            assert normalize_result(post_device_availability_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1975-06-01T05:08:22.0Z"}]')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceAvailability(url=url_variant, body=request, **parameters)
            assert normalize_result(post_device_availability_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"end":"1975-06-01T05:08:22.0Z"}]')
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
async def test_postDeviceToken(aioresponses: aioresponses):
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/token'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/token'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/token'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(url=url,**parameters)
            assert normalize_result(purple_post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(url=url_variant,**parameters)
            assert normalize_result(purple_post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'"consectetur in do nisi"')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postDeviceToken(url=full_url,**parameters)
            assert normalize_result(purple_post_device_token_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postDeviceToken(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postDeviceSignaling(aioresponses: aioresponses):
    url=r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
    url_variant=r'devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
    full_url=BASE_URL+r'/devices/c799cc2e-cdc5-4143-973a-6f56a5afa82c/signaling'
        
    request_dict = json.loads(r'{"messageType":"command","command":"closePeerconnection","connectionUrl":"https://vOfGfVTlmdWHxXLUuslL.nezhCAz3qUrW31jAPyY3yDCGnstAYiwmNTfxCHygttznaa7fcB"}')
    request = post_device_signaling_request_body_from_dict(request_dict)
        
    parameter_list=[{"peerconnection_url" : "test_string"},]
        
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
    url=r'/peerconnections'
    url_variant=r'peerconnections'
    full_url=BASE_URL+r'/peerconnections'
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://jUWWNUsVZ.jzvuAgeD-.h75mYaY8nXpCJlH7hbzjkgQLh4IYzbkaqZRBRYRLaUr77fFOQd7nm.k"},{"url":"http://YdPuVHGLzYKSClDv.zmbN5IF.uoIG5kuy"},{"url":"https://mTOwD.luyxW"},{"url":"https://WKc.bdcr2yNR-q7kaGY,pHlZHleDvT,ZLx1"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(**parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://jUWWNUsVZ.jzvuAgeD-.h75mYaY8nXpCJlH7hbzjkgQLh4IYzbkaqZRBRYRLaUr77fFOQd7nm.k"},{"url":"http://YdPuVHGLzYKSClDv.zmbN5IF.uoIG5kuy"},{"url":"https://mTOwD.luyxW"},{"url":"https://WKc.bdcr2yNR-q7kaGY,pHlZHleDvT,ZLx1"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(url=url,**parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://jUWWNUsVZ.jzvuAgeD-.h75mYaY8nXpCJlH7hbzjkgQLh4IYzbkaqZRBRYRLaUr77fFOQd7nm.k"},{"url":"http://YdPuVHGLzYKSClDv.zmbN5IF.uoIG5kuy"},{"url":"https://mTOwD.luyxW"},{"url":"https://WKc.bdcr2yNR-q7kaGY,pHlZHleDvT,ZLx1"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(url=url_variant,**parameters)
            assert normalize_result(get_peerconnections_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://jUWWNUsVZ.jzvuAgeD-.h75mYaY8nXpCJlH7hbzjkgQLh4IYzbkaqZRBRYRLaUr77fFOQd7nm.k"},{"url":"http://YdPuVHGLzYKSClDv.zmbN5IF.uoIG5kuy"},{"url":"https://mTOwD.luyxW"},{"url":"https://WKc.bdcr2yNR-q7kaGY,pHlZHleDvT,ZLx1"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnections(url=full_url,**parameters)
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
                resp = await client.getPeerconnections(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnections(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postPeerconnections(aioresponses: aioresponses):
    url=r'/peerconnections'
    url_variant=r'peerconnections'
    full_url=BASE_URL+r'/peerconnections'
        
    request_dict = json.loads(r'{}')
    request = post_peerconnections_request_body_from_dict(request_dict)
        
    parameter_list=[{"closedUrl" : "test_string"},{},]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections( body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=url, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=url_variant, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postPeerconnections(url=full_url, body=request, **parameters)
            assert normalize_result(post_peerconnections_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postPeerconnections( body=request, **parameters)
        
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
                resp = await client.postPeerconnections( body=request, **parameters)
        
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
                resp = await client.postPeerconnections( body=request, **parameters)
        
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
                resp = await client.postPeerconnections( body=request, **parameters)
        
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
                resp = await client.postPeerconnections( body=request, **parameters)
        
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
    url=r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnection(url=url,**parameters)
            assert normalize_result(get_peerconnection_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnection(url=url_variant,**parameters)
            assert normalize_result(get_peerconnection_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getPeerconnection(url=full_url,**parameters)
            assert normalize_result(get_peerconnection_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getPeerconnection(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_deletePeerconnection(aioresponses: aioresponses):
    url=r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/peerconnections/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deletePeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deletePeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deletePeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deletePeerconnection(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_getExperiments(aioresponses: aioresponses):
    url=r'/experiments'
    url_variant=r'experiments'
    full_url=BASE_URL+r'/experiments'
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://eM.mqAk7,vc4jBn6B3auRtx","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(**parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://eM.mqAk7,vc4jBn6B3auRtx","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(url=url,**parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://eM.mqAk7,vc4jBn6B3auRtx","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(url=url_variant,**parameters)
            assert normalize_result(get_experiments_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'[{"url":"https://eM.mqAk7,vc4jBn6B3auRtx","status":"created"}]')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiments(url=full_url,**parameters)
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
                resp = await client.getExperiments(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url,**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(**parameters)
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiments(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_postExperiments(aioresponses: aioresponses):
    url=r'/experiments'
    url_variant=r'experiments'
    full_url=BASE_URL+r'/experiments'
        
    request_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
    request = post_experiments_request_body_from_dict(request_dict)
        
    parameter_list=[{},]
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments( body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=url, body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=url_variant, body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)

    for parameters in parameter_list:
        response_201_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=201, payload=response_201_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.postExperiments(url=full_url, body=request, **parameters)
            assert normalize_result(post_experiments_response_body201_to_dict(resp)) == normalize_result(response_201_dict)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments( body=request, **parameters)
        
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
                resp = await client.postExperiments( body=request, **parameters)
        
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
                resp = await client.postExperiments( body=request, **parameters)
        
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
                resp = await client.postExperiments( body=request, **parameters)
        
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
                resp = await client.postExperiments( body=request, **parameters)
        
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
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments( body=request, **parameters)
        
    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.post(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.postExperiments(url=full_url, body=request, **parameters)
        
    
@pytest.mark.asyncio
async def test_getExperiment(aioresponses: aioresponses):
    url=r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiment(url=url,**parameters)
            assert normalize_result(get_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiment(url=url_variant,**parameters)
            assert normalize_result(get_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.getExperiment(url=full_url,**parameters)
            assert normalize_result(get_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.get(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.getExperiment(url=full_url,**parameters)
        
    
@pytest.mark.asyncio
async def test_patchExperiment(aioresponses: aioresponses):
    url=r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    request_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
    request = patch_experiment_request_body_from_dict(request_dict)
        
    parameter_list=[{"changedURL" : "test_string"},{},]
        
    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=url, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=url_variant, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)

    for parameters in parameter_list:
        response_200_dict = json.loads(r'{"url":"https://CBB.rmmYUi","connections":["https://RYVhl.ggeeWzBRuejKvOxxjLkVBZPF","https://PUJhHaZiZdQzZWpzpr.jkpjta1XjJZa,KpO-NUAwI.3AqL03ZQ+TfSRB.8gnw+l9XLNL8KG"],"serviceConfigurations":[{"serviceType":"http://fLeKcQxrsSU.lux6C7WLj1TxksG1lw5KxRJvoRn4X5pRJiR0woJLsymLCzgwtEGTXDiqpq4PrBD"},{"serviceType":"http://AvnvbgB.wfatNRJHsHhRcvexwTVMXyjn","participants":[{"role":"sed","serviceId":"id occaecat"},{"serviceId":"sint consequat nostrud voluptate amet","role":"ut anim non quis"},{"role":"dolore minim non"},{"role":"dolore Duis officia aliqua do","serviceId":"aute proident consectetur"},{"role":"culpa in ullamco do","serviceId":"Excepteur in magna"}]}],"roles":[{"name":"ipsum fugiat sed magna","description":"ullamco officia occaecat voluptate"},{"description":"labore sunt dolore nisi","name":"incididunt"}],"bookingTime":{"startTime":"1994-07-05T04:13:21.0Z"},"devices":[{"device":"http://QncGhEOiEgWsDFGYwmjDPPSdG.hypxsoEFzmo.dVNxA2UQgrTGuAPy7d4y"},{"device":"http://L.ksfCqLtRqlUrZ+cw","role":"incididunt reprehenderit"},{"device":"https://MiQMgDIAJLwuiKsuxfhpBifsJ.gufOiGC6mxO6yFGQRJPBnmGFEA1T9MlrnKQ3P7fqrKcS2"}],"status":"running"}')
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=200, payload=response_200_dict)
        async with APIClient(BASE_URL) as client:
            resp = await client.patchExperiment(url=full_url, body=request, **parameters)
            assert normalize_result(patch_experiment_response_body200_to_dict(resp)) == normalize_result(response_200_dict)
        
        
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
        
        
    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=url_variant, body=request, **parameters)

    for parameters in parameter_list:
        aioresponses.patch(re.compile(re.escape(full_url)+r'(\?.*)?'), status=502)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.patchExperiment(url=full_url, body=request, **parameters)
        
    
@pytest.mark.asyncio
async def test_deleteExperiment(aioresponses: aioresponses):
    url=r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    url_variant=r'experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
    full_url=BASE_URL+r'/experiments/c799cc2e-cdc5-4143-973a-6f56a5afa82c'
        
    parameter_list=[{},]
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=204)
        async with APIClient(BASE_URL) as client:
            resp = await client.deleteExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=400)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=401)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=403)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=404)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url,**parameters)
        
        
    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=url_variant,**parameters)

    for parameters in parameter_list:
        aioresponses.delete(re.compile(re.escape(full_url)+r'(\?.*)?'), status=500)
        async with APIClient(BASE_URL) as client:
            with pytest.raises(Exception):
                resp = await client.deleteExperiment(url=full_url,**parameters)
        
    