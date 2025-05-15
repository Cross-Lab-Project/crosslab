import { repositories } from '../../../database/dataSource.js';
import { getBookingsByBookingIdSignature } from '../../../generated/signatures.js';

export const getBookingsByBookingId: getBookingsByBookingIdSignature = async (
  _req,
  parameters,
) => {
  // TODO: authorization

  const bookingModel = await repositories.booking.findOneOrFail({
    where: {
      id: parameters.bookingId,
    },
  });

  return {
    status: 200,
    body: await repositories.booking.format(bookingModel),
  };
};
