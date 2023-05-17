import { ExperimentModel } from '../../database/model'
import { experimentRepository } from '../../database/repositories/experiment'
import { callbackUrl, deviceChangedCallbacks } from '../../operations/callbacks'
import { InvalidStateError } from '../../types/errors'
import { apiClient, startCloudDeviceInstance } from '../api'
import { establishPeerconnections } from '../peerconnection'
import { experimentUrlFromId } from '../url'
import { bookExperiment } from './book'
import { MissingPropertyError, DeviceNotConnectedError } from '@crosslab/service-common'
import { logger } from '@crosslab/service-common'

/**
 * This function attempts to run an experiment.
 * @param experimentModel The experiment to be run.
 * @throws {InvalidStateError} Thrown when the status of the experiment is already "finished".
 */
export async function runExperiment(experimentModel: ExperimentModel) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    logger.log('info', 'Attempting to run experiment', { data: { experimentUrl } })
    // make sure experiment is not already finished
    if (experimentModel.status === 'finished') {
        throw new InvalidStateError(`Experiment status is already "finished"`, 400)
    }

    // make sure the experiment contains devices
    if (!experimentModel.devices || experimentModel.devices.length === 0) {
        throw new MissingPropertyError(`Experiment does not contain any devices`, 400)
    }

    // book experiment if status is "created"
    if (experimentModel.status === 'created') {
        await bookExperiment(experimentModel)
    }

    // make sure the experiment has a booking
    /*if (!experimentModel.bookingID) {
        throw new MissingPropertyError(
            `Experiment does not have a booking`,
            400
        )
    }*/

    /**
     * This variable determines if the experiment needs to go into the state "setup".
     * The state "setup" is only needed if the experiment contains instantiable devices.
     */
    let needsSetup = false

    // make sure the concrete devices of the experiment are connected
    for (const device of experimentModel.devices) {
        const resolvedDevice = await apiClient.getDevice(device.url) // TODO: error handling
        if (resolvedDevice.type === 'device' && !resolvedDevice.connected) {
            throw new DeviceNotConnectedError(
                `Cannot start experiment since device ${device.url} is not connected`,
                500
            ) // NOTE: maybe there is a more fitting error code
        }

        // handle instantiable devices
        if (
            resolvedDevice.type === 'cloud instantiable' ||
            resolvedDevice.type === 'edge instantiable'
        ) {
            needsSetup = true
            if (!resolvedDevice.url)
                throw new MissingPropertyError('Device is missing its url', 500) // NOTE: error code?
            const { instance, deviceToken } = await apiClient.instantiateDevice(
                resolvedDevice.url,
                { changedUrl: callbackUrl }
            )
            if (!instance)
                throw new MissingPropertyError('Instance of device is missing', 500)
            if (!instance?.url)
                throw new MissingPropertyError('Device instance is missing its url', 500) // NOTE: error code?
            if (!deviceToken)
                throw new MissingPropertyError('Token of device instance is missing', 500)
            if (!device.additionalProperties) device.additionalProperties = {}
            device.additionalProperties.instanceUrl = instance.url
            device.additionalProperties.deviceToken = deviceToken
            deviceChangedCallbacks.push(instance.url)

            // instantiate cloud instantiable devices
            if (resolvedDevice.type === 'cloud instantiable') {
                await startCloudDeviceInstance(
                    resolvedDevice,
                    instance.url,
                    deviceToken,
                    experimentUrl
                )
            }
        }
    }

    // TODO: lock devices
    // try {
    //     const { Booking: booking, Time: _timeslot, Tokens: _deviceTokenMapping } = await lockBooking(experimentModel.bookingID)
    //     if (booking.Status !== "active") {
    // eslint-disable-next-line max-len
    //         throw new InvalidBookingError(`The booking ${experimentModel.bookingID} is invalid for the experiment ${experimentUrlFromId(experimentModel.uuid)}`)
    //     }
    // } catch (error) {
    //     // TODO: error handling
    //     throw error
    // }

    // TODO: add callback to all devices/instances for changes

    if (needsSetup) {
        await establishPeerconnections(experimentModel)
        experimentModel.status = 'setup'
    } else {
        await establishPeerconnections(experimentModel)
        experimentModel.status = 'running'
    }

    // save experiment
    await experimentRepository.save(experimentModel)
    logger.log('info', 'Successfully running experiment', { data: { experimentUrl } })
}
