import {
    InstantiableBrowserDevice,
    InstantiableBrowserDeviceUpdate,
} from '../../../generated/types';
import { InstantiableBrowserDeviceModel } from '../../model';
import { DeviceOverviewRepository } from './deviceOverview';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

export class InstantiableBrowserDeviceRepository extends AbstractRepository<
    InstantiableBrowserDeviceModel,
    InstantiableBrowserDevice<'request'>,
    InstantiableBrowserDevice<'response'>,
    { deviceOverview: DeviceOverviewRepository }
> {
    protected dependencies: { deviceOverview?: DeviceOverviewRepository } = {};

    constructor() {
        super('Instantiable Browser Device');
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.deviceOverview) return false;

        return true;
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(InstantiableBrowserDeviceModel);
    }

    async create(
        data?: InstantiableBrowserDevice<'request'>,
    ): Promise<InstantiableBrowserDeviceModel> {
        const model = await super.create(data);
        model.type = 'edge instantiable';
        return model;
    }

    async write(
        model: InstantiableBrowserDeviceModel,
        data: InstantiableBrowserDeviceUpdate<'request'>,
    ) {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        await this.dependencies.deviceOverview.write(model, data);

        if (data.codeUrl) model.codeUrl = data.codeUrl;
        if (data.services) model.services = data.services;
    }

    async format(
        model: InstantiableBrowserDeviceModel,
    ): Promise<InstantiableBrowserDevice<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        return {
            ...(await this.dependencies.deviceOverview.format(model)),
            type: 'edge instantiable',
            codeUrl: model.codeUrl,
            services: model.services ?? undefined,
        };
    }
}
