import { repositories } from '../../database/dataSource'
import { ExperimentModel } from '../../database/model'
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
            break
        }
        case 'running': {
            // delete all peerconnections
            if (experimentModel.connections) {
                for (const peerconnection of experimentModel.connections) {
                    await apiClient.deletePeerconnection(peerconnection.url)
                }
            }
            if (experimentModel.devices) {
                for (const device of experimentModel.devices) {
                    if (device.additionalProperties?.instanceUrl) {
                        await apiClient.deleteDevice(
                            device.additionalProperties.instanceUrl
                        )
                    }
                }
            }
            // TODO: unlock all devices (booking client missing)

            // TODO: delete booking (booking client missing)
            break
        }
        case 'finished': {
            // nothing to do since experiment is already finished
            break
        }
    }

    experimentModel.status = 'finished'
    await repositories.experiment.save(experimentModel)
    logger.log('info', 'Successfully finished experiment', { data: { experimentUrl } })
}
