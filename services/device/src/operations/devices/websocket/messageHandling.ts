import { ConcreteDeviceModel } from '../../../database/model'
import {
    SignalingMessage,
    Message,
    isSignalingMessage,
    isConnectionStateChangedMessage,
    ConnectionStateChangedMessage,
} from '../../../generated/types'
import { apiClient } from '../../../globals'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import { UnrelatedPeerconnectionError } from '@crosslab/service-common'

/**
 * This function handles a message for a device.
 * @param deviceModel The device for which to handle the message.
 * @param message The message to be handled.
 */
export async function handleDeviceMessage(
    deviceModel: ConcreteDeviceModel,
    message: Message
) {
    if (isSignalingMessage(message)) {
        await handleSignalingMessage(deviceModel, message)
    } else if (isConnectionStateChangedMessage(message)) {
        await handleConnectionStateChangedMessage(deviceModel, message)
    }
}

/**
 * This function handles a signaling message for a device.
 * @param deviceModel The device for which to handle the signaling message.
 * @param message The signaling message to be handled.
 */
async function handleSignalingMessage(
    deviceModel: ConcreteDeviceModel,
    message: SignalingMessage
) {
    const peerconnection = await apiClient.getPeerconnection(message.connectionUrl)

    const deviceA = peerconnection.devices[0]
    const deviceB = peerconnection.devices[1]

    let peerDeviceUrl: string | undefined = undefined
    if (deviceA.url === deviceUrlFromId(deviceModel.uuid)) peerDeviceUrl = deviceB.url
    if (deviceB.url === deviceUrlFromId(deviceModel.uuid)) peerDeviceUrl = deviceA.url
    if (!peerDeviceUrl) {
        throw new UnrelatedPeerconnectionError(
            'Device is not taking part in peerconnection.',
            400
        )
    }

    await apiClient.sendSignalingMessage(peerDeviceUrl, message, message.connectionUrl)
}

/**
 * This function handles a connection-state-changed message for a device.
 * @param deviceModel The device for which the connection state changed
 * @param message The connection-state-changed message.
 */
async function handleConnectionStateChangedMessage(
    deviceModel: ConcreteDeviceModel,
    message: ConnectionStateChangedMessage
) {
    await apiClient.patchPeerconnectionDeviceStatus(
        message.connectionUrl,
        { status: message.status },
        deviceUrlFromId(deviceModel.uuid)
    )
}
