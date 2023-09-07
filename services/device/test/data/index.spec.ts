import { DeviceRepository } from '../../src/database/repositories/device.js.ts";
import { ConcreteDeviceRepository } from '../../src/database/repositories/device/concreteDevice.js.ts";
import { DeviceGroupRepository } from '../../src/database/repositories/device/deviceGroup.js.ts";
import { InstantiableBrowserDeviceRepository } from '../../src/database/repositories/device/instantiableBrowserDevice.js.ts";
import { InstantiableCloudDeviceRepository } from '../../src/database/repositories/device/instantiableCloudDevice.js.ts";
import { PeerconnectionRepository } from '../../src/database/repositories/peerconnection.js.ts";
import {
    concreteDeviceData,
    ConcreteDeviceName,
} from './devices/concreteDevices/index.spec.js';
import { deviceGroupData, DeviceGroupName } from './devices/deviceGroups/index.spec.js';
import { deviceData, DeviceName } from './devices/index.spec.js';
import {
    instantiableBrowserDeviceData,
    InstantiableBrowserDeviceName,
} from './devices/instantiableBrowserDevices/index.spec.js';
import {
    instantiableCloudDeviceData,
    InstantiableCloudDeviceName,
} from './devices/instantiableCloudDevices/index.spec.js';
import { peerconnectionData, PeerconnectionName } from './peerconnections/index.spec.js';
import { GenericTestData } from '@crosslab/service-common/test-helper';

export type TestData = GenericTestData<
    [
        ['concrete devices', ConcreteDeviceName, ConcreteDeviceRepository],
        ['device groups', DeviceGroupName, DeviceGroupRepository],
        [
            'instantiable browser devices',
            InstantiableBrowserDeviceName,
            InstantiableBrowserDeviceRepository,
        ],
        [
            'instantiable cloud devices',
            InstantiableCloudDeviceName,
            InstantiableCloudDeviceRepository,
        ],
        ['devices', DeviceName, DeviceRepository],
        ['peerconnections', PeerconnectionName, PeerconnectionRepository],
    ]
>;

export function prepareTestData(): TestData {
    return {
        'concrete devices': concreteDeviceData,
        'device groups': deviceGroupData,
        'instantiable browser devices': instantiableBrowserDeviceData,
        'instantiable cloud devices': instantiableCloudDeviceData,
        devices: deviceData,
        peerconnections: peerconnectionData,
    };
}
