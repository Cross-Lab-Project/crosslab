import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { patchExperimentsByExperimentIdSignature } from '../../../generated/signatures.js';
import { registerChangedCallback } from '../../../methods/callbacks.js';
import { transitionExperiment } from '../../../methods/experimentStatus/index.js';
import { mutexManager } from '../../../methods/mutexManager.js';
import { experimentUrlFromId } from '../../../methods/url.js';

/**
 * This function implements the functionality for handling PATCH requests on
 * /experiments/{experiment_id} endpoint.
 * @param authorization The authorization helper object for the request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const patchExperimentsByExperimentId: patchExperimentsByExperimentIdSignature =
  async (req, parameters, body) => {
    let experimentModel: ExperimentModel;

    if (
      body &&
      (body.bookingTime ||
        body.devices ||
        body.roles ||
        body.serviceConfigurations ||
        body.status)
    ) {
      // do stuff with mutexes
      const release = await mutexManager.acquire(parameters.experiment_id);
      const createPeerconnectionsRelease = await mutexManager.acquire(
        `create-peerconnections:${parameters.experiment_id}`,
      );
      createPeerconnectionsRelease();
      try {
        logger.log(
          'info',
          `Handling PATCH request on endpoint /experiments/${parameters.experiment_id}`,
          {
            data: {
              user: req.authorization.user,
              experiment: experimentUrlFromId(parameters.experiment_id),
            },
          },
        );

        await req.authorization.check_authorization_or_fail(
          'edit',
          `experiment:${experimentUrlFromId(parameters.experiment_id)}`,
        );

        experimentModel = await repositories.experiment.findOneOrFail({
          where: { uuid: parameters.experiment_id },
        });

        if (body) await repositories.experiment.write(experimentModel, body);

        await transitionExperiment(experimentModel, body?.status, req.clients);

        await repositories.experiment.save(experimentModel);

        logger.log(
          'info',
          `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`,
        );

        return {
          status: 200,
          body: await repositories.experiment.format(experimentModel),
        };
      } finally {
        release();
      }
    } else {
      // do stuff without mutexes
      experimentModel = await repositories.experiment.findOneOrFail({
        where: { uuid: parameters.experiment_id },
      });
      if (body) {
        await repositories.experiment.write(experimentModel, body);
        await repositories.experiment.save(experimentModel);
      }
    }

    if (parameters.changedURL)
      registerChangedCallback(experimentModel.uuid, parameters.changedURL);

    logger.log(
      'info',
      `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`,
    );

    return { status: 200, body: await repositories.experiment.format(experimentModel) };
  };
