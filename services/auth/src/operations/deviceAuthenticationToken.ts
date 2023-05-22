import { tokenRepository } from '../database/repositories/tokenRepository'
import { userRepository } from '../database/repositories/userRepository'
import { postDeviceAuthenticationTokenSignature } from '../generated/signatures'
import { getDevice } from '../methods/api'
import { OwnershipError } from '../types/errors'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /device_authentication_token endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Could not find user.
 */
export const postDeviceAuthenticationToken: postDeviceAuthenticationTokenSignature =
    async (parameters, user) => {
        logger.log('info', 'postDeviceAuthenticationToken called')

        const userModel = await userRepository.findOneOrFail({
            where: {
                username: user.JWT.username,
            },
        })

        const device = await getDevice(parameters.device_url)
        // TODO: check that device is instance of an instantiable device
        if (
            device.owner !== user.JWT.url &&
            !user.JWT.scopes.includes('device_token') &&
            !user.JWT.scopes.includes('device_token:create') &&
            !user.JWT.scopes.includes('device_token:create:instantiable')
        ) {
            throw new OwnershipError()
        }

        const tokenModel = await tokenRepository.create({
            user: userModel.username,
            scopes: [],
            device: device.url,
            roles: ['device'],
        })

        userModel.tokens.push(tokenModel)

        await userRepository.save(userModel)

        logger.log('info', 'postDeviceAuthenticationToken succeeded')

        return {
            status: 201,
            body: tokenModel.token,
        }
    }
