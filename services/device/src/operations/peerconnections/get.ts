import { peerconnectionRepository } from '../../database/repositories/peerconnection'
import { getPeerconnectionsSignature } from '../../generated/signatures'

/**
 * This function implements the functionality for handling GET requests on /peerconnections endpoint.
 * @param _user The user submitting the request.
 */
export const getPeerconnections: getPeerconnectionsSignature = async (_user) => {
    console.log(`getPeerconnections called`)
    const peerconnections = await peerconnectionRepository.find()

    console.log(`getPeerconnections succeeded`)

    return {
        status: 200,
        body: peerconnections.map(peerconnectionRepository.formatOverview),
    }
}
