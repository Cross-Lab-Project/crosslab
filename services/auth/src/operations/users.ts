import {
    Role,
    User
} from "../generated/types"
import {
    getUsersSignature,
	postUsersSignature,
	getUsersByUsernameSignature,
	deleteUsersByUsernameSignature,
	patchUsersByUsernameSignature,
	putUsersByUsernameRolesByRoleNameSignature,
	deleteUsersByUsernameRolesByRoleNameSignature
} from "../generated/signatures/users"
import { RoleModel, ScopeModel, UserModel } from "../model"
import { AppDataSource } from "../data_source"
import { hash } from "bcrypt"

function formatScope(scope: ScopeModel): string {
    return scope.name
}

function formatRole(role: RoleModel): Role {
    return {
        name: role.name,
        scopes: role.scopes.map(formatScope)
    }
}

export function formatUser(user: UserModel): User {
    return {
        username: user.username,
        roles: user.roles.map(formatRole)
    }
}

function addRole(user: UserModel, role: RoleModel) {
    if (!user.roles.find(r => r.name === role.name)) {
        user.roles.push(role)
    }
}

export async function writeUser(userModel: UserModel, user: User) {
    if (user.username) userModel.username = user.username
    if (user.password) userModel.password = await hash(user.password, 10)
    if (user.roles) {
        userModel.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const role of user.roles) {
            const roleModel = await roleRepository.findOneBy({ name: role.name })
            if (!roleModel) throw("Requested role is not known: " + role.name)
            addRole(userModel, roleModel)
        }
    }
}

async function createUser(userModel: UserModel, user: Required<User>) {
    await writeUser(userModel, user)
}

function isRequiredUser(user?: User): user is Required<User> {
    return user !== undefined && user.username !== undefined && user.password !== undefined && user.roles !== undefined
}

export const getUsers: getUsersSignature = async (_user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const users = await userRepository.find({ 
        relations: { 
            roles: {
                scopes: true
            } 
        } 
    })
    
    return {
        status: 200,
        body: users.map(formatUser)
    }
}

export const postUsers: postUsersSignature = async (body, _user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = userRepository.create()

    if (!isRequiredUser(body)) {
        return {
            status: 400
        }
    }

    try {
        await createUser(user, body)
    } catch {
        return {
            status: 400
        }
    }
    await userRepository.save(user)

    return {
        status: 201,
        body: formatUser(user)
    }
}

export const getUsersByUsername: getUsersByUsernameSignature = async (parameters, _user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOne({
        where: { 
            username: parameters.Username 
        },
        relations: {
            roles: {
                scopes: true
            }
        }
    })

    if (!user) {
        return {
            status: 404
        }
    }

    return {
        status: 200,
        body: formatUser(user)
    }
}

export const deleteUsersByUsername: deleteUsersByUsernameSignature = async (parameters, _user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOneBy({ username: parameters.Username })

    if (!user) {
        return {
            status: 404
        }
    }

    await userRepository.softDelete(user)

    return {
        status: 204
    }
}

export const patchUsersByUsername: patchUsersByUsernameSignature = async (parameters, body, _user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOneBy({ username: parameters.Username })

    if (!user) {
        return {
            status: 404
        }
    }

    try {
        await writeUser(user, body ?? {})
    } catch {
        return {
            status: 400
        }
    }
    await userRepository.save(user)

    return {
        status: 200,
        body: formatUser(user)
    }
}

export const putUsersByUsernameRolesByRoleName: putUsersByUsernameRolesByRoleNameSignature = async (parameters, _user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const user = await userRepository.findOneBy({ username: parameters.Username })
    const role = await roleRepository.findOneBy({ name: parameters.RoleName })

    if (!user || !role) {
        return {
            status: 404
        }
    }

    addRole(user, role)
    await userRepository.save(user)

    return {
        status: 200,
        body: formatUser(user)
    }
}

export const deleteUsersByUsernameRolesByRoleName: deleteUsersByUsernameRolesByRoleNameSignature = async (parameters, _user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const user = await userRepository.findOneBy({ username: parameters.Username })
    const role = await roleRepository.findOneBy({ name: parameters.RoleName })

    if (!user || !role) {
        return {
            status: 404
        }
    }

    let index = user.roles.findIndex(r => r.name === parameters.RoleName)
    while (index !== -1) {
        user.roles.splice(index, 1)
        index = user.roles.findIndex(r => r.name === parameters.RoleName)
    }

    return {
        status: 204
    }
}
