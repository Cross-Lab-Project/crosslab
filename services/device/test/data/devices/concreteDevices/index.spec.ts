import { ConcreteDeviceRepository } from '../../../../src/database/repositories/device/concreteDevice'
import concrete_device from './concrete_device.spec'
import { EntityData } from '@crosslab/service-common/test-helper'

export const concreteDeviceNames = ['concrete device'] as const
export type ConcreteDeviceName = (typeof concreteDeviceNames)[number]
export type ConcreteDeviceData = Record<
    ConcreteDeviceName,
    EntityData<ConcreteDeviceRepository>
>

export const concreteDeviceData: ConcreteDeviceData = {
    'concrete device': concrete_device,
}
