import { peerconnectionRepository } from '../../../../database/repositories/peerconnection'
import { patchPeerconnectionsByPeerconnectionIdDeviceStatusSignature } from '../../../../generated/signatures'
import { peerconnectionUrlFromId } from '../../../../methods/urlFromId'
import { sendStatusChangedCallback } from '../../../callbacks'
import { UnrelatedPeerconnectionError, logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling PATCH requests on
 * /peerconnections/{peerconnection_id}/device_status endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 */
export const patchPeerconnectionsByPeerconnectionIdDeviceStatus: patchPeerconnectionsByPeerconnectionIdDeviceStatusSignature =
    async (parameters, body, _user) => {
        logger.log('info', 'patchPeerconnectionsByPeerconnectionIdDeviceStatus called')

        const peerconnectionModel = await peerconnectionRepository.findOneOrFail({
            where: { uuid: parameters.peerconnection_id },
        })

        if (
            peerconnectionModel.deviceA.url !== parameters.device_url &&
            peerconnectionModel.deviceB.url !== parameters.device_url
        ) {
            throw new UnrelatedPeerconnectionError(
                `Device '${
                    parameters.device_url
                }' is not taking part in peerconnection '${peerconnectionUrlFromId(
                    peerconnectionModel.uuid
                )}'`,
                400
            )
        }

        if (peerconnectionModel.deviceA.url === parameters.device_url)
            peerconnectionModel.deviceA.status = body.status

        if (peerconnectionModel.deviceB.url === parameters.device_url)
            peerconnectionModel.deviceB.status = body.status

        const oldStatus = peerconnectionModel.status

        if (
            peerconnectionModel.status === 'closed' ||
            peerconnectionModel.deviceA.status === 'closed' ||
            peerconnectionModel.deviceB.status === 'closed'
        ) {
            peerconnectionModel.status = 'closed'
        } else if (
            peerconnectionModel.deviceA.status === 'failed' ||
            peerconnectionModel.deviceB.status === 'failed'
        ) {
            peerconnectionModel.status = 'failed'
        } else if (
            peerconnectionModel.deviceA.status === 'disconnected' ||
            peerconnectionModel.deviceB.status === 'disconnected'
        ) {
            peerconnectionModel.status = 'disconnected'
        } else if (
            peerconnectionModel.deviceA.status === 'connecting' ||
            peerconnectionModel.deviceB.status === 'connecting'
        ) {
            peerconnectionModel.status = 'connecting'
        } else if (
            peerconnectionModel.deviceA.status === 'connected' &&
            peerconnectionModel.deviceB.status === 'connected'
        ) {
            peerconnectionModel.status = 'connected'
        } else {
            peerconnectionModel.status = 'new'
        }

        if (peerconnectionModel.status !== oldStatus)
            await sendStatusChangedCallback(peerconnectionModel)

        await peerconnectionRepository.save(peerconnectionModel)

        logger.log('info', 'patchPeerconnectionsByPeerconnectionIdDeviceStatus succeeded')

        return {
            status: 201,
        }
    }
