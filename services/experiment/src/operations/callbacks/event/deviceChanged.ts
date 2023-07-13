import { deviceChangedCallbacks } from '../../callbacks'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { MissingPropertyError, MalformedBodyError } from '@crosslab/service-common'
import { logger } from '@crosslab/service-common'

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
export function handleDeviceChangedEventCallback(callback: any): 200 | 410 {
    if (!callback.device) {
        throw new MissingPropertyError(
            'Event-callbacks of type "device-changed" require property "device"',
            400
        )
    }
    const device = callback.device
    if (
        !DeviceServiceTypes.isConcreteDevice(callback.device) &&
        !DeviceServiceTypes.isDeviceGroup(callback.device) &&
        !DeviceServiceTypes.isInstantiableBrowserDevice(callback.device) &&
        !DeviceServiceTypes.isInstantiableCloudDevice(callback.device)
    ) {
        throw new MalformedBodyError('Property "device" is not a valid device', 400)
    }
    if (!device.url) {
        throw new MissingPropertyError('Property "device" is missing property "url"', 400)
    }
    if (!deviceChangedCallbacks.includes(device.url)) {
        return 410
    }
    logger.log('info', 'Device changed!', { meta: { deviceUrl: device.url } })
    // TODO: add device changed handling
    return 200
}
