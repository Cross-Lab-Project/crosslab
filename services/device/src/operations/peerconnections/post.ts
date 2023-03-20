import { peerconnectionRepository } from '../../database/repositories/peerconnection'
import { postPeerconnectionsSignature } from '../../generated/signatures'
import { apiClient, timeoutMap } from '../../globals'
import {
    callbackUrl,
    sendStatusChangedCallback,
    closedCallbacks,
    statusChangedCallbacks,
} from '../../methods/callbacks'
import { signalingQueue } from '../../methods/signaling'
import {
    MissingEntityError,
    InvalidValueError,
    MissingPropertyError,
} from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /peerconnections endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postPeerconnections: postPeerconnectionsSignature = async (
    parameters,
    body,
    _user
) => {
    console.log(`postPeerconnections called`)

    const peerconnection = await peerconnectionRepository.create(body)

    if (!peerconnection.deviceA.url || !peerconnection.deviceB.url) {
        throw new MissingEntityError(`One of the participating devices has no url`, 404)
    }

    await peerconnectionRepository.save(peerconnection)

    const deviceA = await apiClient.getDevice(peerconnection.deviceA.url)
    const deviceB = await apiClient.getDevice(peerconnection.deviceB.url)

    if (deviceA.type !== 'device' || deviceB.type !== 'device') {
        throw new InvalidValueError(
            `Cannot establish a peerconnection between devices of type "${deviceA.type}" and "${deviceB.type}"`,
            400
        )
    }

    if (!deviceA.url || !deviceB.url) {
        throw new MissingPropertyError(
            `One of the resolved devices does not have an url`,
            500
        ) // NOTE: error code
    }

    if (deviceA.connected && deviceB.connected) {
        // peerconnection can be started directly
        signalingQueue.addPeerconnection(peerconnection)
    } else {
        // need to wait for devices to connect
        // register changed callbacks for devices to get notified when they connect
        const n_deviceA = await apiClient.updateDevice(
            deviceA.url,
            {},
            { changedUrl: callbackUrl }
        )
        const n_deviceB = await apiClient.updateDevice(
            deviceB.url,
            {},
            { changedUrl: callbackUrl }
        )

        // check that devices still have the correct type
        if (n_deviceA.type !== 'device' || n_deviceB.type !== 'device') {
            throw new InvalidValueError(
                `The type of device ${
                    deviceA.type !== 'device' ? deviceA.url : deviceB.url
                } is not "device" anymore`,
                400
            )
        }

        // set timeout for checking if devices are connected
        timeoutMap.set(
            peerconnection.uuid,
            setTimeout(async () => {
                console.log('devices did not connect')
                peerconnection.status = 'failed'
                await peerconnectionRepository.save(peerconnection)
                await sendStatusChangedCallback(peerconnection)
            }, 30000)
        )
    }

    if (parameters.closedUrl) {
        console.log(
            `postPeerconnections: registering closed-callback for ${parameters.closedUrl}`
        )
        const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid) ?? []
        closedCallbackURLs.push(parameters.closedUrl)
        closedCallbacks.set(peerconnection.uuid, closedCallbackURLs)
    }

    if (parameters.statusChangedUrl) {
        console.log(
            `postPeerconnections: registering status-changed-callback for ${parameters.statusChangedUrl}`
        )
        const statusChangedCallbackURLs =
            statusChangedCallbacks.get(peerconnection.uuid) ?? []
        statusChangedCallbackURLs.push(parameters.statusChangedUrl)
        statusChangedCallbacks.set(peerconnection.uuid, statusChangedCallbackURLs)
    }

    console.log(`postPeerconnections succeeded`)

    return {
        status: peerconnection.status === 'connected' ? 201 : 202,
        body: await peerconnectionRepository.format(peerconnection),
    }
}
