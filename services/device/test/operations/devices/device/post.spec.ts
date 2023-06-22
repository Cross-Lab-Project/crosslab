import { repositories } from '../../../../src/database/dataSource'
import { apiClient } from '../../../../src/globals'
import { changedCallbacks } from '../../../../src/methods/callbacks'
import { postDevicesByDeviceId } from '../../../../src/operations/devices'
import { instantiableBrowserDeviceNames } from '../../../data/devices/instantiableBrowserDevices/index.spec'
import { instantiableCloudDeviceNames } from '../../../data/devices/instantiableCloudDevices/index.spec'
import { TestData } from '../../../data/index.spec'
import { concreteDeviceRepositoryTestSuite } from '../../../database/repositories/device/concreteDevice.spec'
import { addTest } from '../../index.spec'
import { ImpossibleOperationError, MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /devices/{device_id}', context)
    const DEVICE_TOKEN = '15addcf9-74be-4057-80af-cf85cff08b03'
    let createDeviceAuthenticationTokenStub: sinon.SinonStub<
        Parameters<typeof apiClient.createDeviceAuthenticationToken>,
        ReturnType<typeof apiClient.createDeviceAuthenticationToken>
    >

    suite.beforeAll(function () {
        createDeviceAuthenticationTokenStub = sinon.stub(
            apiClient,
            'createDeviceAuthenticationToken'
        )
        createDeviceAuthenticationTokenStub.resolves(DEVICE_TOKEN)
    })

    suite.afterEach(function () {
        createDeviceAuthenticationTokenStub.resetHistory()
    })

    suite.afterAll(function () {
        createDeviceAuthenticationTokenStub.restore()
    })

    addTest(
        suite,
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

    addTest(
        suite,
        'should throw a ImpossibleOperationError if the device is not instantiable',
        async function () {
            const deviceModels = [
                testData['concrete devices']['concrete device'].model,
                testData['device groups']['device group'].model,
            ]

            for (const deviceModel of deviceModels) {
                await assert.rejects(
                    async () => {
                        await postDevicesByDeviceId(
                            {
                                device_id: deviceModel.uuid,
                            },
                            testData.userData
                        )
                    },
                    (error) => {
                        assert(error instanceof ImpossibleOperationError)
                        assert(error.status === 400)
                        return true
                    }
                )
            }
        }
    )

    const instantiableDevices = {
        ...testData['instantiable browser devices'],
        ...testData['instantiable cloud devices'],
    }

    const instantiableDeviceNames = [
        ...instantiableBrowserDeviceNames,
        ...instantiableCloudDeviceNames,
    ]

    for (const instantiableDeviceName of instantiableDeviceNames) {
        addTest(
            suite,
            `should successfully instantiate an instantiable device (${instantiableDeviceName})`,
            async function () {
                const deviceModel = instantiableDevices[instantiableDeviceName].model

                const result = await postDevicesByDeviceId(
                    { device_id: deviceModel.uuid },
                    testData.userData
                )

                assert(result.status === 201)
                assert(result.body.deviceToken === DEVICE_TOKEN)
                assert(
                    !createDeviceAuthenticationTokenStub.args[0][0].endsWith('undefined'),
                    createDeviceAuthenticationTokenStub.args[0][0]
                )
                const instanceModel = await repositories.concreteDevice.findOneOrFail({
                    where: { uuid: result.body.instance.url.split('/').at(-1) },
                })

                assert(
                    concreteDeviceRepositoryTestSuite.validateFormat(
                        instanceModel,
                        result.body.instance
                    )
                )

                const instanceUUID = result.body.instance.url.split('/').at(-1)
                assert(instanceUUID)
                assert(!changedCallbacks.get(instanceUUID))
            }
        )
    }

    for (const [index, instantiableDeviceName] of instantiableDeviceNames.entries()) {
        addTest(
            suite,
            `should register changed-callback for created instance (${instantiableDeviceName})`,
            async function (this: Mocha.Context) {
                const deviceModel = instantiableDevices[instantiableDeviceName].model
                const changedUrl = `https://localhost/callbacks/${index}`

                const result = await postDevicesByDeviceId(
                    { device_id: deviceModel.uuid, changedUrl },
                    testData.userData
                )

                assert(result.status === 201)
                assert(result.body.deviceToken === DEVICE_TOKEN)
                const instanceModel = await repositories.concreteDevice.findOneOrFail({
                    where: { uuid: result.body.instance.url.split('/').at(-1) },
                })

                assert(
                    concreteDeviceRepositoryTestSuite.validateFormat(
                        instanceModel,
                        result.body.instance
                    )
                )

                const instanceUUID = result.body.instance.url.split('/').at(-1)
                assert(instanceUUID)

                const registeredCallbackUrls = changedCallbacks.get(instanceUUID)
                assert(registeredCallbackUrls)
                assert(registeredCallbackUrls.length === 1)
                assert(registeredCallbackUrls[0] === changedUrl)
            }
        )
    }

    return suite
}
