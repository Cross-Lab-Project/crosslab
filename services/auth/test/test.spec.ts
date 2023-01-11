import { config, dataSourceConfig } from "../src/config";
import { AppDataSource, initializeDataSource } from "../src/database/data_source";
import { generateNewKey, resolveAllowlist } from "../src/methods/utils";
import { ActiveKeyModel, RoleModel, ScopeModel, TokenModel, UserModel } from "../src/database/model";
import methodsSuite from "./methods/index.spec"
import operationsSuite from "./operations/index.spec"

describe("Authentication Service Tests", async function () {
    this.beforeAll(async function () {
        console.log = () => null
        console.warn = () => null

        // initialize AppDataSource
        await AppDataSource.initialize(dataSourceConfig)
        await initializeDataSource()

        // add test objects
        const scopeRepository = AppDataSource.getRepository(ScopeModel)
        const roleRepository = AppDataSource.getRepository(RoleModel)
        const userRepository = AppDataSource.getRepository(UserModel)
        const tokenRepository = AppDataSource.getRepository(TokenModel)

        const testScope = scopeRepository.create()
        testScope.name = "test scope"
        await scopeRepository.save(testScope)

        const testRole = roleRepository.create()
        testRole.name = "test role"
        testRole.scopes = [testScope]
        roleRepository.save(testRole)

        const testUser = userRepository.create()
        testUser.username = "username"
        testUser.password = "password"
        testUser.roles = [testRole]
        await userRepository.save(testUser)

        const testTokenValid = tokenRepository.create()
        testTokenValid.scopes = [testScope]
        testTokenValid.token = "valid"
        testTokenValid.user = testUser
        await tokenRepository.save(testTokenValid)

        const testTokenExpired = tokenRepository.create()
        testTokenExpired.scopes = [testScope]
        testTokenExpired.token = "expired"
        testTokenExpired.user = testUser
        testTokenExpired.expiresOn = new Date(Date.now() - 3600000).toISOString()
        await tokenRepository.save(testTokenExpired)
    
        // resolve allowlist
        await resolveAllowlist(config)
    
        // create active key
        const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
        const key = await generateNewKey()
        for (const activeKey of await activeKeyRepository.find()) {
            await activeKeyRepository.delete(activeKey)
        }
        const activeKey = activeKeyRepository.create()
        activeKey.key = key
        activeKey.use = key.use
        await activeKeyRepository.save(activeKey)
    })

    methodsSuite()
    operationsSuite()
})