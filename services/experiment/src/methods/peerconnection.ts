import { Clients } from '../clients/index.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';
import { callbackHandler } from '../operations/callbacks/callbackHandler.js';
import {
  callbackUrl,
  peerconnectionClosedCallbacks,
  peerconnectionStatusChangedCallbacks,
} from '../operations/callbacks/index.js';
import { buildConnectionPlan } from './connectionPlan.js';
import { sendStatusUpdateMessages } from './statusUpdateMessage.js';

/**
 * This function attempts to establish the peerconnections for an experiment model according to its connection plan.
 * @param experimentModel The experiment model for which to establish the peerconnections.
 */
export async function createPeerconnections(
  experimentModel: ExperimentModel,
  clients: Clients,
) {
  const peerconnectionRequests = buildConnectionPlan(experimentModel);
  if (!experimentModel.connections) experimentModel.connections = [];
  for (const peerconnectionRequest of peerconnectionRequests) {
    // TODO: error handling
    try {
      const peerconnection = await clients.device.createPeerconnection(
        peerconnectionRequest,
        { closedUrl: callbackUrl, statusChangedUrl: callbackUrl },
      );

      callbackHandler.addListener(
        'peerconnection',
        peerconnection.url,
        experimentModel.uuid,
      );

      peerconnectionClosedCallbacks.push(peerconnection.url);
      peerconnectionStatusChangedCallbacks.push(peerconnection.url);

      // create, push and save new peerconnection
      const peerconnectionModel = await repositories.peerconnection.create(
        peerconnection.url,
      );
      experimentModel.connections.push(peerconnectionModel);
    } catch (error) {
      sendStatusUpdateMessages(
        experimentModel,
        // prettier-ignore
        `Could not establish a peerconnection between the devices "${
          peerconnectionRequest.devices[0].url
        }" and "${
          peerconnectionRequest.devices[1].url
        }"!`,
      );
      await repositories.experiment.save(experimentModel);
      throw error;
    }
  }
  await repositories.experiment.save(experimentModel);
}
