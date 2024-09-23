import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { ConcreteDevice, ConcreteDeviceUpdate } from '../../../generated/types.js';
import { ConcreteDeviceModel } from '../../model.js';
import { DeviceOverviewRepository } from './deviceOverview.js';

export class ConcreteDeviceRepository extends AbstractRepository<
  ConcreteDeviceModel,
  ConcreteDevice<'request'>,
  ConcreteDevice<'response'>,
  { deviceOverview: DeviceOverviewRepository }
> {
  protected dependencies: { deviceOverview?: DeviceOverviewRepository } = {};

  constructor() {
    super('Concrete Device');
  }

  protected dependenciesMet(): boolean {
    if (!this.dependencies.deviceOverview) return false;

    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(ConcreteDeviceModel);
  }

  async create(data?: ConcreteDevice<'request'>): Promise<ConcreteDeviceModel> {
    const model = await super.create(data);
    model.type = 'device';
    model.announcedAvailability = [];
    model.availabilityRules = [];
    model.connected = false;
    model.services ??= [];
    return model;
  }

  async write(
    model: ConcreteDeviceModel,
    data: ConcreteDeviceUpdate<'request'>,
  ): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const {
      type: _type,
      description: _description,
      experiment,
      isPublic: _isPublic,
      name: _name,
      owner: _owner,
      services,
      viewer: _viewer,
      ...additionalAttributes
    } = { ...model.additionalAttributes, ...data };

    await this.dependencies.deviceOverview.write(model, data);
    if (experiment) model.experiment = experiment;
    if (services) model.services = services;

    model.additionalAttributes = additionalAttributes;
  }

  async format(model: ConcreteDeviceModel): Promise<ConcreteDevice<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    return {
      ...model.additionalAttributes,
      ...(await this.dependencies.deviceOverview.format(model)),
      type: 'device',
      announcedAvailability: model.announcedAvailability,
      connected: model.connected,
      experiment: model.experiment ?? undefined,
      services: model.services,
    };
  }
}
