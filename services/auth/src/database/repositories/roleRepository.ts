import { Role } from '../../generated/types'
import { roleUrlFromId } from '../../methods/utils'
import { RoleModel, UserModel } from '../model'
import { ScopeRepository } from './scopeRepository'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager, FindOptionsRelations } from 'typeorm'

export class RoleRepository extends AbstractRepository<
    RoleModel,
    Role<'request'>,
    Role<'response'>,
    { scope: ScopeRepository }
> {
    protected dependencies: { scope?: ScopeRepository } = {}

    constructor() {
        super('Role')
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.scope) return false

        return true
    }

    public initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(RoleModel)
    }

    public async create(data?: Role<'request'>): Promise<RoleModel> {
        const model = await super.create(data)
        model.users = []

        return model
    }

    public async write(model: RoleModel, data: Partial<Role<'request'>>): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()

        const scopeRepository = this.dependencies.scope

        if (data.name) {
            model.name = data.name
        }
        if (data.scopes) {
            model.scopes = await Promise.all(
                data.scopes.map(async (scope) => {
                    return await scopeRepository.findOneOrFail({
                        where: {
                            name: scope,
                        },
                    })
                })
            )
        }
    }

    public async format(model: RoleModel): Promise<Role<'response'>> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()

        const scopeRepository = this.dependencies.scope

        return {
            url: roleUrlFromId(model.uuid),
            id: model.uuid,
            name: model.name,
            scopes: await Promise.all(model.scopes.map(scopeRepository.format)),
        }
    }

    protected getDefaultFindOptionsRelations():
        | FindOptionsRelations<RoleModel>
        | undefined {
        return {
            users: true,
            scopes: true,
        }
    }

    public addUserModelToRoleModel(roleModel: RoleModel, userModel: UserModel): void {
        if (!roleModel.users.find((user) => user.uuid === userModel.uuid)) {
            roleModel.users.push(userModel)
        }
    }

    public removeUserModelFromRoleModel(
        roleModel: RoleModel,
        userModel: UserModel
    ): void {
        let index = roleModel.users.findIndex((user) => user.uuid === userModel.uuid)
        while (index !== -1) {
            roleModel.users.splice(index, 1)
            index = roleModel.users.findIndex((user) => user.uuid === userModel.uuid)
        }
    }
}
