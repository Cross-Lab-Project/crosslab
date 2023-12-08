import { logger } from '@crosslab/service-common';

import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { saveExperiment } from '../../experimentChangedEvent.js';
import { experimentUrlFromId } from '../../url.js';

// import { apiClient } from '../../api.js'

export async function lockBookingExperiment(experimentModel: ExperimentModel) {
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

  // TODO: error handling
  // await apiClient.lockBooking(experimentModel.bookingID)

  experimentModel.status = 'booking-locked';

  await saveExperiment(experimentModel);

  logger.log('info', 'Successfully locked booking for experiment', {
    data: { experimentUrl },
  });
}
