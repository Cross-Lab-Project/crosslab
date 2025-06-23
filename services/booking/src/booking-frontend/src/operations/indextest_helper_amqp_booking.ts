import { sleep } from '@crosslab/booking-service-common';
import { DeviceBookingRequest } from '@crosslab/service-booking-backend';
import * as amqplib from 'amqplib';

import { config } from '../config.js';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

let amqpTestStarted = false;

export let TestAMQPresultsBooking = new Map();

export function MapToString(map: Map<any, any>): string {
  return JSON.stringify(Object.fromEntries(map));
}

export function ResetAMQPBookingDeviceCount(): void {
  TestAMQPresultsBooking = new Map();
}

async function helperLoop(): Promise<void> {
  while (true) {
    let msg = await channel.get('device-booking', { noAck: false });

    if (typeof msg === 'boolean') {
      await sleep(20);
      continue;
    }

    if (msg === null) {
      continue;
    }
    let data: string;
    let message: DeviceBookingRequest;
    // Parse data
    try {
      data = msg.content.toString();

      if (data === 'end amqp test') {
        amqpTestStarted = false;
        return;
      }

      message = DeviceBookingRequest.fromString(data);
    } catch (error) {
      console.error('Can not parse message:', error);
      try {
        channel.ack(msg);
      } catch (error) {
        console.error('Can not ack message:', error);
      }
      continue;
    }
    try {
      let key = '' + message.BookingID + '-' + message.Position + '-' + message.Device;
      if (TestAMQPresultsBooking.has(key)) {
        TestAMQPresultsBooking.set(key, TestAMQPresultsBooking.get(key) + 1);
      }
      TestAMQPresultsBooking.set(key, 1);
      channel.ack(msg);
    } catch (err) {
      console.error('Error at helperLoop: ' + err);
    }
  }
}

export async function StartAMQPTestBooking(): Promise<void> {
  if (amqpTestStarted) {
    throw new Error('amqp mockup alreay started');
  }

  connection = await amqplib.connect(config.AmqpUrl);
  channel = await connection.createChannel();

  await channel.assertQueue('device-booking', {
    durable: true,
  });

  while (await channel.get('device-booking', { noAck: true })) {}

  helperLoop();
  amqpTestStarted = true;

  return;
}

export async function StopAMQPTestBooking(): Promise<void> {
  if (!amqpTestStarted) {
    throw new Error('amqp mockup alreay stopped');
  }

  if (
    !channel.sendToQueue('device-booking', Buffer.from('end amqp test'), {
      persistent: true,
    })
  ) {
    throw new Error('amqp queue full');
  }

  await sleep(1000);
  await channel.close();
  channel = null;
  await sleep(250);
  await connection.close();
  connection = null;

  return;
}
