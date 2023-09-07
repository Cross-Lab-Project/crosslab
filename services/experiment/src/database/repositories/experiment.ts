import { Experiment, ExperimentOverview } from '../../generated/types.js';
import { experimentUrlFromId } from '../../methods/url.js';
import { Instance } from '../../types/types.js';
import { ExperimentModel } from '../model.js';
import { DeviceRepository } from './device.js';
import { PeerconnectionRepository } from './peerconnection.js';
import { RoleRepository } from './role.js';
import { ServiceConfigurationRepository } from './serviceConfiguration.js';
import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

type ExperimentRepositoryDependencies = {
    device: DeviceRepository;
    peerconnection: PeerconnectionRepository;
    role: RoleRepository;
    serviceConfiguration: ServiceConfigurationRepository;
};

export class ExperimentRepository extends AbstractRepository<
    ExperimentModel,
    Experiment<'request'>,
    Experiment<'response'>,
    ExperimentRepositoryDependencies
> {
    protected dependencies: Partial<ExperimentRepositoryDependencies> = {};

    constructor() {
        super('Experiment');
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.device) return false;
        if (!this.dependencies.peerconnection) return false;
        if (!this.dependencies.role) return false;
        if (!this.dependencies.serviceConfiguration) return false;

        return true;
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(ExperimentModel);
    }

    async create(data?: Experiment<'request'>): Promise<ExperimentModel> {
        const model = await super.create(data);
        model.status = 'created';
        return model;
    }

    async write(
        model: ExperimentModel,
        data: Partial<Experiment<'request'>>,
    ): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        if (data.status) model.status = data.status;

        if (data.bookingTime) {
            if (data.bookingTime.startTime)
                model.bookingStart = data.bookingTime.startTime;
            if (data.bookingTime.endTime) model.bookingEnd = data.bookingTime.endTime;
        } else {
            const HOUR = 60 * 60 * 1000;
            const startTime = Date.now();
            const endTime = startTime + HOUR;
            model.bookingStart ??= new Date(startTime).toISOString();
            model.bookingEnd ??= new Date(endTime).toISOString();
        }

        if (data.devices) {
            for (const device of model.devices ?? []) {
                const foundDevice = data.devices.find((d) => d.device === device.url);
                if (!foundDevice) await this.dependencies.device.remove(device);
                else device.role = foundDevice.role;
            }
            model.devices ??= [];
            for (const device of data.devices) {
                const foundDevice = model.devices?.find((d) => d.url === device.url);
                if (foundDevice) continue;
                const deviceModel = await this.dependencies.device.create(device);
                model.devices.push(deviceModel);
            }
        }

        if (data.roles) {
            for (const role of model.roles ?? []) {
                await this.dependencies.role.remove(role);
            }
            model.roles = [];
            for (const role of data.roles) {
                const roleModel = await this.dependencies.role.create(role);
                model.roles.push(roleModel);
            }
        }

        if (data.serviceConfigurations) {
            for (const serviceConfiguration of model.serviceConfigurations ?? []) {
                await this.dependencies.serviceConfiguration.remove(serviceConfiguration);
            }
            model.serviceConfigurations = [];
            for (const serviceConfiguration of data.serviceConfigurations) {
                const serviceConfigurationModel =
                    await this.dependencies.serviceConfiguration.create(
                        serviceConfiguration,
                    );
                model.serviceConfigurations.push(serviceConfigurationModel);
            }
        }
    }

    async format(model: ExperimentModel): Promise<Experiment<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        const deviceRepository = this.dependencies.device;
        const peerconnectionRepository = this.dependencies.peerconnection;
        const roleRepository = this.dependencies.role;
        const serviceConfigurationRepository = this.dependencies.serviceConfiguration;

        const instantiatedDevices: (Instance & {
            instanceOf: string;
            codeUrl: string;
        })[] = [];
        for (const device of model.devices ?? []) {
            if (device.instance && device.instance.codeUrl)
                instantiatedDevices.push({
                    url: device.instance.url,
                    token: device.instance.token,
                    instanceOf: device.url,
                    codeUrl: device.instance.codeUrl,
                });
        }

        return {
            ...(await this.formatOverview(model)),
            bookingTime: {
                startTime: model.bookingStart ?? undefined,
                endTime: model.bookingEnd ?? undefined,
            },
            devices: await Promise.all(model.devices?.map(deviceRepository.format) ?? []),
            roles: await Promise.all(model.roles?.map(roleRepository.format) ?? []),
            connections: await Promise.all(
                model.connections?.map(peerconnectionRepository.format) ?? [],
            ),
            serviceConfigurations: await Promise.all(
                model.serviceConfigurations?.map((serviceConfiguration) =>
                    serviceConfigurationRepository.format(serviceConfiguration),
                ) ?? [],
            ),
            instantiatedDevices,
        };
    }

    async remove(model: ExperimentModel): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        const deviceRepository = this.dependencies.device;
        const peerconnectionRepository = this.dependencies.peerconnection;
        const roleRepository = this.dependencies.role;
        const serviceConfigurationRepository = this.dependencies.serviceConfiguration;

        await Promise.all([
            ...model.connections.map((connection) =>
                peerconnectionRepository.remove(connection),
            ),
        ]);

        await Promise.all([
            ...model.devices.map((device) => deviceRepository.remove(device)),
        ]);

        await Promise.all([...model.roles.map((role) => roleRepository.remove(role))]);

        await Promise.all([
            ...model.serviceConfigurations.map((serviceConfiguration) =>
                serviceConfigurationRepository.remove(serviceConfiguration),
            ),
        ]);

        await super.remove(model);
    }

    async formatOverview(
        model: ExperimentModel,
    ): Promise<ExperimentOverview<'response'>> {
        return {
            url: experimentUrlFromId(model.uuid),
            status:
                model.status === 'booking-locked'
                    ? 'setup'
                    : model.status === 'devices-instantiated'
                    ? 'setup'
                    : model.status === 'booking-updated'
                    ? 'setup'
                    : model.status === 'peerconnections-created'
                    ? 'setup'
                    : model.status,
        };
    }

    async softRemove(model: ExperimentModel): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError();

        await this.repository.softRemove(model);
    }

    protected getDefaultFindOptionsRelations():
        | FindOptionsRelations<ExperimentModel>
        | undefined {
        return {
            connections: true,
            devices: {
                instance: true,
            },
            roles: true,
            serviceConfigurations: {
                participants: true,
            },
        };
    }
}
