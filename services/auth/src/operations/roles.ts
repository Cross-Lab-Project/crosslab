import { roleRepository } from '../database/repositories/roleRepository'
import { userRepository } from '../database/repositories/userRepository'
import {
    deleteRolesByRoleIdSignature,
    deleteRolesByRoleIdUsersSignature,
    getRolesByRoleIdSignature,
    getRolesByRoleIdUsersSignature,
    getRolesSignature,
    patchRolesByRoleIdSignature,
    postRolesByRoleIdUsersSignature,
    postRolesSignature,
} from '../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /roles endpoint.
 * @param _user The user submitting the request.
 */
export const getRoles: getRolesSignature = async (_user) => {
    logger.log('info', 'getRoles called')

    const roleModels = await roleRepository.find()

    logger.log('info', 'getRoles succeeded')

    return {
        status: 200,
        body: await Promise.all(roleModels.map(roleRepository.format)),
    }
}

/**
 * This function implements the functionality for handling POST requests on /roles endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 */
export const postRoles: postRolesSignature = async (body, _user) => {
    logger.log('info', 'postRoles called')

    const roleModel = await roleRepository.create(body)
    await roleRepository.save(roleModel)

    logger.log('info', 'postRoles succeeded')

    return {
        status: 201,
        body: await roleRepository.format(roleModel),
    }
}

/**
 * This function implements the functionality for handling GET requests on /roles/{role_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if role is not found in database.
 */
export const getRolesByRoleId: getRolesByRoleIdSignature = async (parameters, _user) => {
    logger.log('info', 'getRolesByRoleId called')

    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })

    logger.log('info', 'getRolesByRoleId succeeded')

    return {
        status: 200,
        body: await roleRepository.format(roleModel),
    }
}

/**
 * This function implements the functionality for handling PATCH requests on /roles/{role_id} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if role is not found in database.
 */
export const patchRolesByRoleId: patchRolesByRoleIdSignature = async (
    parameters,
    body,
    _user
) => {
    logger.log('info', 'patchRolesByRoleId called')

    // TODO: check what the user is allowed to do
    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })
    await roleRepository.write(roleModel, body ?? {})
    await roleRepository.save(roleModel)

    logger.log('info', 'patchRolesByRoleId succeeded')

    return {
        status: 200,
        body: await roleRepository.format(roleModel),
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /roles/{role_id} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if role is not found in database.
 */
export const deleteRolesByRoleId: deleteRolesByRoleIdSignature = async (
    parameters,
    _user
) => {
    logger.log('info', 'deleteRolesByRoleId called')

    // TODO: check that the user is allowed to delete the role
    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })
    await roleRepository.remove(roleModel)

    logger.log('info', 'deleteRolesByRoleId succeeded')

    return {
        status: 204,
    }
}

/**
 * This function implements the functionality for handling GET requests on /roles/{role_id}/users endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if role is not found in database.
 */
export const getRolesByRoleIdUsers: getRolesByRoleIdUsersSignature = async (
    parameters,
    _user
) => {
    logger.log('info', 'getRolesByRoleIdUsers called')

    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })

    logger.log('info', 'getRolesByRoleIdUsers succeeded')

    return {
        status: 200,
        body: await Promise.all(roleModel.users.map(userRepository.format)),
    }
}

/**
 * This function implements the functionality for handling POST requests on /roles/{role_id}/users endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if role or user is not found in database.
 */
export const postRolesByRoleIdUsers: postRolesByRoleIdUsersSignature = async (
    parameters,
    body,
    _user
) => {
    logger.log('info', 'postRolesByRoleIdUsers called')

    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
        relations: {
            users: true,
        },
    })

    for (const userId of body ?? []) {
        const userModel = await userRepository.findOneOrFail({
            where: {
                uuid: userId,
            },
        })
        roleRepository.addUserModelToRoleModel(roleModel, userModel)
    }

    await roleRepository.save(roleModel)

    logger.log('info', 'postRolesByRoleIdUsers succeeded')

    return {
        status: 204,
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /roles/{role_id}/users endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if role or user is not found in database.
 */
export const deleteRolesByRoleIdUsers: deleteRolesByRoleIdUsersSignature = async (
    parameters,
    body,
    _user
) => {
    logger.log('info', 'deleteRolesByRoleIdUsers called')

    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
        relations: {
            users: true,
        },
    })

    for (const userId of body ?? []) {
        const userModel = await userRepository.findOneOrFail({
            where: {
                uuid: userId,
            },
        })
        roleRepository.removeUserModelFromRoleModel(roleModel, userModel)
    }

    await roleRepository.save(roleModel)

    logger.log('info', 'deleteRolesByRoleIdUsers succeeded')

    return {
        status: 204,
    }
}
