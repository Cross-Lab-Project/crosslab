import { Participant } from '../../generated/types'
import { ParticipantModel } from '../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class ParticipantRepository extends AbstractRepository<
    ParticipantModel,
    Participant<'request'>,
    Participant<'response'>
> {
    constructor() {
        super('Participant')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(ParticipantModel)
    }

    async write(
        model: ParticipantModel,
        data: Partial<Participant<'request'>>
    ): Promise<void> {
        if (data.role) model.role = data.role
        if (data.serviceId) model.serviceId = data.serviceId
        if (data.config) model.config = data.config
    }

    async format(model: ParticipantModel): Promise<Participant<'response'>> {
        return {
            role: model.role,
            serviceId: model.serviceId,
            config: model.config,
        }
    }
}

export const participantRepository = new ParticipantRepository()
