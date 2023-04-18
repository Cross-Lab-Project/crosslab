import { deviceRepository } from '../../../../src/database/repositories/device'
import { deleteDevicesByDeviceId } from '../../../../src/operations/devices'
import { deviceNames } from '../../../data/devices/index.spec'
import { TestData } from '../../../data/index.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /devices/{device_id}', context)

    suite.addTest(
        new Mocha.Test('should delete the device', async function () {
            for (const deviceName of deviceNames) {
                const deviceModel = testData.devices[deviceName].model
                const result = await deleteDevicesByDeviceId(
                    { device_id: deviceModel.uuid },
                    testData.userData
                )
                assert(result.status === 204)
                assert(
                    (await deviceRepository.findOne({
                        where: {
                            uuid: deviceModel.uuid,
                        },
                    })) === null
                )
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if device is not found',
            async function () {
                await assert.rejects(
                    async () => {
                        await deleteDevicesByDeviceId(
                            { device_id: 'non-existent' },
                            testData.userData
                        )
                    },
                    (error) => {
                        assert(error instanceof MissingEntityError)
                        assert(error.status === 404)
                        return true
                    }
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw an error if user is not the owner of the device',
            async function (this: Mocha.Context) {
                this.skip()
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'superadmin/admin should be able to delete the device',
            async function (this: Mocha.Context) {
                this.skip()
            }
        )
    )

    return suite
}
