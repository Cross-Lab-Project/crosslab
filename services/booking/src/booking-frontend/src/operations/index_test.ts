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

import { MapToString, ResetAMQPBookingDeviceCount, StartAMQPTestBooking, StopAMQPTestBooking, TestAMQPresultsBooking } from './indextest_helper_amqp_booking'
import { ResetAMQPDeviceCount, StartAMQPTestFree, StopAMQPTestFree, TestAMQPresults } from './indextest_helper_amqp_free'

import { postBooking, getBookingByID, deleteBookingByID, deleteBookingByIDDestroy, patchBookingByID } from './index';
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
    await StartAMQPTestBooking();
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
      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("device reservation messages found " + MapToString(TestAMQPresultsBooking));
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('postBooking single device', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
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
      if (TestAMQPresultsBooking.size != 1) {
        throw new Error("wrong number of device reservation messages found " + MapToString(TestAMQPresultsBooking));
      }
      if (!TestAMQPresultsBooking.has(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong device reservation messages found" + MapToString(TestAMQPresultsBooking));
      }
      if (TestAMQPresultsBooking.get(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") !== 1) {
        throw new Error("wrong device reservation message number found" + MapToString(TestAMQPresultsBooking));
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('postBooking multiple devices', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
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
      if (TestAMQPresultsBooking.size != 2) {
        throw new Error("wrong number of device reservation messages found " + MapToString(TestAMQPresultsBooking));
      }
      if (!TestAMQPresultsBooking.has(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong device reservation messages found" + MapToString(TestAMQPresultsBooking));
      }
      if (TestAMQPresultsBooking.get(bookingID.toString() + "-0-http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") !== 1) {
        throw new Error("wrong device reservation message number found" + MapToString(TestAMQPresultsBooking));
      }
      if (!TestAMQPresultsBooking.has(bookingID.toString() + "-1-http://localhost:10801/devices/00000000-0000-0000-0000-000000000010")) {
        throw new Error("wrong device reservation messages found" + MapToString(TestAMQPresultsBooking));
      }
      if (TestAMQPresultsBooking.get(bookingID.toString() + "-1-http://localhost:10801/devices/00000000-0000-0000-0000-000000000010") !== 1) {
        throw new Error("wrong device reservation message number found" + MapToString(TestAMQPresultsBooking));
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });



  mocha.it('getBookingByID authorization failed', async function () {
    try {
      let isError: boolean = false

      let req = getFakeRequest({ user: "badactor", isAuthorized: false });

      try {
        await getBookingByID(req, { ID: "1" });
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
    } finally {
    }
  });

  mocha.it('getBookingByID success single (creator)', async function () {
    try {
      let req = getFakeRequest({ user: "test", isAuthorized: true });
      let b = await getBookingByID(req, { ID: "1" });

      if (b.status !== 200) {
        throw new Error("bad status code" + b.status);
      }

      if (b.body.Locked) {
        throw new Error("booking is locked");
      }

      if (b.body.Booking.ID != "1") {
        throw new Error("bad id" + b.body.Booking.ID);
      }

      if (!b.body.Booking.You) {
        throw new Error("you is not set")
      }

      if (b.body.Booking.External) {
        throw new Error("booking is external");
      }

      if (b.body.Booking.Status != "booked") {
        throw new Error("wrong status" + b.body.Booking.Status);
      }

      if (b.body.Booking.Devices.length != 1) {
        throw new Error("wrong number of devices " + b.body.Booking.Devices.length);
      }

      if (b.body.Booking.Devices[0] != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong device 0 " + b.body.Booking.Devices[0]);
      }

      if (!dayjs('1999-01-10T06:00:00Z').isSame(dayjs(b.body.Booking.Time.Start))) {
        throw new Error("wrong start " + b.body.Booking.Time.Start);
      }

      if (dayjs(b.body.Booking.Time.Start).toISOString() != b.body.Booking.Time.Start) {
        throw new Error("start is no iso " + b.body.Booking.Time.Start);
      }

      if (!dayjs('1999-01-10T07:00:00Z').isSame(dayjs(b.body.Booking.Time.End))) {
        throw new Error("wrong end " + b.body.Booking.Time.End);
      }

      if (dayjs(b.body.Booking.Time.End).toISOString() != b.body.Booking.Time.End) {
        throw new Error("end is no iso " + b.body.Booking.Time.End);
      }
    } finally {
    }
  });

  mocha.it('getBookingByID success single (not creator)', async function () {
    try {
      let req = getFakeRequest({ user: "not_test", isAuthorized: true });
      let b = await getBookingByID(req, { ID: "1" });

      if (b.status !== 200) {
        throw new Error("bad status code" + b.status);
      }

      if (b.body.Locked) {
        throw new Error("booking is locked");
      }

      if (b.body.Booking.ID != "1") {
        throw new Error("bad id" + b.body.Booking.ID);
      }

      if (b.body.Booking.You) {
        throw new Error("you is set")
      }

      if (b.body.Booking.External) {
        throw new Error("booking is external");
      }

      if (b.body.Booking.Status != "booked") {
        throw new Error("wrong status" + b.body.Booking.Status);
      }

      if (b.body.Booking.Devices.length != 1) {
        throw new Error("wrong number of devices " + b.body.Booking.Devices.length);
      }

      if (b.body.Booking.Devices[0] != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong device 0 " + b.body.Booking.Devices[0]);
      }

      if (!dayjs('1999-01-10T06:00:00Z').isSame(dayjs(b.body.Booking.Time.Start))) {
        throw new Error("wrong start " + b.body.Booking.Time.Start);
      }

      if (dayjs(b.body.Booking.Time.Start).toISOString() != b.body.Booking.Time.Start) {
        throw new Error("start is no iso " + b.body.Booking.Time.Start);
      }

      if (!dayjs('1999-01-10T07:00:00Z').isSame(dayjs(b.body.Booking.Time.End))) {
        throw new Error("wrong end " + b.body.Booking.Time.End);
      }

      if (dayjs(b.body.Booking.Time.End).toISOString() != b.body.Booking.Time.End) {
        throw new Error("end is no iso " + b.body.Booking.Time.End);
      }
    } finally {
    }
  });

  mocha.it('getBookingByID success multiple (creator)', async function () {
    try {
      let req = getFakeRequest({ user: "test", isAuthorized: true });
      let b = await getBookingByID(req, { ID: "2" });

      if (b.status !== 200) {
        throw new Error("bad status code" + b.status);
      }

      if (b.body.Locked) {
        throw new Error("booking is locked");
      }

      if (b.body.Booking.ID != "2") {
        throw new Error("bad id" + b.body.Booking.ID);
      }

      if (!b.body.Booking.You) {
        throw new Error("you is not set")
      }

      if (b.body.Booking.External) {
        throw new Error("booking is external");
      }

      if (b.body.Booking.Status != "booked") {
        throw new Error("wrong status" + b.body.Booking.Status);
      }

      if (b.body.Booking.Devices.length != 2) {
        throw new Error("wrong number of devices " + b.body.Booking.Devices.length);
      }

      if (b.body.Booking.Devices[0] != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong device 0 " + b.body.Booking.Devices[0]);
      }

      if (b.body.Booking.Devices[1] != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000") {
        throw new Error("wrong device 1 " + b.body.Booking.Devices[1]);
      }

      if (!dayjs('1999-02-10T06:00:00Z').isSame(dayjs(b.body.Booking.Time.Start))) {
        throw new Error("wrong start " + b.body.Booking.Time.Start);
      }

      if (dayjs(b.body.Booking.Time.Start).toISOString() != b.body.Booking.Time.Start) {
        throw new Error("start is no iso " + b.body.Booking.Time.Start);
      }

      if (!dayjs('1999-02-10T07:00:00Z').isSame(dayjs(b.body.Booking.Time.End))) {
        throw new Error("wrong end " + b.body.Booking.Time.End);
      }

      if (dayjs(b.body.Booking.Time.End).toISOString() != b.body.Booking.Time.End) {
        throw new Error("end is no iso " + b.body.Booking.Time.End);
      }
    } finally {
    }
  });

  mocha.it('getBookingByID success group (creator)', async function () {
    try {
      let req = getFakeRequest({ user: "test", isAuthorized: true });
      let b = await getBookingByID(req, { ID: "3" });

      if (b.status !== 200) {
        throw new Error("bad status code" + b.status);
      }

      if (b.body.Locked) {
        throw new Error("booking is locked");
      }

      if (b.body.Booking.ID != "3") {
        throw new Error("bad id" + b.body.Booking.ID);
      }

      if (!b.body.Booking.You) {
        throw new Error("you is not set")
      }

      if (b.body.Booking.External) {
        throw new Error("booking is external");
      }

      if (b.body.Booking.Status != "booked") {
        throw new Error("wrong status" + b.body.Booking.Status);
      }

      if (b.body.Booking.Devices.length != 1) {
        throw new Error("wrong number of devices " + b.body.Booking.Devices.length);
      }

      if (b.body.Booking.Devices[0] != "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010") {
        throw new Error("wrong device 0 " + b.body.Booking.Devices[0]);
      }

      if (!dayjs('1999-03-10T06:00:00Z').isSame(dayjs(b.body.Booking.Time.Start))) {
        throw new Error("wrong start " + b.body.Booking.Time.Start);
      }

      if (dayjs(b.body.Booking.Time.Start).toISOString() != b.body.Booking.Time.Start) {
        throw new Error("start is no iso " + b.body.Booking.Time.Start);
      }

      if (!dayjs('1999-03-10T07:00:00Z').isSame(dayjs(b.body.Booking.Time.End))) {
        throw new Error("wrong end " + b.body.Booking.Time.End);
      }

      if (dayjs(b.body.Booking.Time.End).toISOString() != b.body.Booking.Time.End) {
        throw new Error("end is no iso " + b.body.Booking.Time.End);
      }
    } finally {
    }
  });

  mocha.it('getBookingByID booking not available', async function () {
    let req = getFakeRequest({ user: "test", isAuthorized: true });
    let b = await getBookingByID(req, { ID: "99999999" });

    if (b.status !== 404) {
      throw new Error("bad status code" + b.status);
    }
  });



  mocha.it('deleteBookingByID authorization failed', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      let isError: boolean = false

      let req = getFakeRequest({ user: "badactor", isAuthorized: false });

      try {
        await deleteBookingByID(req, { ID: "1" });
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

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("booking was deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 0) {
        throw new Error("freed devices found " + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('deleteBookingByID success single', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await deleteBookingByID(req, { ID: "1" });
      await sleep(250);

      if (res.status != 200) {
        if (res.status == 500) {
          throw new Error(res.body);
        }
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "cancelled") {
        throw new Error("booking was not deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 1) {
        throw new Error("wrong number of freed devices found " + MapToString(TestAMQPresults));
      }

      if (!TestAMQPresults.has(BigInt(1))) {
        throw new Error("device not freed " + MapToString(TestAMQPresults))
      }

      if (Number(TestAMQPresults.get(BigInt(1))) != 1) {
        throw new Error("wrong number of free messages " + MapToString(TestAMQPresults))
      }

    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('deleteBookingByID success multiple', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await deleteBookingByID(req, { ID: "2" });
      await sleep(250);

      if (res.status != 200) {
        if (res.status == 500) {
          throw new Error(res.body);
        }
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(2)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "cancelled") {
        throw new Error("booking was not deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 2) {
        throw new Error("wrong number of freed devices found " + MapToString(TestAMQPresults));
      }

      if (!TestAMQPresults.has(BigInt(2))) {
        throw new Error("device not freed " + MapToString(TestAMQPresults))
      }

      if (Number(TestAMQPresults.get(BigInt(2))) != 1) {
        throw new Error("wrong number of free messages " + MapToString(TestAMQPresults))
      }

      if (!TestAMQPresults.has(BigInt(3))) {
        throw new Error("device not freed " + MapToString(TestAMQPresults))
      }

      if (Number(TestAMQPresults.get(BigInt(3))) != 1) {
        throw new Error("wrong number of free messages " + MapToString(TestAMQPresults))
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('deleteBookingByID booking not available', async function () {
    let req = getFakeRequest({ user: "test", isAuthorized: true });
    let b = await deleteBookingByID(req, { ID: "99999999" });

    if (b.status !== 404) {
      throw new Error("bad status code" + b.status);
    }
  });


  mocha.it('deleteBookingByID wrong status', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);

      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });
      let res = await deleteBookingByID(req, { ID: "1" });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active") {
        throw new Error("booking was deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 0) {
        throw new Error("freed devices found " + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });




  mocha.it('patchBookingByID authorization failed callback', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let isError: boolean = false

      let req = getFakeRequest({ user: "badactor", isAuthorized: false });

      try {
        await patchBookingByID(req, { ID: "1" }, { Callback: "http://localhost:10801/test_callbacks/callback-test-new" });
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

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID success unlocked callback', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Callback: "http://localhost:10801/test_callbacks/callback-test-new" });
      await sleep(250);

      if (res.status != 200) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT `booking` FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length == 0) {
        throw new Error("can not find booking");
      }

      if (rows.length > 1) {
        throw new Error("number of rows too many " + rows.length);
      }

      if (rows[0].booking != 1n) {
        throw new Error("wrong booking id " + rows[0].bookingcallbacks);
      }

      // Check devices haven't changed
      [rows, _] = await db.execute("SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n > 1) {
        throw new Error("number of bookeddevices wrong " + rows[0].n);
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID success locked callback', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);

      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Callback: "http://localhost:10801/test_callbacks/callback-test-new", Locked: true });
      await sleep(250);

      if (res.status != 200) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT `booking` FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length == 0) {
        throw new Error("can not find booking");
      }

      if (rows.length > 1) {
        throw new Error("number of rows too many " + rows.length);
      }

      if (rows[0].booking != 1n) {
        throw new Error("wrong booking id " + rows[0].bookingcallbacks);
      }

      // Check devices haven't changed
      [rows, _] = await db.execute("SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n > 1) {
        throw new Error("number of bookeddevices wrong " + rows[0].n);
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID booking not available callback', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let req = getFakeRequest({ user: "user.unittest.", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "999999999999" }, { Callback: "http://localhost:10801/test_callbacks/callback-test-new" });
      await sleep(250);

      if (res.status != 404) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID success unlocked devices', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }] });
      await sleep(250);

      if (res.status != 200) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 2) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 0]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 1]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      if (TestAMQPresultsBooking.size != 1) {
        throw new Error("wrong number devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (!TestAMQPresultsBooking.has("1-1-http://localhost:10801/devices/20000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (Number(TestAMQPresultsBooking.has("1-1-http://localhost:10801/devices/20000000-0000-0000-0000-000000000000")) != 1) {
        throw new Error("wrong device number were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "pending") {
        throw new Error("wrong status " + rows[0].status);
      }

      // No new callbacks
      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID success unlocked devices multiple', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }, { ID: "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010" }] });
      await sleep(250);

      if (res.status != 200) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 3) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 0]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 1]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 2]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      if (TestAMQPresultsBooking.size != 2) {
        throw new Error("wrong number devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (!TestAMQPresultsBooking.has("1-1-http://localhost:10801/devices/20000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (Number(TestAMQPresultsBooking.has("1-1-http://localhost:10801/devices/20000000-0000-0000-0000-000000000000")) != 1) {
        throw new Error("wrong device number were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (!TestAMQPresultsBooking.has("1-2-http://localhost:10801/devices/00000000-0000-0000-0000-000000000010")) {
        throw new Error("wrong devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (Number(TestAMQPresultsBooking.has("1-2-http://localhost:10801/devices/00000000-0000-0000-0000-000000000010")) != 1) {
        throw new Error("wrong device number were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "pending") {
        throw new Error("wrong status " + rows[0].status);
      }
      // No new callbacks
      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID unlocked devices set locked', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], Locked: true });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID success locked devices', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);

      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], Locked: true });
      await sleep(250);

      if (res.status != 200) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 2) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 0]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      [rows, _] = await db.execute("SELECT `originaldevice` FROM bookeddevices WHERE `booking` = ? AND `originalposition`=?", [BigInt(1), 1]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].originaldevice != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000") {
        throw new Error("wrong originaldevice " + rows[0].originaldevice);
      }

      if (TestAMQPresultsBooking.size != 1) {
        throw new Error("wrong number devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (!TestAMQPresultsBooking.has("1-1-http://localhost:10801/devices/20000000-0000-0000-0000-000000000000")) {
        throw new Error("wrong devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      if (Number(TestAMQPresultsBooking.has("1-1-http://localhost:10801/devices/20000000-0000-0000-0000-000000000000")) != 1) {
        throw new Error("wrong device number were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active-pending") {
        throw new Error("wrong status " + rows[0].status);
      }

      // No new callbacks
      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID locked devices forgot locked', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], }); // no Locked here
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID booking not available devices', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let req = getFakeRequest({ user: "user.unittest.", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "999999999999" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }] });
      await sleep(250);

      if (res.status != 404) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID wrong status unlocked devices (cancelled)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["cancelled", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "cancelled") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID wrong status unlocked devices (rejected)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["rejected", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "rejected") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID wrong status unlocked devices (active-pending)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["active-pending", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active-pending") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });
  mocha.it('patchBookingByID wrong status unlocked devices (active-rejected)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["active-rejected", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active-rejected") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID wrong status locked devices (cancelled)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["cancelled", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], Locked: true });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "cancelled") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID wrong status locked devices (rejected)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["rejected", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], Locked: true });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "rejected") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });


  mocha.it('patchBookingByID wrong status locked devices (pending)', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      await db.execute("UPDATE `booking` SET `status`=? WHERE `id`=?", ["pending", BigInt(1)]);

      let req = getFakeRequest({ user: "user.unittest", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }], Locked: true });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      [rows, _] = await db.execute('SELECT count(*) AS n FROM bookeddevices WHERE `booking`=?', [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find bookeddevices");
      }

      if (rows[0].n != 1) {
        throw new Error("found " + rows[0].status + " bookeddevices");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "pending") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });

  mocha.it('patchBookingByID both callback and devices', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestBooking();
    try {
      let req = getFakeRequest({ user: "user.unittest.", isAuthorized: true });

      let res = await patchBookingByID(req, { ID: "1" }, { Callback: "http://localhost:10801/test_callbacks/callback-test-new", Devices: [{ ID: "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000" }] });
      await sleep(250);

      if (res.status != 400) {
        throw new Error("bad status code " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute('SELECT count(*) AS n FROM bookingcallbacks WHERE `url`=?', ["http://localhost:10801/test_callbacks/callback-test-new"]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].n != 0) {
        throw new Error("found " + rows[0].status + " new callbacks");
      }

      if (TestAMQPresultsBooking.size != 0) {
        throw new Error("devices were requested " + MapToString(TestAMQPresultsBooking));
      }

      [rows, _] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("wrong status " + rows[0].status);
      }
    } finally {
      db.end();
      await StopAMQPTestBooking();
      ResetAMQPBookingDeviceCount();
    }
  });



  mocha.it('deleteBookingByIDDestroy authorization failed', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      let isError: boolean = false

      let req = getFakeRequest({ user: "badactor", isAuthorized: false });

      try {
        await deleteBookingByIDDestroy(req, { ID: "1" });
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

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "booked") {
        throw new Error("booking was deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 0) {
        throw new Error("freed devices found " + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('deleteBookingByIDDestroy success single', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await deleteBookingByIDDestroy(req, { ID: "1" });
      await sleep(250);

      if (res.status != 200) {
        if (res.status == 500) {
          throw new Error(res.body);
        }
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "cancelled") {
        throw new Error("booking was not deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 1) {
        throw new Error("wrong number of freed devices found " + MapToString(TestAMQPresults));
      }

      if (!TestAMQPresults.has(BigInt(1))) {
        throw new Error("device not freed " + MapToString(TestAMQPresults))
      }

      if (Number(TestAMQPresults.get(BigInt(1))) != 1) {
        throw new Error("wrong number of free messages " + MapToString(TestAMQPresults))
      }

    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('deleteBookingByIDDestroy success multiple', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });

      let res = await deleteBookingByIDDestroy(req, { ID: "2" });
      await sleep(250);

      if (res.status != 200) {
        if (res.status == 500) {
          throw new Error(res.body);
        }
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(2)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "cancelled") {
        throw new Error("booking was not deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 2) {
        throw new Error("wrong number of freed devices found " + MapToString(TestAMQPresults));
      }

      if (!TestAMQPresults.has(BigInt(2))) {
        throw new Error("device not freed " + MapToString(TestAMQPresults))
      }

      if (Number(TestAMQPresults.get(BigInt(2))) != 1) {
        throw new Error("wrong number of free messages " + MapToString(TestAMQPresults))
      }

      if (!TestAMQPresults.has(BigInt(3))) {
        throw new Error("device not freed " + MapToString(TestAMQPresults))
      }

      if (Number(TestAMQPresults.get(BigInt(3))) != 1) {
        throw new Error("wrong number of free messages " + MapToString(TestAMQPresults))
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });

  mocha.it('deleteBookingByIDDestroy booking not available', async function () {
    let req = getFakeRequest({ user: "test", isAuthorized: true });
    let b = await deleteBookingByIDDestroy(req, { ID: "99999999" });

    if (b.status !== 404) {
      throw new Error("bad status code" + b.status);
    }
  });


  mocha.it('deleteBookingByIDDestroy wrong status', async function () {
    let db = await mysql.createConnection(getSQLDNS());
    await db.connect();
    await StartAMQPTestFree();
    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);

      let req = getFakeRequest({ user: "unittest.user", isAuthorized: true });
      let res = await deleteBookingByIDDestroy(req, { ID: "1" });
      await sleep(250);

      if (res.status != 423) {
        throw new Error("wrong status " + res.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length !== 1) {
        throw new Error("can not find booking");
      }

      if (rows[0].status != "active") {
        throw new Error("booking was deleted (status=" + rows[0].status + ")");
      }

      if (TestAMQPresults.size != 0) {
        throw new Error("freed devices found " + MapToString(TestAMQPresults));
      }
    } finally {
      db.end();
      await StopAMQPTestFree();
      ResetAMQPDeviceCount();
    }
  });
});
