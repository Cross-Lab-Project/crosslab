import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import { DeviceModel } from '../../../src/database/model.js';
import { DeviceRepository } from '../../../src/database/repositories/device.js';
import { Device } from '../../../src/generated/types.js';
import { DeviceName } from '../../data/devices/index.spec.js';
import { initTestDatabase } from './index.spec.js';

class DeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
  DeviceName,
  DeviceRepository
> {
  protected name = 'devices' as const;
  protected repository = repositories.device;
  protected getEntityData = async () => (await initTestDatabase())['devices'];
  protected RepositoryClass = DeviceRepository;

  constructor() {
    super(AppDataSource);
  }

  validateCreate(model: DeviceModel, data?: Device<'request'>): boolean {
    if (!data) return true;

    assert(this.validateWrite(model, data));

    return true;
  }

  validateWrite(model: DeviceModel, data: Partial<Device<'request'>>): boolean {
    if (data.device) assert.strictEqual(model.url, data.device);
    if (data.role) assert.strictEqual(model.role, data.role);

    return true;
  }

  validateFormat(model: DeviceModel, data: Device<'response'>): boolean {
    assert.strictEqual(data.device, model.url);
    assert.strictEqual(data.role, model.role);

    return true;
  }

  compareModels(
    firstModel: DeviceModel,
    secondModel: DeviceModel,
    complete?: boolean,
  ): boolean {
    if (!complete) return firstModel.uuid === secondModel.uuid;

    assert.strictEqual(firstModel.experiment.uuid, secondModel.experiment.uuid);
    assert.strictEqual(firstModel.instance?.uuid, secondModel.instance?.uuid);
    assert.strictEqual(firstModel.role, secondModel.role);
    assert.strictEqual(firstModel.url, secondModel.url);
    assert.strictEqual(firstModel.uuid, secondModel.uuid);

    return true;
  }

  compareFormatted(first: Device<'response'>, second: Device<'response'>): boolean {
    assert.strictEqual(first.device, second.device);
    assert.strictEqual(first.role, second.role);

    return true;
  }

  getFindOptionsWhere(model?: DeviceModel): FindOptionsWhere<DeviceModel> {
    return {
      uuid: model ? model.uuid : 'non-existent',
    };
  }
}

export const deviceRepositoryTestSuite = new DeviceRepositoryTestSuite();
