import {
    Device,
    DeviceOverview,
    isConcreteDevice,
    isDeviceGroup,
    isInstantiableBrowserDevice,
    isInstantiableCloudDevice,
} from '../../generated/types'
import { DeviceModel, DeviceOverviewModel } from '../model'
import { concreteDeviceRepository } from './device/concreteDevice'
import { deviceGroupRepository } from './device/deviceGroup'
import { DeviceOverviewRepository } from './device/deviceOverview'
import { instantiableBrowserDeviceRepository } from './device/instantiableBrowserDevice'
import { instantiableCloudDeviceRepository } from './device/instantiableCloudDevice'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
    InvalidValueError,
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

    async write(model: DeviceModel, data: Device<'request'>): Promise<void> {
        switch (model.type) {
            case 'cloud instantiable':
                if (!isInstantiableCloudDevice(data)) {
                    throw new InvalidValueError(
                        `Provided data cannot be used to update the given device`,
                        400
                    )
                }
                return await instantiableCloudDeviceRepository.write(model, data)
            case 'device':
                if (!isConcreteDevice(data)) {
                    throw new InvalidValueError(
                        `Provided data cannot be used to update the given device`,
                        400
                    )
                }
                return await concreteDeviceRepository.write(model, data)
            case 'edge instantiable':
                if (!isInstantiableBrowserDevice(data)) {
                    throw new InvalidValueError(
                        `Provided data cannot be used to update the given device`,
                        400
                    )
                }
                return await instantiableBrowserDeviceRepository.write(model, data)
            case 'group':
                if (!isDeviceGroup(data)) {
                    throw new InvalidValueError(
                        `Provided data cannot be used to update the given device`,
                        400
                    )
                }
                return await deviceGroupRepository.write(model, data)
        }
    }

    async format(
        model: DeviceModel,
        options?: { flatGroup?: boolean }
    ): Promise<Device<'response'>> {
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

    async formatOverview(model: DeviceModel): Promise<DeviceOverview<'response'>> {
        return await DeviceOverviewRepository.format(model)
    }
}

export const deviceRepository = new DeviceRepository()
