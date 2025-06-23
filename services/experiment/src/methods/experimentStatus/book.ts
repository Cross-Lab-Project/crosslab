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
    const booking = await clients.booking.getBooking(experimentModel.bookingID);
    if (
      Date.parse(booking.timeslot.start) !== Date.parse(experimentModel.bookingStart) ||
      Date.parse(booking.timeslot.end) !== Date.parse(experimentModel.bookingEnd)
    ) {
      throw new InvalidChangeError(`The timeslot of a booking cannot be changed!`, 400);
    }
  }

  const currentTime = new Date();
  const startTime = new Date(experimentModel.bookingStart ?? currentTime);
  const endTime = new Date(
    experimentModel.bookingEnd ?? startTime.getTime() + 60 * 60 * 1000,
  );

  // TODO: error handling
  const booking = await clients.booking.createBooking(
    {
      devices: Object.fromEntries(
        experimentModel.devices.map(deviceModel => {
          return [deviceModel.uuid, { url: deviceModel.url, essential: true }];
        }),
      ),
      timeslot: {
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      },
    },
    { changedUrl: callbackUrl },
  );
  console.log('BOOKING DATA:', startTime, endTime, JSON.stringify(booking));

  callbackHandler.addListener('booking', booking.url, experimentModel.uuid);

  experimentModel.bookingStart = startTime.toISOString();
  experimentModel.bookingEnd = endTime.toISOString();
  experimentModel.bookingID = booking.url;

  experimentModel.status = 'booked';
  await repositories.experiment.save(experimentModel);
  logger.log('info', 'Successfully booked experiment', { data: { experimentUrl } });
}
