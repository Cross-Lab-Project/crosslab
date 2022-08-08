import { DataSource } from "typeorm";
import { DeviceOverviewModel, ConcreteDeviceModel, DeviceGroupModel, TimeSlotModel, DeviceReferenceModel, PeerconnectionModel, ServiceConfigModel } from "./model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db/device.db",
    synchronize: true,
    entities: [
        DeviceOverviewModel, 
        ConcreteDeviceModel, 
        DeviceGroupModel, 
        TimeSlotModel, 
        DeviceReferenceModel,
        PeerconnectionModel,
        ServiceConfigModel
    ]
})