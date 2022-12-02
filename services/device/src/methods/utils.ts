import { config } from '../config'
import {
    ConcreteDevice,
    DeviceGroup,
    InstantiableCloudDevice,
    InstantiableBrowserDevice,
} from '../generated/types'
import { apiClient } from '../globals'
import { DeviceReferenceModel } from '../model'

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
