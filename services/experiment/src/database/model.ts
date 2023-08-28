import { Device, Role, ServiceConfiguration } from '../generated/types';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'Experiment' })
export class ExperimentModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    status!:
        | 'created'
        | 'booked'
        | 'running'
        | 'finished'
        | 'booking-locked'
        | 'devices-instantiated'
        | 'booking-updated'
        | 'peerconnections-created';

    @Column()
    bookingStart?: string;

    @Column()
    bookingEnd?: string;

    @OneToMany(() => DeviceModel, (device) => device.experiment, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    devices?: DeviceModel[];

    @OneToMany(() => RoleModel, (role) => role.experiment, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    roles?: RoleModel[];

    @OneToMany(() => PeerconnectionModel, (peerconnection) => peerconnection.experiment, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    connections?: PeerconnectionModel[];

    @OneToMany(
        () => ServiceConfigurationModel,
        (serviceConfiguration) => serviceConfiguration.experiment,
        { onDelete: 'CASCADE', cascade: true },
    )
    serviceConfigurations?: ServiceConfigurationModel[];

    @Column({ nullable: true })
    bookingID?: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}

@Entity({ name: 'Role' })
export class RoleModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    name?: string;

    @Column('text', { nullable: true })
    description?: string | null;

    @ManyToOne(() => ExperimentModel, (experiment) => experiment.roles)
    experiment!: ExperimentModel;
}

@Entity({ name: 'Instance' })
export class InstanceModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    url!: string;

    @Column()
    token!: string;

    @Column({ nullable: true })
    codeUrl?: string;
}

@Entity({ name: 'Device' })
export class DeviceModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    url!: string;

    @Column()
    role?: string;

    @ManyToOne(() => ExperimentModel, (experiment) => experiment.devices)
    experiment!: ExperimentModel;

    @OneToOne(() => InstanceModel)
    @JoinColumn()
    instance?: InstanceModel;
}

@Entity({ name: 'Peerconnection' })
export class PeerconnectionModel {
    @PrimaryColumn()
    url!: string;

    @ManyToOne(() => ExperimentModel, (experiment) => experiment.connections)
    experiment!: ExperimentModel;
}

@Entity({ name: 'ServiceConfiguration' })
export class ServiceConfigurationModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    serviceType!: string;

    @Column('simple-json')
    configuration?: {
        [k: string]: unknown;
    };

    @OneToMany(
        () => ParticipantModel,
        (participant) => participant.serviceConfiguration,
        { onDelete: 'CASCADE', cascade: true },
    )
    participants?: ParticipantModel[];

    @ManyToOne(() => ExperimentModel, (experiment) => experiment.serviceConfigurations)
    experiment!: ExperimentModel;
}

@Entity({ name: 'Participant' })
export class ParticipantModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    role?: string;

    @Column()
    serviceId!: string;

    @Column('simple-json')
    config?: {
        [k: string]: unknown;
    };

    @ManyToOne(
        () => ServiceConfigurationModel,
        (serviceConfiguration) => serviceConfiguration.participants,
    )
    serviceConfiguration!: ServiceConfigurationModel;
}

@Entity({ name: 'Template' })
export class TemplateModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    name!: string;

    @Column()
    description?: string;

    @Column('simple-json')
    configuration!: {
        devices: Device[];
        roles: Role[];
        serviceConfigurations: ServiceConfiguration[];
    };
}

export const Entities = [
    ExperimentModel,
    RoleModel,
    InstanceModel,
    DeviceModel,
    PeerconnectionModel,
    ServiceConfigurationModel,
    ParticipantModel,
];
