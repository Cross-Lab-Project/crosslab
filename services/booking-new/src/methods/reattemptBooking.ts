import * as clients from '../clients/index.js';
import { BookingModel } from '../database/model.js';
import { sendChangedCallbacks } from './callbacks.js';
import { reserveDevice } from './reservation.js';

export async function reattemptBooking(bookingModel: BookingModel) {
  if (bookingModel.status !== 'rejected') {
    return;
  }

  let shouldSendChangedCallbacks = false;
  for (const deviceModel of bookingModel.devices) {
    if (!deviceModel.reservation) {
      try {
        const oldSelectedDevice = deviceModel.selectedDevice;
        const device = await clients.device.getDevice(deviceModel.url);
        await reserveDevice(bookingModel, deviceModel, device);
        if (device.type === 'group' && deviceModel.selectedDevice !== oldSelectedDevice) {
          shouldSendChangedCallbacks = true;
        }
      } catch {
        // empty
      }
    }
  }

  if (shouldSendChangedCallbacks) {
    sendChangedCallbacks(bookingModel);
  }
}
