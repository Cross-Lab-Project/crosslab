import { config } from "../config"
import { AppDataSource } from "../data_source"
import {
    getPeerconnectionsSignature,
	postPeerconnectionsSignature,
	getPeerconnectionsByPeerconnectionIdSignature,
	deletePeerconnectionsByPeerconnectionIdSignature
} from "../generated/signatures/peerconnections"
import { Peerconnection, ServiceConfig } from "../generated/types"
import { DeviceReferenceModel, PeerconnectionModel, ServiceConfigModel } from "../model"
import { CreatePeerConnectionMessage } from "./deviceMessages"
import { connectedDevices, DeviceBaseURL } from "./devices"

const PeerconnectionBaseURL = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'peerconnections/'
const closedCallbacks = new Map<string,Array<string>>()

function formatServiceConfig(serviceConfig: ServiceConfigModel): ServiceConfig {
    return {
        serviceType: serviceConfig.serviceType,
        serviceId: serviceConfig.serviceId,
        remoteServiceId: serviceConfig.remoteServiceId
    }
}

function formatDevice(device: DeviceReferenceModel) {
    return {
        url: device.url,
        config: device.config ? { services: device.config.map(formatServiceConfig) } : undefined
    }
}

function formatPeerconnection(peerconnection: PeerconnectionModel): Peerconnection {
    return {
        devices: [formatDevice(peerconnection.deviceA), formatDevice(peerconnection.deviceB)],
        url: PeerconnectionBaseURL + peerconnection.uuid
    }
}

function writeServiceConfig(serviceConfig: ServiceConfigModel, object: ServiceConfig) {
    if (object.serviceType)
        serviceConfig.serviceType = object.serviceType
    if (object.serviceId)
        serviceConfig.serviceId = object.serviceId
    if (object.remoteServiceId)
        serviceConfig.remoteServiceId = object.remoteServiceId
}

async function writeConfiguredDeviceReference(
    configuredDeviceReference: DeviceReferenceModel, 
    object: {
        url?: string
        config?: {
            services?: ServiceConfig[]
        }
    }
) {
    if (object.url)
        configuredDeviceReference.url = object.url
    if (object.config) {
        if (object.config.services) {
            const serviceConfigRepository = AppDataSource.getRepository(ServiceConfigModel)
            configuredDeviceReference.config = []
            for (const config of object.config.services) {
                const serviceConfig = serviceConfigRepository.create()
                writeServiceConfig(serviceConfig, config)
                // await serviceConfigRepository.save(serviceConfig)
                configuredDeviceReference.config.push(serviceConfig)
            }
        }
    }
}

async function writePeerconnection(peerconnection: PeerconnectionModel, object: Peerconnection) {
    if (object.devices) {
        const deviceReferenceRepository = AppDataSource.getRepository(DeviceReferenceModel)
        const deviceReferenceA = deviceReferenceRepository.create()
        const deviceReferenceB = deviceReferenceRepository.create()
        await writeConfiguredDeviceReference(deviceReferenceA, object.devices[0])
        await writeConfiguredDeviceReference(deviceReferenceB, object.devices[1])
        // await deviceReferenceRepository.save(deviceReferenceA)
        // await deviceReferenceRepository.save(deviceReferenceB)
        peerconnection.deviceA = deviceReferenceA
        peerconnection.deviceB = deviceReferenceB
    }
}

// TODO: maybe resolve devices further?
export const getPeerconnections: getPeerconnectionsSignature = async (_user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnections = await peerconnectionRepository.find({ 
        relations: {
            deviceA: { 
                config: true
            },
            deviceB: { 
                config: true
            },
        }
    })

    return {
        status: 200,
        body: peerconnections.map(formatPeerconnection)
    }
}

export const postPeerconnections: postPeerconnectionsSignature = async (parameters, body, _user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnection = peerconnectionRepository.create()
    await writePeerconnection(peerconnection, body)

    if (!peerconnection.deviceA.url || !peerconnection.deviceB.url) return {
        status: 404
    }
    const idDeviceA = peerconnection.deviceA.url.split("/").at(-1)
    const idDeviceB = peerconnection.deviceB.url.split("/").at(-1)
    
    if (peerconnection.deviceA.url.startsWith(DeviceBaseURL) && peerconnection.deviceB.url.startsWith(DeviceBaseURL)) {
        // connection between local devices
        const wsDeviceA = idDeviceA ? connectedDevices.get(idDeviceA) : undefined
        const wsDeviceB = idDeviceB ? connectedDevices.get(idDeviceB) : undefined
        if (!wsDeviceA || !wsDeviceB) {
            return {
                status: 404
            }
        }
        const common = <CreatePeerConnectionMessage> {
            messageType: "command",
            command: "createPeerConnection",
            connectiontype: "webrtc",
            id: peerconnection.uuid
        }
        wsDeviceA.send(JSON.stringify(<CreatePeerConnectionMessage>{...common, services: peerconnection.deviceA.config?.map(formatServiceConfig), tiebreaker: true}))
        wsDeviceB.send(JSON.stringify(<CreatePeerConnectionMessage>{...common, services: peerconnection.deviceB.config?.map(formatServiceConfig), tiebreaker: false}))
    } else {
        // connection containing at least one remote device
        throw("Peerconnections using remote devices are currently not supported!")
    }

    await peerconnectionRepository.save(peerconnection)

    if (parameters.closedUrl) {
        const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid) ?? []
        closedCallbackURLs.push(parameters.closedUrl)
        closedCallbacks.set(peerconnection.uuid, closedCallbackURLs)
    }

    return {
        status: 201,
        body: formatPeerconnection(peerconnection)
    }
}

export const getPeerconnectionsByPeerconnectionId: getPeerconnectionsByPeerconnectionIdSignature = async (parameters, _user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnection = await peerconnectionRepository.findOne({ 
        where: {
            uuid: parameters.peerconnection_id 
        },
        relations: {
            deviceA: { 
                config: true
            },
            deviceB: { 
                config: true
            },
        }
    })

    if (!peerconnection) {
        return {
            status: 404
        }
    }

    return {
        status: 200,
        body: formatPeerconnection(peerconnection)
    }
}

// TODO: send close message to devices?
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature = async (parameters, _user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const result = await peerconnectionRepository.softDelete({ uuid: parameters.peerconnection_id })

    if (!result.affected) {
        return {
            status: 404
        }
    }
    
    if (result.affected > 1) {
        throw("Deleted Multiple Peerconnection with same uuid")
    }

    return {
        status: 204
    }
}
