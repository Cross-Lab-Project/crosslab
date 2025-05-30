import { ErrorWithStatus } from '@crosslab/service-common';

export class ReservationError extends ErrorWithStatus {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = 'ReservationError';
  }
}

export class LockingError extends ErrorWithStatus {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = 'LockingError';
  }
}

export class BookingError extends ErrorWithStatus {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = 'BookingError';
  }
}
