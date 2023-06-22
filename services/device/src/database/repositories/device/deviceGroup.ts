import {
    Device,
    DeviceGroup,
    DeviceGroupUpdate,
    DeviceReference,
} from '../../../generated/types'
import { apiClient } from '../../../globals'
import { DeviceGroupModel } from '../../model'
import { AbstractRepository, logger } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'
import { DeviceOverviewRepository } from './deviceOverview'

export class DeviceGroupRepository extends AbstractRepository<
    DeviceGroupModel,
    DeviceGroup<'request'>,
    DeviceGroup<'response'>,
    { deviceOverview: DeviceOverviewRepository }
> {
    protected dependencies: { deviceOverview?: DeviceOverviewRepository } = {}

    constructor() {
        super('Device Group')
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.deviceOverview) return false

        return true
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(DeviceGroupModel)
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
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()

        await this.dependencies.deviceOverview.write(model, data)

        if (data.devices) model.devices = data.devices
    }

    async format(
        model: DeviceGroupModel,
        flatGroup?: boolean
    ): Promise<DeviceGroup<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()

        const devices: Device[] = await this.resolveDeviceReferences(
            model.devices,
            flatGroup
        )

        return {
            ...(await this.dependencies.deviceOverview.format(model)),
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
            logger.log(
                'error',
                'An error occured while trying to resolve a device reference',
                { data: { error } }
            )
        }
        return undefined
    }
}
