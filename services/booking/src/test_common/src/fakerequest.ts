import * as nodeMocksHttp from "node-mocks-http"

type FakeRequestOptions = {
    user: string
};

export function getFakeRequest(options?: FakeRequestOptions) {
    if(options === undefined) {
        options = fakeRequestDefaultConfig();
    } 
    let request = nodeMocksHttp.createRequest();
    request.authorization = {};
    request.authorization.user = options.user;
    return request;
} 

export function fakeRequestDefaultConfig() : FakeRequestOptions {
    return{
        user: "testuser",
    };
} 