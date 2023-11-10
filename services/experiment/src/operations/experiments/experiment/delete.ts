import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { deleteExperimentsByExperimentIdSignature } from '../../../generated/signatures.js';
import { finishExperiment } from '../../../methods/experimentStatus/index.js';
import { mutexManager } from '../../../methods/mutexManager.js';
import { experimentUrlFromId } from '../../../methods/url.js';

/**
 * This function implements the functionality for handling DELETE requests on
 * /experiments/{experiment_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 */
export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature =
  async (req, parameters) => {
    const release = await mutexManager.acquire(parameters.experiment_id);
    const createPeerconnectionsRelease = await mutexManager.acquire(
      `create-peerconnections:${parameters.experiment_id}`,
    );
    createPeerconnectionsRelease();

    try {
      logger.log(
        'info',
        `Handling DELETE request on endpoint /experiments/${parameters.experiment_id}`,
      );

      await req.authorization.check_authorization_or_fail(
        'delete',
        `experiment:${experimentUrlFromId(parameters.experiment_id)}`,
      );

      const experimentModel = await repositories.experiment.findOneOrFail({
        where: { uuid: parameters.experiment_id },
        relations: {
          connections: true,
          devices: {
            instance: true,
          },
          roles: true,
          serviceConfigurations: {
            participants: true,
          },
        },
      });

      if (experimentModel.status !== 'finished')
        await finishExperiment(experimentModel, req.clients);

      await req.authorization.unrelate(
        req.authorization.user,
        'owner',
        `experiment:${experimentUrlFromId(experimentModel.uuid)}`,
      );

      await repositories.experiment.remove(experimentModel);

      logger.log(
        'info',
        `Successfully handled DELETE request on endpoint /experiments/${parameters.experiment_id}`,
      );

      return {
        status: 204,
      };
    } finally {
      release();
    }
  };
