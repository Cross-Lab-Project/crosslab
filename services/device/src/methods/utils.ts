import { config } from '../config'
import { AppDataSource } from '../data_source'
import { DeviceOverview, ConcreteDevice, DeviceGroup } from '../generated/types'
import { apiClient } from '../globals'
import { DeviceReferenceModel, ConcreteDeviceModel, DeviceGroupModel } from '../model'
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
 * This function resolves a reference to a device.
 * @param reference The reference to be resolved.
 * @param flat_group If true then the resolved device group will only contain concrete devices.
 * @returns The resolved device.
 */
export async function resolveDeviceReference(
    reference: DeviceReferenceModel,
    flat_group: boolean = false
): Promise<ConcreteDevice | DeviceGroup | undefined> {
    if (reference.url) {
        const deviceId = reference.url.split('/').at(-1)
        if (!deviceId) return undefined
        console.log('resolving device', reference.url, config.BASE_URL)
        return await apiClient.getDevice(reference.url, flat_group)
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
): Promise<ConcreteDeviceModel | DeviceGroupModel | undefined> {
    const concreteDeviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
    const deviceGroupRepository = AppDataSource.getRepository(DeviceGroupModel)
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

    if (concreteDevice && deviceGroup)
        throw new InconsistentDatabaseError('Multiple devices found for same uuid')
    if (concreteDevice) return concreteDevice
    if (deviceGroup) return deviceGroup
    return undefined
}
