import { ActiveKeyModel, KeyModel, UserModel } from '../database/model'
import { SignJWT, JWTPayload, importJWK } from 'jose'
import { config } from '../config'
import {
    UserType,
} from '../generated/types'
import { MalformedParameterError, MissingEntityError, MissingParameterError } from '@crosslab/service-common'
import { allowlist } from './utils'
import { findUserModelByUsername } from '../database/methods/find'

/**
 * Try to find user associated to allowlisted IP.
 * @param ip IP from the client that is potentially allowlisted.
 * @throws {MissingEntityError} User associated with allowlisted IP needs to exist in the database.
 * @returns The user associated with the allowlisted IP.
 */
export async function getAllowlistedUser(ip: string): Promise<UserModel> {
    console.warn(
        `IP ${ip} is allowlisted, trying to find associated user ${allowlist[ip]}`
    )
    const user = await findUserModelByUsername(allowlist[ip])

    if (!user)
        throw new MissingEntityError(
            `User ${allowlist[ip]} for allowlisted IP ${ip} is not in the database`,
            500
        )

    return user
}

/**
 * This function signs a JWT.
 * @param payload Payload of the JWT.
 * @param key Key used for signing.
 * @param expirationTime Expiration time of the JWT.
 * @returns The signed JWT.
 */
export async function sign<P extends JWTPayload>(
    payload: P,
    key: KeyModel,
    expirationTime: string
) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: key.uuid })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setAudience(config.SECURITY_AUDIENCE)
        .setExpirationTime(expirationTime)
        .sign(await importJWK(JSON.parse(key.private_key), key.alg))
}

/**
 * This function signs a token for the user for the use of the microservice architecture.
 * @param user User for which the token should be signed.
 * @param activeKey Active key used for signing the token.
 * @returns The signed token.
 */
export async function signUserToken(
    user: UserModel,
    activeKey: ActiveKeyModel
): Promise<string> {
    const BASE_URL = !config.BASE_URL.endsWith('/')
        ? config.BASE_URL
        : config.BASE_URL + '/'

    return await sign<UserType>(
        {
            url: BASE_URL + `/users/${user.username}`,
            username: user.username,
            scopes: user.roles
                .map((role) => role.scopes.map((scope) => scope.name))
                .flat(1)
                .filter((value, index, self) => self.indexOf(value) === index),
        },
        activeKey.key,
        '2h'
    )
}

/**
 * This function signs a token for the device for the use of the microservice architecture.
 * @param deviceUrl The url of the device for which the token should be signed.
 * @param user User for which the token should be signed.
 * @param activeKey Active key used for signing the token.
 * @returns The signed token.
 */
export async function signDeviceToken(
    deviceUrl: string,
    user: UserModel,
    activeKey: ActiveKeyModel
): Promise<string> {
    const BASE_URL = !config.BASE_URL.endsWith('/')
        ? config.BASE_URL
        : config.BASE_URL + '/'

    return await sign<UserType>(
        {
            url: BASE_URL + `/users/${user.username}`,
            username: user.username,
            device: deviceUrl,
            scopes: user.roles
                .map((role) => role.scopes.map((s) => s.name))
                .flat(1)
                .filter((value, index, self) => self.indexOf(value) === index),
        },
        activeKey.key,
        '2h'
    )
}

/**
 * This function parses the string representation of a token from the Authorization parameter
 * @param authorization Authorization parameter from request.
 * @returns String representation of the token.
 */
export function getTokenStringFromAuthorization(authorization?: string): string {
    const regex = /Bearer (\S*)$/

    if (!authorization) {
        throw new MissingParameterError(`Authorization parameter is missing`, 401)
        // throw new Error(`Authorization parameter is missing`)
    }

    const match = authorization.match(regex)

    if (!match || match.length !== 2) {
        throw new MalformedParameterError(`Authorization parameter is malformed`, 401)
        // throw new Error(`Authorization parameter is malformed`)
    }

    return match[1]
}