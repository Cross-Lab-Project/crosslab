import { BookingModel } from '../database/model.js';

export function isLocked(bookingModel: BookingModel) {
  return (
    bookingModel.status === 'locked-accepted' || bookingModel.status === 'locked-rejected'
  );
}
