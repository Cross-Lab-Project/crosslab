import { createPeerconnectionModel } from '../database/methods/create'
import { saveExperimentModel } from '../database/methods/save'
import { ExperimentModel } from '../database/model'
import { MissingPropertyError } from '../types/errors'
import { createPeerconnection } from './api'
import { callbackUrl } from './callbacks'
import { buildConnectionPlan } from './connectionPlan'

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
        })
        if (!experimentModel.connections) experimentModel.connections = []
        if (!peerconnection.url)
            throw new MissingPropertyError(
                'Created peerconnection does not have a url',
                502
            )
        if (!peerconnection.devices)
            throw new MissingPropertyError(
                'Created peerconnection does not have devices',
                502
            )
        if (!peerconnection.devices[0].url || !peerconnection.devices[1].url)
            throw new MissingPropertyError(
                'Created peerconnection has a device without an url',
                502
            )

        // create, push and save new peerconnection
        const peerconnectionModel = createPeerconnectionModel(peerconnection.url)
        experimentModel.connections.push(peerconnectionModel)
        await saveExperimentModel(experimentModel)
    }
}
