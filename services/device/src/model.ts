import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    DeleteDateColumn, 
    OneToMany, 
    TableInheritance, 
    ChildEntity, 
    ManyToOne, 
    OneToOne,
    JoinColumn,
    AfterLoad
} from "typeorm";
import { ServiceConfig } from "./generated/types";

export function isConcreteDeviceModel(device: DeviceOverviewModel): device is ConcreteDeviceModel {
    return device.type == "device"
}

export function isDeviceGroupModel(device: DeviceOverviewModel): device is DeviceGroupModel {
    return device.type == "group"
}

export interface DeviceReference {
    url?: string
    [k: string]: unknown
}

export interface ConfiguredDeviceReference {
    url?: string
    config?: ServiceConfig[]
    [k: string]: unknown
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
export class ConcreteDeviceModel extends DeviceOverviewModel {
    @Column()
    type?: "device"
    @Column()
    connected?: boolean
    @OneToMany(() => TimeSlotModel, (timeslot) => timeslot.device, { onDelete: "CASCADE", cascade: true })
    announcedAvailability?: TimeSlotModel[]
    @Column()
    experiment?: string
    @Column()
    token?: string
}


@ChildEntity("group")
export class DeviceGroupModel extends DeviceOverviewModel {
    @Column()
    type?: "group"
    @OneToMany(() => DeviceReferenceModel, (deviceReference) => deviceReference.group, { onDelete: "CASCADE", cascade: true })
    devices?: DeviceReferenceModel[]
}

@Entity({ name: "DeviceReference" })
export class DeviceReferenceModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    url?: string
    @OneToMany(() => ServiceConfigModel, (serviceConfig) => serviceConfig.device, { onDelete: "CASCADE", cascade: true })
    config?: ServiceConfigModel[]
    @ManyToOne(() => DeviceGroupModel, (deviceGroup) => deviceGroup.devices)
    group?: DeviceGroupModel
    @DeleteDateColumn()
    deletedAt?: Date
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
    @DeleteDateColumn()
    deletedAt?: Date
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
    @ManyToOne(() => ConcreteDeviceModel, (device) => device.announcedAvailability)
    device?: ConcreteDeviceModel
    @AfterLoad()
    nullToUndefined() {
        if (this.available == null) this.available = undefined
        if (this.start == null) this.start = undefined
        if (this.end == null) this.end = undefined
        if (this.frequency == null) this.frequency = undefined
        if (this.until == null) this.until = undefined
        if (this.count == null) this.count = undefined
    }
    @DeleteDateColumn()
    deletedAt?: Date
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