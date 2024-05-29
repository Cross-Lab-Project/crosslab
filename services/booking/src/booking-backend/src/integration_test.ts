//const why = require('why-is-node-running')
import { baseConfig, sleep } from '@crosslab/booking-service-common';
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
import dayjs, { Dayjs } from 'dayjs';
import express from 'express';
import * as http from 'http';
import * as mocha from 'mocha';
import * as mysql from 'mysql2/promise';

import { callbackType, dispatchCallback, handleCallback, randomID, reservateDevice } from './internal';
import { config } from './config'
import { DeviceBookingRequest } from './messageDefinition';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

mocha.describe('internal.ts', function () {
  this.timeout(10000);

  mocha.before(async function () {
    // Config - use both global config and local config to ensure different application parts work with same config
    baseConfig.OwnURL = getFakeOwnURL();
    baseConfig.InstitutePrefix = getFakeInstitutePrefix();
    baseConfig.ReservationDSN = getSQLDNS();
    baseConfig.BookingDSN = getSQLDNS();

    config.OwnURL = getFakeOwnURL();
    config.InstitutePrefix = getFakeInstitutePrefix();
    config.ReservationDSN = getSQLDNS();
    config.BookingDSN = getSQLDNS();

    await startFakeServer();
  });

  mocha.after(async function () {
    await stopFakeServer();
    //setTimeout(function(){console.log("why?");why();console.log("WHY??");}, 1000);
  });

  mocha.beforeEach(async function () {
    // Reset server status
    resetFakeServerVars();

    // Setup database
    await setupDummySql();

    // Connect to amqp
    connection = await amqplib.connect(baseConfig.AmqpUrl);
    channel = await connection.createChannel();

    await channel.assertQueue('device-booking', {
      durable: true,
    });

    await channel.assertQueue('device-freeing', {
      durable: true,
    });

    // Drain queues
    while (await channel.get('device-booking', { noAck: true })) { }
    while (await channel.get('device-freeing', { noAck: true })) { }
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

  mocha.it('handleCallback() BookingUpdate (local group, available)', async () => {
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

  mocha.it('handleCallback() BookingUpdate (local group, not available)', async () => {
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

  mocha.it('dispatchCallback()', async () => {
    resetFakeServerVars();

    await dispatchCallback(BigInt(1));
    await sleep(100);
    let serverConfig = fakeServerConfig; // Workaround since TypeScript does not notice var changes in functions
    if (serverConfig.callback_test_local_single_was_called === false) {
      throw new Error("http://localhost:10801/test_callbacks/test-local-single was not called");
    }
    if (serverConfig.callback_test_local_two_first_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_local_two_second_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_local_group_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_remote_single_was_called === true) {
      throw new Error("wrong callback called");
    }
    resetFakeServerVars();

    await dispatchCallback(BigInt(2));
    await sleep(100);
    serverConfig = fakeServerConfig; // Workaround since TypeScript does not notice var changes in functions
    if (serverConfig.callback_test_local_single_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_local_two_first_was_called === false) {
      throw new Error("http://localhost:10801/test_callbacks/test-local-single was not called");
    }
    if (serverConfig.callback_test_local_two_second_was_called === false) {
      throw new Error("http://localhost:10801/test_callbacks/test-local-single was not called");
    }
    if (serverConfig.callback_test_local_group_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_remote_single_was_called === true) {
      throw new Error("wrong callback called");
    }
    resetFakeServerVars();

    await dispatchCallback(BigInt(3));
    await sleep(100);
    serverConfig = fakeServerConfig; // Workaround since TypeScript does not notice var changes in functions
    if (serverConfig.callback_test_local_single_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_local_two_first_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_local_two_second_was_called === true) {
      throw new Error("wrong callback called");
    }
    if (serverConfig.callback_test_local_group_was_called === false) {
      throw new Error("http://localhost:10801/test_callbacks/test-local-group was not called");
    }
    if (serverConfig.callback_test_remote_single_was_called === true) {
      throw new Error("wrong callback called");
    }
    resetFakeServerVars();
  });

  mocha.it('reservateDevice() - local single device', async () => {
    await reservateDevice(new DeviceBookingRequest(BigInt(5), new URL("http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"), 0, dayjs("1999-01-10T08:00:00Z"), dayjs("1999-01-10T09:00:00Z")));
    await sleep(1000);

    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {

      // Test booking
      let [rows, fields]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(5)]);
      if (rows.length === 0) {
        throw new Error("booking not found");
      }

      if (rows[0].status !== "booked") {
        throw new Error("wrong status " + rows[0].status);
      }


      // Test bookeddevice
      [rows, fields] = await db.execute("SELECT `bookeddevice`, `originaldevice`, `remotereference`, `local`, `reservation` FROM bookeddevices WHERE `booking`=? AND `originalposition`=?", [5, 0]);
      if (rows.length === 0) {
        throw new Error("booked device not found");
      }

      if (rows[0].originaldevice !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong original device " + rows[0].originaldevice);
      }

      if (rows[0].bookeddevice !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong booked device " + rows[0].bookeddevice);
      }

      if (rows[0].remotereference !== null) {
        throw new Error("wrong remote reference " + rows[0].remotereference);
      }

      if (rows[0].local != true) { // Unfortunate, type conversion
        throw new Error("wrong local " + rows[0].local);
      }

      if (rows[0].reservation < 0 || rows[0].reservation === undefined || rows[0].reservation === null) {
        throw new Error("bad reservation " + rows[0].reservation);
      }

      let bookingID = rows[0].reservation;

      // Test reservation
      [rows, fields] = await db.execute("SELECT `device`, `start`, `end` FROM reservation WHERE `id`=?", [bookingID]);

      if (rows.length === 0) {
        throw new Error("reservation not found");
      }

      if (rows[0].device !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong device " + rows[0].device);
      }

      if (!dayjs(rows[0].start).isSame(dayjs("1999-01-10T08:00:00Z"))) {
        throw new Error("wrong start " + rows[0].start);
      }

      if (!dayjs(rows[0].end).isSame(dayjs("1999-01-10T09:00:00Z"))) {
        throw new Error("wrong end " + rows[0].end);
      }
    } finally {
      await db.end();
    }
  });

  mocha.it('reservateDevice() - local two devices', async () => {
    throw Error('TODO implement');
  });

  mocha.it('reservateDevice() - local group', async () => {
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

  mocha.it('reservateDevice() - booking not existing', async () => {
    let errFound = false;
    try {
      await reservateDevice(new DeviceBookingRequest(BigInt(5000), new URL("http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"), 0, dayjs("1999-01-10T08:00:00Z"), dayjs("1999-01-10T09:00:00Z")));
      await sleep(1000);
    } catch (err) {
      if (err.toString() != new Error("Booking 5000 does not exist").toString()) {
        console.log("Unknown err " + err);
        throw err;
      }
      errFound = true;
    }

    if (!errFound) {
      throw new Error("No error on unknown booking");
    }
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

  mocha.it('DeleteBooking() local single device', async () => {
    throw Error('TODO implement');
  });

  mocha.it('DeleteBooking() local multiple devices', async () => {
    throw Error('TODO implement');
  });

  mocha.it('DeleteBooking() no authorization', async () => {
    throw Error('TODO implement');
  });

  mocha.it('DeleteBooking() non-existing', async () => {
    throw Error('TODO implement');
  });
}); 