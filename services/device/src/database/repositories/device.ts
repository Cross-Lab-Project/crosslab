import { Device, DeviceUpdate } from '../../generated/types';
import { DeviceModel } from '../model';
import { ConcreteDeviceRepository } from './device/concreteDevice';
import { DeviceGroupRepository } from './device/deviceGroup';
import { DeviceOverviewRepository } from './device/deviceOverview';
import { InstantiableBrowserDeviceRepository } from './device/instantiableBrowserDevice';
import { InstantiableCloudDeviceRepository } from './device/instantiableCloudDevice';
import { AbstractRepository, InvalidValueError } from '@crosslab/service-common';
import { EntityManager, FindManyOptions, FindOneOptions, In } from 'typeorm';

type DeviceRepositoryDependencies = {
    deviceOverview: DeviceOverviewRepository;
    concreteDevice: ConcreteDeviceRepository;
    deviceGroup: DeviceGroupRepository;
    instantiableBrowserDevice: InstantiableBrowserDeviceRepository;
    instantiableCloudDevice: InstantiableCloudDeviceRepository;
};

export class DeviceRepository extends AbstractRepository<
    DeviceModel,
    Device<'request'>,
    Device<'response'>,
    DeviceRepositoryDependencies
> {
    protected dependencies: Partial<DeviceRepositoryDependencies> = {};

    constructor() {
        super('Device');
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.deviceOverview) return false;
        if (!this.dependencies.concreteDevice) return false;
        if (!this.dependencies.deviceGroup) return false;
        if (!this.dependencies.instantiableBrowserDevice) return false;
        if (!this.dependencies.instantiableCloudDevice) return false;

        return true;
    }

    initialize(_entityManager: EntityManager): void {
        return;
    }

    /**
     * This function is used to replace the standard isInitialized()-method. Since we
     * don't have a repository for the type DeviceModel we don't want to falsely
     * claim that we have it and that it is initialized.
     */
    private _isInitialized(): this is {
        dependencies: Required<DeviceRepositoryDependencies>;
    } {
        if (!this.dependenciesMet()) return false;

        return true;
    }

    async create(data: Device<'request'>): Promise<DeviceModel> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        switch (data.type) {
            case 'cloud instantiable':
                return await this.dependencies.instantiableCloudDevice.create(data);
            case 'device':
                return await this.dependencies.concreteDevice.create(data);
            case 'edge instantiable':
                return await this.dependencies.instantiableBrowserDevice.create(data);
            case 'group':
                return await this.dependencies.deviceGroup.create(data);
        }
    }

    async write(model: DeviceModel, data: DeviceUpdate<'request'>): Promise<void> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        switch (model.type) {
            case 'cloud instantiable':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400,
                    );
                return await this.dependencies.instantiableCloudDevice.write(model, data);
            case 'device':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400,
                    );
                return await this.dependencies.concreteDevice.write(model, data);
            case 'edge instantiable':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400,
                    );
                return await this.dependencies.instantiableBrowserDevice.write(
                    model,
                    data,
                );
            case 'group':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400,
                    );
                return await this.dependencies.deviceGroup.write(model, data);
        }
    }

    async format(
        model: DeviceModel,
        options?: { flat_group?: boolean; execute_for?: string },
    ): Promise<Device<'response'>> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        switch (model.type) {
            case 'cloud instantiable':
                return await this.dependencies.instantiableCloudDevice.format(model);
            case 'device':
                return await this.dependencies.concreteDevice.format(model);
            case 'edge instantiable':
                return await this.dependencies.instantiableBrowserDevice.format(model);
            case 'group':
                return await this.dependencies.deviceGroup.format(model, options);
        }
    }

    async save(model: DeviceModel): Promise<DeviceModel> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        switch (model.type) {
            case 'cloud instantiable':
                return await this.dependencies.instantiableCloudDevice.save(model);
            case 'device':
                return await this.dependencies.concreteDevice.save(model);
            case 'edge instantiable':
                return await this.dependencies.instantiableBrowserDevice.save(model);
            case 'group':
                return await this.dependencies.deviceGroup.save(model);
        }
    }

    async find(
        options?: FindManyOptions<DeviceModel> | undefined,
    ): Promise<DeviceModel[]> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        const foundDevices = [];
        const deviceOverviews = await this.dependencies.deviceOverview.find(options);

        const deviceTypes = [
            'device',
            'group',
            'edge instantiable',
            'cloud instantiable',
        ] as const;

        const repositoryMapping = {
            device: this.dependencies.concreteDevice,
            group: this.dependencies.deviceGroup,
            'edge instantiable': this.dependencies.instantiableBrowserDevice,
            'cloud instantiable': this.dependencies.instantiableCloudDevice,
        } as const;

        for (const type of deviceTypes) {
            const devices = deviceOverviews.filter((device) => device.type === type);

            if (devices.length > 0) {
                foundDevices.push(
                    ...(await repositoryMapping[type].find({
                        where: {
                            uuid: In(
                                devices.map((concreteDevice) => concreteDevice.uuid),
                            ),
                        },
                    })),
                );
            }
        }

        return foundDevices;
    }

    async findOne(options: FindOneOptions<DeviceModel>): Promise<DeviceModel | null> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        const deviceOverview = await this.dependencies.deviceOverview.findOne(options);

        if (!deviceOverview) return null;

        switch (deviceOverview.type) {
            case 'cloud instantiable':
                return await this.dependencies.instantiableCloudDevice.findOne({
                    where: { uuid: deviceOverview.uuid },
                });
            case 'device':
                return await this.dependencies.concreteDevice.findOne({
                    where: { uuid: deviceOverview.uuid },
                });
            case 'edge instantiable':
                return await this.dependencies.instantiableBrowserDevice.findOne({
                    where: { uuid: deviceOverview.uuid },
                });
            case 'group':
                return await this.dependencies.deviceGroup.findOne({
                    where: { uuid: deviceOverview.uuid },
                });
        }
    }

    async findOneOrFail(options: FindOneOptions<DeviceModel>): Promise<DeviceModel> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        const deviceOverview = await this.dependencies.deviceOverview.findOneOrFail(
            options,
        );

        switch (deviceOverview.type) {
            case 'cloud instantiable':
                return await this.dependencies.instantiableCloudDevice.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                });
            case 'device':
                return await this.dependencies.concreteDevice.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                });
            case 'edge instantiable':
                return await this.dependencies.instantiableBrowserDevice.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                });
            case 'group':
                return await this.dependencies.deviceGroup.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                });
        }
    }

    async remove(model: DeviceModel): Promise<void> {
        if (!this._isInitialized()) this.throwUninitializedRepositoryError();

        switch (model.type) {
            case 'cloud instantiable':
                return await this.dependencies.instantiableCloudDevice.remove(model);
            case 'device':
                return await this.dependencies.concreteDevice.remove(model);
            case 'edge instantiable':
                return await this.dependencies.instantiableBrowserDevice.remove(model);
            case 'group':
                return await this.dependencies.deviceGroup.remove(model);
        }
    }
}
