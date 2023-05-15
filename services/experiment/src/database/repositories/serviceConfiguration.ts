import { ServiceConfiguration } from '../../generated/types'
import { ServiceConfigurationModel } from '../model'
import { participantRepository } from './participant'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class ServiceConfigurationRepository extends AbstractRepository<
    ServiceConfigurationModel,
    ServiceConfiguration<'request'>,
    ServiceConfiguration<'response'>
> {
    constructor() {
        super('ServiceConfiguration')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(ServiceConfigurationModel)
    }

    async write(
        model: ServiceConfigurationModel,
        data: Partial<ServiceConfiguration<'request'>>
    ): Promise<void> {
        if (data.serviceType) model.serviceType = data.serviceType
        if (data.configuration) model.configuration = data.configuration
        if (data.participants) {
            for (const participant of model.participants ?? []) {
                await participantRepository.remove(participant)
            }
            model.participants = []
            for (const participant of data.participants) {
                const participantModel = await participantRepository.create(participant)
                model.participants.push(participantModel)
            }
        }
    }

    async format(
        model: ServiceConfigurationModel
    ): Promise<ServiceConfiguration<'response'>> {
        return {
            serviceType: model.serviceType,
            configuration: model.configuration,
            participants: await Promise.all(
                model.participants?.map((participant) =>
                    participantRepository.format(participant)
                ) ?? []
            ),
        }
    }

    async remove(model: ServiceConfigurationModel): Promise<void> {
        const removePromises: Promise<void>[] = []

        if (model.participants)
            removePromises.push(
                ...model.participants.map((participant) =>
                    participantRepository.remove(participant)
                )
            )

        await Promise.all(removePromises)

        await super.remove(model)
    }
}

export const serviceConfigurationRepository = new ServiceConfigurationRepository()
