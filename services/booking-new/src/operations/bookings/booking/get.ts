import { repositories } from '../../../database/dataSource.js';
import { getBookingsByBookingIdSignature } from '../../../generated/signatures.js';

export const getBookingsByBookingId: getBookingsByBookingIdSignature = async (
  req,
  parameters,
) => {
  await req.authorization.check_authorization_or_fail(
    'view',
    `booking:${parameters.bookingId}`,
  );

  const bookingModel = await repositories.booking.findOneOrFail({
    where: {
      uuid: parameters.bookingId,
    },
  });

  return {
    status: 200,
    body: await repositories.booking.format(bookingModel),
  };
};
