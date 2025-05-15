import { error, logging } from '@crosslab/service-common';
import assert from 'assert';
import express from 'express';
import { step } from 'mocha-steps';
import Sinon from 'sinon';
import supertest from 'supertest';

import { Availability, Device } from '../src/clients/device/types.js';
import * as clients from '../src/clients/index.js';
import { AppDataSource, repositories } from '../src/database/dataSource.js';
import { Entities } from '../src/database/model.js';
import { app } from '../src/generated/index.js';
import { validatePostBookingsOutput } from '../src/generated/requestValidation.js';
import {
  postBookings201ResponseType,
  putBookingsByBookingIdLockResponseType,
} from '../src/generated/signatures.js';
import { Booking } from '../src/generated/types.js';
import { bookingIdFromUrl } from '../src/methods/urlFromId.js';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const START_TIME = Date.now();

const devices = {
  'https://api.example.com/devices/available': {
    device: {
      url: 'https://api.example.com/devices/available',
      name: 'available',
      type: 'device',
      isPublic: true,
    },
    availability: [
      {
        start: new Date(START_TIME).toISOString(),
        end: new Date(START_TIME + WEEK).toISOString(),
      },
    ],
  },
  'https://api.example.com/devices/unavailable': {
    device: {
      url: 'https://api.example.com/devices/unavailable',
      name: 'unavailable',
      type: 'device',
      isPublic: true,
    },
    availability: [],
  },
} as const satisfies Record<
  string,
  { device: Device<'response'>; availability: Availability<'response'> }
>;

describe('Concrete Device Tests', function () {
  before(async function () {
    logging.init();
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
        application => {
          application.get('/booking/status', (_req, res) => {
            res.send({ status: 'ok' });
          });
        },
      ],
      errorHandler: error.middleware,
    });

    Sinon.stub(clients.device, 'getDevice').callsFake(async url => {
      return devices[url as keyof typeof devices].device;
    });
    Sinon.stub(clients.device, 'getDeviceAvailability').callsFake(async url => {
      return devices[url as keyof typeof devices].availability;
    });
  });

  after(function () {
    Sinon.restore();
  });

  describe('Available Concrete Device Tests', function () {
    let bookingId: string;

    step('should create a booking with one available concrete device', function (done) {
      const startTime = Date.now();
      const endTime = startTime + HOUR;

      supertest(app)
        .post('/bookings')
        .send({
          devices: ['https://api.example.com/devices/available'],
          timeslot: {
            start: new Date(startTime).toISOString(),
            end: new Date(endTime).toISOString(),
          },
        } satisfies Booking<'request'>)
        .expect(201, (_, response) => {
          assert.strictEqual(response.status, 201);
          assert(validatePostBookingsOutput(response));
          bookingId = bookingIdFromUrl(
            (response as postBookings201ResponseType).body.url,
          );
          done();
        });
    });

    step(
      'should not create a booking with the same device at an overlapping timeslot',
      function (done) {
        const startTime = Date.now();
        const endTime = startTime + HOUR;

        supertest(app)
          .post('/bookings')
          .send({
            devices: ['https://api.example.com/devices/available'],
            timeslot: {
              start: new Date(startTime).toISOString(),
              end: new Date(endTime).toISOString(),
            },
          } satisfies Booking<'request'>)
          .expect(400, done);
      },
    );

    step('should lock the booking', async function () {
      this.timeout(0);
      const response = (await supertest(app).put(
        `/bookings/${bookingId}/lock`,
      )) as putBookingsByBookingIdLockResponseType;

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.length, 0);
    });

    step('should delete the booking', async function () {
      this.timeout(0);
      const response = await supertest(app).delete(`/bookings/${bookingId}`);

      assert.strictEqual(response.status, 204);
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
  });

  describe('Unavailable Concrete Device Tests', function () {
    it('should not create a booking with one unavailable device', function (done) {
      const startTime = Date.now();
      const endTime = startTime + HOUR;

      supertest(app)
        .post('/bookings')
        .send({
          devices: ['https://api.example.com/devices/unavailable'],
          timeslot: {
            start: new Date(startTime).toISOString(),
            end: new Date(endTime).toISOString(),
          },
        } satisfies Booking<'request'>)
        .expect(400, done);
    });
  });
});
