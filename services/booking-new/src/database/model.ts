import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Booking' })
export class BookingModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  status!: 'reserving' | 'accepted' | 'rejected' | 'locked-accepted' | 'locked-rejected';

  @Column()
  start!: string;

  @Column()
  end!: string;

  @OneToMany(() => DeviceModel, deviceModel => deviceModel.booking)
  devices!: DeviceModel[];

  @ManyToMany(() => CallbackUrlModel)
  @JoinTable()
  callbackUrls!: CallbackUrlModel[];
}

@Entity({ name: 'Reservation' })
export class ReservationModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  start!: string;

  @Column()
  end!: string;

  @Column()
  valid!: boolean;

  @Column({ nullable: true })
  remoteBooking?: string;
}

@Entity({ name: 'Device' })
export class DeviceModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  url!: string;

  @Column()
  type!: 'device' | 'group' | 'edge instantiable' | 'cloud instantiable';

  @Column()
  essential!: boolean;

  @Column({ nullable: true })
  chosenDevice?: string;

  @ManyToOne(() => BookingModel, bookingModel => bookingModel.devices)
  booking!: BookingModel;

  @OneToOne(() => ReservationModel)
  @JoinColumn()
  reservation?: ReservationModel;
}

@Entity({ name: 'CallbackUrl' })
export class CallbackUrlModel {
  @PrimaryColumn()
  url!: string;
}

export const Entities = [BookingModel, DeviceModel, ReservationModel, CallbackUrlModel];
