import { ExperimentModel } from '../../database/model'
import { experimentRepository } from '../../database/repositories/experiment'
import { experimentUrlFromId } from '../url'
import { MissingPropertyError } from '@crosslab/service-common'
import { logger } from '@crosslab/service-common'

/**
 * This function attempts to book an experiment.
 * @param experimentModel The experiment to be booked.
 */
export async function bookExperiment(experimentModel: ExperimentModel) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    logger.log('info', 'Attempting to book experiment', { data: { experimentUrl } })

    if (!experimentModel.devices || experimentModel.devices.length === 0)
        throw new MissingPropertyError(`Experiment ${experimentUrl} has no devices`)

    // TODO: book experiment
    // const currentTime = new Date()
    // const startTime = new Date(experimentModel.bookingStart ?? currentTime)
    // const endTime = new Date(experimentModel.bookingEnd ?? startTime.getTime() + 60*60*1000)

    // const bookingTemplate: putBookingBodyType = {
    //     Experiment: {
    //         Devices: experimentModel.devices.map(d => {
    //             return { ID: d.url }
    //         })
    //     },
    //     Time: {
    //         Start: startTime.toISOString(),
    //         End: endTime.toISOString()
    //     },
    //     Type: 'normal'
    // }

    // const { BookingID: bookingId } = await _bookExperiment(bookingTemplate)
    // experimentModel.bookingStart = startTime.toISOString()
    // experimentModel.bookingEnd = startTime.toISOString()
    // experimentModel.bookingID = bookingId

    experimentModel.status = 'booked'
    await experimentRepository.save(experimentModel)
    logger.log('info', 'Successfully booked experiment', { data: { experimentUrl } })
}
