import { repositories } from '../../../../database/dataSource.js';
import { deleteBookingsByBookingIdLockSignature } from '../../../../generated/signatures.js';
import { sendChangedCallbacks } from '../../../../methods/callbacks.js';
import { mutexManager } from '../../../../methods/mutexManager.js';
import { reattemptBooking } from '../../../../methods/reattemptBooking.js';

export const deleteBookingsByBookingIdLock: deleteBookingsByBookingIdLockSignature =
  async (req, parameters) => {
    await req.authorization.check_authorization_or_fail(
      'edit',
      `booking:${parameters.bookingId}`,
    );

    const release = await mutexManager.acquire(`booking:${parameters.bookingId}`);

    try {
      const bookingModel = await repositories.booking.findOneOrFail({
        where: { uuid: parameters.bookingId },
      });

      if (!bookingModel.isLocked) {
        return {
          status: 204,
        };
      }

      bookingModel.isLocked = false;

      await repositories.booking.save(bookingModel);

      sendChangedCallbacks(bookingModel);

      reattemptBooking(bookingModel);

      return {
        status: 204,
      };
    } finally {
      release();
    }
  };
