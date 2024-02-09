import dayjs from 'dayjs';

export class DeviceBookingRequest {
  BookingID: bigint;
  Device: URL;
  Position: number;
  Start: dayjs.Dayjs;
  End: dayjs.Dayjs;

  static fromString(json: string): DeviceBookingRequest {
    let data = JSON.parse(json);

    if (typeof data !== 'object') {
      throw new Error('Parsed string must be object');
    }

    if (data.BookingID === undefined) {
      throw new Error('DeviceBookingRequest must have BookingID');
    }
    if (
      typeof data.BookingID !== 'string' &&
      typeof data.BookingID !== 'number' &&
      typeof data.BookingID !== 'bigint'
    ) {
      throw new Error('Invalid type for BookingID: ' + typeof data.BookingID);
    }
    if (data.BookingID === '') {
      throw new Error('BookingID can not be empty string');
    }

    if (data.Device === undefined) {
      throw new Error('DeviceBookingRequest must have Device');
    }

    if (data.Position === undefined) {
      throw new Error('DeviceBookingRequest must have Position');
    }

    if (typeof data.Position !== 'number') {
      throw new Error('DeviceBookingRequest: Position must be of type number');
    }

    if (data.Start === undefined) {
      throw new Error('DeviceBookingRequest must have Start');
    }
    if (typeof data.Start !== 'string') {
      throw new Error('DeviceBookingRequest.Start must be string');
    }
    if (data.End === undefined) {
      throw new Error('DeviceBookingRequest must have End');
    }
    if (typeof data.End !== 'string') {
      throw new Error('DeviceBookingRequest.End must be string');
    }

    let start = dayjs(data.Start);
    if (!start.isValid()) {
      throw new Error('DeviceBookingRequest: Start must be valid');
    }
    let end = dayjs(data.End);
    if (!end.isValid()) {
      throw new Error('DeviceBookingRequest: End must be valid');
    }

    return new DeviceBookingRequest(
      BigInt(data.BookingID),
      new URL(data.Device),
      data.Position,
      start,
      end,
    );
  }

  public constructor(
    BookingID: bigint,
    Device: URL,
    Position: number,
    Start: dayjs.Dayjs,
    End: dayjs.Dayjs,
  ) {
    this.BookingID = BookingID;
    this.Device = Device;
    this.Position = Position;
    this.Start = Start;
    this.End = End;
  }
}
