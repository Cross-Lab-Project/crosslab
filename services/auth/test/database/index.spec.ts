import dataSourceSpec from './dataSource.spec'
import modelSpec from './model.spec'
import repositorySuite from './repositories/index.spec'

const tests = [modelSpec, dataSourceSpec, repositorySuite]

export default () =>
    describe('Database', function () {
        for (const test of tests) {
            test()
        }
    })
