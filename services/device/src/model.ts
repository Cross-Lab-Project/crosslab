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
    JoinColumn,
    AfterLoad
} from "typeorm";

@Entity({ name: "DeviceReference" })
export class DeviceReferenceModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    url?: string
    @OneToMany(() => ServiceConfigModel, (serviceConfig) => serviceConfig.device)
    config?: ServiceConfigModel[]
}

@Entity({ name: "ServiceConfig" })
export class ServiceConfigModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @Column()
    serviceType?: string
    @Column()
    serviceId?: string
    @Column()
    remoteServiceId?: string
    @ManyToOne(() => DeviceReferenceModel, (device) => device.config)
    device?: DeviceReferenceModel
}

@Entity({ name: "Device" })
@TableInheritance({ column: { type: "varchar", name: "type", enum: ["device", "group"] } })
export abstract class DeviceOverviewModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @Column()
    name?: string
    @Column()
    description?: string
    @Column()
    type?: "device" | "group"
    @Column()
    owner?: string
    @DeleteDateColumn()
    deletedAt?: Date
}

@ChildEntity("device")
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


@ChildEntity("group")
export class DeviceGroupModel extends DeviceOverviewModel {
    @Column()
    type?: "group"
    @ManyToMany(() => DeviceReferenceModel)
    @JoinTable({ name: "DeviceGroupMapping" })
    devices?: DeviceReferenceModel[]
}

@Entity({ name: "TimeSlot" })
export class TimeSlotModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    available?: boolean
    @Column({ nullable: true })
    start?: string
    @Column({ nullable: true })
    end?: string
    @Column({ nullable: true })
    frequency?: "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
    @Column({ nullable: true })
    until?: string
    @Column({ nullable: true })
    count?: number
    @ManyToOne(() => DeviceConcreteModel, (device) => device.announcedAvailability)
    device?: DeviceConcreteModel
    @AfterLoad()
    nullToUndefined() {
        if (this.available == null) this.available = undefined
        if (this.start == null) this.start = undefined
        if (this.end == null) this.end = undefined
        if (this.frequency == null) this.frequency = undefined
        if (this.until == null) this.until = undefined
        if (this.count == null) this.count = undefined
    }
}

@Entity({ name: "Peerconnection" })
export abstract class PeerconnectionModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @OneToOne(() => DeviceReferenceModel)
    @JoinColumn()
    deviceA!: DeviceReferenceModel
    @OneToOne(() => DeviceReferenceModel)
    @JoinColumn()
    deviceB!: DeviceReferenceModel
    @DeleteDateColumn()
    deletedAt?: Date
}