import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup'
import device_group from './device_group.spec'
import device_group_nested from './device_group_nested.spec'
import { EntityData } from '@crosslab/service-common/test-helper'

export const deviceGroupNames = ['device group', 'nested device group'] as const
export type DeviceGroupName = (typeof deviceGroupNames)[number]
export type DeviceGroupData = Record<DeviceGroupName, EntityData<DeviceGroupRepository>>

export const deviceGroupData: DeviceGroupData = {
    'device group': { ...device_group },
    'nested device group': { ...device_group_nested },
}
