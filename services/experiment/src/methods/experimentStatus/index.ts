import { InvalidChangeError } from '@crosslab/service-common';

import { Clients } from '../../clients/index.js';
import { ExperimentModel } from '../../database/model.js';
import { Experiment } from '../../generated/types.js';
import { bookExperiment } from './book.js';
import { finishExperiment } from './finish.js';
import { runExperiment } from './run.js';

export * from './book.js';
export * from './finish.js';
export * from './run.js';

export async function transitionExperiment(
  experimentModel: ExperimentModel,
  status: Experiment<'request'>['status'] | undefined,
  clients: Clients,
) {
  if (status === undefined) {
    if (
      experimentModel.status === 'created' ||
      experimentModel.status === 'booked' ||
      experimentModel.status === 'finished'
    )
      status = experimentModel.status;
    else status = 'running';
  }

  switch (status) {
    case 'created':
      if (experimentModel.status !== 'created')
        throw new InvalidChangeError(
          `Cannot change status of experiment from "${experimentModel.status}" to "created"`,
          400,
        );
      break;
    case 'booked':
      if (experimentModel.status !== 'created' && experimentModel.status !== 'booked')
        throw new InvalidChangeError(
          `Cannot change status of experiment from "${experimentModel.status}" to "booked"`,
          400,
        );
      return await bookExperiment(experimentModel);
    case 'running':
      return await runExperiment(experimentModel, clients);
    case 'finished':
      return await finishExperiment(experimentModel, clients);
  }
}
