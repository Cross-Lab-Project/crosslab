export declare function validateCredentials<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Credentials<T>;

export declare function validateAuthMethod<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): AuthMethod<T>;

export declare function validateUser<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): User<T>;

export declare function validateAuthorization<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Authorization<T>;

export declare function validateXRealIP<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): XRealIP<T>;

export declare function validateXForwardedProto<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): XForwardedProto<T>;

export declare function validateUsername<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): Username<T>;

export declare function validateUserId<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): UserId<T>;

export declare function validateAuthXRequestAuthentication<
  T extends 'request' | 'response' | 'all',
>(object: unknown): authXRequestAuthentication<T>;

export declare function validateLoginBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): loginBody<T>;

export declare function validateLoginResponse201<
  T extends 'request' | 'response' | 'all',
>(object: unknown): loginResponse201<T>;

export declare function validateLogoutBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): logoutBody<T>;

export declare function validateListUsersResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listUsersResponse200<T>;

export declare function validateCreateUserBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): createUserBody<T>;

export declare function validateCreateUserResponse201<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createUserResponse201<T>;

export declare function validateGetUserResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getUserResponse200<T>;

export declare function validateUpdateUserBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): updateUserBody<T>;

export declare function validateUpdateUserResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateUserResponse200<T>;

export declare function validateGetIdentityResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getIdentityResponse200<T>;

export declare function validateUpdateIdentityBody<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateIdentityBody<T>;

export declare function validateUpdateIdentityResponse200<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateIdentityResponse200<T>;

export declare function validateCreateTokenBody<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): createTokenBody<T>;

export declare function validateCreateTokenResponse201<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createTokenResponse201<T>;

export declare function validateCredentialsRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): CredentialsRequest<T>;

export declare function validateCredentialsResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): CredentialsResponse<T>;

export declare function validateAuthMethodRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): AuthMethodRequest<T>;

export declare function validateAuthMethodResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): AuthMethodResponse<T>;

export declare function validateUserRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): UserRequest<T>;

export declare function validateUserResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): UserResponse<T>;

export declare function validateAuthorizationRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): AuthorizationRequest<T>;

export declare function validateAuthorizationResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): AuthorizationResponse<T>;

export declare function validateXRealIPRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): XRealIPRequest<T>;

export declare function validateXRealIPResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): XRealIPResponse<T>;

export declare function validateXForwardedProtoRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): XForwardedProtoRequest<T>;

export declare function validateXForwardedProtoResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): XForwardedProtoResponse<T>;

export declare function validateUsernameRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): UsernameRequest<T>;

export declare function validateUsernameResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): UsernameResponse<T>;

export declare function validateUserIdRequest<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): UserIdRequest<T>;

export declare function validateUserIdResponse<T extends 'request' | 'response' | 'all'>(
  object: unknown,
): UserIdResponse<T>;

export declare function validateAuthXRequestAuthenticationRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): authXRequestAuthenticationRequest<T>;

export declare function validateAuthXRequestAuthenticationResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): authXRequestAuthenticationResponse<T>;

export declare function validateLoginBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): loginBodyRequest<T>;

export declare function validateLoginBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): loginBodyResponse<T>;

export declare function validateLoginResponse201Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): loginResponse201Request<T>;

export declare function validateLoginResponse201Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): loginResponse201Response<T>;

export declare function validateLogoutBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): logoutBodyRequest<T>;

export declare function validateLogoutBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): logoutBodyResponse<T>;

export declare function validateListUsersResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listUsersResponse200Request<T>;

export declare function validateListUsersResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): listUsersResponse200Response<T>;

export declare function validateCreateUserBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createUserBodyRequest<T>;

export declare function validateCreateUserBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createUserBodyResponse<T>;

export declare function validateCreateUserResponse201Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createUserResponse201Request<T>;

export declare function validateCreateUserResponse201Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createUserResponse201Response<T>;

export declare function validateGetUserResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getUserResponse200Request<T>;

export declare function validateGetUserResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getUserResponse200Response<T>;

export declare function validateUpdateUserBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateUserBodyRequest<T>;

export declare function validateUpdateUserBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateUserBodyResponse<T>;

export declare function validateUpdateUserResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateUserResponse200Request<T>;

export declare function validateUpdateUserResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateUserResponse200Response<T>;

export declare function validateGetIdentityResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getIdentityResponse200Request<T>;

export declare function validateGetIdentityResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): getIdentityResponse200Response<T>;

export declare function validateUpdateIdentityBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateIdentityBodyRequest<T>;

export declare function validateUpdateIdentityBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateIdentityBodyResponse<T>;

export declare function validateUpdateIdentityResponse200Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateIdentityResponse200Request<T>;

export declare function validateUpdateIdentityResponse200Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): updateIdentityResponse200Response<T>;

export declare function validateCreateTokenBodyRequest<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createTokenBodyRequest<T>;

export declare function validateCreateTokenBodyResponse<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createTokenBodyResponse<T>;

export declare function validateCreateTokenResponse201Request<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createTokenResponse201Request<T>;

export declare function validateCreateTokenResponse201Response<
  T extends 'request' | 'response' | 'all',
>(object: unknown): createTokenResponse201Response<T>;
