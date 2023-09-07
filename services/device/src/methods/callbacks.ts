import { config } from '../config.js';
import { repositories } from '../database/dataSource.js';
import { DeviceModel, PeerconnectionModel } from '../database/model.js';
import {
    DeviceChangedEventCallback,
    PeerconnectionClosedEventCallback,
    PeerconnectionStatusChangedEventCallback,
} from '../generated/types.js';
import { deviceUrlFromId, peerconnectionUrlFromId } from './urlFromId.js';
import { logger } from '@crosslab/service-common';
import fetch from 'node-fetch';

export const callbackUrl: string = (config.BASE_URL + '/callbacks/device').replace(
    '//callbacks',
    '/callbacks',
);
export const changedCallbacks = new Map<string, string[] | undefined>();
export const closedCallbacks = new Map<string, string[] | undefined>();
export const statusChangedCallbacks = new Map<string, string[] | undefined>();

/**
 * This function sends a 'device-changed' callback.
 * @param device The device for which to send the callback.
 */
export async function sendChangedCallback(device: DeviceModel) {
    const urls = changedCallbacks.get(device.uuid) ?? [];
    for (const url of urls) {
        // TODO: proper error handling
        try {
            logger.log(
                'info',
                `Sending changed-callback for device '${deviceUrlFromId(
                    device.uuid,
                )}' to '${url}'`,
            );

            const callback: DeviceChangedEventCallback = {
                callbackType: 'event',
                eventType: 'device-changed',
                device: await repositories.device.format(device),
            };
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(callback),
                headers: [['Content-Type', 'application/json']],
            });

            if (res.status === 410) {
                const changedCallbackURLs = changedCallbacks.get(device.uuid);
                changedCallbacks.set(
                    device.uuid,
                    changedCallbackURLs?.filter((cbUrl) => cbUrl != url),
                );
            }
        } catch (error) {
            logger.log('error', 'An error occurred while sending a changed-callback', {
                data: { error, device: deviceUrlFromId(device.uuid), url },
            });
        }
    }
}

/**
 * This function sends a 'peerconnection-closed' callback.
 * @param peerconnection The peerconnection for which to send the callback.
 */
export async function sendClosedCallback(peerconnection: PeerconnectionModel) {
    const urls = closedCallbacks.get(peerconnection.uuid) ?? [];
    for (const url of urls) {
        // TODO: proper error handling
        try {
            logger.log(
                'info',
                `Sending closed-callback for peerconnection '${peerconnectionUrlFromId(
                    peerconnection.uuid,
                )}' to '${url}'`,
            );

            const callback: PeerconnectionClosedEventCallback = {
                callbackType: 'event',
                eventType: 'peerconnection-closed',
                peerconnection: await repositories.peerconnection.format(peerconnection),
            };
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(callback),
                headers: [['Content-Type', 'application/json']],
            });

            if (res.status === 410) {
                const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid);
                closedCallbacks.set(
                    peerconnection.uuid,
                    closedCallbackURLs?.filter((cbUrl) => cbUrl != url),
                );
            }
        } catch (error) {
            logger.log('error', 'An error occurred while sending a closed-callback', {
                data: {
                    error,
                    peerconnection: peerconnectionUrlFromId(peerconnection.uuid),
                    url,
                },
            });
        }
    }
}

/**
 * This function sends a 'peerconnection-status-changed' callback.
 * @param peerconnection The peerconnection for which to send the callback.
 */
export async function sendStatusChangedCallback(peerconnection: PeerconnectionModel) {
    const urls = statusChangedCallbacks.get(peerconnection.uuid) ?? [];
    for (const url of urls) {
        // TODO: proper error handling
        try {
            logger.log(
                'info',
                `Sending status-changed-callback for peerconnection '${peerconnectionUrlFromId(
                    peerconnection.uuid,
                )}' to '${url}'`,
            );

            const callback: PeerconnectionStatusChangedEventCallback = {
                callbackType: 'event',
                eventType: 'peerconnection-status-changed',
                peerconnection: await repositories.peerconnection.format(peerconnection),
            };
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(callback),
                headers: [['Content-Type', 'application/json']],
            });

            if (res.status === 410) {
                const statusCallbackURLs = statusChangedCallbacks.get(
                    peerconnection.uuid,
                );
                statusChangedCallbacks.set(
                    peerconnection.uuid,
                    statusCallbackURLs?.filter((cbUrl) => cbUrl != url),
                );
            }
        } catch (error) {
            logger.log(
                'error',
                'An error occurred while sending a status-changed-callback',
                {
                    data: {
                        error,
                        peerconnection: peerconnectionUrlFromId(peerconnection.uuid),
                        url,
                    },
                },
            );
        }
    }
}
