import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { CallbackUrlModel } from '../model.js';

type CallbackUrl = {
  type: 'changed' | 'deleted';
  url: string;
};

export class CallbackUrlRepository extends AbstractRepository<
  CallbackUrlModel,
  CallbackUrl,
  CallbackUrl
> {
  protected dependencies: Partial<Record<string, never>> = {};

  constructor() {
    super('CallbackUrl');
  }

  protected dependenciesMet(): boolean {
    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(CallbackUrlModel);
  }

  async create(data: CallbackUrl): Promise<CallbackUrlModel> {
    const model = await super.create();

    model.type = data.type;
    model.url = data.url;

    return model;
  }

  async write(model: CallbackUrlModel, data: Partial<CallbackUrl>): Promise<void> {
    if (data.type !== undefined) model.type = data.type;
    if (data.url !== undefined) model.url = data.url;
  }

  async format(model: CallbackUrlModel): Promise<CallbackUrl> {
    return { type: model.type, url: model.url };
  }
}
