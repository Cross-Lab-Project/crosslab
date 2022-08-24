import { hash } from "bcrypt"
import { AppDataSource } from "../data_source"
import { Role, User } from "../generated/types"
import { RoleModel, ScopeModel, UserModel } from "../model"

export function formatScope(scope: ScopeModel): string {
    return scope.name
}

export function formatRole(role: RoleModel): Role {
    return {
        name: role.name,
        scopes: role.scopes ? role.scopes.map(formatScope) : []
    }
}

export function formatUser(user: UserModel): User {
    return {
        username: user.username,
        roles: user.roles ? user.roles.map(formatRole) : []
    }
}

export function addRole(user: UserModel, role: RoleModel) {
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
            if (!roleModel) throw new Error("Requested role is not known: " + role.name)
            addRole(userModel, roleModel)
        }
    }
}

export async function createUser(userModel: UserModel, user: Required<User>) {
    await writeUser(userModel, user)
}

export function isRequiredUser(user?: User): user is Required<User> {
    return user !== undefined && user.username !== undefined && user.password !== undefined && user.roles !== undefined
}