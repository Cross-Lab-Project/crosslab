import { logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { postExperimentsSignature } from '../../generated/signatures.js';
import { changedCallbacks } from '../../methods/callbacks.js';
import { transitionExperiment } from '../../methods/experimentStatus/index.js';
import { experimentUrlFromId } from '../../methods/url.js';

/**
 * This function implements the functionality for handling POST requests on
 * /experiments endpoint.
 * @param authorization The authorization helper object for the request.
 * @param body The body of the request.
 */
export const postExperiments: postExperimentsSignature = async (
  req,
  parameters,
  body,
) => {
  logger.log('info', 'Handling POST request on endpoint /experiments');

  await req.authorization.check_authorization_or_fail('create', 'experiment');

  const experimentModel = await repositories.experiment.create(body);
  await repositories.experiment.save(experimentModel);

  await transitionExperiment(experimentModel, body.status, req.clients);

  await req.authorization.relate(
    req.authorization.user,
    'owner',
    `experiment:${experimentUrlFromId(experimentModel.uuid)}`,
  );

  await repositories.experiment.save(experimentModel); // NOTE: truly needed?

  if (parameters.changedURL) {
    logger.log(
      'info',
      `registering changed-callback for experiment '${experimentUrlFromId(
        experimentModel.uuid,
      )}' to '${parameters.changedURL}'`,
    );
    const changedCallbackURLs = changedCallbacks.get(experimentModel.uuid) ?? [];
    changedCallbackURLs.push(parameters.changedURL);
    changedCallbacks.set(experimentModel.uuid, changedCallbackURLs);
  }

  logger.log('info', 'Successfully handled POST request on endpoint /experiments', {
    data: {
      user: req.authorization.user,
      experiment: experimentUrlFromId(experimentModel.uuid),
    },
  });

  return {
    status: 201,
    body: await repositories.experiment.format(experimentModel),
  };
};
