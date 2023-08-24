import { AppDataSource } from '../../src/database/dataSource';
import { TestData } from '../data/index.spec';
import { initTestDatabase } from '../database/repositories/index.spec';
// import callbackTest from './callbacks/index.spec'
import deviceTests from './devices/index.spec';
import peerconnectionTests from './peerconnections/index.spec';
import { logger } from '@crosslab/service-common';
import Mocha from 'mocha';

// const tests = [...deviceTests, ...peerconnectionTests, callbackTest]
const tests = [...deviceTests, ...peerconnectionTests];

export function addTest(
    suite: Mocha.Suite,
    name: string,
    fn?: Mocha.Func | Mocha.AsyncFunc,
) {
    suite.addTest(new Mocha.Test(name, fn));
}

describe('Operations', function () {
    let testData: TestData;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const suite: Mocha.Suite = this;

    this.beforeAll(async function () {
        logger.transports.forEach((transport) => (transport.silent = true));
        testData = await initTestDatabase();
    });

    this.beforeEach(async function () {
        if (AppDataSource.connected) {
            await AppDataSource.teardown();
        }
        const newTestData = await initTestDatabase();
        for (const key in newTestData) {
            // eslint-disable-next-line
            (testData as any)[key] = (newTestData as any)[key];
        }
    });

    it('should initialize the test data', async function () {
        for (const test of tests) {
            suite.addSuite(test(suite.ctx, testData));
        }
    });
});
