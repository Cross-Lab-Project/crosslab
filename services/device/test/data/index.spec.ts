import { GenericTestData } from '@crosslab/service-common/test-helper';

import { DeviceRepository } from '../../src/database/repositories/device';
import { ConcreteDeviceRepository } from '../../src/database/repositories/device/concreteDevice';
import { DeviceGroupRepository } from '../../src/database/repositories/device/deviceGroup';
import { InstantiableBrowserDeviceRepository } from '../../src/database/repositories/device/instantiableBrowserDevice';
import { InstantiableCloudDeviceRepository } from '../../src/database/repositories/device/instantiableCloudDevice';
import { PeerconnectionRepository } from '../../src/database/repositories/peerconnection';
import {
  ConcreteDeviceName,
  concreteDeviceData,
} from './devices/concreteDevices/index.spec.js';
import { DeviceGroupName, deviceGroupData } from './devices/deviceGroups/index.spec.js';
import { DeviceName, deviceData } from './devices/index.spec.js';
import {
  InstantiableBrowserDeviceName,
  instantiableBrowserDeviceData,
} from './devices/instantiableBrowserDevices/index.spec.js';
import {
  InstantiableCloudDeviceName,
  instantiableCloudDeviceData,
} from './devices/instantiableCloudDevices/index.spec.js';
import { PeerconnectionName, peerconnectionData } from './peerconnections/index.spec.js';

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
