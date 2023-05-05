import { DeviceRepository } from '../../../src/database/repositories/device'
import { concreteDeviceData, ConcreteDeviceName } from './concreteDevices/index.spec'
import { concreteDeviceNames } from './concreteDevices/index.spec'
import {
    deviceGroupData,
    DeviceGroupName,
    deviceGroupNames,
} from './deviceGroups/index.spec'
import {
    instantiableBrowserDeviceData,
    InstantiableBrowserDeviceName,
    instantiableBrowserDeviceNames,
} from './instantiableBrowserDevices/index.spec'
import {
    instantiableCloudDeviceData,
    InstantiableCloudDeviceName,
    instantiableCloudDeviceNames,
} from './instantiableCloudDevices/index.spec'
import { EntityData } from '@crosslab/service-common/test-helper'

export const deviceNames = [
    ...concreteDeviceNames,
    ...deviceGroupNames,
    ...instantiableBrowserDeviceNames,
    ...instantiableCloudDeviceNames,
] as const
export type DeviceName = (typeof deviceNames)[number]
export type DeviceData = Record<DeviceName, EntityData<DeviceRepository>>

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
}
