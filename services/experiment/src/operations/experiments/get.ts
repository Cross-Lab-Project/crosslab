import { logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { getExperimentsSignature } from '../../generated/signatures.js';

/**
 * This function implements the functionality for handling GET requests on
 * /experiments endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getExperiments: getExperimentsSignature = async req => {
  logger.log('info', 'Handling GET request on endpoint /experiments');

  await req.authorization.check_authorization_or_fail('view', 'experiment');

  const experimentModels = await repositories.experiment.find();

  logger.log('info', 'Successfully handled GET request on endpoint /experiments');

  return {
    status: 200,
    body: await Promise.all(experimentModels.map(repositories.experiment.formatOverview)),
  };
};
