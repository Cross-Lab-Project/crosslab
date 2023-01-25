import { DataSourceOptions } from "typeorm";
import { AppDataSource } from "../../../src/database/dataSource";
import { ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel } from "../../../src/database/model";
import { activeKeyRepository } from "../../../src/database/repositories/activeKeyRepository";
import { keyRepository } from "../../../src/database/repositories/keyRepository";
import { roleRepository } from "../../../src/database/repositories/roleRepository";
import { scopeRepository } from "../../../src/database/repositories/scopeRepository";
import { tokenRepository } from "../../../src/database/repositories/tokenRepository";
import { userRepository } from "../../../src/database/repositories/userRepository";
import { activeKeyNames } from "../../data/activeKeyData.spec";
import { prepareTestData, TestData } from "../../data/index.spec";
import { keyNames } from "../../data/keyData.spec";
import { roleNames } from "../../data/roleData.spec";
import { scopeNames } from "../../data/scopeData.spec";
import { tokenNames } from "../../data/tokenData.spec";
import { userNames } from "../../data/userData.spec";
import { AbstractRepositoryTest } from "./abstractRepository.spec";
import { ActiveKeyRepositoryTest } from "./activeKeyRepository.spec";
import keyRepositorySpec from "./keyRepository.spec";
import roleRepositorySpec from "./roleRepository.spec";
import scopeRepositorySpec from "./scopeRepository.spec";
import tokenRepositorySpec from "./tokenRepository.spec";
import userRepositorySpec from "./userRepository.spec";

const tests = [
    keyRepositorySpec,
    roleRepositorySpec,
    scopeRepositorySpec,
    tokenRepositorySpec,
    userRepositorySpec
]

export default () => describe("Repositories", async function () {
    let activeKeyRepositoryTest: ActiveKeyRepositoryTest
    let suite: Mocha.Suite = this

    this.beforeAll(async function () {
        activeKeyRepositoryTest = new ActiveKeyRepositoryTest()
        await activeKeyRepositoryTest.initialize()
    })

    it("Should setup the repository tests", async function() {
        suite.addSuite(activeKeyRepositoryTest.execute())
    })
})

export async function initTestDatabase(): Promise<TestData> {
    const dataSourceConfig: DataSourceOptions = {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        dropSchema: true,
        entities: [ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel]
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
            users: []
        })
    }

    for (const userName of userNames) {
        await userRepository.save(testData.users[userName].model)
    }

    for (const tokenName of tokenNames) {
        await tokenRepository.save(testData.tokens[tokenName].model)
    }

    // assert that data was created successfully

    return testData
}