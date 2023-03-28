import { DeviceRepository } from '../../../src/database/repositories/device'
import { apiClient } from '../../../src/globals'
import { changedCallbacks } from '../../../src/methods/callbacks'
import { postDevices, UnauthorizedError } from '../../../src/operations/devices'
import { deviceNames } from '../../data/devices/index.spec'
import { TestData } from '../../data/index.spec'
import { deviceRepositoryTestSuite } from '../../database/repositories/device.spec'
import { EntityData } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /devices', context)
    let getDeviceStub: sinon.SinonStub<
        Parameters<typeof apiClient.getDevice>,
        ReturnType<typeof apiClient.getDevice>
    >

    suite.beforeAll(function () {
        getDeviceStub = sinon.stub(apiClient, 'getDevice')
    })

    suite.afterEach(function () {
        getDeviceStub.reset()
    })

    suite.afterAll(function () {
        getDeviceStub.restore()
    })

    async function createDevice(
        device: EntityData<DeviceRepository>,
        changedUrl?: string
    ) {
        getDeviceStub.callsFake(async (url, _options) => {
            for (const dn of deviceNames) {
                if (testData.devices[dn].response.url === url)
                    return testData.devices[dn].response
            }
            return {
                url: 'http://localhost/devices/undefined',
                type: 'device',
                name: 'undefined',
                owner: 'http://localhost/devices/undefined',
            }
        })
        const result = await postDevices({ changedUrl }, device.request, {
            JWT: {
                username: 'testuser',
                url: device.model.owner,
                scopes: [],
            },
        })
        assert(result.status === 201)

        assert(
            deviceRepositoryTestSuite.compareFormatted(result.body, {
                ...device.response,
                url: result.body.url,
            })
        )
        assert(changedCallbacks.get(device.model.uuid) === changedUrl)
    }

    suite.addTest(
        new Mocha.Test('should create a new device', async function () {
            for (const deviceName of deviceNames) {
                await createDevice(testData.devices[deviceName])
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should create a new device and register a callback url',
            async function () {
                for (const deviceName of deviceNames) {
                    createDevice(
                        testData.devices[deviceName],
                        `http://localhost/callbacks/${deviceName}`
                    )
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw an error if no UserData for JWT is provided',
            async function () {
                await assert.rejects(
                    async () => {
                        await postDevices(
                            {},
                            testData.devices['concrete device'].request,
                            {}
                        )
                    },
                    (error) => {
                        assert(error instanceof UnauthorizedError)
                        assert(error.status === 401)
                        return true
                    }
                )
            }
        )
    )

    return suite
}
