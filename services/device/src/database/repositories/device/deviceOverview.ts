import { DeviceOverview, DeviceOverviewUpdate } from '../../../generated/types'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import { DeviceOverviewModel } from '../../model'
import { AbstractRepository } from '@crosslab/service-common'

export abstract class DeviceOverviewRepository extends AbstractRepository<
    DeviceOverviewModel,
    DeviceOverview<'request'>,
    DeviceOverview<'response'>
> {
    static async write(
        model: DeviceOverviewModel,
        data: DeviceOverviewUpdate<'request'>
    ): Promise<void> {
        if (data.name) model.name = data.name
        if (data.description) model.description = data.description
    }

    static async format(model: DeviceOverviewModel): Promise<DeviceOverview<'response'>> {
        return {
            url: deviceUrlFromId(model.uuid),
            type: model.type,
            name: model.name,
            description: model.description,
            owner: model.owner,
        }
    }
}