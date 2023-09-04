import { AppDataSource } from '../../src/database/dataSource';
import { TestData } from '../data/index.spec';
import { initTestDatabase } from '../database/repositories/index.spec';
import experimentTests from './experiments/index.spec';
import templateTests from './templates/index.spec';
import { logger } from '@crosslab/service-common';
import {
    authorization_functions,
    bind_authorization,
} from '@crosslab/service-common/authorization';
import Mocha from 'mocha';
import * as sinon from 'sinon';

const tests = [...experimentTests, ...templateTests];
export const stubbedAuthorization = {
    ...sinon.stub(
        bind_authorization(
            authorization_functions({
                AUTHORIZATION_PSK: 'test',
                AUTHORIZATION_SERVER: 'test',
            }),
            'test',
        ),
    ),
    user: 'user:anonymus',
};

stubbedAuthorization.check_authorization.resolves({
    result: true,
});

export function addTest(
    suite: Mocha.Suite,
    name: string,
    fn?: Mocha.Func | Mocha.AsyncFunc,
) {
    suite.addTest(new Mocha.Test(name, fn));
}

function overrideTestData<T extends TestData>(oldData: T, newData: T) {
    for (const key in oldData) {
        oldData[key] = newData[key];
    }
}

describe('Operations', function () {
    let testData: TestData;

    this.beforeAll(async function () {
        logger.transports.forEach((transport) => (transport.silent = true));
        testData = await initTestDatabase();
    });

    this.beforeEach(async function () {
        if (AppDataSource.connected) {
            await AppDataSource.teardown();
        }
        const newTestData = await initTestDatabase();
        overrideTestData(testData, newTestData);
    });

    it(
        'should initialize the test data',
        async function (this: Mocha.Suite) {
            for (const test of tests) {
                this.addSuite(test(this.ctx, testData));
            }
        }.bind(this),
    );
});
