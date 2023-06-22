import { dataSourceConfig } from '../../src/config'
import {
    AppDataSource,
    initializeDataSource,
    repositories,
} from '../../src/database/dataSource'
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

                const roleModelSuperadmin = await repositories.role.findOneOrFail({
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
                    const roleModel = await repositories.role.findOneOrFail({
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

            it('should update the data source correctly', async function () {
                await initializeDataSource()

                const roleModelSuperadmin = await repositories.role.findOneOrFail({
                    where: {
                        name: 'superadmin',
                    },
                })
                const userModelSuperadmin = await repositories.user.findOneOrFail({
                    where: {
                        username: 'local:superadmin',
                    },
                })
                await repositories.role.remove(roleModelSuperadmin)
                await repositories.user.remove(userModelSuperadmin)

                await initializeDataSource()

                const roleModelSuperadminUpdated = await repositories.role.findOneOrFail({
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
                    const roleModel = await repositories.role.findOneOrFail({
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
