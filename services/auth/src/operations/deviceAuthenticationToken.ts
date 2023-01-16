import { MissingEntityError } from '@crosslab/service-common'
import { postDeviceAuthenticationTokenSignature } from '../generated/signatures'
import { getDevice } from '../methods/api'
import { OwnershipError } from '../types/errors'
import { userRepository } from '../database/repositories/userRepository'
import { tokenRepository } from '../database/repositories/tokenRepository'

/**
 * This function implements the functionality for handling POST requests on /device_authentication_token endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Could not find user.
 */
export const postDeviceAuthenticationToken: postDeviceAuthenticationTokenSignature = async (parameters, user) => {
    console.log(`postDeviceAuthenticationToken called`)

    const userModel = await userRepository.findOne({
        where: {
            username: user.JWT?.username
        }
    })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.JWT?.username}`, 404)

    const device = await getDevice(parameters.device_url)
    if (device.owner != user.JWT?.url) throw new OwnershipError()

    const tokenModel = await tokenRepository.create({
        user: userModel.username,
        scopes: [],
        device: device.url
    })

    // TODO: replace with function maybe?
    userModel.tokens = await userModel.tokens
    userModel.tokens.push(tokenModel)

    await userRepository.save(userModel)

    console.log(`postDeviceAuthenticationToken succeeded`)

    return {
        status: 201,
        body: tokenModel.token,
    }
}
