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
import { InvalidValueError } from '@crosslab/service-common'

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

    const peerconnectionModel = await peerconnectionRepository.create(body)

    await peerconnectionRepository.save(peerconnectionModel)

    const deviceA = await apiClient.getDevice(peerconnectionModel.deviceA.url)
    const deviceB = await apiClient.getDevice(peerconnectionModel.deviceB.url)

    if (deviceA.type !== 'device' || deviceB.type !== 'device') {
        throw new InvalidValueError(
            `Cannot establish a peerconnection between devices of type '${deviceA.type}' and '${deviceB.type}'`,
            400
        )
    }

    if (deviceA.connected && deviceB.connected) {
        // peerconnection can be started directly
        signalingQueue.addPeerconnection(peerconnectionModel)
    } else {
        // need to wait for devices to connect
        // register changed callbacks for devices to get notified when they connect
        const n_deviceA = await apiClient.updateDevice(
            deviceA.url,
            { type: 'device' },
            { changedUrl: callbackUrl }
        )
        const n_deviceB = await apiClient.updateDevice(
            deviceB.url,
            { type: 'device' },
            { changedUrl: callbackUrl }
        )

        // check that devices still have the correct type
        if (n_deviceA.type !== 'device' || n_deviceB.type !== 'device') {
            throw new InvalidValueError(
                `Cannot establish a peerconnection between devices of type '${deviceA.type}' and '${deviceB.type}'`,
                400
            )
        }

        // set timeout for checking if devices are connected
        timeoutMap.set(
            peerconnectionModel.uuid,
            setTimeout(async () => {
                try {
                    console.log('devices did not connect')
                    peerconnectionModel.status = 'failed'
                    await peerconnectionRepository.save(peerconnectionModel)
                    await sendStatusChangedCallback(peerconnectionModel)
                } catch (error) {
                    console.error(error)
                }
            }, 30000)
        )
    }

    if (parameters.closedUrl) {
        console.log(
            `postPeerconnections: registering closed-callback for '${parameters.closedUrl}'`
        )
        const closedCallbackURLs = closedCallbacks.get(peerconnectionModel.uuid) ?? []
        closedCallbackURLs.push(parameters.closedUrl)
        closedCallbacks.set(peerconnectionModel.uuid, closedCallbackURLs)
    }

    if (parameters.statusChangedUrl) {
        console.log(
            `postPeerconnections: registering status-changed-callback for '${parameters.statusChangedUrl}'`
        )
        const statusChangedCallbackURLs =
            statusChangedCallbacks.get(peerconnectionModel.uuid) ?? []
        statusChangedCallbackURLs.push(parameters.statusChangedUrl)
        statusChangedCallbacks.set(peerconnectionModel.uuid, statusChangedCallbackURLs)
    }

    console.log(`postPeerconnections succeeded`)

    return {
        status: peerconnectionModel.status === 'connected' ? 201 : 202,
        body: await peerconnectionRepository.format(peerconnectionModel),
    }
}
