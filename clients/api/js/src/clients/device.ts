import {
    APIClient,
    SignaturesDevices,
    SignaturesPeerconnections,
    ValidationDevices,
    ValidationPeerconnections,
} from '../generated/device'
import { isErrorResponse } from '../generated/device/types'
import { UnsuccessfulRequestError } from '../types/errors'
import { appendToUrl, validateUrl } from '../util'
import { ProxyClient } from './proxy'

export class DeviceClient {
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

    // devices

    public async getDevices(
        url?: string
    ): Promise<SignaturesDevices.getDevicesSuccessResponseType> {
        url = url ?? this._url
        url = appendToUrl(url, '/devices')
        validateUrl(url, '/devices')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getDevices()
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      undefined,
                      undefined,
                      ValidationDevices.validateGetDevicesInput,
                      ValidationDevices.validateGetDevicesOutput
                  )
        ) as SignaturesDevices.getDevicesResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getDevice(
        url: string,
        flat_group?: boolean
    ): Promise<SignaturesDevices.getDevicesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/devices/{}')
        const parameters: SignaturesDevices.getDevicesByDeviceIdParametersType = {
            device_id,
            flat_group,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getDevicesByDeviceId(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationDevices.validateGetDevicesByDeviceIdInput,
                      ValidationDevices.validateGetDevicesByDeviceIdOutput
                  )
        ) as SignaturesDevices.getDevicesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createDevice(
        url: string,
        device: SignaturesDevices.postDevicesBodyType,
        changedUrl?: string
    ): Promise<SignaturesDevices.postDevicesSuccessResponseType> {
        url = appendToUrl(url, '/devices')
        validateUrl(url, '/devices')
        const parameters: SignaturesDevices.postDevicesParametersType = {
            changedUrl,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postDevices(parameters, device)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      parameters,
                      device,
                      ValidationDevices.validatePostDevicesInput,
                      ValidationDevices.validatePostDevicesOutput
                  )
        ) as SignaturesDevices.postDevicesResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createDeviceInstance(
        url: string,
        changedUrl?: string
    ): Promise<SignaturesDevices.postDevicesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/devices/{}')
        const parameters: SignaturesDevices.postDevicesByDeviceIdParametersType = {
            device_id,
            changedUrl,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postDevicesByDeviceId(parameters)
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      undefined,
                      ValidationDevices.validatePostDevicesByDeviceIdInput,
                      ValidationDevices.validatePostDevicesByDeviceIdOutput
                  )
        ) as SignaturesDevices.postDevicesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchDevice(
        url: string,
        device: SignaturesDevices.patchDevicesByDeviceIdBodyType,
        changedUrl?: string
    ): Promise<SignaturesDevices.patchDevicesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/devices/{}')
        const parameters: SignaturesDevices.patchDevicesByDeviceIdParametersType = {
            device_id,
            changedUrl,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.patchDevicesByDeviceId(parameters, device)
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      device,
                      ValidationDevices.validatePatchDevicesByDeviceIdInput,
                      ValidationDevices.validatePatchDevicesByDeviceIdOutput
                  )
        ) as SignaturesDevices.patchDevicesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deleteDevice(
        url: string
    ): Promise<SignaturesDevices.deleteDevicesByDeviceIdSuccessResponseType> {
        const [device_id] = validateUrl(url, '/devices/{}')
        const parameters: SignaturesDevices.deleteDevicesByDeviceIdParametersType = {
            device_id,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteDevicesByDeviceId(parameters)
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      undefined,
                      ValidationDevices.validateDeleteDevicesByDeviceIdInput,
                      ValidationDevices.validateDeleteDevicesByDeviceIdOutput
                  )
        ) as SignaturesDevices.deleteDevicesByDeviceIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async addAvailabilityRules(
        url: string,
        availabilityRules: SignaturesDevices.postDevicesByDeviceIdAvailabilityBodyType
    ): Promise<SignaturesDevices.postDevicesByDeviceIdAvailabilitySuccessResponseType> {
        url = appendToUrl(url, '/availability')
        const [device_id] = validateUrl(url, '/devices/{}/availability')
        const parameters: SignaturesDevices.postDevicesByDeviceIdAvailabilityParametersType =
            {
                device_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postDevicesByDeviceIdAvailability(
                      parameters,
                      availabilityRules
                  )
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      undefined,
                      ValidationDevices.validatePostDevicesByDeviceIdAvailabilityInput,
                      ValidationDevices.validatePostDevicesByDeviceIdAvailabilityOutput
                  )
        ) as SignaturesDevices.postDevicesByDeviceIdAvailabilityResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getWebsocketToken(
        url: string
    ): Promise<SignaturesDevices.postDevicesByDeviceIdWebsocketSuccessResponseType> {
        url = appendToUrl(url, '/token')
        const [device_id] = validateUrl(url, '/devices/{}/token')
        const parameters: SignaturesDevices.postDevicesByDeviceIdWebsocketParametersType = {
            device_id,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postDevicesByDeviceIdWebsocket(parameters)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      parameters,
                      undefined,
                      ValidationDevices.validatePostDevicesByDeviceIdWebsocketInput,
                      ValidationDevices.validatePostDevicesByDeviceIdWebsocketOutput
                  )
        ) as SignaturesDevices.postDevicesByDeviceIdWebsocketResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async sendSignalingMessage(
        url: string,
        peerconnection_url: string,
        signalingMessage: SignaturesDevices.postDevicesByDeviceIdSignalingBodyType
    ): Promise<SignaturesDevices.postDevicesByDeviceIdSignalingSuccessResponseType> {
        url = appendToUrl(url, '/signaling')
        const [device_id] = validateUrl(url, '/devices/{}/signaling')
        const parameters: SignaturesDevices.postDevicesByDeviceIdSignalingParametersType =
            {
                device_id,
                peerconnection_url,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postDevicesByDeviceIdSignaling(
                      parameters,
                      signalingMessage
                  )
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      parameters,
                      signalingMessage,
                      ValidationDevices.validatePostDevicesByDeviceIdSignalingInput,
                      ValidationDevices.validatePostDevicesByDeviceIdSignalingOutput
                  )
        ) as SignaturesDevices.postDevicesByDeviceIdSignalingResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // peerconnections

    public async getPeerconnections(
        url?: string
    ): Promise<SignaturesPeerconnections.getPeerconnectionsSuccessResponseType> {
        url = url ?? this._url
        url = appendToUrl(url, '/peerconnections')
        validateUrl(url, '/peerconnections')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getPeerconnections()
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      undefined,
                      undefined,
                      ValidationPeerconnections.validateGetPeerconnectionsInput,
                      ValidationPeerconnections.validateGetPeerconnectionsOutput
                  )
        ) as SignaturesPeerconnections.getPeerconnectionsResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getPeerconnection(
        url: string
    ): Promise<SignaturesPeerconnections.getPeerconnectionsByPeerconnectionIdSuccessResponseType> {
        const [peerconnection_id] = validateUrl(url, '/peerconnections/{}')
        const parameters: SignaturesPeerconnections.getPeerconnectionsByPeerconnectionIdParametersType =
            {
                peerconnection_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getPeerconnectionsByPeerconnectionId(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationPeerconnections.validateGetPeerconnectionsByPeerconnectionIdInput,
                      ValidationPeerconnections.validateGetPeerconnectionsByPeerconnectionIdOutput
                  )
        ) as SignaturesPeerconnections.getPeerconnectionsByPeerconnectionIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createPeerconnection(
        url: string,
        peerconnection: SignaturesPeerconnections.postPeerconnectionsBodyType,
        closedUrl?: string
    ): Promise<SignaturesPeerconnections.postPeerconnectionsSuccessResponseType> {
        url = appendToUrl(url, '/peerconnections')
        validateUrl(url, '/peerconnections')
        const parameters: SignaturesPeerconnections.postPeerconnectionsParametersType = {
            closedUrl,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postPeerconnections(parameters, peerconnection)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      parameters,
                      peerconnection,
                      ValidationPeerconnections.validatePostPeerconnectionsInput,
                      ValidationPeerconnections.validatePostPeerconnectionsOutput
                  )
        ) as SignaturesPeerconnections.postPeerconnectionsResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deletePeerconnection(
        url: string
    ): Promise<SignaturesPeerconnections.deletePeerconnectionsByPeerconnectionIdSuccessResponseType> {
        const [peerconnection_id] = validateUrl(url, '/peerconnections/{}')
        const parameters: SignaturesPeerconnections.getPeerconnectionsByPeerconnectionIdParametersType =
            {
                peerconnection_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deletePeerconnectionsByPeerconnectionId(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationPeerconnections.validateDeletePeerconnectionsByPeerconnectionIdInput,
                      ValidationPeerconnections.validateDeletePeerconnectionsByPeerconnectionIdOutput
                  )
        ) as SignaturesPeerconnections.deletePeerconnectionsByPeerconnectionIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
