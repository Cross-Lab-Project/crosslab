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
import { DataSourceOptions } from "typeorm";
import { ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel } from "../src/database/model";
import { config } from "../src/config";
import configSpec from "./config.spec";

const dataSourceConfig: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    dropSchema: true,
    entities: [ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel]
}

describe("Authentication Service Tests", async function () {
    // this.beforeAll(async function () {
    //     console.log = () => null
    //     console.warn = () => null

    //     // initialize AppDataSource
    //     await AppDataSource.initialize(dataSourceConfig)
    //     await initializeDataSource()

    //     // add test objects
    //     const testScope = await scopeRepository.create("test scope")
    //     await scopeRepository.save(testScope)

    //     const testRole = await roleRepository.create({
    //         name: "test role",
    //         scopes: ["test scope"]
    //     })
    //     await roleRepository.save(testRole)

    //     const testUser = await userRepository.create({
    //         username: "username",
    //         password: "password",
    //         roles: [{
    //             name: "test role"
    //         }]
    //     })
    //     await userRepository.save(testUser)

    //     const testTokenValid = await tokenRepository.create({
    //         user: "username",
    //         scopes: ["test scope"]
    //     })
    //     testTokenValid.scopes = [testScope]
    //     testTokenValid.token = "valid"
    //     testTokenValid.user = testUser
    //     await tokenRepository.save(testTokenValid)

    //     const testTokenExpired = await tokenRepository.create({
    //         user: "username",
    //         scopes: ["test scope"]
    //     })
    //     testTokenExpired.token = "expired"
    //     testTokenExpired.user = testUser
    //     testTokenExpired.expiresOn = new Date(Date.now() - 3600000).toISOString()
    //     await tokenRepository.save(testTokenExpired)
    
    //     // resolve allowlist
    //     await resolveAllowlist()
    
    //     // create active key
    //     const key = await generateNewKey()
    //     for (const activeKey of await activeKeyRepository.find()) {
    //         await activeKeyRepository.remove(activeKey)
    //     }
    //     const activeKey = await activeKeyRepository.create({
    //         use: key.use
    //     })
    //     await activeKeyRepository.save(activeKey)
    // })

    this.beforeAll(function () {
        console.log = () => undefined
        console.warn = () => undefined
        console.error = () => undefined
    })

    // databaseSuite()
    methodsSuite()
    // operationsSuite()
    // configSpec()
})