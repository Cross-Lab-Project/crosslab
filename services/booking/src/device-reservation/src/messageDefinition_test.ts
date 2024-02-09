import dayjs from 'dayjs';
import * as mocha from 'mocha';

import {
  ReservationAnswer,
  ReservationMessage,
  ReservationRequest,
} from './messageDefinition';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

mocha.describe('messageDefinition.ts', function () {
  mocha.it('ReservationMessage.fromString correct', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let a = JSON.stringify(m);

    let data = ReservationMessage.fromString(a);

    if (data.Type !== m.Type) {
      throw new Error('Mismatch in Type, should be ' + m.Type + ' , is ' + data.Type);
    }

    if (data.AnswerQueue !== m.AnswerQueue) {
      throw new Error(
        'Mismatch in AnswerQueue, should be ' +
          m.AnswerQueue +
          ' , is ' +
          data.AnswerQueue,
      );
    }

    if (data.BookingReference.toString() !== m.BookingReference.toString()) {
      throw new Error(
        'Mismatch in BookingReference, should be ' +
          m.BookingReference.toString() +
          ' , is ' +
          data.BookingReference.toString(),
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

    if (!data.Start.isSame(m.Start)) {
      throw new Error('Mismatch in Start, should be ' + m.Start + ' , is ' + data.Start);
    }

    if (!data.End.isSame(m.End)) {
      throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data.End);
    }

    if (data.ReservationID !== m.ReservationID) {
      throw new Error(
        'Mismatch in ReservationID, should be ' +
          m.ReservationID +
          ' , is ' +
          data.ReservationID,
      );
    }
  });

  mocha.it('ReservationMessage.fromString Type', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let data: ReservationMessage[] = [];

    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":0,"AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 1:' + err.toString());
    }
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 2:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    let bad: string[] = [
      '{"AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"FakeNew","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":-1,"AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":true,"AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString AnswerQueue', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let data: ReservationMessage[] = [];

    data.push(
      ReservationMessage.fromString(
        '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      ),
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":true,"BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":5,"BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString Device', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let data: ReservationMessage[] = [];

    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 1:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    data = [];

    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 2:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device !== undefined) {
        throw new Error('Mismatch in Device, should be undefined, is ' + data[i].Device);
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"htt?p#+0r://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":999,"Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":true,"Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString Start/End', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let data: ReservationMessage[] = [];

    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 1:' + err.toString());
    }
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T02:00:00.000+0100","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 2:' + err.toString());
    }
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T00:00:00.000-0100","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 3:' + err.toString());
    }
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T01:00:00.000-0100","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 4:' + err.toString());
    }
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T03:00:00.000+0100","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 5:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    data = [];
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 6:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (data[i].Start !== undefined) {
        throw new Error('Mismatch in Start, should be undefined, is ' + data[i].Start);
      }

      if (data[i].End !== undefined) {
        throw new Error('Mismatch in End, should be undefined, is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"","End":"2022-06-27T03:00:00.000-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"XXXX","End":"2022-06-27T03:00:00.000-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"XXXX","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-13-33T01:00:00.000Z","End":"2022-06-27T03:00:00.000-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-13-33T03:00:00.000-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T52:12:00.000-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T95:00:00.000Z","End":"2022-06-27T03:00:00.000-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00:00Z","End":"2022-06-27T03:00:00:00-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00Z","End":"2022-06-27T03:00:00:00-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00Z","End":true,"ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":true,"End":"2022-06-27T03:00:00:00-0100","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00Z","End":17,"ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":17,"End":"2022-06-27T03:00:00:00-0100","ReservationID":"100"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString BookingReference', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let data: ReservationMessage[] = [];

    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 1:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    data = [];
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 2:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (data[i].BookingReference !== undefined) {
        throw new Error(
          'Mismatch in BookingReference, should be undefined, is ' +
            data[i].BookingReference,
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"htt?p#+0r://localhos&?:::6t/unitrgfh?::sgTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference": 999,"Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":true,"Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString ReservationID', async () => {
    let m = new ReservationMessage(ReservationRequest.New, 'answer');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');
    m.ReservationID = BigInt(100);

    let data: ReservationMessage[] = [];

    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 1:' + err.toString());
    }
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":100}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 2:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }
    }

    data = [];
    try {
      data.push(
        ReservationMessage.fromString(
          '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error in 3:' + err.toString());
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].AnswerQueue !== m.AnswerQueue) {
        throw new Error(
          'Mismatch in AnswerQueue, should be ' +
            m.AnswerQueue +
            ' , is ' +
            data[i].AnswerQueue,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (!data[i].Start.isSame(m.Start)) {
        throw new Error(
          'Mismatch in Start, should be ' + m.Start + ' , is ' + data[i].Start,
        );
      }

      if (!data[i].End.isSame(m.End)) {
        throw new Error('Mismatch in End, should be ' + m.End + ' , is ' + data[i].End);
      }

      if (data[i].ReservationID !== undefined) {
        throw new Error(
          'Mismatch in ReservationID, should be undefined, is ' + data[i].ReservationID,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":""}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"ijuwgfbueiwfb"}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":true}',
      '{"Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"http://localhost/booking/100"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString general bad data', async () => {
    let bad: string[] = [
      '',
      '1099',
      '["Type":"New","AnswerQueue":"answer","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z","ReservationID":"100"]',
      '{}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationMessage.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  // {"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}
  mocha.it('ReservationAnswer.fromString correct', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let a = JSON.stringify(m);

    let data = ReservationAnswer.fromString(a);

    if (data.Type !== m.Type) {
      throw new Error('Mismatch in Type, should be ' + m.Type + ' , is ' + data.Type);
    }

    if (data.Device.toString() !== m.Device.toString()) {
      throw new Error(
        'Mismatch in Device, should be ' +
          m.Device.toString() +
          ' , is ' +
          data.Device.toString(),
      );
    }

    if (!m.Start.isSame(data.Start)) {
      throw new Error(
        'Mismatch in Start, should be ' +
          m.Start.toISOString() +
          ' , is ' +
          data.Start.toISOString(),
      );
    }

    if (!m.End.isSame(data.End)) {
      throw new Error(
        'Mismatch in End, should be ' +
          m.End.toISOString() +
          ' , is ' +
          data.End.toISOString(),
      );
    }

    if (data.BookingReference.toString() !== m.BookingReference.toString()) {
      throw new Error(
        'Mismatch in BookingReference, should be ' +
          m.BookingReference.toString() +
          ' , is ' +
          data.BookingReference.toString(),
      );
    }

    if (data.ReservationID !== m.ReservationID) {
      throw new Error(
        'Mismatch in ReservationID, should be ' +
          m.ReservationID +
          ' , is ' +
          data.ReservationID,
      );
    }

    if (data.Deleted !== m.Deleted) {
      throw new Error(
        'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data.Deleted,
      );
    }

    if (data.Successful !== m.Successful) {
      throw new Error(
        'Mismatch in Successfull, should be ' + m.Successful + ' , is ' + data.Successful,
      );
    }

    if (data.ErrorMessage !== m.ErrorMessage) {
      throw new Error(
        'Mismatch in ErrorMessage, should be ' +
          m.ErrorMessage +
          ' , is ' +
          data.ErrorMessage,
      );
    }
  });

  mocha.it('ReservationAnswer.fromString Type', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let data: ReservationAnswer[] = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":1,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"Get","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":2,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"Delete","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      switch (i) {
        case 0:
        case 1:
          m.Type = ReservationRequest.New;
          break;
        case 2:
        case 3:
          m.Type = ReservationRequest.Get;
          break;
        case 4:
        case 5:
          m.Type = ReservationRequest.Delete;
          break;
        default:
          throw new Error('Switch end at ' + i);
      }

      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    let bad: string[] = [
      '{"Type":10,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"Blub","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":false,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationAnswer.fromString Device', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let data: ReservationAnswer[] = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device !== undefined) {
        throw new Error("Device existing but shouldn't: " + data[i].Device);
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    let bad: string[] = [
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":true,"Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":5,"Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"ht?:#i4tp://localhost/device/broken","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationAnswer.fromString Start', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let data: ReservationAnswer[] = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T02:00:00.000+0100","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T00:00:00.000-0100","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    data = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (data[i].Start !== undefined) {
        throw new Error('Start is not undefined: ' + data[i].Start);
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-13-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":true,"End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":4,"End":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationAnswer.fromString End', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let data: ReservationAnswer[] = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T03:00:00.000+0100"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T01:00:00.000-0100"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    data = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (data[i].End !== undefined) {
        throw new Error('End is not undefined: ' + data[i].Start);
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    let bad: string[] = [
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","End":"2022-13-27T01:00:00.000Z","Start":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","End":"","Start":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","End":true,"Start":"2022-06-27T02:00:00.000Z"}',
      '{"Type":"New","ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","End":4,"Start":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationAnswer.fromString BookingReference', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let data: ReservationAnswer[] = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].BookingReference !== undefined) {
        throw new Error(
          "BookingReference existing but shouldn't: " + data[i].BookingReference,
        );
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    let bad: string[] = [
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":true,"Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":5,"Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"ht?:#i4tp://localhost/device/broken","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationAnswer.fromString ReservationID', async () => {
    let m = new ReservationAnswer(ReservationRequest.New, 7n, false, true, 'err');
    m.BookingReference = new URL('http://localhost/unitTest');
    m.Device = new URL('http://localhost/device/superDevice');
    m.Start = dayjs('2022-06-27T01:00:00Z');
    m.End = dayjs('2022-06-27T02:00:00Z');

    let data: ReservationAnswer[] = [];

    try {
      data.push(
        ReservationAnswer.fromString(
          '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
      data.push(
        ReservationAnswer.fromString(
          '{"Type":0,"ReservationID":7,"Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
        ),
      );
    } catch (err) {
      throw new Error('Error:' + err.toString());
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].Type !== m.Type) {
        throw new Error(
          'Mismatch in Type, should be ' + m.Type + ' , is ' + data[i].Type,
        );
      }

      if (data[i].Device.toString() !== m.Device.toString()) {
        throw new Error(
          'Mismatch in Device, should be ' +
            m.Device.toString() +
            ' , is ' +
            data[i].Device.toString(),
        );
      }

      if (!m.Start.isSame(data[i].Start)) {
        throw new Error(
          'Mismatch in Start, should be ' +
            m.Start.toISOString() +
            ' , is ' +
            data[i].Start.toISOString(),
        );
      }

      if (!m.End.isSame(data[i].End)) {
        throw new Error(
          'Mismatch in End, should be ' +
            m.End.toISOString() +
            ' , is ' +
            data[i].End.toISOString(),
        );
      }

      if (data[i].BookingReference.toString() !== m.BookingReference.toString()) {
        throw new Error(
          'Mismatch in BookingReference, should be ' +
            m.BookingReference.toString() +
            ' , is ' +
            data[i].BookingReference.toString(),
        );
      }

      if (data[i].ReservationID !== m.ReservationID) {
        throw new Error(
          'Mismatch in ReservationID, should be ' +
            m.ReservationID +
            ' , is ' +
            data[i].ReservationID,
        );
      }

      if (data[i].Deleted !== m.Deleted) {
        throw new Error(
          'Mismatch in Deleted, should be ' + m.Deleted + ' , is ' + data[i].Deleted,
        );
      }

      if (data[i].Successful !== m.Successful) {
        throw new Error(
          'Mismatch in Successfull, should be ' +
            m.Successful +
            ' , is ' +
            data[i].Successful,
        );
      }

      if (data[i].ErrorMessage !== m.ErrorMessage) {
        throw new Error(
          'Mismatch in ErrorMessage, should be ' +
            m.ErrorMessage +
            ' , is ' +
            data[i].ErrorMessage,
        );
      }
    }

    let bad: string[] = [
      '{"Type":0,"Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"opjhwrpiohnwi","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":true,"Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationAnswer.fromString Deleted/Successful/ErrorMessage', async () => {
    let bad: string[] = [
      '{"Type":0,"ReservationID":"7","Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":3,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":3,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":3,"BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":"false","Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":"true","ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
      '{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":true,"BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });

  mocha.it('ReservationMessage.fromString general bad data', async () => {
    let bad: string[] = [
      '',
      '1099',
      '["Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"]',
      '[{"Type":0,"ReservationID":"7","Deleted":false,"Successful":true,"ErrorMessage":"err","BookingReference":"http://localhost/unitTest","Device":"http://localhost/device/superDevice","Start":"2022-06-27T01:00:00.000Z","End":"2022-06-27T02:00:00.000Z"}]',
      '{}',
    ];
    for (let i = 0; i < bad.length; i++) {
      let fail = false;
      try {
        ReservationAnswer.fromString(bad[i]);
      } catch (err) {
        fail = true;
      }
      if (!fail) {
        throw new Error('Bad message ' + bad[i] + ' does not throw an error');
      }
    }
  });
});
