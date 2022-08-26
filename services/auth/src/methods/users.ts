import { hash } from "bcrypt"
import { AppDataSource } from "../data_source"
import { Role, User } from "../generated/types"
import { RoleModel, ScopeModel, UserModel } from "../model"
import { InvalidValueError } from "../types/errors"

/**
 * This function formats a ScopeModel to a Scope.
 * @param scope The ScopeModel to be formatted.
 * @returns The resulting Scope.
 */
export function formatScope(scope: ScopeModel): string {
    return scope.name
}

/**
 * This function formats a RoleModel to a Role.
 * @param role The RoleModel to be formatted.
 * @returns The resulting Role.
 */
export function formatRole(role: RoleModel): Role {
    return {
        name: role.name,
        scopes: role.scopes ? role.scopes.map(formatScope) : []
    }
}

/**
 * This function formats a UserModel to an User
 * @param user The UserModel to be formatted.
 * @returns The resulting User.
 */
export function formatUser(user: UserModel): User {
    return {
        username: user.username,
        roles: user.roles ? user.roles.map(formatRole) : []
    }
}

/**
 * This function adds a role to an user.
 * @param user The UserModel the role should be added to.
 * @param role The RoleModel to be added.
 */
export function addRole(user: UserModel, role: RoleModel) {
    if (!user.roles.find(r => r.name === role.name)) {
        user.roles.push(role)
    }
}

/**
 * This function writes the data of an User to an UserModel
 * @param userModel The UserModel the data should be written to.
 * @param user The User providing the data to be written.
 * @throws {InvalidValueError} Throws an error when the provided user has unknown roles.
 */
export async function writeUser(userModel: UserModel, user: User) {
    if (user.username) userModel.username = user.username
    if (user.password) userModel.password = await hash(user.password, 10)
    if (user.roles) {
        userModel.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const role of user.roles) {
            const roleModel = await roleRepository.findOneBy({ name: role.name })
            if (!roleModel) throw new InvalidValueError("Requested role is not known: " + role.name, 400)
            addRole(userModel, roleModel)
        }
    }
}

/**
 * This function creates a new user.
 * @param userdata The data to be used for creating the new user.
 * @throws {InvalidValueError} Can throw errors from {@link writeUser}
 * @returns The newly created user.
 */
export async function createUser(userdata: Required<User>): Promise<UserModel> {
    const userRepository = AppDataSource.getRepository(UserModel)

    const user = userRepository.create()
    await writeUser(user, userdata)
    await userRepository.save(user)

    return user
}

/**
 * This function checks if a user has values for all possible properties.
 * @param user The user to be checked.
 * @returns True if user has values for all possible properties, else false.
 */
export function isRequiredUser(user?: User): user is Required<User> {
    return user !== undefined && user.username !== undefined && user.password !== undefined && user.roles !== undefined
}