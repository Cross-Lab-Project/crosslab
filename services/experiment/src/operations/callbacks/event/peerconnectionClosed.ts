import { peerconnectionClosedCallbacks } from '../../callbacks'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { MissingPropertyError, MalformedBodyError } from '@crosslab/service-common'

/**
 * This function handles an incoming "peerconnection-closed" event callback.
 * @param callback The incoming "peerconnection-closed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
export function handlePeerconnectionClosedEventCallback(callback: any): 200 | 410 {
    if (!callback.peerconnection) {
        throw new MissingPropertyError(
            'Event-callbacks of type "peerconnection-closed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!DeviceServiceTypes.isPeerconnection(peerconnection)) {
        throw new MalformedBodyError('Property "peerconnection" is malformed', 400)
    }
    if (!peerconnection.url) {
        throw new MissingPropertyError(
            'Property "peerconnection" is missing property "url"',
            400
        )
    }
    if (!peerconnectionClosedCallbacks.includes(peerconnection.url)) {
        return 410
    }
    // TODO: add peerconnection closed handling
    return 200
}
