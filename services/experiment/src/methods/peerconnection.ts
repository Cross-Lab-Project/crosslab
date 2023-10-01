import { Peerconnection } from '../clients/device/types.js';
import { Clients } from '../clients/index.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';
import { callbackEventEmitter } from '../operations/callbacks/event/index.js';
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
      peerconnectionRequest,
      { closedUrl: callbackUrl, statusChangedUrl: callbackUrl },
    );

    peerconnectionClosedCallbacks.push(peerconnection.url);
    peerconnectionStatusChangedCallbacks.push(peerconnection.url);

    await new Promise<void>((resolve, reject) => {
      const statusChangedHandler = (pc: Peerconnection<'response'>) => {
        if (pc.status === 'connected') {
          callbackEventEmitter.off('peerconnection-status-changed', statusChangedHandler);
          resolve();
        } else if (
          pc.status === 'disconnected' ||
          pc.status === 'failed' ||
          pc.status === 'closed'
        ) {
          callbackEventEmitter.off('peerconnection-status-changed', statusChangedHandler);
          reject(`Created peerconnection has status '${pc.status}'`);
        }
      };
      callbackEventEmitter.on('peerconnection-status-changed', statusChangedHandler);
    });

    if (!experimentModel.connections) experimentModel.connections = [];

    // create, push and save new peerconnection
    const peerconnectionModel = await repositories.peerconnection.create(
      peerconnection.url,
    );
    experimentModel.connections.push(peerconnectionModel);
    await repositories.experiment.save(experimentModel);
  }
}
