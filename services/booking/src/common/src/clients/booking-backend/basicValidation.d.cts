export declare function validateBooking<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Booking<T>;

export declare function validateDevice<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Device<T>;

export declare function validateExperiment<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Experiment<T>;

export declare function validateTimeslot<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Timeslot<T>;

export declare function validateID<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): ID<T>;

export declare function validateLockBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse200<T>;

export declare function validateLockBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse500<T>;

export declare function validateUnlockBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): unlockBookingResponse500<T>;

export declare function validateBookingCallbackResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): bookingCallbackResponse500<T>;

export declare function validateBookingRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingRequest<T>;

export declare function validateBookingResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingResponse<T>;

export declare function validateDeviceRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): DeviceRequest<T>;

export declare function validateDeviceResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): DeviceResponse<T>;

export declare function validateExperimentRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ExperimentRequest<T>;

export declare function validateExperimentResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ExperimentResponse<T>;

export declare function validateTimeslotRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): TimeslotRequest<T>;

export declare function validateTimeslotResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): TimeslotResponse<T>;

export declare function validateIDRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): IDRequest<T>;

export declare function validateIDResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): IDResponse<T>;

export declare function validateLockBookingResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse200Request<T>;

export declare function validateLockBookingResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse200Response<T>;

export declare function validateLockBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse500Request<T>;

export declare function validateLockBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse500Response<T>;

export declare function validateUnlockBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): unlockBookingResponse500Request<T>;

export declare function validateUnlockBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): unlockBookingResponse500Response<T>;

export declare function validateBookingCallbackResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): bookingCallbackResponse500Request<T>;

export declare function validateBookingCallbackResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): bookingCallbackResponse500Response<T>;
