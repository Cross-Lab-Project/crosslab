import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { getPeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures'

/**
 * This function implements the functionality for handling GET requests on /peerconnections/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const getPeerconnectionsByPeerconnectionId: getPeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        console.log(`getPeerconnectionsByPeerconnectionId called`)

        const peerconnection = await peerconnectionRepository.findOneOrFail({
            where: { uuid: parameters.peerconnection_id },
        })

        console.log(`getPeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 200,
            body: await peerconnectionRepository.format(peerconnection),
        }
    }
