import { MissingPropertyError } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';

import { Clients } from '../../clients/index.js';
import { ExperimentModel } from '../../database/model.js';
import { InvalidStateError } from '../../types/errors.js';
import { ResolvedDevice } from '../../types/types.js';
import { saveExperiment } from '../experimentChangedEvent.js';
import { experimentUrlFromId } from '../url.js';
import { bookExperiment } from './book.js';
import { setupExperiment } from './setup/index.js';

/**
 * This function attempts to run an experiment.
 * @param experimentModel The experiment to be run.
 * @throws {InvalidStateError} Thrown when the status of the experiment is already "finished".
 */
export async function runExperiment(experimentModel: ExperimentModel, clients: Clients) {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to run experiment', { data: { experimentUrl } });

  // make sure experiment is not already finished
  if (experimentModel.status === 'finished') {
    throw new InvalidStateError(`Experiment status is already "finished"`, 400);
  }

  // make sure the experiment contains devices
  if (!experimentModel.devices || experimentModel.devices.length === 0) {
    throw new MissingPropertyError(`Experiment does not contain any devices`, 400);
  }

  // book experiment if status is "created"
  if (experimentModel.status === 'created') {
    await bookExperiment(experimentModel);
  }

  const resolvedDevices: ResolvedDevice[] = await Promise.all(
    experimentModel.devices.map(async device => {
      const resolvedDevice = await clients.device.getDevice(device.url);
      return {
        ...resolvedDevice,
        instanceUrl: device.instance?.url,
        instanceToken: device.instance?.token,
      };
    }),
  );

  await setupExperiment(experimentModel, resolvedDevices, clients);

  // save experiment
  saveExperiment(experimentModel);
  logger.log('info', 'Successfully running experiment', { data: { experimentUrl } });
}
