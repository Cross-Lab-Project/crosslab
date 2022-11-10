import { MalformedBodyError } from '../generated/types'
import {
    InvalidValueError,
    MissingEntityError,
    MissingPropertyError,
} from '../types/errors'
import express from 'express'
import { config } from '../config'
import { findPeerconnectionModelByUrl } from '../database/methods/find'
import { saveExperimentModel } from '../database/methods/save'
import { DeviceServiceTypes } from '@cross-lab-project/api-client'
import { RequestHandler } from './requestHandler'

export const callbackUrl: string =
    config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'experiments/callbacks'
export const peerconnectionClosedCallbacks: string[] = []
export const peerconnectionStatusChangedCallbacks: string[] = []
export const deviceChangedCallbacks: string[] = []

/**
 * This function adds the endpoint for incoming callbacks registered by the experiment service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
    // TODO: adapt callback handling after codegen update
    app.post('/experiments/callbacks', async (req, res) => {
        const requestHandler: RequestHandler = new RequestHandler("callbackHandling")
        const callback = req.body
        if (typeof callback !== 'object')
            throw new MalformedBodyError('Body of callback is not an object', 400)
        const callbackType = requestHandler.executeSync(getCallbackType, callback)

        switch (callbackType) {
            case 'event':
                return res.status(await requestHandler.executeAsync(handleEventCallback, callback)).send()
            default:
                requestHandler.throw(InvalidValueError,
                    `Callbacks of type "${req.body.callbackType}" are not supported`,
                    400
                )
        }
    })
}

/**
 * This function attempts to get the type of an incoming callback.
 * @param callback The incoming callback of which to get the type.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @returns The type of the incoming callback.
 */
function getCallbackType(_requestHandler: RequestHandler, callback: any) {
    if (typeof callback.callbackType !== 'string') {
        throw new MalformedBodyError(
            'Property "callbackType" needs to be of type string',
            400
        )
    }
    if (!callback.callbackType) {
        throw new MalformedBodyError('Callbacks require property "callbackType"', 400)
    }
    return callback.callbackType as string
}

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
async function handleEventCallback(requestHandler: RequestHandler, callback: any): Promise<200 | 410> {
    if (!callback.eventType) {
        throw new MalformedBodyError(
            'Callbacks of type "event" require property "eventType"',
            400
        )
    }
    if (typeof callback.eventType !== 'string') {
        throw new MalformedBodyError(
            'Property "callbackType" needs to be of type "string"',
            400
        )
    }
    switch (callback.eventType) {
        case 'peerconnection-status-changed':
            return await requestHandler.executeAsync(handlePeerconnectionStatusChangedEventCallback, callback)
        case 'peerconnection-closed':
            return requestHandler.executeSync(handlePeerconnectionClosedEventCallback, callback)
        case 'device-changed':
            return requestHandler.executeSync(handleDeviceChangedEventCallback, callback)
        default:
            requestHandler.throw(InvalidValueError,
                `Event-callbacks of type "${callback.eventType}" are not supported`,
                400
            )
    }
}

/**
 * This function handles an incoming "peerconnection-closed" event callback.
 * @param callback The incoming "peerconnection-closed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @returns The status code for the response to the incoming callback.
 */
function handlePeerconnectionClosedEventCallback(_requestHandler: RequestHandler, callback: any): 200 | 410 {
    if (!callback.peerconnection) {
        throw new MalformedBodyError(
            'Event-callbacks of type "peerconnection-closed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!DeviceServiceTypes.isPeerconnection(peerconnection)) {
        throw new MalformedBodyError('Property "peerconnection" is malformed', 400)
    }
    if (!peerconnection.url) {
        throw new MalformedBodyError('Property "peerconnection" is missing url', 400)
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
 * @returns The status code for the response to the incoming callback.
 */
async function handlePeerconnectionStatusChangedEventCallback(
    requestHandler: RequestHandler,
    callback: any
): Promise<200 | 410> {
    if (!callback.peerconnection) {
        throw new MalformedBodyError(
            'Event-callbacks of type "peerconnection-status-changed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!DeviceServiceTypes.isPeerconnection(peerconnection)) {
        throw new MalformedBodyError('Property "peerconnection" is malformed', 400)
    }
    if (!peerconnection.url) {
        throw new MalformedBodyError('Property "peerconnection" is missing url', 400)
    }
    if (!peerconnectionStatusChangedCallbacks.includes(peerconnection.url)) {
        return 410
    }
    if (!peerconnection.status) {
        throw new MalformedBodyError('Property "peerconnection" is missing status')
    }

    // TODO: add peerconnection status changed handling
    const peerconnectionModel = await requestHandler.executeAsync(findPeerconnectionModelByUrl, peerconnection.url)
    if (!peerconnectionModel)
        requestHandler.throw(MissingEntityError,
            `No peerconnection model with url ${peerconnection.url} found`,
            500
        ) // NOTE: error code

    peerconnectionModel.status = peerconnection.status

    switch (peerconnectionModel.status) {
        case 'closed':
            // TODO: handle status closed
            break
        case 'connected':
            // TODO: handle status connected
            const experimentModel = peerconnectionModel.experiment
            if (!experimentModel)
                requestHandler.throw(MissingPropertyError,
                    `Peerconnection model is missing property "experiment"`
                ) // NOTE: error code

            if (!experimentModel.connections)
                requestHandler.throw(MissingPropertyError,
                    `Experiment model is missing property "connections"`
                ) // NOTE: error code

            if (
                experimentModel.status === 'setup' &&
                !experimentModel.connections.find((c) => c.status !== 'connected')
            ) {
                experimentModel.status = 'running'
                await requestHandler.executeAsync(saveExperimentModel, experimentModel)
            }
            break
        case 'failed':
            // TODO: handle status failed
            break
        case 'waiting-for-devices':
            // TODO: handle status waiting-for-devices
            break
    }
    return 200
}

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @returns The status code for the response to the incoming callback.
 */
function handleDeviceChangedEventCallback(_requestHandler: RequestHandler, callback: any): 200 | 410 {
    if (!callback.device) {
        throw new MalformedBodyError(
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
        throw new MalformedBodyError('Property "device" is missing url', 400)
    }
    if (!deviceChangedCallbacks.includes(device.url)) {
        return 410
    }
    // TODO: add device changed handling
    return 200
}
