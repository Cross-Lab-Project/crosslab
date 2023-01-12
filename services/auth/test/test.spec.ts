import { config, dataSourceConfig } from "../src/config";
import { AppDataSource, initializeDataSource } from "../src/database/dataSource";
import { generateNewKey } from "../src/methods/key";
import methodsSuite from "./methods/index.spec"
import operationsSuite from "./operations/index.spec"
import databaseSuite from "./database/index.spec"
import { resolveAllowlist } from "../src/methods/allowlist";
import { scopeRepository } from "../src/database/repositories/scopeRepository";
import { roleRepository } from "../src/database/repositories/roleRepository";
import { userRepository } from "../src/database/repositories/userRepository";
import { tokenRepository } from "../src/database/repositories/tokenRepository";
import { activeKeyRepository } from "../src/database/repositories/activeKeyRepository";

describe("Authentication Service Tests", async function () {
    this.beforeAll(async function () {
        console.log = () => null
        console.warn = () => null

        // initialize AppDataSource
        await AppDataSource.initialize(dataSourceConfig)
        await initializeDataSource()

        // add test objects
        const testScope = await scopeRepository.create("test scope")
        await scopeRepository.save(testScope)

        const testRole = await roleRepository.create({
            name: "test role",
            scopes: ["test scope"]
        })
        await roleRepository.save(testRole)

        const testUser = await userRepository.create({
            username: "username",
            password: "password",
            roles: [{
                name: "test role"
            }]
        })
        await userRepository.save(testUser)

        const testTokenValid = await tokenRepository.create({
            scopes: ["test scope"]
        })
        testTokenValid.scopes = [testScope]
        testTokenValid.token = "valid"
        testTokenValid.user = testUser
        await tokenRepository.save(testTokenValid)

        const testTokenExpired = await tokenRepository.create({
            scopes: ["test scope"]
        })
        testTokenExpired.token = "expired"
        testTokenExpired.user = testUser
        testTokenExpired.expiresOn = new Date(Date.now() - 3600000).toISOString()
        await tokenRepository.save(testTokenExpired)
    
        // resolve allowlist
        await resolveAllowlist(config)
    
        // create active key
        const key = await generateNewKey()
        for (const activeKey of await activeKeyRepository.find()) {
            await activeKeyRepository.delete(activeKey)
        }
        const activeKey = await activeKeyRepository.create({
            key: key.uuid,
            use: key.use
        })
        await activeKeyRepository.save(activeKey)
    })

    databaseSuite()
    methodsSuite()
    operationsSuite()
})