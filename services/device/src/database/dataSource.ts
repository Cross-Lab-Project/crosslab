import { dataSourceConfig } from '../config'
import { DeviceRepository } from './repositories/device'
import { ConcreteDeviceRepository } from './repositories/device/concreteDevice'
import { DeviceGroupRepository } from './repositories/device/deviceGroup'
import { DeviceOverviewRepository } from './repositories/device/deviceOverview'
import { InstantiableBrowserDeviceRepository } from './repositories/device/instantiableBrowserDevice'
import { InstantiableCloudDeviceRepository } from './repositories/device/instantiableCloudDevice'
import { PeerconnectionRepository } from './repositories/peerconnection'
import { AbstractApplicationDataSource } from '@crosslab/service-common'

type RepositoryMapping = {
    device: DeviceRepository
    deviceOverview: DeviceOverviewRepository
    concreteDevice: ConcreteDeviceRepository
    deviceGroup: DeviceGroupRepository
    instantiableBrowserDevice: InstantiableBrowserDeviceRepository
    instantiableCloudDevice: InstantiableCloudDeviceRepository
    peerconnection: PeerconnectionRepository
}

class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
    protected createRepositories(): RepositoryMapping {
        const deviceOverviewRepository = new DeviceOverviewRepository()
        const concreteDeviceRepository = new ConcreteDeviceRepository()
        const deviceGroupRepository = new DeviceGroupRepository()
        const instantiableBrowserDeviceRepository =
            new InstantiableBrowserDeviceRepository()
        const instantiableCloudDeviceRepository = new InstantiableCloudDeviceRepository()

        const deviceRepository = new DeviceRepository()
        const peerconnectionRepository = new PeerconnectionRepository()

        concreteDeviceRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        })
        deviceGroupRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        })
        instantiableBrowserDeviceRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        })
        instantiableCloudDeviceRepository.setDependencies({
            deviceOverview: deviceOverviewRepository,
        })
        deviceRepository.setDependencies({
            concreteDevice: concreteDeviceRepository,
            deviceGroup: deviceGroupRepository,
            deviceOverview: deviceOverviewRepository,
            instantiableBrowserDevice: instantiableBrowserDeviceRepository,
            instantiableCloudDevice: instantiableCloudDeviceRepository,
        })

        return {
            device: deviceRepository,
            deviceOverview: deviceOverviewRepository,
            concreteDevice: concreteDeviceRepository,
            deviceGroup: deviceGroupRepository,
            instantiableBrowserDevice: instantiableBrowserDeviceRepository,
            instantiableCloudDevice: instantiableCloudDeviceRepository,
            peerconnection: peerconnectionRepository,
        }
    }
}

export const AppDataSource = new ApplicationDataSource(dataSourceConfig)
export const repositories = AppDataSource.repositories
export const dataSource = AppDataSource.dataSource
