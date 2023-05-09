import {
    Device,
    DeviceGroup,
    DeviceGroupUpdate,
    DeviceReference,
} from '../../../generated/types'
import { apiClient } from '../../../globals'
import { DeviceGroupModel } from '../../model'
import { deviceOverviewRepository } from './deviceOverview'
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

    async create(data?: DeviceGroup<'request'>): Promise<DeviceGroupModel> {
        const model = await super.create(data)
        model.type = 'group'
        return model
    }

    async write(
        model: DeviceGroupModel,
        data: DeviceGroupUpdate<'request'>
    ): Promise<void> {
        await deviceOverviewRepository.write(model, data)

        if (data.devices) model.devices = data.devices
    }

    async format(
        model: DeviceGroupModel,
        flatGroup?: boolean
    ): Promise<DeviceGroup<'response'>> {
        const devices: Device[] = await this.resolveDeviceReferences(
            model.devices,
            flatGroup
        )

        return {
            ...(await deviceOverviewRepository.format(model)),
            type: 'group',
            devices: devices.filter(
                (value, index, array) =>
                    array.findIndex((device) => device.url === value.url) === index
            ),
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
                devices.push(...(await this.resolveDeviceReferences(device.devices)))
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
