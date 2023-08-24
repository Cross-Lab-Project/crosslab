import { Template } from '../../generated/types';
import { templateUrlFromId } from '../../methods/url';
import { TemplateModel } from '../model';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

export class TemplateRepository extends AbstractRepository<
    TemplateModel,
    Template<'request'>,
    Template<'response'>
> {
    protected dependencies: Partial<Record<string, never>> = {};

    constructor() {
        super('Template');
    }

    protected dependenciesMet(): boolean {
        return true;
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(TemplateModel);
    }

    async write(model: TemplateModel, data: Partial<Template<'request'>>): Promise<void> {
        if (data.name) model.name = data.name;
        if (data.description !== undefined) model.description = data.description;
        if (data.configuration) model.configuration = data.configuration;
    }

    async format(model: TemplateModel): Promise<Template<'response'>> {
        return {
            url: templateUrlFromId(model.uuid),
            name: model.name,
            description: model.description,
            configuration: model.configuration,
        };
    }
}
