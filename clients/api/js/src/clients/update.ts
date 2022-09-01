import { APIClient, SignaturesUpdates, ValidationUpdates } from '../generated/update'
import { isErrorResponse } from '../generated/update/types'
import { UnsuccessfulRequestError } from '../types/errors'
import { appendToUrl, validateUrl } from '../util'
import { ProxyClient } from './proxy'

export class UpdateClient {
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
        this.apiClient.accessToken = this._accessToken
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
        this.apiClient.accessToken = this._accessToken
    }

    public async getUpdates(
        url?: string
    ): Promise<SignaturesUpdates.getUpdatesSuccessResponseType> {
        url = url ?? this._url
        url = appendToUrl(url, '/updates')
        validateUrl(url, '/updates')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getUpdates()
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      undefined,
                      undefined,
                      ValidationUpdates.validateGetUpdatesInput,
                      ValidationUpdates.validateGetUpdatesOutput
                  )
        ) as SignaturesUpdates.getUpdatesResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getUpdate(
        url: string,
        current_version?: string
    ): Promise<SignaturesUpdates.getUpdatesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/updates/{}')
        const parameters: SignaturesUpdates.getUpdatesByDeviceIdParametersType = {
            device_id,
            current_version,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getUpdatesByDeviceId(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationUpdates.validateGetUpdatesByDeviceIdInput,
                      ValidationUpdates.validateGetUpdatesByDeviceIdOutput
                  )
        ) as SignaturesUpdates.getUpdatesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createUpdate(
        url: string,
        update: SignaturesUpdates.postUpdatesBodyType
    ): Promise<SignaturesUpdates.postUpdatesSuccessResponseType> {
        url = appendToUrl(url, '/updates')
        validateUrl(url, '/updates')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postUpdates(update)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      undefined,
                      update,
                      ValidationUpdates.validatePostUpdatesInput,
                      ValidationUpdates.validatePostUpdatesOutput
                  )
        ) as SignaturesUpdates.postUpdatesResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchUpdate(
        url: string,
        update: SignaturesUpdates.patchUpdatesByDeviceIdBodyType
    ): Promise<SignaturesUpdates.patchUpdatesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/updates/{}')
        const parameters: SignaturesUpdates.patchUpdatesByDeviceIdParametersType = {
            device_id,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.patchUpdatesByDeviceId(parameters, update)
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      update,
                      ValidationUpdates.validatePatchUpdatesByDeviceIdInput,
                      ValidationUpdates.validatePatchUpdatesByDeviceIdOutput
                  )
        ) as SignaturesUpdates.patchUpdatesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deleteUpdate(
        url: string
    ): Promise<SignaturesUpdates.deleteUpdatesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/updates/{}')
        const parameters: SignaturesUpdates.deleteUpdatesByDeviceIdParametersType = {
            device_id,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteUpdatesByDeviceId(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationUpdates.validateDeleteUpdatesByDeviceIdInput,
                      ValidationUpdates.validateDeleteUpdatesByDeviceIdOutput
                  )
        ) as SignaturesUpdates.deleteUpdatesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
