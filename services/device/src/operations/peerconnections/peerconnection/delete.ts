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

        const peerconnectionModel = await peerconnectionRepository.findOne({
            where: { uuid: parameters.peerconnection_id },
        })

        if (!peerconnectionModel)
            return {
                status: 204,
            }

        if (
            peerconnectionModel.status === 'connecting' ||
            peerconnectionModel.status === 'connected' ||
            peerconnectionModel.status === 'disconnected'
        ) {
            const closePeerconnectionMessage: ClosePeerconnectionMessage = {
                messageType: 'command',
                command: 'closePeerconnection',
                connectionUrl: peerconnectionUrlFromId(peerconnectionModel.uuid),
            }

            await apiClient.sendSignalingMessage(
                peerconnectionModel.deviceA.url,
                closePeerconnectionMessage,
                peerconnectionUrlFromId(peerconnectionModel.uuid)
            )

            await apiClient.sendSignalingMessage(
                peerconnectionModel.deviceB.url,
                closePeerconnectionMessage,
                peerconnectionUrlFromId(peerconnectionModel.uuid)
            )

            await sendClosedCallback(peerconnectionModel)
            await sendStatusChangedCallback(peerconnectionModel)
        }

        await peerconnectionRepository.remove(peerconnectionModel)

        console.log(`deletePeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 204,
        }
    }
