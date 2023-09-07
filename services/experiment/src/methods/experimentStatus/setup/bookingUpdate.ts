import { repositories } from '../../../database/dataSource.js';
import { ExperimentModel } from '../../../database/model.js';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors.js';
import { validateExperimentStatus } from '../../../types/typeguards.js';
import { experimentUrlFromId } from '../../url.js';
import { logger } from '@crosslab/service-common';

// import { apiClient } from '../../api.js'

export async function updateBookingExperiment(
    experimentModel: ExperimentModel,
    _newDeviceUrls: string[],
) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid);
    logger.log('info', 'Attempting to update booking for experiment', {
        data: { experimentUrl },
    });

    if (experimentModel.status !== 'devices-instantiated')
        throw new InvalidStateError(
            `Expected experiment to have status 'devices-instantiated', instead has status '${experimentModel.status}'`,
        );

    if (!validateExperimentStatus(experimentModel, 'devices-instantiated'))
        throw new MalformedExperimentError(
            `Experiment is in status 'devices-instantiated', but does not satisfy the requirements for this status`,
            500,
        );

    // TODO: error handling
    // await apiClient.updateBooking(experimentModel.bookingID, {
    //     Locked: true,
    //     Devices: newDeviceUrls.map((newDeviceUrl) => {
    //         return {
    //             ID: newDeviceUrl,
    //         }
    //     }),
    // })

    experimentModel.status = 'booking-updated';

    await repositories.experiment.save(experimentModel);

    logger.log('info', 'Successfully updated booking for experiment', {
        data: { experimentUrl },
    });
}
