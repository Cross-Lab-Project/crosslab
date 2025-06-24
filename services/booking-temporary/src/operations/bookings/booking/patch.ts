import { repositories } from '../../../database/dataSource.js';
import { patchBookingsByBookingIdSignature } from '../../../generated/signatures.js';
import { mutexManager } from '../../../methods/mutexManager.js';
import { bookingUrlFromId } from '../../../methods/urlFromId.js';

export const patchBookingsByBookingId: patchBookingsByBookingIdSignature = async (
  req,
  parameters,
  body,
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

    if (body) {
      await repositories.booking.write(bookingModel, body);
      await repositories.booking.save(bookingModel);
    }

    return {
      status: 200,
      body: await repositories.booking.format(bookingModel),
    };
  } finally {
    release();
  }
};
