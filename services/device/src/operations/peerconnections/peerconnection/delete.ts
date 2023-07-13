import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { deletePeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures'
import { ClosePeerconnectionMessage } from '../../../generated/types'
import { apiClient } from '../../../globals'
import { sendClosedCallback, sendStatusChangedCallback } from '../../../methods/callbacks'
import { peerconnectionUrlFromId } from '../../../methods/urlFromId'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling DELETE requests on /peerconnection/{peerconnection_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const deletePeerconnectionsByPeerconnectionId: deletePeerconnectionsByPeerconnectionIdSignature =
    async (parameters, _user) => {
        logger.log('info', 'deletePeerconnectionsByPeerconnectionId called')

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
            logger.log(
                'error',
                `An error occurred while sending a close-peerconnection message to device '${peerconnectionModel.deviceA.url}'`,
                { data: { error } }
            )
        }

        try {
            await apiClient.sendSignalingMessage(
                peerconnectionModel.deviceB.url,
                closePeerconnectionMessage,
                peerconnectionUrlFromId(peerconnectionModel.uuid)
            )
        } catch (error) {
            logger.log(
                'error',
                `An error occurred while sending a close-peerconnection message to device '${peerconnectionModel.deviceB.url}'`,
                { data: { error } }
            )
        }

        await sendClosedCallback(peerconnectionModel)
        await sendStatusChangedCallback(peerconnectionModel)

        await peerconnectionRepository.remove(peerconnectionModel)

        logger.log('info', 'deletePeerconnectionsByPeerconnectionId succeeded')

        return {
            status: 204,
        }
    }
