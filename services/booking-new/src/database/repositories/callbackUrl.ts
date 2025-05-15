import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { CallbackUrlModel } from '../model.js';

export class CallbackUrlRepository extends AbstractRepository<
  CallbackUrlModel,
  string,
  string
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

  async write(model: CallbackUrlModel, data: string): Promise<void> {
    model.url = data;
  }

  async format(model: CallbackUrlModel): Promise<string> {
    return model.url;
  }
}
