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

export async function reserveDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel,
  device: Device<'response'>,
) {
  switch (device.type) {
    case 'device':
      return await reserveConcreteDevice(bookingModel, deviceModel, device);
    case 'group':
      return await reserveDeviceGroup(bookingModel, deviceModel, device);
    case 'edge instantiable':
      return await reserveEdgeInstantiableDevice(bookingModel, deviceModel, device);
    case 'cloud instantiable':
      return await reserveCloudInstantiableDevice(bookingModel, deviceModel, device);
  }
}

async function reserveDeviceGroup(
  bookingModel: BookingModel,
  deviceModel: DeviceModel,
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
      deviceModel.selectedDevice = device.url;
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
  deviceModel: DeviceModel,
  concreteDevice: ConcreteDevice<'response'>,
) {
  const bookingStart = Date.parse(bookingModel.start);
  const bookingEnd = Date.parse(bookingModel.end);

  const availableTimeslots = await clients.device.getDeviceAvailability(
    concreteDevice.url,
  );

  let isAvailable = false;
  for (const timeslot of availableTimeslots) {
    if (
      Date.parse(timeslot.start) <= bookingStart &&
      Date.parse(timeslot.end) >= bookingEnd
    ) {
      isAvailable = true;
      break;
    }
  }

  if (!isAvailable) {
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
    const reservationStart = Date.parse(reservation.start);
    const reservationEnd = Date.parse(reservation.end);

    if (reservationStart <= bookingStart && bookingStart < reservationEnd) {
      overlapsWithReservation = true;
      break;
    }
    if (reservationStart < bookingEnd && bookingEnd <= reservationEnd) {
      overlapsWithReservation = true;
      break;
    }
    if (bookingStart <= reservationStart && bookingEnd >= reservationEnd) {
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
}

async function reserveEdgeInstantiableDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel,
  _edgeInstantiableDevice: InstantiableBrowserDevice<'response'>,
) {
  deviceModel.reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });
}

async function reserveCloudInstantiableDevice(
  bookingModel: BookingModel,
  deviceModel: DeviceModel,
  _cloudInstantiableDevice: InstantiableCloudDevice<'response'>,
) {
  deviceModel.reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });
}
