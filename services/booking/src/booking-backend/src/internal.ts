import * as crypto from 'crypto';
import { APIClient, BookingServiceSignatures } from "@cross-lab-project/api-client";
import lodash from "lodash"
import * as amqplib from "amqplib"
import * as mysql from 'mysql2/promise';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { DeviceBookingRequest } from './messageDefinition';
import { BelongsToUs, sleep } from '@crosslab/booking-service-common';
import { ReservationAnswer, ReservationMessage, ReservationRequest } from '@crosslab/service-device-reservation';
import { config } from './config';



export enum callbackType {
    DeviceUpdate,
    BookingUpdate
}

// Handle received callback
export async function handleCallback(type: callbackType, targetBooking: bigint, parameters: any) {
    let api: APIClient = new APIClient(config.OwnURL, config.API_TOKEN);

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        switch (type) {
            // Both cases share a vast amount of code. So combine them here and differentiate later
            case callbackType.DeviceUpdate:
            case callbackType.BookingUpdate:
                try {
                    await db.beginTransaction();
                    // Lock booking
                    let [bookingRow, bookingFields]: [any, any] = await db.execute("SELECT `start`,`end`,`type`,`status`,`user` FROM booking WHERE `id`=? FOR UPDATE", [targetBooking]);
                    if (bookingRow.length == 0) {
                        throw Error("Booking (" + targetBooking + ") not known");
                    }
                    let [start, end]: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs(bookingRow[0].start), dayjs(bookingRow[0].end)];

                    // Get device
                    let [rows, fields]: [any, any] = await db.execute("SELECT `bookeddevice`, `originaldevice`, `remotereference`, `local`, `id` FROM bookeddevices WHERE `booking`=? AND `originalposition`=? FOR UPDATE", [targetBooking, parameters.Position]);

                    if (rows.length == 0) {
                        throw Error("Booking, Position (" + targetBooking + "," + parameters.Position + ") not known");
                    }
                    let bookedDeviceId: bigint = BigInt(rows[0].id);
                    let originalDevice: string = rows[0].originaldevice;

                    // Check availability
                    // Here, we need to differentiate 
                    let available: boolean = true;

                    switch (type) {
                        // Both cases share a vast amount of code. So combine them here and differentiate later
                        case callbackType.DeviceUpdate:
                            if (!rows[0].local) {
                                throw Error("Booking must be local for device update");
                            }

                            let device = await api.getDevice(rows[0].bookeddevice);
                            if (device.type == "group") {
                                throw Error("Booked device " + rows[0].bookeddevice + " is group");
                            }
                            // If not available: request new device
                            if (device.type == "device") { // Other devices are always available
                                available = device.connected;

                                // Check availability if needed
                                if (available) {
                                    available = false;
                                    for (let i = 0; i < device.announcedAvailability.length; i++) {
                                        if (dayjs(device.announcedAvailability[i].start).isSameOrBefore(start) && dayjs(device.announcedAvailability[i].end).isSameOrAfter(end)) {
                                            available = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            break;

                        case callbackType.BookingUpdate:
                            if (rows[0].local) {
                                throw Error("Booking must be remote for device update");
                            }

                            let getReturn = await api.getBooking(rows[0].remotereference);
                            if (getReturn.Booking.Status == "cancelled" || getReturn.Booking.Status == "rejected") {
                                available = false;
                            }
                            break;
                        default:
                            throw ("BUG: Impossible callback type " + type + " in inner switch");
                    }

                    // Act: Delete reservation and update booking
                    if (!available) {
                        await db.commit(); // Free rows for device freeing
                        await freeDevice(bookedDeviceId);

                        // Now ask for new device
                        let connection: amqplib.Connection
                        let channel: amqplib.Channel
                        try {
                            connection = await amqplib.connect(config.AmqpUrl);
                            channel = await connection.createChannel();

                            // Request new device
                            await channel.assertQueue("device-booking", {
                                durable: true
                            });
                            let s = JSON.stringify(new DeviceBookingRequest(targetBooking, new URL(originalDevice), parameters.Position, start, end));
                            if (!channel.sendToQueue("device-booking", Buffer.from(s), { persistent: true })) {
                                throw new Error("amqp queue full");
                            }
                        } finally {
                            await channel.close();
                            await sleep(250);
                            await connection.close();
                        }
                    }

                    // In the end - commit
                    await db.commit();
                } catch (err) {
                    await db.rollback();
                    throw err;
                }

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

        let api: APIClient = new APIClient(config.OwnURL, config.API_TOKEN);
        await api.updateDevice(device.toString(), undefined, { changedUrl: config.OwnURL + "/booking_callback/" + id });
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

        let api: APIClient = new APIClient(config.OwnURL, config.API_TOKEN);
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

        [rows, fields] = await db.execute("SELECT count(*) AS n FROM bookeddevices WHERE booking=? AND bookeddevice IS NULL", [bookingID]);

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
    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE id=?", [r.BookingID]);
        if (rows.length == 0) {
            throw new Error("Booking " + r.BookingID + " does not exist");
        }

        if (rows[0].status === "rejected" || rows[0].status === "cancelled" || rows[0].status === "active-rejected") {
            // Get early out - this booking will not success anyway
            return;
        }

        let api: APIClient = new APIClient(config.OwnURL, config.API_TOKEN);

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
            // Sort devices
            // This has two goals
            // * Randomise the order of devices, so not everyone wants to book the same device first
            // * Prefer own devices over remote devices
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
            let schedule: BookingServiceSignatures.ScheduleSuccessResponse["body"];
            try {
                schedule = await api.schedule({ Experiment: { Devices: [{ ID: possibleDevices[i] }] }, Time: { Start: r.Start.toISOString(), End: r.End.toISOString() }, Combined: false, onlyOwn: true });
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
                    url = url + "booking/" + r.BookingID
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
                    if (data.Type === ReservationRequest.New && data.Successful && data.Device.toString() === possibleDevices[i] && data.Start.isSame(r.Start) && data.End.isSame(r.End)) {
                        await db.execute("UPDATE bookeddevices SET `bookeddevice`=?, `reservation`=?, `local`=? WHERE `booking`=? AND `originalposition`=?", [data.Device.toString(), data.ReservationID.toString(), true, r.BookingID, r.Position])
                        addDeviceCallback(data.Device, r.BookingID, { "Position": r.Position });
                        await reservationCheckStatus(r.BookingID);
                        return;
                    }
                    continue;
                } catch (err) {
                    console.log(err);
                    continue;
                } finally {
                    if (channel !== undefined) {
                        await channel.close();
                        await sleep(250);
                    }
                    if (connection !== undefined) {
                        await connection.close();
                    }
                }
            } else {
                let institution = new URL(possibleDevices[i]).origin;
                let putReturn = await api.newBooking({ Devices: [{ ID: possibleDevices[i] }], Time: { Start: r.Start.toISOString(), End: r.End.toISOString() }, BookingReference: r.BookingID.toString() }, { url: institution + "/booking/manage" });

                let ID = putReturn.ReservationID;

                let counter = -1;
                while (true) {
                    counter++;
                    if (counter >= 50) {
                        continue nextDevice;
                    }
                    await sleep(1000);

                    let getReturn = await api.getBooking(institution + "/booking/" + ID);

                    switch (getReturn.Booking.Status) {
                        case "pending":
                        case "active-pending":
                            // Still waiting
                            continue;
                            break;
                        case "booked":
                        case "active":
                            // Success
                            await db.execute("UPDATE bookeddevices SET `bookeddevice`=?, `remotereference`=?, `local`=? WHERE `booking`=? AND `originalposition`=?", [possibleDevices[i], getReturn.Booking.ID, false, r.BookingID, r.Position])
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
        DeleteBooking(r.BookingID, "rejected", "Can not book " + r.Device.toString());
    } finally {
        await db.end();
    }
}

export async function freeDevice(internalreference: bigint) {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();
    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `id`, `booking`, `originaldevice`, `originalposition`, `bookeddevice`, `remotereference`, `local`, `reservation` FROM bookeddevices WHERE `id`=? FOR UPDATE", [internalreference]);
        if (rows.length == 0) {
            throw Error("Bookeddevice " + internalreference + " not found");
        }

        let [bookingRow, bookingFields]: [any, any] = await db.execute("SELECT * FROM booking WHERE `id`=? FOR UPDATE", [rows[0].booking]); // Lock booking
        if (bookingRow.length == 0) {
            throw Error("Booking " + rows[0].booking + " not found");
        }

        // Free now
        if (rows[0].local) {
            // This is a local device
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

                let m = new ReservationMessage(ReservationRequest.Delete, returnChannel);
                m.ReservationID = BigInt(rows[0].reservation);

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
                        throw Error("Did not receive Answer from device-reservation");
                    }
                    await sleep(100)
                }

                let a: amqplib.GetMessage = aUnknown as amqplib.GetMessage;
                let data = ReservationAnswer.fromString(a.content.toString());
                if (data.Type !== ReservationRequest.Delete || !data.Successful) {
                    throw Error("Reservation deletion was not successful");
                }
            } finally {
                if (channel !== undefined) {
                    if (queueCreated) {
                        await channel.deleteQueue(returnChannel);
                    }
                    await channel.close();
                    await sleep(250);
                }
                if (connection !== undefined) {
                    await connection.close();
                }
            }
        } else {
            // This is a remote devices
            let api: APIClient = new APIClient(config.OwnURL, config.API_TOKEN);
            await api.deleteBooking(rows[0].remotereference);
        }

        // Delete form DB
        switch (bookingRow[0].status) {
            case "active-rejected":
            case "active":
                await db.execute("UPDATE booking SET `status`='active-pending' WHERE `id`=?", [rows[0].booking]);
                break;
            case "active-pending":
            case "pending":
                // Do nothing since it is still pending
                break;
            case "booked":
                await db.execute("UPDATE booking SET `status`='pending' WHERE `id`=?", [rows[0].booking]);
                break;
            case "rejected":
            case "cancelled":
                // Do nothing, this is the correct status
                break;
            default:
                throw Error("BUG: Unknown booking status " + bookingRow[0].status);
        }
        // Delete from DB
        await db.execute("UPDATE bookeddevices SET `bookeddevice`=?, `remotereference`=?, `local`=? WHERE `id`=?", [null, null, null, internalreference]);

        // Commit
        await db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    } finally {
        db.end();
    }
}

// Helper
export function randomID(): string {
    var b = new Uint8Array(66);
    crypto.getRandomValues(b);
    return Buffer.from(b).toString("base64url");
}

export async function DeleteBooking(bookingID: bigint, targetStatus = "cancelled", message = "") {
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
                [rows, fields] = await db.execute("SELECT `id` FROM bookeddevices WHERE booking=?", [bookingID]);
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
                    console.log("Got error while cancelling booking, devices might not be freed: " + err.toString());
                } finally {
                    await channel.close();
                    await sleep(250);
                    await connection.close();
                }
                break;
            case "cancelled":
                // No need to do anything
                break;
            default:
                throw Error("Unknown status code: " + status);
                break;
        }

        if (message !== undefined && message !== "") {
            let [rows, fields] = await db.execute("SELECT `message` FROM booking WHERE id=?", [bookingID]);
            let targetMessage: string = "";
            if (rows[0].message === undefined || rows[0].message === null|| rows[0].message == "" ) {
                targetMessage = message;
            } else {
                targetMessage = rows[0].message + "\n" + message;
            }
            await db.execute("UPDATE booking SET `message`=? WHERE id=?", [targetMessage, bookingID]);
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
