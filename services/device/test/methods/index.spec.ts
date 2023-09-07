import { initTestDatabase } from '../database/repositories/index.spec.js.ts";
import availabilitySpec from './availability.spec.js';
import callbacksSpec from './callbacks.spec.js';
// import signalingSpec from './signaling.spec.js'
import urlFromIdSpec from './urlFromId.spec.js';
import { logger } from '@crosslab/service-common';

// const tests = [availabilitySpec, callbacksSpec, signalingSpec, urlFromIdSpec]
const tests = [availabilitySpec, callbacksSpec, urlFromIdSpec];

describe('Methods', function () {
    this.beforeAll(async function () {
        await initTestDatabase();
        logger.transports.forEach((transport) => (transport.silent = true));
    });

    for (const test of tests) {
        test();
    }
});
