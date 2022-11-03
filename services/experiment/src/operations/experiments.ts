import {
    postExperimentsSignature,
    getExperimentsByExperimentIdSignature,
    deleteExperimentsByExperimentIdSignature,
    patchExperimentsByExperimentIdSignature,
    getExperimentsSignature,
} from '../generated/signatures/experiments'
import { formatExperimentModel } from '../database/methods/format'
import { writeExperimentModel } from '../database/methods/write'
import { bookExperiment, finishExperiment, runExperiment } from '../util/experimentStatus'
import { InconsistentDatabaseError, MissingEntityError } from '../types/errors'
import {
    findAllExperimentModels,
    findExperimentModelById,
} from '../database/methods/find'
import { createExperimentModel } from '../database/methods/create'
import { saveExperimentModel } from '../database/methods/save'
import { deleteExperimentModelById } from '../database/methods/delete'

/**
 * This function implements the functionality for handling GET requests on /experiments endpoint.
 * @param _user The user submitting the request.
 */
export const getExperiments: getExperimentsSignature = async (_user) => {
    const experiments = await findAllExperimentModels()

    return {
        status: 200,
        body: experiments.map(formatExperimentModel),
    }
}

/**
 * This function implements the functionality for handling POST requests on /experiments endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postExperiments: postExperimentsSignature = async (body, _user) => {
    const experimentModel = createExperimentModel(body)
    const requestedStatus = body.status
    await saveExperimentModel(experimentModel)

    if (requestedStatus === 'booked') await bookExperiment(experimentModel)
    if (requestedStatus === 'running') await runExperiment(experimentModel)
    if (requestedStatus === 'finished') await finishExperiment(experimentModel)
    await saveExperimentModel(experimentModel) // NOTE: truly needed?

    return {
        status: 201,
        body: formatExperimentModel(experimentModel),
    }
}

/**
 * This function implements the functionality for handling GET requests on /experiments/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const getExperimentsByExperimentId: getExperimentsByExperimentIdSignature = async (
    parameters,
    _user
) => {
    const experimentModel = await findExperimentModelById(parameters.experiment_id)

    if (!experimentModel) {
        throw new MissingEntityError(
            `Could not find experiment model ${parameters.experiment_id}`,
            404
        )
    }

    return {
        status: 200,
        body: formatExperimentModel(experimentModel),
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /experiments/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature =
    async (parameters, _user) => {
        const result = await deleteExperimentModelById(parameters.experiment_id)

        if (!result.affected) {
            throw new MissingEntityError(
                `Could not find experiment ${parameters.experiment_id}`,
                404
            )
        }

        if (result.affected > 1) {
            throw new InconsistentDatabaseError(
                `More than one experiment with id ${parameters.experiment_id} deleted`,
                500
            )
        }

        return {
            status: 204,
        }
    }

/**
 * This function implements the functionality for handling PATCH requests on /experiment/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const patchExperimentsByExperimentId: patchExperimentsByExperimentIdSignature =
    async (parameters, body, _user) => {
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

        return {
            status: 200,
            body: formatExperimentModel(experimentModel),
        }
    }
