// import Queue from 'queue';
import { repositories } from '../database/dataSource.js';
import { BookingModel } from '../database/model.js';
import {
  BookingChangedEventCallback,
  BookingDeletedEventCallback,
} from '../generated/types.js';
import { bookingUrlFromId } from './urlFromId.js';

// TODO: better callback handling

// const callbackQueueMap: Map<string, Queue> = new Map();

export async function sendChangedCallbacks(bookingModel: BookingModel) {
  const newCallbackUrls = [];

  for (const callbackUrlModel of bookingModel.callbackUrls) {
    try {
      const response = await fetch(callbackUrlModel.url, {
        method: 'POST',
        body: JSON.stringify({
          callbackType: 'event',
          eventType: 'booking-changed',
          booking: await repositories.booking.format(bookingModel),
        } satisfies BookingChangedEventCallback),
        headers: [['Content-Type', 'application/json']],
      });

      if (response.status === 410) {
        await repositories.callbackUrl.remove(callbackUrlModel);
        continue;
      }

      newCallbackUrls.push(callbackUrlModel);
    } catch (error) {
      console.error(
        `Could not send "booking-changed" callback for booking "${bookingUrlFromId(
          bookingModel.uuid,
        )}" to "${callbackUrlModel.url}": ${error}`,
      );

      newCallbackUrls.push(callbackUrlModel);
    }
  }

  bookingModel.callbackUrls = newCallbackUrls;
}

export async function sendDeletedCallbacks(bookingModel: BookingModel) {
  const newCallbackUrls = [];

  for (const callbackUrlModel of bookingModel.callbackUrls) {
    try {
      await fetch(callbackUrlModel.url, {
        method: 'POST',
        body: JSON.stringify({
          callbackType: 'event',
          eventType: 'booking-deleted',
          bookingUrl: bookingUrlFromId(bookingModel.uuid),
        } satisfies BookingDeletedEventCallback),
      });

      await repositories.callbackUrl.remove(callbackUrlModel);
    } catch (error) {
      console.error(
        `Could not send "booking-deleted" callback for booking "${bookingUrlFromId(
          bookingModel.uuid,
        )}" to "${callbackUrlModel.url}": ${error}`,
      );

      newCallbackUrls.push(callbackUrlModel);
    }
  }

  bookingModel.callbackUrls = newCallbackUrls;
}
