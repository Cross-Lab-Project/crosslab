import { AppDataSource, repositories } from '../../../src/database/dataSource'
import { Migrations } from '../../../src/database/migrations'
import {
    ScopeModel,
    RoleModel,
    UserModel,
    KeyModel,
    ActiveKeyModel,
    TokenModel,
} from '../../../src/database/model'
import { parseAllowlist, resolveAllowlist } from '../../../src/methods/allowlist'
import { activeKeyNames } from '../../data/activeKeyData.spec'
import { prepareTestData, TestData } from '../../data/index.spec'
import { keyNames } from '../../data/keyData.spec'
import { roleNames } from '../../data/roleData.spec'
import { scopeNames } from '../../data/scopeData.spec'
import { tokenNames } from '../../data/tokenData.spec'
import { userNames } from '../../data/userData.spec'
import { activeKeyRepositoryTestSuite } from './activeKeyRepository.spec'
import { keyRepositoryTestSuite } from './keyRepository.spec'
import { roleRepositoryTestSuite } from './roleRepository.spec'
import { scopeRepositoryTestSuite } from './scopeRepository.spec'
import { tokenRepositoryTestSuite } from './tokenRepository.spec'
import { userRepositoryTestSuite } from './userRepository.spec'
import { DataSourceOptions } from 'typeorm'

const repositoryTestSuites = [
    activeKeyRepositoryTestSuite,
    keyRepositoryTestSuite,
    roleRepositoryTestSuite,
    scopeRepositoryTestSuite,
    tokenRepositoryTestSuite,
    userRepositoryTestSuite,
]

export default () =>
    describe('Repositories', async function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const suite: Mocha.Suite = this

        it('Should setup the repository tests', async function () {
            this.timeout(0)

            for (const repositoryTestSuite of repositoryTestSuites) {
                await repositoryTestSuite.initialize()
                suite.addSuite(repositoryTestSuite.execute())
            }
        })
    })

export async function initTestDatabase(): Promise<TestData> {
    const dataSourceConfig: DataSourceOptions = {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [
            ScopeModel,
            RoleModel,
            UserModel,
            KeyModel,
            ActiveKeyModel,
            TokenModel,
        ],
        migrations: Migrations,
        migrationsRun: true,
    }

    const testData = prepareTestData()
    await AppDataSource.initialize(dataSourceConfig)

    for (const scopeName of scopeNames) {
        await repositories.scope.save(testData.scopes[scopeName].model)
    }

    for (const keyName of keyNames) {
        await repositories.key.save(testData.keys[keyName].model)
    }

    for (const activeKeyName of activeKeyNames) {
        await repositories.activeKey.save(testData['active keys'][activeKeyName].model)
    }

    for (const roleName of roleNames) {
        await repositories.role.save({
            ...testData.roles[roleName].model,
            users: [],
        })
    }

    for (const userName of userNames) {
        await repositories.user.save(testData.users[userName].model)
    }

    for (const tokenName of tokenNames) {
        await repositories.token.save(testData.tokens[tokenName].model)
    }

    // assert that data was created successfully

    const allowlist = process.env.ALLOWLIST ? parseAllowlist(process.env.ALLOWLIST) : []

    // Resolve Allowlist
    await resolveAllowlist(allowlist)

    return testData
}
