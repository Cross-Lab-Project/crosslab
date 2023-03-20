import {
    AvailabilityRule,
    DeviceReference,
    Peerconnection,
    TimeSlot,
} from '../generated/types'
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    OneToMany,
    TableInheritance,
    ChildEntity,
    ManyToOne,
} from 'typeorm'

@Entity({ name: 'Device' })
@TableInheritance({
    column: {
        type: 'varchar',
        name: 'type',
        enum: ['device', 'group', 'cloud instantiable', 'edge instantiable'],
    },
})
export abstract class DeviceOverviewModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    name?: string
    @Column({ nullable: true })
    description?: string
    @Column()
    type!: 'device' | 'group' | 'cloud instantiable' | 'edge instantiable'
    @Column()
    owner?: string
    @DeleteDateColumn()
    deletedAt?: Date
}

@ChildEntity()
export abstract class InstantiableDeviceOverviewModel extends DeviceOverviewModel {
    @OneToMany(() => ConcreteDeviceModel, (concreteDevice) => concreteDevice.instanceOf, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    instances?: ConcreteDeviceModel[]
}

@ChildEntity('device')
export class ConcreteDeviceModel extends DeviceOverviewModel {
    @Column()
    type!: 'device'
    @Column()
    connected?: boolean
    @Column('simple-json')
    announcedAvailability?: Required<TimeSlot>[]
    @Column('simple-json')
    availabilityRules?: AvailabilityRule[]
    @Column()
    experiment?: string
    @Column()
    token?: string
    @Column('simple-json')
    services?: { [k: string]: any }[]
    @ManyToOne(
        () => InstantiableDeviceOverviewModel,
        (instantiableDevice) => instantiableDevice.instances
    )
    instanceOf?: InstantiableDeviceOverviewModel
}

@ChildEntity('group')
export class DeviceGroupModel extends DeviceOverviewModel {
    @Column()
    type!: 'group'
    @Column('simple-json')
    devices?: DeviceReference[]
}

@ChildEntity('cloud instantiable')
export class InstantiableCloudDeviceModel extends InstantiableDeviceOverviewModel {
    @Column()
    type!: 'cloud instantiable'
    @Column()
    instantiateUrl?: string
    @Column('simple-json')
    services?: { [k: string]: any }[]
}

@ChildEntity('edge instantiable')
export class InstantiableBrowserDeviceModel extends InstantiableDeviceOverviewModel {
    @Column()
    type!: 'edge instantiable'
    @Column()
    codeUrl?: string
    @Column('simple-json')
    services?: { [k: string]: any }[]
}

@Entity({ name: 'Peerconnection' })
export abstract class PeerconnectionModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    type?: 'local' | 'webrtc'
    @Column()
    status!: 'waiting-for-devices' | 'connected' | 'failed' | 'closed'
    @Column('simple-json')
    deviceA!: NonNullable<Peerconnection['devices']>[number] & {
        url: string
        config?: {
            services?: {
                serviceType: string
                serviceId: string
                remoteServiceId: string
            }[]
        }
    }
    @Column('simple-json')
    deviceB!: NonNullable<Peerconnection['devices']>[number] & {
        url: string
        config?: {
            services?: {
                serviceType: string
                serviceId: string
                remoteServiceId: string
            }[]
        }
    }
    @DeleteDateColumn()
    deletedAt?: Date
}
