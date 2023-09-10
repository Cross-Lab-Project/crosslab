import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { Template, TemplateOverview, TemplateUpdate } from '../../generated/types.js';
import { templateUrlFromId } from '../../methods/url.js';
import { TemplateModel } from '../model.js';

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

  async create(data?: Template<'request'>): Promise<TemplateModel> {
    const model = await super.create();

    model.configuration = {
      devices: [],
      roles: [],
      serviceConfigurations: [],
    };

    if (data) await this.write(model, data);

    return model;
  }

  async write(model: TemplateModel, data: TemplateUpdate<'request'>): Promise<void> {
    if (data.name) model.name = data.name;
    if (data.description !== undefined) model.description = data.description;
    if (data.configuration?.devices)
      model.configuration.devices = data.configuration.devices;
    if (data.configuration?.roles) model.configuration.roles = data.configuration.roles;
    if (data.configuration?.serviceConfigurations)
      model.configuration.serviceConfigurations =
        data.configuration.serviceConfigurations;
  }

  async format(model: TemplateModel): Promise<Template<'response'>> {
    return {
      ...(await this.formatOverview(model)),
      configuration: model.configuration,
    };
  }

  async formatOverview(model: TemplateModel): Promise<TemplateOverview<'response'>> {
    return {
      url: templateUrlFromId(model.uuid),
      name: model.name,
      description: model.description,
    };
  }
}
