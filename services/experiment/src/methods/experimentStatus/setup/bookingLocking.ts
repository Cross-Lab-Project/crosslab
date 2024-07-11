import { MissingEntityError, logger } from '@crosslab/service-common';

import { clients } from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { ResolvedDevice } from '../../../types/types.js';
import { experimentUrlFromId } from '../../url.js';

export async function lockBookingExperiment(
  experimentModel: ExperimentModel,
  resolvedDevices: ResolvedDevice[],
) {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to lock booking for experiment', {
    data: { experimentUrl },
  });

  if (experimentModel.status !== 'booked')
    throw new InvalidStateError(
      `Expected experiment to have status 'booked', instead has status '${experimentModel.status}'`,
      500,
    );

  if (!validateExperimentStatus(experimentModel, 'booked'))
    throw new MalformedExperimentError(
      `Experiment is in status 'booked', but does not satisfy the requirements for this status`,
      500,
    );

  // TODO: error handling
  const lockedDevices = await clients.booking.backend.lockBooking(
    experimentModel.bookingID,
  );

  for (const [index, resolvedDevice] of resolvedDevices.entries()) {
    if (resolvedDevice.type !== 'group') continue;

    const lockedDeviceUrl = lockedDevices.find(
      mapping => mapping.Requested === resolvedDevice.url,
    )?.Selected;

    if (!lockedDeviceUrl)
      throw new MissingEntityError(
        `No device has been booked for device group "${resolvedDevice.url}"!`,
        500,
      );

    experimentModel.devices[index].resolvedDevice = lockedDeviceUrl;
  }

  experimentModel.status = 'booking-locked';

  await repositories.experiment.save(experimentModel);

  logger.log('info', 'Successfully locked booking for experiment', {
    data: { experimentUrl },
  });
}
