import { config } from '../config'
import { DeviceModel, PeerconnectionModel } from '../database/model'
import { deviceRepository } from '../database/repositories/device'
import { peerconnectionRepository } from '../database/repositories/peerconnection'
import { deviceUrlFromId, peerconnectionUrlFromId } from './urlFromId'
import fetch from 'node-fetch'

export const callbackUrl: string =
    config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'callbacks/device'
export const changedCallbacks = new Map<string, Array<string>>()
export const closedCallbacks = new Map<string, Array<string>>()
export const statusChangedCallbacks = new Map<string, Array<string>>()

/**
 * This function sends a 'device-changed' callback.
 * @param device The device for which to send the callback.
 */
export async function sendChangedCallback(device: DeviceModel) {
    const urls = changedCallbacks.get(device.uuid) ?? []
    for (const url of urls) {
        console.log(
            `Sending changed-callback for device '${deviceUrlFromId(
                device.uuid
            )}' to '${url}'`
        )

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'device-changed',
                device: await deviceRepository.format(device),
            }),
            headers: [['Content-Type', 'application/json']],
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
 * This function sends a 'peerconnection-closed' callback.
 * @param peerconnection The peerconnection for which to send the callback.
 */
export async function sendClosedCallback(peerconnection: PeerconnectionModel) {
    const urls = closedCallbacks.get(peerconnection.uuid) ?? []
    for (const url of urls) {
        console.log(
            `Sending closed-callback for peerconnection '${peerconnectionUrlFromId(
                peerconnection.uuid
            )}' to '${url}'`
        )

        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'peerconnnection-closed',
                peerconnection: await peerconnectionRepository.format(peerconnection),
            }),
            headers: [['Content-Type', 'application/json']],
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
 * This function sends a 'peerconnection-status-changed' callback.
 * @param peerconnection The peerconnection for which to send the callback.
 */
export async function sendStatusChangedCallback(peerconnection: PeerconnectionModel) {
    const urls = statusChangedCallbacks.get(peerconnection.uuid) ?? []
    for (const url of urls) {
        console.log(
            `Sending status-changed-callback for peerconnection '${peerconnectionUrlFromId(
                peerconnection.uuid
            )}' to '${url}'`
        )
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'peerconnection-status-changed',
                peerconnection: await peerconnectionRepository.format(peerconnection),
            }),
            headers: [['Content-Type', 'application/json']],
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
