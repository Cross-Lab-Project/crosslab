import { sleep } from '@crosslab/booking-service-common';
import * as amqplib from 'amqplib';

import { config } from './config.js';
import { freeDevice, reservateDevice } from './internal.js';
import { DeviceBookingRequest } from './messageDefinition.js';

export async function handleFreeDeviceRequest(): Promise<void> {
  // freeDevice
  console.log('handleFreeDeviceRequest started');
  while (true) {
    try {
      let connection = await amqplib.connect(config.AmqpUrl);
      let channel = await connection.createChannel();

      await channel.assertQueue('device-freeing', {
        durable: true,
      });

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
          await freeDevice(data);
          channel.ack(msg);
        } catch (err) {
          console.log('Error freeing device:' + err);
          channel.nack(msg);
        }
      }
    } catch (err) {
      console.log(err);
      console.log('Reconnecting...');
      await sleep(1000);
    }
  }
}

export async function handleDeviceReservationRequest(): Promise<void> {
  // reservateDevice
  while (true) {
    try {
      let connection = await amqplib.connect(config.AmqpUrl);
      let channel = await connection.createChannel();

      await channel.assertQueue('device-booking', {
        durable: true,
      });

      while (true) {
        let msg = await channel.get('device-booking', { noAck: false });

        if (typeof msg === 'boolean') {
          await sleep(20);
          continue;
        }

        if (msg === null) {
          continue;
        }

        // Parse data
        let data: DeviceBookingRequest;
        try {
          data = DeviceBookingRequest.fromString(msg.content.toString());
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
          await reservateDevice(data);
          channel.ack(msg);
        } catch (err) {
          console.log('Error reservating device:' + err);
          channel.nack(msg);
        }
      }
    } catch (err) {
      console.log(err);
      console.log('Reconnecting...');
      await sleep(1000);
    }
  }
}
