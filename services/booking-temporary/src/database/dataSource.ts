import { AbstractApplicationDataSource } from '@crosslab/service-common';
import { DataSourceOptions } from 'typeorm/browser';

import { config } from '../config.js';
import { BookingRepository } from './repositories/booking.js';
import { CallbackUrlRepository } from './repositories/callbackUrl.js';
import { DeviceRepository } from './repositories/device.js';
import { ReservationRepository } from './repositories/reservation.js';

type RepositoryMapping = {
  booking: BookingRepository;
  device: DeviceRepository;
  reservation: ReservationRepository;
  callbackUrl: CallbackUrlRepository;
};

class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
  public repositories: RepositoryMapping;

  constructor(options: DataSourceOptions) {
    super(options);
    this.repositories = this.createRepositories();
  }

  protected createRepositories(): RepositoryMapping {
    const bookingRepository = new BookingRepository();
    const deviceRepository = new DeviceRepository();
    const reservationRepository = new ReservationRepository();
    const callbackUrlRepository = new CallbackUrlRepository();

    bookingRepository.setDependencies({
      callbackUrl: callbackUrlRepository,
      device: deviceRepository,
    });
    deviceRepository.setDependencies({
      reservation: reservationRepository,
    });

    return {
      booking: bookingRepository,
      device: deviceRepository,
      reservation: reservationRepository,
      callbackUrl: callbackUrlRepository,
    };
  }
}

export const AppDataSource = new ApplicationDataSource(config.orm);
export const repositories = AppDataSource.repositories;
export const dataSource = AppDataSource.dataSource;
