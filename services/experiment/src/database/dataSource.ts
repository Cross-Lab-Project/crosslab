import { deviceRepository } from './repositories/device'
import { experimentRepository } from './repositories/experiment'
import { participantRepository } from './repositories/participant'
import { peerconnectionRepository } from './repositories/peerconnection'
import { roleRepository } from './repositories/role'
import { serviceConfigurationRepository } from './repositories/serviceConfiguration'
import { AbstractApplicationDataSource } from '@crosslab/service-common'

class ApplicationDataSource extends AbstractApplicationDataSource {
    protected initializeRepositories(): void {
        deviceRepository.initialize(this)
        experimentRepository.initialize(this)
        participantRepository.initialize(this)
        peerconnectionRepository.initialize(this)
        roleRepository.initialize(this)
        serviceConfigurationRepository.initialize(this)
    }
}

export const AppDataSource = new ApplicationDataSource()
