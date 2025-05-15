import * as operationsBookings from './bookings/index.js';
import * as operationsSchedules from './schedule/index.js';

export default {
  ...operationsBookings,
  ...operationsSchedules,
};
