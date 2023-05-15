import { ExperimentModel } from '../database/model'
import { experimentRepository } from '../database/repositories/experiment'
import { peerconnectionRepository } from '../database/repositories/peerconnection'
import { createPeerconnection } from './api'
import {
    callbackUrl,
    peerconnectionClosedCallbacks,
    peerconnectionStatusChangedCallbacks,
} from './callbacks'
import { buildConnectionPlan } from './connectionPlan'
import { MissingPropertyError } from '@crosslab/service-common'

/**
 * This function attempts to establish the peerconnections for an experiment model according to its connection plan.
 * @param experimentModel The experiment model for which to establish the peerconnections.
 */
export async function establishPeerconnections(experimentModel: ExperimentModel) {
    const peerconnectionPlans = buildConnectionPlan(experimentModel)
    for (const peerconnectionPlan of peerconnectionPlans) {
        // TODO: error handling
        const peerconnection = await createPeerconnection(peerconnectionPlan, {
            closedUrl: callbackUrl,
            statusChangedUrl: callbackUrl,
        })
        if (!experimentModel.connections) experimentModel.connections = []
        if (!peerconnection.url)
            throw new MissingPropertyError(
                'Created peerconnection does not have a url',
                500
            )
        if (!peerconnection.devices)
            throw new MissingPropertyError(
                'Created peerconnection does not have devices',
                500
            )
        if (!peerconnection.devices[0].url || !peerconnection.devices[1].url)
            throw new MissingPropertyError(
                'Created peerconnection has a device without an url',
                500
            )
        peerconnectionClosedCallbacks.push(peerconnection.url)
        peerconnectionStatusChangedCallbacks.push(peerconnection.url)

        // create, push and save new peerconnection
        const peerconnectionModel = await peerconnectionRepository.create(
            peerconnection.url
        )
        experimentModel.connections.push(peerconnectionModel)
        await experimentRepository.save(experimentModel)
    }
}
