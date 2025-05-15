import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

import * as clients from '../../clients/index.js';
import { Booking } from '../../generated/types.js';
import { isLocked } from '../../methods/booking.js';
import { reserveDevice } from '../../methods/reservation.js';
import { bookingUrlFromId } from '../../methods/urlFromId.js';
import { BookingModel, DeviceModel } from '../model.js';
import { CallbackUrlRepository } from './callbackUrl.js';
import { DeviceRepository } from './device.js';

type BookingRepositoryDependencies = {
  callbackUrl: CallbackUrlRepository;
  device: DeviceRepository;
};

export class BookingRepository extends AbstractRepository<
  BookingModel,
  Booking<'request'>,
  Booking<'response'>,
  BookingRepositoryDependencies
> {
  protected dependencies: Partial<BookingRepositoryDependencies> = {};

  constructor() {
    super('Booking');
  }

  protected dependenciesMet(): boolean {
    if (!this.dependencies.callbackUrl) return false;
    if (!this.dependencies.device) return false;

    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(BookingModel);
  }

  async create(data: Booking<'request'>): Promise<BookingModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const model = this.repository.create();
    model.status = 'reserving';
    model.devices = [];
    await this.write(model, data);

    return model;
  }

  async write(model: BookingModel, data: Partial<Booking<'request'>>): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    if (data.timeslot?.start !== undefined) model.start = data.timeslot.start;
    if (data.timeslot?.end !== undefined) model.end = data.timeslot.end;
    if (data.devices !== undefined) {
      const devices = await Promise.all(
        data.devices.map(deviceUrl => clients.device.getDevice(deviceUrl)),
      );

      // sort devices such that device groups come last, this ensures that
      // all other devices are booked first to avoid conflicts that may arise
      // by booking the same device from the device group before
      devices.sort((deviceA, deviceB) => {
        if (deviceA.type === 'group' && deviceB.type !== 'group') return 1;
        if (deviceA.type !== 'group' && deviceB.type === 'group') return -1;
        return 0;
      });

      const newDevices: DeviceModel[] = [];
      for (const device of devices) {
        // check if device is already part of the booking
        const index = model.devices.findIndex(
          deviceModel => deviceModel.url === device.url,
        );
        if (index !== -1) {
          newDevices.push(...model.devices.splice(index, 1));
          continue;
        }

        // reserve new device
        const deviceModel = await this.dependencies.device.create({
          ...device,
          essential: !isLocked(model),
        });
        deviceModel.reservation = await reserveDevice(model, device);

        newDevices.push(deviceModel);
      }

      model.devices = newDevices;
    }
  }

  async remove(model: BookingModel): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    for (const device of model.devices) {
      await this.dependencies.device.remove(device);
    }

    await this.repository.remove(model);
  }

  async save(model: BookingModel): Promise<BookingModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const newDevices = [];
    for (const device of model.devices) {
      newDevices.push(await this.dependencies.device.save(device));
    }
    model.devices = newDevices;

    for (const callbackUrl of model.callbackUrls) {
      await this.dependencies.callbackUrl.save(callbackUrl);
    }

    return await this.repository.save(model);
  }

  async format(model: BookingModel): Promise<Booking<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    return {
      url: bookingUrlFromId(model.id),
      devices: model.devices.map(device => device.url),
      timeslot: {
        start: model.start,
        end: model.end,
      },
    };
  }

  protected getDefaultFindOptionsRelations():
    | FindOptionsRelations<BookingModel>
    | undefined {
    return {
      callbackUrls: true,
      devices: {
        reservation: true,
      },
    };
  }
}
