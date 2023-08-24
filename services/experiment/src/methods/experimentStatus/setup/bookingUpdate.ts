import { repositories } from '../../../database/dataSource';
import { ExperimentModel } from '../../../database/model';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors';
import { validateExperimentStatus } from '../../../types/typeguards';
import { experimentUrlFromId } from '../../url';
import { logger } from '@crosslab/service-common';

// import { apiClient } from '../../api'

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
