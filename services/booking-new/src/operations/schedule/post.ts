import { InvalidValueError } from '@crosslab/service-common';

import {
  ConcreteDevice,
  DeviceGroup,
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../../clients/device/types.js';
import * as clients from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { postScheduleSignature } from '../../generated/signatures.js';
import {
  Timeslot,
  Timetable,
  removeFromTimetable,
  sortTimeslots,
} from '../../methods/timetable.js';

export const postSchedule: postScheduleSignature = async (req, body) => {
  await req.authorization.check_authorization_or_fail('create', 'schedule');

  const devices = body.devices;
  const timeframe = {
    start: Date.parse(body.timeframe.start),
    end: Date.parse(body.timeframe.end),
  };

  if (timeframe.end <= timeframe.start) {
    throw new InvalidValueError('End of timeframe is before its start!', 400);
  }

  const timetables = await getTimetablesForDevices(devices, timeframe);
  const schedule = intersectSchedules(timetables);

  return {
    status: 200,
    body: schedule.map(timeslot => {
      return {
        start: new Date(timeslot.start).toISOString(),
        end: new Date(timeslot.end).toISOString(),
      };
    }),
  };
};

function intersectSchedules(schedules: Timetable[]): Timetable {
  if (schedules.length === 0) return [];
  if (schedules.length === 1) return schedules[0];

  const [scheduleA, scheduleB] = schedules;

  const sortedScheduleA = sortTimeslots(scheduleA);
  const sortedScheduleB = sortTimeslots(scheduleB);

  const intersectedSchedule: Timetable = [];

  let indexA = 0;
  let indexB = 0;

  while (indexA < sortedScheduleA.length && indexB < sortedScheduleB.length) {
    const timeslotA = sortedScheduleA[indexA];
    const timeslotB = sortedScheduleB[indexB];

    const start = timeslotA.start > timeslotB.start ? timeslotA.start : timeslotB.start;
    const end = timeslotA.end < timeslotB.end ? timeslotA.end : timeslotB.end;

    if (start < end) {
      intersectedSchedule.push({ start, end });
    }

    if (timeslotA.end < timeslotB.end) {
      indexA++;
    } else if (timeslotB.end < timeslotA.end) {
      indexB++;
    } else {
      indexA++;
      indexB++;
    }
  }

  return intersectedSchedule;
}

async function getTimetablesForDevices(
  deviceUrls: string[],
  timeframe: Timeslot,
): Promise<Timetable[]> {
  return await Promise.all(
    deviceUrls.map(async deviceUrl => await getTimetableForDevice(deviceUrl, timeframe)),
  );
}

async function getTimetableForDevice(
  deviceUrl: string,
  timeframe: Timeslot,
): Promise<Timetable> {
  const device = await clients.device.getDevice(deviceUrl, { flat_group: true });

  switch (device.type) {
    case 'device':
      return await getTimetableForConcreteDevice(device, timeframe);
    case 'group':
      return await getTimetableForDeviceGroup(device, timeframe);
    case 'edge instantiable':
      return await getTimetableForEdgeInstantiableDevice(device, timeframe);
    case 'cloud instantiable':
      return await getTimetableForCloudInstantiableDevice(device, timeframe);
  }
}

async function getTimetableForConcreteDevice(
  concreteDevice: ConcreteDevice<'response'>,
  timeframe: Timeslot,
): Promise<Timetable> {
  const deviceModels = await repositories.device.find({
    where: { url: concreteDevice.url },
  });
  const reservations = deviceModels
    .map(deviceModel => deviceModel.reservation)
    .filter(reservation => !!reservation);
  const bookedTimeslots: Timeslot[] = reservations.map(reservation => {
    return { start: Date.parse(reservation.start), end: Date.parse(reservation.end) };
  });
  const availableTimeslots = (
    await clients.device.getDeviceAvailability(concreteDevice.url, {
      startTime: new Date(timeframe.start).toISOString(),
      endTime: new Date(timeframe.end).toISOString(),
    })
  ).map(timeslot => {
    return {
      start: Date.parse(timeslot.start),
      end: Date.parse(timeslot.end),
    };
  });
  return removeFromTimetable(availableTimeslots, bookedTimeslots, timeframe);
}

async function getTimetableForDeviceGroup(
  deviceGroup: DeviceGroup<'response'>,
  timeframe: Timeslot,
): Promise<Timetable> {
  const deviceUrls = deviceGroup.devices.map(deviceReference => deviceReference.url);
  const timetables = await getTimetablesForDevices(deviceUrls, timeframe);
  return timetables.flat();
}

async function getTimetableForEdgeInstantiableDevice(
  _edgeInstantiableDevice: InstantiableBrowserDevice<'response'>,
  timeframe: Timeslot,
): Promise<Timetable> {
  return [{ ...timeframe }];
}

async function getTimetableForCloudInstantiableDevice(
  _cloudInstantiableDevice: InstantiableCloudDevice<'response'>,
  timeframe: Timeslot,
): Promise<Timetable> {
  return [{ ...timeframe }];
}
