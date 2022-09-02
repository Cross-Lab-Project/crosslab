import { WebSocket } from 'ws'
import { AuthClient } from './clients/auth'
import { DeviceClient } from './clients/device'
import { ExperimentClient } from './clients/experiment'
import { FederationClient } from './clients/federation'
import { UpdateClient } from './clients/update'
import {
    SignaturesDeviceToken,
    SignaturesIdentity,
    SignaturesUsers,
} from './generated/auth'
import {
    HttpMethods,
    ResponseData,
    ValidationError,
    FetchError,
} from './generated/auth/types'
import { SignaturesDevices, SignaturesPeerconnections } from './generated/device'
import { SignaturesExperiments } from './generated/experiment'
import { SignaturesInstitutions } from './generated/federation'
import { SignaturesUpdates } from './generated/update'
import {
    UnsuccessfulRequestError,
    InvalidUrlError,
    WebSocketAuthenticationError,
} from './types/errors'

export {
    ValidationError,
    UnsuccessfulRequestError,
    InvalidUrlError,
    WebSocketAuthenticationError,
    FetchError,
}

/**
 * API Client for the use of the Crosslab services.
 */
export class APIClient {
    private _url: string
    private _accessToken: string
    private authClient: AuthClient
    private deviceClient: DeviceClient
    private experimentClient: ExperimentClient
    private federationClient: FederationClient
    private updateClient: UpdateClient

    constructor(url: string, accessToken?: string) {
        this._url = url
        this._accessToken = accessToken ?? ''
        this.authClient = new AuthClient(url, accessToken)
        this.deviceClient = new DeviceClient(url, accessToken)
        this.experimentClient = new ExperimentClient(url, accessToken)
        this.federationClient = new FederationClient(url, accessToken)
        this.updateClient = new UpdateClient(url, accessToken)
    }

    get url() {
        return this._url
    }

    set url(url: string) {
        this._url = url
        this.authClient.url = url
        this.deviceClient.url = url
        this.experimentClient.url = url
        this.federationClient.url = url
        this.updateClient.url = url
    }

    get accessToken() {
        return this._accessToken
    }

    set accessToken(accessToken: string) {
        this._accessToken = accessToken
        this.authClient.accessToken = accessToken
        this.deviceClient.accessToken = accessToken
        this.experimentClient.accessToken = accessToken
        this.federationClient.accessToken = accessToken
        this.updateClient.accessToken = accessToken
    }

    // Auth Service API Calls

    // login

    /**
     * This function attempts to login the client.
     * @param username The username of the client.
     * @param password The password of the client.
     * @param method The method to be used for the login request.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async login(
        username: string,
        password: string,
        method: 'local' | 'tui'
    ): Promise<void> {
        await this.authClient.login(username, password, method)
    }

    // logout

    /**
     * This function attempts to logout the client.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async logout(): Promise<void> {
        await this.authClient.logout()
    }

    // identity

    /**
     * This function attempts to get the user associated with the access token of the client (their identity).
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The identity (user) of the client.
     */
    public async getIdentity(): Promise<
        SignaturesIdentity.getIdentitySuccessResponseType['body']
    > {
        return (await this.authClient.getIdentity()).body
    }

    /**
     * This function attempts to patch the user associated with the access token of the client (their identity).
     * @param identity The user information to use for patching.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched identity (user) of the client.
     */
    public async patchIdentity(
        identity: SignaturesIdentity.patchIdentityBodyType
    ): Promise<SignaturesIdentity.patchIdentitySuccessResponseType['body']> {
        return (await this.authClient.patchIdentity(identity)).body
    }

    // device token

    /**
     * This function attempts to retrieve a device token for the client.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly generated device token.
     */
    public async getDeviceToken(): Promise<
        SignaturesDeviceToken.postDeviceTokenSuccessResponseType['body']
    > {
        return (await this.authClient.getDeviceToken()).body
    }

    // users

    /**
     * This function attempts to retrieve the list of all users.
     * @param url The url of the authentication service to be called.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The list of all users.
     */
    public async getUsers(
        url: string
    ): Promise<SignaturesUsers.getUsersSuccessResponseType['body']> {
        return (await this.authClient.getUsers(url)).body
    }

    /**
     * This function attempts to retrieve a specific user.
     * @param url The url of the user.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The requested user.
     */
    public async getUser(
        url: string
    ): Promise<SignaturesUsers.getUsersByUsernameSuccessResponseType['body']> {
        return (await this.authClient.getUser(url)).body
    }

    /**
     * This function attempts to create a new user.
     * @param url The url of the authentication service to be called.
     * @param user The information to be used for creating the new user.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly created user.
     */
    public async createUser(
        url: string,
        user: SignaturesUsers.postUsersBodyType
    ): Promise<SignaturesUsers.postUsersSuccessResponseType['body']> {
        return (await this.authClient.createUser(url, user)).body
    }

    /**
     * This function attempts to patch an user.
     * @param url The url of the user.
     * @param user The user information to be used for patching the user.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched user.
     */
    public async patchUser(
        url: string,
        user: SignaturesUsers.patchUsersByUsernameBodyType
    ): Promise<SignaturesUsers.patchUsersByUsernameSuccessResponseType['body']> {
        return (await this.authClient.patchUser(url, user)).body
    }

    /**
     * This function attempts to delete an user.
     * @param url The url of the user.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async deleteUser(url: string): Promise<void> {
        await this.authClient.deleteUser(url)
    }

    /**
     * This function attempts to add a role to an user.
     * @param url The url of the user.
     * @param role The name of the role.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched user.
     */
    public async addRoleToUser(
        url: string,
        role: string
    ): Promise<
        SignaturesUsers.putUsersByUsernameRolesByRoleNameSuccessResponseType['body']
    > {
        return (await this.authClient.addRoleToUser(url, role)).body
    }

    /**
     * This function attempts to remove a role from an user.
     * @param url The url of the user.
     * @param role The name of the role.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async removeRoleFromUser(url: string, role: string): Promise<void> {
        await this.authClient.removeRoleFromUser(url, role)
    }

    // Device Service API Calls

    // devices

    /**
     * This function attempts to retrieve the list of all devices.
     * @param url The url of the device service to be called.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The list of all devices.
     */
    public async getDevices(
        url: string
    ): Promise<SignaturesDevices.getDevicesSuccessResponseType['body']> {
        return (await this.deviceClient.getDevices(url)).body
    }

    /**
     * This function attempts to retrieve a specific device.
     * @param url The url of the device.
     * @param flat_group If true resolved device groups will only contain concrete devices.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The requested device.
     */
    public async getDevice(
        url: string,
        flat_group?: boolean
    ): Promise<SignaturesDevices.getDevicesByDeviceIdSuccessResponseType['body']> {
        return (await this.deviceClient.getDevice(url, flat_group)).body
    }

    /**
     * This function attempts to create a new device.
     * @param url The url of the device service to be called.
     * @param device The information to be used for creating the new device.
     * @param changedUrl The url to be called when changes are made to the device.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly created device.
     */
    public async createDevice(
        url: string,
        device: SignaturesDevices.postDevicesBodyType,
        changedUrl?: string
    ): Promise<SignaturesDevices.postDevicesSuccessResponseType['body']> {
        return (await this.deviceClient.createDevice(url, device, changedUrl)).body
    }

    /**
     * This function attempts to patch the information of a device.
     * @param url The url of the device.
     * @param device The information to be used for patching the device.
     * @param changedUrl The url to be called when changes are made to the device.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched device.
     */
    public async patchDevice(
        url: string,
        device: SignaturesDevices.patchDevicesByDeviceIdBodyType,
        changedUrl?: string
    ): Promise<SignaturesDevices.patchDevicesByDeviceIdSuccessResponseType['body']> {
        return (await this.deviceClient.patchDevice(url, device, changedUrl)).body
    }

    /**
     * This function attempts to delete a device.
     * @param url The url of the device.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async deleteDevice(url: string): Promise<void> {
        await this.deviceClient.deleteDevice(url)
    }

    /**
     * This function attempts to add new availability rules to a device.
     * @param url The url of the device.
     * @param availabilityRules The availability rules to be added.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched availability of the device.
     */
    public async addAvailabilityRules(
        url: string,
        availabilityRules: SignaturesDevices.postDevicesByDeviceIdAvailabilityBodyType
    ): Promise<
        SignaturesDevices.postDevicesByDeviceIdAvailabilitySuccessResponseType['body']
    > {
        return (await this.deviceClient.addAvailabilityRules(url, availabilityRules)).body
    }

    /**
     * This function attempts to get a token for a device (for websocket authentication).
     * @param url The url of the device.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly generated token.
     */
    public async getToken(
        url: string
    ): Promise<SignaturesDevices.postDevicesByDeviceIdTokenSuccessResponseType['body']> {
        return (await this.deviceClient.getToken(url)).body
    }

    /**
     * This function attempts to send a signaling message to a device.
     * @param url The url of the device.
     * @param peerconnection_url The url of the peerconnection for which the signaling takes place.
     * @param signalingMessage The signaling message.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async sendSignalingMessage(
        url: string,
        peerconnection_url: string,
        signalingMessage: SignaturesDevices.postDevicesByDeviceIdSignalingBodyType
    ): Promise<void> {
        await this.deviceClient.sendSignalingMessage(
            url,
            peerconnection_url,
            signalingMessage
        )
    }

    /**
     * This function attempts to establish a websocket connection for a device.
     * @param url The url of the device.
     * @throws {FetchError} Thrown if fetch fails (getToken).
     * @throws {ValidationError} Thrown if the request/response validation fails (getToken).
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request (getToken).
     * @throws {WebSocketAuthenticationError} Thrown if the authentication of the websocket connection fails.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400 (getToken).
     * @returns The newly established websocket connection.
     */
    public async connectDevice(url: string): Promise<WebSocket> {
        return await this.deviceClient.connectDevice(url)
    }

    // peerconnections

    /**
     * This function attempts to retrieve the list of all peerconnections.
     * @param url The url of the device service to be called.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The list of all peerconnections.
     */
    public async getPeerconnections(
        url: string
    ): Promise<SignaturesPeerconnections.getPeerconnectionsSuccessResponseType['body']> {
        return (await this.deviceClient.getPeerconnections(url)).body
    }

    /**
     * This function attempts to retrieve a specific peerconnection.
     * @param url The url of the peerconnection.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The requested peerconnection.
     */
    public async getPeerconnection(
        url: string
    ): Promise<
        SignaturesPeerconnections.getPeerconnectionsByPeerconnectionIdSuccessResponseType['body']
    > {
        return (await this.deviceClient.getPeerconnection(url)).body
    }

    /**
     * This function attempts to create a new peerconnection.
     * @param url The url of the device service to be called.
     * @param peerconnection The information to be used for creating the peerconnection.
     * @param closedUrl The url to be called when the peerconnection closes.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly created peerconnection.
     */
    public async createPeerconnection(
        url: string,
        peerconnection: SignaturesPeerconnections.postPeerconnectionsBodyType,
        closedUrl?: string
    ): Promise<SignaturesPeerconnections.postPeerconnectionsSuccessResponseType['body']> {
        return (
            await this.deviceClient.createPeerconnection(url, peerconnection, closedUrl)
        ).body
    }

    /**
     * This function attempts to delete a peerconnection.
     * @param url The url of the peerconnection.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async deletePeerconnection(url: string): Promise<void> {
        await this.deviceClient.deletePeerconnection(url)
    }

    // Experiment Service API Calls

    /**
     * This function attempts to retrieve the list of all experiments.
     * @param url The url of the experiment service to be called.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The list of all experiments.
     */
    public async getExperiments(
        url: string
    ): Promise<SignaturesExperiments.getExperimentsSuccessResponseType['body']> {
        return (await this.experimentClient.getExperiments(url)).body
    }

    /**
     * This function attempts to retrieve a specific experiment.
     * @param url The url of the experiment.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The requested experiment.
     */
    public async getExperiment(
        url: string
    ): Promise<
        SignaturesExperiments.getExperimentsByExperimentIdSuccessResponseType['body']
    > {
        return (await this.experimentClient.getExperiment(url)).body
    }

    /**
     * This function attempts to create a new experiment.
     * @param url The url of the experiment service to be called.
     * @param experiment The information to be used for creating the experiment.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly created experiment.
     */
    public async createExperiment(
        url: string,
        experiment: SignaturesExperiments.postExperimentsBodyType
    ): Promise<SignaturesExperiments.postExperimentsSuccessResponseType['body']> {
        return (await this.experimentClient.createExperiment(url, experiment)).body
    }

    /**
     * This function attempts to patch an experiment.
     * @param url The url of the experiment.
     * @param experiment The information to be used for patching the experiment.
     * @param changedURL The url to be called when changes are made to the experiment.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched experiment.
     */
    public async patchExperiment(
        url: string,
        experiment: SignaturesExperiments.patchExperimentsByExperimentIdBodyType,
        changedURL?: string
    ): Promise<
        SignaturesExperiments.patchExperimentsByExperimentIdSuccessResponseType['body']
    > {
        return (await this.experimentClient.patchExperiment(url, experiment, changedURL))
            .body
    }

    /**
     * This function attempts to delete an experiment.
     * @param url The url of the experiment.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async deleteExperiment(url: string): Promise<void> {
        await this.experimentClient.deleteExperiment(url)
    }

    // Federation Service API Calls

    // institutions

    /**
     * This function attempts to get the list of all institutions.
     * @param url The url of the federation service to be called.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The list of all institutions.
     */
    public async getInstitutions(
        url: string
    ): Promise<SignaturesInstitutions.getInstitutionsSuccessResponseType['body']> {
        return (await this.federationClient.getInstitutions(url)).body
    }

    /**
     * This function attempts to retrieve a specific institution.
     * @param url The url of the institution.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The requested institution.
     */
    public async getInstitution(
        url: string
    ): Promise<
        SignaturesInstitutions.getInstitutionsByInstitutionIdSuccessResponseType['body']
    > {
        return (await this.federationClient.getInstitution(url)).body
    }

    /**
     * This function attempts to create a new institution.
     * @param url The url of the federation service to be called.
     * @param institution The information to be used for creating the institution.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly created institution.
     */
    public async createInstitution(
        url: string,
        institution: SignaturesInstitutions.postInstitutionsBodyType
    ): Promise<SignaturesInstitutions.postInstitutionsSuccessResponseType['body']> {
        return (await this.federationClient.createInstitution(url, institution)).body
    }

    /**
     * This function attempts to patch an institution.
     * @param url The url of the institution.
     * @param institution The information to be used for patching the institution.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched institution.
     */
    public async patchInstitution(
        url: string,
        institution: SignaturesInstitutions.patchInstitutionsByInstitutionIdBodyType
    ): Promise<
        SignaturesInstitutions.patchInstitutionsByInstitutionIdSuccessResponseType['body']
    > {
        return (await this.federationClient.patchInstitution(url, institution)).body
    }

    /**
     * This function attempts to delete an institution.
     * @param url The url of the institution.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async deleteInstitution(url: string): Promise<void> {
        await this.federationClient.deleteInstitution(url)
    }

    // proxy

    /**
     * This function attempts to proxy a request.
     * @param method The http method to be used.
     * @param url The url to be called.
     * @param body The body of the request.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns Response to the proxied request.
     */
    public async proxy(
        method: HttpMethods,
        url: string,
        body?: any
    ): Promise<ResponseData> {
        return this.federationClient.proxy(method, url, body)
    }

    // Update Service API Calls

    /**
     * This function attempts to retrieve the list of all updates.
     * @param url The url of the update service to be called.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The list of all updates.
     */
    public async getUpdates(
        url: string
    ): Promise<SignaturesUpdates.getUpdatesSuccessResponseType['body']> {
        return (await this.updateClient.getUpdates(url)).body
    }

    /**
     * This function attempts to retrieve a specific update.
     * @param url The url of the update.
     * @param current_version The current local version.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The url for fetching the update or null when no update is needed.
     */
    public async getUpdate(
        url: string,
        current_version?: string
    ): Promise<string | null> {
        const response = await this.updateClient.getUpdate(url, current_version)
        if (response.status === 303) {
            return response.headers.Location
        }
        return null
    }

    /**
     * This function attempts to create a new update.
     * @param url The url of the update service to be called.
     * @param update The information to be used for creating the update.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The newly created update.
     */
    public async createUpdate(
        url: string,
        update: SignaturesUpdates.postUpdatesBodyType
    ): Promise<SignaturesUpdates.postUpdatesSuccessResponseType['body']> {
        return (await this.updateClient.createUpdate(url, update)).body
    }

    /**
     * This function attempts to patch an update.
     * @param url The url of the update.
     * @param update The information to be used for patching the update.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     * @returns The patched update.
     */
    public async patchUpdate(
        url: string,
        update: SignaturesUpdates.patchUpdatesByDeviceIdBodyType
    ): Promise<SignaturesUpdates.patchUpdatesByDeviceIdSuccessResponseType['body']> {
        return (await this.updateClient.patchUpdate(url, update)).body
    }

    /**
     * This function attempts to delete an update.
     * @param url The url of the update.
     * @throws {FetchError} Thrown if fetch fails.
     * @throws {ValidationError} Thrown if the request/response validation fails.
     * @throws {InvalidUrlError} Thrown if the provided url is not valid for this request.
     * @throws {UnsuccessfulRequestError} Thrown if response is validated but has status greater than or equal to 400.
     */
    public async deleteUpdate(url: string): Promise<void> {
        await this.updateClient.deleteUpdate(url)
    }
}
