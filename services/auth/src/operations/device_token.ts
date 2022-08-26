import { AppDataSource } from "../data_source"
import {
    postDeviceTokenSignature
} from "../generated/signatures/device_token"
import { TokenModel, UserModel } from "../model"
import { MissingEntityError } from "../types/errors"

/**
 * This function implements the functionality for handling POST on /device_token endpoint.
 * @throws {MissingEntityError} Could not find user.
 */
export const postDeviceToken: postDeviceTokenSignature = async (user) => {
    console.log(`postDeviceToken called`)
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

    const tokenRepository = AppDataSource.getRepository(TokenModel)
    const token = tokenRepository.create()

    userModel.tokens.push(token)
    await userRepository.save(userModel)

    console.log(`postDeviceToken succeeded`)

    return {
        status: 200,
        body: token.token
    }
}
