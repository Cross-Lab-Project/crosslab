import { HttpMethods, isErrorResponse, ResponseData } from '../generated/federation/types'
import {
    APIClient,
    SignaturesInstitutions,
    ValidationInstitutions,
} from '../generated/federation'
import { ProxyClient } from './proxy'
import { appendToUrl, validateUrl } from '../util'
import { UnsuccessfulRequestError } from '../types/errors'

export class FederationClient {
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

    // institutions

    public async getInstitutions(
        url?: string
    ): Promise<SignaturesInstitutions.getInstitutionsSuccessResponseType> {
        url = url ?? this._url
        url = appendToUrl(url, '/institutions')
        validateUrl(url, '/institutions')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getInstitutions()
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      undefined,
                      undefined,
                      ValidationInstitutions.validateGetInstitutionsInput,
                      ValidationInstitutions.validateGetInstitutionsOutput
                  )
        ) as SignaturesInstitutions.getInstitutionsResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getInstitution(
        url: string
    ): Promise<SignaturesInstitutions.getInstitutionsByInstitutionIdSuccessResponseType> {
        const [institution_id] = validateUrl(url, '/institutions/{}')
        const parameters: SignaturesInstitutions.getInstitutionsByInstitutionIdParametersType =
            {
                institution_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getInstitutionsByInstitutionId(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationInstitutions.validateGetInstitutionsByInstitutionIdInput,
                      ValidationInstitutions.validateGetInstitutionsByInstitutionIdOutput
                  )
        ) as SignaturesInstitutions.getInstitutionsByInstitutionIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createInstitution(
        url: string,
        institution: SignaturesInstitutions.postInstitutionsBodyType
    ): Promise<SignaturesInstitutions.postInstitutionsSuccessResponseType> {
        url = appendToUrl(url, '/institutions')
        validateUrl(url, '/institutions')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postInstitutions(institution)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      undefined,
                      institution,
                      ValidationInstitutions.validatePostInstitutionsInput,
                      ValidationInstitutions.validatePostInstitutionsOutput
                  )
        ) as SignaturesInstitutions.postInstitutionsResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchInstitution(
        url: string,
        institution: SignaturesInstitutions.patchInstitutionsByInstitutionIdBodyType
    ): Promise<SignaturesInstitutions.patchInstitutionsByInstitutionIdSuccessResponseType> {
        const [institution_id] = validateUrl(url, '/institutions/{}')
        const parameters: SignaturesInstitutions.patchInstitutionsByInstitutionIdParametersType =
            {
                institution_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.patchInstitutionsByInstitutionId(
                      parameters,
                      institution
                  )
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      institution,
                      ValidationInstitutions.validatePatchInstitutionsByInstitutionIdInput,
                      ValidationInstitutions.validatePatchInstitutionsByInstitutionIdOutput
                  )
        ) as SignaturesInstitutions.patchInstitutionsByInstitutionIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deleteInstitution(
        url: string
    ): Promise<SignaturesInstitutions.deleteInstitutionsByInstitutionIdSuccessResponseType> {
        const [institution_id] = validateUrl(url, '/institutions/{}')
        const parameters: SignaturesInstitutions.deleteInstitutionsByInstitutionIdParametersType =
            {
                institution_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteInstitutionsByInstitutionId(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationInstitutions.validateDeleteInstitutionsByInstitutionIdInput,
                      ValidationInstitutions.validateDeleteInstitutionsByInstitutionIdOutput
                  )
        ) as SignaturesInstitutions.deleteInstitutionsByInstitutionIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // proxy

    public async proxy(
        method: HttpMethods,
        url: string,
        body?: any
    ): Promise<ResponseData> {
        let response
        switch (method) {
            case 'delete':
                response = await this.apiClient.deleteProxy({ URL: url }, body)
                break
            case 'get':
                response = await this.apiClient.getProxy({ URL: url }, body)
                break
            case 'head':
                response = await this.apiClient.headProxy({ URL: url }, body)
                break
            case 'options':
                response = await this.apiClient.optionsProxy({ URL: url }, body)
                break
            case 'patch':
                response = await this.apiClient.patchProxy({ URL: url }, body)
                break
            case 'post':
                response = await this.apiClient.postProxy({ URL: url }, body)
                break
            case 'put':
                response = await this.apiClient.putProxy({ URL: url }, body)
                break
            case 'trace':
                response = await this.apiClient.traceProxy({ URL: url }, body)
                break
        }

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
