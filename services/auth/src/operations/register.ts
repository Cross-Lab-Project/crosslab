import { roleRepository } from '../database/repositories/roleRepository'
import { userRepository } from '../database/repositories/userRepository'
import { postRegisterSignature } from '../generated/signatures'
import { RegistrationError } from '../types/errors'
import { InconsistentDatabaseError, MissingEntityError } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /register endpoint.
 * @param body The body of the request.
 * @throws {AuthenticationError} Thrown if the authentication was unsuccessful.
 */
export const postRegister: postRegisterSignature = async (body) => {
    console.log(`postRegister called`)

    const existingUser = await userRepository.findOne({
        where: {
            username: `local:${body.username}`,
        },
    })

    if (existingUser)
        throw new RegistrationError('User with the same username already exists', 400)

    const newUser = await userRepository.create({
        username: `local:${body.username}`,
        password: body.password,
    })

    try {
        const roleModelUser = await roleRepository.findOneOrFail({
            where: {
                name: 'user',
            },
        })
        userRepository.addRoleModelToUserModel(newUser, roleModelUser)
        await userRepository.save(newUser)
    } catch (error) {
        if (error instanceof MissingEntityError)
            throw new InconsistentDatabaseError("Role 'user' is missing in database", 500)
        else throw new RegistrationError('User could not be registered', 500)
    }

    console.log(`postRegister succeeded`)

    return {
        status: 201,
    }
}
