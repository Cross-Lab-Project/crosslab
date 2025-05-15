import { error, logging } from '@crosslab/service-common';
import assert from 'assert';
import express from 'express';
import Sinon from 'sinon';
import supertest from 'supertest';

import { Availability, Device } from '../src/clients/device/types.js';
import * as clients from '../src/clients/index.js';
import { AppDataSource } from '../src/database/dataSource.js';
import { Entities } from '../src/database/model.js';
import { app } from '../src/generated/index.js';
import { validatePostBookingsOutput } from '../src/generated/requestValidation.js';
import { postBookings201ResponseType } from '../src/generated/signatures.js';
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
  'https://api.example.com/devices/edge-instantiable': {
    device: {
      url: 'https://api.example.com/devices/edge-instantiable',
      name: 'edge instantiable',
      type: 'edge instantiable',
      isPublic: true,
    },
    availability: [],
  },
  'https://api.example.com/devices/cloud-instantiable': {
    device: {
      url: 'https://api.example.com/devices/cloud-instantiable',
      name: 'cloud instantiable',
      type: 'cloud instantiable',
      isPublic: true,
    },
    availability: [],
  },
  'https://api.example.com/devices/device-group': {
    device: {
      url: 'https://api.example.com/devices/device-group',
      name: 'device group',
      type: 'group',
      isPublic: true,
      devices: [
        { url: 'https://api.example.com/devices/available' },
        { url: 'https://api.example.com/devices/unavailable' },
      ],
    },
    availability: [],
  },
} as const satisfies Record<
  string,
  { device: Device<'response'>; availability: Availability<'response'> }
>;

xdescribe('Booking Tests', function () {
  const bookingIds: string[] = [];

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

    const getDeviceStub = Sinon.stub(clients.device, 'getDevice');
    const getDeviceAvailabilityStub = Sinon.stub(clients.device, 'getDeviceAvailability');

    getDeviceStub.callsFake(async url => {
      return devices[url as keyof typeof devices].device;
    });
    getDeviceAvailabilityStub.callsFake(async url => {
      return devices[url as keyof typeof devices].availability;
    });
  });

  after(function () {
    (clients.device.getDevice as Sinon.SinonStub).restore();
    (clients.device.getDeviceAvailability as Sinon.SinonStub).restore();
  });

  it('should create a booking with a device group containing an available device', function (done) {
    this.timeout(0);
    const startTime = Date.now();
    const endTime = startTime + HOUR;

    supertest(app)
      .post('/bookings')
      .send({
        devices: ['https://api.example.com/devices/device-group'],
        timeslot: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      } satisfies Booking<'request'>)
      .expect(201, done);
  });

  it('should not create a booking with a device group containing no available devices', function (done) {
    const startTime = Date.now();
    const endTime = startTime + HOUR;

    supertest(app)
      .post('/bookings')
      .send({
        devices: ['https://api.example.com/devices/device-group'],
        timeslot: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      } satisfies Booking<'request'>)
      .expect(400, done);
  });

  it('should create a booking with a cloud instantiable device', function (done) {
    const startTime = Date.now();
    const endTime = startTime + HOUR;

    supertest(app)
      .post('/bookings')
      .send({
        devices: ['https://api.example.com/devices/cloud-instantiable'],
        timeslot: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      } satisfies Booking<'request'>)
      .expect(201, (_, response) => {
        assert(validatePostBookingsOutput(response));
        bookingIds.push(
          bookingIdFromUrl((response as postBookings201ResponseType).body.url),
        );
        done();
      });
  });

  it('should create a booking with an edge instantiable device', function (done) {
    const startTime = Date.now();
    const endTime = startTime + HOUR;

    supertest(app)
      .post('/bookings')
      .send({
        devices: ['https://api.example.com/devices/edge-instantiable'],
        timeslot: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      } satisfies Booking<'request'>)
      .expect(201, (_, response) => {
        assert(validatePostBookingsOutput(response));
        bookingIds.push(
          bookingIdFromUrl((response as postBookings201ResponseType).body.url),
        );
        done();
      });
  });

  it('should not create a booking containing the same concrete device more than once', function (done) {
    const startTime = Date.now();
    const endTime = startTime + HOUR;

    supertest(app)
      .post('/bookings')
      .send({
        devices: [
          'https://api.example.com/devices/available',
          'https://api.example.com/devices/available',
        ],
        timeslot: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      })
      .expect(400, done);
  });
});
