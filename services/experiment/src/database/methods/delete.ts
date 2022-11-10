import { RequestHandler } from '../../util/requestHandler'
import { experimentRepository } from '../repositories'

/**
 * This function attempts to delete a given experiment model.
 * @param experimentModelId The id of the experiment model to be deleted.
 */
export async function deleteExperimentModelById(
    requestHandler: RequestHandler,
    experimentModelId: string
) {
    requestHandler.log(
        'debug',
        `Attempting to delete experiment model "${experimentModelId}"`
    )
    return await experimentRepository.softDelete({ uuid: experimentModelId })
}
