import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Booking' })
export class BookingModel {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  status!: 'accepted' | 'accepted-essential' | 'rejected' | 'impossible';

  @Column()
  start!: string;

  @Column()
  end!: string;

  @OneToMany(() => DeviceModel, deviceModel => deviceModel.booking)
  devices!: DeviceModel[];

  @Column()
  isLocked!: boolean;

  @ManyToMany(() => CallbackUrlModel)
  @JoinTable()
  callbackUrls!: CallbackUrlModel[];

  @CreateDateColumn()
  createdDate!: Date;
}

@Entity({ name: 'Reservation' })
export class ReservationModel {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  start!: string;

  @Column()
  end!: string;

  @Column({ type: String, nullable: true })
  remoteBooking!: string | null;
}

@Entity({ name: 'Device' })
export class DeviceModel {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  id!: string;

  @Column()
  url!: string;

  @Column()
  type!: 'device' | 'group' | 'edge instantiable' | 'cloud instantiable';

  @Column()
  essential!: boolean;

  @Column({ type: String, nullable: true })
  selectedDevice!: string | null;

  @ManyToOne(() => BookingModel, bookingModel => bookingModel.devices)
  booking!: BookingModel;

  @OneToOne(() => ReservationModel)
  @JoinColumn()
  reservation!: ReservationModel | null;
}

@Entity({ name: 'CallbackUrl' })
export class CallbackUrlModel {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  url!: string;

  @Column()
  type!: 'changed' | 'deleted';
}

export const Entities = [BookingModel, DeviceModel, ReservationModel, CallbackUrlModel];
