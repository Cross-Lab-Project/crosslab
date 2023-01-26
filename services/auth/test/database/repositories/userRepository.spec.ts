import assert from "assert";
import { compareSync } from "bcryptjs";
import { FindOptionsWhere } from "typeorm";
import { config } from "../../../src/config";
import { UserModel } from "../../../src/database/model";
import { UserRepository } from "../../../src/database/repositories/userRepository";
import { User } from "../../../src/generated/types";
import { AbstractRepositoryTestSuite } from "./abstractRepository.spec";
import Mocha from "mocha";

class UserRepositoryTestSuite extends AbstractRepositoryTestSuite<UserModel> {
    constructor() {
        super(UserModel)
    }

    public async initialize(): Promise<void> {
        await super.initialize()
        this.addTestToSuite(
            "additional",
            (data) => new Mocha.Test("should add role to user only if role is not already present", async function () {
                const repository = data.repository as UserRepository
                const userModel: UserModel = await repository.save({
                    ...data.entityData.superadmin.model,
                    tokens: []
                })
                
                assert(Array.isArray(userModel.roles))
                assert(userModel.roles.length > 0)

                const roleModel = userModel.roles[0]
                userModel.roles = []

                repository.addRoleModelToUserModel(userModel, roleModel)
                assert(Array.isArray(userModel.roles))
                assert(userModel.roles.length === 1)
                assert(userModel.roles[0] === roleModel)

                repository.addRoleModelToUserModel(userModel, roleModel)
                assert(Array.isArray(userModel.roles))
                assert(userModel.roles.length === 1)
                assert(userModel.roles[0] === roleModel)
            })
        )
        this.addTestToSuite(
            "additional",
            (data) => new Mocha.Test("should remove role from user only if role is present", async function () {
                const repository = data.repository as UserRepository
                const userModel: UserModel = await repository.save({
                    ...data.entityData.superadmin.model,
                    tokens: []
                })
                
                assert(Array.isArray(userModel.roles))
                assert(userModel.roles.length > 0)

                const roleModel = userModel.roles[0]
                const oldLength = userModel.roles.length

                repository.removeRoleModelFromUserModel(userModel, roleModel)
                assert(Array.isArray(userModel.roles))
                assert(userModel.roles.length === oldLength-1)
                assert(!userModel.roles.find((role) => role.name === roleModel.name))

                repository.removeRoleModelFromUserModel(userModel, roleModel)
                assert(Array.isArray(userModel.roles))
                assert(userModel.roles.length === oldLength-1)
                assert(!userModel.roles.find((role) => role.name === roleModel.name))
            })
        )
        this.addTestToSuite(
            "additional",
            (data) => new Mocha.Test("should only write username if provided", async function () {
                const userModel: UserModel = data.entityData.superadmin.model
                const oldUsername = userModel.username
                await data.repository.write(userModel, {})
                assert(userModel.username === oldUsername)
            })
        )
        this.addTestToSuite(
            "additional",
            (data) => new Mocha.Test("should only write password if provided", async function () {
                const userModel: UserModel = data.entityData.superadmin.model
                const oldPassword = userModel.password
                await data.repository.write(userModel, {})
                assert(userModel.password === oldPassword)
            })
        )
        this.addTestToSuite(
            "additional",
            (data) => new Mocha.Test("should only write roles if provided", async function () {
                const userModel: UserModel = data.entityData.superadmin.model
                // prevent circular dependency error for JSON.stringify
                userModel.roles = userModel.roles.map((role) => {
                    return {
                        ...role,
                        users: []
                    }
                })
                const oldRoles = JSON.stringify(userModel.roles)
                await data.repository.write(userModel, {})
                assert(JSON.stringify(userModel.roles) === oldRoles)
            })
        )
    }
    
    validateCreate(model: UserModel, data?: User<"request">): boolean {
        if (data) return this.validateWrite(model, data)

        assert(model.password === undefined)
        assert(model.roles === undefined)
        assert(model.tokens === undefined)
        assert(model.username === undefined)

        return true
    }

    validateWrite(model: UserModel, data: User<"request">): boolean {
        if (data.password) {
            assert(model.password)
            assert(compareSync(data.password, model.password))
        }
        
        if (data.roles) {
            for (const role of model.roles) {
                assert(data.roles.find((r) => r.name === role.name))
            }
            for (const role of data.roles) {
                assert(model.roles.find((r) => r.name === role.name))
            }
        }

        // TODO: check how to handle tokens here

        if (data.username) assert(model.username === data.username)

        return true
    }

    validateFormat(model: UserModel, data: User<"response">): boolean {
        assert(!data.password)
        assert(Array.isArray(data.roles))

        for (const role of model.roles) {
            assert(data.roles.find((r) => r.name === role.name))
        }
        for (const role of data.roles) {
            assert(model.roles.find((r) => r.name === role.name))
        }

        assert(data.url === `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/${model.username}`)
        assert(data.username === model.username)

        return true
    }

    compareModels(firstModel: UserModel, secondModel: UserModel, complete?: boolean): boolean {
        if (!complete) {
            return firstModel.username === secondModel.username
        }

        assert(firstModel.password === secondModel.password)

        for (const role of firstModel.roles) {
            assert(secondModel.roles.find((r) => r.name === role.name))
        }
        for (const role of secondModel.roles) {
            assert(firstModel.roles.find((r) => r.name === role.name))
        }

        // TODO: assert that tokens are identical

        assert(firstModel.username === secondModel.username)

        return true
    }

    getFindOptionsWhere(model?: UserModel): FindOptionsWhere<UserModel> {
        return {
            username: model ? model.username : "non-existent"
        }
    }
}

export const userRepositoryTestSuite = new UserRepositoryTestSuite()