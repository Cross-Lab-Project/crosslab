import { repositories } from '../database/dataSource'
import { postRegisterSignature } from '../generated/signatures'
import { RegistrationError } from '../types/errors'
import {
    InconsistentDatabaseError,
    MissingEntityError,
    logger,
} from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /register endpoint.
 * @param body The body of the request.
 * @throws {AuthenticationError} Thrown if the authentication was unsuccessful.
 */
export const postRegister: postRegisterSignature = async (body) => {
    logger.log('info', 'postRegister called')

    const existingUser = await repositories.user.findOne({
        where: {
            username: `local:${body.username}`,
        },
    })

    if (existingUser)
        throw new RegistrationError('User with the same username already exists', 400)

    const newUser = await repositories.user.create({
        username: `local:${body.username}`,
        password: body.password,
    })

    try {
        const roleModelUser = await repositories.role.findOneOrFail({
            where: {
                name: 'user',
            },
        })
        repositories.user.addRoleModelToUserModel(newUser, roleModelUser)
        await repositories.user.save(newUser)
    } catch (error) {
        if (error instanceof MissingEntityError)
            throw new InconsistentDatabaseError("Role 'user' is missing in database", 500)
        else throw new RegistrationError('User could not be registered', 500)
    }

    logger.log('info', 'postRegister succeeded')

    return {
        status: 201,
        body: await repositories.user.format(newUser),
    }
}
