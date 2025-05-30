import { Not } from 'typeorm';

import { DeviceDeletedEventCallback } from '../../../clients/device/types.js';
import * as clients from '../../../clients/index.js';
import { repositories } from '../../../database/dataSource.js';
import { reserveDevice } from '../../../methods/reservation.js';

export async function handleDeviceDeletedEventCallback(
  deviceDeletedEventCallback: DeviceDeletedEventCallback,
): Promise<number> {
  switch (deviceDeletedEventCallback.device.type) {
    case 'device':
      return handleDeletedDevice(deviceDeletedEventCallback.device.url);
    case 'group':
      return handleDeletedDeviceGroup(deviceDeletedEventCallback.device.url);
    case 'edge instantiable':
      return handleDeletedDevice(deviceDeletedEventCallback.device.url);
    case 'cloud instantiable':
      return handleDeletedDevice(deviceDeletedEventCallback.device.url);
  }
}

async function handleDeletedDevice(deviceUrl: string) {
  const affectedBookingModels = await getAffectedBookings(deviceUrl);

  for (const bookingModel of affectedBookingModels) {
    const affectedDeviceModels = bookingModel.devices.filter(
      deviceModel =>
        deviceModel.url === deviceUrl || deviceModel.selectedDevice === deviceUrl,
    );

    for (const deviceModel of affectedDeviceModels) {
      const reservation = deviceModel.reservation;

      if (reservation) {
        deviceModel.selectedDevice = null;
        deviceModel.reservation = null;
        await repositories.device.save(deviceModel);
        await repositories.reservation.remove(reservation);
      }

      if (deviceModel.url === deviceUrl) {
        bookingModel.status = 'impossible';
        continue;
      }

      if (!bookingModel.isLocked) {
        const deviceGroup = await clients.device.getDevice(deviceModel.url);
        try {
          await reserveDevice(bookingModel, deviceModel, deviceGroup);
        } catch {
          // empty
        }
      }
    }

    await repositories.booking.save(bookingModel);
  }

  return 200;
}

async function handleDeletedDeviceGroup(deviceUrl: string): Promise<number> {
  const affectedBookingModels = await getAffectedBookings(deviceUrl);

  for (const bookingModel of affectedBookingModels) {
    bookingModel.status = 'impossible';

    const affectedDeviceModels = bookingModel.devices.filter(
      deviceModel => deviceModel.url === deviceUrl,
    );

    for (const deviceModel of affectedDeviceModels) {
      const reservation = deviceModel.reservation;
      deviceModel.reservation = null;
      deviceModel.selectedDevice = null;
      await repositories.device.save(deviceModel);
      if (reservation) {
        await repositories.reservation.remove(reservation);
      }
    }

    await repositories.booking.save(bookingModel);
  }

  return 200;
}

// #region Utility Functions
async function getAffectedBookings(deviceUrl: string) {
  return (
    await repositories.booking.find({
      where: [
        {
          devices: [{ url: deviceUrl }, { selectedDevice: deviceUrl }],
          status: Not('impossible'),
        },
      ],
    })
  ).sort((a, b) => {
    if (a.createdDate.getTime() < b.createdDate.getDate()) return -1;
    if (a.createdDate.getTime() > b.createdDate.getDate()) return 1;
    return 0;
  });
}
