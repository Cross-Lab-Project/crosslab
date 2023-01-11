import { MissingEntityError } from "@crosslab/service-common";
import { hash } from "bcryptjs";
import { FindOptionsWhere } from "typeorm";
import { AbstractRepository } from ".";
import { User } from "../../generated/types";
import { userUrlFromUsername } from "../../globals";
import { AppDataSource } from "../data_source";
import { addRoleModelToUserModel } from "../methods/add";
import { RoleModel, UserModel } from "../model";

class UserRepository extends AbstractRepository<UserModel, typeof UserModel, User> {
    constructor() {
        super(UserModel)
    }

    public async create(data: User): Promise<UserModel> {
        const userModel = this.repository.create()
        await this.write(userModel, data)
        return userModel
    }

    public async write(model: UserModel, data: User): Promise<void> {
        if (data.username) model.username = data.username
        if (data.password) model.password = await hash(data.password, 10)
        if (data.roles) {
            model.roles = []
            const roleRepository = AppDataSource.getRepository(RoleModel)
            for (const role of data.roles) {
                const roleModel = await roleRepository.findOneBy({ name: role.name })
                if (!roleModel)
                    throw new MissingEntityError(
                        `Role "${role.name}" does not exist in the database`,
                        404
                    )
                addRoleModelToUserModel(model, roleModel)
            }
        }
    }

    public async save(model: UserModel): Promise<void> {
        await this.repository.save(model)
    }

    public async find(options: FindOptionsWhere<UserModel>): Promise<UserModel[]> {
        return await this.repository.findBy(options)
    }

    public async findOne(options: FindOptionsWhere<UserModel>): Promise<UserModel> {
        const model = await this.repository.findOneBy(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested user does not exist in the database`,
                404
            )
        }

        return model
    }

    public async delete(model: UserModel): Promise<void> {
        await this.repository.softDelete({
            username: model.username
        })
    }

    public async format(model: UserModel): Promise<User> {
        return {
            url: userUrlFromUsername(model.username),
            username: model.username,
            password: model.password,
            roles: []

        }
    }
}

export const userRepository: UserRepository = new UserRepository()