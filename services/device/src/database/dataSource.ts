import { deviceRepository } from './repositories/device'
import { peerconnectionRepository } from './repositories/peerconnection'
import { AbstractApplicationDataSource } from '@crosslab/service-common'

class ApplicationDataSource extends AbstractApplicationDataSource {
    protected initializeRepositories(): void {
        deviceRepository.initialize(this)
        peerconnectionRepository.initialize(this)
    }
}

export const AppDataSource = new ApplicationDataSource()
