import { EntityData } from '@crosslab/service-common/test-helper';

import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup';
import { deviceUrlFromId } from '../../../../src/methods/urlFromId';
import { concreteDeviceData } from '../concreteDevices/index.spec';

const uuid = '3b94e22d-95de-47e9-b2e0-452dc1308eec';
const type = 'group';
const name = 'Cyclic Device Group Example 2';
const description = 'An example for a cyclic device group';
const owner = 'http://localhost/users/superadmin';
const devices = [{ url: concreteDeviceData['concrete device'].response.url }];
const isPublic = true;

const device_group_cyclic_2: EntityData<DeviceGroupRepository> = {
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

export default device_group_cyclic_2;
