import { Instance } from '../../types/types';
import { InstanceModel } from '../model';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

export class InstanceRepository extends AbstractRepository<
    InstanceModel,
    Instance,
    Instance
> {
    protected dependencies: Partial<Record<string, never>> = {};

    constructor() {
        super('Instance');
    }

    protected dependenciesMet(): boolean {
        return true;
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(InstanceModel);
    }

    async write(model: InstanceModel, data: Partial<Instance>): Promise<void> {
        if (data.token) model.token = data.token;
        if (data.url) model.url = data.url;
        if (data.codeUrl) model.codeUrl = data.codeUrl;
    }

    async format(model: InstanceModel): Promise<Instance> {
        return {
            url: model.url,
            token: model.token,
            codeUrl: model.codeUrl,
        };
    }
}
