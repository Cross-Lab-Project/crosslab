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
    status!: 'created' | 'booked' | 'running' | 'finished' | 'setup'
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
    @ManyToOne(() => ExperimentModel, (experiment) => experiment.devices)
    experiment?: ExperimentModel
    @Column('simple-json')
    additionalProperties?: {
        instanceUrl?: string
        deviceToken?: string
    }
}

@Entity({ name: 'Peerconnection' })
export class PeerconnectionModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column({ unique: true })
    url!: string
    @Column()
    status?: 'waiting-for-devices' | 'connected' | 'failed' | 'closed'
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
    configuration?: string // TODO: save JSON as string (simple-json)
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
    config?: string // TODO: save JSON as string (simple-json)
    @ManyToOne(
        () => ServiceConfigurationModel,
        (serviceConfiguration) => serviceConfiguration.participants
    )
    serviceConfiguration?: ServiceConfigurationModel
}
