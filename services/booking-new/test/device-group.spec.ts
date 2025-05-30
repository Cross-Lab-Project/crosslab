import { authorization, error, logging } from '@crosslab/service-common';
import assert from 'assert';
import express from 'express';
import { step } from 'mocha-steps';
import Sinon from 'sinon';
import supertest from 'supertest';

import {
  Availability,
  Device,
  DeviceChangedEventCallback,
  DeviceDeletedEventCallback,
  DeviceGroup,
} from '../src/clients/device/types.js';
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
import { callbackHandling } from '../src/operations/callbacks/index.js';

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

describe('Device Group Tests', function () {
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
          application.use(authorization.middleware());
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

    app.authorization_mock = [{ result: true }];
  });

  this.afterEach(function () {
    Sinon.restore();
  });

  this.beforeEach(function () {
    Sinon.stub(clients.device, 'getDevice').callsFake(async url => {
      if (url === 'https://api.example.com/devices/group') {
        return {
          url: 'https://api.example.com/devices/group',
          name: 'available',
          type: 'group',
          devices: [
            { url: 'https://api.example.com/devices/available' },
            { url: 'https://api.example.com/devices/unavailable' },
          ],
          isPublic: true,
        };
      }

      return devices[url as keyof typeof devices].device;
    });
    Sinon.stub(clients.device, 'getDeviceAvailability').callsFake(async url => {
      return devices[url as keyof typeof devices].availability;
    });
    Sinon.stub(clients.device, 'updateDevice');
  });

  describe('Device Group Tests', function () {
    this.timeout(0);
    let bookingId: string;

    step('should not create a booking with no available device', async function () {
      const startTime = Date.now();
      const endTime = startTime + HOUR;

      setContainedDevices(['https://api.example.com/devices/unavailable']);

      const response = await supertest(app)
        .post('/bookings')
        .send({
          devices: {
            'device-1': { url: 'https://api.example.com/devices/group', essential: true },
          },
          timeslot: {
            start: new Date(startTime).toISOString(),
            end: new Date(endTime).toISOString(),
          },
        } satisfies Booking<'request'>);

      assert.strictEqual(response.status, 400);
    });

    step('should create a booking with one available device', async function () {
      const startTime = Date.now();
      const endTime = startTime + HOUR;

      const response = await supertest(app)
        .post('/bookings')
        .send({
          devices: {
            'device-1': { url: 'https://api.example.com/devices/group', essential: true },
          },
          timeslot: {
            start: new Date(startTime).toISOString(),
            end: new Date(endTime).toISOString(),
          },
        } satisfies Booking<'request'>);

      assert.strictEqual(response.status, 201);
      assert(validatePostBookingsOutput(response));
      bookingId = bookingIdFromUrl((response as postBookings201ResponseType).body.url);
    });

    step(
      'should not create a booking with the same device at an overlapping timeslot',
      async function () {
        const startTime = Date.now();
        const endTime = startTime + HOUR;

        const response = await supertest(app)
          .post('/bookings')
          .send({
            devices: {
              'device-1': {
                url: 'https://api.example.com/devices/group',
                essential: true,
              },
            },
            timeslot: {
              start: new Date(startTime).toISOString(),
              end: new Date(endTime).toISOString(),
            },
          } satisfies Booking<'request'>);

        assert.strictEqual(response.status, 400);
      },
    );

    // TODO: check if group can be used in two bookings at the same time (different chosen devices)

    step(
      'should handle device-changed callback correctly (no changes)',
      async function () {
        const response = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: devices['https://api.example.com/devices/available'].device,
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(response.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'accepted');
        for (const device of booking.devices) {
          assert.notStrictEqual(device.reservation, null);
        }
      },
    );

    step(
      'should handle device-changed callback correctly (unavailable)',
      async function () {
        (clients.device.getDeviceAvailability as Sinon.SinonStub).restore();
        Sinon.stub(clients.device, 'getDeviceAvailability').callsFake(async () => []);

        const callbackDeviceResponse = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: devices['https://api.example.com/devices/available'].device,
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(callbackDeviceResponse.status, 200);

        const callbackDeviceGroupResponse = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: {
              ...setContainedDevices([
                'https://api.example.com/devices/available',
                'https://api.example.com/devices/unavailable',
              ]),
              added: [],
              changed: ['https://api.example.com/devices/available'],
              removed: [],
            },
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(callbackDeviceGroupResponse.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'rejected');
        for (const device of booking.devices) {
          assert.strictEqual(device.reservation, null);
        }
      },
    );

    step(
      'should handle device-changed callback correctly (available again)',
      async function () {
        const callbackDeviceResponse = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: devices['https://api.example.com/devices/available'].device,
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(callbackDeviceResponse.status, 410);

        const callbackDeviceGroupResponse = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: {
              ...setContainedDevices([
                'https://api.example.com/devices/available',
                'https://api.example.com/devices/unavailable',
              ]),
              added: [],
              changed: ['https://api.example.com/devices/available'],
              removed: [],
            },
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(callbackDeviceGroupResponse.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'accepted');
        for (const device of booking.devices) {
          assert.notStrictEqual(device.reservation, null);
        }
      },
    );

    step(
      'should handle device-changed callback correctly (remove available device)',
      async function () {
        const response = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: {
              ...setContainedDevices(['https://api.example.com/devices/unavailable']),
              added: [],
              changed: [],
              removed: ['https://api.example.com/devices/available'],
            },
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(response.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'rejected');
        for (const device of booking.devices) {
          assert.strictEqual(device.reservation, null);
        }
      },
    );

    step(
      'should handle device-changed callback correctly (add available device)',
      async function () {
        const response = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: {
              ...setContainedDevices([
                'https://api.example.com/devices/available',
                'https://api.example.com/devices/unavailable',
              ]),
              added: ['https://api.example.com/devices/available'],
              changed: [],
              removed: [],
            },
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(response.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'accepted');
        for (const device of booking.devices) {
          assert.notStrictEqual(device.reservation, null);
        }
      },
    );

    step('should lock the booking', async function () {
      const response = (await supertest(app).put(
        `/bookings/${bookingId}/lock`,
      )) as putBookingsByBookingIdLockResponseType;

      assert.strictEqual(response.status, 200);
      assert.strictEqual(Object.keys(response.body).length, 1);
      assert.strictEqual(
        response.body['device-1'],
        'https://api.example.com/devices/available',
      );
    });

    step(
      'should handle device-changed callback correctly (locked, no changes)',
      async function () {
        const response = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: devices['https://api.example.com/devices/available'].device,
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(response.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'accepted');
        for (const device of booking.devices) {
          assert.notStrictEqual(device.reservation, null);
        }
      },
    );

    step(
      'should handle device-changed callback correctly (locked, unavailable)',
      async function () {
        (clients.device.getDeviceAvailability as Sinon.SinonStub).restore();
        Sinon.stub(clients.device, 'getDeviceAvailability').callsFake(async () => []);

        const response = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: devices['https://api.example.com/devices/available'].device,
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(response.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'rejected');
        for (const device of booking.devices) {
          assert.strictEqual(device.reservation, null);
        }
      },
    );

    step(
      'should handle device-changed callback correctly (locked, available again)',
      async function () {
        const response = await supertest(app)
          .post('/callbacks/booking')
          .send({
            callbackType: 'event',
            eventType: 'device-changed',
            device: devices['https://api.example.com/devices/available'].device,
          } satisfies DeviceChangedEventCallback);

        assert.strictEqual(response.status, 200);

        const booking = await repositories.booking.findOneOrFail({
          where: { uuid: bookingId },
        });
        assert.strictEqual(booking.status, 'accepted');
        for (const device of booking.devices) {
          assert.notStrictEqual(device.reservation, null);
        }
      },
    );

    step('should get the booking', async function () {
      const responseAll = await supertest(app).get(`/bookings`);
      const response = await supertest(app).get(`/bookings/${bookingId}`);

      assert.strictEqual(responseAll.status, 200);
      assert.strictEqual(responseAll.body.length, 1);

      assert.strictEqual(response.status, 200);

      assert.deepStrictEqual(responseAll.body[0], response.body);
    });

    step('should handle device-deleted callback correctly', async function () {
      const response = await supertest(app)
        .post('/callbacks/booking')
        .send({
          callbackType: 'event',
          eventType: 'device-deleted',
          device: devices['https://api.example.com/devices/available'].device,
        } satisfies DeviceDeletedEventCallback);

      assert.strictEqual(response.status, 200);

      const booking = await repositories.booking.findOneOrFail({
        where: { uuid: bookingId },
      });
      assert.strictEqual(booking.status, 'rejected');
    });

    step('should handle device-deleted callback correctly', async function () {
      const response = await supertest(app)
        .post('/callbacks/booking')
        .send({
          callbackType: 'event',
          eventType: 'device-deleted',
          device: {
            type: 'group',
            url: 'https://api.example.com/devices/group',
          },
        } satisfies DeviceDeletedEventCallback);

      assert.strictEqual(response.status, 200);

      const booking = await repositories.booking.findOneOrFail({
        where: { uuid: bookingId },
      });
      assert.strictEqual(booking.status, 'impossible');
    });

    step('should delete the booking', async function () {
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

    step('should unregister the device-changed callback', async function () {
      const response = await supertest(app)
        .post('/callbacks/booking')
        .send({
          callbackType: 'event',
          eventType: 'device-changed',
          device: devices['https://api.example.com/devices/available'].device,
        } satisfies DeviceChangedEventCallback);

      assert.strictEqual(response.status, 410);
    });
  });
});

function setContainedDevices(
  deviceUrls: (keyof typeof devices)[],
): DeviceGroup<'response'> {
  const deviceGroup: DeviceGroup<'response'> = {
    url: 'https://api.example.com/devices/group',
    name: 'available',
    type: 'group',
    devices: deviceUrls.map(deviceUrl => {
      return {
        url: deviceUrl,
      };
    }),
    isPublic: true,
  };

  (clients.device.getDevice as Sinon.SinonStub).restore();
  Sinon.stub(clients.device, 'getDevice').callsFake(async url => {
    if (url === 'https://api.example.com/devices/group') {
      return deviceGroup;
    }

    return devices[url as keyof typeof devices].device;
  });

  return deviceGroup;
}
