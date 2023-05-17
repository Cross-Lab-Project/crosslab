import { ExperimentModel } from '../../database/model'
import { experimentRepository } from '../../database/repositories/experiment'
import { apiClient } from '../api'
import { experimentUrlFromId } from '../url'
import { logger } from '@crosslab/service-common'

/**
 * This function attempts to finish an experiment.
 * @param experimentModel The experiment to be finished.
 */
export async function finishExperiment(experimentModel: ExperimentModel) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    logger.log('info', 'Attempting to finish experiment', { data: { experimentUrl } })

    switch (experimentModel.status) {
        case 'created': {
            // nothing to do here as status is set to finished below
            break
        }
        case 'booked': {
            // TODO: delete booking (what to do if "booked" but no booking?)
            // if (experimentModel.bookingID)
            //     await deleteBooking(experimentModel.bookingID)
            break
        }
        case 'running': {
            // delete all peerconnections
            if (experimentModel.connections) {
                for (const peerconnection of experimentModel.connections) {
                    await apiClient.deletePeerconnection(peerconnection.url)
                }
            }
            // TODO: unlock all devices (booking client missing)
            // if (experimentModel.bookingID)
            //     await unlockDevices(experimentModel.bookingID)

            // TODO: delete booking (booking client missing)
            // if (experimentModel.bookingID)
            //     await deleteBooking(experimentModel.bookingID)
            break
        }
        case 'finished': {
            // nothing to do since experiment is already finished
            break
        }
    }

    experimentModel.status = 'finished'
    await experimentRepository.save(experimentModel)
    logger.log('info', 'Successfully finished experiment', { data: { experimentUrl } })
}
