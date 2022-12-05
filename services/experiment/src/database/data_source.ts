import { DataSource } from 'typeorm'
import { PeerconnectionRefactoringSTATUS } from './migrations/peerconnection-status'
import {
    DeviceModel,
    ExperimentModel,
    ParticipantModel,
    PeerconnectionModel,
    RoleModel,
    ServiceConfigurationModel,
} from './model'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db/experiment.db',
    synchronize: true,
    entities: [
        ExperimentModel,
        DeviceModel,
        ServiceConfigurationModel,
        PeerconnectionModel,
        ParticipantModel,
        RoleModel,
    ],
    migrations: [PeerconnectionRefactoringSTATUS],
    migrationsRun: true
})
