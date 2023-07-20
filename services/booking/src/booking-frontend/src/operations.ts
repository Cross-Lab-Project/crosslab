import {
    Experiment,
    Timeslot,
    Booking,
    Device
} from "./generated/types"
import {
    postBookingSignature,
    getBookingByIDSignature,
    deleteBookingByIDSignature,
    patchBookingByIDSignature,
    deleteBookingByIDDestroySignature,
    postBookingRequestBodyType,
    getBookingByID200ResponseType
} from "./generated/signatures"

import * as mysql from 'mysql2/promise';
import * as amqplib from 'amqplib';
import dayjs from "dayjs";

import { BelongsToUs } from "@crosslab/booking-service-common"
import { DeviceBookingRequest } from "@crosslab/service-booking-backend";
import { config } from "./config"

export const postBooking: postBookingSignature = async (body, user) => {
    if (user.JWT === undefined) {
        return {
            status: 401,
        }
    }

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
        let [rows, fields]: [any, any] = await db.execute("INSERT INTO booking (`start`, `end`, `type`, `status`, `user`) VALUES (?,?,?,?,?)", [new Date(body.Time.Start), new Date(body.Time.End), body.Time, "pending", user]);
        let bookingID: bigint = BigInt(rows.insertId);

        for (let i = 0; i < body.Devices.length; i++) {
            await db.execute("INSERT INTO bookeddevices (`booking`, `originaldevice`, `originalposition`) VALUES (?,?,?)", [bookingID, body.Devices[i].ID, i]);
        };
        await db.commit();

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
        channel.close();
        connection.close();
        db.end();
    };

    return {
        status: 500,
        body: "BUG: method reached end",
    }
}

export const getBookingByID: getBookingByIDSignature = async (parameters, user) => {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    let requestID: bigint = BigInt(parameters.ID)

    try {
        let body: getBookingByID200ResponseType["body"] = { Booking: { ID: parameters.ID, Time: { Start: "", End: "" }, Devices: [], Type: "normal", You: false, External: false, Status: "pending", Message: "" }, Locked: false }
        // TODO Remove External

        // Read basic information
        let [rows, fields]: [any, any] = await db.execute("SELECT `start`, `end`, `type`, `status`, `user`, `message` FROM booking WHERE id=?", [requestID]);
        if (rows.length == 0) {
            return {
                status: 404,
            };
        }
        body.Booking.Time.Start = rows[0].start;
        body.Booking.Time.End = rows[0].end;
        body.Booking.Type = rows[0].type;
        body.Booking.Status = rows[0].status;
        body.Booking.You = rows[0].user == user;
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

export const deleteBookingByID: deleteBookingByIDSignature = async (parameters, user) => {
    let requestID: bigint = BigInt(parameters.ID);
    let success: boolean = false;

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status`, `user` FROM booking WHERE `id`=? FOR UPDATE", [requestID]);
        if (rows.length === 0) {
            return {
                status: 404,
            }
        }

        switch (rows[0].status) {
            case "pending":
            case "booked":
                // Everything ok
                break;
            case "active-pending":
            case "active":
            case "active-rejected":
                return {
                    status: 423,
                }

            case "rejected":
            case "cancelled":
                return {
                    status: 200,
                }

            default:
                throw Error("BUG: unknown status " + rows[0].status);
                break;
        }

        if (user.JWT === undefined || rows[0].user != user.JWT.username) {
            return {
                status: 401,
            }
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
            channel.close();
            connection.close();
        }

        await db.execute("UPDATE booking SET `status`=?, `message`=? WHERE id=?", ["cancelled", "Cancelled by user", requestID]);

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


    return {
        status: 200,
    }
}

export const patchBookingByID: patchBookingByIDSignature = async (parameters, body, user) => {
    let requestID: bigint = BigInt(parameters.ID);
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

        if (typeof(body.Callback) === "string") {
            // this is adding a callback
            await db.execute("INSERT INTO bookingcallbacks (`booking`, `url`) VALUES (?,?)", [requestID, body.Callback]);
        } else if (typeof(body.Devices) !== undefined) {
            // TODO: Check for scopes 'booking' and 'booking:use'
            let Devices: Device[] = body.Devices as Device[];
            if (user.JWT === undefined || rows[0].user != user.JWT.username) {
                return {
                    status: 401,
                }
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
                channel.close();
                connection.close();
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

export const deleteBookingByIDDestroy: deleteBookingByIDDestroySignature = async (parameters, user) => {
    // add your implementation here
    if(user.JWT !== undefined && user.JWT.scopes.includes("booking:destroy") && BelongsToUs(new URL(user.JWT.url))) {

    } else {
        return {
            status: 401, // TODO: Use 403
        }
    }

    return {
        status: 500,
        body: "TODO: Method not implemented",
    }
}

export default {postBooking, getBookingByID, deleteBookingByID, patchBookingByID, deleteBookingByIDDestroy}