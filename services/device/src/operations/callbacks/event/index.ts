import { EventCallback, isDeviceChangedEventCallback } from '../../../generated/types'
import { handleDeviceChangedEventCallback } from './deviceChanged'
import { MalformedBodyError, InvalidValueError } from '@crosslab/service-common'

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
export async function handleEventCallback(callback: EventCallback): Promise<200 | 410> {
    switch (callback.eventType) {
        case 'device-changed':
            if (!isDeviceChangedEventCallback(callback))
                throw new MalformedBodyError(
                    'Body of request is not a valid device-changed event callback',
                    400
                )
            return await handleDeviceChangedEventCallback(callback)
        default:
            throw new InvalidValueError(
                `Event-callbacks of type '${callback.eventType}' are not supported`,
                400
            )
    }
}
