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
    VirtualDeviceModel,
} from './model'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db/device.db',
    synchronize: true,
    entities: [
        DeviceOverviewModel,
        ConcreteDeviceModel,
        VirtualDeviceModel,
        DeviceGroupModel,
        AvailabilityRuleModel,
        ServiceConfigModel,
        DeviceReferenceModel,
        PeerconnectionModel,
        TimeSlotModel,
    ],
})
