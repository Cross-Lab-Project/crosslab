import { config } from '../config'
import { experimentRepository } from '../database/repositories/experiment'
import { peerconnectionRepository } from '../database/repositories/peerconnection'
import { getPeerconnection } from './api'
import { logger } from './logger'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import {
    MalformedBodyError,
    InvalidValueError,
    MissingPropertyError,
} from '@crosslab/service-common'
import express from 'express'

export const callbackUrl: string =
    config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + `callbacks/experiment`
export const peerconnectionClosedCallbacks: string[] = []
export const peerconnectionStatusChangedCallbacks: string[] = []
export const deviceChangedCallbacks: string[] = []

/**
 * This function adds the endpoint for incoming callbacks registered by the experiment service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
    // TODO: adapt callback handling after codegen update
    app.post('/callbacks/experiment', async (req, res, next) => {
        try {
            const callback = req.body
            logger.log('info', callback)
            if (typeof callback !== 'object')
                throw new MalformedBodyError('Body of callback is not an object', 400)
            const callbackType = getCallbackType(callback)

            switch (callbackType) {
                case 'event':
                    return res.status(await handleEventCallback(callback)).send()
                default:
                    throw new InvalidValueError(
                        `Callbacks of type "${req.body.callbackType}" are not supported`,
                        400
                    )
            }
        } catch (error) {
            return next(error)
        }
    })
}

/**
 * This function attempts to get the type of an incoming callback.
 * @param callback The incoming callback of which to get the type.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The type of the incoming callback.
 */
function getCallbackType(callback: any) {
    if (!callback.callbackType) {
        throw new MissingPropertyError('Callbacks require property "callbackType"', 400)
    }
    if (typeof callback.callbackType !== 'string') {
        throw new MalformedBodyError(
            'Property "callbackType" needs to be of type string',
            400
        )
    }
    return callback.callbackType as string
}

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
async function handleEventCallback(callback: any): Promise<200 | 410> {
    if (!callback.eventType) {
        throw new MissingPropertyError(
            'Callbacks of type "event" require property "eventType"',
            400
        )
    }
    if (typeof callback.eventType !== 'string') {
        throw new MissingPropertyError(
            'Property "eventType" needs to be of type "string"',
            400
        )
    }
    switch (callback.eventType) {
        case 'peerconnection-status-changed':
            return await handlePeerconnectionStatusChangedEventCallback(callback)
        case 'peerconnection-closed':
            return handlePeerconnectionClosedEventCallback(callback)
        case 'device-changed':
            return handleDeviceChangedEventCallback(callback)
        default:
            throw new InvalidValueError(
                `Event-callbacks of type "${callback.eventType}" are not supported`,
                400
            )
    }
}

/**
 * This function handles an incoming "peerconnection-closed" event callback.
 * @param callback The incoming "peerconnection-closed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
function handlePeerconnectionClosedEventCallback(callback: any): 200 | 410 {
    if (!callback.peerconnection) {
        throw new MissingPropertyError(
            'Event-callbacks of type "peerconnection-closed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!DeviceServiceTypes.isPeerconnection(peerconnection)) {
        throw new MalformedBodyError('Property "peerconnection" is malformed', 400)
    }
    if (!peerconnection.url) {
        throw new MissingPropertyError(
            'Property "peerconnection" is missing property "url"',
            400
        )
    }
    if (!peerconnectionClosedCallbacks.includes(peerconnection.url)) {
        return 410
    }
    // TODO: add peerconnection closed handling
    return 200
}

/**
 * This function handles an incoming "peerconnection-status-changed" event callback.
 * @param callback The incoming "peerconnection-status-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
async function handlePeerconnectionStatusChangedEventCallback(
    callback: any
): Promise<200 | 410> {
    if (!callback.peerconnection) {
        throw new MissingPropertyError(
            'Event-callbacks of type "peerconnection-status-changed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!DeviceServiceTypes.isPeerconnection(peerconnection)) {
        throw new MalformedBodyError('Property "peerconnection" is malformed', 400)
    }
    if (!peerconnectionStatusChangedCallbacks.includes(peerconnection.url)) {
        return 410 // TODO: find a solution for this problem (race condition)
    }
    if (!peerconnection.status) {
        throw new MissingPropertyError(
            'Property "peerconnection" is missing property "status"'
        )
    }

    // TODO: add peerconnection status changed handling
    const peerconnectionModel = await peerconnectionRepository.findOneOrFail({
        where: { url: peerconnection.url },
        relations: {
            experiment: {
                connections: true,
            },
        },
    })

    const experimentModel = peerconnectionModel.experiment
    if (!experimentModel)
        throw new MissingPropertyError(
            `Peerconnection model is missing property "experiment"`
        ) // NOTE: error code

    switch (peerconnection.status) {
        case 'closed':
            // TODO: handle status closed
            break
        case 'connected':
            // TODO: handle status connected
            if (!experimentModel.connections)
                throw new MissingPropertyError(
                    `Experiment model is missing property "connections"`,
                    400
                ) // NOTE: error code

            // eslint-disable-next-line no-case-declarations
            let connected = true
            for (const pc of experimentModel.connections) {
                if ((await getPeerconnection(pc.url)).status !== 'connected') {
                    connected = false
                }
            }

            if (experimentModel.status === 'setup' && connected) {
                experimentModel.status = 'running'
                await experimentRepository.save(experimentModel)
            }
            break
        case 'failed':
            // TODO: handle status failed
            break
        case 'new':
            // TODO: handle status new
            break
        case 'connecting':
            // TODO: handle status connecting
            break
        case 'disconnected':
            // TODO: handle status disconnected
            break
    }
    return 200
}

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {MissingPropertyError} Thrown if the callback is missing a property.
 * @returns The status code for the response to the incoming callback.
 */
function handleDeviceChangedEventCallback(callback: any): 200 | 410 {
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
    if (!deviceChangedCallbacks.includes(device.url)) {
        return 410
    }
    logger.log('info', `Device ${device.url} changed!`)
    // TODO: add device changed handling
    return 200
}
