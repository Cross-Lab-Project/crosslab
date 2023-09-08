import { EntityData } from '@crosslab/service-common/test-helper';

import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup';
import { deviceUrlFromId } from '../../../../src/methods/urlFromId';
import { concreteDeviceData } from '../concreteDevices/index.spec';
import device_group from './device_group.spec.js';

const uuid = 'e78b289a-44c5-452f-8c7b-d983714d5645';
const type = 'group';
const name = 'Nested Device Group Example';
const description = 'An example for a nested device group';
const owner = 'http://localhost/users/superadmin';
const devices = [
  { url: concreteDeviceData['concrete device'].response.url },
  { url: device_group.response.url },
];
const isPublic = true;

const device_group_nested: EntityData<DeviceGroupRepository> = {
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
    devices: [concreteDeviceData['concrete device'].response, device_group.response],
    owner,
    isPublic,
  },
};

export default device_group_nested;
