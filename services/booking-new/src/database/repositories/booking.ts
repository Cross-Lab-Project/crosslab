import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

import * as clients from '../../clients/index.js';
import { Booking } from '../../generated/types.js';
import { isLocked } from '../../methods/booking.js';
import { reserveDevice } from '../../methods/reservation.js';
import { bookingUrlFromId } from '../../methods/urlFromId.js';
import { repositories } from '../dataSource.js';
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
    model.devices = [];
    model.callbackUrls = [];
    await this.write(model, data);
    model.status = 'accepted';

    return model;
  }

  async write(model: BookingModel, data: Partial<Booking<'request'>>): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    if (data.timeslot?.start !== undefined) model.start = data.timeslot.start;
    if (data.timeslot?.end !== undefined) model.end = data.timeslot.end;
    if (data.devices !== undefined) {
      const deviceMap = await Promise.all(
        Object.entries(data.devices).map(async ([id, device]) => {
          return {
            id,
            device: await clients.device.getDevice(device.url),
            essential: device.essential,
          };
        }),
      );

      // sort devices such that device groups come last, this ensures that
      // all other devices are booked first to avoid conflicts that may arise
      // by booking the same device from the device group before
      deviceMap.sort((deviceA, deviceB) => {
        if (deviceA.device.type === 'group' && deviceB.device.type !== 'group') return 1;
        if (deviceA.device.type !== 'group' && deviceB.device.type === 'group') return -1;
        return 0;
      });

      const newDevices: DeviceModel[] = [];
      for (const device of deviceMap) {
        // check if device is already part of the booking
        const index = model.devices.findIndex(
          deviceModel => deviceModel.id === device.id,
        );
        if (index !== -1) {
          newDevices.push(...model.devices.splice(index, 1));
          continue;
        }

        // reserve new device
        const deviceModel = await this.dependencies.device.create(device);
        await reserveDevice(model, deviceModel, device.device);

        newDevices.push(deviceModel);
      }

      // delete devices no longer in booking
      for (const removedDevice of model.devices) {
        await repositories.device.remove(removedDevice);
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

    model.status = model.devices.find(device => device.reservation === null)
      ? isLocked(model)
        ? 'locked-rejected'
        : 'rejected'
      : isLocked(model)
        ? 'locked-accepted'
        : 'accepted';

    return await this.repository.save(model);
  }

  async format(model: BookingModel): Promise<Booking<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    return {
      url: bookingUrlFromId(model.uuid),
      status: model.status,
      devices: Object.fromEntries(
        model.devices.map(device => {
          return [device.id, { url: device.url, essential: device.essential }];
        }),
      ),
      timeslot: {
        start: model.start,
        end: model.end,
      },
      lockedDevices: Object.fromEntries(
        model.devices
          .map(device => {
            return [device.id, device.chosenDevice];
          })
          .filter(entry => entry[1] !== null && entry[1] !== undefined),
      ),
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
