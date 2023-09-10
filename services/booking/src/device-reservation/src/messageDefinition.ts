import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export const ErrorTimeoutText = 'Operation timed out, please retry later';

dayjs.extend(isSameOrBefore);

export enum ReservationRequest {
  New,
  Get,
  Delete,
  Stop, // Needed for testing
}

export class ReservationMessage {
  Type: ReservationRequest;
  AnswerQueue: string;
  Device?: URL;
  Start?: dayjs.Dayjs;
  End?: dayjs.Dayjs;
  BookingReference?: URL;
  ReservationID?: bigint;

  static fromString(json: string): ReservationMessage {
    let data = JSON.parse(json);

    if (typeof data !== 'object') {
      throw new Error('Parsed string must be object');
    }

    if (data.Type === undefined) {
      throw new Error('ReservationMessage must have Type');
    }

    if (typeof data.Type == 'number') {
      data.Type = ReservationRequest[data.Type];
    }

    if (!Object.keys(ReservationRequest).includes(data.Type)) {
      throw new Error('ReservationMessage Type must fit the enum');
    }

    if (data.AnswerQueue === undefined) {
      throw new Error('ReservationMessage must be AnswerQueue');
    }

    if (typeof data.AnswerQueue !== 'string') {
      throw new Error('AnswerQueue must be string');
    }

    if (data.AnswerQueue === '') {
      throw new Error('AnswerQueue must not be an empty string');
    }

    let r = new ReservationMessage(
      ReservationRequest[data.Type as keyof typeof ReservationRequest],
      data.AnswerQueue,
    );

    if (data.Device !== undefined) {
      if (typeof data.Device !== 'string') {
        throw new Error('Device must be string');
      }
      try {
        r.Device = new URL(data.Device);
      } catch (err) {
        throw new Error(
          "Can not parse Device '" + data.device + "' as URL:" + err.toString(),
        );
      }
    }

    if (data.Start !== undefined) {
      if (typeof data.Start !== 'string') {
        throw new Error('Start must be string');
      }
      r.Start = dayjs(data.Start);
      if (!r.Start.isValid()) {
        throw new Error('Can not parse Start ' + data.Start + ' as Date');
      }
    }
    if (data.End !== undefined) {
      if (typeof data.End !== 'string') {
        throw new Error('End must be string');
      }
      r.End = dayjs(data.End);
      if (!r.End.isValid()) {
        throw new Error('Can not parse End ' + data.End + ' as Date');
      }
    }

    if (data.BookingReference !== undefined) {
      if (typeof data.BookingReference !== 'string') {
        throw new Error('BookingReference must be string');
      }
      try {
        r.BookingReference = new URL(data.BookingReference);
      } catch (err) {
        throw new Error(
          "Can not parse BookingReference '" +
            data.BookingReference +
            "' as URL:" +
            err.toString(),
        );
      }
    }

    if (data.ReservationID !== undefined) {
      if (
        typeof data.ReservationID !== 'string' &&
        typeof data.ReservationID !== 'number' &&
        typeof data.ReservationID !== 'bigint'
      ) {
        throw new Error('Invalid type for ReservationID: ' + typeof data.ReservationID);
      }
      if (data.ReservationID === '') {
        throw new Error('ReservationID can not be empty string');
      }
      try {
        r.ReservationID = BigInt(data.ReservationID);
      } catch (err) {
        throw new Error('Can not parse ReservationID as BigEnd:' + err.toString());
      }
    }

    return r;
  }

  public constructor(Type: ReservationRequest, AnswerQueue: string) {
    this.Type = Type;
    this.AnswerQueue = AnswerQueue;
  }
}

export class ReservationAnswer {
  Type: ReservationRequest;
  Device?: URL;
  Start?: dayjs.Dayjs;
  End?: dayjs.Dayjs;
  BookingReference?: URL;
  ReservationID: bigint;
  Deleted: boolean;
  Successful: boolean;
  ErrorMessage: string;

  static fromString(json: string): ReservationAnswer {
    let data = JSON.parse(json);

    if (typeof data !== 'object') {
      throw new Error('Parsed string must be object');
    }

    if (data.Type === undefined) {
      throw new Error('ReservationAnswer must have Type');
    }

    if (typeof data.Type == 'number') {
      data.Type = ReservationRequest[data.Type];
    }

    if (!Object.keys(ReservationRequest).includes(data.Type)) {
      throw new Error('ReservationAnswer Type must fit the enum');
    }

    if (data.ReservationID === undefined) {
      throw new Error('ReservationAnswer must have ReservationID');
    }

    if (
      typeof data.ReservationID !== 'string' &&
      typeof data.ReservationID !== 'number' &&
      typeof data.ReservationID !== 'bigint'
    ) {
      throw new Error('Invalid type for ReservationID: ' + typeof data.ReservationID);
    }
    if (data.ReservationID === '') {
      throw new Error('ReservationID can not be empty string');
    }
    try {
      data.ReservationID = BigInt(data.ReservationID);
    } catch (err) {
      throw new Error('Can not parse ReservationID as BigEnd:' + err.toString());
    }

    if (data.Deleted === undefined) {
      throw new Error('ReservationAnswer must have Deleted');
    }

    if (typeof data.Deleted !== 'boolean') {
      throw new Error('Deleted must be boolean');
    }

    if (data.Successful === undefined) {
      throw new Error('ReservationAnswer must have Successful');
    }

    if (typeof data.Successful !== 'boolean') {
      throw new Error('Successful must be boolean');
    }

    if (data.ErrorMessage === undefined) {
      throw new Error('ReservationAnswer must have ErrorMessage');
    }

    if (typeof data.ErrorMessage !== 'string') {
      throw new Error('ErrorMessage must be string');
    }

    let r = new ReservationAnswer(
      ReservationRequest[data.Type as keyof typeof ReservationRequest],
      data.ReservationID,
      data.Deleted,
      data.Successful,
      data.ErrorMessage,
    );

    if (data.Device !== undefined) {
      if (typeof data.Device !== 'string') {
        throw new Error('Device must be string');
      }
      try {
        r.Device = new URL(data.Device);
      } catch (err) {
        throw new Error(
          "Can not parse Device '" + data.device + "' as URL:" + err.toString(),
        );
      }
    }

    if (data.Start !== undefined) {
      if (typeof data.Start !== 'string') {
        throw new Error('Start must be string');
      }
      r.Start = dayjs(data.Start);
      if (!r.Start.isValid()) {
        throw new Error('Can not parse Start ' + data.Start + ' as Date');
      }
    }
    if (data.End !== undefined) {
      if (typeof data.End !== 'string') {
        throw new Error('End must be string');
      }
      r.End = dayjs(data.End);
      if (!r.End.isValid()) {
        throw new Error('Can not parse End ' + data.End + ' as Date');
      }
    }

    if (data.BookingReference !== undefined) {
      if (typeof data.BookingReference !== 'string') {
        throw new Error('BookingReference must be string');
      }
      try {
        r.BookingReference = new URL(data.BookingReference);
      } catch (err) {
        throw new Error(
          "Can not parse BookingReference '" +
            data.BookingReference +
            "' as URL:" +
            err.toString(),
        );
      }
    }

    return r;
  }

  public constructor(
    Type: ReservationRequest,
    ReservationID: bigint,
    Deleted: boolean,
    Successful: boolean,
    ErrorMessage: string,
  ) {
    this.Type = Type;
    this.ReservationID = ReservationID;
    this.Deleted = Deleted;
    this.Successful = Successful;
    this.ErrorMessage = ErrorMessage;
  }
}
