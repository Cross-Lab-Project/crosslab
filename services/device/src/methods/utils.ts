import { config } from '../config'

/**
 * This function builds the url of a device using its id.
 * @param deviceÍd The id of the device.
 * @returns The url of the device.
 */
export function deviceUrlFromId(deviceÍd: string): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'devices/' +
        deviceÍd
    )
}

/**
 * This function builds the url of a peerconnection using its id.
 * @param peerconnectionId The id of the peerconnection.
 * @returns The url of the peerconnection.
 */
export function peerconnectionUrlFromId(peerconnectionId: string): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'peerconnections/' +
        peerconnectionId
    )
}
