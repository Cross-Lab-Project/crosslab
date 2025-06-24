import { AbstractRepository } from '@crosslab/service-common';
import {
  And,
  EntityManager,
  FindOptionsRelations,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

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
          // TODO: repositories seems wrong here (should be dependency?)
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

      const updatedDevices: DeviceModel[] = [];
      for (const { id, device, essential } of deviceArray) {
        // check if device is already part of the booking
        const index = model.devices.findIndex(
          deviceModel => deviceModel.id === id && deviceModel.url === device.url,
        );
        if (index !== -1) {
          updatedDevices.push(...model.devices.splice(index, 1));
          continue;
        }

        // reserve new device
        const deviceModel = await this.dependencies.device.create({
          id,
          essential,
          device,
        });
        await reserveDevice(model, deviceModel, device);

        updatedDevices.push(deviceModel);
      }

      // delete devices no longer in booking
      for (const removedDevice of model.devices) {
        await repositories.device.remove(removedDevice);
      }

      model.devices = updatedDevices;
    }
  }

  async remove(model: BookingModel): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    for (const deviceModel of model.devices) {
      await this.dependencies.device.remove(deviceModel);
    }

    for (const callbackUrlModel of model.callbackUrls) {
      await this.dependencies.callbackUrl.remove(callbackUrlModel);
    }

    await this.repository.remove(model);
  }

  async save(model: BookingModel): Promise<BookingModel> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const newDevices = [];
    for (const device of model.devices) {
      await this.dependencies.device.save(device);
      newDevices.push(
        await this.dependencies.device.findOneOrFail({
          where: {
            uuid: device.uuid,
          },
        }),
      );
    }
    model.devices = newDevices;

    for (const callbackUrl of model.callbackUrls) {
      await this.dependencies.callbackUrl.save(callbackUrl);
    }

    if (model.status !== 'impossible') {
      const unreservedDevices = model.devices.filter(
        device => device.reservation === null,
      );

      if (unreservedDevices.length === 0) {
        model.status = 'accepted';
      } else if (unreservedDevices.find(device => device.essential)) {
        model.status = 'rejected';
      } else {
        model.status = 'accepted-essential';
      }
    }

    if (model.status === 'accepted' || model.status === 'accepted-essential') {
      // TODO: delete all reservations that overlap with the ones of this booking
      const deviceUrls = model.devices
        .flatMap(device => {
          if (!device.reservation) {
            return null;
          }
          return device.selectedDevice ?? device.url;
        })
        .filter(url => url !== null);

      const overlappingDevices = await repositories.device.find({
        where: [
          {
            booking: {
              uuid: Not(model.uuid),
              start: And(MoreThanOrEqual(model.start), LessThanOrEqual(model.end)),
            },
            url: In(deviceUrls),
            selectedDevice: In(deviceUrls),
            reservation: Not(null),
          },
          {
            booking: {
              uuid: Not(model.uuid),
              end: And(MoreThanOrEqual(model.start), LessThanOrEqual(model.end)),
            },
            url: In(deviceUrls),
            selectedDevice: In(deviceUrls),
            reservation: Not(null),
          },
          {
            booking: {
              uuid: Not(model.uuid),
              start: LessThanOrEqual(model.start),
              end: MoreThanOrEqual(model.end),
            },
            url: In(deviceUrls),
            selectedDevice: In(deviceUrls),
            reservation: Not(null),
          },
        ],
        relations: {
          booking: true,
          reservation: true,
        },
      });

      for (const device of overlappingDevices) {
        if (device.reservation) {
          const reservation = device.reservation;
          device.reservation = null;
          await repositories.device.save(device);
          await repositories.reservation.remove(reservation);
        }
      }
    }

    return await this.repository.save(model);
  }

  async format(model: BookingModel): Promise<Booking<'response'>> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();

    const devices = Object.fromEntries(
      model.devices.map(device => [
        device.id,
        {
          url: device.url,
          essential: device.essential,
          isReserved: !!device.reservation,
        },
      ]),
    );

    const selectedDevices = Object.fromEntries(
      model.devices
        .filter(device => device.type === 'group')
        .map(device => {
          return [device.id, device.selectedDevice];
        }),
    );

    return {
      url: bookingUrlFromId(model.uuid),
      status: model.status,
      isLocked: model.isLocked,
      devices,
      timeslot: {
        start: new Date(model.start).toISOString(),
        end: new Date(model.end).toISOString(),
      },
      selectedDevices,
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
