import repositorySuite from './repositories/index.spec'

const tests = [repositorySuite]

describe('Database', function () {
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
