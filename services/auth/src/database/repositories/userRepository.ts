import { InvalidValueError } from "@crosslab/service-common";
import { hash } from "bcryptjs";
import { AbstractRepository } from "./abstractRepository";
import { User } from "../../generated/types";
import { userUrlFromUsername } from "../../globals";
import { AppDataSource } from "../dataSource";
import { RoleModel, UserModel } from "../model";
import { roleRepository } from "./roleRepository";

class UserRepository extends AbstractRepository<UserModel> {
    constructor() {
        super(UserModel)
    }

    public initialize(): void {
        this.repository = AppDataSource.getRepository(UserModel)
    }

    public async write(model: UserModel, data: User<"request">): Promise<void> {
        if (data.username) model.username = data.username
        if (data.password) model.password = await hash(data.password, 10)
        if (data.roles) {
            model.roles = []
            const roleRepository = AppDataSource.getRepository(RoleModel)
            for (const role of data.roles) {
                const roleModel = await roleRepository.findOneBy({ name: role.name })
                if (!roleModel)
                    throw new InvalidValueError(
                        `Role "${role.name}" does not exist in the database`,
                        400
                    )
                this.addRoleModelToUserModel(model, roleModel)
            }
        }
    }

    public async format(model: UserModel): Promise<User<"response">> {
        return {
            url: userUrlFromUsername(model.username),
            username: model.username,
            roles: await Promise.all(
                model.roles.map(roleRepository.format)
            )
        }
    }

    public addRoleModelToUserModel(userModel: UserModel, roleModel: RoleModel): void {
        if (!userModel.roles.find((role) => role.name === roleModel.name)) {
            userModel.roles.push(roleModel)
        }
    }

    public removeRoleModelFromUserModel(userModel: UserModel, roleModel: RoleModel): void {
        let index = userModel.roles.findIndex((role) => role.name === roleModel.name)
        while (index !== -1) {
            userModel.roles.splice(index, 1)
            index = userModel.roles.findIndex((role) => role.name === roleModel.name)
        }
    }
}

export const userRepository: UserRepository = new UserRepository()