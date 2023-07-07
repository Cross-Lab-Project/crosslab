import { peerconnectionClosedCallbacks } from '../../callbacks'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'

/**
 * This function handles an incoming "peerconnection-closed" event callback.
 * @param callback The incoming "peerconnection-closed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export function handlePeerconnectionClosedEventCallback(
    callback: DeviceServiceTypes.PeerconnectionClosedEventCallback
): 200 | 410 {
    if (!peerconnectionClosedCallbacks.includes(callback.peerconnection.url)) {
        return 410
    }
    // TODO: add peerconnection closed handling
    return 200
}
