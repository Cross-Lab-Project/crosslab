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
    @OneToMany(() => AvailabilityRuleModel, (timeslot) => timeslot.device, { onDelete: "CASCADE", cascade: true })
    availabilityRules?: AvailabilityRuleModel[]
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
    @Column()
    config?: string
    @ManyToOne(() => DeviceGroupModel, (deviceGroup) => deviceGroup.devices)
    group?: DeviceGroupModel
    @DeleteDateColumn()
    deletedAt?: Date
}

@Entity({ name: "AvailabilityRule" })
export class AvailabilityRuleModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    available?: boolean
    @Column({ nullable: true })
    start?: number
    @Column({ nullable: true })
    end?: number
    @Column({ nullable: true })
    frequency?: "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
    @Column({ nullable: true })
    until?: number
    @Column({ nullable: true })
    count?: number
    @ManyToOne(() => ConcreteDeviceModel, (device) => device.availabilityRules)
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

@Entity({ name: "TimeSlot" })
export class TimeSlotModel {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    start!: number
    @Column()
    end!: number
    @ManyToOne(() => ConcreteDeviceModel, (device) => device.announcedAvailability)
    device?: ConcreteDeviceModel
    @DeleteDateColumn()
    deletedAt?: Date
}

@Entity({ name: "Peerconnection" })
export abstract class PeerconnectionModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @OneToOne(() => DeviceReferenceModel, { onDelete: "CASCADE", cascade: true })
    @JoinColumn()
    deviceA!: DeviceReferenceModel
    @OneToOne(() => DeviceReferenceModel, { onDelete: "CASCADE", cascade: true })
    @JoinColumn()
    deviceB!: DeviceReferenceModel
    @DeleteDateColumn()
    deletedAt?: Date
}