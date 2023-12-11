import { DeviceChangedEventCallback } from '../../../clients/device/types.js';
import { callbackHandler } from './callbackHandler.js';

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
  callback: DeviceChangedEventCallback,
): Promise<200 | 410> {
  return await callbackHandler.handleCallback(callback);
}
