import { AppDataSource } from '../../src/database/dataSource'
import { TestData } from '../data/index.spec'
import { initTestDatabase } from '../database/repositories/index.spec'
import authTests from './auth/index.spec'
import deviceAuthenticationTokenTests from './deviceAuthenticationToken/index.spec'
import identityTests from './identity/index.spec'
import loginTests from './login/index.spec'
import logoutTests from './logout/index.spec'
import registerTests from './register/index.spec'
import roleTests from './roles/index.spec'
import usersTests from './users/index.spec'
import { logger } from '@crosslab/service-common'

const tests = [
    ...authTests,
    ...deviceAuthenticationTokenTests,
    ...identityTests,
    ...loginTests,
    ...logoutTests,
    ...registerTests,
    ...roleTests,
    ...usersTests,
]

describe('Operations', function () {
    let testData: TestData
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const suite: Mocha.Suite = this

    this.beforeAll(async function () {
        logger.transports.forEach((transport) => (transport.silent = true))
        testData = await initTestDatabase()
    })

    this.beforeEach(async function () {
        if (AppDataSource.connected) {
            await AppDataSource.teardown()
        }
        const newTestData = await initTestDatabase()
        for (const key in newTestData) {
            // eslint-disable-next-line
            ;(testData as any)[key] = (newTestData as any)[key]
        }
    })

    it('should initialize the test data', async function () {
        for (const test of tests) {
            suite.addSuite(test(this.ctx, testData))
        }
    })
})
