import {
    APIClient,
    SignaturesBooking,
    SignaturesSchedule,
    ValidationBooking,
    ValidationSchedule,
} from '../generated/booking'
import { isErrorResponse } from '../generated/booking/types'
import { UnsuccessfulRequestError } from '../types/errors'
import { appendToUrl, validateUrl } from '../util'
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

    // schedule-service

    public async getSchedule(
        url: string,
        experiment: SignaturesSchedule.postScheduleBodyType
    ): Promise<SignaturesSchedule.postScheduleSuccessResponseType> {
        url = appendToUrl(url, '/schedule')
        validateUrl(url, '/schedule')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postSchedule(experiment)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      undefined,
                      experiment,
                      ValidationSchedule.validatePostScheduleInput,
                      ValidationSchedule.validatePostScheduleOutput
                  )
        ) as SignaturesSchedule.postScheduleResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // booking-frontend

    public async bookExperiment(
        url: string,
        experiment: SignaturesBooking.putBookingBodyType
    ): Promise<SignaturesBooking.putBookingSuccessResponseType> {
        url = appendToUrl(url, '/booking')
        validateUrl(url, '/booking')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.putBooking(experiment)
                : await this.proxyClient.proxy(
                      'put',
                      url,
                      undefined,
                      experiment,
                      ValidationBooking.validatePutBookingInput,
                      ValidationBooking.validatePutBookingOutput
                  )
        ) as SignaturesBooking.putBookingResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getBooking(
        url: string
    ): Promise<SignaturesBooking.getBookingByIDSuccessResponseType> {
        const [ID] = validateUrl(url, '/booking/{}')
        const parameters: SignaturesBooking.getBookingByIDParametersType = {
            ID,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getBookingByID(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationBooking.validateGetBookingByIDInput,
                      ValidationBooking.validateGetBookingByIDOutput
                  )
        ) as SignaturesBooking.getBookingByIDResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async cancelBooking(
        url: string
    ): Promise<SignaturesBooking.deleteBookingByIDSuccessResponseType> {
        const [ID] = validateUrl(url, '/booking/{}')
        const parameters: SignaturesBooking.deleteBookingByIDParametersType = {
            ID,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteBookingByID(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationBooking.validateDeleteBookingByIDInput,
                      ValidationBooking.validateDeleteBookingByIDOutput
                  )
        ) as SignaturesBooking.deleteBookingByIDResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchBooking(
        url: string,
        devices: SignaturesBooking.patchBookingByIDBodyType
    ): Promise<SignaturesBooking.patchBookingByIDSuccessResponseType> {
        const [ID] = validateUrl(url, '/booking/{}')
        const parameters: SignaturesBooking.patchBookingByIDParametersType = {
            ID,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.patchBookingByID(parameters, devices)
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      devices,
                      ValidationBooking.validatePatchBookingByIDInput,
                      ValidationBooking.validatePatchBookingByIDOutput
                  )
        ) as SignaturesBooking.patchBookingByIDResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deleteBooking(
        url: string
    ): Promise<SignaturesBooking.deleteBookingByIDDestroySuccessResponseType> {
        url = appendToUrl(url, '/destroy')
        const [ID] = validateUrl(url, '/booking/{}/destroy')
        const parameters: SignaturesBooking.deleteBookingByIDDestroyParametersType = {
            ID,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteBookingByIDDestroy(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationBooking.validateDeleteBookingByIDDestroyInput,
                      ValidationBooking.validateDeleteBookingByIDDestroyOutput
                  )
        ) as SignaturesBooking.deleteBookingByIDDestroyResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // booking-backend

    public async lockBooking(
        url: string
    ): Promise<SignaturesBooking.putBookingByIDLockSuccessResponseType> {
        url = appendToUrl(url, '/lock')
        const [ID] = validateUrl(url, '/booking/{}/lock')
        const parameters: SignaturesBooking.putBookingByIDLockParametersType = {
            ID,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getBookingByID(parameters)
                : await this.proxyClient.proxy(
                      'put',
                      url,
                      parameters,
                      undefined,
                      ValidationBooking.validatePutBookingByIDLockInput,
                      ValidationBooking.validatePutBookingByIDLockOutput
                  )
        ) as SignaturesBooking.putBookingByIDLockResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async unlockBooking(
        url: string
    ): Promise<SignaturesBooking.deleteBookingByIDLockSuccessResponseType> {
        url = appendToUrl(url, '/lock')
        const [ID] = validateUrl(url, '/booking/{}/lock')
        const parameters: SignaturesBooking.deleteBookingByIDLockParametersType = {
            ID,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteBookingByIDLock(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationBooking.validateDeleteBookingByIDLockInput,
                      ValidationBooking.validateDeleteBookingByIDLockOutput
                  )
        ) as SignaturesBooking.deleteBookingByIDLockResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
