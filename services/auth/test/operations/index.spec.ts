import { AppDataSource } from "../../src/database/dataSource"
import { TestData } from "../data/index.spec"
import { initTestDatabase } from "../database/repositories/index.spec"
import authTests from "./auth/index.spec"
import deviceAuthenticationTokenTests from "./deviceAuthenticationToken/index.spec"
import identityTests from "./identity/index.spec"
import loginTests from "./login/index.spec"
import logoutTests from "./logout/index.spec"
import usersTests from "./users/index.spec"

const tests = [
    ...authTests,
    // ...deviceAuthenticationTokenTests,
    // ...identityTests,
    // ...loginTests,
    // ...logoutTests,
    // ...usersTests
]

export default () => describe("Operations", function () {
    let testData: TestData

    this.beforeEach(async function () {
        if (AppDataSource.connected) {
            await AppDataSource.teardown()
        }
        testData = await initTestDatabase()
    })

    it("should initialize the test data", async function () {
        for (const test of tests) {
            test(testData).beforeEach(async function () {
                if (AppDataSource.connected) {
                    await AppDataSource.teardown()
                }
                testData = await initTestDatabase()
            })
        }
    })
})