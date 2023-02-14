import { DataSourceOptions } from 'typeorm'
import { AppDataSource } from '../../../src/database/dataSource'
import {
    ScopeModel,
    RoleModel,
    UserModel,
    KeyModel,
    ActiveKeyModel,
    TokenModel,
} from '../../../src/database/model'
import { activeKeyRepository } from '../../../src/database/repositories/activeKeyRepository'
import { keyRepository } from '../../../src/database/repositories/keyRepository'
import { roleRepository } from '../../../src/database/repositories/roleRepository'
import { scopeRepository } from '../../../src/database/repositories/scopeRepository'
import { tokenRepository } from '../../../src/database/repositories/tokenRepository'
import { userRepository } from '../../../src/database/repositories/userRepository'
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
        let suite: Mocha.Suite = this

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
        synchronize: true,
        dropSchema: true,
        entities: [
            ScopeModel,
            RoleModel,
            UserModel,
            KeyModel,
            ActiveKeyModel,
            TokenModel,
        ],
    }

    const testData = prepareTestData()
    await AppDataSource.initialize(dataSourceConfig)

    for (const scopeName of scopeNames) {
        await scopeRepository.save(testData.scopes[scopeName].model)
    }

    for (const keyName of keyNames) {
        await keyRepository.save(testData.keys[keyName].model)
    }

    for (const activeKeyName of activeKeyNames) {
        await activeKeyRepository.save(testData.activeKeys[activeKeyName].model)
    }

    for (const roleName of roleNames) {
        await roleRepository.save({
            ...testData.roles[roleName].model,
            users: [],
        })
    }

    for (const userName of userNames) {
        await userRepository.save(testData.users[userName].model)
    }

    for (const tokenName of tokenNames) {
        await tokenRepository.save(testData.tokens[tokenName].model)
    }

    // assert that data was created successfully

    const allowlist = process.env.ALLOWLIST ? parseAllowlist(process.env.ALLOWLIST) : []

    // Resolve Allowlist
    await resolveAllowlist(allowlist)

    return testData
}
