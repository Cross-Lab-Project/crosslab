import {
    InstantiableBrowserDevice,
    InstantiableBrowserDeviceUpdate,
} from '../../../generated/types'
import { InstantiableBrowserDeviceModel } from '../../model'
import { deviceOverviewRepository } from './deviceOverview'
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
        data?: InstantiableBrowserDevice<'request'>
    ): Promise<InstantiableBrowserDeviceModel> {
        const model = await super.create(data)
        model.type = 'edge instantiable'
        return model
    }

    async write(
        model: InstantiableBrowserDeviceModel,
        data: InstantiableBrowserDeviceUpdate<'request'>
    ) {
        await deviceOverviewRepository.write(model, data)

        if (data.codeUrl) model.codeUrl = data.codeUrl
        if (data.services) model.services = data.services
    }

    async format(
        model: InstantiableBrowserDeviceModel
    ): Promise<InstantiableBrowserDevice<'response'>> {
        return {
            ...(await deviceOverviewRepository.format(model)),
            type: 'edge instantiable',
            codeUrl: model.codeUrl,
            services: model.services ?? undefined,
        }
    }
}

export const instantiableBrowserDeviceRepository =
    new InstantiableBrowserDeviceRepository()
