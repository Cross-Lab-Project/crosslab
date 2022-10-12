import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'

@Entity({ name: 'Experiment' })
export class ExperimentModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    status!: 'created' | 'booked' | 'running' | 'finished'
    @Column()
    bookingStart?: string
    @Column()
    bookingEnd?: string
    @OneToMany(() => DeviceModel, (device) => device.experiment, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    devices?: DeviceModel[]
    @ManyToMany(() => RoleModel)
    @JoinTable({ name: 'ExperimentRoleMapping' })
    roles?: RoleModel[]
    @OneToMany(() => PeerconnectionModel, (peerconnection) => peerconnection.experiment, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    connections?: PeerconnectionModel[]
    @OneToMany(
        () => ServiceConfigurationModel,
        (serviceConfiguration) => serviceConfiguration.experiment,
        { onDelete: 'CASCADE', cascade: true }
    )
    serviceConfigurations?: ServiceConfigurationModel[]
    @Column({ nullable: true })
    bookingID?: string
    @DeleteDateColumn()
    deletedAt?: Date
}

@Entity({ name: 'Role' })
export class RoleModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    name?: string
    @Column()
    description?: string
}

@Entity({ name: 'Device' })
export class DeviceModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    url!: string
    @Column()
    role?: string
    @Column()
    isVirtual?: boolean
    @ManyToOne(() => ExperimentModel, (experiment) => experiment.devices)
    experiment?: ExperimentModel
}

@Entity({ name: 'Peerconnection' })
export class PeerconnectionModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    url!: string
    @ManyToOne(() => ExperimentModel, (experiment) => experiment.connections)
    experiment?: ExperimentModel
}

@Entity({ name: 'ServiceConfiguration' })
export class ServiceConfigurationModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    serviceType?: string
    @Column()
    configuration?: string // save JSON as string
    @OneToMany(
        () => ParticipantModel,
        (participant) => participant.serviceConfiguration,
        { onDelete: 'CASCADE', cascade: true }
    )
    participants?: ParticipantModel[]
    @ManyToOne(() => ExperimentModel, (experiment) => experiment.serviceConfigurations)
    experiment?: ExperimentModel
}

@Entity({ name: 'Participant' })
export class ParticipantModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    role?: string
    @Column()
    serviceId?: string
    @Column()
    config?: string // save JSON as string
    @ManyToOne(
        () => ServiceConfigurationModel,
        (serviceConfiguration) => serviceConfiguration.participants
    )
    serviceConfiguration?: ServiceConfigurationModel
}
