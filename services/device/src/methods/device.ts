import { repositories } from '../database/dataSource.js';
import { DeviceModel } from '../database/model.js';
import { deviceIdFromUrl } from './urlFromId.js';

type IDorURL = { url: string } | { uuid: string };

function toUUID(idurl: IDorURL) {
  if ('url' in idurl) {
    return deviceIdFromUrl(idurl.url);
  } else {
    return idurl.uuid;
  }
}

export async function getDevice(id: IDorURL) {
  const device = await repositories.device.findOneOrFail({ where: { uuid: toUUID(id) } });

  return device;
}

export async function updateDevice(id: IDorURL, device: Partial<DeviceModel>) {
  const deviceModel = await repositories.device.findOneOrFail({
    where: { uuid: toUUID(id) },
  });
  await repositories.device.write(deviceModel, { type: deviceModel.type, ...device });
  await repositories.device.save(deviceModel);
}
