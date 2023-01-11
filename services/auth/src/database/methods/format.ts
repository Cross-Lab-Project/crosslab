import { Role, User } from '../../generated/types'
import { userUrlFromUsername } from '../../globals'
import { ScopeModel, RoleModel, UserModel } from '../model'

/**
 * This function formats a ScopeModel to a Scope.
 * @param scope The ScopeModel to be formatted.
 * @returns The resulting Scope.
 */
export function formatScopeModel(scope: ScopeModel): string {
    return scope.name
}

/**
 * This function formats a RoleModel to a Role.
 * @param role The RoleModel to be formatted.
 * @returns The resulting Role.
 */
export function formatRoleModel(role: RoleModel): Role {
    return {
        name: role.name,
        scopes: role.scopes ? role.scopes.map(formatScopeModel) : [],
    }
}

/**
 * This function formats a UserModel to an User
 * @param user The UserModel to be formatted.
 * @returns The resulting User.
 */
export function formatUserModel(user: UserModel): User {
    return {
        url: userUrlFromUsername(user.username),
        username: user.username,
        roles: user.roles ? user.roles.map(formatRoleModel) : [],
    }
}
