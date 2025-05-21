import { repositories } from '../../../../database/dataSource.js';
import { putBookingsByBookingIdLockSignature } from '../../../../generated/signatures.js';
import { LockingError } from '../../../../methods/errors.js';
import { mutexManager } from '../../../../methods/mutexManager.js';

export const putBookingsByBookingIdLock: putBookingsByBookingIdLockSignature = async (
  _req,
  parameters,
) => {
  // TODO: authorization

  const release = await mutexManager.acquire(`booking:${parameters.bookingId}`);

  try {
    const bookingModel = await repositories.booking.findOneOrFail({
      where: { uuid: parameters.bookingId },
    });

    const deviceGroupModels = bookingModel.devices.filter(
      deviceModel => deviceModel.type === 'group',
    );

    const mapping: Record<string, string> = {};
    for (const deviceGroupModel of deviceGroupModels) {
      if (!deviceGroupModel.chosenDevice) {
        throw new LockingError(
          `No device was chosen for the device group "${deviceGroupModel.url}"!`,
          500, // TODO: check which status code fits best
        );
      }
      mapping[deviceGroupModel.id] = deviceGroupModel.chosenDevice;
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
  } finally {
    release();
  }
};
