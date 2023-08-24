import { handleDeviceChangedEventCallback } from './deviceChanged';
import { handlePeerconnectionClosedEventCallback } from './peerconnectionClosed';
import { handlePeerconnectionStatusChangedEventCallback } from './peerconnectionStatusChanged';
import { DeviceServiceTypes } from '@cross-lab-project/api-client';
import { InvalidValueError, MalformedBodyError } from '@crosslab/service-common';
import { EventEmitter } from 'stream';
import { TypedEventEmitter } from 'typeorm';

type CallbackEvents = {
    'device-changed': (device: DeviceServiceTypes.Device) => void;
    'peerconnection-closed': (peerconnection: DeviceServiceTypes.Peerconnection) => void;
    'peerconnection-status-changed': (
        peerconnection: DeviceServiceTypes.Peerconnection,
    ) => void;
};

export const callbackEventEmitter =
    new EventEmitter() as TypedEventEmitter<CallbackEvents>;

/**
 * This function handles an incoming event callback.
 * @param callback The incoming event callback to be handled.
 * @throws {MalformedBodyError} Thrown if the callback is malformed.
 * @throws {InvalidValueError} Thrown if the type of the event callback is unknown.
 * @returns The status code of the callback response.
 */
export async function handleEventCallback(
    callback: DeviceServiceTypes.EventCallback,
): Promise<200 | 410> {
    switch (callback.eventType) {
        case 'peerconnection-status-changed':
            if (!DeviceServiceTypes.isPeerconnectionStatusChangedEventCallback(callback))
                throw new MalformedBodyError(
                    'Body of request is not a valid peerconnection-status-changed event callback',
                    400,
                );
            return await handlePeerconnectionStatusChangedEventCallback(callback);
        case 'peerconnection-closed':
            if (!DeviceServiceTypes.isPeerconnectionClosedEventCallback(callback))
                throw new MalformedBodyError(
                    'Body of request is not a valid peerconnection-closed event callback',
                    400,
                );
            return handlePeerconnectionClosedEventCallback(callback);
        case 'device-changed':
            if (!DeviceServiceTypes.isDeviceChangedEventCallback(callback))
                throw new MalformedBodyError(
                    'Body of request is not a valid device-changed event callback',
                    400,
                );
            return handleDeviceChangedEventCallback(callback);
        default:
            throw new InvalidValueError(
                `Event-callbacks of type "${callback.eventType}" are not supported`,
                400,
            );
    }
}
