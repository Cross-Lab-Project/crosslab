import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { Role } from '../../generated/types.js';
import { RoleModel } from '../model.js';

export class RoleRepository extends AbstractRepository<
  RoleModel,
  Role<'request'>,
  Role<'response'>
> {
  protected dependencies: Record<string, never> = {};

  constructor() {
    super('Role');
  }

  protected dependenciesMet(): boolean {
    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(RoleModel);
  }

  async write(model: RoleModel, data: Partial<Role<'request'>>): Promise<void> {
    if (data.name) model.name = data.name;
    if (data.description) model.description = data.description;
    if (data.configuration) model.configuration = data.configuration;
  }

  async format(model: RoleModel): Promise<Role<'response'>> {
    return {
      name: model.name,
      description: model.description ?? undefined,
      configuration: model.configuration ?? undefined,
    };
  }
}
