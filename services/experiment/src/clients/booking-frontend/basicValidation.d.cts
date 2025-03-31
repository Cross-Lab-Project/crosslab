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

export declare function validateNewBookingBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): newBookingBody<T>;

export declare function validateNewBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingResponse200<T>;

export declare function validateNewBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingResponse500<T>;

export declare function validateUpdateBookingBody<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingBody<T>;

export declare function validateUpdateBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse200<T>;

export declare function validateUpdateBookingResponse400<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse400<T>;

export declare function validateUpdateBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse500<T>;

export declare function validateDeleteBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): deleteBookingResponse500<T>;

export declare function validateGetBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse200<T>;

export declare function validateGetBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse500<T>;

export declare function validateDestroyBookingResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): destroyBookingResponse500<T>;

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

export declare function validateNewBookingBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingBodyRequest<T>;

export declare function validateNewBookingBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingBodyResponse<T>;

export declare function validateNewBookingResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingResponse200Request<T>;

export declare function validateNewBookingResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingResponse200Response<T>;

export declare function validateNewBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingResponse500Request<T>;

export declare function validateNewBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): newBookingResponse500Response<T>;

export declare function validateUpdateBookingBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingBodyRequest<T>;

export declare function validateUpdateBookingBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingBodyResponse<T>;

export declare function validateUpdateBookingResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse200Request<T>;

export declare function validateUpdateBookingResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse200Response<T>;

export declare function validateUpdateBookingResponse400Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse400Request<T>;

export declare function validateUpdateBookingResponse400Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse400Response<T>;

export declare function validateUpdateBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse500Request<T>;

export declare function validateUpdateBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse500Response<T>;

export declare function validateDeleteBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): deleteBookingResponse500Request<T>;

export declare function validateDeleteBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): deleteBookingResponse500Response<T>;

export declare function validateGetBookingResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse200Request<T>;

export declare function validateGetBookingResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse200Response<T>;

export declare function validateGetBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse500Request<T>;

export declare function validateGetBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse500Response<T>;

export declare function validateDestroyBookingResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): destroyBookingResponse500Request<T>;

export declare function validateDestroyBookingResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): destroyBookingResponse500Response<T>;
