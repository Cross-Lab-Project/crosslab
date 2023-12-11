import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { patchExperimentsByExperimentIdSignature } from '../../../generated/signatures.js';
import { changedCallbacks } from '../../../methods/callbacks.js';
import {
  bookExperiment,
  finishExperiment,
  runExperiment,
} from '../../../methods/experimentStatus/index.js';
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
    // NOTE: temporary solution for registering callbacks without mutexes
    if (parameters.changedURL && (!body || Object.keys(body).length === 0)) {
      const experimentModel = await repositories.experiment.findOneOrFail({
        where: { uuid: parameters.experiment_id },
      });
      logger.log(
        'info',
        `registering changed-callback for experiment '${experimentUrlFromId(
          experimentModel.uuid,
        )}' to '${parameters.changedURL}'`,
      );
      const changedCallbackURLs = changedCallbacks.get(experimentModel.uuid) ?? [];
      changedCallbackURLs.push(parameters.changedURL);
      changedCallbacks.set(experimentModel.uuid, changedCallbackURLs);

      logger.log(
        'info',
        `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`,
      );

      return { status: 200, body: await repositories.experiment.format(experimentModel) };
    }

    // NOTE: temporary solution for changing lti-grade without any mutux mess
    if (body && Object.keys(body).every((key) => ['lti_grade', 'lti_graded'].includes(key))) {
      const experimentModel = await repositories.experiment.findOneOrFail({
        where: { uuid: parameters.experiment_id },
      });
      await repositories.experiment.write(experimentModel, body);
      await repositories.experiment.save(experimentModel);

      logger.log(
        'info',
        `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`,
      );

      return { status: 200, body: await repositories.experiment.format(experimentModel) };
    }

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

      const experimentModel = await repositories.experiment.findOneOrFail({
        where: { uuid: parameters.experiment_id },
      });

      if (body) await repositories.experiment.write(experimentModel, body);

      const desiredStatus = body?.status ?? experimentModel.status;

      if (desiredStatus === 'booked') await bookExperiment(experimentModel);
      if (desiredStatus === 'running') await runExperiment(experimentModel, req.clients);
      if (desiredStatus === 'finished')
        await finishExperiment(experimentModel, req.clients);
      await repositories.experiment.save(experimentModel);

      if (parameters.changedURL) {
        logger.log(
          'info',
          `registering changed-callback for experiment '${experimentUrlFromId(
            experimentModel.uuid,
          )}' to '${parameters.changedURL}'`,
        );
        const changedCallbackURLs = changedCallbacks.get(experimentModel.uuid) ?? [];
        changedCallbackURLs.push(parameters.changedURL);
        changedCallbacks.set(experimentModel.uuid, changedCallbackURLs);
      }

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
  };
