import {
    InstantiableBrowserDevice,
    InstantiableBrowserDeviceInit,
    InstantiableBrowserDeviceUpdate,
} from '../../../generated/types'
import { InstantiableBrowserDeviceModel } from '../../model'
import { DeviceOverviewRepository } from './deviceOverview'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class InstantiableBrowserDeviceRepository extends AbstractRepository<
    InstantiableBrowserDeviceModel,
    InstantiableBrowserDevice<'request'>,
    InstantiableBrowserDevice<'response'>
> {
    constructor() {
        super('Instantiable Browser Device')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(InstantiableBrowserDeviceModel)
    }

    async create(
        data?: InstantiableBrowserDeviceInit<'request'>
    ): Promise<InstantiableBrowserDeviceModel> {
        const model = await super.create(data)
        model.type = 'edge instantiable'
        return model
    }

    async write(
        model: InstantiableBrowserDeviceModel,
        data: InstantiableBrowserDeviceUpdate<'request'>
    ) {
        await DeviceOverviewRepository.write(model, data)

        model.codeUrl = data.codeUrl
        model.services = data.services
    }

    async format(
        model: InstantiableBrowserDeviceModel
    ): Promise<InstantiableBrowserDevice<'response'>> {
        return {
            ...(await DeviceOverviewRepository.format(model)),
            type: 'edge instantiable',
            codeUrl: model.codeUrl,
            services: model.services,
        }
    }
}

export const instantiableBrowserDeviceRepository =
    new InstantiableBrowserDeviceRepository()