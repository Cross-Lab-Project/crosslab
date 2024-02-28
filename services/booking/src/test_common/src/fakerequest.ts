import * as nodeMocksHttp from "node-mocks-http"

type FakeRequestOptions = {
};

export function getFakeRequest(options?: FakeRequestOptions) {
    return nodeMocksHttp.createRequest();
} 