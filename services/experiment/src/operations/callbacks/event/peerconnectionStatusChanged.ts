import { PeerconnectionStatusChangedEventCallback } from '../../../clients/device/types.js';
import { callbackHandler } from './callbackHandler.js';

/**
 * This function handles an incoming "peerconnection-status-changed" event callback.
 * @param callback The incoming "peerconnection-status-changed" callback to be handled.
 * @returns The status code for the response to the incoming callback.
 */
export async function handlePeerconnectionStatusChangedEventCallback(
  callback: PeerconnectionStatusChangedEventCallback,
): Promise<200 | 410> {
  return await callbackHandler.handleCallback(callback);
}
