import { logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { getExperimentsSignature } from '../../generated/signatures.js';
import { experimentUrlFromId } from '../../methods/url.js';

/**
 * This function implements the functionality for handling GET requests on
 * /experiments endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getExperiments: getExperimentsSignature = async (req, parameters) => {
  logger.log('info', 'Handling GET request on endpoint /experiments');

  await req.authorization.check_authorization_or_fail('view', 'experiment');

  const experimentModels = await repositories.experiment.find();

  const visibility = await Promise.all(
    experimentModels.map(experiment =>
      req.authorization.check_authorization(
        'view',
        `experiment:${experimentUrlFromId(experiment.uuid)}`,
      ),
    ),
  );

  const visibleExperiments = experimentModels.filter(
    (_value, index) => visibility[index].result,
  );

  const experiments = parameters.experimentStatus
    ? visibleExperiments.filter(
        experiment => experiment.status === parameters.experimentStatus,
      )
    : visibleExperiments;

  logger.log('info', 'Successfully handled GET request on endpoint /experiments');

  return {
    status: 200,
    body: await Promise.all(experiments.map(repositories.experiment.formatOverview)),
  };
};
