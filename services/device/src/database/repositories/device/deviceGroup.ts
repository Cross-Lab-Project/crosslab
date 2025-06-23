import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import {
  DeviceGroup,
  DeviceGroupUpdate,
  DeviceReference,
} from '../../../generated/types.js';
import { DeviceGroupModel } from '../../model.js';
import { DeviceOverviewRepository } from './deviceOverview.js';

export class DeviceGroupRepository extends AbstractRepository<
  DeviceGroupModel,
  DeviceGroup<'request'>,
  DeviceGroup<'response'>,
  { deviceOverview: DeviceOverviewRepository }
> {
  protected dependencies: { deviceOverview?: DeviceOverviewRepository } = {};

  constructor() {
    super('Device Group');
  }

  protected dependenciesMet(): boolean {
    if (!this.dependencies.deviceOverview) return false;

    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(DeviceGroupModel);
  }

  async create(data?: DeviceGroup<'request'>): Promise<DeviceGroupModel> {
    const model = await super.create(data);
    model.type = 'group';
    return model;
  }

  async write(
    model: DeviceGroupModel,
    data: DeviceGroupUpdate<'request'>,
  ): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const {
      type: _type,
      description: _description,
      devices,
      isPublic: _isPublic,
      name: _name,
      owner: _owner,
      viewer: _viewer,
      ...additionalAttributes
    } = { ...model.additionalAttributes, ...data };

    await this.dependencies.deviceOverview.write(model, data);

    if (devices) model.devices = devices;

    model.additionalAttributes = additionalAttributes;
  }

  async format(model: DeviceGroupModel): Promise<DeviceGroup<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const devices: DeviceReference[] = model.devices;

    return {
      ...model.additionalAttributes,
      ...(await this.dependencies.deviceOverview.format(model)),
      type: 'group',
      devices: devices.filter(
        (value, index, array) =>
          array.findIndex(device => device.url === value.url) === index,
      ),
    };
  }
}
