import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import { PeerconnectionModel } from '../../../src/database/model.js';
import { PeerconnectionRepository } from '../../../src/database/repositories/peerconnection.js';
import { PeerconnectionName } from '../../data/peerconnections/index.spec.js';
import { experimentRepositoryTestSuite } from './experiment.spec.js';
import { initTestDatabase } from './index.spec.js';

class PeerconnectionRepositoryTestSuite extends AbstractRepositoryTestSuite<
  PeerconnectionName,
  PeerconnectionRepository
> {
  protected name = 'peerconnections' as const;
  protected repository = repositories.peerconnection;
  protected getEntityData = async () => (await initTestDatabase())['peerconnections'];
  protected RepositoryClass = PeerconnectionRepository;

  constructor() {
    super(AppDataSource);
  }

  validateCreate(model: PeerconnectionModel, data?: string): boolean {
    if (!data) return true;

    assert(this.validateWrite(model, data));

    return true;
  }

  validateWrite(model: PeerconnectionModel, data: string): boolean {
    assert.strictEqual(model.url, data);

    return true;
  }

  validateFormat(model: PeerconnectionModel, data: string): boolean {
    assert.strictEqual(data, model.url);

    return true;
  }

  compareModels(
    firstModel: PeerconnectionModel,
    secondModel: PeerconnectionModel,
    complete?: boolean,
  ): boolean {
    if (!complete) return firstModel.url === secondModel.url;

    assert(
      experimentRepositoryTestSuite.compareModels(
        firstModel.experiment,
        secondModel.experiment,
      ),
    );
    assert.strictEqual(firstModel.url, secondModel.url);

    return true;
  }

  compareFormatted(first: string, second: string): boolean {
    assert.strictEqual(first, second);

    return true;
  }

  getFindOptionsWhere(
    model?: PeerconnectionModel,
  ): FindOptionsWhere<PeerconnectionModel> {
    return {
      url: model ? model.url : 'non-existent',
    };
  }
}

export const peerconnectionRepositoryTestSuite = new PeerconnectionRepositoryTestSuite();
