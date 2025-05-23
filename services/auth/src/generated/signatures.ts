/**
 * This file was automatically generated by openapi-codegeneration.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source OpenAPI file,
 * and run openapi-codegeneration to regenerate this file.
 */
import {
	Require,
    SuccessResponse,
	ErrorResponse,
	Credentials,
	AuthMethod,
	User
} from "./types.js"
import express from "express"



/**
 * Function signature for handling a GET request on /auth
 */
export type getAuthSignature = (
        req: express.Request,parameters: getAuthParametersType) => Promise<getAuthResponseType> | getAuthResponseType

/**
 * Typing for the parameters of a GET request on /auth
 */
export type getAuthParametersType = {
    "Authorization"?: string,
	"X-Real-IP"?: string,
	"X-Forwarded-Proto"?: string,
}

/**
 * Typing for all possible responses to a GET request on /auth
 */
export type getAuthResponseType = getAuthSuccessResponseType | getAuthErrorResponseType

/**
 * Typing for all successful responses to a GET request on /auth
 */
export type getAuthSuccessResponseType = getAuth200ResponseType

/**
 * Typing for all error responses to a GET request on /auth
 */
export type getAuthErrorResponseType = getAuth400ResponseType | getAuth401ResponseType | getAuth403ResponseType | getAuth404ResponseType | getAuth500ResponseType

/**
 * Typing for a response with status 200 to a GET request on /auth
 */
export interface getAuth200ResponseType extends SuccessResponse {
    status: 200
    headers: {
        "XRequestAuthentication"?: string,
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 400 to a GET request on /auth
 */
export interface getAuth400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a GET request on /auth
 */
export interface getAuth401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a GET request on /auth
 */
export interface getAuth403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a GET request on /auth
 */
export interface getAuth404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a GET request on /auth
 */
export interface getAuth500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a POST request on /login
 */
export type postLoginSignature = (
        req: express.Request,body: postLoginRequestBodyType) => Promise<postLoginResponseType> | postLoginResponseType

/**
 * Typing for the request body of a POST request on /login
 */
export type postLoginRequestBodyType = Credentials<"request"> & {
	/**
	 * Authentication method.
	 */
	method?: AuthMethod<"request">
	[k: string]: unknown
}

/**
 * Typing for all possible responses to a POST request on /login
 */
export type postLoginResponseType = postLoginSuccessResponseType | postLoginErrorResponseType

/**
 * Typing for all successful responses to a POST request on /login
 */
export type postLoginSuccessResponseType = postLogin201ResponseType

/**
 * Typing for all error responses to a POST request on /login
 */
export type postLoginErrorResponseType = postLogin400ResponseType | postLogin401ResponseType | postLogin403ResponseType | postLogin404ResponseType | postLogin500ResponseType

/**
 * Typing for a response with status 201 to a POST request on /login
 */
export interface postLogin201ResponseType extends SuccessResponse {
    status: 201
    headers?: {
        [k: string]: string | undefined
    }
    body: string
}

/**
 * Typing for a response with status 400 to a POST request on /login
 */
export interface postLogin400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a POST request on /login
 */
export interface postLogin401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a POST request on /login
 */
export interface postLogin403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a POST request on /login
 */
export interface postLogin404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a POST request on /login
 */
export interface postLogin500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a POST request on /logout
 */
export type postLogoutSignature = (
        req: express.Request,body: postLogoutRequestBodyType) => Promise<postLogoutResponseType> | postLogoutResponseType

/**
 * Typing for the request body of a POST request on /logout
 */
export type postLogoutRequestBodyType = {
	/**
	 * The token to be invalidated.
	 */
	token?: string
	[k: string]: unknown
}

/**
 * Typing for all possible responses to a POST request on /logout
 */
export type postLogoutResponseType = postLogoutSuccessResponseType | postLogoutErrorResponseType

/**
 * Typing for all successful responses to a POST request on /logout
 */
export type postLogoutSuccessResponseType = postLogout204ResponseType

/**
 * Typing for all error responses to a POST request on /logout
 */
export type postLogoutErrorResponseType = postLogout400ResponseType | postLogout401ResponseType | postLogout403ResponseType | postLogout404ResponseType | postLogout500ResponseType

/**
 * Typing for a response with status 204 to a POST request on /logout
 */
export interface postLogout204ResponseType extends SuccessResponse {
    status: 204
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 400 to a POST request on /logout
 */
export interface postLogout400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a POST request on /logout
 */
export interface postLogout401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a POST request on /logout
 */
export interface postLogout403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a POST request on /logout
 */
export interface postLogout404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a POST request on /logout
 */
export interface postLogout500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a GET request on /users
 */
export type getUsersSignature = (
        req: express.Request,parameters: getUsersParametersType) => Promise<getUsersResponseType> | getUsersResponseType

/**
 * Typing for the parameters of a GET request on /users
 */
export type getUsersParametersType = {
    "username"?: string,
}

/**
 * Typing for all possible responses to a GET request on /users
 */
export type getUsersResponseType = getUsersSuccessResponseType | getUsersErrorResponseType

/**
 * Typing for all successful responses to a GET request on /users
 */
export type getUsersSuccessResponseType = getUsers200ResponseType

/**
 * Typing for all error responses to a GET request on /users
 */
export type getUsersErrorResponseType = getUsers400ResponseType | getUsers401ResponseType | getUsers403ResponseType | getUsers404ResponseType | getUsers500ResponseType

/**
 * Typing for a response with status 200 to a GET request on /users
 */
export interface getUsers200ResponseType extends SuccessResponse {
    status: 200
    headers?: {
        [k: string]: string | undefined
    }
    body: (Require<User<"response">, "url" | "id" | "username">)[]
}

/**
 * Typing for a response with status 400 to a GET request on /users
 */
export interface getUsers400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a GET request on /users
 */
export interface getUsers401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a GET request on /users
 */
export interface getUsers403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a GET request on /users
 */
export interface getUsers404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a GET request on /users
 */
export interface getUsers500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a POST request on /users
 */
export type postUsersSignature = (
        req: express.Request,body: postUsersRequestBodyType) => Promise<postUsersResponseType> | postUsersResponseType

/**
 * Typing for the request body of a POST request on /users
 */
export type postUsersRequestBodyType = Require<User<"request">, "username" | "password">

/**
 * Typing for all possible responses to a POST request on /users
 */
export type postUsersResponseType = postUsersSuccessResponseType | postUsersErrorResponseType

/**
 * Typing for all successful responses to a POST request on /users
 */
export type postUsersSuccessResponseType = postUsers201ResponseType

/**
 * Typing for all error responses to a POST request on /users
 */
export type postUsersErrorResponseType = postUsers400ResponseType | postUsers401ResponseType | postUsers403ResponseType | postUsers404ResponseType | postUsers500ResponseType

/**
 * Typing for a response with status 201 to a POST request on /users
 */
export interface postUsers201ResponseType extends SuccessResponse {
    status: 201
    headers?: {
        [k: string]: string | undefined
    }
    body: Require<User<"response">, "url" | "id" | "username">
}

/**
 * Typing for a response with status 400 to a POST request on /users
 */
export interface postUsers400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a POST request on /users
 */
export interface postUsers401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a POST request on /users
 */
export interface postUsers403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a POST request on /users
 */
export interface postUsers404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a POST request on /users
 */
export interface postUsers500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a GET request on /users/{user_id}
 */
export type getUsersByUserIdSignature = (
        req: express.Request,parameters: getUsersByUserIdParametersType) => Promise<getUsersByUserIdResponseType> | getUsersByUserIdResponseType

/**
 * Typing for the parameters of a GET request on /users/{user_id}
 */
export type getUsersByUserIdParametersType = {
    "user_id": string,
}

/**
 * Typing for all possible responses to a GET request on /users/{user_id}
 */
export type getUsersByUserIdResponseType = getUsersByUserIdSuccessResponseType | getUsersByUserIdErrorResponseType

/**
 * Typing for all successful responses to a GET request on /users/{user_id}
 */
export type getUsersByUserIdSuccessResponseType = getUsersByUserId200ResponseType

/**
 * Typing for all error responses to a GET request on /users/{user_id}
 */
export type getUsersByUserIdErrorResponseType = getUsersByUserId400ResponseType | getUsersByUserId401ResponseType | getUsersByUserId403ResponseType | getUsersByUserId404ResponseType | getUsersByUserId500ResponseType

/**
 * Typing for a response with status 200 to a GET request on /users/{user_id}
 */
export interface getUsersByUserId200ResponseType extends SuccessResponse {
    status: 200
    headers?: {
        [k: string]: string | undefined
    }
    body: Require<User<"response">, "url" | "id" | "username">
}

/**
 * Typing for a response with status 400 to a GET request on /users/{user_id}
 */
export interface getUsersByUserId400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a GET request on /users/{user_id}
 */
export interface getUsersByUserId401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a GET request on /users/{user_id}
 */
export interface getUsersByUserId403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a GET request on /users/{user_id}
 */
export interface getUsersByUserId404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a GET request on /users/{user_id}
 */
export interface getUsersByUserId500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a PATCH request on /users/{user_id}
 */
export type patchUsersByUserIdSignature = (
        req: express.Request,parameters: patchUsersByUserIdParametersType, body: patchUsersByUserIdRequestBodyType) => Promise<patchUsersByUserIdResponseType> | patchUsersByUserIdResponseType

/**
 * Typing for the parameters of a PATCH request on /users/{user_id}
 */
export type patchUsersByUserIdParametersType = {
    "user_id": string,
}

/**
 * Typing for the request body of a PATCH request on /users/{user_id}
 */
export type patchUsersByUserIdRequestBodyType = User<"request">

/**
 * Typing for all possible responses to a PATCH request on /users/{user_id}
 */
export type patchUsersByUserIdResponseType = patchUsersByUserIdSuccessResponseType | patchUsersByUserIdErrorResponseType

/**
 * Typing for all successful responses to a PATCH request on /users/{user_id}
 */
export type patchUsersByUserIdSuccessResponseType = patchUsersByUserId200ResponseType

/**
 * Typing for all error responses to a PATCH request on /users/{user_id}
 */
export type patchUsersByUserIdErrorResponseType = patchUsersByUserId400ResponseType | patchUsersByUserId401ResponseType | patchUsersByUserId403ResponseType | patchUsersByUserId404ResponseType | patchUsersByUserId500ResponseType

/**
 * Typing for a response with status 200 to a PATCH request on /users/{user_id}
 */
export interface patchUsersByUserId200ResponseType extends SuccessResponse {
    status: 200
    headers?: {
        [k: string]: string | undefined
    }
    body: Require<User<"response">, "url" | "id" | "username">
}

/**
 * Typing for a response with status 400 to a PATCH request on /users/{user_id}
 */
export interface patchUsersByUserId400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a PATCH request on /users/{user_id}
 */
export interface patchUsersByUserId401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a PATCH request on /users/{user_id}
 */
export interface patchUsersByUserId403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a PATCH request on /users/{user_id}
 */
export interface patchUsersByUserId404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a PATCH request on /users/{user_id}
 */
export interface patchUsersByUserId500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a DELETE request on /users/{user_id}
 */
export type deleteUsersByUserIdSignature = (
        req: express.Request,parameters: deleteUsersByUserIdParametersType) => Promise<deleteUsersByUserIdResponseType> | deleteUsersByUserIdResponseType

/**
 * Typing for the parameters of a DELETE request on /users/{user_id}
 */
export type deleteUsersByUserIdParametersType = {
    "user_id": string,
}

/**
 * Typing for all possible responses to a DELETE request on /users/{user_id}
 */
export type deleteUsersByUserIdResponseType = deleteUsersByUserIdSuccessResponseType | deleteUsersByUserIdErrorResponseType

/**
 * Typing for all successful responses to a DELETE request on /users/{user_id}
 */
export type deleteUsersByUserIdSuccessResponseType = deleteUsersByUserId204ResponseType

/**
 * Typing for all error responses to a DELETE request on /users/{user_id}
 */
export type deleteUsersByUserIdErrorResponseType = deleteUsersByUserId400ResponseType | deleteUsersByUserId401ResponseType | deleteUsersByUserId403ResponseType | deleteUsersByUserId404ResponseType | deleteUsersByUserId500ResponseType

/**
 * Typing for a response with status 204 to a DELETE request on /users/{user_id}
 */
export interface deleteUsersByUserId204ResponseType extends SuccessResponse {
    status: 204
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 400 to a DELETE request on /users/{user_id}
 */
export interface deleteUsersByUserId400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a DELETE request on /users/{user_id}
 */
export interface deleteUsersByUserId401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a DELETE request on /users/{user_id}
 */
export interface deleteUsersByUserId403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a DELETE request on /users/{user_id}
 */
export interface deleteUsersByUserId404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a DELETE request on /users/{user_id}
 */
export interface deleteUsersByUserId500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a GET request on /identity
 */
export type getIdentitySignature = (
        req: express.Request,) => Promise<getIdentityResponseType> | getIdentityResponseType

/**
 * Typing for all possible responses to a GET request on /identity
 */
export type getIdentityResponseType = getIdentitySuccessResponseType | getIdentityErrorResponseType

/**
 * Typing for all successful responses to a GET request on /identity
 */
export type getIdentitySuccessResponseType = getIdentity200ResponseType

/**
 * Typing for all error responses to a GET request on /identity
 */
export type getIdentityErrorResponseType = getIdentity400ResponseType | getIdentity401ResponseType | getIdentity403ResponseType | getIdentity404ResponseType | getIdentity500ResponseType

/**
 * Typing for a response with status 200 to a GET request on /identity
 */
export interface getIdentity200ResponseType extends SuccessResponse {
    status: 200
    headers?: {
        [k: string]: string | undefined
    }
    body: User<"response">
}

/**
 * Typing for a response with status 400 to a GET request on /identity
 */
export interface getIdentity400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a GET request on /identity
 */
export interface getIdentity401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a GET request on /identity
 */
export interface getIdentity403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a GET request on /identity
 */
export interface getIdentity404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a GET request on /identity
 */
export interface getIdentity500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a PATCH request on /identity
 */
export type patchIdentitySignature = (
        req: express.Request,body: patchIdentityRequestBodyType) => Promise<patchIdentityResponseType> | patchIdentityResponseType

/**
 * Typing for the request body of a PATCH request on /identity
 */
export type patchIdentityRequestBodyType = User<"request"> | undefined

/**
 * Typing for all possible responses to a PATCH request on /identity
 */
export type patchIdentityResponseType = patchIdentitySuccessResponseType | patchIdentityErrorResponseType

/**
 * Typing for all successful responses to a PATCH request on /identity
 */
export type patchIdentitySuccessResponseType = patchIdentity200ResponseType

/**
 * Typing for all error responses to a PATCH request on /identity
 */
export type patchIdentityErrorResponseType = patchIdentity400ResponseType | patchIdentity401ResponseType | patchIdentity403ResponseType | patchIdentity404ResponseType | patchIdentity500ResponseType

/**
 * Typing for a response with status 200 to a PATCH request on /identity
 */
export interface patchIdentity200ResponseType extends SuccessResponse {
    status: 200
    headers?: {
        [k: string]: string | undefined
    }
    body: User<"response">
}

/**
 * Typing for a response with status 400 to a PATCH request on /identity
 */
export interface patchIdentity400ResponseType extends ErrorResponse {
    status: 400
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 401 to a PATCH request on /identity
 */
export interface patchIdentity401ResponseType extends ErrorResponse {
    status: 401
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 403 to a PATCH request on /identity
 */
export interface patchIdentity403ResponseType extends ErrorResponse {
    status: 403
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 404 to a PATCH request on /identity
 */
export interface patchIdentity404ResponseType extends ErrorResponse {
    status: 404
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Typing for a response with status 500 to a PATCH request on /identity
 */
export interface patchIdentity500ResponseType extends ErrorResponse {
    status: 500
    headers?: {
        [k: string]: string | undefined
    }
    body?: undefined
}

/**
 * Function signature for handling a POST request on /token
 */
export type postTokenSignature = (
        req: express.Request,body: postTokenRequestBodyType) => Promise<postTokenResponseType> | postTokenResponseType

/**
 * Typing for the request body of a POST request on /token
 */
export type postTokenRequestBodyType = {
	/**
	 * Url or uuid of the user that will be used to create the token.
	 */
	user: string
	/**
	 * The claims that will be added to the token. If left empty, the token will have the full scope of the user.
	 * 
	 */
	claims?: {
		[k: string]: unknown
	}
	[k: string]: unknown
} | {
	/**
	 * Url or uuid of the user that will be used to create the token.
	 */
	username: string
	/**
	 * The claims that will be added to the token. If left empty, the token will have the full scope of the user.
	 * 
	 */
	claims?: {
		[k: string]: unknown
	}
	[k: string]: unknown
}

/**
 * Typing for all possible responses to a POST request on /token
 */
export type postTokenResponseType = postTokenSuccessResponseType

/**
 * Typing for all successful responses to a POST request on /token
 */
export type postTokenSuccessResponseType = postToken201ResponseType

/**
 * Typing for a response with status 201 to a POST request on /token
 */
export interface postToken201ResponseType extends SuccessResponse {
    status: 201
    headers?: {
        [k: string]: string | undefined
    }
    body: string
}