import { DeviceRepository } from '../../../src/database/repositories/device.js.ts";
import { concreteDeviceData, ConcreteDeviceName } from './concreteDevices/index.spec.js';
import { concreteDeviceNames } from './concreteDevices/index.spec.js';
import {
    deviceGroupData,
    DeviceGroupName,
    deviceGroupNames,
} from './deviceGroups/index.spec.js';
import {
    instantiableBrowserDeviceData,
    InstantiableBrowserDeviceName,
    instantiableBrowserDeviceNames,
} from './instantiableBrowserDevices/index.spec.js';
import {
    instantiableCloudDeviceData,
    InstantiableCloudDeviceName,
    instantiableCloudDeviceNames,
} from './instantiableCloudDevices/index.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

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
