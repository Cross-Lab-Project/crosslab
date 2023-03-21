import { DeviceRepository } from '../../../src/database/repositories/device'
import concrete_device from './concrete_device.spec'
import { EntityData } from '@crosslab/service-common'

export const deviceNames = ['concrete device'] as const
export type DeviceName = (typeof deviceNames)[number]
export type DeviceData = Record<DeviceName, EntityData<DeviceRepository>>

export const deviceData: DeviceData = {
    'concrete device': concrete_device,
}
