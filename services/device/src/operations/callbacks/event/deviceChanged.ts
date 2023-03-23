import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import {
    ConcreteDevice,
    isConcreteDevice,
    isDeviceGroup,
    isInstantiableBrowserDevice,
    isInstantiableCloudDevice,
} from '../../../generated/types'
import { apiClient, timeoutMap } from '../../../globals'
import { signalingQueue } from '../../../methods/signaling'
import { MalformedBodyError } from '@crosslab/service-common'

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(callback: {
    [k: string]: unknown
}): Promise<200 | 410> {
    if (!callback.device) {
        throw new MalformedBodyError(
            "Event-callbacks of type 'device-changed' require property 'device'",
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

    if (isConcreteDevice(device)) {
        return await handleConcreteDevice(device)
    } else {
        return 410
    }
}

async function handleConcreteDevice(concreteDevice: ConcreteDevice) {
    const pendingConnectionsA = await peerconnectionRepository.find({
        where: {
            status: 'connecting',
            deviceA: {
                url: concreteDevice.url,
            },
        },
    })

    const pendingConnectionsB = await peerconnectionRepository.find({
        where: {
            status: 'connecting',
            deviceB: {
                url: concreteDevice.url,
            },
        },
    })

    const pendingConnections = [...pendingConnectionsA, ...pendingConnectionsB]

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
