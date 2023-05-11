import { createExperimentModel } from '../database/methods/create'
import { deleteExperimentModelById } from '../database/methods/delete'
import {
    findAllExperimentModels,
    findExperimentModelById,
} from '../database/methods/find'
import { formatExperimentModel } from '../database/methods/format'
import { saveExperimentModel } from '../database/methods/save'
import { writeExperimentModel } from '../database/methods/write'
import {
    postExperimentsSignature,
    getExperimentsByExperimentIdSignature,
    deleteExperimentsByExperimentIdSignature,
    patchExperimentsByExperimentIdSignature,
    getExperimentsSignature,
} from '../generated/signatures'
import { InconsistentDatabaseError, MissingEntityError } from '../types/errors'
import { bookExperiment, finishExperiment, runExperiment } from '../util/experimentStatus'
import { logger } from '../util/logger'

/**
 * This function implements the functionality for handling GET requests on
 * /experiments endpoint.
 * @param _user The user submitting the request.
 */
export const getExperiments: getExperimentsSignature = async (_user) => {
    logger.log('info', `Handling GET request on endpoint /experiments`)

    const experiments = await findAllExperimentModels()

    const result: ReturnType<getExperimentsSignature> = {
        status: 200,
        body: experiments.map((experiment) => formatExperimentModel(experiment)),
    }

    logger.log('info', `Successfully handled GET request on endpoint /experiments`)

    return result
}

/**
 * This function implements the functionality for handling POST requests on
 * /experiments endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postExperiments: postExperimentsSignature = async (body, _user) => {
    logger.log('info', `Handling POST request on endpoint /experiments`)

    const experimentModel = createExperimentModel(body)
    const requestedStatus = body.status
    await saveExperimentModel(experimentModel)

    if (requestedStatus === 'booked') await bookExperiment(experimentModel)
    if (requestedStatus === 'running') await runExperiment(experimentModel)
    if (requestedStatus === 'finished') await finishExperiment(experimentModel)
    await saveExperimentModel(experimentModel) // NOTE: truly needed?

    const result: ReturnType<postExperimentsSignature> = {
        status: 201,
        body: formatExperimentModel(experimentModel),
    }

    logger.log('info', `Successfully handled POST request on endpoint /experiments`)

    return result
}

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

    const experimentModel = await findExperimentModelById(parameters.experiment_id)

    if (!experimentModel) {
        throw new MissingEntityError(
            `Could not find experiment model ${parameters.experiment_id}`,
            404
        )
    }

    const result: ReturnType<getExperimentsByExperimentIdSignature> = {
        status: 200,
        body: formatExperimentModel(experimentModel),
    }

    logger.log(
        'info',
        `Successfully handled GET request on endpoint /experiments/${parameters.experiment_id}`
    )

    return result
}

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

        const experimentModel = await findExperimentModelById(parameters.experiment_id)

        if (!experimentModel)
            throw new MissingEntityError(
                `Could not find experiment model ${parameters.experiment_id}`,
                404
            )

        if (experimentModel?.status !== 'finished')
            await finishExperiment(experimentModel)

        const result = await deleteExperimentModelById(parameters.experiment_id)

        if (!result.affected) {
            throw new MissingEntityError(
                `Could not find experiment model ${parameters.experiment_id}`,
                404
            )
        }

        if (result.affected > 1) {
            throw new InconsistentDatabaseError(
                `More than one experiment model with id ${parameters.experiment_id} deleted`,
                500
            )
        }

        logger.log(
            'info',
            `Successfully handled DELETE request on endpoint /experiments/${parameters.experiment_id}`
        )

        return {
            status: 204,
        }
    }

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

        const experimentModel = await findExperimentModelById(parameters.experiment_id)

        if (!experimentModel) {
            throw new MissingEntityError(
                `Could not find experiment model ${parameters.experiment_id}`,
                404
            )
        }

        if (body) writeExperimentModel(experimentModel, body)

        if (experimentModel.status === 'booked') await bookExperiment(experimentModel)
        if (experimentModel.status === 'running') await runExperiment(experimentModel)
        if (experimentModel.status === 'finished') await finishExperiment(experimentModel)
        await saveExperimentModel(experimentModel)

        const result: ReturnType<patchExperimentsByExperimentIdSignature> = {
            status: 200,
            body: formatExperimentModel(experimentModel),
        }

        logger.log(
            'info',
            `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`
        )

        return result
    }
