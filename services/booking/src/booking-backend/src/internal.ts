import * as crypto from 'crypto';
import { APIClient, UnsuccessfulRequestError, BookingServiceSignatures } from "@cross-lab-project/api-client";
import lodash from "lodash"
import * as amqplib from "amqplib"
import * as mysql from 'mysql2/promise';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { DeviceBookingRequest } from './messageDefinition';
import { config } from '../../common/config';
import { BelongsToUs } from '../../common/auth';
import { ReservationAnswer, ReservationMessage, ReservationRequest } from '../../device-reservation/messageDefinition';
import { sleep } from "../../common/sleep";



export enum callbackType {
    DeviceUpdate,
    BookingUpdate
}

// Handle received callback
export async function handleCallback(type: callbackType, target: bigint, parameters: any) {
    let api: APIClient = new APIClient(config.OwnURL);

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        switch (type) {
            case callbackType.DeviceUpdate:
                try {
                    await db.beginTransaction();
                    // Lock booking
                    let [bookingRow, bookingFields]: [any, any] = await db.execute("SELECT `start`,`end`,`type`,`status` FROM booking WHERE `id`=? FOR UPDATE", [target]);
                    if (bookingRow.length == 0) {
                        throw Error("Booking (" + target + ") not known");
                    }
                    let [start, end]: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs(bookingRow[0].start), dayjs(bookingRow[0].end)];

                    // Get device
                    let [rows, fields]: [any, any] = await db.execute("SELECT `bookeddevice`, `originaldevice`,  FROM `bookeddevices` WHERE booking=? AND originalposition=? FOR UPDATE", [target, parameters.Position]);

                    if (rows.length == 0) {
                        throw Error("Booking, Position (" + target + "," + parameters.Position + ") not known");
                    }

                    // Check availability
                    let device = await api.getDevice(rows[0].bookeddevice);
                    if (device.type == "group") {
                        throw Error("Booked device " + rows[0].bookeddevice + " is group");
                    }

                    // If not available: request new device
                    if (device.type == "device") { // Other devices are always available
                        let available: boolean = device.connected;

                        // Check availability if needed
                        if (available) {
                            available = false;
                            for(let i = 0; i < device.announcedAvailability.length; i++) {
                                if(dayjs(device.announcedAvailability[i].start).isSameOrBefore(start) && dayjs(device.announcedAvailability[i].end).isSameOrAfter(end)) {
                                    available = true;
                                    break;
                                }
                            }
                        }

                        // Act
                        if(!available) {
                            // TODO
                        }
                    }

                    // In the end - commit
                    db.commit();
                } catch (err) {
                    db.rollback();
                }

                break;

            case callbackType.BookingUpdate:
                // Get booking
                // Check status
                // Problems: Book new device
                // TODO
                break;

            default:
                // Something went wrong here...
                throw Error("Unknown callback type: " + type)
        }
    } finally {
        db.end();
    }
}

async function addDeviceCallback(device: URL, targetbooking: bigint, parameters: object): Promise<string> {
    let id: string = randomID();
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        let data: string = JSON.stringify(parameters);
        await db.execute("INSERT INTO callback (`id`, `type`, `targetbooking`, `parameters`) VALUES (?,?,?,?)", [id, callbackType.DeviceUpdate, targetbooking, data]);

        let api: APIClient = new APIClient(config.OwnURL);
        await api.updateDevice(device.toString(), {}, { changedUrl: config.OwnURL + "/booking_callback/" + id });
    } catch (e) {
        // For now, just throw the error
        throw e;
    } finally {
        db.end();
    }

    return id;
}

async function addBookingCallback(booking: URL, targetbooking: bigint, parameters: object): Promise<string> {
    let id: string = randomID();
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        let data: string = JSON.stringify(parameters);
        await db.execute("INSERT INTO callback (`id`, `type`, `targetbooking`, `parameters`) VALUES (?,?,?,?)", [id, callbackType.BookingUpdate, targetbooking, data]);

        let api: APIClient = new APIClient(config.OwnURL);
        await api.updateBooking(booking.toString(), { Callback: config.OwnURL + "/booking_callback/" + id });
    } catch (e) {
        // For now, just throw the error
        throw e;
    } finally {
        db.end();
    }

    return id;
}

// Send callback out
export async function dispatchCallback(bookingID: bigint) {
    if (bookingID < 0n) {
        throw new Error("BookingID must not be negative");
    }

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `id`, `url` FROM bookingcallbacks WHERE booking=? FOR UPDATE", [bookingID]);
        for (let i = 0; i < rows.length; i++) {
            try {
                let response = await fetch(rows[i].url, { method: 'GET' });
                if (response.status == 404 || response.status == 410) { // Code depends on service
                    // Callback no longer needed
                    await db.execute("DELETE FROM bookingcallbacks WHERE id=?", [rows[i].id]);
                }
            } catch (err) {
                // Something went wrong here - just continue for now
                continue
            }
        }
    } finally {
        await db.end();
    }
}


async function reservationCheckStatus(bookingID: bigint) {
    if (bookingID < 0n) {
        throw new Error("BookingID must not be negative");
    }

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();
    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE id=? FOR UPDATE", [bookingID]);
        if (rows.length == 0) {
            throw new Error("Booking " + bookingID + " does not exist");
        }
        let oldStatus: string = rows[0].status;
        if (oldStatus != "pending" && oldStatus != "active-pending") {
            // Nothing to do here - jump out
            await db.commit();
            return;
        }

        [rows, fields] = await db.execute("SELECT count(*) AS n FROM bookeddevices WHERE booking=? AND bookeddevice=NULL", [bookingID]);

        if (rows[0].n == 0) {
            // Every device is booked
            let taretStatus: string = "booked";
            if (oldStatus === "active-pending") {
                taretStatus = "active";
            }
            await db.execute("UPDATE booking SET `status`=? WHERE id=?", [taretStatus, bookingID]);
        }

        await db.commit();
        dispatchCallback(bookingID);
    } catch (err) {
        await db.rollback();
        throw err;
    } finally {
        await db.end();
    }
}

// Reservate devices - will change status of booking itself if reservation is not successful
export async function reservateDevice(r: DeviceBookingRequest) {
    if (r.BookingID < 0n) {
        throw new Error("BookingID must not be negative");
    }

    if (r.Position < 0) {
        throw new Error("Position must not be negative");
    }

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE id=?", [r.BookingID]);
    if (rows.length == 0) {
        throw new Error("Booking " + r.BookingID + " does not exist");
    }

    if (rows[0].status === "rejected" || rows[0].status === "cancelled" || rows[0].status === "active-rejected") {
        // Get early out - this booking will not success anyway
    }
    await db.end();

    let api: APIClient = new APIClient(config.OwnURL);

    let deviceListResponse = await api.getDevice(r.Device.toString(), { flat_group: true });
    let possibleDevices: string[] = [];

    if (deviceListResponse.type === "device" || deviceListResponse.type === "cloud instantiable" || deviceListResponse.type === "edge instantiable") {
        possibleDevices.push(deviceListResponse.url)
    } else if (deviceListResponse.type === "group") {
        // group
        for (let i = 0; i < deviceListResponse.devices.length; i++) {
            possibleDevices.push(deviceListResponse.devices[i].url);
        }
    } else {
        throw new Error("BUG: Unknown device type for" + r.Device.toString())
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
        let schedule: BookingServiceSignatures.GetScheduleSuccessResponse["body"];
        try {
            schedule = await api.getSchedule({ Experiment: { Devices: [{ ID: possibleDevices[i] }] }, Time: { Start: r.Start.toISOString(), End: r.End.toISOString() }, Combined: false, onlyOwn: true });
        } catch (e) {
            continue
        }
        if (schedule.length !== 1) {
            // Should only be one device
            continue
        }
        if (schedule[0].Booked.length !== 0) {
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
                    await db.execute("UPDATE bookeddevices SET `bookeddevice`=? WHERE `booking`=? AND `originalposition`=?", [data.Device, r.BookingID, r.Position])
                    addDeviceCallback(data.Device, r.BookingID, { "Position": r.Position });
                    await reservationCheckStatus(r.BookingID);
                    return;
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
            let putReturn = await api.bookExperiment({ Experiment: { Devices: [{ ID: possibleDevices[i] }] }, Time: { Start: r.Start.toISOString(), End: r.End.toISOString() }, BookingReference: r.BookingID.toString() }, { url: institution + "/booking/manage" })
            if (putReturn.status != 200) {
                continue;
            }
            let ID = putReturn.ReservationID;

            let counter = -1;
            while (true) {
                counter++;
                if (counter >= 50) {
                    continue nextDevice;
                }
                await sleep(1000);

                let getReturn = await api.getBooking(institution + "/booking/manage/" + ID);
                if (putReturn.status !== 200) {
                    continue;
                }
                switch (getReturn.Booking.Status) {
                    case "pending":
                    case "active-pending":
                        // Still waiting
                        continue;
                        break;
                    case "booked":
                    case "active":
                        // Success
                        await db.execute("UPDATE bookeddevices SET `bookeddevice`=?, `remotereference`=? WHERE `booking`=? AND `originalposition`=?", [possibleDevices[i], getReturn.Booking.ID, r.BookingID, r.Position])
                        addBookingCallback(new URL(possibleDevices[i]), r.BookingID, { "Position": r.Position });
                        await reservationCheckStatus(r.BookingID);
                        return;
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
                        console.log("Unknown API response for getBookingManageByID:", getReturn.Booking.Status);
                        counter += 10;
                        continue;
                        break;
                }
            }
        }
    }

    // Ok, we were not able to book a device...
    DeleteBooking(r.BookingID, "rejected");
}

export async function freeDevice(r: bigint) {
    // TODO
}

// Helper
export function randomID(): string {
    var b = new Uint8Array(66);
    crypto.getRandomValues(b);
    return Buffer.from(b).toString("base64url");
}

export async function DeleteBooking(bookingID: bigint, targetStatus = "cancelled") {
    if (bookingID < 0n) {
        throw new Error("BookingID must not be negative");
    }

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();
    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE id=? FOR UPDATE", [bookingID]);
        if (rows.length == 0) {
            throw new Error("Booking " + bookingID + " does not exist");
        }
        let status: string = rows[0].status

        switch (status) {
            case "active-rejected":
            case "active":
                // In addition, change rejected to active-rejected
                // Do this here to avoid strange errors
                if (targetStatus === "rejected") {
                    targetStatus = "active-rejected"
                }

            case "pending":
            case "active-pending":
            case "booked":
            case "rejected":
                // Success
                await db.execute("UPDATE booking SET `status`=? WHERE id=?", [targetStatus, bookingID]);
                [rows, fields] = await db.execute("SELECT `id` FROM bookeddevices WHERE booking=?");
                let connection = await amqplib.connect(config.AmqpUrl);
                let channel = await connection.createChannel();
                try {
                    await channel.assertQueue("device-freeing", {
                        durable: true
                    });
                    for (let i = 0; i < rows.length; i++) {
                        if (!channel.sendToQueue("device-freeing", Buffer.from(rows[i].id.toString()), { persistent: true })) {
                            throw new Error("amqp queue full");
                        }
                    }
                } catch (err) {
                    // Don't jump out here, since some devices might already be freed
                    console.error("Got error while cancelling booking, devices might not be freed: " + err.toString());
                } finally {
                    channel.close();
                    connection.close();
                }
                break;
            case "cancelled":
                // No need to do anything
                break;
            default:
                throw Error("Unknown status code: " + status);
                break;
        }

        dispatchCallback(bookingID);
        await db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    } finally {
        await db.end();
    }
}
