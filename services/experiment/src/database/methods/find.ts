import { RequestHandler } from '../../util/requestHandler'
import { experimentRepository, peerconnectionRepository } from '../repositories'

/**
 * This function returns all experiment models found in the database.
 * @returns All experiment models found in the database.
 */
export async function findAllExperimentModels(requestHandler: RequestHandler) {
    requestHandler.log('debug', `Attempting to find all experiment models`)
    return await experimentRepository.find()
}

/**
 * This function attempts to find a specific experiment model by its id.
 * @param experimentModelId The id of the experiment model.
 * @returns The found experiment model.
 */
export async function findExperimentModelById(
    requestHandler: RequestHandler,
    experimentModelId: string
) {
    requestHandler.log(
        'debug',
        `Attempting to find experiment model "${experimentModelId}"`
    )
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
    requestHandler: RequestHandler,
    peerconnectionUrl: string
) {
    requestHandler.log(
        'debug',
        `Attempting to find peerconnection model with url "${peerconnectionUrl}"`
    )
    return await peerconnectionRepository.findOne({
        where: {
            url: peerconnectionUrl,
        },
        relations: {
            experiment: true,
        },
    })
}
