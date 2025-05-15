import { repositories } from '../../../../database/dataSource.js';
import { putBookingsByBookingIdLockSignature } from '../../../../generated/signatures.js';
import { LockingError } from '../../../../methods/errors.js';

export const putBookingsByBookingIdLock: putBookingsByBookingIdLockSignature = async (
  _req,
  parameters,
) => {
  // TODO: authorization

  const bookingModel = await repositories.booking.findOneOrFail({
    where: { id: parameters.bookingId },
  });

  const deviceGroupModels = bookingModel.devices.filter(
    deviceModel => deviceModel.type === 'group',
  );

  const mapping = [];
  for (const deviceGroupModel of deviceGroupModels) {
    if (!deviceGroupModel.chosenDevice) {
      throw new LockingError(
        `No device was chosen for the device group "${deviceGroupModel.url}"!`,
        500, // TODO: check which status code fits best
      );
    }
    mapping.push({
      group: deviceGroupModel.url,
      device: deviceGroupModel.chosenDevice,
    });
  }

  if (bookingModel.status === 'accepted') {
    bookingModel.status = 'locked-accepted';
  } else if (bookingModel.status === 'rejected') {
    bookingModel.status = 'locked-rejected';
  }

  await repositories.booking.save(bookingModel);

  return {
    status: 200,
    body: mapping,
  };
};
