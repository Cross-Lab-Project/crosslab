import {
  ConcreteDevice,
  Device,
  DeviceGroup,
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../clients/device/types.js';
import * as clients from '../clients/index.js';
import { config } from '../config.js';
import { repositories } from '../database/dataSource.js';
import { BookingModel, DeviceModel } from '../database/model.js';
import { ReservationError } from './errors.js';

function hasDeviceModelType<
  T extends ('device' | 'group' | 'edge instantiable' | 'cloud instantiable')[],
>(
  deviceModel: DeviceModel,
  types: T,
): deviceModel is DeviceModel & { type: T extends (infer X)[] ? X : never } {
  for (const type of types) {
    if (deviceModel.type === type) {
      return true;
    }
  }

  return false;
}

function throwWrongTypeError(
  device: Device<'response'>,
  deviceModel: DeviceModel,
): never {
  throw new ReservationError(
    `Cannot reserve a device of type "${device.type}" for a device of type "${deviceModel.type}"!`,
    500,
  );
}

export async function reserveDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel,
  device: Device<'response'>,
) {
  switch (device.type) {
    case 'device': {
      if (!hasDeviceModelType(deviceModel, ['device', 'group'])) {
        throwWrongTypeError(device, deviceModel);
      }
      return await reserveConcreteDevice(bookingModel, deviceModel, device);
    }
    case 'group':
      if (!hasDeviceModelType(deviceModel, ['group'])) {
        throwWrongTypeError(device, deviceModel);
      }
      return await reserveDeviceGroup(bookingModel, deviceModel, device);
    case 'edge instantiable':
      if (!hasDeviceModelType(deviceModel, ['edge instantiable', 'group'])) {
        throwWrongTypeError(device, deviceModel);
      }
      return await reserveEdgeInstantiableDevice(bookingModel, deviceModel, device);
    case 'cloud instantiable':
      if (!hasDeviceModelType(deviceModel, ['cloud instantiable', 'group'])) {
        throwWrongTypeError(device, deviceModel);
      }
      return await reserveCloudInstantiableDevice(bookingModel, deviceModel, device);
  }
}

async function reserveDeviceGroup(
  bookingModel: BookingModel,
  deviceModel: DeviceModel & { type: 'group' },
  deviceGroup: DeviceGroup<'response'>,
) {
  if (bookingModel.isLocked && deviceModel.selectedDevice) {
    const device = await clients.device.getDevice(deviceModel.selectedDevice);
    await reserveDevice(bookingModel, deviceModel, device);
    return;
  }

  for (const deviceReference of deviceGroup.devices) {
    const device = await clients.device.getDevice(deviceReference.url);

    try {
      await reserveDevice(bookingModel, deviceModel, device);
      await clients.device.updateDevice(
        device.url,
        { type: device.type },
        {
          changedUrl: `${config.BASE_URL}/callbacks/booking`,
          deletedUrl: `${config.BASE_URL}/callbacks/booking`,
        },
      );
      break;
    } catch {
      // empty
    }
  }

  if (!deviceModel.reservation) {
    throw new ReservationError(
      `No device from group "${deviceGroup.url}" is available from "${bookingModel.start}" to "${bookingModel.end}"!`,
      400,
    );
  }
}

async function reserveConcreteDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel & { type: 'device' | 'group' },
  concreteDevice: ConcreteDevice<'response'>,
) {
  const availableTimeslots = await clients.device.getDeviceAvailability(
    concreteDevice.url,
    {
      startTime: new Date(bookingModel.start).toISOString(),
      endTime: new Date(bookingModel.end).toISOString(),
    },
  );

  let isAvailable = false;
  for (const timeslot of availableTimeslots) {
    if (
      Date.parse(timeslot.start) <= Date.parse(bookingModel.start) &&
      Date.parse(timeslot.end) >= Date.parse(bookingModel.end)
    ) {
      isAvailable = true;
      break;
    }
  }

  if (!isAvailable && !config.IGNORE_AVAILABILITY) {
    throw new ReservationError(
      `Device "${concreteDevice.url}" is not available from "${bookingModel.start}" to "${bookingModel.end}"!`,
      400,
    );
  }

  const reservations = (
    await repositories.device.find({
      where: [{ url: concreteDevice.url }, { selectedDevice: concreteDevice.url }],
    })
  )
    .map(model => model.reservation)
    .filter(reservation => !!reservation);

  let overlapsWithReservation = false;
  for (const reservation of reservations) {
    if (reservation.start <= bookingModel.start && bookingModel.start < reservation.end) {
      overlapsWithReservation = true;
      break;
    }
    if (reservation.start < bookingModel.end && bookingModel.end <= reservation.end) {
      overlapsWithReservation = true;
      break;
    }
    if (bookingModel.start <= reservation.start && bookingModel.end >= reservation.end) {
      overlapsWithReservation = true;
      break;
    }
  }

  if (overlapsWithReservation) {
    throw new ReservationError(
      `Device "${concreteDevice.url}" cannot be reserved from "${bookingModel.start}" to "${bookingModel.end}"!`,
      400,
    );
  }

  deviceModel.reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });

  if (deviceModel.type === 'group') {
    deviceModel.selectedDevice = concreteDevice.url;
  }
}

async function reserveEdgeInstantiableDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel & { type: 'edge instantiable' | 'group' },
  edgeInstantiableDevice: InstantiableBrowserDevice<'response'>,
) {
  deviceModel.reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });

  if (deviceModel.type === 'group') {
    deviceModel.selectedDevice = edgeInstantiableDevice.url;
  }
}

async function reserveCloudInstantiableDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel & { type: 'cloud instantiable' | 'group' },
  cloudInstantiableDevice: InstantiableCloudDevice<'response'>,
) {
  deviceModel.reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });

  if (deviceModel.type === 'group') {
    deviceModel.selectedDevice = cloudInstantiableDevice.url;
  }
}
