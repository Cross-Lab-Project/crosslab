import { handleDeviceChangedEventCallback } from './deviceChanged'
import { handlePeerconnectionClosedEventCallback } from './peerconnectionClosed'
import { handlePeerconnectionStatusChangedEventCallback } from './peerconnectionStatusChanged'
import { MissingPropertyError, InvalidValueError } from '@crosslab/service-common'

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
export async function handleEventCallback(callback: any): Promise<200 | 410> {
    if (!callback.eventType) {
        throw new MissingPropertyError(
            'Callbacks of type "event" require property "eventType"',
            400
        )
    }
    if (typeof callback.eventType !== 'string') {
        throw new MissingPropertyError(
            'Property "eventType" needs to be of type "string"',
            400
        )
    }
    switch (callback.eventType) {
        case 'peerconnection-status-changed':
            return await handlePeerconnectionStatusChangedEventCallback(callback)
        case 'peerconnection-closed':
            return handlePeerconnectionClosedEventCallback(callback)
        case 'device-changed':
            return handleDeviceChangedEventCallback(callback)
        default:
            throw new InvalidValueError(
                `Event-callbacks of type "${callback.eventType}" are not supported`,
                400
            )
    }
}
