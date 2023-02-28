import { roleRepository } from '../database/repositories/roleRepository'
import { tokenRepository } from '../database/repositories/tokenRepository'
import { userRepository } from '../database/repositories/userRepository'
import { postDeviceAuthenticationTokenSignature } from '../generated/signatures'
import { getDevice } from '../methods/api'

/**
 * This function implements the functionality for handling POST requests on /device_authentication_token endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Could not find user.
 */
export const postDeviceAuthenticationToken: postDeviceAuthenticationTokenSignature =
    async (parameters, user) => {
        console.log(`postDeviceAuthenticationToken called`)

        const userModel = await userRepository.findOneOrFail({
            where: {
                username: user.JWT?.username,
            },
        })

        const device = await getDevice(parameters.device_url)
        if (
            device.owner !== user.JWT?.url &&
            !userModel.roles.find((role) => role.name === 'deviceservice') &&
            !userModel.roles.find((role) => role.name === 'superadmin')
        ) {
            // throw new OwnershipError() //TODO: Extended Testing by pierre (URL)
        }

        const roleModelDevice = await roleRepository.findOneOrFail({
            where: {
                name: 'device',
            },
        })

        const tokenModel = await tokenRepository.create({
            user: userModel.username,
            scopes: roleModelDevice.scopes.map((scope) => scope.name),
            device: device.url,
        })

        userModel.tokens.push(tokenModel)

        await userRepository.save(userModel)

        console.log(`postDeviceAuthenticationToken succeeded`)

        return {
            status: 201,
            body: tokenModel.token,
        }
    }
