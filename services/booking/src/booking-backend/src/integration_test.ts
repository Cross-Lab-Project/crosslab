//const why = require('why-is-node-running')
import { sleep } from '@crosslab/booking-service-common';
import {
  fakeServerConfig,
  getFakeInstitutePrefix,
  getFakeOwnURL,
  getSQLDNS,
  resetFakeServerVars,
  setupDummySql,
  startDeviceReservation,
  startFakeServer,
  stopDeviceReservation,
  stopFakeServer,
  tearDownDummySql,
} from '@crosslab/booking-service-test-common';
import * as amqplib from 'amqplib';
import dayjs from 'dayjs';
import express from 'express';
import * as http from 'http';
import * as mocha from 'mocha';
import * as mysql from 'mysql2/promise';

import { config } from './config';
import { callbackType, handleCallback, randomID } from './internal';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

mocha.describe('internal.ts', function () {
  this.timeout(10000);

  mocha.before(async function () {
    // Config
    config.OwnURL = getFakeOwnURL();
    config.InstitutePrefix = getFakeInstitutePrefix();
    config.ReservationDSN = getSQLDNS();
    config.BookingDSN = getSQLDNS();

    await startFakeServer();
  });

  mocha.after(async function () {
    await stopFakeServer();
    //setTimeout(function(){console.log("why?");why();console.log("WHY??");}, 10000);
  });

  mocha.beforeEach(async function () {
    // Reset server status
    resetFakeServerVars();

    // Setup database
    await setupDummySql();

    // Connect to amqp
    connection = await amqplib.connect(config.AmqpUrl);
    channel = await connection.createChannel();

    await channel.assertQueue('device-booking', {
      durable: true,
    });

    await channel.assertQueue('device-reservation', {
      durable: true,
    });

    await channel.assertQueue('device-freeing', {
      durable: true,
    });

    // Drain queues
    while (await channel.get('device-booking', { noAck: true })) {}

    while (await channel.get('device-reservation', { noAck: true })) {}

    while (await channel.get('device-freeing', { noAck: true })) {}
    await startDeviceReservation();
  });

  mocha.afterEach(async function () {
    await tearDownDummySql();

    await channel.deleteQueue('device-booking');
    await channel.deleteQueue('device-freeing');

    await channel.close();
    await connection.close();

    channel = undefined;
    connection = undefined;

    await stopDeviceReservation();
  });

  mocha.it('handleCallback() DeviceUpdate (local single device available)', async () => {
    let db = await mysql.createConnection(getSQLDNS());
    db.connect();
    try {
      await handleCallback(callbackType.DeviceUpdate, BigInt(1), {
        Position: 0,
      });
      await sleep(1000);
      let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
        BigInt(1),
      ]);
      if (rows[0].status != 'booked') {
        throw new Error('Booking should be booked, is ' + rows[0].status);
      }
    } catch (err) {
      throw err;
    } finally {
      db.end();
    }
  });

  mocha.it(
    'handleCallback() DeviceUpdate (local single device not available)',
    async () => {
      let db = await mysql.createConnection(getSQLDNS());
      db.connect();
      try {
        fakeServerConfig.device_not_available = true;
        await handleCallback(callbackType.DeviceUpdate, BigInt(1), {
          Position: 0,
        });
        await sleep(1000);
        let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
          BigInt(1),
        ]);
        if (rows[0].status == 'booked') {
          throw new Error('Booking should not be booked, is ' + rows[0].status);
        }
      } catch (err) {
        throw err;
      } finally {
        db.end();
      }
    },
  );

  mocha.it('handleCallback() DeviceUpdate (local two devices available)', async () => {
    let db = await mysql.createConnection(getSQLDNS());
    db.connect();
    try {
      // device 1
      await handleCallback(callbackType.DeviceUpdate, BigInt(2), { Position: 0 });
      await sleep(1000);
      let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
        BigInt(2),
      ]);
      if (rows[0].status != 'booked') {
        throw new Error('Booking should be booked, is ' + rows[0].status);
      }

      // device 2
      await handleCallback(callbackType.DeviceUpdate, BigInt(2), { Position: 1 });
      await sleep(1000);
      [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
        BigInt(2),
      ]);
      if (rows[0].status != 'booked') {
        throw new Error('Booking should be booked, is ' + rows[0].status);
      }
    } catch (err) {
      throw err;
    } finally {
      db.end();
    }
  });

  mocha.it(
    'handleCallback() DeviceUpdate (local two devices not available)',
    async () => {
      let db = await mysql.createConnection(getSQLDNS());
      db.connect();
      try {
        fakeServerConfig.device_not_available = true;
        await handleCallback(callbackType.DeviceUpdate, BigInt(2), {
          Position: 1,
        });
        await sleep(1000);
        let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
          BigInt(2),
        ]);
        if (rows[0].status == 'booked') {
          throw new Error('Booking should not be booked, is ' + rows[0].status);
        }
      } catch (err) {
        throw err;
      } finally {
        db.end();
      }
    },
  );

  mocha.it('handleCallback() BookingUpdate (group, available)', async () => {
    let db = await mysql.createConnection(getSQLDNS());
    db.connect();
    try {
      await handleCallback(callbackType.DeviceUpdate, BigInt(3), { Position: 0 });
      await sleep(1000);
      let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
        BigInt(3),
      ]);
      if (rows[0].status != 'booked') {
        throw new Error('Booking should be booked, is ' + rows[0].status);
      }
    } catch (err) {
      throw err;
    } finally {
      db.end();
    }
  });

  mocha.it('handleCallback() BookingUpdate (group, not available)', async () => {
    let db = await mysql.createConnection(getSQLDNS());
    db.connect();
    try {
      fakeServerConfig.device_not_available = true;
      await handleCallback(callbackType.DeviceUpdate, BigInt(3), { Position: 0 });
      await sleep(1000);
      let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
        BigInt(3),
      ]);
      if (rows[0].status == 'booked') {
        throw new Error('Booking should not be booked, is ' + rows[0].status);
      }
    } catch (err) {
      throw err;
    } finally {
      db.end();
    }
  });

  mocha.it('handleCallback() BookingUpdate (remote, available)', async () => {
    try {
      let db = await mysql.createConnection(getSQLDNS());
      db.connect();
      try {
        await handleCallback(callbackType.BookingUpdate, BigInt(4), {
          Position: 0,
        });
        await sleep(1000);
        let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
          BigInt(3),
        ]);
        if (rows[0].status != 'booked') {
          throw new Error('Booking should be booked, is ' + rows[0].status);
        }
      } catch (err) {
        throw err;
      } finally {
        db.end();
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  mocha.it('handleCallback() BookingUpdate (remote, not available)', async () => {
    let db = await mysql.createConnection(getSQLDNS());
    db.connect();
    try {
      fakeServerConfig.device_not_available = true;
      fakeServerConfig.proxy_schedule_empty = true;
      fakeServerConfig.booking_status = 'rejected';
      await handleCallback(callbackType.BookingUpdate, BigInt(4), { Position: 0 });
      await sleep(1000);
      let [rows, fields] = await db.execute('SELECT `status` FROM booking WHERE id=?', [
        BigInt(3),
      ]);
      if (rows[0].status == 'booked') {
        let [rowsinner, fieldsinner] = await db.execute(
          'SELECT `bookeddevice` FROM bookeddevices WHERE booking=? AND originalposition=?',
          [BigInt(4), 0],
        );
        throw new Error(
          'Booking should not be booked, is ' +
            rows[0].status +
            ', booked device is ' +
            rowsinner[0].bookeddevice,
        );
      }
    } catch (err) {
      throw err;
    } finally {
      db.end();
    }
  });

  mocha.it('dispatchCallback()', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - remote', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local single device', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local two devices', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local group', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - remote not available', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local single device not available', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local two devices not available', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local group not available', async () => {
    throw Error('TODO implement');
  });

  mocha.it('freeDevice() - remote', async () => {
    throw Error('TODO implement');
  });

  mocha.it('freeDevice() - local single device', async () => {
    throw Error('TODO implement');
  });

  mocha.it('freeDevice() - local multiple devices', async () => {
    throw Error('TODO implement');
  });

  mocha.it('freeDevice() - local group', async () => {
    throw Error('TODO implement');
  });

  mocha.it('randomID()', async () => {
    let ids: string[] = [];
    for (let i = 0; i < 10000; i++) {
      let newID = randomID();
      for (let j = 0; j < ids.length; j++) {
        if (newID === ids[j]) {
          throw new Error('Found identical ID!');
        }
      }
      ids.push(newID);
    }
  });

  mocha.it('DeleteBooking()', async () => {
    throw Error('TODO implement');
  });

  mocha.it('putBookingByIDLock', async () => {
    throw Error('TODO implement');
  });

  mocha.it('deleteBookingByIDLock', async () => {
    throw Error('TODO implement');
  });

  mocha.it('postBookingCallbackByID', async () => {
    throw Error('TODO implement');
  });
});
