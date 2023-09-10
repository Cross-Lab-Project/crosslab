import { Clients } from '../clients/index.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';
import {
  callbackUrl,
  peerconnectionClosedCallbacks,
  peerconnectionStatusChangedCallbacks,
} from '../operations/callbacks/index.js';
import { buildConnectionPlan } from './connectionPlan.js';

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
      { url: 'string', ...peerconnectionRequest },
      undefined,
      callbackUrl,
      callbackUrl,
    );
    if (!experimentModel.connections) experimentModel.connections = [];

    peerconnectionClosedCallbacks.push(peerconnection.url);
    peerconnectionStatusChangedCallbacks.push(peerconnection.url);

    // create, push and save new peerconnection
    const peerconnectionModel = await repositories.peerconnection.create(
      peerconnection.url,
    );
    experimentModel.connections.push(peerconnectionModel);
    await repositories.experiment.save(experimentModel);
  }
}
