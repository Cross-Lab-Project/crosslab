import { Device } from '../../generated/types'
import { DeviceModel } from '../model'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'
import { InstanceRepository } from './instance'
import { AppDataSource } from '../dataSource'

export class DeviceRepository extends AbstractRepository<
    DeviceModel,
    Device<'request'>,
    Device<'response'>,
    { instance: InstanceRepository }
> {
    protected dependencies: Partial<{ instance: InstanceRepository }> = {}

    constructor() {
        super('Device')
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.instance) return false

        return true
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(DeviceModel)
    }

    async write(model: DeviceModel, data: Partial<Device<'request'>>): Promise<void> {
        if (data.device) model.url = data.device
        if (data.role) model.role = data.role
    }

    async format(model: DeviceModel): Promise<Device<'response'>> {
        return {
            device: model.url,
            role: model.role,
        }
    }

    async remove(model: DeviceModel): Promise<void> {
        if (model.instance)
            await AppDataSource.transaction(async (repositories) => {
                const instance = model.instance
                delete model.instance
                await repositories.device.remove(model)
                if (instance) await repositories.instance.remove(instance)
            })
        else await super.remove(model)
    }
}
