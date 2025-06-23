import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import {
  InstantiableCloudDevice,
  InstantiableCloudDeviceUpdate,
} from '../../../generated/types.js';
import { InstantiableCloudDeviceModel } from '../../model.js';
import { DeviceOverviewRepository } from './deviceOverview.js';

export class InstantiableCloudDeviceRepository extends AbstractRepository<
  InstantiableCloudDeviceModel,
  InstantiableCloudDevice<'request'>,
  InstantiableCloudDevice<'response'>,
  { deviceOverview: DeviceOverviewRepository }
> {
  protected dependencies: { deviceOverview?: DeviceOverviewRepository } = {};

  constructor() {
    super('Instantiable Cloud Device');
  }

  protected dependenciesMet(): boolean {
    if (!this.dependencies.deviceOverview) return false;

    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(InstantiableCloudDeviceModel);
  }

  async create(
    data?: InstantiableCloudDevice<'request'>,
  ): Promise<InstantiableCloudDeviceModel> {
    const model = await super.create(data);
    model.type = 'cloud instantiable';
    return model;
  }

  async write(
    model: InstantiableCloudDeviceModel,
    data: InstantiableCloudDeviceUpdate<'request'>,
  ) {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const {
      type: _type,
      description: _description,
      instantiateUrl,
      isPublic: _isPublic,
      name: _name,
      owner: _owner,
      services,
      viewer: _viewer,
      ...additionalAttributes
    } = { ...model.additionalAttributes, ...data };

    await this.dependencies.deviceOverview.write(model, data);

    if (instantiateUrl) model.instantiateUrl = instantiateUrl;
    if (services) model.services = services;

    model.additionalAttributes = additionalAttributes;
  }

  async format(
    model: InstantiableCloudDeviceModel,
  ): Promise<InstantiableCloudDevice<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    return {
      ...model.additionalAttributes,
      ...(await this.dependencies.deviceOverview.format(model)),
      type: 'cloud instantiable',
      instantiateUrl: model.instantiateUrl,
      services: model.services ?? undefined,
    };
  }
}
