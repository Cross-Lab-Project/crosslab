import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import {
    isConcreteDevice,
    isDeviceGroup,
    isInstantiableBrowserDevice,
    isInstantiableCloudDevice,
} from '../../../generated/types'
import { apiClient, timeoutMap } from '../../../globals'
import { signalingQueue } from '../../../methods/signaling'
import { MalformedBodyError, InvalidValueError } from '@crosslab/service-common'

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the device is not of type "device".
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
    callback: any
): Promise<200 | 410> {
    if (!callback.device) {
        throw new MalformedBodyError(
            'Event-callbacks of type "device-changed" require property "device"',
            400
        )
    }
    const device = callback.device
    if (
        !isConcreteDevice(device) &&
        !isDeviceGroup(device) &&
        !isInstantiableBrowserDevice(device) &&
        !isInstantiableCloudDevice(device)
    ) {
        throw new MalformedBodyError('Property "device" is not a valid device', 400)
    }
    if (!device.url) {
        throw new MalformedBodyError('Property "device" is missing url', 400)
    }
    if (!isConcreteDevice(device)) {
        throw new InvalidValueError(
            `Device needs to be of type "device" but is of type "${device.type}"`,
            400 // NOTE: error code
        )
    }
    const pendingConnectionsA = await peerconnectionRepository.find({
        where: {
            status: 'waiting-for-devices',
            deviceA: {
                url: device.url,
            },
        },
        relations: {
            deviceA: true,
            deviceB: true,
        },
    })
    const pendingConnectionsB = await peerconnectionRepository.find({
        where: {
            status: 'waiting-for-devices',
            deviceB: {
                url: device.url,
            },
        },
        relations: {
            deviceA: true,
            deviceB: true,
        },
    })
    const pendingConnections = [...pendingConnectionsA, ...pendingConnectionsB]
    if (pendingConnections.length === 0) {
        return 410 // TODO: check if 410 is the right choice here
    }
    for (const pendingConnection of pendingConnections) {
        const deviceA = await apiClient.getDevice(pendingConnection.deviceA.url)
        const deviceB = await apiClient.getDevice(pendingConnection.deviceB.url)

        if (deviceA.connected && deviceB.connected) {
            clearTimeout(timeoutMap.get(pendingConnection.uuid))
            signalingQueue.addPeerconnection(pendingConnection)
            timeoutMap.delete(pendingConnection.uuid)
        }
    }
    return pendingConnections.length === 0 ? 410 : 200
}
