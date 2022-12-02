import { ExperimentModel } from '../database/model'
import {
    DeviceNotConnectedError,
    InvalidStateError,
    MissingPropertyError,
} from '../types/errors'
import {
    deletePeerconnection,
    getDevice,
    instantiateDevice,
    startCloudDeviceInstance,
} from './api'
import { experimentUrlFromId } from './url'
import { bookExperiment as _bookExperiment } from './api'
import { saveExperimentModel } from '../database/methods/save'
import { establishPeerconnections } from './peerconnection'
import { callbackUrl } from './callbacks'
import { RequestHandler } from './requestHandler'

/**
 * This function attempts to book an experiment.
 * @param experimentModel The experiment to be booked.
 */
export async function bookExperiment(
    requestHandler: RequestHandler,
    experimentModel: ExperimentModel
) {
    const experimentUrl = requestHandler.executeSync(
        experimentUrlFromId,
        experimentModel.uuid
    )
    requestHandler.log('info', `Attempting to book experiment "${experimentUrl}"`)

    if (!experimentModel.devices || experimentModel.devices.length === 0)
        requestHandler.throw(
            MissingPropertyError,
            `Experiment ${experimentUrl} has no devices`
        )

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
    await requestHandler.executeAsync(saveExperimentModel, experimentModel)
    requestHandler.log('info', `Successfully booked experiment "${experimentUrl}"`)
}

/**
 * This function attempts to run an experiment.
 * @param experimentModel The experiment to be run.
 * @throws {InvalidStateError} Thrown when the status of the experiment is already "finished".
 */
export async function runExperiment(
    requestHandler: RequestHandler,
    experimentModel: ExperimentModel
) {
    const experimentUrl = requestHandler.executeSync(
        experimentUrlFromId,
        experimentModel.uuid
    )
    requestHandler.log('info', `Attempting to run experiment "${experimentUrl}"`)
    // make sure experiment is not already finished
    if (experimentModel.status === 'finished') {
        requestHandler.throw(
            InvalidStateError,
            `Experiment status is already "finished"`,
            400
        )
    }

    // make sure the experiment contains devices
    if (!experimentModel.devices || experimentModel.devices.length === 0) {
        requestHandler.throw(
            MissingPropertyError,
            `Experiment does not contain any devices`,
            400
        )
    }

    // book experiment if status is "created"
    if (experimentModel.status === 'created') {
        await bookExperiment(requestHandler, experimentModel)
    }

    // make sure the experiment has a booking
    if (!experimentModel.bookingID) {
        requestHandler.throw(
            MissingPropertyError,
            `Experiment does not have a booking`,
            400
        )
    }

    /**
     * This variable determines if the experiment needs to go into the state "setup".
     * The state "setup" is only needed if the experiment contains instantiable devices.
     */
    let needsSetup = false

    // make sure the concrete devices of the experiment are connected
    for (const device of experimentModel.devices) {
        const resolvedDevice = await requestHandler.executeAsync(getDevice, device.url) // TODO: error handling
        if (resolvedDevice.type === 'device' && !resolvedDevice.connected) {
            requestHandler.throw(
                DeviceNotConnectedError,
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
                requestHandler.throw(
                    MissingPropertyError,
                    'Device is missing its url',
                    500
                ) // NOTE: error code?
            const { instance, deviceToken } = await requestHandler.executeAsync(
                instantiateDevice,
                resolvedDevice.url,
                { changedUrl: callbackUrl }
            )
            if (!instance) 
                requestHandler.throw(
                    MissingPropertyError,
                    'Instance of device is missing',
                    500
                )
            if (!instance?.url)
                requestHandler.throw(
                    MissingPropertyError,
                    'Device instance is missing its url',
                    500
                ) // NOTE: error code?
            if (!deviceToken) 
                requestHandler.throw(
                    MissingPropertyError,
                    'Token of device instance is missing',
                    500
                )
            if (!device.additionalProperties) device.additionalProperties = {}
            device.additionalProperties.instanceUrl = instance.url
            device.additionalProperties.deviceToken = deviceToken

            // instantiate cloud instantiable devices
            const experimentUrl = requestHandler.executeSync(
                experimentUrlFromId,
                experimentModel.uuid
            )
            if (resolvedDevice.type === 'cloud instantiable') {
                await requestHandler.executeAsync(
                    startCloudDeviceInstance,
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
    //         throw new InvalidBookingError(`The booking ${experimentModel.bookingID} is invalid for the experiment ${experimentUrlFromId(experimentModel.uuid)}`)
    //     }
    // } catch (error) {
    //     // TODO: error handling
    //     throw error
    // }

    // TODO: add callback to all devices/instances for changes

    if (needsSetup) {
        await establishPeerconnections(requestHandler, experimentModel)
        experimentModel.status = 'setup'
    } else {
        await establishPeerconnections(requestHandler, experimentModel)
        experimentModel.status = 'running'
    }

    // save experiment
    await requestHandler.executeAsync(saveExperimentModel, experimentModel)
    requestHandler.log('info', `Successfully running experiment "${experimentUrl}"`)
}

/**
 * This function attempts to finish an experiment.
 * @param experimentModel The experiment to be finished.
 */
export async function finishExperiment(
    requestHandler: RequestHandler,
    experimentModel: ExperimentModel
) {
    const experimentUrl = requestHandler.executeSync(
        experimentUrlFromId,
        experimentModel.uuid
    )
    requestHandler.log('info', `Attempting to finish experiment "${experimentUrl}"`)

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
                    await requestHandler.executeAsync(
                        deletePeerconnection,
                        peerconnection.url
                    )
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
    await requestHandler.executeAsync(saveExperimentModel, experimentModel)
    requestHandler.log('info', `Successfully finished experiment "${experimentUrl}"`)
}
