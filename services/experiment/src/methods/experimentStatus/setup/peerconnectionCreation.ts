import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { createPeerconnections } from '../../peerconnection.js';
import { experimentUrlFromId } from '../../url.js';
import { logger } from '@crosslab/service-common';

export async function createPeerconnectionsExperiment(experimentModel: ExperimentModel) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid);
    logger.log('info', 'Attempting to create peerconnections for experiment', {
        data: { experimentUrl },
    });

    if (experimentModel.status !== 'booking-updated')
        throw new InvalidStateError(
            `Expected experiment to have status 'booking-updated', instead has status '${experimentModel.status}'`,
        );

    if (!validateExperimentStatus(experimentModel, 'booking-updated'))
        throw new MalformedExperimentError(
            `Experiment is in status 'booking-updated', but does not satisfy the requirements for this status`,
            500,
        );

    await createPeerconnections(experimentModel);

    experimentModel.status = 'peerconnections-created';

    await repositories.experiment.save(experimentModel);

    logger.log('info', 'Successfully created peerconnections for experiment', {
        data: { experimentUrl },
    });
}
