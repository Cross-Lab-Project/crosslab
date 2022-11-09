import {
    APIClient,
    SignaturesDeviceAuthenticationToken,
    SignaturesIdentity,
    SignaturesLogin,
    SignaturesLogout,
    SignaturesUsers,
    ValidationUsers,
} from '../generated/auth'
import { isErrorResponse } from '../generated/auth/types'
import { UnsuccessfulRequestError } from '../types/errors'
import { appendToUrl, validateUrl } from '../util'
import { ProxyClient } from './proxy'

export class AuthClient {
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

    // login

    public async login(
        username: string,
        password: string,
        method: 'local' | 'tui'
    ): Promise<SignaturesLogin.postLoginSuccessResponseType> {
        const body: SignaturesLogin.postLoginBodyType = {
            username,
            password,
            method,
        }
        const response = await this.apiClient.postLogin(body)

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // logout

    public async logout(): Promise<SignaturesLogout.postLogoutSuccessResponseType> {
        const body: SignaturesLogout.postLogoutBodyType = {
            token: this._accessToken,
        }
        const response = await this.apiClient.postLogout(body)

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // identity

    public async getIdentity(): Promise<SignaturesIdentity.getIdentitySuccessResponseType> {
        const response = await this.apiClient.getIdentity()

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchIdentity(
        identity: SignaturesIdentity.patchIdentityBodyType
    ): Promise<SignaturesIdentity.patchIdentitySuccessResponseType> {
        const response = await this.apiClient.patchIdentity(identity)

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // device token

    public async getDeviceToken(
        device_url: string
    ): Promise<SignaturesDeviceAuthenticationToken.postDeviceAuthenticationTokenSuccessResponseType> {
        const response = await this.apiClient.postDeviceAuthenticationToken({ device_url })

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    // users

    public async getUsers(
        url?: string
    ): Promise<SignaturesUsers.getUsersSuccessResponseType> {
        url = url ?? this._url
        url = appendToUrl(url, '/users')
        validateUrl(url, '/users')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getUsers()
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      undefined,
                      undefined,
                      ValidationUsers.validateGetUsersInput,
                      ValidationUsers.validateGetUsersOutput
                  )
        ) as SignaturesUsers.getUsersResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async getUser(
        url: string
    ): Promise<SignaturesUsers.getUsersByUsernameSuccessResponseType> {
        const [username] = validateUrl(url, '/users/{}')
        const parameters: SignaturesUsers.getUsersByUsernameParametersType = {
            username,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.getUsersByUsername(parameters)
                : await this.proxyClient.proxy(
                      'get',
                      url,
                      parameters,
                      undefined,
                      ValidationUsers.validateGetUsersByUsernameInput,
                      ValidationUsers.validateGetUsersByUsernameOutput
                  )
        ) as SignaturesUsers.getUsersByUsernameResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async createUser(
        url: string,
        user: SignaturesUsers.postUsersBodyType
    ): Promise<SignaturesUsers.postUsersSuccessResponseType> {
        url = appendToUrl(url, '/users')
        validateUrl(url, '/users')
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.postUsers(user)
                : await this.proxyClient.proxy(
                      'post',
                      url,
                      undefined,
                      user,
                      ValidationUsers.validatePostUsersInput,
                      ValidationUsers.validatePostUsersOutput
                  )
        ) as SignaturesUsers.postUsersResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async patchUser(
        url: string,
        user: SignaturesUsers.patchUsersByUsernameBodyType
    ): Promise<SignaturesUsers.patchUsersByUsernameSuccessResponseType> {
        const [username] = validateUrl(url, '/users/{}')
        const parameters: SignaturesUsers.patchUsersByUsernameParametersType = {
            username,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.patchUsersByUsername(parameters, user)
                : await this.proxyClient.proxy(
                      'patch',
                      url,
                      parameters,
                      user,
                      ValidationUsers.validatePatchUsersByUsernameInput,
                      ValidationUsers.validatePatchUsersByUsernameOutput
                  )
        ) as SignaturesUsers.patchUsersByUsernameResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async deleteUser(
        url: string
    ): Promise<SignaturesUsers.deleteUsersByUsernameSuccessResponseType> {
        const [username] = validateUrl(url, '/users/{}')
        const parameters: SignaturesUsers.deleteUsersByUsernameParametersType = {
            username,
        }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteUsersByUsername(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationUsers.validateDeleteUsersByUsernameInput,
                      ValidationUsers.validateDeleteUsersByUsernameOutput
                  )
        ) as SignaturesUsers.deleteUsersByUsernameResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async addRoleToUser(
        url: string,
        role: string
    ): Promise<SignaturesUsers.putUsersByUsernameRolesByRoleNameSuccessResponseType> {
        url = appendToUrl(url, `/roles/${role}`)
        const [username, role_name] = validateUrl(url, '/users/{}/roles/{}')
        const parameters: SignaturesUsers.putUsersByUsernameRolesByRoleNameParametersType =
            {
                username,
                role_name,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.putUsersByUsernameRolesByRoleName(parameters)
                : await this.proxyClient.proxy(
                      'put',
                      url,
                      parameters,
                      undefined,
                      ValidationUsers.validatePutUsersByUsernameRolesByRoleNameInput,
                      ValidationUsers.validatePutUsersByUsernameRolesByRoleNameOutput
                  )
        ) as SignaturesUsers.putUsersByUsernameRolesByRoleNameResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }

    public async removeRoleFromUser(
        url: string,
        role: string
    ): Promise<SignaturesUsers.deleteUsersByUsernameRolesByRoleNameSuccessResponseType> {
        url = appendToUrl(url, `/roles/${role}`)
        const [username, role_name] = validateUrl(url, '/users/{}/roles/{}')
        const parameters: SignaturesUsers.deleteUsersByUsernameRolesByRoleNameParametersType =
            {
                username,
                role_name,
            }
        const response = (
            url.startsWith(this._url)
                ? await this.apiClient.deleteUsersByUsernameRolesByRoleName(parameters)
                : await this.proxyClient.proxy(
                      'delete',
                      url,
                      parameters,
                      undefined,
                      ValidationUsers.validateDeleteUsersByUsernameRolesByRoleNameInput,
                      ValidationUsers.validateDeleteUsersByUsernameRolesByRoleNameOutput
                  )
        ) as SignaturesUsers.deleteUsersByUsernameRolesByRoleNameResponseType

        if (isErrorResponse(response)) {
            throw new UnsuccessfulRequestError(
                `Server returned response with status ${response.status}`,
                response
            )
        }

        return response
    }
}
