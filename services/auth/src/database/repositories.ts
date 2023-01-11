import { AppDataSource } from "./data_source";
import { ActiveKeyModel, KeyModel, RoleModel, ScopeModel, TokenModel, UserModel } from "./model";

/**
 * Repository for scope models
 */
export const scopeRepository = AppDataSource.getRepository(ScopeModel)

/**
 * Repository for role models
 */
export const roleRepository = AppDataSource.getRepository(RoleModel)

/**
 * Repository for user models
 */
export const userRepository = AppDataSource.getRepository(UserModel)

/**
 * Repository for token models
 */
export const tokenRepository = AppDataSource.getRepository(TokenModel)

/**
 * Repository for key models
 */
export const keyRepository = AppDataSource.getRepository(KeyModel)

/**
 * Repository for active key models
 */
export const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)