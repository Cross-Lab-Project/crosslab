import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import {
  DeviceModel,
  ExperimentModel,
  InstanceModel,
} from '../../../src/database/model.js';
import { ExperimentRepository } from '../../../src/database/repositories/experiment.js';
import { Experiment, ExperimentOverview } from '../../../src/generated/types.js';
import { experimentUrlFromId } from '../../../src/methods/url.js';
import { ExperimentName } from '../../data/experiments/index.spec.js';
import { deviceRepositoryTestSuite } from './device.spec.js';
import { initTestDatabase } from './index.spec.js';
import { instanceRepositoryTestSuite } from './instance.spec.js';
import { peerconnectionRepositoryTestSuite } from './peerconnection.spec.js';
import { roleRepositoryTestSuite } from './role.spec.js';
import { serviceConfigurationRepositoryTestSuite } from './serviceConfiguration.spec.js';

class ExperimentRepositoryTestSuite extends AbstractRepositoryTestSuite<
  ExperimentName,
  ExperimentRepository
> {
  protected name = 'experiments' as const;
  protected repository = repositories.experiment;
  protected getEntityData = async () => (await initTestDatabase())['experiments'];
  protected RepositoryClass = ExperimentRepository;

  constructor() {
    super(AppDataSource);
  }

  validateCreate(model: ExperimentModel, data?: Experiment<'request'>): boolean {
    if (!data) return true;

    assert(this.validateWrite(model, data));

    return true;
  }

  validateWrite(model: ExperimentModel, data: Partial<Experiment<'request'>>): boolean {
    if (data.bookingTime?.startTime)
      assert.strictEqual(model.bookingStart, data.bookingTime.startTime);

    if (data.bookingTime?.endTime)
      assert.strictEqual(model.bookingEnd, data.bookingTime.endTime);

    if (data.devices) {
      assert.strictEqual(model.devices.length, data.devices.length);
      for (let i = 0; i < model.devices.length; i++) {
        assert(
          deviceRepositoryTestSuite.validateWrite(model.devices[i], data.devices[i]),
        );
      }
    }

    if (data.roles) {
      assert.strictEqual(model.roles.length, data.roles.length);
      for (let i = 0; i < model.roles.length; i++) {
        assert(roleRepositoryTestSuite.validateWrite(model.roles[i], data.roles[i]));
      }
    }

    if (data.serviceConfigurations) {
      assert.strictEqual(
        model.serviceConfigurations.length,
        data.serviceConfigurations.length,
      );
      for (let i = 0; i < model.serviceConfigurations.length; i++) {
        assert(
          serviceConfigurationRepositoryTestSuite.validateWrite(
            model.serviceConfigurations[i],
            data.serviceConfigurations[i],
          ),
        );
      }
    }

    if (data.status) {
      assert.strictEqual(model.status, data.status);
    }

    return true;
  }

  validateFormat(model: ExperimentModel, data: Experiment<'response'>): boolean {
    assert.strictEqual(data.bookingTime?.startTime, model.bookingStart ?? undefined);

    assert.strictEqual(data.bookingTime?.endTime, model.bookingEnd ?? undefined);

    assert.strictEqual(data.connections.length, model.connections.length);
    for (let i = 0; i < data.connections.length; i++) {
      assert(
        peerconnectionRepositoryTestSuite.validateFormat(
          model.connections[i],
          data.connections[i],
        ),
      );
    }

    assert.strictEqual(data.devices.length, model.devices.length);
    for (let i = 0; i < data.devices.length; i++) {
      assert(deviceRepositoryTestSuite.validateFormat(model.devices[i], data.devices[i]));
    }

    const modelInstantiatedDevices = (
      model.devices.filter(device => device.instance !== undefined) as (DeviceModel & {
        instance: InstanceModel;
      })[]
    ).map(device => device.instance);

    assert.strictEqual(data.instantiatedDevices.length, modelInstantiatedDevices.length);
    for (let i = 0; i < data.instantiatedDevices.length; i++) {
      assert(
        instanceRepositoryTestSuite.validateFormat(
          modelInstantiatedDevices[i],
          data.instantiatedDevices[i],
        ),
      );
    }

    assert.strictEqual(data.roles.length, model.roles.length);
    for (let i = 0; i < data.roles.length; i++) {
      assert(roleRepositoryTestSuite.validateFormat(model.roles[i], data.roles[i]));
    }

    assert.strictEqual(
      data.serviceConfigurations.length,
      model.serviceConfigurations.length,
    );
    for (let i = 0; i < data.serviceConfigurations.length; i++) {
      assert(
        serviceConfigurationRepositoryTestSuite.validateFormat(
          model.serviceConfigurations[i],
          data.serviceConfigurations[i],
        ),
      );
    }

    assert.strictEqual(data.status, model.status);

    assert.strictEqual(data.url, experimentUrlFromId(model.uuid));

    return true;
  }

  compareModels(
    firstModel: ExperimentModel,
    secondModel: ExperimentModel,
    complete?: boolean,
  ): boolean {
    if (!complete) return firstModel.uuid === secondModel.uuid;

    assert.strictEqual(firstModel.bookingEnd, secondModel.bookingEnd);

    assert.strictEqual(firstModel.bookingID, secondModel.bookingID);

    assert.strictEqual(firstModel.bookingStart, secondModel.bookingStart);

    assert.strictEqual(firstModel.connections.length, secondModel.connections.length);
    for (let i = 0; i < firstModel.connections.length; i++) {
      assert(
        peerconnectionRepositoryTestSuite.compareModels(
          firstModel.connections[i],
          secondModel.connections[i],
        ),
      );
    }

    assert.strictEqual(firstModel.deletedAt, secondModel.deletedAt);

    assert.strictEqual(firstModel.devices.length, secondModel.devices.length);
    for (let i = 0; i < firstModel.devices.length; i++) {
      assert(
        deviceRepositoryTestSuite.compareModels(
          firstModel.devices[i],
          secondModel.devices[i],
        ),
      );
    }

    assert.strictEqual(firstModel.roles.length, secondModel.roles.length);
    for (let i = 0; i < firstModel.roles.length; i++) {
      assert(
        roleRepositoryTestSuite.compareModels(firstModel.roles[i], secondModel.roles[i]),
      );
    }

    assert.strictEqual(
      firstModel.serviceConfigurations.length,
      secondModel.serviceConfigurations.length,
    );
    for (let i = 0; i < firstModel.serviceConfigurations.length; i++) {
      assert(
        serviceConfigurationRepositoryTestSuite.compareModels(
          firstModel.serviceConfigurations[i],
          secondModel.serviceConfigurations[i],
        ),
      );
    }

    assert.strictEqual(firstModel.status, secondModel.status);

    assert.strictEqual(firstModel.uuid, secondModel.uuid);

    return true;
  }

  compareFormatted(
    first: Experiment<'response'>,
    second: Experiment<'response'>,
  ): boolean {
    assert.strictEqual(first.bookingTime?.startTime, second.bookingTime?.startTime);

    assert.strictEqual(first.bookingTime?.endTime, second.bookingTime?.endTime);

    assert.strictEqual(first.connections.length, second.connections.length);
    for (let i = 0; i < first.connections.length; i++) {
      assert(
        peerconnectionRepositoryTestSuite.compareFormatted(
          first.connections[i],
          second.connections[i],
        ),
      );
    }

    assert.strictEqual(first.devices.length, second.devices.length);
    for (let i = 0; i < first.devices.length; i++) {
      assert(
        deviceRepositoryTestSuite.compareFormatted(first.devices[i], second.devices[i]),
      );
    }

    assert.strictEqual(
      first.instantiatedDevices.length,
      second.instantiatedDevices.length,
    );
    for (let i = 0; i < first.instantiatedDevices.length; i++) {
      assert(
        instanceRepositoryTestSuite.compareFormatted(
          first.instantiatedDevices[i],
          second.instantiatedDevices[i],
        ),
      );
    }

    assert.strictEqual(first.roles.length, second.roles.length);
    for (let i = 0; i < first.roles.length; i++) {
      assert(roleRepositoryTestSuite.compareFormatted(first.roles[i], second.roles[i]));
    }

    assert.strictEqual(
      first.serviceConfigurations.length,
      second.serviceConfigurations.length,
    );
    for (let i = 0; i < first.serviceConfigurations.length; i++) {
      assert(
        serviceConfigurationRepositoryTestSuite.compareFormatted(
          first.serviceConfigurations[i],
          second.serviceConfigurations[i],
        ),
      );
    }

    assert.strictEqual(first.status, second.status);

    assert.strictEqual(first.url, second.url);

    return true;
  }

  validateFormatOverview(
    model: ExperimentModel,
    data: ExperimentOverview<'response'>,
  ): boolean {
    if (
      model.status === 'booking-locked' ||
      model.status === 'devices-instantiated' ||
      model.status === 'booking-updated' ||
      model.status === 'peerconnections-created'
    ) {
      assert.strictEqual(data.status, 'setup');
    } else {
      assert.strictEqual(data.status, model.status);
    }

    assert.strictEqual(data.url, experimentUrlFromId(model.uuid));

    return true;
  }

  compareFormattedOverview(
    first: ExperimentOverview<'response'>,
    second: ExperimentOverview<'response'>,
  ): boolean {
    assert.strictEqual(first.status, second.status);
    assert.strictEqual(first.url, second.url);

    return true;
  }

  getFindOptionsWhere(model?: ExperimentModel): FindOptionsWhere<ExperimentModel> {
    return {
      uuid: model ? model.uuid : 'non-existent',
    };
  }
}

export const experimentRepositoryTestSuite = new ExperimentRepositoryTestSuite();
