import { logger } from '@crosslab/service-common'
import { repositories } from '../../../database/dataSource'
import { ExperimentModel } from '../../../database/model'
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors'
import { validateExperimentStatus } from '../../../types/typeguards'
import { experimentUrlFromId } from '../../url'
// import { apiClient } from '../../api'

export async function lockBookingExperiment(experimentModel: ExperimentModel) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    logger.log('info', 'Attempting to lock booking for experiment', {
        data: { experimentUrl },
    })

    if (experimentModel.status !== 'booked')
        throw new InvalidStateError(
            `Expected experiment to have status 'booked', instead has status '${experimentModel.status}'`
        )

    if (!validateExperimentStatus(experimentModel, 'booked'))
        throw new MalformedExperimentError(
            `Experiment is in status 'booked', but does not satisfy the requirements for this status`,
            500
        )

    // TODO: error handling
    // await apiClient.lockBooking(experimentModel.bookingID)

    experimentModel.status = 'booking-locked'

    await repositories.experiment.save(experimentModel)

    logger.log('info', 'Successfully locked booking for experiment', {
        data: { experimentUrl },
    })
}
