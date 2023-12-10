import { PeerconnectionClosedEventCallback } from '../../../clients/device/types.js';
import { callbackHandler } from './callbackHandler.js';

/**
 * This function handles an incoming "peerconnection-closed" event callback.
 * @param callback The incoming "peerconnection-closed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handlePeerconnectionClosedEventCallback(
  callback: PeerconnectionClosedEventCallback,
): Promise<200 | 410> {
  return await callbackHandler.handleCallback(callback);
}
