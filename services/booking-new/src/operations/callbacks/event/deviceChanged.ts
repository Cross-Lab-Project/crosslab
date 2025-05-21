import {
  ConcreteDevice,
  Device,
  DeviceChangedEventCallback,
  InstantiableBrowserDevice,
  InstantiableCloudDevice,
} from '../../../clients/device/types.js';
import * as clients from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { isLocked } from '../../../methods/booking.js';
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
  const affectedBookingModels = await getAffectedBookings(concreteDevice);

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  const startTime = new Date(
    Math.min(...affectedBookingModels.map(booking => Date.parse(booking.start))),
  ).toISOString();
  const endTime = new Date(
    Math.max(...affectedBookingModels.map(booking => Date.parse(booking.end))),
  ).toISOString();
  const availability = await clients.device.getDeviceAvailability(concreteDevice.url, {
    startTime,
    endTime,
  });

  for (const bookingModel of affectedBookingModels) {
    const deviceModel = bookingModel.devices.find(
      deviceModel =>
        deviceModel.url === concreteDevice.url ||
        deviceModel.chosenDevice === concreteDevice.url,
    );

    if (!deviceModel) {
      // TODO: better error with status code
      throw new Error('Could not find device in booking');
    }

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
          await sendChangedCallbacks(bookingModel);
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
      deviceModel.chosenDevice = isLocked(bookingModel)
        ? deviceModel.chosenDevice
        : undefined;
      deviceModel.reservation = null;
      await repositories.device.save(deviceModel);
      await repositories.reservation.remove(reservationModel);
    }

    // handle locked booking
    if (isLocked(bookingModel) && bookingModel.status !== 'locked-rejected') {
      bookingModel.status = 'locked-rejected';
      await repositories.booking.save(bookingModel);
      await sendChangedCallbacks(bookingModel);
      continue;
    }

    // handle concrete device as standalone device
    if (deviceModel.url === concreteDevice.url) {
      if (bookingModel.status === 'rejected') {
        continue;
      }
      bookingModel.status = 'rejected';
      await repositories.booking.save(bookingModel);
      await sendChangedCallbacks(bookingModel);
      continue;
    }

    // handle concrete device as chosen device
    const deviceGroup = await clients.device.getDevice(deviceModel.url, {
      flat_group: true,
    });
    try {
      await reserveDevice(bookingModel, deviceModel, deviceGroup);
    } catch {
      if (bookingModel.status === 'rejected') {
        continue;
      }
      bookingModel.status = 'rejected';
    }
    await repositories.booking.save(bookingModel);
    await sendChangedCallbacks(bookingModel);
  }

  return 200;
}

// #region Device Group
async function handleChangedDeviceGroup(
  deviceGroup: DeviceChangedEventCallback['device'] & { type: 'group' },
): Promise<number> {
  const affectedBookingModels = await getAffectedBookings(deviceGroup, false);

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  for (const bookingModel of affectedBookingModels) {
    if (isLocked(bookingModel) && bookingModel.status !== 'locked-rejected') {
      bookingModel.status = 'locked-rejected';
      await repositories.booking.save(bookingModel);
      await sendChangedCallbacks(bookingModel);
      continue;
    }

    const affectedDeviceGroupModels = bookingModel.devices.filter(
      deviceModel => deviceModel.url === deviceGroup.url,
    );

    for (const deviceGroupModel of affectedDeviceGroupModels) {
      // #region handle removed devices
      const chosenDeviceRemoved =
        deviceGroupModel.chosenDevice &&
        deviceGroup.removed.includes(deviceGroupModel.chosenDevice);

      if (chosenDeviceRemoved) {
        deviceGroupModel.chosenDevice = undefined;
        if (deviceGroupModel.reservation) {
          const reservation = deviceGroupModel.reservation;
          deviceGroupModel.reservation = null;
          await repositories.device.save(deviceGroupModel);
          await repositories.reservation.remove(reservation);
        }
        const deviceGroup = await clients.device.getDevice(deviceGroupModel.url, {
          flat_group: true,
        });
        try {
          await reserveDevice(bookingModel, deviceGroupModel, deviceGroup);
        } catch {
          if (bookingModel.status === 'rejected') {
            continue;
          }
          bookingModel.status = 'rejected';
        }
        await repositories.booking.save(bookingModel);
        await sendChangedCallbacks(bookingModel);
        continue;
      }

      // #region handle added/changed devices
      if (deviceGroupModel.reservation) {
        continue;
      }

      // check if one of the added or changed devices can be reserved
      for (const deviceUrl of [...deviceGroup.added, ...deviceGroup.changed]) {
        const device = await clients.device.getDevice(deviceUrl);
        try {
          await reserveDevice(bookingModel, deviceGroupModel, device);
          deviceGroupModel.chosenDevice = deviceUrl;
          await repositories.booking.save(bookingModel);
          await sendChangedCallbacks(bookingModel);
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
  includeChosenDevice = true,
) {
  return (
    await repositories.booking.find({
      where: [
        {
          devices: includeChosenDevice
            ? [{ url: device.url }, { chosenDevice: device.url }]
            : { url: device.url },
        },
      ],
    })
  ).sort((a, b) => {
    if (a.createdDate.getTime() < b.createdDate.getDate()) return -1;
    if (a.createdDate.getTime() > b.createdDate.getDate()) return 1;
    return 0;
  });
}
