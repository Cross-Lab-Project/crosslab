import { ConcreteDeviceModel } from '../database/model'
import { SignalingMessage, Message, isSignalingMessage } from '../generated/types'
import { apiClient } from '../globals'
import { deviceUrlFromId } from './utils'
import {
    MissingPropertyError,
    UnrelatedPeerconnectionError,
} from '@crosslab/service-common'

/**
 * This function handles a message for a device.
 * @param device The device for which to handle the message.
 * @param message The message to be handled.
 */
export function handleDeviceMessage(device: ConcreteDeviceModel, message: Message) {
    if (isSignalingMessage(message)) {
        handleSignalingMessage(device, message)
    }
}

/**
 * This function handles a signaling message for a device.
 * @param device The device for which to handle the signaling message.
 * @param message The signaling message to be handled.
 */
async function handleSignalingMessage(
    device: ConcreteDeviceModel,
    message: SignalingMessage
) {
    const peerconnection = await apiClient.getPeerconnection(message.connectionUrl)

    if (!peerconnection.devices)
        throw new MissingPropertyError('Peerconnection has no devices')

    const deviceA = peerconnection.devices[0]
    const deviceB = peerconnection.devices[1]

    let peerDeviceUrl
    if (deviceA.url === deviceUrlFromId(device.uuid)) {
        peerDeviceUrl = deviceB.url
    } else if (deviceB.url === deviceUrlFromId(device.uuid)) {
        peerDeviceUrl = deviceA.url
    } else {
        throw new UnrelatedPeerconnectionError(
            'Device is not taking part in peerconnection.'
        )
    }

    if (!peerDeviceUrl) throw new MissingPropertyError('Peer device is missing its url')

    try {
        await apiClient.sendSignalingMessage(
            peerDeviceUrl,
            message,
            message.connectionUrl
        )
    } catch (error) {
        console.error(
            'Something went wrong while trying to send the signaling message:',
            error
        )
    }
}
