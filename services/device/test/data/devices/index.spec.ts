import { EntityData } from '@crosslab/service-common/test-helper';

import { DeviceRepository } from '../../../src/database/repositories/device';
import { ConcreteDeviceName, concreteDeviceData } from './concreteDevices/index.spec.js';
import { concreteDeviceNames } from './concreteDevices/index.spec.js';
import {
  DeviceGroupName,
  deviceGroupData,
  deviceGroupNames,
} from './deviceGroups/index.spec.js';
import {
  InstantiableBrowserDeviceName,
  instantiableBrowserDeviceData,
  instantiableBrowserDeviceNames,
} from './instantiableBrowserDevices/index.spec.js';
import {
  InstantiableCloudDeviceName,
  instantiableCloudDeviceData,
  instantiableCloudDeviceNames,
} from './instantiableCloudDevices/index.spec.js';

export const deviceNames = [
  ...concreteDeviceNames,
  ...deviceGroupNames,
  ...instantiableBrowserDeviceNames,
  ...instantiableCloudDeviceNames,
] as const;
export type DeviceName = (typeof deviceNames)[number];
export type DeviceData = Record<DeviceName, EntityData<DeviceRepository>>;

export const deviceData: DeviceData = {
  ...(concreteDeviceData as Record<ConcreteDeviceName, EntityData<DeviceRepository>>),
  ...(deviceGroupData as Record<DeviceGroupName, EntityData<DeviceRepository>>),
  ...(instantiableBrowserDeviceData as Record<
    InstantiableBrowserDeviceName,
    EntityData<DeviceRepository>
  >),
  ...(instantiableCloudDeviceData as Record<
    InstantiableCloudDeviceName,
    EntityData<DeviceRepository>
  >),
};
