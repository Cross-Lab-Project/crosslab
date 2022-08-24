import {
    getUsersSignature,
	postUsersSignature,
	getUsersByUsernameSignature,
	deleteUsersByUsernameSignature,
	patchUsersByUsernameSignature,
	putUsersByUsernameRolesByRoleNameSignature,
	deleteUsersByUsernameRolesByRoleNameSignature
} from "../generated/signatures/users"
import { RoleModel, UserModel } from "../model"
import { AppDataSource } from "../data_source"
import { addRole, createUser, formatUser, isRequiredUser, writeUser } from "../methods/users"

export const getUsers: getUsersSignature = async (_user) => {
    console.log(`getUsers called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const users = await userRepository.find({ 
        relations: { 
            roles: {
                scopes: true
            } 
        } 
    })

    console.log(`getUsers succeeded`)
    
    return {
        status: 200,
        body: users.map(formatUser)
    }
}

export const postUsers: postUsersSignature = async (body, _user) => {
    console.log(`postUsers called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = userRepository.create()

    if (!isRequiredUser(body)) {
        console.error(`postUsers failed: body is missing required properties`)
        return {
            status: 400
        }
    }

    try {
        await createUser(user, body)
    } catch {
        console.error(`postUsers failed: could not create new user with requested properties`)
        return {
            status: 400
        }
    }
    await userRepository.save(user)

    console.log(`postUsers succeeded`)

    return {
        status: 201,
        body: formatUser(user)
    }
}

export const getUsersByUsername: getUsersByUsernameSignature = async (parameters, _user) => {
    console.log(`getUsersByUsername called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOne({
        where: { 
            username: parameters.username 
        },
        relations: {
            roles: {
                scopes: true
            }
        }
    })

    if (!user) {
        console.error(`getUsersByUsername failed: could not find user ${parameters.username}`)
        return {
            status: 404
        }
    }

    console.log(`getUsersByUsername succeeded`)

    return {
        status: 200,
        body: formatUser(user)
    }
}

export const deleteUsersByUsername: deleteUsersByUsernameSignature = async (parameters, _user) => {
    console.log(`deleteUsersByUsername called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOneBy({ username: parameters.username })

    if (!user) {
        console.error(`deleteUsersByUsername failed: could not find user ${parameters.username}`)
        return {
            status: 404
        }
    }

    await userRepository.softDelete(user)

    console.log(`deleteUsersByUsername succeeded`)

    return {
        status: 204
    }
}

export const patchUsersByUsername: patchUsersByUsernameSignature = async (parameters, body, _user) => {
    console.log(`patchUsersByUsername called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOneBy({ username: parameters.username })

    if (!user) {
        console.error(`patchUsersByUsername failed: could not find user ${parameters.username}`)
        return {
            status: 404
        }
    }

    try {
        await writeUser(user, body ?? {})
    } catch {
        console.error(`patchUsersByUsername failed: could not apply requested changes`)
        return {
            status: 400
        }
    }
    await userRepository.save(user)

    console.log(`patchUsersByUsername succeeded`)

    return {
        status: 200,
        body: formatUser(user)
    }
}

export const putUsersByUsernameRolesByRoleName: putUsersByUsernameRolesByRoleNameSignature = async (parameters, _user) => {
    console.log(`putUsersByUsernameRolesByRoleName called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const user = await userRepository.findOneBy({ username: parameters.username })
    const role = await roleRepository.findOneBy({ name: parameters.role_name })

    if (!user) {
        console.error(`putUsersByUsernameRolesByRoleName failed: could not find user ${parameters.username}`)
        return {
            status: 404
        }
    }

    if (!role) {
        console.error(`putUsersByUsernameRolesByRoleName failed: could not find role ${parameters.role_name}`)
        return {
            status: 404
        }
    }

    addRole(user, role)
    await userRepository.save(user)

    console.log(`putUsersByUsernameRolesByRoleName succeeded`)

    return {
        status: 200,
        body: formatUser(user)
    }
}

export const deleteUsersByUsernameRolesByRoleName: deleteUsersByUsernameRolesByRoleNameSignature = async (parameters, _user) => {
    console.log(`deleteUsersByUsernameRolesByRoleName called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const user = await userRepository.findOneBy({ username: parameters.username })
    const role = await roleRepository.findOneBy({ name: parameters.role_name })

    if (!user) {
        console.error(`deleteUsersByUsernameRolesByRoleName failed: could not find user ${parameters.username}`)
        return {
            status: 404
        }
    }

    if (!role) {
        console.error(`deleteUsersByUsernameRolesByRoleName failed: could not find role ${parameters.role_name}`)
        return {
            status: 404
        }
    }

    let index = user.roles.findIndex(r => r.name === parameters.role_name)
    while (index !== -1) {
        user.roles.splice(index, 1)
        index = user.roles.findIndex(r => r.name === parameters.role_name)
    }

    await userRepository.save(user)

    console.log(`deleteUsersByUsernameRolesByRoleName succeeded`)

    return {
        status: 204
    }
}
