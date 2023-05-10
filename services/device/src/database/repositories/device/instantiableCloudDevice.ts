import {
    InstantiableCloudDevice,
    InstantiableCloudDeviceUpdate,
} from '../../../generated/types'
import { InstantiableCloudDeviceModel } from '../../model'
import { deviceOverviewRepository } from './deviceOverview'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class InstantiableCloudDeviceRepository extends AbstractRepository<
    InstantiableCloudDeviceModel,
    InstantiableCloudDevice<'request'>,
    InstantiableCloudDevice<'response'>
> {
    constructor() {
        super('Instantiable Cloud Device')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(InstantiableCloudDeviceModel)
    }

    async create(
        data?: InstantiableCloudDevice<'request'>
    ): Promise<InstantiableCloudDeviceModel> {
        const model = await super.create(data)
        model.type = 'cloud instantiable'
        return model
    }

    async write(
        model: InstantiableCloudDeviceModel,
        data: InstantiableCloudDeviceUpdate<'request'>
    ) {
        await deviceOverviewRepository.write(model, data)

        if (data.instantiateUrl) model.instantiateUrl = data.instantiateUrl
        if (data.services) model.services = data.services
    }

    async format(
        model: InstantiableCloudDeviceModel
    ): Promise<InstantiableCloudDevice<'response'>> {
        return {
            ...(await deviceOverviewRepository.format(model)),
            type: 'cloud instantiable',
            instantiateUrl: model.instantiateUrl,
            services: model.services ?? undefined,
        }
    }
}

export const instantiableCloudDeviceRepository = new InstantiableCloudDeviceRepository()
