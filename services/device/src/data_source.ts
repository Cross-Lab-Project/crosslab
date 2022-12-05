import { DataSource } from 'typeorm'
import { PeerconnectionStatus1670225251577 } from './database/migrations/1670225251577-PeerconnectionStatus'
import {
    DeviceOverviewModel,
    ConcreteDeviceModel,
    DeviceGroupModel,
    AvailabilityRuleModel,
    DeviceReferenceModel,
    PeerconnectionModel,
    TimeSlotModel,
    ServiceConfigModel,
    InstantiableCloudDeviceModel,
    InstantiableBrowserDeviceModel,
    ServiceModel,
    InstantiableDeviceOverviewModel,
} from './model'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db/device.db',
    synchronize: true,
    entities: [
        DeviceOverviewModel,
        ConcreteDeviceModel,
        InstantiableDeviceOverviewModel,
        InstantiableCloudDeviceModel,
        InstantiableBrowserDeviceModel,
        DeviceGroupModel,
        AvailabilityRuleModel,
        ServiceConfigModel,
        DeviceReferenceModel,
        PeerconnectionModel,
        TimeSlotModel,
        ServiceModel,
    ],
    migrations: [PeerconnectionStatus1670225251577],
    migrationsRun: true
})
