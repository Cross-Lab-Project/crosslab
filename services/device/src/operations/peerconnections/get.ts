import { peerconnectionRepository } from '../../database/repositories/peerconnection'
import { getPeerconnectionsSignature } from '../../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /peerconnections endpoint.
 * @param _user The user submitting the request.
 */
export const getPeerconnections: getPeerconnectionsSignature = async (_user) => {
    logger.log('info', 'getPeerconnections called')

    const peerconnectionModels = await peerconnectionRepository.find()

    logger.log('info', 'getPeerconnections succeeded')

    return {
        status: 200,
        body: peerconnectionModels.map(peerconnectionRepository.formatOverview),
    }
}
