import { InvalidValueError, logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { ResolvedDevice } from '../../../types/types.js';
import { experimentUrlFromId } from '../../url.js';

// import { apiClient } from '../../api.js'

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
    );

  if (!validateExperimentStatus(experimentModel, 'booked'))
    throw new MalformedExperimentError(
      `Experiment is in status 'booked', but does not satisfy the requirements for this status`,
      500,
    );

  // NOTE: temporary solution while booking service is not available
  for (const resolvedDevice of resolvedDevices) {
    if (resolvedDevice.type !== 'group') {
      continue;
    }

    if (resolvedDevice.devices.length === 0)
      throw new InvalidValueError(`Resolved device group contains no devices`, 400);

    const index = experimentModel.devices.findIndex(
      device => device.url === resolvedDevice.url,
    );

    if (index === -1)
      throw new InvalidValueError(
        `Resolved device group is not contained in the experiment`,
        500,
      );

    experimentModel.devices[index].resolvedDevice = resolvedDevice.devices[0].url;
  }

  // TODO: error handling
  // await apiClient.lockBooking(experimentModel.bookingID)

  experimentModel.status = 'booking-locked';

  await repositories.experiment.save(experimentModel);

  logger.log('info', 'Successfully locked booking for experiment', {
    data: { experimentUrl },
  });
}
