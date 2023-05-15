import { experimentRepository } from '../../../database/repositories/experiment'
import { getExperimentsByExperimentIdSignature } from '../../../generated/signatures'
import { logger } from '../../../util/logger'

/**
 * This function implements the functionality for handling GET requests on
 * /experiments/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const getExperimentsByExperimentId: getExperimentsByExperimentIdSignature = async (
    parameters,
    _user
) => {
    logger.log(
        'info',
        `Handling GET request on endpoint /experiments/${parameters.experiment_id}`
    )

    const experimentModel = await experimentRepository.findOneOrFail({
        where: { uuid: parameters.experiment_id },
    })

    logger.log(
        'info',
        `Successfully handled GET request on endpoint /experiments/${parameters.experiment_id}`
    )

    return {
        status: 200,
        body: await experimentRepository.format(experimentModel),
    }
}
