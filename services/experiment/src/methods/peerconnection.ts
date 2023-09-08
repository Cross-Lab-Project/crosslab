import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';
import {
  callbackUrl,
  peerconnectionClosedCallbacks,
  peerconnectionStatusChangedCallbacks,
} from '../operations/callbacks/index.js';
import { apiClient } from './api.js';
import { buildConnectionPlan } from './connectionPlan.js';

/**
 * This function attempts to establish the peerconnections for an experiment model according to its connection plan.
 * @param experimentModel The experiment model for which to establish the peerconnections.
 */
export async function createPeerconnections(experimentModel: ExperimentModel) {
  const peerconnectionRequests = buildConnectionPlan(experimentModel);
  for (const peerconnectionRequest of peerconnectionRequests) {
    // TODO: error handling
    const peerconnection = await apiClient.createPeerconnection(peerconnectionRequest, {
      closedUrl: callbackUrl,
      statusChangedUrl: callbackUrl,
    });
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
