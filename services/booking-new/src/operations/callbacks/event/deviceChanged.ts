import {
  ConcreteDevice,
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

async function handleChangedConcreteDevice(
  concreteDevice: ConcreteDevice<'response'>,
): Promise<number> {
  const affectedBookingModels = await repositories.booking.find({
    where: {
      devices: [{ url: concreteDevice.url }, { chosenDevice: concreteDevice.url }],
    },
  });

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
    const bookingPossible = !!availability.find(timeslot => {
      if (Date.parse(timeslot.start) > Date.parse(startTime)) return false;
      if (Date.parse(timeslot.end) < Date.parse(endTime)) return false;
      return true;
    });

    if (bookingPossible) {
      continue;
    }

    if (isLocked(bookingModel) && bookingModel.status !== 'locked-rejected') {
      bookingModel.status = 'locked-rejected';
      await repositories.booking.save(bookingModel);
      await sendChangedCallbacks(bookingModel);
      continue;
    }

    if (
      bookingModel.devices.find(deviceModel => deviceModel.url === concreteDevice.url)
    ) {
      if (bookingModel.status === 'rejected') {
        continue;
      }
      bookingModel.status = 'rejected';
      await repositories.booking.save(bookingModel);
      await sendChangedCallbacks(bookingModel);
      continue;
    } else {
      const affectedDeviceGroupModels = bookingModel.devices.filter(
        deviceModel => deviceModel.chosenDevice === concreteDevice.url,
      );

      for (const deviceGroupModel of affectedDeviceGroupModels) {
        const deviceGroup = await clients.device.getDevice(deviceGroupModel.url, {
          flat_group: true,
        });
        try {
          await reserveDevice(bookingModel, deviceGroup);
        } catch {
          if (bookingModel.status === 'rejected') {
            continue;
          }
          bookingModel.status = 'rejected';
          await repositories.booking.save(bookingModel);
          await sendChangedCallbacks(bookingModel);
        }
      }
    }
  }

  return 200;
}

async function handleChangedDeviceGroup(
  deviceGroup: DeviceChangedEventCallback['device'] & { type: 'group' },
): Promise<number> {
  const affectedBookingModels = await repositories.booking.find({
    where: {
      devices: { url: deviceGroup.url },
    },
  });

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
      const chosenDeviceRemoved =
        deviceGroupModel.chosenDevice &&
        deviceGroup.removed.includes(deviceGroupModel.chosenDevice);

      if (chosenDeviceRemoved) {
        const deviceGroup = await clients.device.getDevice(deviceGroupModel.url, {
          flat_group: true,
        });
        try {
          await reserveDevice(bookingModel, deviceGroup);
        } catch {
          if (bookingModel.status === 'rejected') {
            continue;
          }
          bookingModel.status = 'rejected';
          await repositories.booking.save(bookingModel);
          await sendChangedCallbacks(bookingModel);
        }
      }
    }
  }

  return 200;
}

async function handleChangedEdgeInstantiableDevice(
  edgeInstantiableDevice: InstantiableBrowserDevice<'response'>,
): Promise<number> {
  const affectedBookingModels = await repositories.device.find({
    where: [
      { url: edgeInstantiableDevice.url, chosenDevice: edgeInstantiableDevice.url },
    ],
  });

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  return 200;
}

async function handleChangedCloudInstantiableDevice(
  cloudInstantiableDevice: InstantiableCloudDevice<'response'>,
): Promise<number> {
  const affectedBookingModels = await repositories.device.find({
    where: [
      { url: cloudInstantiableDevice.url, chosenDevice: cloudInstantiableDevice.url },
    ],
  });

  if (affectedBookingModels.length === 0) {
    return 410;
  }

  return 200;
}
