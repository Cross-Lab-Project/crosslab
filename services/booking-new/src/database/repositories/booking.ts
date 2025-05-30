import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager, FindOptionsRelations } from 'typeorm';

import * as clients from '../../clients/index.js';
import { Booking } from '../../generated/types.js';
import { BookingError } from '../../methods/errors.js';
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
    model.isLocked = false;
    model.callbackUrls = [];
    await this.write(model, data);

    return model;
  }

  async write(model: BookingModel, data: Partial<Booking<'request'>>): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    if (data.timeslot !== undefined) {
      if (data.timeslot.start >= data.timeslot.end) {
        throw new BookingError('start must be before end', 400);
      }
      model.start = data.timeslot.start;
      model.end = data.timeslot.end;

      for (const deviceModel of model.devices) {
        const reservation = deviceModel.reservation;
        if (
          reservation &&
          reservation.start === model.start &&
          reservation.end === model.end
        ) {
          continue;
        } else if (reservation) {
          deviceModel.reservation = null;
          await repositories.device.save(deviceModel);
          await repositories.reservation.remove(reservation);
        }

        const device = await clients.device.getDevice(deviceModel.url);

        try {
          await reserveDevice(model, deviceModel, device);
        } catch {
          // empty
        }
      }
    }
    if (data.devices !== undefined) {
      const deviceArray = await Promise.all(
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
      deviceArray.sort((deviceA, deviceB) => {
        if (deviceA.device.type === 'group' && deviceB.device.type !== 'group') return 1;
        if (deviceA.device.type !== 'group' && deviceB.device.type === 'group') return -1;
        return 0;
      });

      const newDevices: DeviceModel[] = [];
      for (const { id, device, essential } of deviceArray) {
        // check if device is already part of the booking
        const index = model.devices.findIndex(
          deviceModel => deviceModel.id === id && deviceModel.url === device.url,
        );
        if (index !== -1) {
          newDevices.push(...model.devices.splice(index, 1));
          continue;
        }

        // reserve new device
        const deviceModel = await this.dependencies.device.create({
          id,
          essential,
          device,
        });
        await reserveDevice(model, deviceModel, device);

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

    const oldStatus = model.status;
    if (model.status !== 'impossible') {
      model.status = model.devices.find(device => device.reservation === null)
        ? 'rejected'
        : 'accepted';
    }

    if (oldStatus !== 'accepted' && model.status === 'accepted') {
      // TODO: delete all reservations that overlap with the ones of this booking
    }

    return await this.repository.save(model);
  }

  async format(model: BookingModel): Promise<Booking<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    return {
      url: bookingUrlFromId(model.uuid),
      status: model.status,
      isLocked: model.isLocked,
      devices: Object.fromEntries(
        model.devices.map(device => {
          return [
            device.id,
            {
              url: device.url,
              essential: device.essential,
              isReserved: !!device.reservation,
            },
          ];
        }),
      ),
      timeslot: {
        start: model.start,
        end: model.end,
      },
      selectedDevices: Object.fromEntries(
        model.devices
          .filter(device => device.type === 'group')
          .map(device => {
            return [device.id, device.selectedDevice];
          }),
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
