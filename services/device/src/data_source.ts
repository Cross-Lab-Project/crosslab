import { DataSource } from "typeorm";
import { DeviceOverviewModel, ConcreteDeviceModel, DeviceGroupModel, AvailabilityRuleModel, DeviceReferenceModel, PeerconnectionModel, ServiceConfigModel } from "./model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db/device.db",
    synchronize: true,
    entities: [
        DeviceOverviewModel, 
        ConcreteDeviceModel, 
        DeviceGroupModel, 
        AvailabilityRuleModel, 
        DeviceReferenceModel,
        PeerconnectionModel,
        ServiceConfigModel,
        AvailabilityRuleModel
    ]
})