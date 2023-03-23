import { handleDeviceChangedEventCallback } from './deviceChanged'
import { MalformedBodyError, InvalidValueError } from '@crosslab/service-common'

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
export async function handleEventCallback(callback: {
    [k: string]: unknown
}): Promise<200 | 410> {
    if (!callback.eventType) {
        throw new MalformedBodyError(
            "Callbacks of type 'event' require property 'eventType'",
            400
        )
    }
    if (typeof callback.eventType !== 'string') {
        throw new MalformedBodyError(
            "Property 'callbackType' needs to be of type 'string'",
            400
        )
    }
    switch (callback.eventType) {
        case 'device-changed':
            return await handleDeviceChangedEventCallback(callback)
        default:
            throw new InvalidValueError(
                `Event-callbacks of type '${callback.eventType}' are not supported`,
                400
            )
    }
}
