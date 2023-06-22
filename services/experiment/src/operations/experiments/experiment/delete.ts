import { repositories } from '../../../database/dataSource'
import { deleteExperimentsByExperimentIdSignature } from '../../../generated/signatures'
import { finishExperiment } from '../../../methods/experimentStatus'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling DELETE requests on
 * /experiments/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature =
    async (parameters, _user) => {
        logger.log(
            'info',
            `Handling DELETE request on endpoint /experiments/${parameters.experiment_id}`
        )

        const experimentModel = await repositories.experiment.findOneOrFail({
            where: { uuid: parameters.experiment_id },
            relations: {
                connections: true,
                devices: true,
                roles: true,
                serviceConfigurations: {
                    participants: true,
                },
            },
        })

        if (experimentModel.status !== 'finished') await finishExperiment(experimentModel)

        await repositories.experiment.remove(experimentModel)

        logger.log(
            'info',
            `Successfully handled DELETE request on endpoint /experiments/${parameters.experiment_id}`
        )

        return {
            status: 204,
        }
    }
