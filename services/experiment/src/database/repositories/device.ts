import { Device } from '../../generated/types'
import { DeviceModel } from '../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class DeviceRepository extends AbstractRepository<
    DeviceModel,
    Device<'request'>,
    Device<'response'>
> {
    constructor() {
        super('Device')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(DeviceModel)
    }

    async write(model: DeviceModel, data: Partial<Device<'request'>>): Promise<void> {
        if (data.device) model.url = data.device
        if (data.role) model.role = data.role
    }

    async format(model: DeviceModel): Promise<Device<'response'>> {
        return {
            device: model.url,
            role: model.role,
            additionalProperties: model.additionalProperties,
        }
    }
}

export const deviceRepository = new DeviceRepository()
