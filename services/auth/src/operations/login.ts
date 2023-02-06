import { AuthenticationError, LdapAuthenticationError } from '../types/errors'
import { postLoginSignature } from '../generated/signatures'
import { loginLocal, loginTui } from '../methods/login'
import { TokenModel } from '../database/model'

/**
 * This function implements the functionality for handling POST requests on /login endpoint.
 * @param body The body of the request.
 * @throws {LdapBindError} Can throw errors from {@link loginTui}.
 * @throws {LdapError} Can throw errors from {@link loginTui}.
 * @throws {AuthenticationError} Thrown if the authentication was unsuccessful.
 */
export const postLogin: postLoginSignature = async (body) => {
    console.log(`postLogin called for ${body.username} using method ${body.method}`)

    let tokenModel: TokenModel | undefined
    try {
        switch (body.method) {
            case 'local':
                tokenModel = await loginLocal(body.username, body.password)
                break
            case 'tui':
                tokenModel = await loginTui(body.username, body.password)
                break
        }
    } catch (error) {
        // LdapAuthenticationError -> AuthenticationError
        if (error instanceof LdapAuthenticationError) {
            throw new AuthenticationError(`Invalid login credentials`, 401)
        }

        throw error
    }

    if (!tokenModel) throw new AuthenticationError(`Authentication failed`, 401)

    console.log(`postLogin succeeded`)

    return {
        status: 201,
        body: tokenModel.token,
    }
}
