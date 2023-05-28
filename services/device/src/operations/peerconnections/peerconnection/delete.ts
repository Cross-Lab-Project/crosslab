import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { deletePeerconnectionsByPeerconnectionIdSignature } from '../../../generated/signatures'
import { signalingQueueManager } from '../../../methods/signaling/signalingQueueManager'
import { peerconnectionUrlFromId } from '../../../methods/urlFromId'
import { logger } from '@crosslab/service-common'

export const deleteOnClose: Set<string> = new Set()

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

        if (
            peerconnectionModel.deviceA.status === 'closed' &&
            peerconnectionModel.deviceB.status === 'closed'
        ) {
            signalingQueueManager.addOnCloseHandler(
                peerconnectionModel.uuid,
                async () => {
                    try {
                        await peerconnectionRepository.remove(peerconnectionModel)
                        console.log('PEERCONNECTION REMOVED SQM')
                    } catch (error) {
                        logger.log(
                            'error',
                            `Something went wrong while trying to delete peerconnection '${peerconnectionUrlFromId(
                                peerconnectionModel.uuid
                            )}'`,
                            { data: { error } }
                        )
                    }
                }
            )
            signalingQueueManager.closeSignalingQueues(peerconnectionModel.uuid)
        } else {
            deleteOnClose.add(peerconnectionModel.uuid)
            signalingQueueManager.closeSignalingQueues(peerconnectionModel.uuid)
        }

        logger.log('info', 'deletePeerconnectionsByPeerconnectionId succeeded')

        return {
            status: 202,
        }
    }
