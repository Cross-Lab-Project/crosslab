import { InvalidChangeError, MissingPropertyError } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';

import { clients } from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { ExperimentModel } from '../../database/model.js';
import { callbackHandler } from '../../operations/callbacks/callbackHandler.js';
import { callbackUrl } from '../../operations/callbacks/index.js';
import { experimentUrlFromId } from '../url.js';

/**
 * This function attempts to book an experiment.
 * @param experimentModel The experiment to be booked.
 */
export async function bookExperiment(experimentModel: ExperimentModel) {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to book experiment', { data: { experimentUrl } });

  if (!experimentModel.devices || experimentModel.devices.length === 0)
    throw new MissingPropertyError(`Experiment ${experimentUrl} has no devices`, 400);

  if (
    experimentModel.bookingID &&
    experimentModel.bookingStart &&
    experimentModel.bookingEnd
  ) {
    const booking = await clients.booking.frontend.getBooking(experimentModel.bookingID);
    if (
      Date.parse(booking.Booking.Time.Start) !==
        Date.parse(experimentModel.bookingStart) ||
      Date.parse(booking.Booking.Time.End) !== Date.parse(experimentModel.bookingEnd)
    ) {
      throw new InvalidChangeError(
        `The start and end of a booking cannot be changed!`,
        400,
      );
    }
  }

  const currentTime = new Date();
  const startTime = new Date(experimentModel.bookingStart ?? currentTime);
  const endTime = new Date(
    experimentModel.bookingEnd ?? startTime.getTime() + 60 * 60 * 1000,
  );

  // TODO: error handling
  const booking = await clients.booking.frontend.newBooking({
    Devices: experimentModel.devices.map(device => {
      return { ID: device.url };
    }),
    Time: {
      Start: startTime.toISOString(),
      End: endTime.toISOString(),
    },
    Type: 'normal',
  });
  console.log(
    'BOOKING DATA:',
    startTime,
    endTime,
    JSON.stringify(await clients.booking.frontend.getBooking(booking.BookingID)),
  );

  await clients.booking.frontend.updateBooking(booking.BookingID, {
    Callback: callbackUrl,
  });

  // TEMPORARY HOTFIX: wait for booking to have status "booked"
  for (let i = 0; i < 10; i++) {
    const updatedBooking = await clients.booking.frontend.getBooking(booking.BookingID);

    if (updatedBooking.Booking.Status === 'booked') {
      break;
    }

    await new Promise<void>(resolve => setTimeout(resolve, 1000));
  }

  callbackHandler.addListener('booking', booking.BookingID, experimentModel.uuid);

  experimentModel.bookingStart = startTime.toISOString();
  experimentModel.bookingEnd = endTime.toISOString();
  experimentModel.bookingID = booking.BookingID;

  experimentModel.status = 'booked';
  await repositories.experiment.save(experimentModel);
  logger.log('info', 'Successfully booked experiment', { data: { experimentUrl } });
}
