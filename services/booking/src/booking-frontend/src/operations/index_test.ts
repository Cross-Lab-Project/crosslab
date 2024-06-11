import { baseConfig, sleep } from '@crosslab/booking-service-common';
import {
  fakeServerConfig,
  getFakeInstitutePrefix,
  getFakeOwnURL,
  getSQLDNS,
  resetFakeServerVars,
  setupDummySql,
  startFakeServer,
  stopFakeServer,
  tearDownDummySql,
  getFakeRequest,
} from '@crosslab/booking-service-test-common';
import * as mocha from 'mocha';
import dayjs, { Dayjs } from 'dayjs';
import * as mysql from 'mysql2/promise';
import * as amqplib from 'amqplib';

import { MapToString, ResetAMQPDeviceCount, StartAMQPTestFree, StopAMQPTestFree, TestAMQPresults } from './indextest_helper_amqp'

import { postBooking } from './index';
import { config } from '../config'

let connection: amqplib.Connection;
let channel: amqplib.Channel;


mocha.describe('operations.ts', function () {
  this.timeout(10000);

  mocha.before(function () {
    // Config - use both global config and local config to ensure different application parts work with same config
    baseConfig.OwnURL = getFakeOwnURL();
    baseConfig.InstitutePrefix = getFakeInstitutePrefix();
    baseConfig.ReservationDSN = getSQLDNS();
    baseConfig.BookingDSN = getSQLDNS();

    config.OwnURL = getFakeOwnURL();
    config.InstitutePrefix = getFakeInstitutePrefix();
    config.ReservationDSN = getSQLDNS();
    config.BookingDSN = getSQLDNS();

    startFakeServer();
  });

  mocha.after(function () {
    stopFakeServer();
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
  });

  mocha.afterEach(async function () {
    await tearDownDummySql();

    await channel.deleteQueue('device-booking');
    await channel.deleteQueue('device-freeing');

    await channel.close();
    await sleep(250);
    await connection.close();

    channel = undefined;
    connection = undefined;
  });

  mocha.it('postBooking authorization failed', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      // Count number of bookings
      let [rows, _]: [any, any] = await db.execute("SELECT count(*) AS n FROM booking");
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }
      let before: number = rows[0].n;

      // Try booking
      let isError: boolean = false

      let req = getFakeRequest({ user: "badactor", isAuthorized: false });

      try {
        await postBooking(req, { Time: { Start: dayjs("2000-01-01T07:00Z").toISOString(), End: dayjs("2000-01-01T08:00Z").toISOString() }, Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }] });
      } catch (err) {
        if (err.message == "test authorization failed") {
          isError = true;
        } else {
          console.log(err.message);
          throw err;
        }
      }
      await sleep(250);

      if (!isError) {
        throw new Error("no access violation detected");
      }

      // Ensure number has not changed
      [rows, _] = await db.execute("SELECT count(*) AS n FROM booking");
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }
      if (Number(rows[0].n) != Number(before)) {
        throw new Error("authorization failed but number of bookings was changed from " + before + " to " + rows[0].n);
      }
      if (req.related.length != 0) {
        throw new Error("related not empty:" + req.related.toString());
      }
      if (TestAMQPresults.size != 0) {
        throw new Error("device reservation messages found " + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('postBooking single device', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      // Count number of bookings
      let [rows, _]: [any, any] = await db.execute("SELECT count(*) AS n FROM booking");
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }
      let before: number = rows[0].n;

      // Try booking
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });
      let result = await postBooking(req, { Time: { Start: dayjs("2000-01-01T07:00Z").toISOString(), End: dayjs("2000-01-01T08:00Z").toISOString() }, Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }] });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("Booking failed with status " + result.status + " " + result.body);
      }

      // Ensure number has increased by one
      [rows, _] = await db.execute("SELECT count(*) AS n FROM booking");
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }

      if (Number(rows[0].n) != Number(before) + 1) {
        throw new Error("number of bookings was changed from " + before + " to " + rows[0].n);
      }

      let split = result.body.BookingID.split("/");
      let bookingID: bigint = BigInt(split[split.length - 1]);

      [rows, _] = await db.execute("SELECT `start`,`end`,`type`,`user` FROM booking WHERE `id`=?", [bookingID]);
      if (rows.length !== 1) {
        throw new Error("wrong number of rows: " + rows.length);
      }

      if (!dayjs(rows[0].start).isSame(dayjs("2000-01-01T07:00Z"))) {
        throw new Error("wrong start " + rows[0].start);
      }

      if (!dayjs(rows[0].end).isSame(dayjs("2000-01-01T08:00Z"))) {
        throw new Error("wrong end " + rows[0].end);
      }

      if (rows[0].type != "normal") {
        throw new Error("wrong type " + rows[0].type);
      }

      if (rows[0].user != "unittest.user") {
        throw new Error("wrong user " + rows[0].user);
      }

      if (req.related.length != 1) {
        throw new Error("wrong number of related" + req.related);
      }

      if (req.related[0][0] != "user:unittest.user") {
        throw new Error("wrong related user " + req.related);
      }

      if (req.related[0][1] != "owner") {
        throw new Error("wrong related relationship " + req.related);
      }

      if (req.related[0][2] != `booking:${bookingID}`) {
        throw new Error("wrong related user " + req.related);
      }

      if (req.unrelated.length != 0) {
        throw new Error("wrong number of related" + req.unrelated);
      }

      // bookeddevices
      [rows, _] = await db.execute("SELECT count(*) AS n FROM bookeddevices WHERE booking=?", [bookingID]);
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }

      if (Number(rows[0].n) != 1) {
        throw new Error("number of booked devices is wrong: " + rows[0].n);
      }

      [rows, _] = await db.execute("SELECT originaldevice FROM bookeddevices WHERE booking=? AND originalposition=?", [bookingID, 0]);
      if (rows.length !== 1) {
        throw new Error("found " + rows.length + " devices for position 0");
      }

      if (rows[0].originaldevice !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong original device " + rows[0].originaldevice);
      }

      // AMQP
      if (TestAMQPresults.size != 1) {
        throw new Error("wrong number of device reservation messages found " + MapToString(TestAMQPresults));
      }
      if (!TestAMQPresults.has(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong device reservation messages found" + MapToString(TestAMQPresults));
      }
      if (TestAMQPresults.get(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") !== 1) {
        throw new Error("wrong device reservation message number found" + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('postBooking multiple devices', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      // Count number of bookings
      let [rows, _]: [any, any] = await db.execute("SELECT count(*) AS n FROM booking");
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }
      let before: number = rows[0].n;

      // Try booking
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });
      let result = await postBooking(req, { Time: { Start: dayjs("2000-01-01T07:00Z").toISOString(), End: dayjs("2000-01-01T08:00Z").toISOString() }, Devices: [{ ID: "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010" }] });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("Booking failed with status " + result.status + " " + result.body);
      }

      // Ensure number has increased by one
      [rows, _] = await db.execute("SELECT count(*) AS n FROM booking");
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }

      if (Number(rows[0].n) != Number(before) + 1) {
        throw new Error("number of bookings was changed from " + before + " to " + rows[0].n);
      }

      let split = result.body.BookingID.split("/");
      let bookingID: bigint = BigInt(split[split.length - 1]);

      [rows, _] = await db.execute("SELECT `start`,`end`,`type`,`user` FROM booking WHERE `id`=?", [bookingID]);
      if (rows.length !== 1) {
        throw new Error("wrong number of rows: " + rows.length);
      }

      if (!dayjs(rows[0].start).isSame(dayjs("2000-01-01T07:00Z"))) {
        throw new Error("wrong start " + rows[0].start);
      }

      if (!dayjs(rows[0].end).isSame(dayjs("2000-01-01T08:00Z"))) {
        throw new Error("wrong end " + rows[0].end);
      }

      if (rows[0].type != "normal") {
        throw new Error("wrong type " + rows[0].type);
      }

      if (rows[0].user != "unittest.user") {
        throw new Error("wrong user " + rows[0].user);
      }

      if (req.related.length != 1) {
        throw new Error("wrong number of related" + req.related);
      }

      if (req.related[0][0] != "user:unittest.user") {
        throw new Error("wrong related user " + req.related);
      }

      if (req.related[0][1] != "owner") {
        throw new Error("wrong related relationship " + req.related);
      }

      if (req.related[0][2] != `booking:${bookingID}`) {
        throw new Error("wrong related user " + req.related);
      }

      if (req.unrelated.length != 0) {
        throw new Error("wrong number of related" + req.unrelated);
      }

      // bookeddevices
      [rows, _] = await db.execute("SELECT count(*) AS n FROM bookeddevices WHERE booking=?", [bookingID]);
      if (rows.length !== 1) {
        throw new Error("internal error: wrong number of rows" + rows.length);
      }

      if (Number(rows[0].n) != 2) {
        throw new Error("number of booked devices is wrong: " + rows[0].n);
      }

      [rows, _] = await db.execute("SELECT originaldevice FROM bookeddevices WHERE booking=? AND originalposition=?", [bookingID, 0]);
      if (rows.length !== 1) {
        throw new Error("found " + rows.length + " devices for position 0");
      }

      if (rows[0].originaldevice !== "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong original device " + rows[0].originaldevice);
      }

      [rows, _] = await db.execute("SELECT originaldevice FROM bookeddevices WHERE booking=? AND originalposition=?", [bookingID, 1]);
      if (rows.length !== 1) {
        throw new Error("found " + rows.length + " devices for position 0");
      }

      if (rows[0].originaldevice !== "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010") {
        throw new Error("wrong original device " + rows[0].originaldevice);
      }

      // AMQP
      if (TestAMQPresults.size != 2) {
        throw new Error("wrong number of device reservation messages found " + MapToString(TestAMQPresults));
      }
      if (!TestAMQPresults.has(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong device reservation messages found" + MapToString(TestAMQPresults));
      }
      if (TestAMQPresults.get(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") !== 1) {
        throw new Error("wrong device reservation message number found" + MapToString(TestAMQPresults));
      }
      if (!TestAMQPresults.has(bookingID.toString() + "-1-http://localhost:10801/devices/00000000-0000-0000-0000-000000000010")) {
        throw new Error("wrong device reservation messages found" + MapToString(TestAMQPresults));
      }
      if (TestAMQPresults.get(bookingID.toString() + "-1-http://localhost:10801/devices/00000000-0000-0000-0000-000000000010") !== 1) {
        throw new Error("wrong device reservation message number found" + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('getBookingByID authorization failed', async function () {
    throw Error("Not implemented");
  });

  mocha.it('getBookingByID success', async function () {
    throw Error("Not implemented");
  });

  mocha.it('getBookingByID booking not available', async function () {
    throw Error("Not implemented");
  });



  mocha.it('deleteBookingByID authorization failed', async function () {
    throw Error("Not implemented");
  });

  mocha.it('deleteBookingByID success', async function () {
    throw Error("Not implemented");
  });

  mocha.it('deleteBookingByID booking not available', async function () {
    throw Error("Not implemented");
  });



  mocha.it('patchBookingByID authorization failed', async function () {
    throw Error("Not implemented");
  });

  mocha.it('patchBookingByID success unlocked', async function () {
    throw Error("Not implemented");
  });

  mocha.it('patchBookingByID success locked', async function () {
    throw Error("Not implemented");
  });

  mocha.it('patchBookingByID booking not available', async function () {
    throw Error("Not implemented");
  });

  mocha.it('patchBookingByID wrong status unlocked', async function () {
    throw Error("Not implemented");
  });

  mocha.it('patchBookingByID wrong status locked', async function () {
    throw Error("Not implemented");
  });



  mocha.it('deleteBookingByIDDestroy authorization failed', async function () {
    throw Error("Not implemented");
  });

  mocha.it('deleteBookingByIDDestroy success', async function () {
    throw Error("Not implemented");
  });

  mocha.it('deleteBookingByIDDestroy booking not available', async function () {
    throw Error("Not implemented");
  });
});
