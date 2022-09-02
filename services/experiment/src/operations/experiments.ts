import {
    postExperimentsSignature,
    getExperimentsByExperimentIdSignature,
    deleteExperimentsByExperimentIdSignature,
    patchExperimentsByExperimentIdSignature,
    getExperimentsSignature,
} from '../generated/signatures/experiments'
import { AppDataSource } from '../data_source'
import { ExperimentModel } from '../model'
import { formatExperiment } from '../methods/format'
import { writeExperiment } from '../methods/write'
import {
    bookExperiment,
    finishExperiment,
    startExperiment,
} from '../methods/experimentStatus'
import { InconsistentDatabaseError, MissingEntityError } from '../types/errors'

/**
 * This function implements the functionality for handling GET requests on /experiments endpoint.
 * @param _user The user submitting the request.
 */
export const getExperiments: getExperimentsSignature = async (_user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiments = await experimentRepository.find()

    return {
        status: 200,
        body: experiments.map(formatExperiment),
    }
}

/**
 * This function implements the functionality for handling POST requests on /experiments endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postExperiments: postExperimentsSignature = async (body, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = experimentRepository.create()
    await writeExperiment(experiment, body)
    const requestedStatus = experiment.status
    experiment.status = 'created'
    await experimentRepository.save(experiment)

    if (requestedStatus === 'booked') await bookExperiment(experiment)
    if (requestedStatus === 'running') await startExperiment(experiment)
    if (requestedStatus === 'finished') await finishExperiment(experiment)
    await experimentRepository.save(experiment)

    return {
        status: 201,
        body: formatExperiment(experiment),
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
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = await experimentRepository.findOne({
        where: {
            uuid: parameters.experiment_id,
        },
        relations: {
            devices: true,
            connections: true,
            roles: true,
            serviceConfigurations: true,
        },
    })

    if (!experiment) {
        throw new MissingEntityError(
            `Could not find experiment ${parameters.experiment_id}`,
            404
        )
    }

    return {
        status: 200,
        body: formatExperiment(experiment),
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /experiments/{experiment_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature =
    async (parameters, _user) => {
        const experimentRepository = AppDataSource.getRepository(ExperimentModel)
        const result = await experimentRepository.softDelete({
            uuid: parameters.experiment_id,
        })

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
        const experimentRepository = AppDataSource.getRepository(ExperimentModel)
        const experiment = await experimentRepository.findOneBy({
            uuid: parameters.experiment_id,
        })

        if (!experiment) {
            throw new MissingEntityError(
                `Could not find experiment ${parameters.experiment_id}`,
                404
            )
        }

        if (body) await writeExperiment(experiment, body)

        if (experiment.status === 'booked') bookExperiment(experiment)
        if (experiment.status === 'running') startExperiment(experiment)
        if (experiment.status === 'finished') finishExperiment(experiment)
        await experimentRepository.save(experiment)

        return {
            status: 200,
            body: formatExperiment(experiment),
        }
    }
