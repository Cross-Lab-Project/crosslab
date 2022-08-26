import {
    Timeslot,
} from "../generated/types"
import {
    postBookingScheduleBodyType,
    postBookingScheduleResponseType,
    postBookingScheduleSignature,
} from "../generated/signatures/booking"

import { APIClient } from "@cross-lab-project/api-client"
import { getDevicesByDeviceIdResponseType } from "@cross-lab-project/api-client/dist/generated/device/signatures/devices"
import * as mysql from 'mysql2/promise';
import { cloneDeep, map } from "lodash"
import dayjs from 'dayjs';


import { config } from "../../../common/config"
import { BelongsToUs, GetIDFromURL } from "../../../common/auth"
import { timetableAnd, timetableNot } from "../timetable"

// TODO: Missing availability since it is not yet well defined
export const postBookingSchedule: postBookingScheduleSignature = async (body, user) => {
    let api: APIClient = new APIClient(config.OwnURL);

    const laterReq = new Map<string, [number[], number[], postBookingScheduleBodyType]>(); // Device in request, device list, request

    let timetables: Timeslot[][][] = []; // Booked: Device in request, device list, actual reserved time slots
    let availability: Promise<getDevicesByDeviceIdResponseType>[][] = []; // Device in request, device list
    let realDevices: string[][] = []; // Device in request, device list


    // Collect all timetables
    for (let device = 0; device < body.Experiment.Devices.length; device++) {
        // Resolve device
        realDevices.push([]);
        timetables.push([]);
        availability.push([]);
        let r = await api.getDevicesByDeviceId({ device_id: GetIDFromURL(body.Experiment.Devices[device].ID), flat_group: true }, body.Experiment.Devices[device].ID);
        if (r.status !== 200) {
            // TODO: Remove later if errors are well specified
            //if (r.status === 503) {
            //    return {
            //        status: 503
            //    };
            //};
            if (r.status === 404) {
                return { status: 404, body: [body.Experiment.Devices[device].ID] };
            }
            //@ts-ignore: fallback which only works when API can handle errors - still keep it (defensive programming)
            return { status: 500, body: "Device request " + body.Experiment.Devices[device].ID + " returned status code" + r.status };
        };

        if (r.body.url != body.Experiment.Devices[device].ID) {
            return { status: 500, body: "API returned bad result (requested device" + body.Experiment.Devices[device].ID + ", got " + r.body.url + ")" };
        }

        if (r.body.type === "device") {
            realDevices[device].push(r.body.url)
        } else {
            // group
            for (let i = 0; i < r.body.devices.length; i++) {
                realDevices[device].push(r.body.devices[i].url);
            }
        }

        // Process devices
        for (let i = 0; i < realDevices[device].length; i++) {
            timetables[device].push([]);

            // Get timetable
            let d: URL = new URL(realDevices[device][i]);
            let t: Timeslot[] = [];
            if (!BelongsToUs(d)) {
                // This is not our device
                if (body.onlyOwn) {
                    // This device should not be in the request, jump out
                    return {
                        status: 400
                    };
                }
                if (laterReq.get(d.origin) === undefined) {
                    let req: postBookingScheduleBodyType = cloneDeep(body);
                    req.onlyOwn = true;
                    req.Experiment.Devices = [];
                    req.Combined = false;

                    laterReq.set(d.origin, [[], [], req]);
                }
                let lr = laterReq.get(d.origin);
                lr[0].push(device);
                lr[1].push(i);
                lr[2].Experiment.Devices.push({ ID: realDevices[device][i] });
                laterReq.set(d.origin, lr);
                t = [];
            } else {
                // This is our device
                t = await getTimetables(d, body.Time.Start, body.Time.End);
            }

            timetables[device][i] = t;

            // Get availability
            availability[device].push(api.getDevicesByDeviceId({ device_id: GetIDFromURL(realDevices[device][i]) }, realDevices[device][i]));
        }
    };

    const lrpromise = new Map<string, [number[], number[], postBookingScheduleBodyType, Promise<postBookingScheduleResponseType>]>(); // Device in request, device list, request
    for (let k of laterReq.keys()) {
        let lr = laterReq.get(k);
        let req = api.postBookingSchedule(lr[2], k + "/booking/schedule");

        lrpromise.set(k, [lr[0], lr[1], lr[2], req]);
    }

    for (let k of laterReq.keys()) {
        let lr = lrpromise.get(k);
        let req = await lr[3];
        if (req.status != 200) {
            if (req.status == 503) {
                return { status: 503 };
            }
            if (req.status == 404) {
                return { status: 404, body: req.body };
            }
            return { status: 500, body: "Institution " + k + " returned status code" + req.status };
        }
        if (req.body.length != lr[2].Experiment.Devices.length) {
            return { status: 500, body: "Institution " + k + " returned bad result (requested " + lr[2].Experiment.Devices.length + " devices, got " + req.body.length + ")" };
        }
        for (let i = 0; i < req.body.length; i++) {
            if (req.body[i].Device != lr[2].Experiment.Devices[i].ID) {
                return { status: 500, body: "Institution " + k + " returned bad result (requested device" + lr[2].Experiment.Devices[i].ID + ", got " + req.body[i].Device + ")" };
            }
            timetables[lr[i][0]][lr[i][1]] = req.body[i].Booked;
        }
    }

    let response: Array<{
        Device: string
        Booked: Array<Timeslot>
        Free: Array<Timeslot>
    }> = [];

    // Build Response
    for (let device = 0; device < body.Experiment.Devices.length; device++) {
        // Get free times
        let free: Timeslot[][] = []
        for (let i = 0; i < timetables[device].length; i++) {
            // Add availability
            let a = await availability[device][i];
            if (a.status !== 200) {
                // TODO: Remove later if errors are well specified
                //if (r.status === 503) {
                //    return {
                //        status: 503
                //    };
                //};
                if (a.status === 404) {
                    return { status: 404, body: [realDevices[device][i]] };
                }
                //@ts-ignore: fallback which only works when API can handle errors - still keep it (defensive programming)
                return { status: 500, body: "Device request " + realDevices[device][i] + " returned status code" + a.status };
            };
            if (a.body.type == "group") {
                return { status: 500, body: "Device request " + realDevices[device][i] + " is group but shouldn't" };
            }
            let available: Timeslot[] = timetableAnd(a.body.announcedAvailability.map((e) => { return { Start: e.start, End: e.end } }));
            let notAvailable: Timeslot[] = timetableNot(available, dayjs(body.Time.Start), dayjs(body.Time.End))
            let notFree: Timeslot[] = timetableAnd(notAvailable, timetables[device][i]);

            // Now push free
            free.push(timetableNot(notFree, dayjs(body.Time.Start), dayjs(body.Time.End)));
        }
        let freeCombined = timetableAnd(...free);
        response.push({
            Device: body.Experiment.Devices[device].ID,
            Booked: timetableNot(freeCombined, dayjs(body.Time.Start), dayjs(body.Time.End)),
            Free: freeCombined,
        });
    }

    // Combine if wished
    if (body.Combined) {
        let free: Timeslot[][] = []
        for (let i = 0; i < response.length; i++) {
            free.push(timetableNot(response[i].Booked, dayjs(body.Time.Start), dayjs(body.Time.End)));
        }

        let freeCombined = timetableAnd(...free);

        response = [{ Device: "<combined>", Booked: timetableNot(freeCombined, dayjs(body.Time.Start), dayjs(body.Time.End)), Free: freeCombined }]
    }

    return { status: 200, body: response };
}

export async function getTimetables(device: URL, start: string, end: string): Promise<Timeslot[]> {
    let r: Timeslot[] = []
    let db = await mysql.createConnection(config.ReservationDSN);
    try {
        await db.connect();

        let [rows, fields]: [any, any] = await db.execute("SELECT start, end FROM reservation WHERE `device`=? AND ((`start` < ? AND `end` > ?) OR (`start` < ? AND `end` > ?) OR (`start` > ? AND `end` < ?) OR (`start` < ? AND `end` > ?)) ORDER BY `start` ASC", [device.toString(), dayjs(start).toDate(), dayjs(start).toDate(), dayjs(end).toDate(), dayjs(end).toDate(), dayjs(start).toDate(), dayjs(end).toDate(), dayjs(start).toDate(), dayjs(end).toDate()]);

        for (let i = 0; i < rows.length; i++) {
            r.push({ Start: dayjs(rows[i].start).toISOString(), End: dayjs(rows[i].end).toISOString() });
        }
    } finally {
        db.end();
    }

    // flatten r
    r = timetableNot(r, dayjs(start), dayjs(end));
    r = timetableNot(r, dayjs(start), dayjs(end));
    return r;
}
