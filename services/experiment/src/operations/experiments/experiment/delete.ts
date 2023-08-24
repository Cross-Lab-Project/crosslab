import { repositories } from '../../../database/dataSource';
import { deleteExperimentsByExperimentIdSignature } from '../../../generated/signatures';
import { finishExperiment } from '../../../methods/experimentStatus';
import { experimentUrlFromId } from '../../../methods/url';
import { logger } from '@crosslab/service-common';

/**
 * This function implements the functionality for handling DELETE requests on
 * /experiments/{experiment_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature =
    async (authorization, parameters) => {
        logger.log(
            'info',
            `Handling DELETE request on endpoint /experiments/${parameters.experiment_id}`,
        );

        await authorization.check_authorization_or_fail(
            'delete',
            `experiment:${experimentUrlFromId(parameters.experiment_id)}`,
        );

        const experimentModel = await repositories.experiment.findOneOrFail({
            where: { uuid: parameters.experiment_id },
            relations: {
                connections: true,
                devices: {
                    instance: true,
                },
                roles: true,
                serviceConfigurations: {
                    participants: true,
                },
            },
        });

        if (experimentModel.status !== 'finished')
            await finishExperiment(experimentModel);

        await repositories.experiment.remove(experimentModel);

        logger.log(
            'info',
            `Successfully handled DELETE request on endpoint /experiments/${parameters.experiment_id}`,
        );

        return {
            status: 204,
        };
    };
