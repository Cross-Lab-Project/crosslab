import { User } from '../../generated/types'
import { userUrlFromId } from '../../methods/utils'
import { RoleModel, UserModel } from '../model'
import { tokenRepository } from './tokenRepository'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'
import { hash } from 'bcryptjs'
import { FindOptionsRelations } from 'typeorm'

export class UserRepository extends AbstractRepository<
    UserModel,
    User<'request'>,
    User<'response'>
> {
    constructor() {
        super('User')
    }

    public initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(UserModel)
    }

    public async create(data?: User<'request'>): Promise<UserModel> {
        const model = await super.create(data)
        model.tokens = []
        model.roles = []

        return model
    }

    public async write(model: UserModel, data: Partial<User<'request'>>): Promise<void> {
        if (data.username) model.username = data.username
        if (data.password) model.password = await hash(data.password, 10)
    }

    public async format(model: UserModel): Promise<User<'response'>> {
        return {
            url: userUrlFromId(model.uuid),
            id: model.uuid,
            username: model.username,
        }
    }

    public async remove(model: UserModel): Promise<void> {
        if (!this.repository) this.throwUninitializedRepositoryError()

        for (const tokenModel of model.tokens) {
            await tokenRepository.remove(tokenModel)
        }

        await this.repository.remove(model)
    }

    public addRoleModelToUserModel(userModel: UserModel, roleModel: RoleModel): void {
        if (!userModel.roles.find((role) => role.uuid === roleModel.uuid)) {
            userModel.roles.push(roleModel)
        }
    }

    public removeRoleModelFromUserModel(
        userModel: UserModel,
        roleModel: RoleModel
    ): void {
        let index = userModel.roles.findIndex((role) => role.uuid === roleModel.uuid)
        while (index !== -1) {
            userModel.roles.splice(index, 1)
            index = userModel.roles.findIndex((role) => role.uuid === roleModel.uuid)
        }
    }

    protected getDefaultFindOptionsRelations():
        | FindOptionsRelations<UserModel>
        | undefined {
        return {
            roles: {
                scopes: true,
            },
            tokens: true,
        }
    }
}

export const userRepository: UserRepository = new UserRepository()
