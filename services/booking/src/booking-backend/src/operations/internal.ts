import * as crypto from 'crypto';
import { APIClient } from "@cross-lab-project/api-client";
import lodash from "lodash"
import * as amqplib from "amqplib"

import { DeviceBookingRequest } from '../messageDefinition';
import { config } from '../../../common/config';
import { GetIDFromURL, BelongsToUs } from '../../../common/auth';
import { ReservationAnswer, ReservationMessage, ReservationRequest } from '../../../device-reservation/messageDefinition';
import { sleep } from "../../../common/sleep";


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

    let deviceListResponse = await api.getDevicesByDeviceId({ device_id: GetIDFromURL(r.Device.toString()), flat_group: true }, r.Device.toString());
    let possibleDevices: string[] = [];

    if (deviceListResponse.body.type === "device") {
        possibleDevices.push(deviceListResponse.body.url)
    } else {
        // group
        for (let i = 0; i < deviceListResponse.body.devices.length; i++) {
            possibleDevices.push(deviceListResponse.body.devices[i].url);
        }
    }

    {
        let own: string[] = [];
        let other: string[] = [];

        for (let i = 0; i < possibleDevices.length; i++) {
            if (BelongsToUs(new URL(possibleDevices[i]))) {
                own.push(possibleDevices[i]);
            } else {
                other.push(possibleDevices[i]);
            }
        }

        lodash.shuffle(own);
        lodash.shuffle(other);
        own.push(...other);
        possibleDevices = own;
    }

    nextDevice: for (let i = 0; i < possibleDevices.length; i++) {
        let schedule = await api.postBookingSchedule({ Experiment: { Devices: [{ ID: possibleDevices[i] }] }, Time: { Start: r.Start.toISOString(), End: r.End.toISOString() }, Combined: false, onlyOwn: true });
        if (schedule.status !== 200) {
            continue;
        }
        if (schedule.body.length !== 1) {
            // Should only be one device
            continue
        }
        if (schedule.body[0].Booked.length !== 0) {
            // Device is booked
            continue
        }

        // Book device
        if (BelongsToUs(new URL(possibleDevices[i]))) {
            let connection: amqplib.Connection
            let channel: amqplib.Channel
            let returnChannel = randomID();
            let queueCreated = false;
            try {
                connection = await amqplib.connect(config.AmqpUrl);
                channel = await connection.createChannel();

                await channel.assertQueue("device-reservation", {
                    durable: true
                });

                await channel.assertQueue(returnChannel, {
                    durable: false
                });

                queueCreated = true;

                let m = new ReservationMessage(ReservationRequest.New, returnChannel);
                let url = config.OwnURL;
                if (!url.endsWith("/")) {
                    url = url + "/";
                }
                url = url + "booking/manage/" + r.BookingID
                m.BookingReference = new URL(url);
                m.Start = r.Start;
                m.End = r.End;
                m.Device = new URL(possibleDevices[i]);

                channel.sendToQueue("device-reservation", Buffer.from(JSON.stringify(m)));

                let aUnknown: any;
                let counter = 0;
                while (true) {
                    aUnknown = await channel.get(returnChannel, { noAck: true });
                    if (typeof (aUnknown) !== "boolean" && aUnknown !== null) {
                        break
                    }
                    counter++;
                    if (counter >= 50) {
                        continue nextDevice;
                    }
                    await sleep(100)
                }

                let a: amqplib.GetMessage = aUnknown as amqplib.GetMessage;
                let data = ReservationAnswer.fromString(a.content.toString());
                if (data.Type === ReservationRequest.New && data.Device.toString() === possibleDevices[i] && data.Start.isSame(r.Start) && data.End.isSame(r.End) && data.Successful) {
                    return true;
                }
                continue;
            } catch (err) {
                continue;
            } finally {
                if (channel !== undefined) {
                    if (queueCreated) {
                        await channel.deleteQueue(returnChannel);
                    }
                    await channel.close();
                }
                if (connection !== undefined) {
                    await connection.close();
                }
            }
        } else {
            let institution = new URL(possibleDevices[i]).origin;
            let putReturn = await api.putBookingDevice({ Device: { ID: possibleDevices[i] }, Time: { Start: r.Start.toISOString(), End: r.End.toISOString() }, BookingReference: r.BookingID.toString() }, institution + "/booking/manage")
            if (putReturn.status != 200) {
                continue;
            }
            let ID = putReturn.body.ReservationID;

            let counter = -1;
            while (true) {
                counter++;
                if (counter >= 50) {
                    continue nextDevice;
                }
                await sleep(1000);

                let getReturn = await api.getBookingManageByID({ ID: ID }, institution + "/booking/manage/" + ID);
                if (putReturn.status !== 200) {
                    continue;
                }
                switch (getReturn.body.Booking.Status) {
                    case "pending":
                    case "active-pending":
                        // Still waiting
                        continue;
                        break;
                    case "booked":
                    case "active":
                        // Success
                        return true;
                        break;
                    case "rejected":
                    case "cancelled":
                    case "active-rejected":
                        // Failure
                        continue nextDevice;
                        break;
                    case undefined:
                        counter += 10;
                        continue;
                        break;
                    default:
                        console.log("Unknown API response for getBookingManageByID:", getReturn.body.Booking.Status);
                        counter += 10;
                        continue;
                        break;
                }
            }
        }
    }

    // Ok, we were not able to book a device...
    return false;
}

// Helper
export function randomID(): string {
    var b = new Uint8Array(66);
    crypto.getRandomValues(b);
    return Buffer.from(b).toString("base64url");
}