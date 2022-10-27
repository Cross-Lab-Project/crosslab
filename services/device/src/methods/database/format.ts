import {
    ServiceConfig,
    DeviceReference,
    ConfiguredDeviceReference,
    PeerconnectionOverview,
    Peerconnection,
    ConcreteDevice,
    DeviceOverview,
    TimeSlot,
    DeviceGroup,
    InstantiableBrowserDevice,
    InstantiableCloudDevice,
} from '../../generated/types'
import {
    ServiceConfigModel,
    DeviceReferenceModel,
    PeerconnectionModel,
    ConcreteDeviceModel,
    DeviceOverviewModel,
    TimeSlotModel,
    DeviceGroupModel,
    InstantiableBrowserDeviceModel,
    InstantiableCloudDeviceModel,
    isConcreteDeviceModel,
    isDeviceGroupModel,
    isInstantiableBrowserDeviceModel,
    isInstantiableCloudDeviceModel,
} from '../../model'
import { InvalidValueError } from '../../types/errors'
import { DeviceModel, DeviceFromModel, Device } from '../../types/helper'
import {
    deviceUrlFromId,
    flattenDeviceGroup,
    peerconnectionUrlFromId,
    resolveDeviceReference,
} from '../utils'

// Devices

/**
 * This function attempts to format a given device model to its corresponding device type.
 * @param deviceModel The device model to be formatted.
 * @throws {InvalidValueError} Thrown if the given device model does not match any known device type.
 * @returns The formatted device model.
 */
export async function formatDevice<T extends DeviceModel>(
    deviceModel: T
): Promise<DeviceFromModel<T>> {
    if (isConcreteDeviceModel(deviceModel)) {
        return formatConcreteDevice(deviceModel) as DeviceFromModel<T>
    } else if (isDeviceGroupModel(deviceModel)) {
        return (await formatDeviceGroup(deviceModel)) as DeviceFromModel<T>
    } else if (isInstantiableBrowserDeviceModel(deviceModel)) {
        return formatInstantiableBrowserDevice(deviceModel) as DeviceFromModel<T>
    } else if (isInstantiableCloudDeviceModel(deviceModel)) {
        return formatInstantiableCloudDevice(deviceModel) as DeviceFromModel<T>
    } else {
        throw new InvalidValueError(
            'The device model to be formatted does not match any known device type',
            500
        )
    }
}

/**
 * This function formats a {@link TimeSlotModel} to a {@link TimeSlot}.
 * @param timeSlot The {@link TimeSlotModel} to be formatted.
 * @returns The resulting {@link TimeSlot}.
 */
export function formatTimeSlot(timeSlot: TimeSlotModel): TimeSlot {
    return {
        start: new Date(timeSlot.start).toISOString(),
        end: new Date(timeSlot.end).toISOString(),
    }
}

/**
 * This function formats a {@link DeviceOverviewModel} to a {@link DeviceOverview}.
 * @param device The {@link DeviceOverviewModel} to be formatted.
 * @returns The resulting {@link DeviceOverview}.
 */
export function formatDeviceOverview(device: DeviceOverviewModel): DeviceOverview {
    return {
        url: deviceUrlFromId(device.uuid),
        name: device.name,
        description: device.description,
        type: device.type,
        owner: device.owner,
    }
}

/**
 * This function formats a {@link ConcreteDeviceModel} to a {@link ConcreteDevice}.
 * @param device The {@link ConcreteDeviceModel} to be formatted.
 * @returns The resulting {@link ConcreteDevice}.
 */
function formatConcreteDevice(device: ConcreteDeviceModel): ConcreteDevice {
    return {
        url: deviceUrlFromId(device.uuid),
        name: device.name,
        description: device.description,
        type: device.type,
        owner: device.owner,
        announcedAvailability: device.announcedAvailability
            ? device.announcedAvailability.map(formatTimeSlot)
            : undefined,
        connected: device.connected !== undefined ? device.connected : undefined,
        experiment: device.experiment ? device.experiment : undefined,
        services: device.services
            ? device.services.map((sd) => JSON.parse(sd.description))
            : undefined,
    }
}

/**
 * This function formats a {@link DeviceGroupModel} to a {@link DeviceGroup}.
 * @param deviceGroup The {@link DeviceGroupModel} to be formatted.
 * @param flat_group If true then the formatted {@link DeviceGroup} will contain no further device groups.
 * @returns The resulting {@link DeviceGroup}.
 */
async function formatDeviceGroup(
    deviceGroup: DeviceGroupModel,
    flat_group: boolean = false
): Promise<DeviceGroup> {
    const devices: (Device)[] = []
    if (deviceGroup.devices) {
        for (const d of deviceGroup.devices) {
            const resolvedDevice = await resolveDeviceReference(d, flat_group)
            if (resolvedDevice) {
                if (resolvedDevice.type != 'group') devices.push(resolvedDevice)
                if (resolvedDevice.type == 'group' && !flat_group)
                    devices.push(resolvedDevice)
                if (resolvedDevice.type == 'group' && flat_group)
                    devices.push(...flattenDeviceGroup(resolvedDevice))
            }
        }
    }

    return {
        url: deviceUrlFromId(deviceGroup.uuid),
        name: deviceGroup.name,
        description: deviceGroup.description,
        type: deviceGroup.type,
        owner: deviceGroup.owner,
        devices: devices.filter((v, i, s) => s.findIndex((d) => d.url == v.url) == i),
    }
}

/**
 * This function formats a {@link InstantiableBrowserDeviceModel} to a {@link InstantiableBrowserDevice}.
 * @param instantiableBrowserDevice The {@link InstantiableBrowserDeviceModel} to be formatted.
 * @returns The resulting {@link InstantiableBrowserDevice}.
 */
function formatInstantiableBrowserDevice(
    instantiableBrowserDevice: InstantiableBrowserDeviceModel
): InstantiableBrowserDevice {
    return {
        url: deviceUrlFromId(instantiableBrowserDevice.uuid),
        name: instantiableBrowserDevice.name,
        description: instantiableBrowserDevice.description,
        type: instantiableBrowserDevice.type,
        owner: instantiableBrowserDevice.owner,
        code_url: instantiableBrowserDevice.codeUrl,
    }
}

/**
 * This function formats a {@link InstantiableCloudDeviceModel} to a {@link instantiableCloudDevice}.
 * @param instantiableCloudDevice The {@link InstantiableCloudDeviceModel} to be formatted.
 * @returns The resulting {@link instantiableCloudDevice}.
 */
function formatInstantiableCloudDevice(
    instantiableCloudDevice: InstantiableCloudDeviceModel
): InstantiableCloudDevice {
    return {
        url: deviceUrlFromId(instantiableCloudDevice.uuid),
        name: instantiableCloudDevice.name,
        description: instantiableCloudDevice.description,
        type: instantiableCloudDevice.type,
        owner: instantiableCloudDevice.owner,
        instantiate_url: instantiableCloudDevice.instantiateUrl,
    }
}

// Peerconnections

/**
 * This function formats a {@link ServiceConfigModel} to a {@link ServiceConfig}.
 * @param serviceConfig The {@link ServiceConfigModel} to be formatted.
 * @returns The resulting {@link ServiceConfig}.
 */
export function formatServiceConfig(serviceConfig: ServiceConfigModel): ServiceConfig {
    return {
        ...JSON.parse(serviceConfig.config ?? '{}'),
        serviceType: serviceConfig.serviceType,
        serviceId: serviceConfig.serviceId,
        remoteServiceId: serviceConfig.remoteServiceId,
    }
}

/**
 * This function formats a {@link DeviceReferenceModel} to a {@link DeviceReference}.
 * @param device The {@link DeviceReferenceModel} to be formatted.
 * @returns The resulting {@link DeviceReference}.
 */
export function formatDeviceReference(device: DeviceReferenceModel): DeviceReference {
    return {
        url: device.url,
    }
}

/**
 * This function formats a {@link DeviceReferenceModel} to a {@link ConfiguredDeviceReference}.
 * @param device The {@link DeviceReferenceModel} to be formatted.
 * @returns The resulting {@link ConfiguredDeviceReference}.
 */
export function formatConfiguredDeviceReference(
    device: DeviceReferenceModel
): ConfiguredDeviceReference {
    return {
        url: device.url,
        config: device.config
            ? {
                  services: device.config.map(formatServiceConfig),
              }
            : undefined,
    }
}

/**
 * This function formats a {@link PeerconnectionModel} to a {@link PeerconnectionOverview}.
 * @param peerconnection The {@link PeerconnectionModel} to be formatted.
 * @returns The resulting {@link PeerconnectionOverview}.
 */
export function formatPeerconnectionOverview(
    peerconnection: PeerconnectionModel
): PeerconnectionOverview {
    return {
        devices: [
            formatDeviceReference(peerconnection.deviceA),
            formatDeviceReference(peerconnection.deviceB),
        ],
        url: peerconnectionUrlFromId(peerconnection.uuid),
    }
}

/**
 * This function formats a {@link PeerconnectionModel} to a {@link Peerconnection}.
 * @param peerconnection The {@link PeerconnectionModel} to be formatted.
 * @returns The resulting {@link Peerconnection}.
 */
export function formatPeerconnection(
    peerconnection: PeerconnectionModel
): Peerconnection {
    return {
        devices: [
            formatConfiguredDeviceReference(peerconnection.deviceA),
            formatConfiguredDeviceReference(peerconnection.deviceB),
        ],
        url: peerconnectionUrlFromId(peerconnection.uuid),
    }
}
