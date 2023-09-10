import { MissingPropertyError } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { finishExperiment } from '../../../methods/experimentStatus/index.js';
import { peerconnectionStatusChangedCallbacks } from '../../callbacks/index.js';
import { clients } from '../../../clients/index.js';

/**
 * This function handles an incoming "peerconnection-status-changed" event callback.
 * @param callback The incoming "peerconnection-status-changed" callback to be handled.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
export async function handlePeerconnectionStatusChangedEventCallback(
  callback: any,
): Promise<200 | 410> {
  if (!peerconnectionStatusChangedCallbacks.includes(callback.peerconnection.url)) {
    return 410; // TODO: find a solution for this problem (race condition)
  }

  // TODO: add peerconnection status changed handling
  const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
    where: { url: callback.peerconnection.url },
    relations: {
      experiment: {
        connections: true,
        devices: true,
      },
    },
  });

  const experimentModel = peerconnectionModel.experiment;
  if (!experimentModel)
    throw new MissingPropertyError(
      `Peerconnection model is missing property "experiment"`,
      400,
    ); // NOTE: error code

  switch (callback.peerconnection.status) {
    case 'closed':
      // TODO: handle status closed
      break;
    case 'connected': {
      // TODO: handle status connected
      if (!experimentModel.connections)
        throw new MissingPropertyError(
          `Experiment model is missing property "connections"`,
          400,
        ); // NOTE: error code

      let connected = true;
      for (const pc of experimentModel.connections) {
        if ((await clients.device.getPeerconnection(pc.url)).status !== 'connected') {
          connected = false;
        }
      }

      if (experimentModel.status === 'peerconnections-created' && connected) {
        experimentModel.status = 'running';
        await repositories.experiment.save(experimentModel);
      }
      break;
    }
    case 'failed':
      // TODO: handle status failed
      // TODO: add more fine grained handling than simply finishing the experiment
      await finishExperiment(experimentModel, clients);
      break;
    case 'new':
      // TODO: handle status new
      break;
    case 'connecting':
      // TODO: handle status connecting
      break;
    case 'disconnected':
      // TODO: handle status disconnected
      break;
  }
  return 200;
}
