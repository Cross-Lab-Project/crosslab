import { UserModel, RoleModel, TokenModel, ScopeModel } from "../model";

/**
 * This function adds a RoleModel to a UserModel.
 * @param userModel The UserModel the RoleModel should be added to.
 * @param roleModel The RoleModel to be added.
 */
export function addRoleModelToUserModel(userModel: UserModel, roleModel: RoleModel) {
    if (!userModel.roles.find((role) => role.name === roleModel.name)) {
        userModel.roles.push(roleModel)
    }
}

/**
 * This function adds a ScopeModel to a TokenModel.
 * @param tokenModel The TokenModel the ScopeModel should be added to.
 * @param scopeModel The ScopeModel to be added.
 */
export function addScopeModelToTokenModel(tokenModel: TokenModel, scopeModel: ScopeModel) {
    if (!tokenModel.scopes.find((scope) => scope.name === scopeModel.name)) {
        tokenModel.scopes.push(scopeModel)
    }
}