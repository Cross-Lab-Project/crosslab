import { config } from '../config.js';
import { DeviceRepository } from './repositories/device.js';
import { ConcreteDeviceRepository } from './repositories/device/concreteDevice.js';
import { DeviceGroupRepository } from './repositories/device/deviceGroup.js';
import { DeviceOverviewRepository } from './repositories/device/deviceOverview.js';
import { InstantiableBrowserDeviceRepository } from './repositories/device/instantiableBrowserDevice.js';
import { InstantiableCloudDeviceRepository } from './repositories/device/instantiableCloudDevice.js';
import { PeerconnectionRepository } from './repositories/peerconnection.js';
import { AbstractApplicationDataSource } from '@crosslab/service-common';

type RepositoryMapping = {
    device: DeviceRepository;
    deviceOverview: DeviceOverviewRepository;
    concreteDevice: ConcreteDeviceRepository;
    deviceGroup: DeviceGroupRepository;
    instantiableBrowserDevice: InstantiableBrowserDeviceRepository;
    instantiableCloudDevice: InstantiableCloudDeviceRepository;
    peerconnection: PeerconnectionRepository;
};

class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
    protected createRepositories(): RepositoryMapping {
        const deviceOverviewRepository = new DeviceOverviewRepository();
        const concreteDeviceRepository = new ConcreteDeviceRepository();
        const deviceGroupRepository = new DeviceGroupRepository();
        const instantiableBrowserDeviceRepository =
            new InstantiableBrowserDeviceRepository();
        const instantiableCloudDeviceRepository = new InstantiableCloudDeviceRepository();

        const deviceRepository = new DeviceRepository();
        const peerconnectionRepository = new PeerconnectionRepository();

        concreteDeviceRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        });
        deviceGroupRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        });
        instantiableBrowserDeviceRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        });
        instantiableCloudDeviceRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        });
        deviceRepository.setDependencies({
            concreteDevice: concreteDeviceRepository,
            deviceGroup: deviceGroupRepository,
            deviceOverview: deviceOverviewRepository,
            instantiableBrowserDevice: instantiableBrowserDeviceRepository,
            instantiableCloudDevice: instantiableCloudDeviceRepository,
        });

        return {
            device: deviceRepository,
            deviceOverview: deviceOverviewRepository,
            concreteDevice: concreteDeviceRepository,
            deviceGroup: deviceGroupRepository,
            instantiableBrowserDevice: instantiableBrowserDeviceRepository,
            instantiableCloudDevice: instantiableCloudDeviceRepository,
            peerconnection: peerconnectionRepository,
        };
    }
}

export const AppDataSource = new ApplicationDataSource(config.orm);
export const repositories = AppDataSource.repositories;
export const dataSource = AppDataSource.dataSource;
