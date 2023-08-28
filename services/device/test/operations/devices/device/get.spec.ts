import { apiClient } from '../../../../src/globals';
import { getDevicesByDeviceId } from '../../../../src/operations/devices';
import { deviceGroupNames } from '../../../data/devices/deviceGroups/index.spec';
import { deviceNames } from '../../../data/devices/index.spec';
import { TestData } from '../../../data/index.spec';
import { deviceRepositoryTestSuite } from '../../../database/repositories/device.spec';
import { addTest, stubbedAuthorization } from '../../index.spec';
import { MissingEntityError } from '@crosslab/service-common';
import assert from 'assert';
import Mocha from 'mocha';
import * as sinon from 'sinon';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /devices/{device_id}', context);
    let getDeviceStub: sinon.SinonStub<
        Parameters<typeof apiClient.getDevice>,
        ReturnType<typeof apiClient.getDevice>
    >;

    suite.beforeAll(function () {
        getDeviceStub = sinon.stub(apiClient, 'getDevice');
        getDeviceStub.callsFake(async (url, options) => {
            const result = await getDevicesByDeviceId(stubbedAuthorization, {
                device_id: url.split('/').at(-1) ?? 'non-existent',
                flat_group: options?.flat_group,
            });
            assert(result.status === 200);
            return result.body;
        });
    });

    suite.afterAll(function () {
        getDeviceStub.restore();
    });

    addTest(suite, 'should return the formatted device', async function () {
        for (const deviceName of deviceNames) {
            const device = testData.devices[deviceName];
            const result = await getDevicesByDeviceId(stubbedAuthorization, {
                device_id: device.model.uuid,
            });

            assert(result.status === 200);
            assert(deviceRepositoryTestSuite.validateFormat(device.model, result.body));
        }
    });

    addTest(
        suite,
        'should return the flattened formatted device group',
        async function () {
            for (const deviceGroupName of deviceGroupNames) {
                const deviceGroup = testData['device groups'][deviceGroupName];
                const result = await getDevicesByDeviceId(stubbedAuthorization, {
                    device_id: deviceGroup.model.uuid,
                    flat_group: true,
                });

                assert(result.status === 200);
                assert(
                    deviceRepositoryTestSuite.validateFormat(
                        deviceGroup.model,
                        result.body,
                        {
                            flatten: true,
                        },
                    ),
                );
            }
        },
    );

    addTest(
        suite,
        'should throw a MissingEntityError if device is not found',
        async function () {
            await assert.rejects(
                async () => {
                    await getDevicesByDeviceId(stubbedAuthorization, {
                        device_id: 'non-existent',
                    });
                },
                (error) => {
                    assert(error instanceof MissingEntityError);
                    assert(error.status === 404);
                    return true;
                },
            );
        },
    );

    return suite;
}
