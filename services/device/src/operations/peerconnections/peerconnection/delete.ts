import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { deletePeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures'
import { ClosePeerconnectionMessage } from '../../../generated/types'
import { apiClient } from '../../../globals'
import { sendClosedCallback } from '../../../methods/callbacks'
import { peerconnectionUrlFromId } from '../../../methods/utils'

/**
 * This function implements the functionality for handling DELETE requests on /peerconnection/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        console.log(`deletePeerconnectionsByPeerconnectionId called`)

        const peerconnection = await peerconnectionRepository.findOneOrFail({
            where: { uuid: parameters.peerconnection_id },
        })

        await peerconnectionRepository.remove(peerconnection)

        if (peerconnection.status === 'connected') {
            const closePeerconnectionMessage: ClosePeerconnectionMessage = {
                messageType: 'command',
                command: 'closePeerconnection',
                connectionUrl: peerconnectionUrlFromId(peerconnection.uuid),
            }

            if (peerconnection.deviceA.url && peerconnection.deviceB.url) {
                await apiClient.sendSignalingMessage(
                    peerconnection.deviceA.url,
                    closePeerconnectionMessage,
                    peerconnectionUrlFromId(peerconnection.uuid)
                )

                await apiClient.sendSignalingMessage(
                    peerconnection.deviceB.url,
                    closePeerconnectionMessage,
                    peerconnectionUrlFromId(peerconnection.uuid)
                )
            }

            await sendClosedCallback(peerconnection)
        }

        console.log(`deletePeerconnectionsByPeerconnectionId succeeded`)

        return {
            status: 204,
        }
    }
