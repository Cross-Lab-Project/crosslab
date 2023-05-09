import { Token } from '../../types/types'
import { RoleModel, ScopeModel, TokenModel } from '../model'
import { roleRepository } from './roleRepository'
import { scopeRepository } from './scopeRepository'
import { userRepository } from './userRepository'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'
import { FindOptionsRelations } from 'typeorm'

export class TokenRepository extends AbstractRepository<
    TokenModel,
    Token<'request'>,
    Token<'response'>
> {
    constructor() {
        super('Token')
    }

    public initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(TokenModel)
    }

    public async write(model: TokenModel, data: Token<'request'>): Promise<void> {
        model.device = data.device
        model.expiresOn = data.expiresOn
        if (data.scopes)
            model.scopes = await Promise.all(
                data.scopes.map(async (scope) => {
                    return await scopeRepository.findOneOrFail({
                        where: {
                            name: scope,
                        },
                    })
                })
            )
        if (data.roles)
            model.roles = await Promise.all(
                data.roles.map(async (role) => {
                    return await roleRepository.findOneOrFail({
                        where: {
                            name: role,
                        },
                    })
                })
            )
        model.user = await userRepository.findOneOrFail({
            where: {
                username: data.user,
            },
        })
    }

    public async format(_model: TokenModel): Promise<Token<'response'>> {
        return undefined
    }

    public addScopeModelToTokenModel(tokenModel: TokenModel, scopeModel: ScopeModel) {
        if (!tokenModel.scopes.find((scope) => scope.name === scopeModel.name)) {
            tokenModel.scopes.push(scopeModel)
        }
    }

    public addRoleModelToTokenModel(tokenModel: TokenModel, roleModel: RoleModel) {
        if (!tokenModel.roles.find((role) => role.name === roleModel.name)) {
            tokenModel.roles.push(roleModel)
        }
    }

    protected getDefaultFindOptionsRelations():
        | FindOptionsRelations<TokenModel>
        | undefined {
        return {
            scopes: true,
            roles: true,
            user: true,
        }
    }
}

export const tokenRepository: TokenRepository = new TokenRepository()
