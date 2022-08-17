import {
    Experiment,
    Timeslot,
    Booking,
    Device
} from "../generated/types"
import {
    postBookingScheduleBodyType,
    postBookingScheduleSignature,
} from "../generated/signatures/booking"

import { APIClient } from "@cross-lab-project/api-client"
import * as mysql from 'mysql2/promise';
import { cloneDeep, times } from "lodash"

import { config } from "../common/config"
import { BelongsToUs } from "../common/auth"
import { timetableAnd, timetableNot, timetableSortInPlace } from "./timetable"

export const postBookingSchedule: postBookingScheduleSignature = async (body, user) => {
    let api: APIClient = new APIClient(config.OwnURL);

    const laterReq = new Map<string, [number[], number[],  postBookingScheduleBodyType]>(); // Device in request, device list, request

    let timetables: Timeslot[][][] = []; // Device in request, device list, actual reserved time slots
    let availability: Timeslot[][][] = []; // Device in request, device list, actual reserved time slots

    // Collect all timetables
    for(let device = 0; device < body.Experiment.Devices.length; device++) {
        // Resolve device
        timetables.push([])
        let r = await api.getDevices(body.Experiment.Devices[device].ID);
        if(r.status !== 200) {
            if(r.status === 503) {
                return {
                    status: 503
                };
            };
            return { status: 500, body: "Device request " + body.Experiment.Devices[device].ID + " returned status code" + r.status };
        };
        let realDevices = r.body;

        // Process devices
        for (let i = 0; i < realDevices.length; i++) {
            // We can not assume a name
            timetables[device].push([]);
            if(realDevices[i].name === undefined) {
                continue
            }
            let d: URL = new URL(realDevices[i].url);
            let t: Timeslot[] = [];
            if (!BelongsToUs(d)) {
                // This is not our device
                if (body.onlyOwn) {
                    // This device should not be in the request, jump out
                    return {
                        status: 400
                    };
                }
                if (laterReq[d.origin] === undefined) {
                    let req: postBookingScheduleBodyType = cloneDeep(body);
                    req.onlyOwn = true;
                    req.Experiment.Devices = [];
                    req.Combined = false;
    
                    laterReq.set(d.origin, [[], [], req]);
                }
                let lr = laterReq.get(d.origin);
                lr[0].push(device);
                lr[1].push(i);
                lr[2].Experiment.Devices.push({ID: realDevices[i].url});
                laterReq.set(d.origin, lr);
                t = [];
            } else {
                // This is our device
                t = await getTimetables(d, body.Time.Start, body.Time.End);
            }

            timetables[device][i] = t ;
        }
    };

    for (let k of laterReq.keys()) {
        console.log("+++" + k)
        let lr = laterReq.get(k);
        console.log(lr[2], lr[2].Experiment.Devices[0]);
        console.log("Requested "+k +"/booking/schedule");
        let req = await api.postBookingSchedule(lr[2], k +"/booking/schedule");
        console.log(req);
        if (req.status != 200) {
            return { status: 500, body: "Institution " + k + " returned status code" + req.status };
        }
        if (req.body.length != lr[2].Experiment.Devices.length) {
            return { status: 500, body: "Institution " + k + " returned bad result (requested " + lr[2].Experiment.Devices.length + " devices, got " + req.body.length + ")" };
        }
        for (let i = 0; i < req.body.length; i++) {
            if (req.body[i].Device != lr[2].Experiment.Devices[i].ID) {
                return { status: 500, body: "Institution " + k + " returned bad result (requested device" + lr[2].Experiment.Devices[i].ID + ", got " + req.body[i].Device + ")" };
            }
            timetables[lr[0][i]][lr[1][i]] = req.body[i].Booked;
        }
    }

    let response: Array<{
        Device: string
        Booked: Array<Timeslot>
        Free: Array<Timeslot>
    }> = [];

    // Build Response
    for(let device = 0; device < body.Experiment.Devices.length; device++) {
        let free: Timeslot[][] = []
        for(let i=0; i < timetables[device].length; i++) {
            free.push(timetableNot(timetables[device][i], new Date(body.Time.Start), new Date(body.Time.End)));
        }
        let freeCombined = timetableAnd(...free);
        response.push({
            Device: body.Experiment.Devices[device].ID,
            Booked: timetableNot(freeCombined, new Date(body.Time.Start), new Date(body.Time.End)),
            Free: freeCombined,
        });
    }

    // Combine if wished
    if (body.Combined) {
        let free: Timeslot[][] = []
        for (let i = 0; i < response.length; i++) {
            free.push(timetableNot(response[i].Booked, new Date(body.Time.Start), new Date(body.Time.End)));
        }

        let freeCombined = timetableAnd(...free);

        response = [{ Device: "<combined>", Booked: timetableNot(freeCombined, new Date(body.Time.Start), new Date(body.Time.End)), Free: freeCombined }]
    }

    return { status: 200, body: response };
}

export async function getTimetables(device: URL, start: string, end: string): Promise<Timeslot[]> {
    let r: Timeslot[] = []
    let db = await mysql.createConnection(config.ReservationDSN);
    try {
        await db.connect();

        let [rows, fields]: [any, any] = await db.execute("SELECT start, end FROM reservation WHERE `device`=? AND ((`start` < ? AND `end` > ?) OR (`start` < ? AND `end` > ?) OR (`start` > ? AND `end` < ?) OR (`start` < ? AND `end` > ?)) ORDER BY `start` ASC", [device.toString(), new Date(start), new Date(start), new Date(end), new Date(end), new Date(start), new Date(end), new Date(start), new Date(end)]);
        for (let i = 0; i < rows.length; i++) {
            r.push({ Start: rows[i].start, End: rows[i].end });
        }
    } catch (e) {
        db.end();
        throw e;
    }
    db.end();
    return r;
}

//getTimetables(new URL("http://localhost/device/superDevice"), "2022-06-24", "2022-06-28").then((t) => { console.log(t) });