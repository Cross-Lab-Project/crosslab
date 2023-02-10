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

/**
 * This function implements the functionality for handling GET requests on /roles endpoint.
 * @param _user The user submitting the request.
 */
export const getRoles: getRolesSignature = async (_user) => {
    console.log(`getRoles called`)

    const roleModels = await roleRepository.find()

    console.log(`getRoles succeeded`)

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
    console.log(`postRoles called`)

    const roleModel = await roleRepository.create(body)
    await roleRepository.save(roleModel)

    console.log(`postRoles succeeded`)

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
    console.log(`getRolesByRoleId called`)

    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })

    console.log(`getRolesByRoleId succeeded`)

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
    console.log(`patchRolesByRoleId called`)

    // TODO: check what the user is allowed to do
    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })
    await roleRepository.write(roleModel, body ?? {})
    await roleRepository.save(roleModel)

    console.log(`patchRolesByRoleId succeeded`)

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
    console.log(`deleteRolesByRoleId called`)

    // TODO: check that the user is allowed to delete the role
    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })
    await roleRepository.remove(roleModel)

    console.log(`deleteRolesByRoleId succeeded`)

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
    console.log(`getRolesByRoleIdUsers called`)

    const roleModel = await roleRepository.findOneOrFail({
        where: {
            uuid: parameters.role_id,
        },
    })

    console.log(`getRolesByRoleIdUsers succeeded`)

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
    console.log(`postRolesByRoleIdUsers called`)

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

    console.log(`postRolesByRoleIdUsers succeeded`)

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
    console.log(`deleteRolesByRoleIdUsers called`)

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

    console.log(`deleteRolesByRoleIdUsers succeeded`)

    return {
        status: 204,
    }
}
