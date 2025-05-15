// import * as clients from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { postBookingsSignature } from '../../generated/signatures.js';

// import { reserveDevice } from '../../methods/reservation.js';

export const postBookings: postBookingsSignature = async (_req, _parameters, body) => {
  // TODO: authorization

  const bookingModel = await repositories.booking.create(body);
  await repositories.booking.save(bookingModel);

  // sort devices such that device groups come last, this ensures that
  // all other devices are booked first to avoid conflicts that may arise
  // by booking the same device from the device group before
  // bookingModel.devices.sort((deviceA, deviceB) => {
  //   if (deviceA.type === 'group' && deviceB.type !== 'group') return 1;
  //   if (deviceA.type !== 'group' && deviceB.type === 'group') return -1;
  //   return 0;
  // });

  // try {
  //   for (const deviceModel of bookingModel.devices) {
  //     const device = await clients.device.getDevice(deviceModel.url, {
  //       flat_group: true,
  //     });
  //     if (device.instanceOf) {
  //       // TODO: better error with status code
  //       throw new Error(
  //         `Cannot book device "${device.url}" since it is an instance of "${device.instanceOf}"!`,
  //       );
  //     }
  //     await reserveDevice(bookingModel, device);
  //   }
  // } catch (error) {
  //   await repositories.booking.remove(bookingModel);
  //   throw error;
  // }

  // await repositories.booking.save(bookingModel);

  return {
    status: 201,
    body: await repositories.booking.format(bookingModel),
  };
};
