import { repositories } from '../../database/dataSource'
import { postExperimentsSignature } from '../../generated/signatures'
import {
    runExperiment,
    finishExperiment,
    bookExperiment,
} from '../../methods/experimentStatus'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on
 * /experiments endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postExperiments: postExperimentsSignature = async (body, _user) => {
    logger.log('info', 'Handling POST request on endpoint /experiments')

    const experimentModel = await repositories.experiment.create(body)
    const requestedStatus = body.status
    await repositories.experiment.save(experimentModel)

    if (requestedStatus === 'booked') await bookExperiment(experimentModel)
    if (requestedStatus === 'running') await runExperiment(experimentModel)
    if (requestedStatus === 'finished') await finishExperiment(experimentModel)
    await repositories.experiment.save(experimentModel) // NOTE: truly needed?

    logger.log('info', 'Successfully handled POST request on endpoint /experiments')

    return {
        status: 201,
        body: await repositories.experiment.format(experimentModel),
    }
}
