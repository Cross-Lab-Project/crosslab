import {
  ConcreteDevice,
  DeviceGroup,
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../../clients/device/types.js';
import * as clients from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { postScheduleSignature } from '../../generated/signatures.js';
import { Timeslot } from '../../generated/types.js';
import {
  Timetable,
  intersectTimetables,
  removeFromTimetable,
} from '../../methods/timetable.js';

export const postSchedule: postScheduleSignature = async (_req, body) => {
  // TODO: authorization

  const { devices, timeframe } = body;

  if (timeframe.end <= timeframe.start) {
    return {
      status: 200,
      body: [],
    };
  }

  // TODO: set maximum length of timeframe

  const timetables = await getTimetablesForDevices(devices, timeframe);
  const schedule = intersectTimetables(timetables, timeframe);

  return {
    status: 200,
    body: schedule,
  };
};

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
    return { start: reservation.start, end: reservation.end };
  });
  const availableTimeslots = await clients.device.getDeviceAvailability(
    concreteDevice.url,
    {
      startTime: timeframe.start,
      endTime: timeframe.end,
    },
  );
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
