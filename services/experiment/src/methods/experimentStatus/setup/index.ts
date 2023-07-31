import { ExperimentModel } from '../../../database/model'
import { lockBookingExperiment } from './bookingLocking'
import { updateBookingExperiment } from './bookingUpdate'
import { instantiateDevicesExperiment } from './deviceInstantiation'
import { createPeerconnectionsExperiment } from './peerconnectionCreation'
import { ResolvedDevice } from '../../../types/types'
import { repositories } from '../../../database/dataSource'
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors'
import { validateExperimentStatus } from '../../../types/typeguards'
import { logger } from '@crosslab/service-common'
import { experimentUrlFromId } from '../../url'

export async function setupExperiment(
    experimentModel: ExperimentModel,
    resolvedDevices: ResolvedDevice[]
) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    logger.log('info', 'Setting up experiment', { data: { experimentUrl } })

    if (experimentModel.status !== 'booked')
        throw new InvalidStateError(
            `Expected experiment to have status 'booked', instead has status '${experimentModel.status}'`
        )

    if (!validateExperimentStatus(experimentModel, 'booked'))
        throw new MalformedExperimentError(
            `Experiment is in status 'booked', but does not satisfy the requirements for this status`,
            500
        )

    const uninstantiatedDevices = resolvedDevices.filter(
        (device) =>
            (device.type === 'cloud instantiable' ||
                device.type === 'edge instantiable') &&
            (!device.instanceUrl || !device.instanceToken)
    )

    await lockBookingExperiment(experimentModel)

    if (uninstantiatedDevices) {
        const instances = await instantiateDevicesExperiment(
            experimentModel,
            uninstantiatedDevices.map((uninstantiatedDevice) => uninstantiatedDevice.url)
        )
        await updateBookingExperiment(
            experimentModel,
            instances.map((instance) => instance.url)
        )
    } else {
        experimentModel.status = 'booking-updated'
        await repositories.experiment.save(experimentModel)
    }

    await createPeerconnectionsExperiment(experimentModel)

    logger.log('info', 'Successfully set up experiment', { data: { experimentUrl } })
}
