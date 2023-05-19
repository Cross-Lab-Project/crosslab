import { DeviceOverview, DeviceOverviewUpdate } from '../../../generated/types'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import { DeviceOverviewModel } from '../../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

class DeviceOverviewRepository extends AbstractRepository<
    DeviceOverviewModel,
    DeviceOverview<'request'>,
    DeviceOverview<'response'>
> {
    constructor() {
        super('Device Overview')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(DeviceOverviewModel)
    }

    async write(
        model: DeviceOverviewModel,
        data: DeviceOverviewUpdate<'request'>
    ): Promise<void> {
        if (data.name) model.name = data.name
        if (data.description) model.description = data.description
    }

    async format(model: DeviceOverviewModel): Promise<DeviceOverview<'response'>> {
        return {
            url: deviceUrlFromId(model.uuid),
            type: model.type,
            name: model.name,
            description: model.description ?? undefined,
            owner: model.owner,
        }
    }
}

export const deviceOverviewRepository = new DeviceOverviewRepository()
