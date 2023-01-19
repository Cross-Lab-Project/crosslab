import express from 'express'
import fetch from 'node-fetch'
import { config } from '../config'
import { AppDataSource } from '../data_source'
import {
    isConcreteDevice,
    isDeviceGroup,
    isInstantiableBrowserDevice,
    isInstantiableCloudDevice,
} from '../generated/types'
import { apiClient, timeoutMap } from '../globals'
import { PeerconnectionModel } from '../model'
import { InvalidValueError, MalformedBodyError } from '../types/errors'
import { DeviceModel } from '../types/helper'
import { formatDevice, formatPeerconnection } from './database/format'
import { startSignaling } from './signaling'

export const callbackUrl: string =
    config.BASE_URL +
    (config.BASE_URL.endsWith('/') ? '' : '/') +
    'callbacks/device'
export const changedCallbacks = new Map<string, Array<string>>()
export const closedCallbacks = new Map<string, Array<string>>()
export const statusChangedCallbacks = new Map<string, Array<string>>()

/**
 * This function adds the endpoint for incoming callbacks registered by the peerconnection service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
    // TODO: adapt callback handling after codegen update
    app.post('/callbacks/device', async (req, res, next) => {
        try {
            const callback: any = req.body
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
 * @returns The type of the incoming callback.
 */
function getCallbackType(callback: any) {
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
async function handleEventCallback(callback: any): Promise<200 | 410> {
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
        case 'device-changed':
            return await handleDeviceChangedEventCallback(callback)
        default:
            throw new InvalidValueError(
                `Event-callbacks of type "${callback.eventType}" are not supported`,
                400
            )
    }
}

/**
 * This function handles an incoming "device-changed" event callback.
 * @param callback The incoming "device-changed" callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the device is not of type "device".
 * @returns The status code for the response to the incoming callback.
 */
async function handleDeviceChangedEventCallback(callback: any): Promise<200 | 410> {
    if (!callback.device) {
        throw new MalformedBodyError(
            'Event-callbacks of type "device-changed" require property "device"',
            400
        )
    }
    const device = callback.device
    if (
        !isConcreteDevice(device) &&
        !isDeviceGroup(device) &&
        !isInstantiableBrowserDevice(device) &&
        !isInstantiableCloudDevice(device)
    ) {
        throw new MalformedBodyError('Property "device" is not a valid device', 400)
    }
    if (!device.url) {
        throw new MalformedBodyError('Property "device" is missing url', 400)
    }
    if (!isConcreteDevice(device)) {
        throw new InvalidValueError(
            `Device needs to be of type "device" but is of type "${device.type}"`,
            400 // NOTE: error code
        )
    }
    const pendingConnectionsA = await AppDataSource.getRepository(PeerconnectionModel).find({
        where: {
            deviceA: {
                url: device.url
            }
        },
        relations: {
            deviceA: true,
            deviceB: true
        }
    })
    const pendingConnectionsB = await AppDataSource.getRepository(PeerconnectionModel).find({
        where: {
            deviceB: {
                url: device.url
            }
        },
        relations: {
            deviceA: true,
            deviceB: true
        }
    })
    const pendingConnections = [...pendingConnectionsA, ...pendingConnectionsB]
    if (pendingConnections.length === 0) {
        return 410
    }
    for (const pendingConnection of pendingConnections) {
        const deviceA = await apiClient.getDevice(pendingConnection.deviceA.url)
        const deviceB = await apiClient.getDevice(pendingConnection.deviceB.url)

        if (deviceA.connected && deviceB.connected) {
            clearTimeout(timeoutMap.get(pendingConnection.uuid))
            await startSignaling(pendingConnection)
            timeoutMap.delete(pendingConnection.uuid)
        }
    }
    return pendingConnections.length === 0 ? 410 : 200
}

/**
 * This function sends a "device-changed" callback.
 * @param device The device for which to send the callback.
 */
export async function sendChangedCallback(device: DeviceModel) {
    console.log(`Sending changedCallback for device ${device.uuid}`)
    const urls = changedCallbacks.get(device.uuid) ?? []
    for (const url of urls) {
        console.log(`Sending changedCallback for device ${device.uuid} to url ${url}`)
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'device-changed',
                device: await formatDevice(device),
            }),
            headers: [
                ["Content-Type", "application/json"]
            ]
        })

        if (res.status === 410) {
            const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
            changedCallbacks.set(
                device.uuid,
                changedCallbackURLs.filter((cb_url) => cb_url != url)
            )
        }
    }
}

/**
 * This function sends a "peerconnection-closed" callback.
 * @param peerconnection The peerconnection for which to send the callback.
 */
export async function sendClosedCallback(peerconnection: PeerconnectionModel) {
    const urls = closedCallbacks.get(peerconnection.uuid) ?? []
    for (const url of urls) {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'peerconnnection-closed',
                peerconnection: formatPeerconnection(peerconnection),
            }),
            headers: [
                ["Content-Type", "application/json"]
            ]
        })

        if (res.status === 410) {
            const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid) ?? []
            closedCallbacks.set(
                peerconnection.uuid,
                closedCallbackURLs.filter((cb_url) => cb_url != url)
            )
        }
    }
}

/**
 * This function sends a "peerconnection-status-changed" callback.
 * @param peerconnection The peerconnection for which to send the callback.
 */
export async function sendStatusChangedCallback(peerconnection: PeerconnectionModel) {
    console.log(`Sending statusChangedCallback for peerconnection ${peerconnection.uuid}`)
    const urls = statusChangedCallbacks.get(peerconnection.uuid) ?? []
    for (const url of urls) {
        console.log(`Sending statusChangedCallback for peerconnection ${peerconnection.uuid} to url ${url}`)
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'peerconnection-status-changed',
                peerconnection: formatPeerconnection(peerconnection),
            }),
            headers: [
                ["Content-Type", "application/json"]
            ]
        })

        if (res.status === 410) {
            const statusCallbackURLs =
                statusChangedCallbacks.get(peerconnection.uuid) ?? []
            statusChangedCallbacks.set(
                peerconnection.uuid,
                statusCallbackURLs.filter((cb_url) => cb_url != url)
            )
        }
    }
}
