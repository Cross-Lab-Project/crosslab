import allowlistSpec from './allowlist.spec'
import apiSpec from './api.spec'
import authSpec from './auth.spec'
import keySpec from './key.spec'
import loginSpec from './login.spec'
import utilsSpec from './utils.spec'

const tests = [allowlistSpec, apiSpec, authSpec, keySpec, loginSpec, utilsSpec]

describe('Methods', async function () {
    this.beforeAll(function () {
        console.log = (_message: any, ..._optionalParams: any[]) => undefined
        console.error = (_message: any, ..._optionalParams: any[]) => undefined
        console.warn = (_message: any, ..._optionalParams: any[]) => undefined
        console.info = (_message: any, ..._optionalParams: any[]) => undefined
    })

    for (const test of tests) {
        test()
    }
})
