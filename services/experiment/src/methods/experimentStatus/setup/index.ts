import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { ResolvedDevice } from '../../../types/types.js';
import { experimentUrlFromId } from '../../url.js';
import { lockBookingExperiment } from './bookingLocking.js';
import { updateBookingExperiment } from './bookingUpdate.js';
import { instantiateDevicesExperiment } from './deviceInstantiation.js';
import { createPeerconnectionsExperiment } from './peerconnectionCreation.js';
import { logger } from '@crosslab/service-common';

export async function setupExperiment(
    experimentModel: ExperimentModel,
    resolvedDevices: ResolvedDevice[],
) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid);
    logger.log('info', 'Setting up experiment', { data: { experimentUrl } });

    if (experimentModel.status !== 'booked')
        throw new InvalidStateError(
            `Expected experiment to have status 'booked', instead has status '${experimentModel.status}'`,
        );

    if (!validateExperimentStatus(experimentModel, 'booked'))
        throw new MalformedExperimentError(
            `Experiment is in status 'booked', but does not satisfy the requirements for this status`,
            500,
        );

    const uninstantiatedDevices = [];

    for (const resolvedDevice of resolvedDevices) {
        if (
            (resolvedDevice.type === 'cloud instantiable' ||
                resolvedDevice.type === 'edge instantiable') &&
            (!resolvedDevice.instanceUrl || !resolvedDevice.instanceToken)
        ) {
            uninstantiatedDevices.push(resolvedDevice);
        }
    }

    await lockBookingExperiment(experimentModel);

    if (uninstantiatedDevices) {
        const instances = await instantiateDevicesExperiment(
            experimentModel,
            uninstantiatedDevices,
        );
        await updateBookingExperiment(
            experimentModel,
            instances.map((instance) => instance.url),
        );
    } else {
        experimentModel.status = 'booking-updated';
        await repositories.experiment.save(experimentModel);
    }

    await createPeerconnectionsExperiment(experimentModel);

    logger.log('info', 'Successfully set up experiment', { data: { experimentUrl } });
}
