import { createPeerconnectionModel } from '../database/methods/create'
import { saveExperimentModel } from '../database/methods/save'
import { ExperimentModel } from '../database/model'
import { MissingPropertyError } from '../types/errors'
import { createPeerconnection } from './api'
import { callbackUrl } from './callbacks'
import { buildConnectionPlan } from './connectionPlan'
import { RequestHandler } from './requestHandler'

/**
 * This function attempts to establish the peerconnections for an experiment model according to its connection plan.
 * @param experimentModel The experiment model for which to establish the peerconnections.
 */
export async function establishPeerconnections(
    requestHandler: RequestHandler,
    experimentModel: ExperimentModel
) {
    const peerconnectionPlans = requestHandler.executeSync(
        buildConnectionPlan,
        experimentModel
    )
    for (const peerconnectionPlan of peerconnectionPlans) {
        // TODO: error handling
        const peerconnection = await requestHandler.executeAsync(
            createPeerconnection,
            peerconnectionPlan,
            {
                closedUrl: callbackUrl,
            }
        )
        if (!experimentModel.connections) experimentModel.connections = []
        if (!peerconnection.url)
            requestHandler.throw(
                MissingPropertyError,
                'Created peerconnection does not have a url',
                500
            )
        if (!peerconnection.devices)
            requestHandler.throw(
                MissingPropertyError,
                'Created peerconnection does not have devices',
                500
            )
        if (!peerconnection.devices[0].url || !peerconnection.devices[1].url)
            requestHandler.throw(
                MissingPropertyError,
                'Created peerconnection has a device without an url',
                500
            )

        // create, push and save new peerconnection
        const peerconnectionModel = requestHandler.executeSync(
            createPeerconnectionModel,
            peerconnection.url
        )
        experimentModel.connections.push(peerconnectionModel)
        await requestHandler.executeAsync(saveExperimentModel, experimentModel)
    }
}
