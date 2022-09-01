import { AppDataSource } from '../data_source'
import {
    ServiceConfig,
    ConfiguredDeviceReference,
    Peerconnection,
    AvailabilityRule,
    DeviceOverview,
    ConcreteDevice,
    DeviceGroup,
} from '../generated/types'
import { YEAR } from '../globals'
import {
    ServiceConfigModel,
    DeviceReferenceModel,
    PeerconnectionModel,
    DeviceOverviewModel,
    AvailabilityRuleModel,
    ConcreteDeviceModel,
    DeviceGroupModel,
} from '../model'
import { applyAvailabilityRules } from './availability'

// Devices

/**
 * This function writes the data of an {@link AvailabilityRule} to an {@link AvailabilityRuleModel}.
 * @param availabilityRuleModel The {@link AvailabilityRuleModel} the data should be written to.
 * @param availabilityRule The {@link AvailabilityRule} providing the data to be written.
 */
export function writeAvailabilityRule(
    availabilityRuleModel: AvailabilityRuleModel,
    availabilityRule: AvailabilityRule
) {
    availabilityRuleModel.available = availabilityRule.available ?? true
    availabilityRuleModel.start = availabilityRule.start
        ? new Date(availabilityRule.start).getTime()
        : undefined
    availabilityRuleModel.end = availabilityRule.end
        ? new Date(availabilityRule.end).getTime()
        : undefined
    if (availabilityRule.repeat) {
        availabilityRuleModel.frequency = availabilityRule.repeat.frequency
        availabilityRuleModel.until = availabilityRule.repeat.until
            ? new Date(availabilityRule.repeat.until).getTime()
            : undefined
        availabilityRuleModel.count = availabilityRule.repeat.count
    }
}

/**
 * This function writes the data of a {@link ConcreteDevice} to a {@link ConcreteDeviceModel}.
 * @param concreteDeviceModel The {@link ConcreteDeviceModel} the data should be written to.
 * @param concreteDevice The {@link ConcreteDevice} providing the data to be written.
 */
export function writeConcreteDevice(
    concreteDeviceModel: ConcreteDeviceModel,
    concreteDevice: ConcreteDevice & { announcedAvailability?: AvailabilityRule[] }
) {
    writeDeviceOverview(concreteDeviceModel, concreteDevice)

    concreteDeviceModel.connected = false
    concreteDeviceModel.token = undefined
    concreteDeviceModel.experiment = concreteDevice.experiment

    if (concreteDevice.announcedAvailability) {
        if (!concreteDeviceModel.availabilityRules)
            concreteDeviceModel.availabilityRules = []
        const availabilityRuleRepository =
            AppDataSource.getRepository(AvailabilityRuleModel)
        for (const availabilityRule of concreteDevice.announcedAvailability) {
            const availabilityRuleModel = availabilityRuleRepository.create()
            writeAvailabilityRule(availabilityRuleModel, availabilityRule)
            concreteDeviceModel.availabilityRules.push(availabilityRuleModel)
        }
    }

    if (!concreteDeviceModel.announcedAvailability)
        concreteDeviceModel.announcedAvailability = []
    if (concreteDeviceModel.availabilityRules) {
        concreteDeviceModel.announcedAvailability = []
        const start = Date.now()
        const end = start + YEAR
        concreteDeviceModel.announcedAvailability = applyAvailabilityRules(
            concreteDeviceModel.announcedAvailability,
            concreteDeviceModel.availabilityRules,
            start,
            end
        )
    }
}

/**
 * This function writes the data of a {@link DeviceGroup} to a {@link DeviceGroupModel}.
 * @param deviceGroupModel The {@link DeviceGroupModel} the data should be written to.
 * @param deviceGroup The {@link DeviceGroup} providing the data to be written.
 */
export function writeDeviceGroup(
    deviceGroupModel: DeviceGroupModel,
    deviceGroup: DeviceGroup
) {
    writeDeviceOverview(deviceGroupModel, deviceGroup)

    if (deviceGroup.devices) {
        if (!deviceGroupModel.devices) deviceGroupModel.devices = []
        const deviceReferenceRepository =
            AppDataSource.getRepository(DeviceReferenceModel)
        for (const deviceReference of deviceGroup.devices) {
            const deviceReferenceModel = deviceReferenceRepository.create()
            deviceReferenceModel.url = deviceReference.url ?? ''
            deviceGroupModel.devices.push(deviceReferenceModel)
        }
    }
}

/**
 * This function writes the data of a {@link DeviceOverview} to a {@link DeviceOverviewModel}.
 * @param deviceOverviewModel The {@link DeviceOverviewModel} the data should be written to.
 * @param deviceOverview The {@link DeviceOverview} providing the data to be written.
 */
export function writeDeviceOverview(
    deviceOverviewModel: DeviceOverviewModel,
    deviceOverview: DeviceOverview
) {
    deviceOverviewModel.name = deviceOverview.name
    deviceOverviewModel.description = deviceOverview.description
    deviceOverviewModel.type = deviceOverview.type
}

// Peerconnections

/**
 * This function writes the data of a {@link ServiceConfig} to a {@link ServiceConfigModel}.
 * @param serviceConfigModel The {@link ServiceConfigModel} the data should be written to.
 * @param serviceConfig The {@link ServiceConfig} providing the data to be written.
 */
export function writeServiceConfig(
    serviceConfigModel: ServiceConfigModel,
    serviceConfig: ServiceConfig
) {
    serviceConfigModel.serviceType = serviceConfig.serviceType
    serviceConfigModel.serviceId = serviceConfig.serviceId
    serviceConfigModel.remoteServiceId = serviceConfig.remoteServiceId
    serviceConfigModel.config = JSON.stringify(serviceConfig)
}

/**
 * This function writes the data of a {@link ConfiguredDeviceReference} to a {@link DeviceReferenceModel}.
 * @param configuredDeviceReferenceModel The {@link DeviceReferenceModel} the data should be written to.
 * @param configuredDeviceReference The {@link ConfiguredDeviceReference} providing the data to be written.
 */
export async function writeConfiguredDeviceReference(
    configuredDeviceReferenceModel: DeviceReferenceModel,
    configuredDeviceReference: ConfiguredDeviceReference
) {
    const serviceConfigRepository = AppDataSource.getRepository(ServiceConfigModel)

    if (configuredDeviceReference.url)
        configuredDeviceReferenceModel.url = configuredDeviceReference.url
    if (configuredDeviceReference.config && configuredDeviceReference) {
        if (configuredDeviceReference.config.services) {
            configuredDeviceReferenceModel.config = []
            for (const serviceConfig of configuredDeviceReference.config.services) {
                const serviceConfigModel = serviceConfigRepository.create()
                writeServiceConfig(serviceConfigModel, serviceConfig)
                configuredDeviceReferenceModel.config.push(serviceConfigModel)
            }
        }
    }
}

/**
 * This function writes the data of a {@link Peerconnection} to a {@link PeerconnectionModel}.
 * @param peerconnectionModel The {@link PeerconnectionModel} the data should be written to.
 * @param peerconnection The {@link Peerconnection} providing the data to be written.
 */
export async function writePeerconnection(
    peerconnectionModel: PeerconnectionModel,
    peerconnection: Peerconnection
) {
    if (peerconnection.devices) {
        const deviceReferenceRepository =
            AppDataSource.getRepository(DeviceReferenceModel)
        const deviceReferenceA = deviceReferenceRepository.create()
        const deviceReferenceB = deviceReferenceRepository.create()
        await writeConfiguredDeviceReference(deviceReferenceA, peerconnection.devices[0])
        await writeConfiguredDeviceReference(deviceReferenceB, peerconnection.devices[1])
        peerconnectionModel.deviceA = deviceReferenceA
        peerconnectionModel.deviceB = deviceReferenceB
    }
}
