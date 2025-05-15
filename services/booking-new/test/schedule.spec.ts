import assert from 'assert';
import Sinon from 'sinon';
import supertest from 'supertest';

import { Device } from '../src/clients/device/types.js';
import * as clients from '../src/clients/index.js';
import { AppDataSource } from '../src/database/dataSource.js';
import { Entities } from '../src/database/model.js';
import { app } from '../src/generated/index.js';
import { validatePostScheduleOutput } from '../src/generated/requestValidation.js';
import { postScheduleResponseType } from '../src/generated/signatures.js';
import { Booking } from '../src/generated/types.js';

describe('Schedule Tests', function () {
  this.beforeEach(async function () {
    await AppDataSource.initialize({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: Entities,
    });
    // Sinon.useFakeTimers({ toFake: ['Date'] });
  });

  this.afterEach(function () {
    Sinon.restore();
  });

  createScheduleTestCase({
    title: 'concrete device, always available, no reservations',
    devices: [
      {
        id: 'concrete',
        type: 'device',
        availability: [{ start: 0, end: 1000 }],
        reservations: [],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [{ start: 0, end: 1000 }],
    },
  });

  createScheduleTestCase({
    title: 'concrete device, not always available, no reservations',
    devices: [
      {
        id: 'concrete',
        type: 'device',
        availability: [
          { start: 0, end: 200 },
          { start: 250, end: 450 },
          { start: 500, end: 700 },
          { start: 750, end: 950 },
        ],
        reservations: [],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [
        { start: 0, end: 200 },
        { start: 250, end: 450 },
        { start: 500, end: 700 },
        { start: 750, end: 950 },
      ],
    },
  });

  createScheduleTestCase({
    title: 'concrete device, always available, one reservation',
    devices: [
      {
        id: 'concrete',
        type: 'device',
        availability: [{ start: 0, end: 1000 }],
        reservations: [{ start: 10, end: 100 }],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [
        { start: 0, end: 10 },
        { start: 100, end: 1000 },
      ],
    },
  });

  createScheduleTestCase({
    title: 'concrete device, not always available, multiple reservations',
    devices: [
      {
        id: 'concrete',
        type: 'device',
        availability: [
          { start: 0, end: 200 },
          { start: 250, end: 450 },
          { start: 500, end: 700 },
          { start: 750, end: 950 },
        ],
        reservations: [
          { start: 0, end: 100 },
          { start: 100, end: 130 },
          { start: 150, end: 200 },
          { start: 300, end: 450 },
          { start: 500, end: 700 },
          { start: 800, end: 900 },
        ],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [
        { start: 130, end: 150 },
        { start: 250, end: 300 },
        { start: 750, end: 800 },
        { start: 900, end: 950 },
      ],
    },
  });

  createScheduleTestCase({
    title: 'cloud instantiable device + edge instantiable device',
    devices: [
      {
        id: 'cloud-instantiable',
        type: 'cloud instantiable',
      },
      {
        id: 'edge-instantiable',
        type: 'edge instantiable',
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [{ start: 0, end: 1000 }],
    },
  });

  createScheduleTestCase({
    title: 'device group: concrete device, always available, no reservations',
    devices: [
      {
        id: 'device-group',
        type: 'group',
        devices: [
          {
            id: 'concrete',
            type: 'device',
            availability: [{ start: 0, end: 1000 }],
            reservations: [],
          },
        ],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [{ start: 0, end: 1000 }],
    },
  });

  createScheduleTestCase({
    title: 'device group: concrete device, not always available, no reservations',
    devices: [
      {
        id: 'device-group',
        type: 'group',
        devices: [
          {
            id: 'concrete',
            type: 'device',
            availability: [
              { start: 10, end: 20 },
              { start: 50, end: 120 },
              { start: 123, end: 300 },
              { start: 793, end: 956 },
            ],
            reservations: [],
          },
        ],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [
        { start: 10, end: 20 },
        { start: 50, end: 120 },
        { start: 123, end: 300 },
        { start: 793, end: 956 },
      ],
    },
  });

  createScheduleTestCase({
    title: 'device group: concrete device, not always available, multiple reservations',
    devices: [
      {
        id: 'device-group',
        type: 'group',
        devices: [
          {
            id: 'concrete',
            type: 'device',
            availability: [
              { start: 0, end: 200 },
              { start: 250, end: 450 },
              { start: 500, end: 700 },
              { start: 750, end: 950 },
            ],
            reservations: [
              { start: 0, end: 100 },
              { start: 100, end: 130 },
              { start: 150, end: 200 },
              { start: 300, end: 450 },
              { start: 500, end: 700 },
              { start: 800, end: 900 },
            ],
          },
        ],
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [
        { start: 130, end: 150 },
        { start: 250, end: 300 },
        { start: 750, end: 800 },
        { start: 900, end: 950 },
      ],
    },
  });

  createScheduleTestCase({
    title: 'concrete device + edge instantiable device + cloud instantiable device',
    devices: [
      {
        id: 'concrete',
        type: 'device',
        availability: [
          { start: 0, end: 200 },
          { start: 250, end: 450 },
          { start: 500, end: 700 },
          { start: 750, end: 950 },
        ],
        reservations: [
          { start: 0, end: 100 },
          { start: 100, end: 130 },
          { start: 150, end: 200 },
          { start: 300, end: 450 },
          { start: 500, end: 700 },
          { start: 800, end: 900 },
        ],
      },
      {
        id: 'edge-instantiable',
        type: 'edge instantiable',
      },
      {
        id: 'cloud-instantiable',
        type: 'cloud instantiable',
      },
    ],
    timeframe: {
      start: 0,
      end: 1000,
    },
    result: {
      status: 200,
      body: [
        { start: 130, end: 150 },
        { start: 250, end: 300 },
        { start: 750, end: 800 },
        { start: 900, end: 950 },
      ],
    },
  });
});

type TestCaseDeviceInit =
  | {
      id: string;
      type: 'device';
      availability: { start: number; end: number }[];
      reservations: { start: number; end: number }[];
    }
  | {
      id: string;
      type: 'group';
      devices: (TestCaseDeviceInit & {
        type: 'device' | 'edge instantiable' | 'cloud instantiable';
      })[];
    }
  | { id: string; type: 'edge instantiable' | 'cloud instantiable' };

type ScheduleTestCaseInit = {
  title: string;
  devices: TestCaseDeviceInit[];
  timeframe: {
    start: number;
    end: number;
  };
  result: {
    status: number;
    body?: { start: number; end: number }[];
  };
};

export function createScheduleTestCase(init: ScheduleTestCaseInit) {
  return it(init.title, async function () {
    const deviceMap = new Map<string, Device<'response'>>();

    Sinon.stub(clients.device, 'getDevice').callsFake(async url => {
      const device = deviceMap.get(url);

      if (!device) {
        throw new Error(`Could not find device "${url}"!`);
      }

      return device;
    });

    Sinon.stub(clients.device, 'getDeviceAvailability').callsFake(async url => {
      const device = deviceMap.get(url);

      if (!device) {
        throw new Error(`Could not find device "${url}"!`);
      }

      if (device.type !== 'device') {
        throw new Error(
          `Device "${url}" has type "${device.type}" instead of expected type "device"!`,
        );
      }

      const availability = device.announcedAvailability;

      if (!availability) {
        throw new Error(`Could not find availability for device "${url}"!`);
      }

      return availability;
    });

    for (const deviceDescription of init.devices) {
      const device = generateDeviceFromDescription(deviceDescription);

      deviceMap.set(device.url, device);

      if (deviceDescription.type === 'device') {
        await generateReservations(device.url, deviceDescription.reservations);
      }

      if (deviceDescription.type === 'group') {
        for (const innerDeviceDescription of deviceDescription.devices) {
          const innerDevice = generateDeviceFromDescription(innerDeviceDescription);
          deviceMap.set(innerDevice.url, innerDevice);

          if (innerDeviceDescription.type === 'device') {
            await generateReservations(
              innerDevice.url,
              innerDeviceDescription.reservations,
            );
          }
        }
      }
    }

    const response = await supertest(app)
      .post('/schedule')
      .send({
        devices: init.devices.map(
          device => `https://api.example.com/devices/${device.id}`,
        ),
        timeframe: {
          start: new Date(init.timeframe.start).toISOString(),
          end: new Date(init.timeframe.end).toISOString(),
        },
      });

    assert(validatePostScheduleOutput(response));
    const scheduleResponse = response as postScheduleResponseType;
    assert.strictEqual(response.status, init.result.status);

    if (scheduleResponse.status === 200) {
      if (!init.result.body) {
        throw new Error('No expected result given!');
      }

      assert.strictEqual(scheduleResponse.body.length, init.result.body.length);

      for (const [index, timeslot] of scheduleResponse.body.entries()) {
        assert.strictEqual(
          timeslot.start,
          new Date(init.result.body[index].start).toISOString(),
        );
        assert.strictEqual(
          timeslot.end,
          new Date(init.result.body[index].end).toISOString(),
        );
      }
    }
  });
}

function generateDeviceFromDescription(
  description: TestCaseDeviceInit,
): Device<'response'> {
  const url = `https://api.example.com/devices/${description.id}`;

  switch (description.type) {
    case 'device':
      return {
        url,
        type: 'device',
        name: description.id,
        isPublic: true,
        announcedAvailability: description.availability.map(timeslot => {
          return {
            start: new Date(timeslot.start).toISOString(),
            end: new Date(timeslot.end).toISOString(),
          };
        }),
      };
    case 'group':
      return {
        url,
        type: 'group',
        name: description.id,
        isPublic: true,
        devices: description.devices.map(device => {
          return { url: `https://api.example.com/devices/${device.id}` };
        }),
      };
    case 'edge instantiable':
      return {
        url,
        type: 'edge instantiable',
        name: description.id,
        isPublic: true,
      };
    case 'cloud instantiable':
      return {
        url,
        type: 'cloud instantiable',
        name: description.id,
        isPublic: true,
      };
  }
}

async function generateReservations(
  url: string,
  reservations: { start: number; end: number }[],
) {
  for (const reservation of reservations) {
    await supertest(app)
      .post('/bookings')
      .send({
        devices: [url],
        timeslot: {
          start: new Date(reservation.start).toISOString(),
          end: new Date(reservation.end).toISOString(),
        },
      } satisfies Booking<'request'>);
  }
}
