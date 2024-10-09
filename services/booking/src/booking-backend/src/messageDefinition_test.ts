import dayjs from 'dayjs';
import * as mocha from 'mocha';

import { DeviceBookingRequest } from './messageDefinition.js';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

mocha.describe('messageDefinition.ts', function () {
  mocha.it('DeviceBookingRequest.fromString correct', async () => {
    let m = new DeviceBookingRequest(
      1n,
      new URL('http://localhost/device/superDevice'),
      3,
      dayjs('2022-08-29T13:03:00Z'),
      dayjs('2022-08-29T13:04:00Z'),
    );

    let a = JSON.stringify(m);

    let data = DeviceBookingRequest.fromString(a);

    if (data.BookingID !== m.BookingID) {
      throw new Error(
        'Mismatch in BookingID, should be ' + m.BookingID + ' , is ' + data.BookingID,
      );
    }

    if (data.Device.toString() !== m.Device.toString()) {
      throw new Error(
        'Mismatch in Device, should be ' +
          m.Device.toString() +
          ' , is ' +
          data.Device.toString(),
      );
    }

    if (data.Position !== m.Position) {
      throw new Error(
        'Mismatch in Position, should be ' + m.Position + ' , is ' + data.Position,
      );
    }

    if (!dayjs('2022-08-29T13:03:00Z').isSame(data.Start)) {
      throw new Error(
        'Mismatch in Start, should be 2022-08-29T13:03:00Z , is ' + data.Start,
      );
    }

    if (!dayjs('2022-08-29T13:04:00Z').isSame(data.End)) {
      throw new Error('Mismatch in End, should be 2022-08-29T13:04:00Z , is ' + data.End);
    }
  });

  mocha.it('DeviceBookingRequest.fromString broken', async () => {
    let bad: string[] = [
      '{"BookingID":"","Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":true,"Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":[],"Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":{},"Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"ht?:?tp##://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":true,"Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":5,"Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":[],"Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":{},"Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":"3","Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":"http://localhost/device/superDevice","Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":true,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":[],"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":{},"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"}',
      '["BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":"2022-08-29T13:04:00Z"]',
      '3',
      '{}',
      'wfiohwioäüfiäioob',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":"","End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":true,"End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":3,"End":"2022-08-29T13:04:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z"}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":""}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":true}',
      '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":3,"Start":"2022-08-29T13:03:00Z","End":3}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        DeviceBookingRequest.fromString(bad[i]);
      } catch (err) {
        console.log(err);
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });
});
