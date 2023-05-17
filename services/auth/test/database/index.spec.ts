import dataSourceSpec from './dataSource.spec'
import modelSpec from './model.spec'
import repositorySuite from './repositories/index.spec'
import { logger } from '@crosslab/service-common'

const tests = [modelSpec, dataSourceSpec, repositorySuite]

describe('Database', function () {
    this.beforeAll(function () {
        logger.transports.forEach((transport) => (transport.silent = true))
    })

    for (const test of tests) {
        test()
    }
})
