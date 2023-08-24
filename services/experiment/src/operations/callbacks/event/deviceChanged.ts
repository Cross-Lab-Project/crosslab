import { callbackEventEmitter } from '.';
import { DeviceServiceTypes } from '@cross-lab-project/api-client';
import { logger } from '@crosslab/service-common';

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
    callback: DeviceServiceTypes.DeviceChangedEventCallback,
): Promise<200 | 410> {
    logger.log('info', 'Device changed!', { meta: { deviceUrl: callback.device.url } });

    callbackEventEmitter.emit('device-changed', callback.device);

    return 200;
}
