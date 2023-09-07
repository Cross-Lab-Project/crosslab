import { repositories } from '../../database/dataSource.js';
import { getExperimentsSignature } from '../../generated/signatures.js';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling GET requests on
 * /experiments endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getExperiments: getExperimentsSignature = async (authorization) => {
    logger.log('info', 'Handling GET request on endpoint /experiments');

    await authorization.check_authorization_or_fail('view', 'experiment');

    const experimentModels = await repositories.experiment.find();

    logger.log('info', 'Successfully handled GET request on endpoint /experiments');

    return {
        status: 200,
        body: await Promise.all(
            experimentModels.map(repositories.experiment.formatOverview),
        ),
    };
};
