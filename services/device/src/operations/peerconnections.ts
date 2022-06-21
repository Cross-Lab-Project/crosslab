import { config } from "../config"
import { AppDataSource } from "../data_source"
import {
    getPeerconnectionsSignature,
	postPeerconnectionsSignature,
	getPeerconnectionsByPeerconnectionIdSignature,
	deletePeerconnectionsByPeerconnectionIdSignature
} from "../generated/signatures/peerconnections"
import { Peerconnection, ServiceConfig } from "../generated/types"
import { ConfiguredDeviceReferenceModel, DeviceReferenceModel, PeerconnectionModel, ServiceConfigModel } from "../model"

const PeerconnectionBaseURL = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'peerconnections/'

function isConfiguredDeviceReferenceModel(device: DeviceReferenceModel): device is ConfiguredDeviceReferenceModel {
    return Object.keys(device).includes("config")
}

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
        config: isConfiguredDeviceReferenceModel(device) ? 
            (device.config ? { services: device.config.map(formatServiceConfig) } : undefined)
            : undefined
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
    configuredDeviceReference: ConfiguredDeviceReferenceModel, 
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
                // serviceConfig.device = configuredDeviceReference
                await serviceConfigRepository.save(serviceConfig)
                configuredDeviceReference.config.push(serviceConfig)
            }
        }
    }
}

async function writePeerconnection(peerconnection: PeerconnectionModel, object: Peerconnection) {
    if (object.devices) {
        const configuredDeviceReferenceRepository = AppDataSource.getRepository(ConfiguredDeviceReferenceModel)
        const configuredDeviceReferenceA = configuredDeviceReferenceRepository.create()
        const configuredDeviceReferenceB = configuredDeviceReferenceRepository.create()
        await writeConfiguredDeviceReference(configuredDeviceReferenceA, object.devices[0])
        await writeConfiguredDeviceReference(configuredDeviceReferenceB, object.devices[1])
        await configuredDeviceReferenceRepository.save(configuredDeviceReferenceA)
        await configuredDeviceReferenceRepository.save(configuredDeviceReferenceB)
        peerconnection.deviceA = configuredDeviceReferenceA
        peerconnection.deviceB = configuredDeviceReferenceB
    }
}

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

export const postPeerconnections: postPeerconnectionsSignature = async (_parameters, body, _user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnection = peerconnectionRepository.create()
    await writePeerconnection(peerconnection, body)
    await peerconnectionRepository.save(peerconnection)

    return {
        status: 201,
        body: formatPeerconnection(peerconnection)
    }
}

export const getPeerconnectionsByPeerconnectionId: getPeerconnectionsByPeerconnectionIdSignature = async (parameters, _user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const peerconnection = await peerconnectionRepository.findOne({ 
        where: {
            uuid: parameters.path.peerconnection_id 
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

export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature = async (parameters, _user) => {
    const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
    const result = await peerconnectionRepository.softDelete({ uuid: parameters.path.peerconnection_id })

    if (!result.affected) {
        return {
            status: 404
        }
    }
    
    if (result.affected > 1) {
        // TBD
    }

    return {
        status: 204
    }
}
