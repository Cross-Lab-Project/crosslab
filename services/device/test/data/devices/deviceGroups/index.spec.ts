import { DeviceGroupRepository } from '../../../../src/database/repositories/device/deviceGroup'
import device_group from './device_group.spec'
import { EntityData } from '@crosslab/service-common'

export const deviceGroupNames = ['device group'] as const
export type DeviceGroupName = (typeof deviceGroupNames)[number]
export type DeviceGroupData = Record<DeviceGroupName, EntityData<DeviceGroupRepository>>

export const deviceGroupData: DeviceGroupData = {
    'device group': { ...device_group },
}
