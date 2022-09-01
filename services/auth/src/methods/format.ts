import { Role, User } from '../generated/types'
import { ScopeModel, RoleModel, UserModel } from '../model'

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
        scopes: role.scopes ? role.scopes.map(formatScope) : [],
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
        roles: user.roles ? user.roles.map(formatRole) : [],
    }
}
