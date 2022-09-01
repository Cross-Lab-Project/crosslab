import { ValidationError } from '../generated/auth/types'
import { ProxyClient as _ProxyClient } from '../generated/federation/api/proxy'
import { isErrorResponse, ResponseData } from '../generated/federation/types'
import { UnsuccessfulRequestError } from '../types/errors'

export class ProxyClient {
    private _url: string
    private _accessToken: string
    private proxyClient: _ProxyClient

    constructor(url: string, accessToken?: string) {
        this._url = url.endsWith('/') ? url.slice(0, -1) : url
        this._accessToken = accessToken ?? ''
        this.proxyClient = new _ProxyClient(this._url)
        this.proxyClient.accessToken = this._accessToken
    }

    get url() {
        return this._url
    }

    set url(url: string) {
        this._url = url.endsWith('/') ? url.slice(0, -1) : url
        this.proxyClient.baseURL = this._url
    }

    set accessToken(accessToken: string) {
        this._accessToken = accessToken
        this.proxyClient.accessToken = this._accessToken
    }

    public async proxy<
        P extends { [k: string]: unknown } | undefined,
        B,
        R extends ResponseData,
        IV extends (par: P, body: B) => boolean,
        OV extends (res: ResponseData) => res is R
    >(
        method:
            | 'get'
            | 'delete'
            | 'post'
            | 'put'
            | 'patch'
            | 'trace'
            | 'options'
            | 'head',
        url: string,
        parameters: P,
        body: B,
        validateInput: IV,
        validateOutput: OV
    ): Promise<R> {
        if (!validateInput(parameters, body))
            throw new ValidationError(
                'Request validation failed!',
                (validateInput as any).errors
            )
        let response
        switch (method) {
            case 'get':
                response = await this.proxyClient.getProxy({ URL: url }, body)
                break
            case 'delete':
                response = await this.proxyClient.deleteProxy({ URL: url }, body)
                break
            case 'head':
                response = await this.proxyClient.headProxy({ URL: url }, body)
                break
            case 'options':
                response = await this.proxyClient.optionsProxy({ URL: url }, body)
                break
            case 'patch':
                response = await this.proxyClient.patchProxy({ URL: url }, body)
                break
            case 'post':
                response = await this.proxyClient.postProxy({ URL: url }, body)
                break
            case 'put':
                response = await this.proxyClient.putProxy({ URL: url }, body)
                break
            case 'trace':
                response = await this.proxyClient.traceProxy({ URL: url }, body)
                break
        }
        if (!validateOutput(response))
            throw new ValidationError(
                'Response validation failed!',
                (validateOutput as any).errors
            )

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
