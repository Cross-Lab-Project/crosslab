import { config } from '../config.js';

/**
 * This function builds the url of a device using its id.
 * @param deviceId The id of the device.
 * @returns The url of the device.
 */
export function deviceUrlFromId(deviceId: string): string {
    return (config.BASE_URL + '/devices/' + deviceId).replace('//devices', '/devices');
}

/**
 * This function builds the url of a peerconnection using its id.
 * @param peerconnectionId The id of the peerconnection.
 * @returns The url of the peerconnection.
 */
export function peerconnectionUrlFromId(peerconnectionId: string): string {
    return (config.BASE_URL + '/peerconnections/' + peerconnectionId).replace(
        '//peerconnections',
        '/peerconnections',
    );
}
