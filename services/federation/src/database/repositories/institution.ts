import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { Institution } from '../../generated/types.js';
import { institutionUrlFromId } from '../../methods/utils.js';
import { InstitutionModel } from '../model.js';

export class InstitutionRepository extends AbstractRepository<
  InstitutionModel,
  Institution<'request'>,
  Institution<'response'>
> {
  protected dependencies: Partial<Record<string, never>> = {};

  constructor() {
    super('Institution');
  }

  protected dependenciesMet(): boolean {
    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(InstitutionModel);
  }

  async write(
    model: InstitutionModel,
    data: Partial<Institution<'request'>>,
  ): Promise<void> {
    if (data.api) model.api = data.api;
    if (data.name) model.name = data.name;
    if (data.homepage) model.homepage = data.homepage;
    if (data.apiToken) model.apiToken = data.apiToken;
  }

  async format(model: InstitutionModel): Promise<Institution<'response'>> {
    return {
      url: institutionUrlFromId(model.uuid), // NOTE: not defined in openAPI definition
      api: model.api,
      name: model.name,
      homepage: model.homepage,
    };
  }
}
