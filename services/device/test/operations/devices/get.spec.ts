import { getDevices } from '../../../src/operations/devices';
import { deviceNames } from '../../data/devices/index.spec';
import { TestData } from '../../data/index.spec';
import { DeviceOverviewRepositoryTestSuite } from '../../database/repositories/device/deviceOverview.spec';
import { addTest } from '../index.spec';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /devices', context);

    addTest(suite, 'should get all devices', async function () {
        const result = await getDevices(testData.userData);
        assert(result.status === 200);

        for (const deviceName of deviceNames) {
            const searchedDevice = testData.devices[deviceName].response;
            assert(
                result.body.find((device) =>
                    DeviceOverviewRepositoryTestSuite.compareFormatted(
                        device,
                        searchedDevice,
                    ),
                ),
                `could not find device '${deviceName}'`,
            );
        }
    });

    return suite;
}
