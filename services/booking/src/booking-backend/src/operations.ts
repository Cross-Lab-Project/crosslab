import {
    Booking,
    Timeslot
} from "./generated/types"
import {
    putBookingByIDLockSignature,
    deleteBookingByIDLockSignature,
    postBookingCallbackByIDSignature,
    putBookingByIDLock200ResponseType
} from "./generated/signatures"

import * as mysql from 'mysql2/promise';

import { config } from '../../common/config';
import { calculateToken, dispatchCallback, handleCallback } from "./internal";
import dayjs from "dayjs";

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
                dispatchCallback(bookingID);
                break;

            default:
                throw Error("BUG: Unknown booking status " + rows[0].status);
        }

        // Everything is ok, return tokens
        let tokens: { Device: string, Token: string }[] = await calculateToken(bookingID, db);

        // Everything is done - commit changes

        let bookingURI: string = config.OwnURL
        if (!bookingURI.endsWith("/")) {
            bookingURI = bookingURI + "/";
        }
        bookingURI = bookingURI + bookingID.toString();

        try {
            let bookingBody: putBookingByIDLock200ResponseType["body"]["Booking"] = { ID: bookingURI, Time: { Start: "", End: "" }, Devices: [], Type: "normal", You: false, External: false, Status: "active", Message: "" }
            bookingBody.Time.Start = rows[0].start;
            bookingBody.Time.End = rows[0].end;
            bookingBody.Type = rows[0].type;
            bookingBody.Status = rows[0].status;
            bookingBody.You = rows[0].user == user;
            bookingBody.Message = rows[0].message;

            let [deviceRows, deviceFields]: [any, any] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE booking=? ORDER BY `originalposition` ASC", [bookingID]);
            for (let i = 0; i < deviceRows.length; i++) {
                bookingBody.Devices.push(deviceRows[i].originaldevice)
            }

            return {
                status: 200,
                body: {
                    Booking: bookingBody,
                    Time: {
                        Start: dayjs(rows[0].start).toISOString(),
                        End: dayjs(rows[0].end).toISOString(),
                    },
                    Tokens: tokens,
                }
            }
        } catch (err) {
            throw err;
        } finally {
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
