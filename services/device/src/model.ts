import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    DeleteDateColumn, 
    OneToMany, 
    TableInheritance, 
    ChildEntity, 
    ManyToMany, 
    ManyToOne, 
    JoinTable,
    OneToOne,
    JoinColumn
} from "typeorm";

@Entity()
export class DeviceReferenceModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    url?: string
}

@Entity()
export class ConfiguredDeviceReferenceModel extends DeviceReferenceModel {
    @OneToMany(() => ServiceConfigModel, (serviceConfig) => serviceConfig.device, { cascade: true })
    config?: ServiceConfigModel[]
}

@Entity()
export class ServiceConfigModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @Column()
    serviceType?: string
    @Column()
    serviceId?: string
    @Column()
    remoteServiceId?: string
    @ManyToOne(() => ConfiguredDeviceReferenceModel, (device) => device.config)
    device?: ConfiguredDeviceReferenceModel
}

@Entity()
@TableInheritance({ column: { type: "varchar", name: "modelType" } })
export abstract class DeviceOverviewModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @Column()
    name!: string
    @Column()
    description?: string
    @Column()
    type?: "device" | "group"
    @Column()
    owner?: string
    @DeleteDateColumn()
    deletedAt?: Date
}

@ChildEntity()
export class DeviceConcreteModel extends DeviceOverviewModel {
    @Column()
    type?: "device"
    @Column()
    connected?: boolean
    @OneToMany(() => TimeSlotModel, (timeslot) => timeslot.device)
    announcedAvailability?: TimeSlotModel[]
    @Column()
    experiment?: string
}


@ChildEntity()
export class DeviceGroupModel extends DeviceOverviewModel {
    @Column()
    type?: "group"
    @ManyToMany(() => DeviceReferenceModel)
    @JoinTable()
    devices?: DeviceReferenceModel[]
}

@Entity()
export class TimeSlotModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    start?: string
    @Column()
    end?: string
    @Column()
    frequency?: "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
    @Column()
    until?: string
    @Column()
    count?: number
    @ManyToOne(() => DeviceConcreteModel, (device) => device.announcedAvailability)
    device?: DeviceConcreteModel
}

@Entity()
export abstract class PeerconnectionOverviewModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @OneToOne(() => DeviceReferenceModel)
    @JoinColumn()
    deviceA?: DeviceReferenceModel
    @OneToOne(() => DeviceReferenceModel)
    @JoinColumn()
    deviceB?: DeviceReferenceModel
    @DeleteDateColumn()
    deletedAt?: Date
}

@Entity()
export class PeerconnectionModel extends PeerconnectionOverviewModel {
    @OneToOne(() => ConfiguredDeviceReferenceModel)
    @JoinColumn()
    deviceA!: ConfiguredDeviceReferenceModel
    @OneToOne(() => ConfiguredDeviceReferenceModel)
    @JoinColumn()
    deviceB!: ConfiguredDeviceReferenceModel
}