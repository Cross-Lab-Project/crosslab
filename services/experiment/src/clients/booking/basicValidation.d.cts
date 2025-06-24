export declare function validateBookingBase<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingBase<T>;

export declare function validateBooking<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Booking<T>;

export declare function validateBookingUpdate<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingUpdate<T>;

export declare function validateSchedule<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Schedule<T>;

export declare function validateTimeslot<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Timeslot<T>;

export declare function validateDeviceGroupMapping<
  T extends 'request' | 'response' | 'all',
>(object: unknown): DeviceGroupMapping<T>;

export declare function validateBookingChangedEventCallback<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingChangedEventCallback<T>;

export declare function validateBookingDeletedEventCallback<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingDeletedEventCallback<T>;

export declare function validateBookingId<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingId<T>;

export declare function validateChangedUrl<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): ChangedUrl<T>;

export declare function validateDeletedUrl<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): DeletedUrl<T>;

export declare function validateListBookingsResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listBookingsResponse200<T>;

export declare function validateCreateBookingBody<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createBookingBody<T>;

export declare function validateCreateBookingResponse201<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createBookingResponse201<T>;

export declare function validateGetBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse200<T>;

export declare function validateUpdateBookingBody<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingBody<T>;

export declare function validateUpdateBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateBookingResponse200<T>;

export declare function validateLockBookingResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse200<T>;

export declare function validateGetScheduleBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): getScheduleBody<T>;

export declare function validateGetScheduleResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getScheduleResponse200<T>;

export declare function validateBookingBaseRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingBaseRequest<T>;

export declare function validateBookingBaseResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingBaseResponse<T>;

export declare function validateBookingRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingRequest<T>;

export declare function validateBookingResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): BookingResponse<T>;

export declare function validateBookingUpdateRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingUpdateRequest<T>;

export declare function validateBookingUpdateResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingUpdateResponse<T>;

export declare function validateScheduleRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): ScheduleRequest<T>;

export declare function validateScheduleResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ScheduleResponse<T>;

export declare function validateTimeslotRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): TimeslotRequest<T>;

export declare function validateTimeslotResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): TimeslotResponse<T>;

export declare function validateDeviceGroupMappingRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): DeviceGroupMappingRequest<T>;

export declare function validateDeviceGroupMappingResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): DeviceGroupMappingResponse<T>;

export declare function validateBookingChangedEventCallbackRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingChangedEventCallbackRequest<T>;

export declare function validateBookingChangedEventCallbackResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingChangedEventCallbackResponse<T>;

export declare function validateBookingDeletedEventCallbackRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingDeletedEventCallbackRequest<T>;

export declare function validateBookingDeletedEventCallbackResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingDeletedEventCallbackResponse<T>;

export declare function validateBookingIdRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingIdRequest<T>;

export declare function validateBookingIdResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): BookingIdResponse<T>;

export declare function validateChangedUrlRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ChangedUrlRequest<T>;

export declare function validateChangedUrlResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ChangedUrlResponse<T>;

export declare function validateDeletedUrlRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): DeletedUrlRequest<T>;

export declare function validateDeletedUrlResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): DeletedUrlResponse<T>;

export declare function validateListBookingsResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listBookingsResponse200Request<T>;

export declare function validateListBookingsResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listBookingsResponse200Response<T>;

export declare function validateCreateBookingBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createBookingBodyRequest<T>;

export declare function validateCreateBookingBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createBookingBodyResponse<T>;

export declare function validateCreateBookingResponse201Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createBookingResponse201Request<T>;

export declare function validateCreateBookingResponse201Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createBookingResponse201Response<T>;

export declare function validateGetBookingResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse200Request<T>;

export declare function validateGetBookingResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getBookingResponse200Response<T>;

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

export declare function validateLockBookingResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse200Request<T>;

export declare function validateLockBookingResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): lockBookingResponse200Response<T>;

export declare function validateGetScheduleBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getScheduleBodyRequest<T>;

export declare function validateGetScheduleBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getScheduleBodyResponse<T>;

export declare function validateGetScheduleResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getScheduleResponse200Request<T>;

export declare function validateGetScheduleResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getScheduleResponse200Response<T>;
