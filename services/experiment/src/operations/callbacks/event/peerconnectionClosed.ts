
import { peerconnectionClosedCallbacks } from '../../callbacks/index.js';

/**
 * This function handles an incoming "peerconnection-closed" event callback.
 * @param callback The incoming "peerconnection-closed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export function handlePeerconnectionClosedEventCallback(
  callback: any,
): 200 | 410 {
  if (!peerconnectionClosedCallbacks.includes(callback.peerconnection.url)) {
    return 410;
  }
  // TODO: add peerconnection closed handling
  return 200;
}
