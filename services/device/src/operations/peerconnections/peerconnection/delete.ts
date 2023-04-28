import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { deletePeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures'
import { ClosePeerconnectionMessage } from '../../../generated/types'
import { apiClient } from '../../../globals'
import { sendClosedCallback, sendStatusChangedCallback } from '../../../methods/callbacks'
import { peerconnectionUrlFromId } from '../../../methods/urlFromId'

/**
 * This function implements the functionality for handling DELETE requests on /peerconnection/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        console.log(`deletePeerconnectionsByPeerconnectionId called`)

        const peerconnectionModel = await peerconnectionRepository.findOneOrFail({
            where: { uuid: parameters.peerconnection_id },
        })

        const closePeerconnectionMessage: ClosePeerconnectionMessage = {
            messageType: 'command',
            command: 'closePeerconnection',
            connectionUrl: peerconnectionUrlFromId(peerconnectionModel.uuid),
        }

        // TODO: handle possible errors
        try {
            await apiClient.sendSignalingMessage(
                peerconnectionModel.deviceA.url,
                closePeerconnectionMessage,
                peerconnectionUrlFromId(peerconnectionModel.uuid)
            )
        } catch (error) {
            console.error(error)
        }

        try {
            await apiClient.sendSignalingMessage(
                peerconnectionModel.deviceB.url,
                closePeerconnectionMessage,
                peerconnectionUrlFromId(peerconnectionModel.uuid)
            )
        } catch (error) {
            console.error(error)
        }

        await sendClosedCallback(peerconnectionModel)
        await sendStatusChangedCallback(peerconnectionModel)

        await peerconnectionRepository.remove(peerconnectionModel)

        console.log(`deletePeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 204,
        }
    }
