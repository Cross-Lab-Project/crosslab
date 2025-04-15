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

export declare function validateScheduleBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): scheduleBody<T>;

export declare function validateScheduleResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse200<T>;

export declare function validateScheduleResponse404<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse404<T>;

export declare function validateScheduleResponse422<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse422<T>;

export declare function validateScheduleResponse500<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse500<T>;

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

export declare function validateScheduleBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleBodyRequest<T>;

export declare function validateScheduleBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleBodyResponse<T>;

export declare function validateScheduleResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse200Request<T>;

export declare function validateScheduleResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse200Response<T>;

export declare function validateScheduleResponse404Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse404Request<T>;

export declare function validateScheduleResponse404Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse404Response<T>;

export declare function validateScheduleResponse422Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse422Request<T>;

export declare function validateScheduleResponse422Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse422Response<T>;

export declare function validateScheduleResponse500Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse500Request<T>;

export declare function validateScheduleResponse500Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): scheduleResponse500Response<T>;
