import { roleRepository } from '../database/repositories/roleRepository'
import { userRepository } from '../database/repositories/userRepository'
import {
    getUsersSignature,
    postUsersSignature,
    getUsersByUserIdSignature,
    deleteUsersByUserIdSignature,
    patchUsersByUserIdSignature,
    postUsersByUserIdRolesSignature,
    deleteUsersByUserIdRolesSignature,
    getUsersByUserIdRolesSignature,
} from '../generated/signatures'
import { RegistrationError } from '../types/errors'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /users endpoint.
 * @param _user The user submitting the request.
 */
export const getUsers: getUsersSignature = async (_user) => {
    logger.log('info', 'getUsers called')

    const userModels = await userRepository.find()

    logger.log('info', 'getUsers succeeded')

    return {
        status: 200,
        body: await Promise.all(userModels.map(userRepository.format)),
    }
}

/**
 * This function implements the functionality for handling POST requests on /users endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postUsers: postUsersSignature = async (body, _user) => {
    logger.log('info', 'postUsers called')

    const existingUser = await userRepository.findOne({
        where: {
            username: `local:${body.username}`,
        },
    })

    if (existingUser) {
        throw new RegistrationError('User with the same username already exists', 400)
    }

    const userModel = await userRepository.create({
        username: `local:${body.username}`,
        password: body.password,
    })
    await userRepository.save(userModel)

    logger.log('info', 'postUsers succeeded')

    return {
        status: 201,
        body: await userRepository.format(userModel),
    }
}

/**
 * This function implements the functionality for handling GET requests on /users/{user_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getUsersByUserId: getUsersByUserIdSignature = async (parameters, _user) => {
    logger.log('info', 'getUsersByUsername called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            uuid: parameters.user_id,
        },
    })

    logger.log('info', 'getUsersByUsername succeeded')

    return {
        status: 200,
        body: await userRepository.format(userModel),
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /users/{user_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const deleteUsersByUserId: deleteUsersByUserIdSignature = async (
    parameters,
    _user
) => {
    logger.log('info', 'deleteUsersByUsername called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            uuid: parameters.user_id,
        },
    })

    await userRepository.remove(userModel)

    logger.log('info', 'deleteUsersByUsername succeeded')

    return {
        status: 204,
    }
}

/**
 * This function implements the functionality for handling PATCH requests on /users/{username} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const patchUsersByUserId: patchUsersByUserIdSignature = async (
    parameters,
    body,
    _user
) => {
    logger.log('info', 'patchUsersByUsername called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            uuid: parameters.user_id,
        },
    })

    await userRepository.write(userModel, body ?? {})
    await userRepository.save(userModel)

    logger.log('info', 'patchUsersByUsername succeeded')

    return {
        status: 200,
        body: await userRepository.format(userModel),
    }
}

/**
 * This function implements the functionality for handling GET requests on /users/{user_id}/roles endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getUsersByUserIdRoles: getUsersByUserIdRolesSignature = async (
    parameters,
    _user
) => {
    logger.log('info', 'getUsersByUserIdRoles called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            uuid: parameters.user_id,
        },
    })

    await userRepository.save(userModel)

    logger.log('info', 'getUsersByUserIdRoles succeeded')

    return {
        status: 200,
        body: await Promise.all(userModel.roles.map(roleRepository.format)),
    }
}

/**
 * This function implements the functionality for handling POST requests on /users/{user_id}/roles endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user or role is not found in database.
 */
export const postUsersByUserIdRoles: postUsersByUserIdRolesSignature = async (
    parameters,
    body,
    _user
) => {
    logger.log('info', 'postUsersByUserIdRoles called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            uuid: parameters.user_id,
        },
    })

    for (const roleId of body ?? []) {
        const roleModel = await roleRepository.findOneOrFail({
            where: {
                uuid: roleId,
            },
        })
        userRepository.addRoleModelToUserModel(userModel, roleModel)
    }

    await userRepository.save(userModel)

    logger.log('info', 'postUsersByUserIdRoles succeeded')

    return {
        status: 204,
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /users/{user_id}/roles endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user or role is not found in database.
 */
export const deleteUsersByUserIdRoles: deleteUsersByUserIdRolesSignature = async (
    parameters,
    body,
    _user
) => {
    logger.log('info', 'deleteUsersByUserIdRoles called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            uuid: parameters.user_id,
        },
    })

    for (const roleId of body ?? []) {
        const roleModel = await roleRepository.findOneOrFail({
            where: {
                uuid: roleId,
            },
        })
        userRepository.removeRoleModelFromUserModel(userModel, roleModel)
    }

    await userRepository.save(userModel)

    logger.log('info', 'deleteUsersByUserIdRoles succeeded')

    return {
        status: 204,
    }
}
