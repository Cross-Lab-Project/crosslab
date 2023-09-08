import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import { RoleModel } from '../../../src/database/model.js';
import { RoleRepository } from '../../../src/database/repositories/role.js';
import { Role } from '../../../src/generated/types.js';
import { RoleName } from '../../data/roles/index.spec.js';
import { experimentRepositoryTestSuite } from './experiment.spec.js';
import { initTestDatabase } from './index.spec.js';

class RoleRepositoryTestSuite extends AbstractRepositoryTestSuite<
  RoleName,
  RoleRepository
> {
  protected name = 'roles' as const;
  protected repository = repositories.role;
  protected getEntityData = async () => (await initTestDatabase())['roles'];
  protected RepositoryClass = RoleRepository;

  constructor() {
    super(AppDataSource);
  }

  validateCreate(model: RoleModel, data?: Role<'request'>): boolean {
    if (!data) return true;

    assert(this.validateWrite(model, data));

    return true;
  }

  validateWrite(model: RoleModel, data: Partial<Role<'request'>>): boolean {
    if (data.description) assert.strictEqual(model.description, data.description);
    if (data.name) assert.strictEqual(model.name, data.name);

    return true;
  }

  validateFormat(model: RoleModel, data: Role<'response'>): boolean {
    assert.strictEqual(data.description, model.description);
    assert.strictEqual(data.name, model.name);

    return true;
  }

  compareModels(
    firstModel: RoleModel,
    secondModel: RoleModel,
    complete?: boolean,
  ): boolean {
    if (!complete) return firstModel.uuid === secondModel.uuid;

    assert.strictEqual(firstModel.description, secondModel.description);
    assert(
      experimentRepositoryTestSuite.compareModels(
        firstModel.experiment,
        secondModel.experiment,
      ),
    );
    assert.strictEqual(firstModel.name, secondModel.name);
    assert.strictEqual(firstModel.uuid, secondModel.uuid);

    return true;
  }

  compareFormatted(first: Role<'response'>, second: Role<'response'>): boolean {
    assert.strictEqual(first.description, second.description);
    assert.strictEqual(first.name, second.name);

    return true;
  }

  getFindOptionsWhere(model?: RoleModel): FindOptionsWhere<RoleModel> {
    return {
      uuid: model ? model.uuid : 'non-existent',
    };
  }
}

export const roleRepositoryTestSuite = new RoleRepositoryTestSuite();
