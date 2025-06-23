export declare function validateRoomOverview<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): RoomOverview<T>;

export declare function validateParticipant<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Participant<T>;

export declare function validateRoom<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Room<T>;

export declare function validateRoomId<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): RoomId<T>;

export declare function validateListRoomsResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listRoomsResponse200<T>;

export declare function validateCreateRoomBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): createRoomBody<T>;

export declare function validateCreateRoomResponse201<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createRoomResponse201<T>;

export declare function validateGetRoomResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getRoomResponse200<T>;

export declare function validateUpdateRoomBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): updateRoomBody<T>;

export declare function validateUpdateRoomResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateRoomResponse200<T>;

export declare function validateRoomOverviewRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): RoomOverviewRequest<T>;

export declare function validateRoomOverviewResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): RoomOverviewResponse<T>;

export declare function validateParticipantRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ParticipantRequest<T>;

export declare function validateParticipantResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): ParticipantResponse<T>;

export declare function validateRoomRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): RoomRequest<T>;

export declare function validateRoomResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): RoomResponse<T>;

export declare function validateRoomIdRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): RoomIdRequest<T>;

export declare function validateRoomIdResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): RoomIdResponse<T>;

export declare function validateListRoomsResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listRoomsResponse200Request<T>;

export declare function validateListRoomsResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listRoomsResponse200Response<T>;

export declare function validateCreateRoomBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createRoomBodyRequest<T>;

export declare function validateCreateRoomBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createRoomBodyResponse<T>;

export declare function validateCreateRoomResponse201Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createRoomResponse201Request<T>;

export declare function validateCreateRoomResponse201Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createRoomResponse201Response<T>;

export declare function validateGetRoomResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getRoomResponse200Request<T>;

export declare function validateGetRoomResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getRoomResponse200Response<T>;

export declare function validateUpdateRoomBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateRoomBodyRequest<T>;

export declare function validateUpdateRoomBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateRoomBodyResponse<T>;

export declare function validateUpdateRoomResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateRoomResponse200Request<T>;

export declare function validateUpdateRoomResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateRoomResponse200Response<T>;
