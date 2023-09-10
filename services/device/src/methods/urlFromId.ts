import { config } from '../config.js';

/**
 * This function builds the url of a device using its id.
 * @param deviceId The id of the device.
 * @returns The url of the device.
 */
export function deviceUrlFromId(deviceId: string): string {
  return (config.BASE_URL + '/devices/' + deviceId).replace('//devices', '/devices');
}

export function deviceIdFromUrl(url: string): string {
  const regex = /\/devices\/([\dA-Fa-f-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error('Invalid device url');
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

export function peerconnectionIdFromUrl(url: string): string {
  const regex = /\/peerconnections\/([\dA-Fa-f-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error('Invalid peerconnection url');
}