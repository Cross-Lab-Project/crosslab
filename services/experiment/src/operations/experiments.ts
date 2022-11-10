import {
    postExperimentsSignature,
    getExperimentsByExperimentIdSignature,
    deleteExperimentsByExperimentIdSignature,
    patchExperimentsByExperimentIdSignature,
    getExperimentsSignature,
    getExperimentsSuccessResponseType,
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
import { RequestHandler } from '../util/requestHandler'

/**
 * This function implements the functionality for handling GET requests on
 * /experiments endpoint.
 * @param _user The user submitting the request.
 */
export const getExperiments: getExperimentsSignature = async (_user) => {
    const requestHandler: RequestHandler = new RequestHandler('getExperiments')
    requestHandler.log('info', `Handling GET request on endpoint /experiments`)

    const experiments = await requestHandler.executeAsync(findAllExperimentModels)

    const result: getExperimentsSuccessResponseType = {
        status: 200,
        body: experiments.map((e) => requestHandler.executeSync(formatExperimentModel, e)),
    }

    requestHandler.log(
        'info',
        `Successfully handled GET request on endpoint /experiments`
    )
    return result
}

/**
 * This function implements the functionality for handling POST requests on
 * /experiments endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postExperiments: postExperimentsSignature = async (body, _user) => {
    const requestHandler: RequestHandler = new RequestHandler('postExperiments')
    requestHandler.log('info', `Handling POST request on endpoint /experiments`)

    const experimentModel = requestHandler.executeSync(createExperimentModel, body)
    const requestedStatus = body.status
    await requestHandler.executeAsync(saveExperimentModel, experimentModel)

    if (requestedStatus === 'booked')
        await requestHandler.executeAsync(bookExperiment, experimentModel)
    if (requestedStatus === 'running')
        await requestHandler.executeAsync(runExperiment, experimentModel)
    if (requestedStatus === 'finished')
        await requestHandler.executeAsync(finishExperiment, experimentModel)
    await requestHandler.executeAsync(saveExperimentModel, experimentModel) // NOTE: truly needed?

    return {
        status: 201,
        body: requestHandler.executeSync(formatExperimentModel, experimentModel),
    }
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
    const requestHandler: RequestHandler = new RequestHandler('getExperimentsByExperimentId')
    requestHandler.log(
        'info',
        `Handling GET request on endpoint /experiments/${parameters.experiment_id}`
    )

    const experimentModel = await requestHandler.executeAsync(
        findExperimentModelById,
        parameters.experiment_id
    )

    if (!experimentModel) {
        requestHandler.throw(MissingEntityError,
            `Could not find experiment model ${parameters.experiment_id}`,
            404
        )
    }

    return {
        status: 200,
        body: requestHandler.executeSync(formatExperimentModel, experimentModel),
    }
}

/**
 * This function implements the functionality for handling DELETE requests on
 * /experiments/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature =
    async (parameters, _user) => {
        const requestHandler: RequestHandler = new RequestHandler('deleteExperimentsByExperimentId')
        requestHandler.log(
            'info',
            `Handling DELETE request on endpoint /experiments/${parameters.experiment_id}`
        )
    
        const result = await requestHandler.executeAsync(
            deleteExperimentModelById,
            parameters.experiment_id
        )
    
        if (!result.affected) {
            requestHandler.throw(MissingEntityError,
                `Could not find experiment model ${parameters.experiment_id}`,
                404
            )
        }
    
        if (result.affected > 1) {
            requestHandler.throw(InconsistentDatabaseError,
                `More than one experiment model with id ${parameters.experiment_id} deleted`,
                500
            )
        }
    
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
        const requestHandler: RequestHandler = new RequestHandler('patchExperimentsByExperimentId')
        requestHandler.log(
            'info',
            `Handling PATCH request on endpoint /experiments/${parameters.experiment_id}`
        )

        const experimentModel = await requestHandler.executeAsync(
            findExperimentModelById,
            parameters.experiment_id
        )

        if (!experimentModel) {
            requestHandler.throw(MissingEntityError,
                `Could not find experiment model ${parameters.experiment_id}`,
                404
            )
        }

        if (body) requestHandler.executeSync(writeExperimentModel, experimentModel, body)

        if (experimentModel.status === 'booked')
            await requestHandler.executeAsync(bookExperiment, experimentModel)
        if (experimentModel.status === 'running')
            await requestHandler.executeAsync(runExperiment, experimentModel)
        if (experimentModel.status === 'finished')
            await requestHandler.executeAsync(finishExperiment, experimentModel)
        await requestHandler.executeAsync(saveExperimentModel, experimentModel)

        return {
            status: 200,
            body: requestHandler.executeSync(formatExperimentModel, experimentModel),
        }
    }