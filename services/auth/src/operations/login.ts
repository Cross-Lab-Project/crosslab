import { TokenModel } from '../database/model'
import { postLoginSignature } from '../generated/signatures'
import { loginLocal, loginTui } from '../methods/login'
import { AuthenticationError, LdapAuthenticationError } from '../types/errors'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /login endpoint.
 * @param body The body of the request.
 * @throws {LdapBindError} Can throw errors from {@link loginTui}.
 * @throws {LdapError} Can throw errors from {@link loginTui}.
 * @throws {AuthenticationError} Thrown if the authentication was unsuccessful.
 */
export const postLogin: postLoginSignature = async (body) => {
    logger.log(
        'info',
        `postLogin called for ${body.username} using method ${body.method}`
    )

    let tokenModel: TokenModel | undefined
    try {
        switch (body.method) {
            case 'local':
                tokenModel = await loginLocal(body.username, body.password)
                break
            case 'tui':
                tokenModel = await loginTui(body.username, body.password)
                break
            default:
                for (const loginMethod of [loginLocal, loginTui]) {
                    try {
                        tokenModel = await loginMethod(body.username, body.password)
                        break
                    } catch (error) {
                        logger.log('error', error)
                    }
                }
        }
    } catch (error) {
        // LdapAuthenticationError -> AuthenticationError
        if (error instanceof LdapAuthenticationError) {
            throw new AuthenticationError(`Invalid login credentials`, 401)
        }

        throw error
    }

    if (!tokenModel) throw new AuthenticationError(`Authentication failed`, 401)

    logger.log('info', 'postLogin succeeded')

    return {
        status: 201,
        body: tokenModel.token,
    }
}
