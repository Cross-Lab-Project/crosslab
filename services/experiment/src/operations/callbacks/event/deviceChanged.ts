import { deviceChangedCallbacks } from '../../callbacks'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { MissingPropertyError, MalformedBodyError } from '@crosslab/service-common'
import { logger } from '@crosslab/service-common'
import { ExperimentModel } from '../../../database/model'
import { runExperiment } from '../../../methods/experimentStatus'
import { repositories } from '../../../database/dataSource'
import { In } from 'typeorm'

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
export async function handleDeviceChangedEventCallback(
    callback: any
): Promise<200 | 410> {
    if (!callback.device) {
        throw new MissingPropertyError(
            'Event-callbacks of type "device-changed" require property "device"',
            400
        )
    }
    const device = callback.device
    if (
        !DeviceServiceTypes.isConcreteDevice(callback.device) &&
        !DeviceServiceTypes.isDeviceGroup(callback.device) &&
        !DeviceServiceTypes.isInstantiableBrowserDevice(callback.device) &&
        !DeviceServiceTypes.isInstantiableCloudDevice(callback.device)
    ) {
        throw new MalformedBodyError('Property "device" is not a valid device', 400)
    }
    if (!device.url) {
        throw new MissingPropertyError('Property "device" is missing property "url"', 400)
    }

    const experimentIds = deviceChangedCallbacks.get(device.url)
    if (!experimentIds || experimentIds.size === 0) {
        return 410
    }

    logger.log('info', 'Device changed!', { meta: { deviceUrl: device.url } })

    const experiments = await repositories.experiment.find({
        where: {
            uuid: In(Array.from(experimentIds.values())),
        },
        relations: {
            connections: true,
            devices: true,
            roles: true,
            serviceConfigurations: {
                participants: true,
            },
        },
    })

    // NOTE: WIP - very prototypical implementation
    for (const experiment of experiments) {
        await handleDeviceChangedEvent(device, experiment)
    }

    return 200
}

// TODO: add full implementation handling all different possible changes
async function handleDeviceChangedEvent(
    device: DeviceServiceTypes.Device,
    experiment: ExperimentModel
) {
    if (device.type === 'device' && device.connected) {
        await runExperiment(experiment)
    }
}
