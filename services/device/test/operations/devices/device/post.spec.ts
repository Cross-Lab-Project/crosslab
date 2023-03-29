import { postDevicesByDeviceId } from '../../../../src/operations/devices'
import { TestData } from '../../../data/index.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /devices/{device_id}', context)

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if device is not found',
            async function () {
                await assert.rejects(
                    async () => {
                        await postDevicesByDeviceId(
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

    return suite
}
