import {
    Experiment,
    Timeslot,
    Booking,
    Device
} from "../generated/types"
import {
    putBookingManageSignature,
    getBookingManageByIDSignature,
    deleteBookingManageByIDSignature,
    patchBookingManageByIDSignature,
    deleteBookingDestroyByIDSignature,
    putBookingManageBodyType
} from "../generated/signatures/booking"

import * as mysql from 'mysql2/promise';
import * as amqplib from 'amqplib';

import { config } from "../common/config"
import { BelongsToUs } from "../common/auth"
import { DeviceBookingRequest } from "./messageDefinition";

export const putBookingManage: putBookingManageSignature = async (body, user) => {
    let connection = await amqplib.connect(config.AmqpUrl);
    let channel = await connection.createChannel();

    // Set default booking type if none was sent
    if (body.Type === undefined) {
        body.Type = "normal";
    }

    channel.assertQueue("device-booking", {
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
            await db.execute("INSERT INTO (`booking`, `originaldevice`, `originalposition`) VALUES (?,?,?)", [bookingID, body.Experiment.Devices[i].ID, i]);
        };
        await db.commit();

        // Send devices to backend
        for (let i = 0; i < body.Experiment.Devices.length; i++) {
            let s = JSON.stringify(new DeviceBookingRequest(bookingID, new URL(body.Experiment.Devices[i].ID), i));
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

export const getBookingManageByID: getBookingManageByIDSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 200,
        body: null,
    }
}

export const deleteBookingManageByID: deleteBookingManageByIDSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 200,
    }
}

export const patchBookingManageByID: patchBookingManageByIDSignature = async (parameters, body, user) => {
    // add your implementation here
    return {
        status: 200,
        body: null,
    }
}

export const deleteBookingDestroyByID: deleteBookingDestroyByIDSignature = async (parameters, user) => {
    // add your implementation here
    return {
        status: 200
    }
}
