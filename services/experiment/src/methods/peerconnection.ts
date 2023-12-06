import { Clients } from '../clients/index.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';
import {
  callbackUrl,
  peerconnectionClosedCallbacks,
  peerconnectionStatusChangedCallbacks,
} from '../operations/callbacks/index.js';
import { buildConnectionPlan } from './connectionPlan.js';
import { saveExperiment } from './experimentChangedEvent.js';

/**
 * This function attempts to establish the peerconnections for an experiment model according to its connection plan.
 * @param experimentModel The experiment model for which to establish the peerconnections.
 */
export async function createPeerconnections(
  experimentModel: ExperimentModel,
  clients: Clients,
) {
  const peerconnectionRequests = buildConnectionPlan(experimentModel);
  for (const peerconnectionRequest of peerconnectionRequests) {
    // TODO: error handling
    const peerconnection = await clients.device.createPeerconnection(
      peerconnectionRequest,
      { closedUrl: callbackUrl, statusChangedUrl: callbackUrl },
    );

    peerconnectionClosedCallbacks.push(peerconnection.url);
    peerconnectionStatusChangedCallbacks.push(peerconnection.url);

    if (!experimentModel.connections) experimentModel.connections = [];

    // create, push and save new peerconnection
    const peerconnectionModel = await repositories.peerconnection.create(
      peerconnection.url,
    );
    experimentModel.connections.push(peerconnectionModel);
    saveExperiment(experimentModel);
  }
}
