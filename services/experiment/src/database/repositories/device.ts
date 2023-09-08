import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

import { Device } from '../../generated/types.js';
import { AppDataSource } from '../dataSource.js';
import { DeviceModel } from '../model.js';
import { InstanceRepository } from './instance.js';

export class DeviceRepository extends AbstractRepository<
  DeviceModel,
  Device<'request'>,
  Device<'response'>,
  { instance: InstanceRepository }
> {
  protected dependencies: Partial<{ instance: InstanceRepository }> = {};

  constructor() {
    super('Device');
  }

  protected dependenciesMet(): boolean {
    if (!this.dependencies.instance) return false;

    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(DeviceModel);
  }

  async write(model: DeviceModel, data: Partial<Device<'request'>>): Promise<void> {
    if (data.device) model.url = data.device;
    if (data.role) model.role = data.role;
  }

  async format(model: DeviceModel): Promise<Device<'response'>> {
    return {
      device: model.url,
      role: model.role,
    };
  }

  async remove(model: DeviceModel): Promise<void> {
    if (model.instance)
      await AppDataSource.transaction(async repositories => {
        const instance = model.instance;
        delete model.instance;
        await repositories.device.remove(model);
        if (instance) await repositories.instance.remove(instance);
      });
    else await super.remove(model);
  }

  protected getDefaultFindOptionsRelations():
    | FindOptionsRelations<DeviceModel>
    | undefined {
    return {
      instance: true,
    };
  }
}
