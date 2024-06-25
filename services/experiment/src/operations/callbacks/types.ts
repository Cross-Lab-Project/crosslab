export type BookingChangedCallback = {
  callbackType: 'event';
  eventType: 'booking-changed';
  url: string;
  status: string;
};

export function isBookingChangedCallback(
  callback: unknown,
): callback is BookingChangedCallback {
  return (
    typeof callback === 'object' &&
    callback !== null &&
    'callbackType' in callback &&
    typeof callback.callbackType === 'string' &&
    callback.callbackType === 'event' &&
    'eventType' in callback &&
    typeof callback.eventType === 'string' &&
    callback.eventType === 'booking-changed' &&
    'url' in callback &&
    typeof callback.url === 'string' &&
    'status' in callback &&
    typeof callback.status === 'string'
  );
}
