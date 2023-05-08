import { dataSourceConfig } from '../../src/config'
import {
    AppDataSource,
    ApplicationDataSource,
    initializeDataSource,
} from '../../src/database/dataSource'
import { ActiveKeyModel } from '../../src/database/model'
import { roleRepository } from '../../src/database/repositories/roleRepository'
import { userRepository } from '../../src/database/repositories/userRepository'
import assert from 'assert'
import rewire from 'rewire'

function invertMapping(mapping: { [k: string]: string[] }) {
    const newMapping: { [k: string]: string[] } = {}

    for (const key in mapping) {
        for (const value of mapping[key]) {
            if (!newMapping[value]) newMapping[value] = []

            newMapping[value].push(key)
        }
    }

    return newMapping
}

export default () =>
    describe('Data Source Tests', async function () {
        describe('initializeDataSource', async function () {
            let scopesStandardRolesMapping: { [k: string]: string[] }

            this.beforeAll(async function () {
                const dataSourceModule = rewire('../../src/database/dataSource.ts')
                scopesStandardRolesMapping = dataSourceModule.__get__(
                    'scopesStandardRolesMapping'
                )
            })

            this.beforeEach(async function () {
                if (AppDataSource.connected) await AppDataSource.teardown()

                await AppDataSource.initialize({
                    type: 'sqlite',
                    database: ':memory:',
                    dropSchema: true,
                    migrationsRun: true,
                    migrations: dataSourceConfig.migrations,
                    entities: dataSourceConfig.entities,
                })
            })

            it('should initialize the data source successfully', async function () {
                await initializeDataSource()

                const roleModelSuperadmin = await roleRepository.findOneOrFail({
                    where: {
                        name: 'superadmin',
                    },
                })

                for (const scope in scopesStandardRolesMapping) {
                    assert(
                        roleModelSuperadmin.scopes.find(
                            (scopeModel) => scopeModel.name === scope
                        )
                    )
                }

                for (const scopeModel of roleModelSuperadmin.scopes) {
                    assert(scopeModel.name in scopesStandardRolesMapping)
                }

                const invertedMapping = invertMapping(scopesStandardRolesMapping)
                for (const role in invertedMapping) {
                    const roleModel = await roleRepository.findOneOrFail({
                        where: {
                            name: role,
                        },
                    })

                    for (const scope of invertedMapping[role]) {
                        assert(
                            roleModel.scopes.find(
                                (scopeModel) => scopeModel.name === scope
                            )
                        )
                    }

                    for (const scopeModel of roleModel.scopes) {
                        assert(
                            invertedMapping[role].find(
                                (scope) => scope === scopeModel.name
                            )
                        )
                    }
                }
            })

            it('should teardown the data source correctly', async function () {
                await AppDataSource.teardown()

                assert(!AppDataSource.connected)
            })

            it('should throw an error on getRepository() if the data source has not been initialized', async function () {
                const testAppDataSource = new ApplicationDataSource()
                assert.throws(
                    () => testAppDataSource.getRepository(ActiveKeyModel),
                    (error) => {
                        assert(error instanceof Error)
                        return true
                    }
                )
            })

            it('should throw an error on teardown() if the data source has not been initialized', async function () {
                const testAppDataSource = new ApplicationDataSource()
                await assert.rejects(
                    async () => await testAppDataSource.teardown(),
                    (error) => {
                        assert(error instanceof Error)
                        return true
                    }
                )
            })

            it('should update the data source correctly', async function () {
                await initializeDataSource()

                const roleModelSuperadmin = await roleRepository.findOneOrFail({
                    where: {
                        name: 'superadmin',
                    },
                })
                const userModelSuperadmin = await userRepository.findOneOrFail({
                    where: {
                        username: 'local:superadmin',
                    },
                })
                await roleRepository.remove(roleModelSuperadmin)
                await userRepository.remove(userModelSuperadmin)

                await initializeDataSource()

                const roleModelSuperadminUpdated = await roleRepository.findOneOrFail({
                    where: {
                        name: 'superadmin',
                    },
                })

                for (const scope in scopesStandardRolesMapping) {
                    assert(
                        roleModelSuperadminUpdated.scopes.find(
                            (scopeModel) => scopeModel.name === scope
                        )
                    )
                }

                for (const scopeModel of roleModelSuperadminUpdated.scopes) {
                    assert(scopeModel.name in scopesStandardRolesMapping)
                }

                const invertedMapping = invertMapping(scopesStandardRolesMapping)
                for (const role in invertedMapping) {
                    const roleModel = await roleRepository.findOneOrFail({
                        where: {
                            name: role,
                        },
                    })

                    for (const scope of invertedMapping[role]) {
                        assert(
                            roleModel.scopes.find(
                                (scopeModel) => scopeModel.name === scope
                            )
                        )
                    }

                    for (const scopeModel of roleModel.scopes) {
                        assert(
                            invertedMapping[role].find(
                                (scope) => scope === scopeModel.name
                            )
                        )
                    }
                }
            })
        })
    })
