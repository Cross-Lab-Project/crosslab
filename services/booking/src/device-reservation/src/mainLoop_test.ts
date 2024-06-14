import { baseConfig, sleep } from '@crosslab/booking-service-common';
import * as amqplib from 'amqplib';
import dayjs from 'dayjs';
import * as mocha from 'mocha';
import * as mysql from 'mysql2/promise';

import { mainLoop } from './mainLoop';
import {
  ErrorTimeoutText,
  ReservationAnswer,
  ReservationMessage,
  ReservationRequest,
} from './messageDefinition';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

let sendQueue = 'device-reservation';
let receiveQueue = 'test-answer-QUEUes';

mocha.describe('mainLoop.ts', function () {
  this.timeout(10000);

  mocha.before(function () {
    // baseConfig
    baseConfig.OwnURL = 'http://localhost:10801';
    baseConfig.InstitutePrefix = ['http://localhost:10801'];
    baseConfig.ReservationDSN =
      'mysql://test:test@localhost/unittest?supportBigNumbers=true&bigNumberStrings=true';
  });

  mocha.beforeEach(async function () {
    // Setup database
    try {
      let db = await mysql.createConnection(baseConfig.ReservationDSN);
      await db.connect();
      await db.execute(
        'CREATE TABLE reservation (`id` BIGINT UNSIGNED AUTO_INCREMENT, `device` TEXT NOT NULL, `start` DATETIME NOT NULL, `end` DATETIME NOT NULL, `bookingreference` TEXT NOT NULL, PRIMARY KEY (`id`))',
      );
      await db.execute(
        'INSERT INTO reservation (`id`, `device`, `start`, `end`, `bookingreference`) VALUES (1,?,?,?,?)',
        [
          'http://localhost/device/superDevice',
          dayjs('2022-06-27T00:10:00Z').toDate(),
          dayjs('2022-06-27T00:20:00Z').toDate(),
          'http://localhost/unitTestPrefill/1',
        ],
      );
      await db.execute(
        'INSERT INTO reservation (`id`, `device`, `start`, `end`, `bookingreference`) VALUES (2,?,?,?,?)',
        [
          'http://localhost/device/superDevice',
          dayjs('2022-06-27T00:20:00Z').toDate(),
          dayjs('2022-06-27T00:30:00Z').toDate(),
          'http://localhost/unitTestPrefill/2',
        ],
      );
      await db.execute(
        'INSERT INTO reservation (`id`, `device`, `start`, `end`, `bookingreference`) VALUES (3,?,?,?,?)',
        [
          'http://localhost/device/superDevice',
          dayjs('2022-06-27T01:00:00Z').toDate(),
          dayjs('2022-06-27T02:00:00Z').toDate(),
          'http://localhost/unitTestPrefill/3',
        ],
      );
      db.end();
    } catch (err) {
      console.log('error in test setup:', err);
      throw err;
    }

    // Connect to amqp
    connection = await amqplib.connect(baseConfig.AmqpUrl);
    channel = await connection.createChannel();

    await channel.assertQueue(receiveQueue, {
      durable: false,
    });

    await channel.assertQueue(sendQueue, {
      durable: true,
    });

    // Drain queues
    while (await channel.get(receiveQueue, { noAck: true })) {}

    while (await channel.get(sendQueue, { noAck: true })) {}

    mainLoop();
    await sleep(1000);
  });

  mocha.afterEach(async function () {
    let db = await mysql.createConnection(baseConfig.ReservationDSN);
    await db.connect();
    await db.execute('DROP TABLE reservation');
    db.end();

    let m = new ReservationMessage(ReservationRequest.Stop, receiveQueue);
    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    await channel.deleteQueue(receiveQueue);

    await channel.close();
    await sleep(250);
    await connection.close();
  });

  mocha.it('mainLoop.ts get existing', async () => {
    let m = new ReservationMessage(ReservationRequest.Get, receiveQueue);
    m.ReservationID = BigInt(1);

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (!data.Successful) {
      throw new Error('Request was not successful');
    }

    if (data.Deleted) {
      throw new Error('Request was deleted');
    }

    if (data.Type != ReservationRequest.Get) {
      throw new Error(
        'Reservation wrong type, should be Get, got ' + data.ReservationRequest,
      );
    }

    if (data.Device !== 'http://localhost/device/superDevice') {
      throw new Error('Wrong device: ' + data.Device);
    }

    if (!dayjs(data.Start).isSame(dayjs('2022-06-27T00:10:00Z'))) {
      throw new Error('Wrong start: ' + data.Start);
    }

    if (!dayjs(data.End).isSame(dayjs('2022-06-27T00:20:00Z'))) {
      throw new Error('Wrong start: ' + data.End);
    }

    if (data.BookingReference !== 'http://localhost/unitTestPrefill/1') {
      throw new Error('Wrong booking reference: ' + data.BookingReference);
    }
  });

  mocha.it('mainLoop.ts get non existing', async () => {
    let m = new ReservationMessage(ReservationRequest.Get, receiveQueue);
    m.ReservationID = BigInt(999999999);

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error('Get request was successful for non-existing booking');
    }
  });

  mocha.it('mainLoop.ts delete non existing', async () => {
    let m = new ReservationMessage(ReservationRequest.Delete, receiveQueue);
    m.ReservationID = BigInt(999999999);

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error('Delete request was successful for non-existing booking');
    }
  });

  mocha.it('mainLoop.ts basic reservate -> get -> delete', async () => {
    // reservate
    let m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T00:30:00Z');
    m.End = dayjs('2022-06-27T01:00:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (!data.Successful) {
      throw new Error('Reservation not successful: ' + data.ErrorMessage);
    }
    if (data.Deleted) {
      throw new Error('Request was deleted');
    }
    if (data.Type != ReservationRequest.New) {
      throw new Error(
        'Reservation wrong type, should be New, got ' + data.ReservationRequest,
      );
    }

    let id = BigInt(data.ReservationID);

    // get
    m = new ReservationMessage(ReservationRequest.Get, receiveQueue);
    m.ReservationID = id;

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (!data.Successful) {
      throw new Error('Request was not successful');
    }

    if (data.Deleted) {
      throw new Error('Request was deleted');
    }

    if (data.Device !== 'http://localhost/device/superDevice') {
      throw new Error('Wrong device: ' + data.Device);
    }

    if (!dayjs(data.Start).isSame(dayjs('2022-06-27T00:30:00Z'))) {
      throw new Error('Wrong start: ' + data.Start);
    }

    if (!dayjs(data.End).isSame(dayjs('2022-06-27T01:00:00Z'))) {
      throw new Error('Wrong start: ' + data.End);
    }

    if (data.BookingReference !== 'http://localhost/unitTest') {
      throw new Error('Wrong booking reference: ' + data.BookingReference);
    }

    if (data.Type != ReservationRequest.Get) {
      throw new Error(
        'Reservation wrong type, should be Get, got ' + data.ReservationRequest,
      );
    }

    // delete
    m = new ReservationMessage(ReservationRequest.Delete, receiveQueue);
    m.ReservationID = id;

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (!data.Successful) {
      throw new Error('Request was not successful');
    }

    if (!data.Deleted) {
      throw new Error('Request was not deleted');
    }

    if (data.Type != ReservationRequest.Delete) {
      throw new Error(
        'Reservation wrong type, should be Delete, got ' + data.ReservationRequest,
      );
    }

    // reservate 2
    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest2');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T00:30:00Z');
    m.End = dayjs('2022-06-27T01:00:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (!data.Successful) {
      throw new Error('Reservation (2) not successful: ' + data.ErrorMessage);
    }

    if (data.Deleted) {
      throw new Error('Request was deleted');
    }

    if (data.Type != ReservationRequest.New) {
      throw new Error(
        'Reservation wrong type, should be New (2), got ' + data.ReservationRequest,
      );
    }

    // get nothing longer there
    m = new ReservationMessage(ReservationRequest.Get, receiveQueue);
    m.ReservationID = id;

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error('Request was successful but reservation was deleted');
    }

    if (data.Type != ReservationRequest.Get) {
      throw new Error(
        'Reservation wrong type, should be Get (2), got ' + data.ReservationRequest,
      );
    }
  });

  mocha.it('mainLoop.ts reservate booked slot', async () => {
    // before
    let m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T00:45:00Z');
    m.End = dayjs('2022-06-27T01:15:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (1) was successful but shouldn't");
    }
    if (data.Deleted) {
      throw new Error('Request was deleted');
    }
    if (data.Type != ReservationRequest.New) {
      throw new Error(
        'Reservation wrong type, should be New, got ' + data.ReservationRequest,
      );
    }

    // after
    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:45:00Z');
    m.End = dayjs('2022-06-27T02:15:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (2) was successful but shouldn't");
    }
    if (data.Deleted) {
      throw new Error('Request was deleted');
    }
    if (data.Type != ReservationRequest.New) {
      throw new Error(
        'Reservation wrong type, should be New, got ' + data.ReservationRequest,
      );
    }

    // encapsuled
    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:15:00Z');
    m.End = dayjs('2022-06-27T01:45:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (3) was successful but shouldn't");
    }
    if (data.Deleted) {
      throw new Error('Request was deleted');
    }
    if (data.Type != ReservationRequest.New) {
      throw new Error(
        'Reservation wrong type, should be New, got ' + data.ReservationRequest,
      );
    }

    // embracing
    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T00:45:00Z');
    m.End = dayjs('2022-06-27T02:15:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (4) was successful but shouldn't");
    }
    if (data.Deleted) {
      throw new Error('Request was deleted');
    }
    if (data.Type != ReservationRequest.New) {
      throw new Error(
        'Reservation wrong type, should be New, got ' + data.ReservationRequest,
      );
    }
  });

  mocha.it('mainLoop.ts new missing values', async () => {
    let m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.Device = new URL('http://localhost/device/superDevice');
    m.End = dayjs('2022-06-27T02:15:00Z');
    m.Start = dayjs('2022-06-27T00:45:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (1) was successful but shouldn't");
    }

    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.End = dayjs('2022-06-27T02:15:00Z');
    m.Start = dayjs('2022-06-27T00:45:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (2) was successful but shouldn't");
    }

    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T00:45:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (3) was successful but shouldn't");
    }

    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.End = dayjs('2022-06-27T02:15:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (4) was successful but shouldn't");
    }
  });


  mocha.it('mainLoop.ts get missing values', async () => {
    let m = new ReservationMessage(ReservationRequest.Get, receiveQueue);

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (4) was successful but shouldn't");
    }
  });

  mocha.it('mainLoop.ts bad dates', async () => {
    let m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.Device = new URL('http://localhost/device/superDevice');
    m.End = dayjs('2022-06-27T02:15:00Z');
    m.Start = dayjs('2022-06-27T03:45:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (1) was successful but shouldn't");
    }

    m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.Device = new URL('http://localhost/device/superDevice');
    m.End = dayjs('2022-06-27T02:15:00Z');
    m.Start = dayjs('2022-06-27T02:15:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (2) was successful but shouldn't");
    }
  }) ;

  mocha.it('mainLoop.ts delete missing values', async () => {
    let m = new ReservationMessage(ReservationRequest.Delete, receiveQueue);

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation (4) was successful but shouldn't");
    }
  });

  mocha.it('mainLoop.ts broken random', async () => {
    channel.sendToQueue(sendQueue, Buffer.from('ojfipwhnfipwgbwipbgr'));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });
    if (a) {
      throw new Error('Got answer');
    }
  });

  mocha.it('mainLoop.ts not us', async () => {
    let m = new ReservationMessage(ReservationRequest.New, receiveQueue);
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://127.0.0.1:10802/device/superDevice');
    m.End = dayjs('2022-06-27T02:15:00Z');
    m.Start = dayjs('2022-06-27T00:45:00Z');

    channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(m)));
    await sleep(1000);

    let a = await channel.get(receiveQueue, { noAck: true });

    if (a == null || typeof a === 'boolean') {
      throw new Error('Did not receive answer message');
    }

    let data = JSON.parse(a.content.toString());

    if (data.Successful) {
      throw new Error("Reservation was successful but shouldn't");
    }
  });
});
