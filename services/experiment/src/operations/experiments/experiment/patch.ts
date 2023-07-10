import { repositories } from '../../../database/dataSource'
import { patchExperimentsByExperimentIdSignature } from '../../../generated/signatures'
import {
    runExperiment,
    finishExperiment,
    bookExperiment,
} from '../../../methods/experimentStatus'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling PATCH requests on
 * /experiment/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const patchExperimentsByExperimentId: patchExperimentsByExperimentIdSignature =
    async (parameters, body, _user) => {
        logger.log(
            'info',
            `Handling PATCH request on endpoint /experiments/${parameters.experiment_id}`
        )
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
        })

        if (body) await repositories.experiment.write(experimentModel, body)

        if (experimentModel.status === 'booked') await bookExperiment(experimentModel)
        if (experimentModel.status === 'running') await runExperiment(experimentModel)
        if (experimentModel.status === 'finished') await finishExperiment(experimentModel)
        await repositories.experiment.save(experimentModel)

        logger.log(
            'info',
            `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`
        )

        return {
            status: 200,
            body: await repositories.experiment.format(experimentModel),
        }
    }
