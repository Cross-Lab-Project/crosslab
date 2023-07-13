import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { getPeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /peerconnections/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const getPeerconnectionsByPeerconnectionId: getPeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        logger.log('info', 'getPeerconnectionsByPeerconnectionId called')

        const peerconnectionModel = await peerconnectionRepository.findOneOrFail({
            where: { uuid: parameters.peerconnection_id },
        })

        logger.log('info', 'getPeerconnectionsByPeerconnectionId succeeded')

        return {
            status: 200,
            body: await peerconnectionRepository.format(peerconnectionModel),
        }
    }
