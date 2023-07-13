import allowlistSpec from './allowlist.spec'
import apiSpec from './api.spec'
import authSpec from './auth.spec'
import keySpec from './key.spec'
import loginSpec from './login.spec'
import utilsSpec from './utils.spec'
import { logger } from '@crosslab/service-common'

const tests = [allowlistSpec, apiSpec, authSpec, keySpec, loginSpec, utilsSpec]

describe('Methods', async function () {
    this.beforeAll(function () {
        logger.transports.forEach((transport) => (transport.silent = true))
    })

    for (const test of tests) {
        test()
    }
})
