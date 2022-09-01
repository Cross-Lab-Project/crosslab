import { APIClient } from '../generated/booking'
import { ProxyClient } from './proxy'

export class BookingClient {
    private _url: string
    private _accessToken: string
    private proxyClient: ProxyClient
    private apiClient: APIClient

    constructor(url: string, accessToken?: string) {
        this._url = url.endsWith('/') ? url.slice(0, -1) : url
        this._accessToken = accessToken ?? ''
        this.proxyClient = new ProxyClient(this._url)
        this.apiClient = new APIClient(this._url)
        this.proxyClient.accessToken = this._accessToken
        // this.apiClient.accessToken = this._accessToken
    }

    get url() {
        return this._url
    }

    set url(url: string) {
        this._url = url.endsWith('/') ? url.slice(0, -1) : url
        this.proxyClient.url = this._url
        this.apiClient.baseURL = this._url
    }

    set accessToken(accessToken: string) {
        this._accessToken = accessToken
        this.proxyClient.accessToken = this._accessToken
        // this.apiClient.accessToken = this._accessToken
    }
}
