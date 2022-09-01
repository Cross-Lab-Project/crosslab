import {
    APIClient,
    SignaturesExperiments,
    ValidationExperiments,
} from '../generated/experiment'
import { isErrorResponse } from '../generated/experiment/types'
import { UnsuccessfulRequestError } from '../types/errors'
import { appendToUrl, validateUrl } from '../util'
import { ProxyClient } from './proxy'

export class ExperimentClient {
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

    public async getExperiments(
        url?: string
    ): Promise<SignaturesExperiments.getExperimentsSuccessResponseType> {
        url = url ?? this._url
        url = appendToUrl(url, '/experiments')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getExperiments()
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      undefined,
                      undefined,
                      ValidationExperiments.validateGetExperimentsInput,
                      ValidationExperiments.validateGetExperimentsOutput
                  )
        ) as SignaturesExperiments.getExperimentsResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getExperiment(
        url: string
    ): Promise<SignaturesExperiments.getExperimentsByExperimentIdSuccessResponseType> {
        const [experiment_id] = validateUrl(url, '/experiments')
        const parameters: SignaturesExperiments.getExperimentsByExperimentIdParametersType =
            {
                experiment_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getExperimentsByExperimentId(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationExperiments.validateGetExperimentsByExperimentIdInput,
                      ValidationExperiments.validateGetExperimentsByExperimentIdOutput
                  )
        ) as SignaturesExperiments.getExperimentsByExperimentIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createExperiment(
        url: string,
        experiment: SignaturesExperiments.postExperimentsBodyType
    ): Promise<SignaturesExperiments.postExperimentsSuccessResponseType> {
        url = appendToUrl(url, '/experiments')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postExperiments(experiment)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      undefined,
                      experiment,
                      ValidationExperiments.validatePostExperimentsInput,
                      ValidationExperiments.validatePostExperimentsOutput
                  )
        ) as SignaturesExperiments.postExperimentsResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchExperiment(
        url: string,
        experiment: SignaturesExperiments.patchExperimentsByExperimentIdBodyType,
        changedURL?: string
    ): Promise<SignaturesExperiments.patchExperimentsByExperimentIdSuccessResponseType> {
        const [experiment_id] = validateUrl(url, '/experiments/{}')
        const parameters: SignaturesExperiments.patchExperimentsByExperimentIdParametersType =
            {
                experiment_id,
                changedURL,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.patchExperimentsByExperimentId(
                      parameters,
                      experiment
                  )
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      experiment,
                      ValidationExperiments.validatePatchExperimentsByExperimentIdInput,
                      ValidationExperiments.validatePatchExperimentsByExperimentIdOutput
                  )
        ) as SignaturesExperiments.patchExperimentsByExperimentIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deleteExperiment(
        url: string
    ): Promise<SignaturesExperiments.deleteExperimentsByExperimentIdSuccessResponseType> {
        const [experiment_id] = validateUrl(url, '/experiments/{}')
        const parameters: SignaturesExperiments.deleteExperimentsByExperimentIdParametersType =
            {
                experiment_id,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteExperimentsByExperimentId(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationExperiments.validateDeleteExperimentsByExperimentIdInput,
                      ValidationExperiments.validateDeleteExperimentsByExperimentIdOutput
                  )
        ) as SignaturesExperiments.deleteExperimentsByExperimentIdResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
