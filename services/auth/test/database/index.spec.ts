import { activeKeyRepository } from "../../src/database/repositories/activeKeyRepository"
import { keyRepository } from "../../src/database/repositories/keyRepository"
import { roleRepository } from "../../src/database/repositories/roleRepository"
import { scopeRepository } from "../../src/database/repositories/scopeRepository"
import { tokenRepository } from "../../src/database/repositories/tokenRepository"
import { userRepository } from "../../src/database/repositories/userRepository"
import { activeKeyData } from "../data/activeKeyData.spec"
import { keyData } from "../data/keyData.spec"
import { roleData } from "../data/roleData.spec"
import { scopeData } from "../data/scopeData.spec"
import { tokenDataExpired, tokenDataValid } from "../data/tokenData.spec"
import { userData } from "../data/userData.spec"
import dataSourceSpec from "./dataSource.spec"
import modelSpec from "./model.spec"
import repositorySuite from "./repositories/index.spec"

const tests = [
    modelSpec,
    dataSourceSpec,
    repositorySuite
]

export default () => describe("Database", async function () {
    for (const test of tests) {
        test()
    }
})

export async function initTestDatabase() {
    for (const scopeName in scopeData) {
        const scopeModel = await scopeRepository.create(scopeData[scopeName])
        await scopeRepository.save(scopeModel)
    }

    for (const keyName in keyData) {
        const keyModel = await keyRepository.create(keyData[keyName])
        await keyRepository.save(keyModel)
    }

    for (const activeKeyName in activeKeyData) {
        const activeKeyModel = await activeKeyRepository.create(activeKeyData[activeKeyName])
        await activeKeyRepository.save(activeKeyModel)
    }

    for (const roleName in roleData) {
        const roleModel = await roleRepository.create(roleData[roleName])
        await roleRepository.save(roleModel)
    }

    for (const userName in userData) {
        const userModel = await userRepository.create(userData[userName])
        await userRepository.save(userModel)
    }

    for (const tokenName in tokenDataExpired) {
        const tokenModel = await tokenRepository.create(tokenDataExpired[tokenName])
        await tokenRepository.save(tokenModel)
    }

    for (const tokenName in tokenDataValid) {
        const tokenModel = await tokenRepository.create(tokenDataValid[tokenName])
        await tokenRepository.save(tokenModel)
    }

    // assert that data was created successfully
}
