import { experimentRepository } from '../../../database/repositories/experiment'
import { peerconnectionRepository } from '../../../database/repositories/peerconnection'
import { apiClient } from '../../../methods/api'
import { peerconnectionStatusChangedCallbacks } from '../../callbacks'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { MissingPropertyError, MalformedBodyError } from '@crosslab/service-common'

/**
 * This function handles an incoming "peerconnection-status-changed" event callback.
 * @param callback The incoming "peerconnection-status-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
export async function handlePeerconnectionStatusChangedEventCallback(
    callback: any
): Promise<200 | 410> {
    if (!callback.peerconnection) {
        throw new MissingPropertyError(
            'Event-callbacks of type "peerconnection-status-changed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!DeviceServiceTypes.isPeerconnection(peerconnection)) {
        throw new MalformedBodyError('Property "peerconnection" is malformed', 400)
    }
    if (!peerconnectionStatusChangedCallbacks.includes(peerconnection.url)) {
        return 410 // TODO: find a solution for this problem (race condition)
    }
    if (!peerconnection.status) {
        throw new MissingPropertyError(
            'Property "peerconnection" is missing property "status"'
        )
    }

    // TODO: add peerconnection status changed handling
    const peerconnectionModel = await peerconnectionRepository.findOneOrFail({
        where: { url: peerconnection.url },
        relations: {
            experiment: {
                connections: true,
            },
        },
    })

    const experimentModel = peerconnectionModel.experiment
    if (!experimentModel)
        throw new MissingPropertyError(
            `Peerconnection model is missing property "experiment"`
        ) // NOTE: error code

    switch (peerconnection.status) {
        case 'closed':
            // TODO: handle status closed
            break
        case 'connected':
            // TODO: handle status connected
            if (!experimentModel.connections)
                throw new MissingPropertyError(
                    `Experiment model is missing property "connections"`,
                    400
                ) // NOTE: error code

            // eslint-disable-next-line no-case-declarations
            let connected = true
            for (const pc of experimentModel.connections) {
                if ((await apiClient.getPeerconnection(pc.url)).status !== 'connected') {
                    connected = false
                }
            }

            if (experimentModel.status === 'setup' && connected) {
                experimentModel.status = 'running'
                await experimentRepository.save(experimentModel)
            }
            break
        case 'failed':
            // TODO: handle status failed
            break
        case 'new':
            // TODO: handle status new
            break
        case 'connecting':
            // TODO: handle status connecting
            break
        case 'disconnected':
            // TODO: handle status disconnected
            break
    }
    return 200
}
