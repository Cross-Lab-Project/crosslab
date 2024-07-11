import {
  DeviceServiceTypes,
  UnsuccessfulRequestError,
} from '@cross-lab-project/api-client';
import { BelongsToUs, clients } from '@crosslab/booking-service-common';
import dayjs from 'dayjs';
import lodash from 'lodash';
import * as mysql from 'mysql2/promise';

import { config } from '../config.js';
import {
  postScheduleRequestBodyType,
  postScheduleSignature,
  postScheduleSuccessResponseType,
} from '../generated/signatures.js';
import { Timeslot } from '../generated/types.js';
import { timetableAnd, timetableNot } from '../timetable.js';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// TODO: Missing availability since it is not yet well defined
export const postSchedule: postScheduleSignature = async (request, body) => {
  await request.authorization.check_authorization_or_fail('create', `booking`);

  const laterReq = new Map<string, [number[], number[], postScheduleRequestBodyType]>(); // Device in request, device list, request

  let timetables: Timeslot[][][] = []; // Booked: Device in request, device list, actual reserved time slots
  let availability: Promise<
    | DeviceServiceTypes.ConcreteDevice
    | DeviceServiceTypes.DeviceGroup
    | DeviceServiceTypes.InstantiableCloudDevice
    | DeviceServiceTypes.InstantiableBrowserDevice
  >[][] = []; // Device in request, device list
  let realDevices: string[][] = []; // Device in request, device list

  if (!body) body = { Experiment: { Devices: [] }, Time: { Start: '', End: '' } };

  // Collect all timetables
  for (let device = 0; device < body.Experiment.Devices.length; device++) {
    // Resolve device
    realDevices.push([]);
    timetables.push([]);
    availability.push([]);
    let r:
      | DeviceServiceTypes.ConcreteDevice
      | DeviceServiceTypes.DeviceGroup
      | DeviceServiceTypes.InstantiableCloudDevice
      | DeviceServiceTypes.InstantiableBrowserDevice;
    try {
      r = await clients.device.getDevice(body.Experiment.Devices[device].ID, {
        flat_group: true,
      });
    } catch (error) {
      console.log("Error while getting device " + body.Experiment.Devices[device].ID +" :" + (error as Error).toString());
      const err = error as UnsuccessfulRequestError;
      // Bad status code
      if (err.response !== undefined && err.response.status !== undefined) {
        if (err.response.status === 503) {
          return {
            status: 503,
          };
        }
        if (err.response.status === 404) {
          return { status: 404, body: body.Experiment.Devices[device].ID };
        }
        //@ts-ignore: fallback which only works when API can handle errors - still keep it (defensive programming)
        return {
          status: 500,
          body:
            'Device request ' +
            body.Experiment.Devices[device].ID +
            ' returned status code' +
            err.response.status,
        };
      }

      console.log('ANY ERROR device');
      // any other error
      throw err;
    }

    if (r.url != body.Experiment.Devices[device].ID) {
      return {
        status: 500,
        body:
          'API returned bad result (requested device' +
          body.Experiment.Devices[device].ID +
          ', got ' +
          r.url +
          ')',
      };
    }

    if (r.type === 'device') {
      realDevices[device].push(r.url);
    } else if (r.type === 'cloud instantiable' || r.type === 'edge instantiable') {
      // For now, just add free time
      realDevices[device].push(r.url);
      timetables[device].push([]);
      continue;
    } else {
      // group
      for (let i = 0; i < r.devices.length; i++) {
        realDevices[device].push(r.devices[i].url);
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
            status: 400,
          };
        }
        if (laterReq.get(d.origin) === undefined) {
          let req: postScheduleRequestBodyType = lodash.cloneDeep(body);
          req.onlyOwn = true;
          req.Experiment.Devices = [];
          req.Combined = false;

          laterReq.set(d.origin, [[], [], req]);
        }
        let lr = laterReq.get(d.origin)!;
        lr[0].push(device);
        lr[1].push(i);
        lr[2]!.Experiment.Devices.push({ ID: realDevices[device][i] });
        laterReq.set(d.origin, lr);
        t = [];
      } else {
        // This is our device
        t = await getTimetables(d, body.Time.Start, body.Time.End);
      }

      timetables[device][i] = t;

      // Get availability
      availability[device].push(
        clients.device.getDevice(realDevices[device][i], { flat_group: true }),
      );
    }
  }

  const lrpromise = new Map<
    string,
    [
      number[],
      number[],
      postScheduleRequestBodyType,
      Promise<postScheduleSuccessResponseType['body']>,
    ]
  >(); // Device in request, device list, request
  for (let k of laterReq.keys()) {
    let lr = laterReq.get(k)!;
    let req = clients.booking.schedule.schedule(lr[2], { url: k });

    lrpromise.set(k, [lr[0], lr[1], lr[2], req]);
  }

  for (let k of laterReq.keys()) {
    let lr = lrpromise.get(k)!;
    let req: postScheduleSuccessResponseType['body'];
    try {
      req = await lr[3];
    } catch (error) {
      console.log("Error while getting schedule for " + k + " :" + (error as Error).toString());
      const err = error as UnsuccessfulRequestError;
      if (err.response !== undefined && err.response.status !== undefined) {
        if (err.response.status == 503) {
          return { status: 503 };
        }
        if (err.response.status == 404) {
          return { status: 404, body: JSON.stringify(err.response.body) };
        }
        return {
          status: 500,
          body: 'Institution ' + k + ' returned status code ' + err.response.status,
        };
      }
      console.log('ANY ERROR lr');
      throw err;
    }
    if (req.length != lr[2]!.Experiment.Devices.length) {
      return {
        status: 500,
        body:
          'Institution ' +
          k +
          ' returned bad result (requested ' +
          lr[2]!.Experiment.Devices.length +
          ' devices, got ' +
          req.length +
          ')',
      };
    }
    for (let i = 0; i < req.length; i++) {
      if (req[i].Device != lr[2]!.Experiment.Devices[i].ID) {
        return {
          status: 500,
          body:
            'Institution ' +
            k +
            ' returned bad result (requested device' +
            lr[2]!.Experiment.Devices[i].ID +
            ', got ' +
            req[i].Device +
            ')',
        };
      }
      timetables[(lr as any)[i][0]][(lr as any)[i][1]] = req[i].Booked;
    }
  }

  let response: Array<{
    Device: string;
    Booked: Array<Timeslot>;
    Free: Array<Timeslot>;
  }> = [];

  // Build Response
  for (let device = 0; device < body.Experiment.Devices.length; device++) {
    // Get free times
    let free: Timeslot[][] = [];
    for (let i = 0; i < timetables[device].length; i++) {
      // Add availability
      let a:
        | DeviceServiceTypes.ConcreteDevice
        | DeviceServiceTypes.DeviceGroup
        | DeviceServiceTypes.InstantiableCloudDevice
        | DeviceServiceTypes.InstantiableBrowserDevice;
      try {
        a = await availability[device][i];
      } catch (error) {
        console.log("Error while availability for " + device + " " + i + " :" + (error as Error).toString());
        const err = error as UnsuccessfulRequestError;
        if (err.response !== undefined && err.response.status !== undefined) {
          // TODO: Remove later if errors are well specified
          if (err.response.status === 503) {
            return {
              status: 503,
            };
          }
          if (err.response.status === 404) {
            return { status: 404, body: realDevices[device][i] };
          }
          //@ts-ignore: fallback which only works when API can handle errors - still keep it (defensive programming)
          return {
            status: 500,
            body:
              'Device request ' +
              realDevices[device][i] +
              ' returned status code' +
              err.response.status,
          };
        }
        console.log('ANY ERROR availability');
        throw err;
      }
      if (a.type == 'group') {
        return {
          status: 500,
          body: 'Device request ' + realDevices[device][i] + " is group but shouldn't",
        };
      }

      let available: Timeslot[];
      if (a.type == 'cloud instantiable' || a.type == 'edge instantiable') {
        available = [{ Start: body.Time.Start, End: body.Time.End }];
      } else {
        available = timetableAnd(
          a.announcedAvailability!.map(e => {
            return { Start: e.start!, End: e.end! };
          }),
        );
      }
      let notAvailable: Timeslot[] = timetableNot(
        available,
        dayjs(body.Time.Start),
        dayjs(body.Time.End),
      );
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
    let free: Timeslot[][] = [];
    for (let i = 0; i < response.length; i++) {
      free.push(
        timetableNot(response[i].Booked, dayjs(body.Time.Start), dayjs(body.Time.End)),
      );
    }

    let freeCombined = timetableAnd(...free);

    response = [
      {
        Device: '<combined>',
        Booked: timetableNot(freeCombined, dayjs(body.Time.Start), dayjs(body.Time.End)),
        Free: freeCombined,
      },
    ];
  }

  return { status: 200, body: response };
};

export async function getTimetables(
  device: URL,
  start: string,
  end: string,
): Promise<Timeslot[]> {
  let r: Timeslot[] = [];
  let db = await mysql.createConnection(config.ReservationDSN);
  try {
    await db.connect();

    let [rows, fields]: [any, any] = await db.execute(
      'SELECT start, end FROM reservation WHERE `device`=? AND ((`start` < ? AND `end` > ?) OR (`start` < ? AND `end` > ?) OR (`start` > ? AND `end` < ?) OR (`start` < ? AND `end` > ?)) ORDER BY `start` ASC',
      [
        device.toString(),
        dayjs(start).toDate(),
        dayjs(start).toDate(),
        dayjs(end).toDate(),
        dayjs(end).toDate(),
        dayjs(start).toDate(),
        dayjs(end).toDate(),
        dayjs(start).toDate(),
        dayjs(end).toDate(),
      ],
    );

    for (let i = 0; i < rows.length; i++) {
      r.push({
        Start: dayjs(rows[i].start).toISOString(),
        End: dayjs(rows[i].end).toISOString(),
      });
    }
  } finally {
    db.end();
  }

  // flatten r
  r = timetableNot(r, dayjs(start), dayjs(end));
  r = timetableNot(r, dayjs(start), dayjs(end));
  return r;
}

export default { postSchedule };
