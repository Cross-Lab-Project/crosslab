import { repositories } from '../../../database/dataSource.js';
import { deleteBookingsByBookingIdSignature } from '../../../generated/signatures.js';

export const deleteBookingsByBookingId: deleteBookingsByBookingIdSignature = async (
  _req,
  parameters,
) => {
  // TODO: authorization

  const bookingModel = await repositories.booking.findOneOrFail({
    where: { id: parameters.bookingId },
  });
  await repositories.booking.remove(bookingModel);

  return {
    status: 204,
  };
};
