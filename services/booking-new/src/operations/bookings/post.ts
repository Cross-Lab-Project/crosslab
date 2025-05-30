import { repositories } from '../../database/dataSource.js';
import { postBookingsSignature } from '../../generated/signatures.js';

export const postBookings: postBookingsSignature = async (req, parameters, body) => {
  await req.authorization.check_authorization_or_fail('create', 'booking');

  const bookingModel = await repositories.booking.create(body);
  if (parameters.changedUrl) {
    const callbackUrlModel = await repositories.callbackUrl.create(parameters.changedUrl);
    bookingModel.callbackUrls.push(callbackUrlModel);
  }
  await repositories.booking.save(bookingModel);

  return {
    status: 201,
    body: await repositories.booking.format(bookingModel),
  };
};
