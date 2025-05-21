import { repositories } from '../../database/dataSource.js';
import { postBookingsSignature } from '../../generated/signatures.js';

export const postBookings: postBookingsSignature = async (_req, _parameters, body) => {
  // TODO: authorization

  const bookingModel = await repositories.booking.create(body);
  await repositories.booking.save(bookingModel);

  return {
    status: 201,
    body: await repositories.booking.format(bookingModel),
  };
};
