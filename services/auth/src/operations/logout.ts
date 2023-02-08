import { tokenRepository } from '../database/repositories/tokenRepository'
import { userRepository } from '../database/repositories/userRepository'
import { postLogoutSignature } from '../generated/signatures'

/**
 * This function implements the functionality for handling POST requests on /logout endpoint.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user or token is not found in the database.
 */
export const postLogout: postLogoutSignature = async (body, user) => {
    console.log(`postLogout called for ${user.JWT?.username}`)

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: user.JWT?.username,
        },
        relations: {
            tokens: true,
        },
    })

    const tokenModel = userModel.tokens.find(
        (tokenModel) => tokenModel.token === body.token
    )
    if (tokenModel) await tokenRepository.remove(tokenModel)

    console.log(`postLogout succeeded`)

    return {
        status: 204,
    }
}
