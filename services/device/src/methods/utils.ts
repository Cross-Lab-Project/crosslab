import { config } from '../config'
import { AppDataSource } from '../data_source'
import {
    DeviceOverview,
    ConcreteDevice,
    DeviceGroup,
    InstantiableCloudDevice,
    InstantiableBrowserDevice,
} from '../generated/types'
import { apiClient } from '../globals'
import {
    DeviceReferenceModel,
    ConcreteDeviceModel,
    DeviceGroupModel,
    InstantiableBrowserDeviceModel,
    InstantiableCloudDeviceModel,
} from '../model'
import { InconsistentDatabaseError } from '../types/errors'

/**
 * This function builds the url of a device using its id.
 * @param deviceÍd The id of the device.
 * @returns The url of the device.
 */
export function deviceUrlFromId(deviceÍd: string): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'devices/' +
        deviceÍd
    )
}

/**
 * This function builds the url of a peerconnection using its id.
 * @param peerconnectionId The id of the peerconnection.
 * @returns The url of the peerconnection.
 */
export function peerconnectionUrlFromId(peerconnectionId: string): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'peerconnections/' +
        peerconnectionId
    )
}

/**
 * This function checks if a {@link DeviceOverview} is a {@link ConcreteDevice}.
 * @param device The {@link DeviceOverview} to be checked.
 * @returns True if the {@link DeviceOverview} is a {@link ConcreteDevice}, else false.
 */
export function isConcreteDevice(device: DeviceOverview): device is ConcreteDevice {
    return device.type == 'device'
}

/**
 * This function checks if a {@link DeviceOverview} is a {@link DeviceGroup}.
 * @param device The {@link DeviceOverview} to be checked.
 * @returns True if the {@link DeviceOverview} is a {@link DeviceGroup}, else false.
 */
export function isDeviceGroup(device: DeviceOverview): device is DeviceGroup {
    return device.type == 'group'
}

/**
 * This function checks if a {@link DeviceOverview} is a {@link InstantiableCloudDevice}.
 * @param device The {@link DeviceOverview} to be checked.
 * @returns True if the {@link DeviceOverview} is a {@link InstantiableCloudDevice}, else false.
 */
export function isInstantiableCloudDevice(
    device: DeviceOverview
): device is InstantiableCloudDevice {
    return device.type == 'cloud instantiable'
}

/**
 * This function checks if a {@link DeviceOverview} is a {@link InstantiableBrowserDevice}.
 * @param device The {@link DeviceOverview} to be checked.
 * @returns True if the {@link DeviceOverview} is a {@link InstantiableBrowserDevice}, else false.
 */
export function isInstantiableBrowserDevice(
    device: DeviceOverview
): device is InstantiableBrowserDevice {
    return device.type == 'edge instantiable'
}

/**
 * This function resolves a reference to a device.
 * @param reference The reference to be resolved.
 * @param flat_group If true then the resolved device group will contain no further device groups.
 * @returns The resolved device.
 */
export async function resolveDeviceReference(
    reference: DeviceReferenceModel,
    flat_group: boolean = false
): Promise<
    | ConcreteDevice
    | DeviceGroup
    | InstantiableCloudDevice
    | InstantiableBrowserDevice
    | undefined
> {
    if (reference.url) {
        const deviceId = reference.url.split('/').at(-1)
        if (!deviceId) return undefined
        console.log('resolving device', reference.url, config.BASE_URL)
        try {
            return await apiClient.getDevice(reference.url, { flat_group })
        } catch (error) {
            return undefined
        }
    }

    return undefined
}

/**
 * This function flattens a device group.
 * @param deviceGroup The device group to be flattened
 * @returns The device group containing only concrete devices.
 */
export function flattenDeviceGroup(deviceGroup: DeviceGroup): ConcreteDevice[] {
    const devices: ConcreteDevice[] = []

    if (deviceGroup.devices) {
        for (const device of deviceGroup.devices) {
            if (!device.type) continue
            if (device.type == 'device') devices.push(device)
            if (device.type == 'edge instantiable') devices.push(device)
            if (device.type == 'cloud instantiable') devices.push(device)
            if (device.type == 'group') devices.push(...flattenDeviceGroup(device))
        }
    }

    return devices
}

/**
 * This function retrieves a device from the database by its UUID.
 * @param uuid The UUID of the device to be retrieved.
 * @throws {InconsistentDatabaseError} Thrown if device is found as multiple types.
 * @returns The retrieved device.
 */
export async function getDeviceModelByUUID(
    uuid: string
): Promise<
    | ConcreteDeviceModel
    | DeviceGroupModel
    | InstantiableBrowserDeviceModel
    | InstantiableCloudDeviceModel
    | undefined
> {
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
    const instantiableBrowserDeviceRepository = AppDataSource.getRepository(
        InstantiableBrowserDeviceModel
    )
    const instantiableCloudDeviceRepository = AppDataSource.getRepository(
        InstantiableCloudDeviceModel
    )
    const concreteDevice = await concreteDeviceRepository.findOne({
        where: {
            uuid: uuid,
        },
        relations: {
            announcedAvailability: true,
        },
    })
    const deviceGroup = await deviceGroupRepository.findOne({
        where: {
            uuid: uuid,
        },
        relations: {
            devices: true,
        },
    })
    const instantiableBrowserDevice = await instantiableBrowserDeviceRepository.findOne({
        where: {
            uuid: uuid,
        },
    })
    const instantiableCloudDevice = await instantiableCloudDeviceRepository.findOne({
        where: {
            uuid: uuid,
        },
    })

    if (
        (concreteDevice && deviceGroup) ||
        (concreteDevice && instantiableBrowserDevice) ||
        (concreteDevice && instantiableCloudDevice) ||
        (deviceGroup && instantiableBrowserDevice) ||
        (deviceGroup && instantiableCloudDevice) ||
        (instantiableBrowserDevice && instantiableCloudDevice)
    )
        throw new InconsistentDatabaseError('Multiple devices found for same uuid')

    if (concreteDevice) return concreteDevice
    if (deviceGroup) return deviceGroup
    if (instantiableBrowserDevice) return instantiableBrowserDevice
    if (instantiableCloudDevice) return instantiableCloudDevice
    return undefined
}
