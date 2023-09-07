import { ServiceConfiguration } from '../../generated/types.js';
import { ServiceConfigurationModel } from '../model.js';
import { ParticipantRepository } from './participant.js';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations, Repository } from 'typeorm';

export class ServiceConfigurationRepository extends AbstractRepository<
    ServiceConfigurationModel,
    ServiceConfiguration<'request'>,
    ServiceConfiguration<'response'>,
    { participant: ParticipantRepository }
> {
    protected dependencies: { participant?: ParticipantRepository } = {};

    constructor() {
        super('ServiceConfiguration');
    }

    protected dependenciesMet(): boolean {
        return true;
    }

    protected isInitialized(): this is {
        repository: Repository<ServiceConfigurationModel>;
        dependencies: Required<{ participant: ParticipantRepository }>;
    } {
        if (!this.dependencies.participant) return false;

        return true;
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(ServiceConfigurationModel);
    }

    async write(
        model: ServiceConfigurationModel,
        data: Partial<ServiceConfiguration<'request'>>,
    ): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        if (data.serviceType) model.serviceType = data.serviceType;
        if (data.configuration) model.configuration = data.configuration;
        if (data.participants) {
            for (const participant of model.participants ?? []) {
                await this.dependencies.participant.remove(participant);
            }
            model.participants = [];
            for (const participant of data.participants) {
                const participantModel = await this.dependencies.participant.create(
                    participant,
                );
                model.participants.push(participantModel);
            }
        }
    }

    async format(
        model: ServiceConfigurationModel,
    ): Promise<ServiceConfiguration<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        const participantRepository = this.dependencies.participant;

        return {
            serviceType: model.serviceType,
            configuration: model.configuration ?? undefined,
            participants: await Promise.all(
                model.participants?.map((participant) =>
                    participantRepository.format(participant),
                ) ?? [],
            ),
        };
    }

    async remove(model: ServiceConfigurationModel): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        const participantRepository = this.dependencies.participant;

        if (model.participants) {
            await Promise.all([
                ...model.participants.map((participant) =>
                    participantRepository.remove(participant),
                ),
            ]);
        }

        await super.remove(model);
    }

    protected getDefaultFindOptionsRelations():
        | FindOptionsRelations<ServiceConfigurationModel>
        | undefined {
        return {
            participants: true,
        };
    }
}
