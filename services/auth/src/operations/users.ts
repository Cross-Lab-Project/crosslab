import {
    getUsersSignature,
    postUsersSignature,
    getUsersByUsernameSignature,
    deleteUsersByUsernameSignature,
    patchUsersByUsernameSignature,
    putUsersByUsernameRolesByRoleNameSignature,
    deleteUsersByUsernameRolesByRoleNameSignature,
} from '../generated/signatures'
import { RoleModel, UserModel } from '../model'
import { AppDataSource } from '../data_source'
import { MissingEntityError } from '../types/errors'
import { MalformedBodyError } from '@crosslab/service-common'
import { formatUser } from '../methods/format'
import { addRole, isRequiredUser } from '../methods/utils'
import { createUser, writeUser } from '../methods/write'

/**
 * This function implements the functionality for handling GET requests on /users endpoint.
 * @param _user The user submitting the request.
 */
export const getUsers: getUsersSignature = async (_user) => {
    console.log(`getUsers called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const users = await userRepository.find({
        relations: {
            roles: {
                scopes: true,
            },
        },
    })

    console.log(`getUsers succeeded`)

    return {
        status: 200,
        body: users.map(formatUser),
    }
}

/**
 * This function implements the functionality for handling POST requests on /users endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MalformedBodyError} Thrown if the body is missing required properties.
 * @throws {InvalidValueError} Can throw errors from {@link createUser}.
 */
export const postUsers: postUsersSignature = async (body, _user) => {
    console.log(`postUsers called`)

    if (!isRequiredUser(body))
        throw new MalformedBodyError(`Body is missing required properties`, 400)

    const user = await createUser(body)
    console.log(`postUsers succeeded`)

    return {
        status: 201,
        body: formatUser(user),
    }
}

/**
 * This function implements the functionality for handling GET requests on /users/{username} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getUsersByUsername: getUsersByUsernameSignature = async (
    parameters,
    _user
) => {
    console.log(`getUsersByUsername called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOne({
        where: {
            username: parameters.username,
        },
        relations: {
            roles: {
                scopes: true,
            },
        },
    })

    if (!user)
        throw new MissingEntityError(`Could not find user ${parameters.username}`, 404)

    console.log(`getUsersByUsername succeeded`)

    return {
        status: 200,
        body: formatUser(user),
    }
}

/**
 * This function implements the functionality for handling DELETE requests on /users/{username} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const deleteUsersByUsername: deleteUsersByUsernameSignature = async (
    parameters,
    _user
) => {
    console.log(`deleteUsersByUsername called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOneBy({ username: parameters.username })

    if (!user)
        throw new MissingEntityError(`Could not find user ${parameters.username}`, 404)

    await userRepository.softDelete(user)

    console.log(`deleteUsersByUsername succeeded`)

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
 * @throws {InvalidValueError} Can throw errors from {@link writeUser}.
 */
export const patchUsersByUsername: patchUsersByUsernameSignature = async (
    parameters,
    body,
    _user
) => {
    console.log(`patchUsersByUsername called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOneBy({ username: parameters.username })

    if (!user)
        throw new MissingEntityError(`Could not find user ${parameters.username}`, 404)

    await writeUser(user, body ?? {})
    await userRepository.save(user)

    console.log(`patchUsersByUsername succeeded`)

    return {
        status: 200,
        body: formatUser(user),
    }
}

/**
 * This function implements the functionality for handling PUT requests on /users/{username}/roles/{role_name} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user or role is not found in the database.
 */
export const putUsersByUsernameRolesByRoleName: putUsersByUsernameRolesByRoleNameSignature =
    async (parameters, _user) => {
        console.log(`putUsersByUsernameRolesByRoleName called`)
        const userRepository = AppDataSource.getRepository(UserModel)
        const roleRepository = AppDataSource.getRepository(RoleModel)
        const user = await userRepository.findOneBy({ username: parameters.username })
        const role = await roleRepository.findOneBy({ name: parameters.role_name })

        if (!user)
            throw new MissingEntityError(
                `Could not find user ${parameters.username}`,
                404
            )
        if (!role)
            throw new MissingEntityError(
                `Could not find role ${parameters.role_name}`,
                404
            )

        addRole(user, role)
        await userRepository.save(user)

        console.log(`putUsersByUsernameRolesByRoleName succeeded`)

        return {
            status: 200,
            body: formatUser(user),
        }
    }

/**
 * This function implements the functionality for handling DELETE requests on /users/{username}/roles/{role_name} endpoint.
 * @param parameters The parameters of the request.
 * @param _user The user submitting the request
 * @throws {MissingEntityError} Thrown if user or role is not found in the database.
 */
export const deleteUsersByUsernameRolesByRoleName: deleteUsersByUsernameRolesByRoleNameSignature =
    async (parameters, _user) => {
        console.log(`deleteUsersByUsernameRolesByRoleName called`)
        const userRepository = AppDataSource.getRepository(UserModel)
        const roleRepository = AppDataSource.getRepository(RoleModel)
        const user = await userRepository.findOneBy({ username: parameters.username })
        const role = await roleRepository.findOneBy({ name: parameters.role_name })

        if (!user)
            throw new MissingEntityError(
                `Could not find user ${parameters.username}`,
                404
            )
        if (!role)
            throw new MissingEntityError(
                `Could not find role ${parameters.role_name}`,
                404
            )

        let index = user.roles.findIndex((r) => r.name === parameters.role_name)
        while (index !== -1) {
            user.roles.splice(index, 1)
            index = user.roles.findIndex((r) => r.name === parameters.role_name)
        }

        await userRepository.save(user)

        console.log(`deleteUsersByUsernameRolesByRoleName succeeded`)

        return {
            status: 204,
        }
    }
