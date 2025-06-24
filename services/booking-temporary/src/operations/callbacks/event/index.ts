import { InvalidValueError, MalformedBodyError } from '@crosslab/service-common';

import {
  EventCallback,
  isDeviceChangedEventCallback,
  isDeviceDeletedEventCallback,
} from '../../../clients/device/types.js';
import { handleDeviceChangedEventCallback } from './deviceChanged.js';
import { handleDeviceDeletedEventCallback } from './deviceDeleted.js';

export async function handleEventCallback(eventCallback: EventCallback): Promise<number> {
  switch (eventCallback.eventType) {
    case 'device-changed':
      if (!isDeviceChangedEventCallback(eventCallback)) {
        throw new MalformedBodyError(
          'Body of request is not a valid device-changed event callback',
          400,
        );
      }
      return handleDeviceChangedEventCallback(eventCallback);
    case 'device-deleted':
      if (!isDeviceDeletedEventCallback(eventCallback)) {
        throw new MalformedBodyError(
          'Body of request is not a valid device-deleted event callback',
          400,
        );
      }
      return handleDeviceDeletedEventCallback(eventCallback);
    default:
      throw new InvalidValueError(
        `Event-callbacks of type '${eventCallback.eventType}' are not supported`,
        400,
      );
  }
}
