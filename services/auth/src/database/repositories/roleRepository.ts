import { Role } from '../../generated/types'
import { roleUrlFromId } from '../../methods/utils'
import { RoleModel, UserModel } from '../model'
import { scopeRepository } from './scopeRepository'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'
import { FindOptionsRelations } from 'typeorm'

export class RoleRepository extends AbstractRepository<
    RoleModel,
    Role<'request'>,
    Role<'response'>
> {
    constructor() {
        super('Role')
    }

    public initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(RoleModel)
    }

    public async create(data?: Role<'request'>): Promise<RoleModel> {
        const model = await super.create(data)
        model.users = []

        return model
    }

    public async write(model: RoleModel, data: Partial<Role<'request'>>): Promise<void> {
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

export const roleRepository: RoleRepository = new RoleRepository()
