import fetch from 'node-fetch';

import { config } from '../config.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';

export async function saveExperiment(experiment: ExperimentModel) {
  await repositories.experiment.save(experiment);
  experiment = await repositories.experiment.findOneOrFail({
    where: { uuid: experiment.uuid },
  });
  console.log('experiment', experiment);
  fetch(new URL('/grading', config.BASE_URL.replace('api.', 'lti.')).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      callbackType: 'event',
      eventType: 'experiment-changed',
      experiment: await repositories.experiment.format(experiment),
    }),
  });
}
