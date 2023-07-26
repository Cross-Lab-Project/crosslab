import { Token } from '../../types/types'
import { RoleModel, ScopeModel, TokenModel } from '../model'
import { RoleRepository } from './roleRepository'
import { ScopeRepository } from './scopeRepository'
import { UserRepository } from './userRepository'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager, FindOptionsRelations } from 'typeorm'

export class TokenRepository extends AbstractRepository<
    TokenModel,
    Token<'request'>,
    Token<'response'>,
    {
        role: RoleRepository
        scope: ScopeRepository
        user: UserRepository
    }
> {
    protected dependencies: {
        role?: RoleRepository
        scope?: ScopeRepository
        user?: UserRepository
    } = {}

    constructor() {
        super('Token')
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.role) return false
        if (!this.dependencies.scope) return false
        if (!this.dependencies.user) return false

        return true
    }

    public initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(TokenModel)
    }

    public async write(
        model: TokenModel,
        data: Partial<Token<'request'>>
    ): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()

        const roleRepository = this.dependencies.role
        const scopeRepository = this.dependencies.scope
        const userRepository = this.dependencies.user

        if (data.device) model.device = data.device
        if (data.expiresOn) model.expiresOn = data.expiresOn
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
        if (data.user)
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
            roles: {
                scopes: true,
            },
            user: true,
        }
    }
}
