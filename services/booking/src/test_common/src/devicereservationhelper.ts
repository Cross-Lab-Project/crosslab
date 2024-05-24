import { baseConfig, sleep } from '@crosslab/booking-service-common';
import {
  ReservationMessage,
  ReservationRequest,
  mainLoop,
} from '@crosslab/service-device-reservation';
import * as amqplib from 'amqplib';

var running: boolean = false;

export async function startDeviceReservation() {
  if (running) {
    throw Error('reservation already started');
  }
  let connection: amqplib.Connection = await amqplib.connect(baseConfig.AmqpUrl);
  let channel: amqplib.Channel = await connection.createChannel();

  // Ensure queue exists
  await channel.assertQueue('device-reservation', {
    durable: true,
 });

  // Drain queue for tests
  while (await channel.get('device-reservation', { noAck: true })) {}

  await channel.close();
  await connection.close();

  mainLoop();
  running = true;
  await sleep(1000);
}

export async function stopDeviceReservation() {
  if (!running) {
    throw Error('can not stop Reservation that is not running.');
  }
  let connection: amqplib.Connection = await amqplib.connect(baseConfig.AmqpUrl);
  let channel: amqplib.Channel = await connection.createChannel();

  await channel.assertQueue('device-reservation', {
    durable: true,
  });
  await channel.assertQueue('TEST_ANSWER_STOP_SERVER', {
    durable: true,
  });

  let m = new ReservationMessage(ReservationRequest.Stop, 'TEST_ANSWER_STOP_SERVER');
  channel.sendToQueue('device-reservation', Buffer.from(JSON.stringify(m)));
 await sleep(1000);

  while (await channel.get('TEST_ANSWER_STOP_SERVER', { noAck: true })) {}
  await channel.deleteQueue('TEST_ANSWER_STOP_SERVER');

  // Drain queue
  while (await channel.get('device-reservation', { noAck: true })) {}

  await channel.deleteQueue('device-reservation');

  await channel.close();
  await connection.close();

  running = false;
}
