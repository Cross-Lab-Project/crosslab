import { logger } from '@crosslab/service-common';

import { repositories } from '../../../database/dataSource.js';
import { patchExperimentsByExperimentIdSignature } from '../../../generated/signatures.js';
import {
  bookExperiment,
  finishExperiment,
  runExperiment,
} from '../../../methods/experimentStatus/index.js';
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
    logger.log(
      'info',
      `Handling PATCH request on endpoint /experiments/${parameters.experiment_id}`,
    );

    await req.authorization.check_authorization_or_fail(
      'edit',
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

    if (body) await repositories.experiment.write(experimentModel, body);

    if (experimentModel.status === 'booked') await bookExperiment(experimentModel);
    if (experimentModel.status === 'running')
      await runExperiment(experimentModel, req.clients);
    if (experimentModel.status === 'finished') await finishExperiment(experimentModel, req.clients);
    await repositories.experiment.save(experimentModel);

    logger.log(
      'info',
      `Successfully handled PATCH request on endpoint /experiments/${parameters.experiment_id}`,
    );

    return {
      status: 200,
      body: await repositories.experiment.format(experimentModel),
    };
  };
