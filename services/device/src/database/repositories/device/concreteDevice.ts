import { ConcreteDevice, ConcreteDeviceUpdate } from '../../../generated/types'
import { ConcreteDeviceModel } from '../../model'
import { deviceOverviewRepository } from './deviceOverview'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class ConcreteDeviceRepository extends AbstractRepository<
    ConcreteDeviceModel,
    ConcreteDevice<'request'>,
    ConcreteDevice<'response'>
> {
    constructor() {
        super('Concrete Device')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(ConcreteDeviceModel)
    }

    async create(data?: ConcreteDevice<'request'>): Promise<ConcreteDeviceModel> {
        const model = await super.create(data)
        model.type = 'device'
        model.announcedAvailability = []
        model.availabilityRules = []
        model.connected = false
        model.services = []
        return model
    }

    async write(
        model: ConcreteDeviceModel,
        data: ConcreteDeviceUpdate<'request'>
    ): Promise<void> {
        await deviceOverviewRepository.write(model, data)
        if (data.experiment) model.experiment = data.experiment
        if (data.services) model.services = data.services
    }

    async format(model: ConcreteDeviceModel): Promise<ConcreteDevice<'response'>> {
        return {
            ...(await deviceOverviewRepository.format(model)),
            type: 'device',
            announcedAvailability: model.announcedAvailability,
            connected: model.connected,
            experiment: model.experiment ?? undefined,
            services: model.services,
        }
    }
}

export const concreteDeviceRepository = new ConcreteDeviceRepository()
