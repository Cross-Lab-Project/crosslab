import { Not } from 'typeorm';

import {
  ConcreteDevice,
  Device,
  DeviceGroup,
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../clients/device/types.js';
import * as clients from '../clients/index.js';
import { repositories } from '../database/dataSource.js';
import { BookingModel, ReservationModel } from '../database/model.js';
import { ReservationError } from './errors.js';

export async function reserveDevice(
  bookingModel: BookingModel,
  device: Device<'response'>,
): Promise<ReservationModel> {
  switch (device.type) {
    case 'device':
      return await reserveConcreteDevice(bookingModel, device);
    case 'group':
      return await reserveDeviceGroup(bookingModel, device);
    case 'edge instantiable':
      return await reserveEdgeInstantiableDevice(bookingModel, device);
    case 'cloud instantiable':
      return await reserveCloudInstantiableDevice(bookingModel, device);
  }
}

async function reserveDeviceGroup(
  bookingModel: BookingModel,
  deviceGroup: DeviceGroup<'response'>,
): Promise<ReservationModel> {
  let reservation: ReservationModel | undefined = undefined;

  for (const deviceReference of deviceGroup.devices) {
    const device = await clients.device.getDevice(deviceReference.url);

    try {
      reservation = await reserveDevice(bookingModel, device);
      break;
    } catch {
      // empty
    }
  }

  if (!reservation) {
    throw new ReservationError(
      `No device from group "${deviceGroup.url}" is available from "${bookingModel.start}" to "${bookingModel.end}"!`,
      400,
    );
  }

  return reservation;
}

async function reserveConcreteDevice(
  bookingModel: BookingModel,
  concreteDevice: ConcreteDevice<'response'>,
): Promise<ReservationModel> {
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
      where: { url: concreteDevice.url, booking: Not(bookingModel) },
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

  const reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });
  return reservation;
}

async function reserveEdgeInstantiableDevice(
  bookingModel: BookingModel,
  _edgeInstantiableDevice: InstantiableBrowserDevice<'response'>,
): Promise<ReservationModel> {
  const reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });
  return reservation;
}

async function reserveCloudInstantiableDevice(
  bookingModel: BookingModel,
  _cloudInstantiableDevice: InstantiableCloudDevice<'response'>,
): Promise<ReservationModel> {
  const reservation = await repositories.reservation.create({
    start: bookingModel.start,
    end: bookingModel.end,
  });
  return reservation;
}
