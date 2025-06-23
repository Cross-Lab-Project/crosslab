import { repositories } from '../../database/dataSource.js';
import { getBookingsSignature } from '../../generated/signatures.js';

export const getBookings: getBookingsSignature = async req => {
  await req.authorization.check_authorization_or_fail('view', 'booking');

  const bookingModels = await repositories.booking.find();

  return {
    status: 200,
    body: await Promise.all(
      bookingModels.map(bookingModel => repositories.booking.format(bookingModel)),
    ),
  };
};
