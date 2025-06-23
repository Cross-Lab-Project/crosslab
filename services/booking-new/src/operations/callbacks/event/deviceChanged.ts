import { Not } from 'typeorm';

import {
  ConcreteDevice,
  Device,
  DeviceChangedEventCallback,
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../../../clients/device/types.js';
import * as clients from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { Booking } from '../../../generated/types.js';
import { sendChangedCallbacks } from '../../../methods/callbacks.js';
import { reserveDevice } from '../../../methods/reservation.js';

export async function handleDeviceChangedEventCallback(
  deviceChangedEventCallback: DeviceChangedEventCallback,
): Promise<number> {
  switch (deviceChangedEventCallback.device.type) {
    case 'device':
      return handleChangedConcreteDevice(deviceChangedEventCallback.device);
    case 'group':
      return handleChangedDeviceGroup(deviceChangedEventCallback.device);
    case 'edge instantiable':
      return handleChangedEdgeInstantiableDevice(deviceChangedEventCallback.device);
    case 'cloud instantiable':
      return handleChangedCloudInstantiableDevice(deviceChangedEventCallback.device);
  }
}

// #region Concrete Device
async function handleChangedConcreteDevice(
  concreteDevice: ConcreteDevice<'response'>,
): Promise<number> {
  const affectedDeviceModels = await repositories.device.find({
    where: [{ url: concreteDevice.url }, { selectedDevice: concreteDevice.url }],
    relations: {
      booking: {
        callbackUrls: true,
        devices: {
          reservation: true,
        },
      },
      reservation: true,
    },
  });
  const affectedBookingModels = affectedDeviceModels.map(
    deviceModel => deviceModel.booking,
  );

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  const startTime = new Date(
    Math.min(...affectedBookingModels.map(booking => booking.start)),
  ).toISOString();
  const endTime = new Date(
    Math.max(...affectedBookingModels.map(booking => booking.end)),
  ).toISOString();
  const availability = await clients.device.getDeviceAvailability(concreteDevice.url, {
    startTime,
    endTime,
  });

  for (const deviceModel of affectedDeviceModels) {
    const bookingModel = deviceModel.booking;
    bookingModel.devices = bookingModel.devices.map(device => {
      if (device.uuid === deviceModel.uuid) {
        return deviceModel;
      }
      return device;
    });

    const reservationPossible = !!availability.find(timeslot => {
      if (Date.parse(timeslot.start) > Date.parse(startTime)) return false;
      if (Date.parse(timeslot.end) < Date.parse(endTime)) return false;
      return true;
    });

    if (reservationPossible) {
      if (!deviceModel.reservation) {
        try {
          await reserveDevice(bookingModel, deviceModel, concreteDevice);
          await repositories.booking.save(bookingModel);
          sendChangedCallbacks(bookingModel);
        } catch {
          // empty
        }
      }
      continue;
    }

    /* handle impossible reservation */

    // delete reservation
    if (deviceModel.reservation) {
      const reservationModel = deviceModel.reservation;
      deviceModel.reservation = null;
      await repositories.device.save(deviceModel);
      await repositories.reservation.remove(reservationModel);
    }

    // handle accepted locked booking
    if (bookingModel.isLocked && bookingModel.status === 'accepted') {
      await repositories.booking.save(bookingModel);
      sendChangedCallbacks(bookingModel);
      continue;
    }

    // handle concrete device as standalone device
    if (deviceModel.url === concreteDevice.url) {
      if (bookingModel.status === 'rejected') {
        continue;
      }
      await repositories.booking.save(bookingModel);
      sendChangedCallbacks(bookingModel);
      continue;
    }

    // handle concrete device as selected device
    const deviceGroup = await clients.device.getDevice(deviceModel.url, {
      flat_group: true,
    });
    try {
      await reserveDevice(bookingModel, deviceModel, deviceGroup);
    } catch {
      if (!bookingModel.isLocked && deviceModel.selectedDevice === null) {
        continue;
      }
      if (bookingModel.isLocked && bookingModel.status === 'rejected') {
        continue;
      }
      if (!bookingModel.isLocked) {
        deviceModel.selectedDevice = null;
      }
    }
    await repositories.booking.save(bookingModel);
    sendChangedCallbacks(bookingModel);
  }

  return 200;
}

// #region Device Group
async function handleChangedDeviceGroup(
  deviceGroup: DeviceChangedEventCallback['device'] & { type: 'group' },
): Promise<number> {
  const affectedBookingModels = await getAffectedBookings(deviceGroup);

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  for (const bookingModel of affectedBookingModels) {
    const affectedDeviceGroupModels = bookingModel.devices.filter(
      deviceModel => deviceModel.url === deviceGroup.url,
    );

    for (const deviceGroupModel of affectedDeviceGroupModels) {
      // #region handle removed devices
      const chosenDeviceRemoved =
        deviceGroupModel.selectedDevice &&
        deviceGroup.removed.includes(deviceGroupModel.selectedDevice);

      if (chosenDeviceRemoved) {
        if (deviceGroupModel.reservation) {
          const reservation = deviceGroupModel.reservation;
          deviceGroupModel.reservation = null;
          await repositories.device.save(deviceGroupModel);
          await repositories.reservation.remove(reservation);
        }

        if (!bookingModel.isLocked) {
          deviceGroupModel.selectedDevice = null;
          const deviceGroup = await clients.device.getDevice(deviceGroupModel.url, {
            flat_group: true,
          });
          try {
            await reserveDevice(bookingModel, deviceGroupModel, deviceGroup);
          } catch {
            // empty
          }
        }
        await repositories.booking.save(bookingModel);
        sendChangedCallbacks(bookingModel);
        continue;
      }

      // #region handle added/changed devices
      if (deviceGroupModel.reservation) {
        continue;
      }

      // check if one of the added or changed devices can be reserved
      for (const deviceUrl of [...deviceGroup.added, ...deviceGroup.changed]) {
        if (bookingModel.isLocked && deviceGroupModel.selectedDevice !== deviceUrl) {
          continue;
        }
        const device = await clients.device.getDevice(deviceUrl);
        try {
          await reserveDevice(bookingModel, deviceGroupModel, device);
          await repositories.booking.save(bookingModel);
          sendChangedCallbacks(bookingModel);
          break;
        } catch {
          // empty
        }
      }
    }
  }

  return 200;
}

// #region Edge Instantiable Device
async function handleChangedEdgeInstantiableDevice(
  edgeInstantiableDevice: InstantiableBrowserDevice<'response'>,
): Promise<number> {
  const affectedBookingModels = await getAffectedBookings(edgeInstantiableDevice);

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  return 200;
}

// #region Cloud Instantiable Device
async function handleChangedCloudInstantiableDevice(
  cloudInstantiableDevice: InstantiableCloudDevice<'response'>,
): Promise<number> {
  const affectedBookingModels = await getAffectedBookings(cloudInstantiableDevice);

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  return 200;
}

// #region Utility Functions
async function getAffectedBookings(
  device: Device<'response'>,
  status?: Booking<'response'>['status'],
) {
  return (
    await repositories.booking.find({
      where: [
        {
          devices: [{ url: device.url }, { selectedDevice: device.url }],
          status: status ?? Not('impossible'),
        },
      ],
    })
  ).sort((a, b) => {
    if (a.createdDate.getTime() < b.createdDate.getDate()) return -1;
    if (a.createdDate.getTime() > b.createdDate.getDate()) return 1;
    return 0;
  });
}
