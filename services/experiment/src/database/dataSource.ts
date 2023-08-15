import { config } from '../config'
import { Migrations } from './migrations'
import { Entities } from './model'
import { DeviceRepository } from './repositories/device'
import { ExperimentRepository } from './repositories/experiment'
import { InstanceRepository } from './repositories/instance'
import { ParticipantRepository } from './repositories/participant'
import { PeerconnectionRepository } from './repositories/peerconnection'
import { RoleRepository } from './repositories/role'
import { ServiceConfigurationRepository } from './repositories/serviceConfiguration'
import { AbstractApplicationDataSource } from '@crosslab/service-common'
import { DataSource, DataSourceOptions } from 'typeorm'

type RepositoryMapping = {
    device: DeviceRepository
    experiment: ExperimentRepository
    instance: InstanceRepository
    participant: ParticipantRepository
    peerconnection: PeerconnectionRepository
    role: RoleRepository
    serviceConfiguration: ServiceConfigurationRepository
}

class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
    public repositories: RepositoryMapping

    constructor(options: DataSourceOptions) {
        super(options)
        this.repositories = this.createRepositories()
    }

    protected createRepositories(): RepositoryMapping {
        const deviceRepository = new DeviceRepository()
        const experimentRepository = new ExperimentRepository()
        const instanceRepository = new InstanceRepository()
        const participantRepository = new ParticipantRepository()
        const peerconnectionRepository = new PeerconnectionRepository()
        const roleRepository = new RoleRepository()
        const serviceConfigurationRepository = new ServiceConfigurationRepository()

        deviceRepository.setDependencies({
            instance: instanceRepository,
        })
        experimentRepository.setDependencies({
            device: deviceRepository,
            peerconnection: peerconnectionRepository,
            role: roleRepository,
            serviceConfiguration: serviceConfigurationRepository,
        })
        serviceConfigurationRepository.setDependencies({
            participant: participantRepository,
        })

        return {
            device: deviceRepository,
            experiment: experimentRepository,
            instance: instanceRepository,
            participant: participantRepository,
            peerconnection: peerconnectionRepository,
            role: roleRepository,
            serviceConfiguration: serviceConfigurationRepository,
        }
    }
}

export let AppDataSource: ApplicationDataSource
export let repositories: ApplicationDataSource['repositories']
export let dataSource: ApplicationDataSource['dataSource'] = new DataSource({
    ...config.orm,
    migrations: [...Migrations],
    migrationsRun: true,
    entities: Entities,
})

export async function init_database(dataSourceConfig?: DataSourceOptions) {
    AppDataSource = new ApplicationDataSource(
        dataSourceConfig
            ? { ...dataSourceConfig, entities: Entities }
            : {
                  ...config.orm,
                  migrations: [...Migrations],
                  migrationsRun: true,
                  entities: Entities,
              }
    )
    repositories = AppDataSource.repositories
    dataSource = AppDataSource.dataSource

    await AppDataSource.initialize()
}
