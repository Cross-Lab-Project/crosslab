import { logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { postExperimentsSignature } from '../../generated/signatures.js';
import { saveExperiment } from '../../methods/experimentChangedEvent.js';
import {
  bookExperiment,
  finishExperiment,
  runExperiment,
} from '../../methods/experimentStatus/index.js';
import { experimentUrlFromId } from '../../methods/url.js';

/**
 * This function implements the functionality for handling POST requests on
 * /experiments endpoint.
 * @param authorization The authorization helper object for the request.
 * @param body The body of the request.
 */
export const postExperiments: postExperimentsSignature = async (req, body) => {
  logger.log('info', 'Handling POST request on endpoint /experiments');

  // NOTE: create action currently does not exist
  await req.authorization.check_authorization_or_fail('create', 'experiment');

  if (body.template === undefined) {
    body.template;
  } else {
    body.template;
  }

  const experimentModel = await repositories.experiment.create({
    ...body,
    status: 'created',
  });
  const requestedStatus = body.status;
  await saveExperiment(experimentModel);

  if (requestedStatus === 'booked') await bookExperiment(experimentModel);
  if (requestedStatus === 'running') await runExperiment(experimentModel, req.clients);
  if (requestedStatus === 'finished')
    await finishExperiment(experimentModel, req.clients);

  await req.authorization.relate(
    req.authorization.user,
    'owner',
    `experiment:${experimentUrlFromId(experimentModel.uuid)}`,
  );

  await saveExperiment(experimentModel); // NOTE: truly needed?

  logger.log('info', 'Successfully handled POST request on endpoint /experiments', {
    data: {
      user: req.authorization.user,
      experiment: experimentUrlFromId(experimentModel.uuid),
    },
  });

  console.log(experimentModel);

  return {
    status: 201,
    body: await repositories.experiment.format(experimentModel),
  };
};
