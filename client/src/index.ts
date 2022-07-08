import {
    APIClient as BookingClient,
    SignaturesBooking as BookingSignatures,
    Types as BookingTypes
} from "./generated/booking"

import {
    APIClient as DeviceClient,
    SignaturesDevices as DeviceSignatures,
    SignaturesPeerconnections as PeerconnectionSignatures,
    Types as DeviceTypes
} from "./generated/device"

import {
    APIClient as ExperimentClient,
    SignaturesExperiments as ExperimentSignatures,
    Types as ExperimentTypes
} from "./generated/experiment"

import {
    APIClient as FederationClient,
    SignaturesInstitutions as InstitutionSignatures,
    SignaturesProxy as ProxySignatures,
    Types as FederationTypes
} from "./generated/federation"

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

export class APIClient {
    public bookingClient: BookingClient
    public deviceClient: DeviceClient
    public experimentClient: ExperimentClient
    public federationClient: FederationClient
    
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
}