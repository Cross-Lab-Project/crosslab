import { initTestDatabase } from '../database/repositories/index.spec'
import availabilitySpec from './availability.spec'
import callbacksSpec from './callbacks.spec'
// import signalingSpec from './signaling.spec'
import urlFromIdSpec from './urlFromId.spec'
import { logger } from '@crosslab/service-common'

// const tests = [availabilitySpec, callbacksSpec, signalingSpec, urlFromIdSpec]
const tests = [availabilitySpec, callbacksSpec, urlFromIdSpec]

describe('Methods', function () {
    this.beforeAll(async function () {
        await initTestDatabase()
        logger.transports.forEach((transport) => (transport.silent = true))
    })

    for (const test of tests) {
        test()
    }
})
