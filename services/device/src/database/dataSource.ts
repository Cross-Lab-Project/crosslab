import { deviceRepository } from './repositories/device'
import { concreteDeviceRepository } from './repositories/device/concreteDevice'
import { deviceGroupRepository } from './repositories/device/deviceGroup'
import { instantiableBrowserDeviceRepository } from './repositories/device/instantiableBrowserDevice'
import { instantiableCloudDeviceRepository } from './repositories/device/instantiableCloudDevice'
import { peerconnectionRepository } from './repositories/peerconnection'
import { AbstractApplicationDataSource } from '@crosslab/service-common'

class ApplicationDataSource extends AbstractApplicationDataSource {
    protected initializeRepositories(): void {
        concreteDeviceRepository.initialize(this)
        deviceGroupRepository.initialize(this)
        instantiableBrowserDeviceRepository.initialize(this)
        instantiableCloudDeviceRepository.initialize(this)
        deviceRepository.initialize(this)
        peerconnectionRepository.initialize(this)
    }
}

export const AppDataSource = new ApplicationDataSource()
