import { logger } from '@crosslab/service-common';

import { UnsuccessfulRequestError } from '../clients/device/client.js';
import { clients } from '../clients/index.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';

export async function sendStatusUpdateMessages(
  experimentModel: ExperimentModel,
  message?: string,
) {
  const formattedExperiment = await repositories.experiment.format(experimentModel);

  for (const device of experimentModel.devices) {
    const url = device.instance?.url ?? device.resolvedDevice ?? device.url;

    try {
      await clients.device.sendSignalingMessage(url, {
        messageType: 'experiment-status-changed',
        status: formattedExperiment.status,
        message,
      });
    } catch (error) {
      if (error instanceof UnsuccessfulRequestError) {
        logger.log('error', 'Could not send status-update message', {
          data: {
            response: error.response,
          },
        });
      }
    }
  }
}
