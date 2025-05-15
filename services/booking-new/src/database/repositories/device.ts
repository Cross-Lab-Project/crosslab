import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

import { Device } from '../../clients/device/types.js';
import { DeviceModel } from '../model.js';
import { ReservationRepository } from './reservation.js';

type DeviceRepositoryDependencies = {
  reservation: ReservationRepository;
};

export class DeviceRepository extends AbstractRepository<
  DeviceModel,
  Device & { essential: boolean },
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

  async create(data: Device<'response'> & { essential: boolean }): Promise<DeviceModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const model = this.repository.create();
    model.url = data.url;
    model.type = data.type;
    model.essential = data.essential;

    return model;
  }

  async write(
    _model: DeviceModel,
    _data: Partial<Device<'response'> & { essential: boolean }>,
  ) {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    throw new Error('Method not implemented.');
  }

  async remove(model: DeviceModel): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    await this.repository.remove(model);

    await this.dependencies.reservation.remove(model.reservation);
  }

  async save(model: DeviceModel): Promise<DeviceModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    await this.dependencies.reservation.save(model.reservation);

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
