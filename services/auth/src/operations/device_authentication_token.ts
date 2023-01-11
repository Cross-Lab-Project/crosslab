import { MissingEntityError } from '@crosslab/service-common'
import { AppDataSource } from '../database/data_source'
import { postDeviceAuthenticationTokenSignature } from '../generated/signatures'
import { getDevice } from '../methods/api'
import { TokenModel, UserModel } from '../database/model'
import { OwnershipError } from '../types/errors'

/**
 * This function implements the functionality for handling POST requests on /device_token endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Could not find user.
 */
export const postDeviceAuthenticationToken: postDeviceAuthenticationTokenSignature = async (parameters, user) => {
    console.log(`postDeviceAuthenticationToken called`)
    const userRepository = AppDataSource.getRepository(UserModel)

    const userModel = await userRepository.findOneBy({
        username: user.JWT?.username
    })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.JWT?.username}`, 404)

    const device = await getDevice(parameters.device_url)
    if (device.owner != user.JWT?.url) throw new OwnershipError()

    const tokenRepository = AppDataSource.getRepository(TokenModel)
    const token = tokenRepository.create()

    token.device = device.url

    userModel.tokens = await userModel.tokens
    userModel.tokens.push(token)
    await userRepository.save(userModel)

    console.log(`postDeviceAuthenticationToken succeeded`)

    return {
        status: 200,
        body: token.token,
    }
}
