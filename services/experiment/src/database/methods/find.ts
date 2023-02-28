import { RequestHandler } from '../../util/requestHandler'
import { experimentRepository, peerconnectionRepository } from '../repositories'

/**
 * This function returns all experiment models found in the database.
 * @returns All experiment models found in the database.
 */
export async function findAllExperimentModels(_requestHandler: RequestHandler) {
    return await experimentRepository.find()
}

/**
 * This function attempts to find a specific experiment model by its id.
 * @param experimentModelId The id of the experiment model.
 * @returns The found experiment model.
 */
export async function findExperimentModelById(
    _requestHandler: RequestHandler,
    experimentModelId: string
) {
    return await experimentRepository.findOne({
        where: {
            uuid: experimentModelId,
        },
        relations: {
            devices: true,
            connections: true,
            roles: true,
            serviceConfigurations: true,
        },
    })
}

/**
 * This function attempts to find a specific peerconnection model by its url.
 * @param peerconnectionUrl The url of the peerconnection model.
 * @returns The found peerconnection model.
 */
export async function findPeerconnectionModelByUrl(
    _requestHandler: RequestHandler,
    peerconnectionUrl: string
) {
    return await peerconnectionRepository.findOne({
        where: {
            url: peerconnectionUrl,
        },
        relations: {
            experiment: {
                connections: true
            }
        },
    })
}
