import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'
import { RoleModel } from '../../../src/database/model'
import { Role } from '../../../src/generated/types'
import { AbstractRepositoryTestSuite } from './abstractRepository.spec'
import Mocha from 'mocha'
import { scopeRepositoryTestSuite } from './scopeRepository.spec'
import { roleNames } from '../../data/roleData.spec'
import { RoleRepository } from '../../../src/database/repositories/roleRepository'

class RoleRepositoryTestSuite extends AbstractRepositoryTestSuite<RoleModel> {
    constructor() {
        super(RoleModel)
    }

    public async initialize(): Promise<void> {
        await super.initialize()
        if (!this.testSuites) throw new Error('Test suites have not been initialized!')

        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should add user to role only if user is not already present',
                    async function () {
                        const repository = data.repository as RoleRepository
                        const roleModel: RoleModel = await repository.save({
                            ...data.entityData.user.model,
                        })

                        assert(Array.isArray(roleModel.users))
                        assert(roleModel.users.length > 0)

                        const userModel = roleModel.users[0]
                        roleModel.users = []

                        repository.addUserModelToRoleModel(roleModel, userModel)
                        assert(Array.isArray(roleModel.users))
                        assert(roleModel.users.length === 1)
                        assert(roleModel.users[0] === userModel)

                        repository.addUserModelToRoleModel(roleModel, userModel)
                        assert(Array.isArray(roleModel.users))
                        assert(roleModel.users.length === 1)
                        assert(roleModel.users[0] === userModel)
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should remove user from role only if user is present',
                    async function () {
                        const repository = data.repository as RoleRepository
                        const roleModel: RoleModel = await repository.save({
                            ...data.entityData.user.model,
                        })

                        assert(Array.isArray(roleModel.users))
                        assert(roleModel.users.length > 0)

                        const userModel = roleModel.users[0]
                        const oldLength = roleModel.users.length

                        repository.removeUserModelFromRoleModel(roleModel, userModel)
                        assert(Array.isArray(roleModel.users))
                        assert(roleModel.users.length === oldLength - 1)
                        assert(
                            !roleModel.users.find((user) => user.uuid === userModel.uuid)
                        )

                        repository.removeUserModelFromRoleModel(roleModel, userModel)
                        assert(Array.isArray(roleModel.users))
                        assert(roleModel.users.length === oldLength - 1)
                        assert(
                            !roleModel.users.find((user) => user.uuid === userModel.uuid)
                        )
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    "it should not write property 'name' if it is not provided",
                    async function () {
                        const model: RoleModel = data.entityData.superadmin.model
                        const oldName = model.name
                        await data.repository.write(model, {})
                        assert(model.name === oldName)
                    }
                )
        )
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    "it should not write property 'scopes' if it is not provided",
                    async function () {
                        const model: RoleModel = data.entityData.superadmin.model
                        const oldScopes = JSON.stringify(model.scopes)
                        await data.repository.write(model, {})
                        assert(JSON.stringify(model.scopes) === oldScopes)
                    }
                )
        )

        // replace save test suite because of unique name index
        this.testSuites.save.tests = this.testSuites.save.tests.filter(
            (test) => !test.title.startsWith('should save a valid model')
        )
        for (const key of roleNames) {
            this.addTestToSuite(
                'save',
                (data) =>
                    new Mocha.Test(
                        `should save a valid model (${key})`,
                        async function () {
                            const name = 'new:' + data.entityData[key].request.name!
                            const scopes = data.entityData[key].request.scopes!
                            const newData = { name, scopes }
                            const model = await data.repository.create(newData)
                            assert(data.validateCreate(model, newData))
                            const savedModel = await data.repository.save(model)
                            assert(data.compareModels(model, savedModel))
                        }
                    )
            )
        }
    }

    validateCreate(model: RoleModel, data?: Role<'request'>): boolean {
        if (data) return this.validateWrite(model, data)

        assert(model.uuid === undefined)
        assert(model.name === undefined)
        assert(model.scopes === undefined)
        assert(model.users.length === 0)

        return true
    }

    validateWrite(model: RoleModel, data: Role<'request'>): boolean {
        assert(model.name === data.name, 'Role was created with another name')
        if (data.scopes) {
            for (const scope of model.scopes) {
                assert(
                    data.scopes.includes(scope.name),
                    'Role contains additional scopes'
                )
            }
            for (const scope of data.scopes) {
                assert(
                    model.scopes.find((s) => s.name === scope),
                    'Role is missing a scope'
                )
            }
        }
        return true
    }

    validateFormat(model: RoleModel, data: Role<'response'>): boolean {
        assert(data.name === model.name)
        assert(data.scopes)
        assert(Array.isArray(data.scopes))
        assert(data.scopes.length === model.scopes.length)

        for (const scope of model.scopes) {
            assert(data.scopes.includes(scope.name), 'Formatted role is missing a scope')
        }
        for (const scope of data.scopes) {
            assert(
                model.scopes.find((s) => s.name === scope),
                'Formatted role contains too many scopes'
            )
        }

        return true
    }

    compareModels(
        firstModel: RoleModel,
        secondModel: RoleModel,
        complete?: boolean
    ): boolean {
        if (!complete) {
            return firstModel.name === secondModel.name
        }

        assert(firstModel.name === secondModel.name)

        for (const scope of firstModel.scopes) {
            assert(
                secondModel.scopes.find((s) => s.name === scope.name),
                'First model contains more scopes than second model'
            )
        }
        for (const scope of secondModel.scopes) {
            assert(
                firstModel.scopes.find((s) => s.name === scope.name),
                'First model contains less scopes than second model'
            )
        }

        // TODO: add comparison of users

        return true
    }

    compareFormatted(first: Role<'response'>, second: Role<'response'>): boolean {
        if (first.name !== second.name) return false

        for (const scope of first.scopes ?? []) {
            if (
                !second.scopes?.find((s) =>
                    scopeRepositoryTestSuite.compareFormatted(s, scope)
                )
            )
                return false
        }

        for (const scope of second.scopes ?? []) {
            if (
                !first.scopes?.find((s) =>
                    scopeRepositoryTestSuite.compareFormatted(s, scope)
                )
            )
                return false
        }

        return true
    }

    getFindOptionsWhere(model?: RoleModel | undefined): FindOptionsWhere<RoleModel> {
        return {
            name: model ? model.name : 'non-existent',
        }
    }
}

export const roleRepositoryTestSuite = new RoleRepositoryTestSuite()
