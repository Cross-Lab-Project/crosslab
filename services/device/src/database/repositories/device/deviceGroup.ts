import {
    Device,
    DeviceGroup,
    DeviceGroupUpdate,
    DeviceReference,
} from '../../../generated/types.js';
import { apiClient } from '../../../globals.js';
import { deviceUrlFromId } from '../../../methods/urlFromId.js';
import { DeviceGroupModel } from '../../model.js';
import { DeviceOverviewRepository } from './deviceOverview.js';
import { AbstractRepository, logger } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

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

        await this.dependencies.deviceOverview.write(model, data);

        if (data.devices) model.devices = data.devices;
    }

    async format(
        model: DeviceGroupModel,
        options?: { flatGroup?: boolean; executeFor?: string },
    ): Promise<DeviceGroup<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        const devices: DeviceReference[] = options?.flatGroup
            ? await this.resolveDeviceGroup(
                  { ...model, url: deviceUrlFromId(model.uuid) },
                  [],
                  {
                      executeFor: options.executeFor,
                  },
              )
            : model.devices;

        return {
            ...(await this.dependencies.deviceOverview.format(model)),
            type: 'group',
            devices: devices.filter(
                (value, index, array) =>
                    array.findIndex((device) => device.url === value.url) === index,
            ),
        };
    }

    private async resolveDeviceGroup(
        deviceGroup: DeviceGroup,
        alreadyResolved: string[],
        options?: { executeFor?: string },
    ): Promise<Device[]> {
        alreadyResolved.push(deviceGroup.url);
        const devices: Device[] = [];

        for (const deviceReference of deviceGroup.devices) {
            const device = await this.resolveDeviceReference(deviceReference, options);

            if (!device) continue;

            if (device.type === 'group') {
                if (!alreadyResolved.includes(device.url))
                    devices.push(
                        ...(await this.resolveDeviceGroup(device, alreadyResolved)),
                    );
            } else {
                devices.push(device);
            }
        }

        return devices;
    }

    private async resolveDeviceReference(
        deviceReference: DeviceReference,
        options?: { executeFor?: string },
    ): Promise<Device | undefined> {
        try {
            return await apiClient.getDevice(deviceReference.url, {
                flat_group: false,
                headers: options?.executeFor
                    ? [['X-Request-Authentication', options?.executeFor]]
                    : [],
            });
        } catch (error) {
            logger.log(
                'error',
                'An error occured while trying to resolve a device reference',
                {
                    data: { error },
                },
            );
        }
        return undefined;
    }
}
