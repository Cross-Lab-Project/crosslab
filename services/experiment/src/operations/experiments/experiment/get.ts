import { repositories } from '../../../database/dataSource';
import { getExperimentsByExperimentIdSignature } from '../../../generated/signatures';
import { experimentUrlFromId } from '../../../methods/url';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling GET requests on
 * /experiments/{experiment_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const getExperimentsByExperimentId: getExperimentsByExperimentIdSignature = async (
    authorization,
    parameters,
) => {
    logger.log(
        'info',
        `Handling GET request on endpoint /experiments/${parameters.experiment_id}`,
    );

    await authorization.check_authorization_or_fail(
        'view',
        `experiment:${experimentUrlFromId(parameters.experiment_id)}`,
    );

    const experimentModel = await repositories.experiment.findOneOrFail({
        where: { uuid: parameters.experiment_id },
    });

    logger.log(
        'info',
        `Successfully handled GET request on endpoint /experiments/${parameters.experiment_id}`,
    );

    return {
        status: 200,
        body: await repositories.experiment.format(experimentModel),
    };
};
