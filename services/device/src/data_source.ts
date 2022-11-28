import { DataSource } from 'typeorm'
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
})
