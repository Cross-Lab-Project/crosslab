import { sleep } from '@crosslab/booking-service-common';
import * as amqplib from 'amqplib';

import { config } from '../config.js';

let connection: amqplib.Connection;
let channel: amqplib.Channel;

let amqpTestStarted = false;

export let TestAMQPresults = new Map();

export function MapToString(map: Map<any, any>): string {
  return JSON.stringify(Object.fromEntries(map));
}

export function ResetAMQPDeviceCount(): void {
  TestAMQPresults = new Map();
}

async function helperLoop(): Promise<void> {
  while (true) {
    let msg = await channel.get('device-freeing', { noAck: false });

    if (typeof msg === 'boolean') {
      await sleep(20);
      continue;
    }

    if (msg === null) {
      continue;
    }

    // Parse data
    let data: bigint;
    try {
      data = BigInt(msg.content.toString());
    } catch (error) {
      console.log('Can not parse message:', error);
      try {
        channel.ack(msg);
      } catch (error) {
        console.log('Can not ack message:', error);
      }
      continue;
    }
    try {
      if (data === -9999n) {
        amqpTestStarted = false;
        return;
      }
      if (TestAMQPresults.has(data)) {
        TestAMQPresults.set(data, TestAMQPresults.get(data) + 1);
      }
      TestAMQPresults.set(data, 1);
      channel.ack(msg);
    } catch (err) {
      console.log('Error at helperLoop: ' + err);
    }
  }
}

export async function StartAMQPTestFree(): Promise<void> {
  if (amqpTestStarted) {
    throw new Error('amqp mockup alreay started');
  }

  connection = await amqplib.connect(config.AmqpUrl);
  channel = await connection.createChannel();

  await channel.assertQueue('device-freeing', {
    durable: true,
  });

  while (await channel.get('device-freeing', { noAck: true })) {}

  helperLoop();
  amqpTestStarted = true;

  return;
}

export async function StopAMQPTestFree(): Promise<void> {
  if (!amqpTestStarted) {
    throw new Error('amqp mockup alreay stopped');
  }

  if (
    !channel.sendToQueue('device-freeing', Buffer.from((-9999n).toString()), {
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
