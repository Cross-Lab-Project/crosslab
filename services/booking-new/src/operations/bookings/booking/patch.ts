import { repositories } from '../../../database/dataSource.js';
import { patchBookingsByBookingIdSignature } from '../../../generated/signatures.js';

export const patchBookingsByBookingId: patchBookingsByBookingIdSignature = async (
  _req,
  parameters,
  body,
) => {
  // TODO: authorization

  const bookingModel = await repositories.booking.findOneOrFail({
    where: { id: parameters.bookingId },
  });

  if (body) {
    await repositories.booking.write(bookingModel, body);

    // TODO: check if booking can be updated as requested

    await repositories.booking.save(bookingModel);
  }

  return {
    status: 200,
    body: await repositories.booking.format(bookingModel),
  };
};
