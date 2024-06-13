import {
    Experiment,
    Timeslot,
    Booking,
    Device
} from "../generated/types"
import {
    postBookingSignature,
    getBookingByIDSignature,
    deleteBookingByIDSignature,
    patchBookingByIDSignature,
    deleteBookingByIDDestroySignature,
    postBookingRequestBodyType,
    getBookingByID200ResponseType
} from "../generated/signatures"

import * as mysql from 'mysql2/promise';
import * as amqplib from 'amqplib';
import dayjs from "dayjs";

import { BelongsToUs, sleep } from "@crosslab/booking-service-common"
import { DeviceBookingRequest } from "@crosslab/service-booking-backend";
import { config } from "../config"

export const postBooking: postBookingSignature = async (request, body) => {

    await request.authorization.check_authorization_or_fail('create', `booking`);

    let connection = await amqplib.connect(config.AmqpUrl);
    let channel = await connection.createChannel();

    // Set default booking type if none was sent
    if (body.Type === undefined) {
        body.Type = "normal";
    }

    await channel.assertQueue("device-booking", {
        durable: true
    });

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    try {
        // Create booking
        let [rows, fields]: [any, any] = await db.execute("INSERT INTO booking (`start`, `end`, `type`, `status`, `user`) VALUES (?,?,?,?,?)", [dayjs(body.Time.Start).toDate(), dayjs(body.Time.End).toDate(), body.Type, "pending", request.authorization.user]);
        let bookingID: bigint = BigInt(rows.insertId);

        for (let i = 0; i < body.Devices.length; i++) {
            await db.execute("INSERT INTO bookeddevices (`booking`, `originaldevice`, `originalposition`) VALUES (?,?,?)", [bookingID, body.Devices[i].ID, i]);
        };
        await db.commit();

        await request.authorization.relate(`user:${request.authorization.user}`, 'owner', `booking:${bookingID}`);

        // Send devices to backend
        for (let i = 0; i < body.Devices.length; i++) {
            let s = JSON.stringify(new DeviceBookingRequest(bookingID, new URL(body.Devices[i].ID), i, dayjs(body.Time.Start), dayjs(body.Time.End)));
            if (!channel.sendToQueue("device-booking", Buffer.from(s), { persistent: true })) {
                throw new Error("amqp queue full");
            }
        }

        let r = new URL(config.OwnURL)

        return {
            status: 200,
            body: {
                BookingID: r.origin + "/booking/" + bookingID.toString(),
            }
        }
    } catch (err) {
        db.rollback();

        return {
            status: 500,
            body: err.toString(),
        }
    } finally {
        await channel.close();
        await sleep(250);
        await connection.close();
        db.end();
    };

    return {
        status: 500,
        body: "BUG: method reached end",
    }
}

export const getBookingByID: getBookingByIDSignature = async (request, parameters) => {
    let requestID: bigint = BigInt(parameters.ID)

    await request.authorization.check_authorization_or_fail('view', `booking:${requestID}`);

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    try {
        let body: getBookingByID200ResponseType["body"] = { Booking: { ID: parameters.ID, Time: { Start: "", End: "" }, Devices: [], Type: "normal", You: false, External: false, Status: "pending", Message: "" }, Locked: false }

        // Read basic information
        let [rows, fields]: [any, any] = await db.execute("SELECT `start`, `end`, `type`, `status`, `user`, `message` FROM booking WHERE id=?", [requestID]);
        if (rows.length == 0) {
            return {
                status: 404,
            };
        }
        body.Booking.Time.Start = dayjs(rows[0].start).toISOString();
        body.Booking.Time.End = dayjs(rows[0].end).toISOString();
        body.Booking.Type = rows[0].type;
        body.Booking.Status = rows[0].status;
        body.Booking.You = rows[0].user == request.authorization.user;
        body.Message = rows[0].message;
        if (body.Booking.Status === "active" || body.Booking.Status === "active-pending" || body.Booking.Status == "active-rejected") {
            body.Locked = true;
        }

        // Read devices
        [rows, fields] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE booking=? ORDER BY `originalposition` ASC", [requestID]);
        for (let i = 0; i < rows.length; i++) {
            body.Booking.Devices.push(rows[i].originaldevice)
        }

        return {
            status: 200,
            body: body
        }
    } catch (err) {
        db.rollback();
        db.end();

        return {
            status: 500,
            body: err.toString(),
        }
    } finally {
        db.commit();
        db.end();
    };

    return {
        status: 500,
        body: "BUG: method reached end",
    }
}

export const deleteBookingByID: deleteBookingByIDSignature = async (request, parameters) => {
    let requestID: bigint = BigInt(parameters.ID);

    await request.authorization.check_authorization_or_fail('delete', `booking:${requestID}`);

    let [code, err] = await commonRemoveBooking(requestID);

    // Typescript seems to have problems to infer body correctly with case 500.
    // Therefore, the solution here is more complicated
    if (code === 500) {
        return {
            status: code,
            body: err ?? "No error",
        }
    }

    // Since we keep the booking in the database, there is no need to unrelate the booking here.
    // Students might check it later if someone else deleted it.

    return {
        status: code,
    }
}

export const patchBookingByID: patchBookingByIDSignature = async (request, parameters, body) => {
    let requestID: bigint = BigInt(parameters.ID);

    await request.authorization.check_authorization_or_fail('edit', `booking:${requestID}`);

    let success: boolean = false;

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status`, `user`,`start`,`end` FROM booking WHERE `id`=? FOR UPDATE", [requestID]);
        if (rows.length === 0) {
            return {
                status: 404,
            }
        }

        // if both are set, the request is invalid
        if (typeof (body.Callback) === "string" && typeof (body.Devices) !== "undefined") {
            return {
                status: 400,
                body: "can not add callback and devices in one request"
            }
        } else if (typeof (body.Callback) === "string") {
            // this is adding a callback
            await db.execute("INSERT INTO bookingcallbacks (`booking`, `url`) VALUES (?,?)", [requestID, body.Callback]);
        } else if (typeof (body.Devices) !== "undefined") {
            let Devices: Device[] = body.Devices as Device[];

            // Set locked to default if not given
            if(body.Locked == undefined){
                body.Locked = false;
            } 

            switch (body.Locked) {
                case true:
                    if (rows[0].status !== "active" && rows[0].status !== "active-rejected" && rows[0].status !== "active-pending") {
                        return {
                            status: 423,
                        }
                    }
                    await db.execute("UPDATE booking SET `status`=? WHERE id=?", ["active-pending", requestID]);
                    break;
                case false:
                    if (rows[0].status !== "booked" && rows[0].status !== "pending") {
                        return {
                            status: 423,
                        }
                    }
                    await db.execute("UPDATE booking SET `status`=? WHERE id=?", ["pending", requestID]);
                    break;
                case undefined:
                    return {
                        status: 500,
                        body: "BUG: 'Locked' is missing",
                    }
                    break;
                default:
                    throw Error("BUG: unknown status body.Locked: " + body.Locked);
                    break;
            }

            let [deviceRows, deviceFields]: [any, any] = await db.execute("SELECT MAX(`originalposition`) as max FROM bookeddevices WHERE `booking`=?", [requestID]);

            let toadd: number = 0;
            if (deviceRows.length != 0) {
                toadd = deviceRows[0].max + 1;
            }

            let start: string = rows[0].start;
            let end: string = rows[0].end;

            let connection = await amqplib.connect(config.AmqpUrl);
            let channel = await connection.createChannel();

            await channel.assertQueue("device-booking", {
                durable: true
            });

            try {
                for (let i = 0; i < Devices.length; i++) {
                    await db.execute("INSERT INTO bookeddevices (`booking`, `originaldevice`, `originalposition`) VALUES (?,?,?)", [requestID, Devices[i].ID, i + toadd]);
                };
                await db.commit();
                db.beginTransaction();

                // Send devices to backend
                for (let i = 0; i < Devices.length; i++) {
                    let s = JSON.stringify(new DeviceBookingRequest(requestID, new URL(Devices[i].ID), i + toadd, dayjs(start), dayjs(end)));
                    if (!channel.sendToQueue("device-booking", Buffer.from(s), { persistent: true })) {
                        throw new Error("amqp queue full");
                    }
                }

            } finally {
                await channel.close();
                await await sleep(250);
                await connection.close();
            }
        } else {
            throw Error("Unknown request type")
        }


        success = true;
    } catch (err) {
        return {
            status: 500,
            body: err.toString(),
        }
    } finally {
        if (success) {
            db.commit();
        } else {
            db.rollback();
        }
        db.end();
    }

    let url = config.OwnURL;
    if (!url.endsWith("/")) {
        url = url + "/";
    }
    url = url + "booking/" + requestID;

    return {
        status: 200,
        body: {
            BookingID: url,
        },
    }
}

export const deleteBookingByIDDestroy: deleteBookingByIDDestroySignature = async (request, parameters) => {
    let requestID: bigint = BigInt(parameters.ID);

    await request.authorization.check_authorization_or_fail('delete', `booking:${requestID}`);

    let [code, err] = await commonRemoveBooking(requestID)
    // Typescript seems to have problems to infer body correctly with case 500.
    // Therefore, the solution here is more complicated
    if (code === 500) {
        return {
            status: code,
            body: err ?? "No error",
        }
    }

    // Since we keep the booking in the database, there is no need to unrelate the booking here.
    // Students might check it later if someone else deleted it.

    return {
        status: code,
    }
}

export default { postBooking, getBookingByID, deleteBookingByID, patchBookingByID, deleteBookingByIDDestroy }

async function commonRemoveBooking(requestID: bigint): Promise<[404 | 200 | 423 | 500, string | null]> {
    let success: boolean = false;

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=? FOR UPDATE", [requestID]);
        if (rows.length === 0) {
            return [404, null];
        }

        switch (rows[0].status) {
            case "pending":
            case "booked":
                // Everything ok
                break;
            case "active-pending":
            case "active":
            case "active-rejected":
                return [423, null];

            case "rejected":
            case "cancelled":
                return [200, null];

            default:
                throw Error("BUG: unknown status " + rows[0].status);
                break;
        }

        // delete booking
        let connection = await amqplib.connect(config.AmqpUrl);
        let channel = await connection.createChannel();

        try {
            await channel.assertQueue("device-freeing", {
                durable: true
            });

            let [devicesRows, devicesFields]: [any, any] = await db.execute("SELECT `id` FROM bookeddevices WHERE `booking`=? FOR UPDATE", [requestID]);
            for (let i = 0; i < devicesRows.length; i++) {
                if (!channel.sendToQueue("device-freeing", Buffer.from(devicesRows[i].id.toString()), { persistent: true })) {
                    throw new Error("amqp queue full");
                }
            }
        } finally {
            await channel.close();
            await sleep(250);
            await connection.close();
        }

        await db.execute("UPDATE booking SET `status`=?, `message`=? WHERE id=?", ["cancelled", "Cancelled by user", requestID]);

        success = true;
    } catch (err) {
        return [500, err.toString()];
    } finally {
        if (success) {
            db.commit();
        } else {
            db.rollback();
        }
        db.end();
    }


    return [200, null];
} 