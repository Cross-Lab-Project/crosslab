import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup';
import { deviceUrlFromId } from '../../../../src/methods/urlFromId';
import { concreteDeviceData } from '../concreteDevices/index.spec';
import { EntityData } from '@crosslab/service-common/test-helper';

const uuid = '1cd58ddf-ec6b-435f-93ce-2c3d266088a7';
const type = 'group';
const name = 'Cyclic Device Group Example 1';
const description = 'An example for a cyclic device group';
const owner = 'http://localhost/users/superadmin';
const devices = [{ url: concreteDeviceData['concrete device'].response.url }];
const isPublic = true;

const device_group_cyclic_1: EntityData<DeviceGroupRepository> = {
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

export default device_group_cyclic_1;
