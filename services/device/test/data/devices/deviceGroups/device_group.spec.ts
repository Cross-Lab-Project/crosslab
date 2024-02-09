import { EntityData } from '@crosslab/service-common/test-helper';

import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup';
import { deviceUrlFromId } from '../../../../src/methods/urlFromId';
import { concreteDeviceData } from '../concreteDevices/index.spec';

const uuid = 'd65b289a-44c5-452f-8c7b-e003714d3645';
const type = 'group';
const name = 'Device Group Example';
const description = 'An example for a device group';
const owner = 'http://localhost/users/superadmin';
const devices = [{ url: concreteDeviceData['concrete device'].response.url }];
const isPublic = true;

const device_group: EntityData<DeviceGroupRepository> = {
  request: {
    type,
    name,
    description,
    devices,
    isPublic,
  },
  model: {
    uuid,
    type,
    name,
    description,
    devices,
    owner,
    isPublic,
  },
  response: {
    url: deviceUrlFromId(uuid),
    type,
    name,
    description,
    devices: [concreteDeviceData['concrete device'].response],
    owner,
    isPublic,
  },
};

export default device_group;
