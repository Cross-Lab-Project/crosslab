import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import { ParticipantModel } from '../../../src/database/model.js';
import { ParticipantRepository } from '../../../src/database/repositories/participant.js';
import { Participant } from '../../../src/generated/types.js';
import { ParticipantName } from '../../data/participants/index.spec.js';
import { initTestDatabase } from './index.spec.js';
import { serviceConfigurationRepositoryTestSuite } from './serviceConfiguration.spec.js';

class ParticipantRepositoryTestSuite extends AbstractRepositoryTestSuite<
  ParticipantName,
  ParticipantRepository
> {
  protected name = 'participants' as const;
  protected repository = repositories.participant;
  protected getEntityData = async () => (await initTestDatabase())['participants'];
  protected RepositoryClass = ParticipantRepository;

  constructor() {
    super(AppDataSource);
  }

  validateCreate(model: ParticipantModel, data?: Participant<'request'>): boolean {
    if (!data) return true;

    assert(this.validateWrite(model, data));

    return true;
  }

  validateWrite(model: ParticipantModel, data: Partial<Participant<'request'>>): boolean {
    if (data.config)
      assert.strictEqual(JSON.stringify(model.config), JSON.stringify(data.config));
    if (data.role) assert.strictEqual(model.role, data.role);
    if (data.serviceId) assert.strictEqual(model.serviceId, data.serviceId);

    return true;
  }

  validateFormat(model: ParticipantModel, data: Participant<'response'>): boolean {
    assert.strictEqual(JSON.stringify(data.config), JSON.stringify(model.config));
    assert.strictEqual(data.role, model.role);
    assert.strictEqual(data.serviceId, model.serviceId);

    return true;
  }

  compareModels(
    firstModel: ParticipantModel,
    secondModel: ParticipantModel,
    complete?: boolean,
  ): boolean {
    if (!complete) return firstModel.uuid === secondModel.uuid;

    assert.strictEqual(
      JSON.stringify(firstModel.config),
      JSON.stringify(secondModel.config),
    );
    assert.strictEqual(firstModel.role, secondModel.role);
    assert(
      serviceConfigurationRepositoryTestSuite.compareModels(
        firstModel.serviceConfiguration,
        secondModel.serviceConfiguration,
      ),
    );
    assert.strictEqual(firstModel.serviceId, secondModel.serviceId);
    assert.strictEqual(firstModel.uuid, secondModel.uuid);

    return true;
  }

  compareFormatted(
    first: Participant<'response'>,
    second: Participant<'response'>,
  ): boolean {
    assert.strictEqual(JSON.stringify(first.config), JSON.stringify(second.config));
    assert.strictEqual(first.role, second.role);
    assert.strictEqual(first.serviceId, second.serviceId);

    return true;
  }

  getFindOptionsWhere(model?: ParticipantModel): FindOptionsWhere<ParticipantModel> {
    return {
      uuid: model ? model.uuid : 'non-existent',
    };
  }
}

export const participantRepositoryTestSuite = new ParticipantRepositoryTestSuite();
