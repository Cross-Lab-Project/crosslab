import { repositories } from '../database/dataSource.js';
import { BookingModel } from '../database/model.js';
import { BookingChangedEventCallback } from '../generated/types.js';

export async function sendChangedCallbacks(bookingModel: BookingModel) {
  const newCallbackUrls = [];

  for (const callbackUrlModel of bookingModel.callbackUrls) {
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
  }

  bookingModel.callbackUrls = newCallbackUrls;
}
