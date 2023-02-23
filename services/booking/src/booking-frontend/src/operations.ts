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

import { config } from "./../../common/config"
import { BelongsToUs } from "./../../common/auth"
import { DeviceBookingRequest } from "./../../booking-backend/src/messageDefinition";

export const postBooking: postBookingSignature = async (body, user) => {
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

        for (let i = 0; i < body.Experiment.Devices.length; i++) {
            await db.execute("INSERT INTO bookeddevices (`booking`, `originaldevice`, `originalposition`) VALUES (?,?,?)", [bookingID, body.Experiment.Devices[i].ID, i]);
        };
        await db.commit();

        // Send devices to backend
        for (let i = 0; i < body.Experiment.Devices.length; i++) {
            let s = JSON.stringify(new DeviceBookingRequest(bookingID, new URL(body.Experiment.Devices[i].ID), i, dayjs(body.Time.Start), dayjs(body.Time.End)));
            if(!channel.sendToQueue("device-booking", Buffer.from(s), {persistent: true})) {
                throw new Error("amqp queue full");
            }
        }
        
        let r = new URL(config.OwnURL)

        return {
            status: 200,
            body: {
                BookingID: r.origin + "/booking/manage/" + bookingID.toString(),
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
        let body:getBookingByID200ResponseType["body"] = {Booking: {ID: parameters.ID, Time: {Start: "", End: ""}, Devices: [], Type: "normal", You: false, External: false, Status: "pending", Message: ""}, Locked: false}
        // TODO Remove External

        // Read basic information
        let [rows, fields]: [any, any] = await db.execute("SELECT `start`, `end`, `type`, `status`, `user`, `message` FROM booking WHERE id=?", [requestID]);
        if(rows.length == 0) {
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

        // Read devices
        [rows, fields] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE booking=? ORDER BY `originalposition` ASC", [requestID]);
        for(let i = 0; i < rows.length; i++) {
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
    // add your implementation here
    return {
        status: 200,
    }
}

export const patchBookingByID: patchBookingByIDSignature = async (parameters, body, user) => {
    // add your implementation here
    return {
        status: 200,
        body: null,
    }
}

export const deleteBookingByIDDestroy: deleteBookingByIDDestroySignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 200
    }
}

