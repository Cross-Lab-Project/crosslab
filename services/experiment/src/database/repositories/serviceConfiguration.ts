import { ServiceConfiguration } from '../../generated/types';
import { ServiceConfigurationModel } from '../model';
import { ParticipantRepository } from './participant';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

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
            configuration: model.configuration,
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
        const removePromises: Promise<void>[] = [];

        if (model.participants)
            removePromises.push(
                ...model.participants.map((participant) =>
                    participantRepository.remove(participant),
                ),
            );

        await Promise.all(removePromises);

        await super.remove(model);
    }
}
