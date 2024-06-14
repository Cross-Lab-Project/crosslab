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
import * as mysql from 'mysql2/promise';

import { postBookingCallbackByID, deleteBookingByIDLock, putBookingByIDLock } from './index';
import { config } from '../config'

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
  });

  mocha.afterEach(async function () {
    await tearDownDummySql();
  });

  mocha.it('putBookingByIDLock no authorization', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      let isError = false;
      try {
        await putBookingByIDLock(getFakeRequest({ user: "badActor", isAuthorized: false }), { ID: "1" });
        await sleep(250);

      } catch (err) {
        if (err.message == "test authorization failed") {
          isError = true;
        } else {
          console.log(err.message);
          throw err;
        }
      }
      if (!isError) {
        throw new Error("no access violation detected");
      }

      // Check if booking still unchanged

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "booked") {
        throw new Error("Wrong status " + rows[0].status);
      }
    } finally {
      db.end();
    }
  });

  mocha.it('putBookingByIDLock lock success', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      let result = await putBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      if(result.body.length != 1){
        throw new Error("number of devices wrong "+ result.body.length);
      } 

      if(result.body[0].Requested != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"){
        throw new Error("wrong requested devive 0 " + result.body[0].Requested);
      }

      if(result.body[0].Selected != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"){
        throw new Error("wrong selected devive 0 " + result.body[0].Selected);
      } 

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "active") {
        throw new Error("Wrong status " + rows[0].status);
      }

      if (!fakeServerConfig.callback_test_local_single_was_called) {
        throw new Error("callback not called");
      }
    } finally {
      db.end();
    }
  });

  mocha.it('putBookingByIDLock lock success multiple', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      let result = await putBookingByIDLock(getFakeRequest(), { ID: "2" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      if(result.body.length != 2){
        throw new Error("number of devices wrong "+ result.body.length);
      } 

      if(result.body[0].Requested != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"){
        throw new Error("wrong requested devive 0 " + result.body[0].Requested);
      }

      if(result.body[0].Selected != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"){
        throw new Error("wrong selected devive 0 " + result.body[0].Selected);
      } 

      if(result.body[1].Requested != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000"){
        throw new Error("wrong requested devive 0 " + result.body[1].Requested);
      }

      if(result.body[1].Selected != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000"){
        throw new Error("wrong selected devive 0 " + result.body[1].Selected);
      } 

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(2)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "active") {
        throw new Error("Wrong status " + rows[0].status);
      }

      if (!fakeServerConfig.callback_test_local_two_first_was_called) {
        throw new Error("callback not called");
      }
      if (!fakeServerConfig.callback_test_local_two_second_was_called) {
        throw new Error("callback not called");
      }
    } finally {
      db.end();
    }
  });

  mocha.it('putBookingByIDLock lock success group', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      let result = await putBookingByIDLock(getFakeRequest(), { ID: "3" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      if(result.body.length != 1){
        throw new Error("number of devices wrong "+ result.body.length);
      } 

      if(result.body[0].Requested != "http://localhost:10801/devices/00000000-0000-0000-0000-000000000010"){
        throw new Error("wrong requested devive 0 " + result.body[0].Requested);
      }

      if(result.body[0].Selected != "http://localhost:10801/devices/20000000-0000-0000-0000-000000000000"){
        throw new Error("wrong selected devive 0 " + result.body[0].Selected);
      } 

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(3)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "active") {
        throw new Error("Wrong status " + rows[0].status);
      }

      if (!fakeServerConfig.callback_test_local_group_was_called) {
        throw new Error("callback not called");
      }
    } finally {
      db.end();
    }
  });

  mocha.it('putBookingByIDLock already locked', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);
      let result = await putBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      if(result.body.length != 1){
        throw new Error("number of devices wrong "+ result.body.length);
      } 

      if(result.body[0].Requested != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"){
        throw new Error("wrong requested devive 0 " + result.body[0].Requested);
      }

      if(result.body[0].Selected != "http://localhost:10801/devices/10000000-0000-0000-0000-000000000000"){
        throw new Error("wrong selected devive 0 " + result.body[0].Selected);
      } 

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "active") {
        throw new Error("Wrong status " + rows[0].status);
      }
    } finally {
      db.end();
    }
  });

  mocha.it('putBookingByIDLock wrong status', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["pending", BigInt(1)]);
      let result = await putBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 412) {
        throw new Error("wrong status " + result.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "pending") {
        throw new Error("Wrong status " + rows[0].status);
      }
    } finally {
      db.end();
    }
  });

  mocha.it('putBookingByIDLock no booking', async function () {
    try {
        let res = await putBookingByIDLock(getFakeRequest({ user: "unittest.user", isAuthorized: true }), { ID: "999999999999999" });
        await sleep(250);
        if(res.status != 404){
          throw new Error("wrong status " + res.status)
        } 
    } finally {
    }
  });

  mocha.it('deleteBookingByIDLock no authorization', async function () {
    let isError = false;
    try {
      await deleteBookingByIDLock(getFakeRequest({ user: "badActor", isAuthorized: false }), { ID: "" });
      await sleep(250);

    } catch (err) {
      if (err.message == "test authorization failed") {
        isError = true;
      } else {
        console.log(err.message);
        throw err;
      }
    }
    if (!isError) {
      throw new Error("no access violation detected");
    }
  });

  mocha.it('deleteBookingByIDLock unlock success', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["active", BigInt(1)]);
      let result = await deleteBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "booked") {
        throw new Error("Wrong status " + rows[0].status);
      }

      if (!fakeServerConfig.callback_test_local_single_was_called) {
        throw new Error("callback not called");
      }
    } finally {
      db.end();
    }
  });

  mocha.it('deleteBookingByIDLock already unlocked', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      let result = await deleteBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "booked") {
        throw new Error("Wrong status " + rows[0].status);
      }
    } finally {
      db.end();
    }
  });

  mocha.it('deleteBookingByIDLock wrong status', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["pending", BigInt(1)]);
      let result = await deleteBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 412) {
        throw new Error("wrong status " + result.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "pending") {
        throw new Error("Wrong status " + rows[0].status);
      }
    } finally {
      db.end();
    }
  });

  mocha.it('deleteBookingByIDLock edge case active-pending', async function () {
    let db = await mysql.createConnection(config.BookingDSN);
    await db.connect();

    try {
      await db.execute("UPDATE booking SET `status`=? WHERE `id`=?", ["active-pending", BigInt(1)]);
      let result = await deleteBookingByIDLock(getFakeRequest(), { ID: "1" });
      await sleep(250);

      if (result.status != 200) {
        throw new Error("wrong status " + result.status);
      }

      let [rows, _]: [any, any] = await db.execute("SELECT `status` FROM booking WHERE `id`=?", [BigInt(1)]);
      if (rows.length == 0) {
        throw Error("booking not found")
      }
      if (rows[0].status !== "pending") {
        throw new Error("Wrong status " + rows[0].status);
      }
    } finally {
      db.end();
    }
  });

  mocha.it('deleteBookingByIDLock no booking', async function () {
    try {
        let res = await deleteBookingByIDLock(getFakeRequest({ user: "unittest.user", isAuthorized: true }), { ID: "999999999999999" });
        await sleep(250);
        if(res.status != 404){
          throw new Error("wrong status " + res.status)
        } 
    } finally {
    }
  });

  mocha.it('postBookingCallbackByID no authorization', async function () {
    let isError = false;
    try {
      await postBookingCallbackByID(getFakeRequest({ user: "badActor", isAuthorized: false }), { ID: "" });
      await sleep(250);

    } catch (err) {
      if (err.message == "test authorization failed") {
        isError = true;
      } else {
        console.log(err.message);
        throw err;
      }
    }
    if (!isError) {
      throw new Error("no access violation detected");
    }
  });

  mocha.it('postBookingCallbackByID success', async function () {
      await postBookingCallbackByID(getFakeRequest(), { ID: "1" });
      await sleep(250);
  });

  mocha.it('putBookingByIDLock no booking', async function () {
    try {
        let res = await postBookingCallbackByID(getFakeRequest({ user: "unittest.user", isAuthorized: true }), { ID: "999999999999999" });
        await sleep(250);
        if(res.status != 404){
          throw new Error("wrong status " + res.status)
        } 
    } finally {
    }
  });
});
