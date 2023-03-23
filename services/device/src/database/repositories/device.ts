import { Device, DeviceInit, DeviceUpdate } from '../../generated/types'
import { DeviceModel, DeviceOverviewModel } from '../model'
import { concreteDeviceRepository } from './device/concreteDevice'
import { deviceGroupRepository } from './device/deviceGroup'
import { DeviceOverviewRepository } from './device/deviceOverview'
import { instantiableBrowserDeviceRepository } from './device/instantiableBrowserDevice'
import { instantiableCloudDeviceRepository } from './device/instantiableCloudDevice'
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
        this.repository = AppDataSource.getRepository(DeviceOverviewModel)
    }

    async create(data?: DeviceInit<'request'>): Promise<DeviceModel> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        if (!data) return await super.create()

        switch (data.type) {
            case 'cloud instantiable':
                return instantiableCloudDeviceRepository.create(data)
            case 'device':
                return concreteDeviceRepository.create(data)
            case 'edge instantiable':
                return instantiableBrowserDeviceRepository.create(data)
            case 'group':
                return deviceGroupRepository.create(data)
        }
    }

    async write(model: DeviceModel, data: DeviceUpdate<'request'>): Promise<void> {
        switch (model.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.write(model, data)
            case 'device':
                return await concreteDeviceRepository.write(model, data)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.write(model, data)
            case 'group':
                return await deviceGroupRepository.write(model, data)
        }
    }

    async format(
        model: DeviceModel,
        options?: { flatGroup?: boolean; overview?: boolean }
    ): Promise<Device<'response'>> {
        if (options?.overview) return await DeviceOverviewRepository.format(model)

        switch (model.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.format(model)
            case 'device':
                return await concreteDeviceRepository.format(model)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.format(model)
            case 'group':
                return await deviceGroupRepository.format(model, options?.flatGroup)
        }
    }

    async save(model: DeviceModel): Promise<DeviceModel> {
        if (!this.repository) this.throwUninitializedRepositoryError()

        switch (model.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.save(model)
            case 'device':
                return await concreteDeviceRepository.save(model)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.save(model)
            case 'group':
                return await deviceGroupRepository.save(model)
        }
    }
}

export const deviceRepository = new DeviceRepository()
