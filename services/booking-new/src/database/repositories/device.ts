import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

import { Device } from '../../clients/device/types.js';
import * as clients from '../../clients/index.js';
import { config } from '../../config.js';
import { DeviceModel } from '../model.js';
import { ReservationRepository } from './reservation.js';

type DeviceRepositoryDependencies = {
  reservation: ReservationRepository;
};

export class DeviceRepository extends AbstractRepository<
  DeviceModel,
  {
    id: string;
    essential: boolean;
    device: Device<'response'>;
  },
  undefined,
  DeviceRepositoryDependencies
> {
  protected dependencies: Partial<DeviceRepositoryDependencies> = {};

  constructor() {
    super('Device');
  }

  protected dependenciesMet(): boolean {
    if (!this.dependencies.reservation) return false;

    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(DeviceModel);
  }

  async create(data: {
    id: string;
    essential: boolean;
    device: Device<'response'>;
  }): Promise<DeviceModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const model = this.repository.create();
    model.id = data.id;
    model.url = data.device.url;
    model.type = data.device.type;
    model.essential = data.essential;

    await clients.device.updateDevice(
      data.device.type,
      { type: data.device.type },
      {
        changedUrl: `${config.BASE_URL}/callbacks/booking`,
        deletedUrl: `${config.BASE_URL}/callbacks/booking`,
      },
    );

    return model;
  }

  async write(
    _model: DeviceModel,
    _data: Partial<{
      id: string;
      essential: boolean;
      device: Device<'response'>;
    }>,
  ) {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    throw new Error('Method not implemented.');
  }

  async remove(model: DeviceModel): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    await this.repository.remove(model);

    if (model.reservation) {
      await this.dependencies.reservation.remove(model.reservation);
    }
  }

  async save(model: DeviceModel): Promise<DeviceModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    if (model.reservation) {
      await this.dependencies.reservation.save(model.reservation);
    }

    return await this.repository.save(model);
  }

  async format(_model: DeviceModel): Promise<undefined> {
    return undefined;
  }

  protected getDefaultFindOptionsRelations():
    | FindOptionsRelations<DeviceModel>
    | undefined {
    return {
      reservation: true,
    };
  }
}
