import { repositories } from '../../../../../src/database/dataSource';
import { postDevicesByDeviceIdWebsocket } from '../../../../../src/operations/devices';
import { TestData } from '../../../../data/index.spec';
import { addTest } from '../../../index.spec';
import { ImpossibleOperationError, MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';
import * as sinon from 'sinon';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /devices/{device_id}/websocket', context);

    const INSTANTIABLE_DEVICE_ID =
        testData['instantiable browser devices']['instantiable browser device'].model
            .uuid;
    const CONCRETE_DEVICE_ID = testData['concrete devices']['concrete device'].model.uuid;

    let deviceRepositorySaveStub: sinon.SinonSpy<
        Parameters<typeof repositories.device.save>,
        ReturnType<typeof repositories.device.save>
    >;

    let clock: sinon.SinonFakeTimers;

    suite.beforeAll(function () {
        clock = sinon.useFakeTimers({
            shouldAdvanceTime: true,
        });
        deviceRepositorySaveStub = sinon.spy(repositories.device, 'save');
    });

    suite.beforeEach(function () {
        deviceRepositorySaveStub.resetHistory();
    });

    suite.afterAll(function () {
        deviceRepositorySaveStub.restore();
        clock.restore();
    });

    addTest(
        suite,
        'should throw a MissingEntityError if the requested device cannot be found',
        async function () {
            await assert.rejects(
                async () => {
                    await postDevicesByDeviceIdWebsocket(
                        { device_id: 'non-existent' },
                        testData.userData,
                    );
                },
                (error) => {
                    assert(error instanceof MissingEntityError);
                    assert.strictEqual(error.status, 404);
                    return true;
                },
            );
        },
    );

    addTest(
        suite,
        "should throw a ImpossibleOperationError if the device is not of type 'device'",
        async function () {
            await assert.rejects(
                async () => {
                    await postDevicesByDeviceIdWebsocket(
                        {
                            device_id: INSTANTIABLE_DEVICE_ID,
                        },
                        testData.userData,
                    );
                },
                (error) => {
                    assert(error instanceof ImpossibleOperationError);
                    assert.strictEqual(error.status, 400);
                    return true;
                },
            );
        },
    );

    addTest(
        suite,
        'should successfully generate the websocket token and remove it after 5 minutes',
        async function () {
            const result = await postDevicesByDeviceIdWebsocket(
                { device_id: CONCRETE_DEVICE_ID },
                testData.userData,
            );

            assert.strictEqual(result.status, 200);
            assert(typeof result.body === 'string');
            assert(result.body.length > 0);
            assert(deviceRepositorySaveStub.calledOnce);
            const argumentFirstCall = deviceRepositorySaveStub.args[0][0];
            assert.strictEqual(argumentFirstCall.type, 'device');
            assert.strictEqual(argumentFirstCall.token, result.body);

            await clock.tickAsync(5 * 60 * 1000);
            await new Promise((resolve) => setTimeout(resolve, 500));
            assert(deviceRepositorySaveStub.calledTwice);
            const argumentSecondCall = deviceRepositorySaveStub.args[1][0];
            assert.strictEqual(argumentSecondCall.type, 'device');
            assert.strictEqual(argumentSecondCall.token, undefined);
        },
    );

    return suite;
}
