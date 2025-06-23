import { repositories } from '../../../database/dataSource.js';
import { deleteBookingsByBookingIdSignature } from '../../../generated/signatures.js';
import { sendDeletedCallbacks } from '../../../methods/callbacks.js';
import { mutexManager } from '../../../methods/mutexManager.js';

export const deleteBookingsByBookingId: deleteBookingsByBookingIdSignature = async (
  req,
  parameters,
) => {
  await req.authorization.check_authorization_or_fail(
    'delete',
    `booking:${parameters.bookingId}`,
  );

  const release = await mutexManager.acquire(`booking:${parameters.bookingId}`);

  try {
    const bookingModel = await repositories.booking.findOneOrFail({
      where: { uuid: parameters.bookingId },
    });

    await repositories.booking.remove(bookingModel);

    sendDeletedCallbacks(bookingModel);

    return {
      status: 204,
    };
  } finally {
    release();
  }
};
