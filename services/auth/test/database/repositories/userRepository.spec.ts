import assert from 'assert'
import { compareSync } from 'bcryptjs'
import { FindOptionsWhere } from 'typeorm'
import { UserModel } from '../../../src/database/model'
import { UserRepository } from '../../../src/database/repositories/userRepository'
import { User, UserInit, UserUpdate } from '../../../src/generated/types'
import { AbstractRepositoryTestSuite } from './abstractRepository.spec'
import Mocha from 'mocha'
import { userNames } from '../../data/userData.spec'
import { userUrlFromId } from '../../../src/methods/utils'

class UserRepositoryTestSuite extends AbstractRepositoryTestSuite<UserModel> {
    constructor() {
        super(UserModel)
    }

    public async initialize(): Promise<void> {
        await super.initialize()
        if (!this.testSuites) throw new Error('Test suites have not been initialized!')

        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should add role to user only if role is not already present',
                    async function () {
                        const repository = data.repository as UserRepository
                        const userModel: UserModel = await repository.save({
                            ...data.entityData.superadmin.model,
                            tokens: [],
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
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should remove role from user only if role is present',
                    async function () {
                        const repository = data.repository as UserRepository
                        const userModel: UserModel = await repository.save({
                            ...data.entityData.superadmin.model,
                            tokens: [],
                        })

                        assert(Array.isArray(userModel.roles))
                        assert(userModel.roles.length > 0)

                        const roleModel = userModel.roles[0]
                        const oldLength = userModel.roles.length

                        repository.removeRoleModelFromUserModel(userModel, roleModel)
                        assert(Array.isArray(userModel.roles))
                        assert(userModel.roles.length === oldLength - 1)
                        assert(
                            !userModel.roles.find((role) => role.name === roleModel.name)
                        )

                        repository.removeRoleModelFromUserModel(userModel, roleModel)
                        assert(Array.isArray(userModel.roles))
                        assert(userModel.roles.length === oldLength - 1)
                        assert(
                            !userModel.roles.find((role) => role.name === roleModel.name)
                        )
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should only write username if provided',
                    async function () {
                        const userModel: UserModel = data.entityData.superadmin.model
                        const oldUsername = userModel.username
                        await data.repository.write(userModel, {})
                        assert(userModel.username === oldUsername)
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should only write password if provided',
                    async function () {
                        const userModel: UserModel = data.entityData.superadmin.model
                        const oldPassword = userModel.password
                        await data.repository.write(userModel, {})
                        assert(userModel.password === oldPassword)
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test('should only write roles if provided', async function () {
                    const userModel: UserModel = data.entityData.superadmin.model
                    // prevent circular dependency error for JSON.stringify
                    userModel.roles = userModel.roles.map((role) => {
                        return {
                            ...role,
                            users: [],
                        }
                    })
                    const oldRoles = JSON.stringify(userModel.roles)
                    await data.repository.write(userModel, {})
                    assert(JSON.stringify(userModel.roles) === oldRoles)
                })
        )

        // replace save test suite because of unique username index
        this.testSuites.save.tests = this.testSuites.save.tests.filter(
            (test) => !test.title.startsWith('should save a valid model')
        )
        for (const key of userNames) {
            this.addTestToSuite(
                'save',
                (data) =>
                    new Mocha.Test(
                        `should save a valid model (${key})`,
                        async function () {
                            const username =
                                'new:' + data.entityData[key].request.username!
                            const password = data.entityData[key].request.password!
                            const newData = { username, password }
                            const model = await data.repository.create(newData)
                            assert(data.validateCreate(model, newData))
                            const savedModel = await data.repository.save(model)
                            assert(data.compareModels(model, savedModel))
                        }
                    )
            )
        }
    }

    validateCreate(model: UserModel, data?: UserInit<'request'>): boolean {
        if (data) return this.validateWrite(model, data)

        assert(model.password === undefined)
        assert(model.roles.length === 0)
        assert(model.tokens.length === 0)
        assert(model.username === undefined)

        return true
    }

    validateWrite(model: UserModel, data: UserUpdate<'request'>): boolean {
        if (data.password) {
            assert(model.password)
            assert(compareSync(data.password, model.password))
        }

        if (data.username) assert(model.username === data.username)

        return true
    }

    validateFormat(model: UserModel, data: User<'response'>): boolean {
        assert(!data.password)

        if (data.roles) {
            assert(Array.isArray(data.roles))
            for (const role of model.roles) {
                assert(data.roles.find((r) => r.name === role.name))
            }
            for (const role of data.roles) {
                assert(model.roles.find((r) => r.name === role.name))
            }
        }

        assert(data.url === userUrlFromId(model.uuid))
        assert(data.username === model.username)
        assert(data.id === model.uuid)

        return true
    }

    compareModels(
        firstModel: UserModel,
        secondModel: UserModel,
        complete?: boolean
    ): boolean {
        if (!complete) {
            return firstModel.uuid === secondModel.uuid
        }

        assert(firstModel.uuid === secondModel.uuid)
        assert(firstModel.username === secondModel.username)
        assert(firstModel.password === secondModel.password)

        for (const role of firstModel.roles) {
            assert(secondModel.roles.find((r) => r.uuid === role.uuid))
        }
        for (const role of secondModel.roles) {
            assert(firstModel.roles.find((r) => r.uuid === role.uuid))
        }

        for (const token of firstModel.tokens) {
            assert(secondModel.tokens.find((t) => t.token === token.token))
        }
        for (const token of secondModel.tokens) {
            assert(firstModel.tokens.find((t) => t.token === token.token))
        }

        return true
    }

    compareFormatted(first: User<'response'>, second: User<'response'>): boolean {
        if (first.id !== second.id) return false
        if (first.url !== second.url) return false
        if (first.username !== second.username) return false
        if (first.roles !== undefined || second.roles !== undefined) return false

        return true
    }

    getFindOptionsWhere(model?: UserModel): FindOptionsWhere<UserModel> {
        return {
            username: model ? model.username : 'non-existent',
        }
    }
}

export const userRepositoryTestSuite = new UserRepositoryTestSuite()
