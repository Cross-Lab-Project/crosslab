import {
    APIClient as BookingClient,
    SignaturesBooking as BookingSignatures,
    Types as BookingTypes,
    ValidationBooking as BookingValidation
} from "./generated/booking"

import {
    APIClient as DeviceClient,
    SignaturesDevices as DeviceSignatures,
    SignaturesPeerconnections as PeerconnectionSignatures,
    Types as DeviceTypes,
    ValidationDevices as DeviceValidation,
    ValidationPeerconnections as PeerconnectionValidation
} from "./generated/device"

import {
    APIClient as ExperimentClient,
    SignaturesExperiments as ExperimentSignatures,
    Types as ExperimentTypes,
    ValidationExperiments as ExperimentValidation
} from "./generated/experiment"

import {
    APIClient as FederationClient,
    SignaturesInstitutions as InstitutionSignatures,
    SignaturesProxy as ProxySignatures,
    Types as FederationTypes,
    ValidationInstitutions as InstitutionValidation
} from "./generated/federation"

export {
    FetchError,
    ResponseData,
    UserType,
    HttpMethods,
    isFetchError
} from "./generated/booking/types"

import {
    FetchError, isFetchError, ResponseData,
} from "./generated/booking/types"
import { URLSearchParams } from "url"

export {
    BookingTypes,
    DeviceTypes,
    ExperimentTypes,
    FederationTypes
}

export { 
    BookingSignatures, 
    DeviceSignatures, 
    PeerconnectionSignatures, 
    ExperimentSignatures, 
    InstitutionSignatures, 
    ProxySignatures 
}

function isValidHttpUrl(string: string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

function isValidUrl(url: string, endpoint: string): boolean {
    if (!isValidHttpUrl(url)) return false
    if (!url.endsWith(endpoint)) return false
    return true
}

export class APIClient {
    private bookingClient: BookingClient
    private deviceClient: DeviceClient
    private experimentClient: ExperimentClient
    private federationClient: FederationClient
    
    constructor(
        baseURL: string | {
            booking: string
            device: string
            experiment: string
            federation: string
        }
    ) {
        this.bookingClient = new BookingClient(typeof baseURL === "string" ? baseURL : baseURL.booking)
        this.deviceClient = new DeviceClient(typeof baseURL === "string" ? baseURL : baseURL.device)
        this.experimentClient = new ExperimentClient(typeof baseURL === "string" ? baseURL : baseURL.experiment)
        this.federationClient = new FederationClient(typeof baseURL === "string" ? baseURL : baseURL.federation)
    }

    set accessToken(accessToken: string) {
        this.bookingClient.accessToken = accessToken
        this.deviceClient.accessToken = accessToken
        this.experimentClient.accessToken = accessToken
        this.federationClient.accessToken = accessToken
    }

    // Booking Service API calls

    public async postBookingSchedule(
        body: BookingSignatures.postBookingScheduleBodyType,
        url?: string
    ): Promise<BookingSignatures.postBookingScheduleResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.postBookingSchedule(body)
        } else {
            if (!isValidUrl(url, `/booking/schedule`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("post", url, undefined, body, BookingValidation.validatePostBookingScheduleInput, BookingValidation.validatePostBookingScheduleOutput)
        }
    }

    public async putBookingManage(
        body: BookingSignatures.putBookingManageBodyType,
        url?: string
    ): Promise<BookingSignatures.putBookingManageResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.putBookingManage(body)
        } else {
            if (!isValidUrl(url, `/booking/manage`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("put", url, undefined, body, BookingValidation.validatePutBookingManageInput, BookingValidation.validatePutBookingManageOutput)
        }
    }

    public async getBookingManageByID(
        parameters: BookingSignatures.getBookingManageByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.getBookingManageByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.getBookingManageByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/manage/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, BookingValidation.validateGetBookingManageByIDInput, BookingValidation.validateGetBookingManageByIDOutput)
        }
    }

    public async deleteBookingManageByID(
        parameters: BookingSignatures.deleteBookingManageByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingManageByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingManageByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/manage/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingManageByIDInput, BookingValidation.validateDeleteBookingManageByIDOutput)
        }
    }

    public async patchBookingManageByID(
        parameters: BookingSignatures.patchBookingManageByIDParametersType, 
        body: BookingSignatures.patchBookingManageByIDBodyType,
        url?: string
    ): Promise<BookingSignatures.patchBookingManageByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.patchBookingManageByID(parameters, body)
        } else {
            if (!isValidUrl(url, `/booking/manage/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("patch", url, parameters, body, BookingValidation.validatePatchBookingManageByIDInput, BookingValidation.validatePatchBookingManageByIDOutput)
        }
    }

    public async deleteBookingDestroyByID(
        parameters: BookingSignatures.deleteBookingDestroyByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingDestroyByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingDestroyByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/destroy/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingDestroyByIDInput, BookingValidation.validateDeleteBookingDestroyByIDOutput)
        }
    }

    public async putBookingLockByID(
        parameters: BookingSignatures.putBookingLockByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.putBookingLockByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.putBookingLockByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/lock/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("put", url, parameters, undefined, BookingValidation.validatePutBookingLockByIDInput, BookingValidation.validatePutBookingLockByIDOutput)
        }
    }

    public async deleteBookingLockByID(
        parameters: BookingSignatures.deleteBookingLockByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingLockByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingLockByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/lock/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingLockByIDInput, BookingValidation.validateDeleteBookingLockByIDOutput)
        }
    }

    public async postBookingCallbackByID(
        parameters: BookingSignatures.postBookingCallbackByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.postBookingCallbackByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.postBookingCallbackByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/callback/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("post", url, parameters, undefined, BookingValidation.validatePostBookingCallbackByIDInput, BookingValidation.validatePostBookingCallbackByIDOutput)
        }
    }

    public async putBookingDevice(
        body: BookingSignatures.putBookingDeviceBodyType,
        url?: string
    ): Promise<BookingSignatures.putBookingDeviceResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.putBookingDevice(body)
        } else {
            if (!isValidUrl(url, `/booking/device`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("put", url, undefined, body, BookingValidation.validatePutBookingDeviceInput, BookingValidation.validatePutBookingDeviceOutput)
        }
    }

    public async getBookingDeviceByID(
        parameters: BookingSignatures.getBookingDeviceByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.getBookingDeviceByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.getBookingDeviceByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/device/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, BookingValidation.validateGetBookingDeviceByIDInput, BookingValidation.validateGetBookingDeviceByIDOutput)
        }
    }

    public async deleteBookingDeviceByID(
        parameters: BookingSignatures.deleteBookingDeviceByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingDeviceByIDResponseType | FetchError> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingDeviceByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/device/${parameters.ID}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingDeviceByIDInput, BookingValidation.validateDeleteBookingDeviceByIDOutput)
        }
    }

    // Device Service API calls

    public async getDevices(url?: string): Promise<DeviceSignatures.getDevicesResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getDevices()
        } else {
            if (!isValidUrl(url, `/devices`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, undefined, undefined, DeviceValidation.validateGetDevicesInput, DeviceValidation.validateGetDevicesOutput)
        }
    }

	public async postDevices(
        parameters: DeviceSignatures.postDevicesParametersType, 
        body: DeviceSignatures.postDevicesBodyType,
        url?: string
    ): Promise<DeviceSignatures.postDevicesResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.postDevices(parameters, body)
        } else {
            if (!isValidUrl(url, `/devices`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            let finalUrl = url
            if (parameters.changedUrl) finalUrl += "?" + new URLSearchParams({ changedUrl: parameters.changedUrl })
            return this.proxy("post", finalUrl, parameters, body, DeviceValidation.validatePostDevicesInput, DeviceValidation.validatePostDevicesOutput)
        }
    }

	public async getDevicesByDeviceId(
        parameters: DeviceSignatures.getDevicesByDeviceIdParametersType,
        url?: string
    ): Promise<DeviceSignatures.getDevicesByDeviceIdResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getDevicesByDeviceId(parameters)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, DeviceValidation.validateGetDevicesByDeviceIdInput, DeviceValidation.validateGetDevicesByDeviceIdOutput)
        }
    }

	public async deleteDevicesByDeviceId(
        parameters: DeviceSignatures.deleteDevicesByDeviceIdParametersType,
        url?: string
    ): Promise<DeviceSignatures.deleteDevicesByDeviceIdResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.deleteDevicesByDeviceId(parameters)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, DeviceValidation.validateDeleteDevicesByDeviceIdInput, DeviceValidation.validateDeleteDevicesByDeviceIdOutput)
        }
    }

	public async patchDevicesByDeviceId(
        parameters: DeviceSignatures.patchDevicesByDeviceIdParametersType, 
        body: DeviceSignatures.patchDevicesByDeviceIdBodyType,
        url?: string
    ): Promise<DeviceSignatures.patchDevicesByDeviceIdResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.patchDevicesByDeviceId(parameters, body)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            let finalUrl = url
            if (parameters.changedUrl) finalUrl += "?" + new URLSearchParams({ changedUrl: parameters.changedUrl })
            return this.proxy("patch", finalUrl, parameters, body, DeviceValidation.validatePatchDevicesByDeviceIdInput, DeviceValidation.validatePatchDevicesByDeviceIdOutput)
        }
    }

	public async postDevicesByDeviceIdAvailability(
        parameters: DeviceSignatures.postDevicesByDeviceIdAvailabilityParametersType, 
        body: DeviceSignatures.postDevicesByDeviceIdAvailabilityBodyType,
        url?: string
    ): Promise<DeviceSignatures.postDevicesByDeviceIdAvailabilityResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.postDevicesByDeviceIdAvailability(parameters, body)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}/availability`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("post", url, parameters, body, DeviceValidation.validatePostDevicesByDeviceIdAvailabilityInput, DeviceValidation.validatePostDevicesByDeviceIdAvailabilityOutput)
        }
    }

	public async getDevicesByDeviceIdToken(
        parameters: DeviceSignatures.getDevicesByDeviceIdTokenParametersType,
        url?: string
    ): Promise<DeviceSignatures.getDevicesByDeviceIdTokenResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getDevicesByDeviceIdToken(parameters)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}/token`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, DeviceValidation.validateGetDevicesByDeviceIdTokenInput, DeviceValidation.validateGetDevicesByDeviceIdTokenOutput)
        }
    }

    public async getPeerconnections(url?: string): Promise<PeerconnectionSignatures.getPeerconnectionsResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getPeerconnections()
        } else {
            if (!isValidUrl(url, `/peerconnections`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, undefined, undefined, PeerconnectionValidation.validateGetPeerconnectionsInput, PeerconnectionValidation.validateGetPeerconnectionsOutput)
        }
    }

	public async postPeerconnections(
        parameters: PeerconnectionSignatures.postPeerconnectionsParametersType, 
        body: PeerconnectionSignatures.postPeerconnectionsBodyType,
        url?: string
    ): Promise<PeerconnectionSignatures.postPeerconnectionsResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.postPeerconnections(parameters, body)
        } else {
            if (!isValidUrl(url, `/peerconnections`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            let finalUrl = url
            if (parameters.closedUrl) finalUrl += "?" + new URLSearchParams({ closedUrl: parameters.closedUrl })
            return this.proxy("post", finalUrl, parameters, body, PeerconnectionValidation.validatePostPeerconnectionsInput, PeerconnectionValidation.validatePostPeerconnectionsOutput)
        }
    }

	public async getPeerconnectionsByPeerconnectionId(
        parameters: PeerconnectionSignatures.getPeerconnectionsByPeerconnectionIdParametersType,
        url?: string
    ): Promise<PeerconnectionSignatures.getPeerconnectionsByPeerconnectionIdResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getPeerconnectionsByPeerconnectionId(parameters)
        } else {
            if (!isValidUrl(url, `/peerconnections/${parameters.peerconnection_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, PeerconnectionValidation.validateGetPeerconnectionsByPeerconnectionIdInput, PeerconnectionValidation.validateGetPeerconnectionsByPeerconnectionIdOutput)
        }
    }

	public async deletePeerconnectionsByPeerconnectionId(
        parameters: PeerconnectionSignatures.deletePeerconnectionsByPeerconnectionIdParametersType,
        url?: string
    ): Promise<PeerconnectionSignatures.deletePeerconnectionsByPeerconnectionIdResponseType | FetchError> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.deletePeerconnectionsByPeerconnectionId(parameters)
        } else {
            if (!isValidUrl(url, `/peerconnections/${parameters.peerconnection_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, PeerconnectionValidation.validateDeletePeerconnectionsByPeerconnectionIdInput, PeerconnectionValidation.validateDeletePeerconnectionsByPeerconnectionIdOutput)
        }
    }

    // Experiment Service API calls

    public async getExperiments(url?: string): Promise<ExperimentSignatures.getExperimentsResponseType | FetchError> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.getExperiments()
        } else {
            if (!isValidUrl(url, `/experiments`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, undefined, undefined, ExperimentValidation.validateGetExperimentsInput, ExperimentValidation.validateGetExperimentsOutput)
        }
    }

	public async postExperiments(
        body: ExperimentSignatures.postExperimentsBodyType,
        url?: string
    ): Promise<ExperimentSignatures.postExperimentsResponseType | FetchError> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.postExperiments(body)
        } else {
            if (!isValidUrl(url, `/experiments`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("post", url, undefined, body, ExperimentValidation.validatePostExperimentsInput, ExperimentValidation.validatePostExperimentsOutput)
        }
    }

	public async getExperimentsByExperimentId(
        parameters: ExperimentSignatures.getExperimentsByExperimentIdParametersType,
        url?: string
    ): Promise<ExperimentSignatures.getExperimentsByExperimentIdResponseType | FetchError> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.getExperimentsByExperimentId(parameters)
        } else {
            if (!isValidUrl(url, `/experiments/${parameters.experiment_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, ExperimentValidation.validateGetExperimentsByExperimentIdInput, ExperimentValidation.validateGetExperimentsByExperimentIdOutput)
        }
    }

	public async deleteExperimentsByExperimentId(
        parameters: ExperimentSignatures.deleteExperimentsByExperimentIdParametersType,
        url?: string
    ): Promise<ExperimentSignatures.deleteExperimentsByExperimentIdResponseType | FetchError> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.deleteExperimentsByExperimentId(parameters)
        } else {
            if (!isValidUrl(url, `/experiments/${parameters.experiment_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, ExperimentValidation.validateDeleteExperimentsByExperimentIdInput, ExperimentValidation.validateDeleteExperimentsByExperimentIdOutput)
        }
    }

	public async patchExperimentsByExperimentId(
        parameters: ExperimentSignatures.patchExperimentsByExperimentIdParametersType, 
        body: ExperimentSignatures.patchExperimentsByExperimentIdBodyType,
        url?: string
    ): Promise<ExperimentSignatures.patchExperimentsByExperimentIdResponseType | FetchError> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.patchExperimentsByExperimentId(parameters, body)
        } else {
            if (!isValidUrl(url, `/experiments/${parameters.experiment_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            let finalUrl = url
            if (parameters.changedURL) finalUrl += "?" + new URLSearchParams({ changedURL: parameters.changedURL })
            return this.proxy("patch", finalUrl, parameters, body, ExperimentValidation.validatePatchExperimentsByExperimentIdInput, ExperimentValidation.validatePatchExperimentsByExperimentIdOutput)
        }
    }

    // Federation Service API calls

    public async getInstitutions(url?: string): Promise<InstitutionSignatures.getInstitutionsResponseType | FetchError> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.getInstitutions()
        } else {
            if (!isValidUrl(url, `/institutions`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, undefined, undefined, InstitutionValidation.validateGetInstitutionsInput, InstitutionValidation.validateGetInstitutionsOutput)
        }
    }

	public async postInstitutions(
        body: InstitutionSignatures.postInstitutionsBodyType,
        url?: string
    ): Promise<InstitutionSignatures.postInstitutionsResponseType | FetchError> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.postInstitutions(body)
        } else {
            if (!isValidUrl(url, `/institutions`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("post", url, undefined, body, InstitutionValidation.validatePostInstitutionsInput, InstitutionValidation.validatePostInstitutionsOutput)
        }
    }

	public async getInstitutionsByInstitutionId(
        parameters: InstitutionSignatures.getInstitutionsByInstitutionIdParametersType,
        url?: string
    ): Promise<InstitutionSignatures.getInstitutionsByInstitutionIdResponseType | FetchError> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.getInstitutionsByInstitutionId(parameters)
        } else {
            if (!isValidUrl(url, `/institutions/${parameters.institution_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("get", url, parameters, undefined, InstitutionValidation.validateGetInstitutionsByInstitutionIdInput, InstitutionValidation.validateGetInstitutionsByInstitutionIdOutput)
        }
    }

	public async deleteInstitutionsByInstitutionId(
        parameters: InstitutionSignatures.deleteInstitutionsByInstitutionIdParametersType,
        url?: string
    ): Promise<InstitutionSignatures.deleteInstitutionsByInstitutionIdResponseType | FetchError> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.deleteInstitutionsByInstitutionId(parameters)
        } else {
            if (!isValidUrl(url, `/institutions/${parameters.institution_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("delete", url, parameters, undefined, InstitutionValidation.validateDeleteInstitutionsByInstitutionIdInput, InstitutionValidation.validateDeleteInstitutionsByInstitutionIdOutput)
        }
    }

	public async patchInstitutionsByInstitutionId(
        parameters: InstitutionSignatures.patchInstitutionsByInstitutionIdParametersType, 
        body: InstitutionSignatures.patchInstitutionsByInstitutionIdBodyType,
        url?: string
    ): Promise<InstitutionSignatures.patchInstitutionsByInstitutionIdResponseType | FetchError> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.patchInstitutionsByInstitutionId(parameters, body)
        } else {
            if (!isValidUrl(url, `/institutions/${parameters.institution_id}`)) return {
                type: "validation",
                error: "URL is not valid for this operation"
            }
            return this.proxy("patch", url, parameters, body, InstitutionValidation.validatePatchInstitutionsByInstitutionIdInput, InstitutionValidation.validatePatchInstitutionsByInstitutionIdOutput)
        }
    }

    public async headProxy(
        parameters: ProxySignatures.headProxyParametersType
    ): Promise<ProxySignatures.headProxyResponseType | FetchError> {
        return this.federationClient.headProxy(parameters, undefined)
    }

	public async getProxy(
        parameters: ProxySignatures.getProxyParametersType,
        body: ProxySignatures.getProxyBodyType
    ): Promise<ProxySignatures.getProxyResponseType | FetchError> {
        return this.federationClient.getProxy(parameters, body)
    }

	public async putProxy(
        parameters: ProxySignatures.putProxyParametersType,
        body: ProxySignatures.putProxyBodyType
    ): Promise<ProxySignatures.putProxyResponseType | FetchError> {
        return this.federationClient.putProxy(parameters, body)
    }

	public async postProxy(
        parameters: ProxySignatures.postProxyParametersType,
        body: ProxySignatures.postProxyBodyType
    ): Promise<ProxySignatures.postProxyResponseType | FetchError> {
        return this.federationClient.postProxy(parameters, body)
    }

	public async deleteProxy(
        parameters: ProxySignatures.deleteProxyParametersType,
        body: ProxySignatures.deleteProxyBodyType
    ): Promise<ProxySignatures.deleteProxyResponseType | FetchError> {
        return this.federationClient.deleteProxy(parameters, body)
    }

	public async optionsProxy(
        parameters: ProxySignatures.optionsProxyParametersType
    ): Promise<ProxySignatures.optionsProxyResponseType | FetchError> {
        return this.federationClient.optionsProxy(parameters, undefined)
    }

	public async traceProxy(
        parameters: ProxySignatures.traceProxyParametersType
    ): Promise<ProxySignatures.traceProxyResponseType | FetchError> {
        return this.federationClient.traceProxy(parameters, undefined)
    }

	public async patchProxy(
        parameters: ProxySignatures.patchProxyParametersType,
        body: ProxySignatures.patchProxyBodyType
    ): Promise<ProxySignatures.patchProxyResponseType | FetchError> {
        return this.federationClient.patchProxy(parameters, body)
    }

    private async proxy<P extends {[k: string]: unknown}|undefined,B,R extends ResponseData,IV extends (par: P, body: B) => boolean,OV extends (res: ResponseData) => res is R>(
        method: "get" | "delete" | "post" | "put" | "patch" | "trace" | "options" | "head",
        url: string,
        parameters: P,
        body: B,
        validateInput: IV,
        validateOutput: OV
    ): Promise<R | FetchError> {
        if (!validateInput(parameters, body)) return {
            type: "validation",
            error: "Input validation failed!"
        }
        let response
        switch(method) {
            case "get":
                response = await this.federationClient.getProxy({ URL: url }, body)
                break
            case "delete":
                response = await this.federationClient.deleteProxy({ URL: url }, body)
                break
            case "head":
                response = await this.federationClient.headProxy({ URL: url }, body)
                break
            case "options":
                response = await this.federationClient.optionsProxy({ URL: url }, body)
                break
            case "patch":
                response = await this.federationClient.patchProxy({ URL: url }, body)
                break
            case "post":
                response = await this.federationClient.postProxy({ URL: url }, body)
                break
            case "put":
                response = await this.federationClient.putProxy({ URL: url }, body)
                break
            case "trace":
                response = await this.federationClient.traceProxy({ URL: url }, body)
                break
        }
        if (isFetchError(response)) return response
        if (!validateOutput(response)) return {
            type: "validation",
            error: "Output validation failed!"
        }
        return response
    }
}