import {
    getUsersSignature,
    postUsersSignature,
    getUsersByUsernameSignature,
    deleteUsersByUsernameSignature,
    patchUsersByUsernameSignature,
    putUsersByUsernameRolesByRoleNameSignature,
    deleteUsersByUsernameRolesByRoleNameSignature,
} from '../generated/signatures'
import { userRepository } from '../database/repositories/userRepository'
import { roleRepository } from '../database/repositories/roleRepository'

/**
 * This function implements the functionality for handling GET requests on /users endpoint.
 * @param _user The user submitting the request.
 */
export const getUsers: getUsersSignature = async (_user) => {
    console.log(`getUsers called`)

    const userModels = await userRepository.find()

    console.log(`getUsers succeeded`)

    return {
        status: 200,
        body: await Promise.all(userModels.map(userRepository.format)),
    }
}

/**
 * TODO: check if user is allowed to assign the requested roles
 * This function implements the functionality for handling POST requests on /users endpoint.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MalformedBodyError} Thrown if the body is missing required properties.
 * @throws {InvalidValueError} Can throw errors from {@link createUserModel}.
 */
export const postUsers: postUsersSignature = async (body, _user) => {
    console.log(`postUsers called`)

    const userModel = await userRepository.create(body)
    await userRepository.save(userModel)

    console.log(`postUsers succeeded`)

    return {
        status: 201,
        body: await userRepository.format(userModel),
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

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: parameters.username,
        },
    })

    console.log(`getUsersByUsername succeeded`)

    return {
        status: 200,
        body: await userRepository.format(userModel),
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

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: parameters.username,
        },
    })

    await userRepository.remove(userModel)

    console.log(`deleteUsersByUsername succeeded`)

    return {
        status: 204,
    }
}

// TODO: rethink what can be patched for a user
/**
 * This function implements the functionality for handling PATCH requests on /users/{username} endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param _user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 * @throws {InvalidValueError} Can throw errors from {@link writeUserModel}.
 */
export const patchUsersByUsername: patchUsersByUsernameSignature = async (
    parameters,
    body,
    _user
) => {
    console.log(`patchUsersByUsername called`)

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: parameters.username,
        },
    })

    await userRepository.write(userModel, body ?? {})
    await userRepository.save(userModel)

    console.log(`patchUsersByUsername succeeded`)

    return {
        status: 200,
        body: await userRepository.format(userModel),
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

        const userModel = await userRepository.findOneOrFail({
            where: {
                username: parameters.username,
            },
        })
        const roleModel = await roleRepository.findOneOrFail({
            where: {
                name: parameters.role_name,
            },
        })

        userRepository.addRoleModelToUserModel(userModel, roleModel)
        await userRepository.save(userModel)

        console.log(`putUsersByUsernameRolesByRoleName succeeded`)

        return {
            status: 200,
            body: await userRepository.format(userModel),
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

        const userModel = await userRepository.findOneOrFail({
            where: {
                username: parameters.username,
            },
        })
        const roleModel = await roleRepository.findOneOrFail({
            where: {
                name: parameters.role_name,
            },
        })

        userRepository.removeRoleModelFromUserModel(userModel, roleModel)

        await userRepository.save(userModel)

        console.log(`deleteUsersByUsernameRolesByRoleName succeeded`)

        return {
            status: 204,
        }
    }
