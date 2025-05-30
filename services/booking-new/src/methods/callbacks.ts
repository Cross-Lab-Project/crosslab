import { repositories } from '../database/dataSource.js';
import { BookingModel } from '../database/model.js';
import { BookingChangedEventCallback } from '../generated/types.js';
import { bookingUrlFromId } from './urlFromId.js';

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
