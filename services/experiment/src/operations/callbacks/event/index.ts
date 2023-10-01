import { InvalidValueError, MalformedBodyError } from '@crosslab/service-common';
import { EventEmitter } from 'events';
import { TypedEventEmitter } from 'typeorm';

import {
  Device,
  EventCallback,
  Peerconnection,
  isDeviceChangedEventCallback,
  isPeerconnectionClosedEventCallback,
  isPeerconnectionStatusChangedEventCallback,
} from '../../../clients/device/types.js';
import { handleDeviceChangedEventCallback } from './deviceChanged.js';
import { handlePeerconnectionClosedEventCallback } from './peerconnectionClosed.js';
import { handlePeerconnectionStatusChangedEventCallback } from './peerconnectionStatusChanged.js';

type CallbackEvents = {
  'device-changed': (device: Device<'response'>) => void;
  'peerconnection-closed': (peerconnection: Peerconnection<'response'>) => void;
  'peerconnection-status-changed': (peerconnection: Peerconnection<'response'>) => void;
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
export async function handleEventCallback(callback: EventCallback): Promise<200 | 410> {
  switch (callback.eventType) {
    case 'peerconnection-status-changed':
      if (!isPeerconnectionStatusChangedEventCallback(callback))
        throw new MalformedBodyError(
          'Body of request is not a valid peerconnection-status-changed event callback',
          400,
        );
      return await handlePeerconnectionStatusChangedEventCallback(callback);
    case 'peerconnection-closed':
      if (!isPeerconnectionClosedEventCallback(callback))
        throw new MalformedBodyError(
          'Body of request is not a valid peerconnection-closed event callback',
          400,
        );
      return handlePeerconnectionClosedEventCallback(callback);
    case 'device-changed':
      if (!isDeviceChangedEventCallback(callback))
        throw new MalformedBodyError(
          'Body of request is not a valid device-changed event callback',
          400,
        );
      return handleDeviceChangedEventCallback(callback);
    default:
      throw new InvalidValueError(
        `Event-callbacks of type "${callback.eventType}" are not supported`,
        400,
      );
  }
}
