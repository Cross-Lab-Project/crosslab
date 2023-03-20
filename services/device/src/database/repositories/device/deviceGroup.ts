import { DeviceGroup, DeviceReference } from '../../../generated/types'
import { apiClient } from '../../../globals'
import { Device } from '../../../types/device'
import { DeviceGroupModel } from '../../model'
import { DeviceOverviewRepository } from './deviceOverview'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class DeviceGroupRepository extends AbstractRepository<
    DeviceGroupModel,
    DeviceGroup<'request'>,
    DeviceGroup<'response'>
> {
    constructor() {
        super('Device Group')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(DeviceGroupModel)
    }

    async write(model: DeviceGroupModel, data: DeviceGroup<'request'>): Promise<void> {
        await DeviceOverviewRepository.write(model, data)

        model.devices = data.devices
    }

    async format(
        model: DeviceGroupModel,
        flatGroup?: boolean
    ): Promise<DeviceGroup<'response'>> {
        const devices: Device[] = await this.resolveDeviceReferences(
            model.devices ?? [],
            flatGroup
        )

        return {
            ...(await DeviceOverviewRepository.format(model)),
            type: 'group',
            devices: devices,
        }
    }

    private async resolveDeviceReferences(
        deviceReferences: DeviceReference[],
        flatGroup?: boolean
    ): Promise<Device[]> {
        const devices: Device[] = []

        for (const deviceReference of deviceReferences) {
            const device = await this.resolveDeviceReference(deviceReference, flatGroup)

            if (!device) continue

            if (device.type === 'group' && flatGroup) {
                devices.push(...(device.devices ?? []))
            } else {
                devices.push(device)
            }
        }

        return devices
    }

    private async resolveDeviceReference(
        deviceReference: DeviceReference,
        flatGroup?: boolean
    ): Promise<Device | undefined> {
        try {
            return await apiClient.getDevice(deviceReference.url, {
                flat_group: flatGroup,
            })
        } catch (error) {
            console.error(error)
        }
        return undefined
    }
}

export const deviceGroupRepository = new DeviceGroupRepository()
