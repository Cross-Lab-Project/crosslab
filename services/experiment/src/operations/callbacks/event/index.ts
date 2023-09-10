import { InvalidValueError } from '@crosslab/service-common';
import { EventEmitter } from 'events';
import { TypedEventEmitter } from 'typeorm';

import { handleDeviceChangedEventCallback } from './deviceChanged.js';
import { handlePeerconnectionClosedEventCallback } from './peerconnectionClosed.js';
import { handlePeerconnectionStatusChangedEventCallback } from './peerconnectionStatusChanged.js';

type CallbackEvents = {
  'device-changed': (device: any) => void;
  'peerconnection-closed': (peerconnection: any) => void;
  'peerconnection-status-changed': (peerconnection: any) => void;
};

export const callbackEventEmitter =
  new EventEmitter() as TypedEventEmitter<CallbackEvents>;

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
export async function handleEventCallback(
  callback: any,
): Promise<200 | 410> {
  switch (callback.eventType) {
    case 'peerconnection-status-changed':
      return await handlePeerconnectionStatusChangedEventCallback(callback);
    case 'peerconnection-closed':
      return handlePeerconnectionClosedEventCallback(callback);
    case 'device-changed':
      return handleDeviceChangedEventCallback(callback);
    default:
      throw new InvalidValueError(
        `Event-callbacks of type "${callback.eventType}" are not supported`,
        400,
      );
  }
}
