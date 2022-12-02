import { AppDataSource } from '../data_source'
import { getAuthSignature } from '../generated/signatures/auth'
import { ActiveKeyModel, TokenModel } from '../model'
import { allowlist } from '..'
import {
    getAllowlistedUser,
    getTokenByTokenString,
    getTokenStringFromAuthorization,
    signDeviceToken,
    signUserToken,
} from '../methods/auth'
import {
    ExpiredError,
    InconsistentDatabaseError,
    MissingEntityError,
} from '../types/errors'

/**
 * This function implements the functionality for handling GET requests on /auth endpoint.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if token is not found in database. | Can throw errors from {@link getAllowlistedUser}. (currently all caught)
 * @throws {InconsistentDatabaseError} Thrown if multiple active keys are found.
 */
export const getAuth: getAuthSignature = async (parameters) => {
    console.log(`getAuth called`)
    const HOUR = 60 * 60 * 1000
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const tokenRepository = AppDataSource.getRepository(TokenModel)

    // Get active key
    const activeKeys = await activeKeyRepository.find({ relations: { key: true } })
    if (activeKeys.length != 1) {
        throw new InconsistentDatabaseError('Too many active keys', 500)
    }
    const activeKey = activeKeys[0]

    // Allowlisted Auth
    try {
        if (parameters['X-Real-IP'] && allowlist[parameters['X-Real-IP']]) {
            const user = await getAllowlistedUser(parameters['X-Real-IP'])

            console.log(`signing jwt for user ${user.username}`)
            const jwt = await signUserToken(user, activeKey)

            console.log(`getAuth succeeded`)

            return {
                status: 200,
                headers: {
                    Authorization: 'Bearer ' + jwt,
                },
            }
        }
    } catch (error) {
        console.error(`Authentication of allowlisted IP failed: ${error}`)
    }

    // Non Allowlisted Auth
    try {
        // Resolve user from Authorization parameter
        const tokenString = getTokenStringFromAuthorization(parameters.Authorization)
        const token = await getTokenByTokenString(tokenString)
        const user = token.user
        if (!user) throw new MissingEntityError(`Token has no associated user`)

        // Check if token is expired
        if (token.expiresOn && new Date(token.expiresOn).getTime() < Date.now())
            throw new ExpiredError(`Token is expired`)

        let jwt
        // Check if token has a device
        if (token.device) {
            // Sign device token
            console.log(`signing jwt for device ${token.device}`)
            jwt = await signDeviceToken(token.device, user, activeKey)
        } else {
            // Sign user token
            console.log(`signing jwt for user ${user.username}`)
            jwt = await signUserToken(user, activeKey)
        }

        // Update token expiration time
        if (token.expiresOn) token.expiresOn = new Date(Date.now() + HOUR).toISOString()
        tokenRepository.save(token)

        console.log(`getAuth succeeded`)

        return {
            status: 200,
            headers: {
                Authorization: 'Bearer ' + jwt,
            },
        }
    } catch (error) {
        console.error(`getAuth failed: ${error}`)
        return {
            status: 200,
        }
    }
}
