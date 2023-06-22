import { repositories } from '../database/dataSource'
import { getAuthSignature } from '../generated/signatures'
import { allowlist, getAllowlistedUser } from '../methods/allowlist'
import { parseBearerToken, signDeviceToken, signUserToken } from '../methods/auth'
import { ExpiredError } from '../types/errors'
import {
    MissingEntityError,
    InconsistentDatabaseError,
    logger,
} from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /auth endpoint.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if token is not found in database. | Can throw errors from {@link getAllowlistedUser}. (currently all caught)
 * @throws {InconsistentDatabaseError} Thrown if multiple active keys are found.
 */
export const getAuth: getAuthSignature = async (parameters) => {
    logger.log('info', 'getAuth called')
    const HOUR = 60 * 60 * 1000

    // Catch missing authorization header (OPTIONS requests)
    if (!parameters.Authorization) {
        return {
            status: 200,
            headers: {},
        }
    }

    // Get active key
    const activeKey = await repositories.activeKey.findOneOrFail({
        where: {
            use: 'sig',
        },
    })

    const tokenString = parseBearerToken(parameters.Authorization)

    // Non Allowlisted Auth
    try {
        // Resolve user from Authorization parameter
        const token = await repositories.token.findOneOrFail({
            where: {
                token: tokenString,
            },
        })

        if (!token.user) {
            throw new InconsistentDatabaseError(`Token has no associated user`, 500)
        }

        const user = token.user

        // Check if token is expired
        if (token.expiresOn && new Date(token.expiresOn).getTime() < Date.now()) {
            throw new ExpiredError(`Token is expired`, 401)
        }

        let jwt: string
        const scopes = [
            ...token.scopes.map((scope) => scope.name),
            ...token.roles
                .map((role) => role.scopes.map((scope) => scope.name))
                .flat(1)
                .filter((value, index, self) => self.indexOf(value) === index),
        ].filter((value, index, self) => self.indexOf(value) === index)
        // Check if token has a device
        if (token.device) {
            // Sign device token
            logger.log('info', `signing jwt for device ${token.device}`)
            jwt = await signDeviceToken(token.device, user, activeKey)
        } else {
            // Sign user token
            logger.log('info', `signing jwt for user ${user.username}`)
            jwt = await signUserToken(user, activeKey, scopes)
        }

        // Update token expiration time
        if (token.expiresOn) token.expiresOn = new Date(Date.now() + HOUR).toISOString()
        repositories.token.save(token)

        logger.log('info', 'getAuth succeeded')

        return {
            status: 200,
            headers: {
                Authorization: 'Bearer ' + jwt,
            },
        }
    } catch (error) {
        // Allowlisted Auth
        if (allowlist[tokenString]) {
            const user = await getAllowlistedUser(tokenString)

            logger.log('info', `signing jwt for user ${user.username}`)
            const scopes = user.roles
                .map((role) => role.scopes.map((scope) => scope.name))
                .flat(1)
                .filter((value, index, self) => self.indexOf(value) === index)
            const jwt = await signUserToken(user, activeKey, scopes)

            logger.log('info', 'getAuth succeeded')

            return {
                status: 200,
                headers: {
                    Authorization: 'Bearer ' + jwt,
                },
            }
        } else {
            if (error instanceof MissingEntityError) {
                error.status = 401
            }
            throw error
        }
    }
}
