import { error, logging } from '@crosslab/service-common';
import assert from 'assert';
import express from 'express';
import { step } from 'mocha-steps';
import Sinon from 'sinon';
import supertest from 'supertest';

import {
  DeviceChangedEventCallback,
  InstantiableCloudDevice,
} from '../src/clients/device/types.js';
import * as clients from '../src/clients/index.js';
import { AppDataSource, repositories } from '../src/database/dataSource.js';
import { Entities } from '../src/database/model.js';
import { app } from '../src/generated/index.js';
import { validatePostBookingsOutput } from '../src/generated/requestValidation.js';
import {
  getBookings200ResponseType,
  postBookings201ResponseType,
  putBookingsByBookingIdLockResponseType,
} from '../src/generated/signatures.js';
import { Booking } from '../src/generated/types.js';
import { bookingIdFromUrl } from '../src/methods/urlFromId.js';
import { callbackHandling } from '../src/operations/callbacks/index.js';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const device: InstantiableCloudDevice<'response'> = {
  url: 'https://api.example.com/devices/cloud-instantiable',
  name: 'cloud instantiable',
  type: 'cloud instantiable',
  isPublic: true,
};

describe('Cloud Instantiable Device Tests', function () {
  before(async function () {
    logging.init({ LOGGING: 'warn' });
    logging.logger.silent = true;
    await AppDataSource.initialize({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: Entities,
    });

    app.initService({
      preHandlers: [
        application => {
          application.use(express.json());
          application.use(express.urlencoded({ extended: false }));
          application.use(logging.middleware());
        },
      ],
      postHandlers: [
        callbackHandling,
        application => {
          application.get('/booking/status', (_req, res) => {
            res.send({ status: 'ok' });
          });
        },
      ],
      errorHandler: error.middleware,
    });
  });

  this.afterEach(function () {
    Sinon.restore();
  });

  this.beforeEach(function () {
    Sinon.stub(clients.device, 'getDevice').callsFake(async () => {
      return device;
    });
  });

  const bookingIds: string[] = [];

  step('should create a booking with one cloud instantiable device', async function () {
    const startTime = Date.now();
    const endTime = startTime + HOUR;

    const response = await supertest(app)
      .post('/bookings')
      .send({
        devices: {
          'device-1': {
            url: 'https://api.example.com/devices/cloud-instantiable',
            essential: true,
          },
        },
        timeslot: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      } satisfies Booking<'request'>);

    assert.strictEqual(response.status, 201);
    assert(validatePostBookingsOutput(response));
    bookingIds.push(bookingIdFromUrl((response as postBookings201ResponseType).body.url));
  });

  step(
    'should create a booking with the same device at an overlapping timeslot',
    async function () {
      const startTime = Date.now();
      const endTime = startTime + HOUR;

      const response = await supertest(app)
        .post('/bookings')
        .send({
          devices: {
            'device-1': {
              url: 'https://api.example.com/devices/cloud-instantiable',
              essential: true,
            },
          },
          timeslot: {
            start: new Date(startTime).toISOString(),
            end: new Date(endTime).toISOString(),
          },
        } satisfies Booking<'request'>);

      assert.strictEqual(response.status, 201);
      assert(validatePostBookingsOutput(response));
      bookingIds.push(
        bookingIdFromUrl((response as postBookings201ResponseType).body.url),
      );
    },
  );

  step('should handle device-changed callback correctly (no changes)', async function () {
    const response = await supertest(app)
      .post('/callbacks/booking')
      .send({
        callbackType: 'event',
        eventType: 'device-changed',
        device,
      } satisfies DeviceChangedEventCallback);

    assert.strictEqual(response.status, 200);

    const booking = await repositories.booking.findOneOrFail({
      where: { uuid: bookingIds[0] },
    });
    assert.strictEqual(booking.status, 'accepted');
    for (const device of booking.devices) {
      assert.notStrictEqual(device.reservation, null);
    }
  });

  step('should lock the booking', async function () {
    this.timeout(0);
    const response = (await supertest(app).put(
      `/bookings/${bookingIds[0]}/lock`,
    )) as putBookingsByBookingIdLockResponseType;

    assert.strictEqual(response.status, 200);
    assert.strictEqual(Object.keys(response.body).length, 0);
  });

  step(
    'should handle device-changed callback correctly (locked, no changes)',
    async function () {
      const response = await supertest(app)
        .post('/callbacks/booking')
        .send({
          callbackType: 'event',
          eventType: 'device-changed',
          device,
        } satisfies DeviceChangedEventCallback);

      assert.strictEqual(response.status, 200);

      const booking = await repositories.booking.findOneOrFail({
        where: { uuid: bookingIds[0] },
      });
      assert.strictEqual(booking.status, 'locked-accepted');
      for (const device of booking.devices) {
        assert.notStrictEqual(device.reservation, null);
      }
    },
  );

  step('should get the booking', async function () {
    const responseAll = await supertest(app).get(`/bookings`);
    const responses = await Promise.all(
      bookingIds.map(bookingId => supertest(app).get(`/bookings/${bookingId}`)),
    );

    assert.strictEqual(responseAll.status, 200);
    assert.strictEqual(responseAll.body.length, responses.length);

    for (const response of responses) {
      assert.strictEqual(response.status, 200);
      assert(
        (responseAll as getBookings200ResponseType).body.find(booking => {
          try {
            assert.deepStrictEqual(responseAll.body[0], booking);
            return true;
          } catch {
            return false;
          }
        }),
      );
    }
  });

  step('should delete the bookings', async function () {
    this.timeout(0);
    const responses = await Promise.all(
      bookingIds.map(bookingId => supertest(app).delete(`/bookings/${bookingId}`)),
    );

    for (const response of responses) {
      assert.strictEqual(response.status, 204);
    }

    assert.strictEqual(
      (await repositories.booking.find()).length,
      0,
      'There are remaining bookings in the database!',
    );
    assert.strictEqual(
      (await repositories.device.find()).length,
      0,
      'There are remaining devices in the database!',
    );
    assert.strictEqual(
      (await repositories.reservation.find()).length,
      0,
      'There are remaining reservations in the database!',
    );
  });

  step('should unregister the device-changed callback', async function () {
    const response = await supertest(app)
      .post('/callbacks/booking')
      .send({
        callbackType: 'event',
        eventType: 'device-changed',
        device: device,
      } satisfies DeviceChangedEventCallback);

    assert.strictEqual(response.status, 410);
  });
});
