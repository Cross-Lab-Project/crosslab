import { MissingEntityError } from '@crosslab/service-common'
import { AppDataSource } from '../database/data_source'
import { postLogoutSignature } from '../generated/signatures'
import { UserModel } from '../database/model'

/**
 * This function implements the functionality for handling POST requests on /logout endpoint.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user or token is not found in the database.
 */
export const postLogout: postLogoutSignature = async (body, user) => {
    console.log(`postLogout called for ${user.JWT?.username}`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({
        username: user.JWT?.username
    })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.JWT?.username}`, 404)

    userModel.tokens = await userModel.tokens ?? []
    const token = userModel.tokens.find((token) => token.token === body.token)

    if (!token)
        throw new MissingEntityError(
            `Could not find requested token in tokens of user ${user.JWT?.username}`,
            404
        )

    userModel.tokens = userModel.tokens.filter((token) => token.token !== body.token)
    await userRepository.save(userModel)

    console.log(`postLogout succeeded`)

    return {
        status: 200,
    }
}
