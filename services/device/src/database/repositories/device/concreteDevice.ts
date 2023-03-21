import {
    ConcreteDevice,
    ConcreteDeviceInit,
    ConcreteDeviceUpdate,
} from '../../../generated/types'
import { ConcreteDeviceModel } from '../../model'
import { DeviceOverviewRepository } from './deviceOverview'
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

    async create(data?: ConcreteDeviceInit<'request'>): Promise<ConcreteDeviceModel> {
        const model = await super.create(data)
        model.type = 'device'
        return model
    }

    async write(
        model: ConcreteDeviceModel,
        data: ConcreteDeviceUpdate<'request'>
    ): Promise<void> {
        await DeviceOverviewRepository.write(model, data)

        if (data.experiment) model.experiment = data.experiment
        if (data.services) model.services = data.services
    }

    async format(model: ConcreteDeviceModel): Promise<ConcreteDevice<'response'>> {
        return {
            ...(await DeviceOverviewRepository.format(model)),
            type: 'device',
            announcedAvailability: model.announcedAvailability
                ? model.announcedAvailability.map((timeSlot) => {
                      return {
                          start: new Date(timeSlot.start).toISOString(),
                          end: new Date(timeSlot.end).toISOString(),
                      }
                  })
                : undefined,
            connected: model.connected !== undefined ? model.connected : undefined,
            experiment: model.experiment ? model.experiment : undefined,
            services: model.services
                ? model.services.map((service) => JSON.parse(service.description))
                : undefined,
        }
    }
}

export const concreteDeviceRepository = new ConcreteDeviceRepository()
