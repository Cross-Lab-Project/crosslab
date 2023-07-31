import {
    putBookingByIDLockSignature,
    deleteBookingByIDLockSignature,
    postBookingCallbackByIDSignature,
    putBookingByIDLock200ResponseType
} from "./generated/signatures"

import * as mysql from 'mysql2/promise';

import { config } from './config';
import { dispatchCallback, handleCallback } from "./internal";

export const putBookingByIDLock: putBookingByIDLockSignature = async (parameters, user) => {
    let bookingID: bigint = BigInt(parameters.ID);

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();
    await db.beginTransaction();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `start`,`end`,`type`,`status`, `user`, `message` FROM booking WHERE `id`=? FOR UPDATE", [bookingID])
        if (rows.length === 0) {
            return {
                status: 404,
            }
        }

        switch (rows[0].status) {
            case "active-rejected":
            case "active":
            case "active-pending":
                // Nothing to do at the moment
                break;

            case "pending":
            case "rejected":
            case "cancelled":
                db.rollback();
                return {
                    status: 412,
                }
                break;

            case "booked":
                await db.execute("UPDATE booking SET `status`='active' WHERE `id`=?", [bookingID]);
                break;

            default:
                throw Error("BUG: Unknown booking status " + rows[0].status);
        }

        // Everything is done - commit changes

        let bookingURI: string = config.OwnURL
        if (!bookingURI.endsWith("/")) {
            bookingURI = bookingURI + "/";
        }
        bookingURI = bookingURI + bookingID.toString();

        try {
            // Add all devices to response
            let deviceList: putBookingByIDLock200ResponseType["body"] = []


            let [deviceRows, deviceFields]: [any, any] = await db.execute("SELECT `originaldevice`, `bookeddevice` FROM bookeddevices WHERE booking=? ORDER BY `originalposition` ASC", [bookingID]);
            for (let i = 0; i < deviceRows.length; i++) {
                deviceList.push({Requested: deviceRows[i].originaldevice, Selected: deviceRows[i].bookeddevice})
            }

            return {
                status: 200,
                body: deviceList
            }
        } catch (err) {
            throw err;
        } finally {
            dispatchCallback(bookingID);
            db.commit();
        }
    } catch (err) {
        db.rollback();
        throw err;
    } finally {
        db.end();
    }
}

export const deleteBookingByIDLock: deleteBookingByIDLockSignature = async (parameters, user) => {
    let bookingID: bigint = BigInt(parameters.ID);

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=? FOR UPDATE", [bookingID])
        if (rows.length === 0) {
            return {
                status: 404,
            }
        }

        switch (rows[0].status) {
            case "active-rejected":
            case "active":
            case "active-pending":
                await db.execute("UPDATE booking SET `status`='booked' WHERE `id`=?", [bookingID]);
                dispatchCallback(bookingID);
                break;

            case "pending":
            case "rejected":
            case "cancelled":
                db.rollback();
                return {
                    status: 412,
                }
                break;

            case "booked":
                break;

            default:
                throw Error("BUG: Unknown booking status " + rows[0].status);
        }

        db.commit();
        return {
            status: 200,
        }
    } catch (err) {
        db.rollback();
        throw err;

    } finally {
        db.end();
    }
}

export const postBookingCallbackByID: postBookingCallbackByIDSignature = async (parameters, user) => {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
        let [rows, fields]: [any, any] = await db.execute("SELECT `type`, `targetbooking`, `parameters` FROM callback WHERE `id`=?", [parameters.ID]);
        if (rows.length === 0) {
            return {
                status: 404,
            }
        }
        await handleCallback(rows[0].type, rows[0].targetbooking, JSON.parse(rows[0].parameters));
        return {
            status: 200,
        }
    } finally {
        db.end();
    }
}

export default {putBookingByIDLock, deleteBookingByIDLock, postBookingCallbackByID}