import { AppDataSource } from "../data_source"
import {
    postLogoutSignature
} from "../generated/signatures/logout"
import { UserModel } from "../model"
import { MissingEntityError } from "../types/errors"

/**
 * This function implements the functionality for handling POST on /logout endpoint.
 * @throws {MissingEntityError} Could not find user or token.
 */
export const postLogout: postLogoutSignature = async (body, user) => {
    console.log(`postLogout called for ${user.username}`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOne({
        where: {
            username: user.username
        },
        relations: {
            tokens: true
        }
    })

    if (!userModel) throw new MissingEntityError(`Could not find user ${user.username}`, 404)

    const token = userModel.tokens.find(t => t.token === body.token)

    if (!token) throw new MissingEntityError(`Could not find requested token in tokens of user ${user.username}`, 404)

    userModel.tokens = userModel.tokens.filter(t => t.token !== body.token)
    await userRepository.save(userModel)

    console.log(`postLogout succeeded`)

    return {
        status: 200
    }
}
