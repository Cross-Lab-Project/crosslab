import {
    InstantiableCloudDevice,
    InstantiableCloudDeviceUpdate,
} from '../../../generated/types.js';
import { InstantiableCloudDeviceModel } from '../../model.js';
import { DeviceOverviewRepository } from './deviceOverview.js';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

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

        await this.dependencies.deviceOverview.write(model, data);

        if (data.instantiateUrl) model.instantiateUrl = data.instantiateUrl;
        if (data.services) model.services = data.services;
    }

    async format(
        model: InstantiableCloudDeviceModel,
    ): Promise<InstantiableCloudDevice<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        return {
            ...(await this.dependencies.deviceOverview.format(model)),
            type: 'cloud instantiable',
            instantiateUrl: model.instantiateUrl,
            services: model.services ?? undefined,
        };
    }
}
