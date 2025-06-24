import { repositories } from '../../../../database/dataSource.js';
import { putBookingsByBookingIdLockSignature } from '../../../../generated/signatures.js';
import { sendChangedCallbacks } from '../../../../methods/callbacks.js';
import { LockingError } from '../../../../methods/errors.js';
import { mutexManager } from '../../../../methods/mutexManager.js';
import { bookingUrlFromId } from '../../../../methods/urlFromId.js';

export const putBookingsByBookingIdLock: putBookingsByBookingIdLockSignature = async (
  req,
  parameters,
) => {
  await req.authorization.check_authorization_or_fail(
    'edit',
    `booking:${bookingUrlFromId(parameters.bookingId)}`,
  );

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
      if (!deviceGroupModel.selectedDevice) {
        throw new LockingError(
          `No device was chosen for the device group "${deviceGroupModel.url}"!`,
          400,
        );
      }
      mapping[deviceGroupModel.id] = deviceGroupModel.selectedDevice;
    }

    if (bookingModel.isLocked) {
      return {
        status: 200,
        body: mapping,
      };
    }

    bookingModel.isLocked = true;

    await repositories.booking.save(bookingModel);

    sendChangedCallbacks(bookingModel);

    return {
      status: 200,
      body: mapping,
    };
  } finally {
    release();
  }
};
