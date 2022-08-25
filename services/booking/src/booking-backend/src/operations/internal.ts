import * as crypto from 'crypto';
import { APIClient } from "@cross-lab-project/api-client";

import { DeviceBookingRequest } from '../messageDefinition';
import { config } from '../../../common/config';
import { GetIDFromURL } from '../../../common/auth';

export enum callbackType {

}

// Handle callback
export async function handleCallback(type: callbackType, target: string) {
}

// Reservate devices
export async function reservateDevice(r: DeviceBookingRequest): Promise<boolean> {
    if (r.BookingID < 0n) {
        throw new Error("BookingID must not be negative");
    }

    if (r.Position < 0) {
        throw new Error("Position must not be negative");
    }

    let api: APIClient = new APIClient(config.OwnURL);

    let deviceListResponse = api.getDevicesByDeviceId({device_id: GetIDFromURL(r.Device.toString()), flat_group: true}, r.Device.toString());

    return false;
}

// Helper
export function randomID(): string {
    var b = new Uint8Array(66);
    crypto.getRandomValues(b);
    return Buffer.from(b).toString("base64url");
}