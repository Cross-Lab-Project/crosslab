import { config } from '../config.js';

/**
 * This function builds the url of a booking using its id.
 * @param bookingId The id of the booking.
 * @returns The url of the booking.
 */
export function bookingUrlFromId(bookingId: string): string {
  return (config.BASE_URL + '/bookings/' + bookingId).replace('//bookings', '/bookings');
}

export function bookingIdFromUrl(url: string): string {
  const regex = /\/bookings\/([\dA-Fa-f-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error('Invalid booking url');
}
