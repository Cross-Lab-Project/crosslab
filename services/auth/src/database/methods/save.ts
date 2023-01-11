import { ActiveKeyModel, KeyModel, RoleModel, ScopeModel, TokenModel, UserModel } from "../model";
import { activeKeyRepository, keyRepository, roleRepository, scopeRepository, tokenRepository, userRepository } from "../repositories";

/**
 * This function attempts to save a ScopeModel in its corresponding repository.
 * @param scopeModel The ScopeModel to be saved.
 */
export async function saveScopeModel(scopeModel: ScopeModel): Promise<void> {
    await scopeRepository.save(scopeModel)
}

/**
 * This function attempts to save a RoleModel in its corresponding repository.
 * @param roleModel The RoleModel to be saved
 */
export async function saveRoleModel(roleModel: RoleModel): Promise<void> {
    await roleRepository.save(roleModel)
}

/**
 * This function attempts to save a UserModel in its corresponding repository.
 * @param userModel The UserModel to be saved
 */
export async function saveUserModel(userModel: UserModel): Promise<void> {
    await userRepository.save(userModel)
}

/**
 * This function attempts to save a TokenModel in its corresponding repository.
 * @param tokenModel The TokenModel to be saved
 */
export async function saveTokenModel(tokenModel: TokenModel): Promise<void> {
    await tokenRepository.save(tokenModel)
}

/**
 * This function attempts to save a KeyModel in its corresponding repository.
 * @param keyModel The KeyModel to be saved
 */
export async function saveKeyModel(keyModel: KeyModel): Promise<void> {
    await keyRepository.save(keyModel)
}

/**
 * This function attempts to save a ActiveKeyModel in its corresponding repository.
 * @param activeKeyModel The ActiveKeyModel to be saved
 */
export async function saveActiveKey(activeKeyModel: ActiveKeyModel): Promise<void> {
    await activeKeyRepository.save(activeKeyModel)
}