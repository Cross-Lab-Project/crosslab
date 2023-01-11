import { hash } from 'bcryptjs'
import { AppDataSource } from '../data_source'
import { User } from '../../generated/types'
import { UserModel, RoleModel, TokenModel, KeyModel } from '../model'
import { MissingEntityError } from '@crosslab/service-common'
import { addRoleModelToUserModel, addScopeModelToTokenModel } from './add'
import { findScopeModelByName } from './find'

/**
 * This function writes the data of an User to an UserModel
 * @param userModel The UserModel the data should be written to.
 * @param user The User providing the data to be written.
 * @throws {InvalidValueError} Throws an error when the provided user has unknown roles.
 */
export async function writeUserModel(userModel: UserModel, user: User): Promise<void> {
    if (user.username) userModel.username = user.username
    if (user.password) userModel.password = await hash(user.password, 10)
    if (user.roles) {
        userModel.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const role of user.roles) {
            const roleModel = await roleRepository.findOneBy({ name: role.name })
            if (!roleModel)
                throw new MissingEntityError(
                    `Role "${role.name}" does not exist in the database`,
                    404
                )
            addRoleModelToUserModel(userModel, roleModel)
        }
    }
}

/**
 * This function writes the data of a Token to a TokenModel.
 * @param tokenModel The TokenModel the data should be written to.
 * @param token The Token providing the data to be written.
 */
export async function writeTokenModel(
    tokenModel: TokenModel, 
    token: {
        device?: string
        expiresOn?: string
        scopes: string[]
        // token: string
    }
): Promise<void> {
    tokenModel.device = token.device
    tokenModel.expiresOn = token.expiresOn
    // tokenModel.token = token.token

    for (const scope of token.scopes) {
        const scopeModel = await findScopeModelByName(scope)
        if (!scopeModel) 
            throw new MissingEntityError(
                `Scope "${scope}" does not exist in the database`, 
                404
            )
        addScopeModelToTokenModel(tokenModel, scopeModel)
    }
}

export async function writeKeyModel(
    keyModel: KeyModel, 
    key: {
        alg: string
        private_key: string
        public_key: string
        use: string
    }
): Promise<void> {
    keyModel.alg = key.alg
    keyModel.private_key = key.private_key
    keyModel.public_key = key.public_key
    keyModel.use = key.use
}