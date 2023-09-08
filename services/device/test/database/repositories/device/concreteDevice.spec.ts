import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource, repositories } from '../../../../src/database/dataSource';
import { ConcreteDeviceModel } from '../../../../src/database/model';
import { ConcreteDeviceRepository } from '../../../../src/database/repositories/device/concreteDevice';
import { ConcreteDevice, ConcreteDeviceUpdate } from '../../../../src/generated/types';
import { ConcreteDeviceName } from '../../../data/devices/concreteDevices/index.spec';
import { initTestDatabase } from '../index.spec';
import { DeviceOverviewRepositoryTestSuite } from './deviceOverview.spec.js';

class ConcreteDeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
  ConcreteDeviceName,
  ConcreteDeviceRepository
> {
  protected name = 'concrete devices' as const;
  protected repository = repositories.concreteDevice;
  protected getEntityData = async () => (await initTestDatabase())['concrete devices'];
  protected RepositoryClass = ConcreteDeviceRepository;

  constructor() {
    super(AppDataSource);
  }

  validateCreate(model: ConcreteDeviceModel, data?: ConcreteDevice<'request'>): boolean {
    if (!data) return true;

    assert(DeviceOverviewRepositoryTestSuite.validateCreate(model, data));
    assert(this.validateWrite(model, data));

    return true;
  }

  validateWrite(
    model: ConcreteDeviceModel,
    data: ConcreteDeviceUpdate<'request'>,
  ): boolean {
    assert(DeviceOverviewRepositoryTestSuite.validateWrite(model, data));
    if (data.experiment) assert(model.experiment === data.experiment);
    if (data.services)
      assert(JSON.stringify(model.services) === JSON.stringify(data.services));

    return true;
  }

  validateFormat(model: ConcreteDeviceModel, data: ConcreteDevice<'response'>): boolean {
    assert(DeviceOverviewRepositoryTestSuite.validateFormat(model, data));
    assert(data.connected === (model.connected ?? false));
    assert(data.experiment === (model.experiment ?? undefined));
    assert(JSON.stringify(data.services) === JSON.stringify(model.services ?? undefined));
    assert(
      JSON.stringify(model.announcedAvailability) ===
        JSON.stringify(data.announcedAvailability),
    );

    return true;
  }

  compareModels(
    firstModel: ConcreteDeviceModel,
    secondModel: ConcreteDeviceModel,
    complete?: boolean,
  ): boolean {
    const sameId = firstModel.uuid === secondModel.uuid;

    if (!complete) return sameId;

    assert(DeviceOverviewRepositoryTestSuite.compareModels(firstModel, secondModel));
    assert(
      JSON.stringify(firstModel.announcedAvailability) ===
        JSON.stringify(secondModel.announcedAvailability),
    );
    assert(
      JSON.stringify(firstModel.availabilityRules) ===
        JSON.stringify(secondModel.availabilityRules),
    );
    assert(firstModel.connected === secondModel.connected);
    assert(firstModel.experiment === secondModel.experiment);
    assert(firstModel.instanceOf?.uuid === secondModel.instanceOf?.uuid);
    assert(JSON.stringify(firstModel.services) === JSON.stringify(secondModel.services));
    assert(firstModel.token === secondModel.token);

    return true;
  }

  compareFormatted(
    first: ConcreteDevice<'response'>,
    second: ConcreteDevice<'response'>,
  ): boolean {
    let isEqual = true;

    isEqual &&= DeviceOverviewRepositoryTestSuite.compareFormatted(first, second);
    isEqual &&=
      JSON.stringify(first.announcedAvailability) ===
      JSON.stringify(second.announcedAvailability);
    isEqual &&= first.connected === second.connected;
    isEqual &&= first.experiment === second.experiment;
    isEqual &&= JSON.stringify(first.services) === JSON.stringify(second.services);

    return isEqual;
  }

  getFindOptionsWhere(
    model?: ConcreteDeviceModel,
  ): FindOptionsWhere<ConcreteDeviceModel> {
    return {
      uuid: model ? model.uuid : 'non-existent',
    };
  }
}

export const concreteDeviceRepositoryTestSuite = new ConcreteDeviceRepositoryTestSuite();
