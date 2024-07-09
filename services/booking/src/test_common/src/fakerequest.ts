import * as nodeMocksHttp from "node-mocks-http"

type FakeRequestOptions = {
    user: string
    isAuthorized: boolean
};

export function getFakeRequest(options?: FakeRequestOptions) {
    if (options === undefined) {
        options = fakeRequestDefaultConfig();
    }
    let request = nodeMocksHttp.createRequest();
    request.authorization = {};
    request.authorization.user = options.user;

    request.related = [];
    request.unrelated = [];

    request.authorization.check_authorization_or_fail = async function (action: string, id: string): Promise<void> {
        if (!options.isAuthorized) {
            throw Error("test authorization failed");
        }
    }

    request.authorization.relate = async function (user: string, action: string, id: string): Promise<boolean> {
        request.related.push([user, action, id]);
        return true;
    }

    request.authorization.unrelate = async function (user: string, action: string, id: string): Promise<boolean> {
        request.unrelated.push([user, action, id]);
        return true;
    }
    return request;
}

export function fakeRequestDefaultConfig(): FakeRequestOptions {
    return {
        user: "testuser",
        isAuthorized: true,
    };
} 