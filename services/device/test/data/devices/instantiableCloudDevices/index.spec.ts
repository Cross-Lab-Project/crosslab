import { InstantiableCloudDeviceRepository } from '../../../../src/database/repositories/device/instantiableCloudDevice.js.ts";
import instantiable_cloud_device from './instantiable_cloud_device.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

export const instantiableCloudDeviceNames = ['instantiable cloud device'] as const;
export type InstantiableCloudDeviceName = (typeof instantiableCloudDeviceNames)[number];
export type InstantiableCloudDeviceData = Record<
    InstantiableCloudDeviceName,
    EntityData<InstantiableCloudDeviceRepository>
>;

export const instantiableCloudDeviceData: InstantiableCloudDeviceData = {
    'instantiable cloud device': { ...instantiable_cloud_device },
};
