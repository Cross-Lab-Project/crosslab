import { deviceRepository } from '../../../../src/database/repositories/device'
import {
    ConcreteDeviceUpdate,
    DeviceGroupUpdate,
    DeviceUpdate,
    InstantiableBrowserDeviceUpdate,
    InstantiableCloudDeviceUpdate,
    ServiceDescription,
} from '../../../../src/generated/types'
import { changedCallbacks } from '../../../../src/methods/callbacks'
import { patchDevicesByDeviceId } from '../../../../src/operations/devices'
import { concreteDeviceNames } from '../../../data/devices/concreteDevices/index.spec'
import { deviceGroupNames } from '../../../data/devices/deviceGroups/index.spec'
import { deviceNames } from '../../../data/devices/index.spec'
import { instantiableBrowserDeviceNames } from '../../../data/devices/instantiableBrowserDevices/index.spec'
import { instantiableCloudDeviceNames } from '../../../data/devices/instantiableCloudDevices/index.spec'
import { TestData } from '../../../data/index.spec'
import { deviceRepositoryTestSuite } from '../../../database/repositories/device.spec'
import { addTest } from '../../index.spec'
import { InvalidValueError, MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('PATCH /devices/{device_id}', context)

    suite.afterEach(function () {
        changedCallbacks.clear()
    })

    suite.addSuite(buildDeviceSuite('cloud instantiable', testData))
    suite.addSuite(buildDeviceSuite('device', testData))
    suite.addSuite(buildDeviceSuite('edge instantiable', testData))
    suite.addSuite(buildDeviceSuite('group', testData))

    addTest(
        suite,
        'should throw a MissingEntityError if device is not found',
        async function () {
            await assert.rejects(
                async () => {
                    await patchDevicesByDeviceId(
                        { device_id: 'non-existent' },
                        { type: 'device' },
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
        'should register a device-changed callback url for the device if provided',
        async function () {
            for (const deviceName of deviceNames) {
                const device = testData.devices[deviceName]
                const changedUrl = 'http://localhost/callbacks'

                const result = await patchDevicesByDeviceId(
                    { device_id: device.model.uuid, changedUrl },
                    undefined,
                    testData.userData
                )

                assert(result.status === 200)
                assert(
                    deviceRepositoryTestSuite.validateWrite(device.model, device.request)
                )
                const changedCallbackUrls = changedCallbacks.get(device.model.uuid)
                assert(changedCallbackUrls)
                assert(changedCallbackUrls.length === 1)
                assert(changedCallbackUrls[0] === changedUrl)
            }
        }
    )

    return suite
}

function getDeviceData(
    type: 'device' | 'group' | 'edge instantiable' | 'cloud instantiable'
): {
    body: DeviceUpdate
    names:
        | typeof instantiableBrowserDeviceNames
        | typeof instantiableCloudDeviceNames
        | typeof concreteDeviceNames
        | typeof deviceGroupNames
} {
    const updatedName = 'new name'
    const updatedDescription = 'new description'
    const updatedServices: ServiceDescription[] = [
        {
            serviceDirection: 'consumer',
            serviceId: 'new consumer service',
            serviceType: 'new consumer service',
        },
        {
            serviceDirection: 'producer',
            serviceId: 'new producer service',
            serviceType: 'new producer service',
        },
        {
            serviceDirection: 'prosumer',
            serviceId: 'new prosumer service',
            serviceType: 'new prosumer service',
        },
    ]

    const concreteDeviceBody: ConcreteDeviceUpdate = {
        type: 'device',
        description: updatedDescription,
        experiment: 'http://localhost/experiments/new',
        name: updatedName,
        services: updatedServices,
    }

    const deviceGroupBody: DeviceGroupUpdate = {
        type: 'group',
        description: updatedDescription,
        devices: [
            { url: 'http://localhost/devices/new1' },
            { url: 'http://localhost/devices/new2' },
            { url: 'http://localhost/devices/new3' },
        ],
        name: updatedName,
    }

    const instantiableBrowserDeviceBody: InstantiableBrowserDeviceUpdate = {
        type: 'edge instantiable',
        codeUrl: 'http://localhost/code/new',
        description: updatedDescription,
        name: updatedName,
        services: updatedServices,
    }

    const instantiableCloudDeviceBody: InstantiableCloudDeviceUpdate = {
        type: 'cloud instantiable',
        description: updatedDescription,
        instantiateUrl: 'http://localhost/instantiate/new',
        name: updatedName,
        services: updatedServices,
    }

    switch (type) {
        case 'cloud instantiable':
            return {
                body: instantiableCloudDeviceBody,
                names: instantiableCloudDeviceNames,
            }
        case 'device':
            return {
                body: concreteDeviceBody,
                names: concreteDeviceNames,
            }
        case 'edge instantiable':
            return {
                body: instantiableBrowserDeviceBody,
                names: instantiableBrowserDeviceNames,
            }
        case 'group':
            return {
                body: deviceGroupBody,
                names: deviceGroupNames,
            }
    }
}

function buildDeviceSuite(
    type: 'device' | 'group' | 'edge instantiable' | 'cloud instantiable',
    testData: TestData
): Mocha.Suite {
    const deviceSuite = new Mocha.Suite(`device type '${type}'`)

    addTest(deviceSuite, `should update a device of type '${type}'`, async function () {
        const deviceData = getDeviceData(type)
        for (const deviceName of deviceData.names) {
            const device = testData['devices'][deviceName]
            const result = await patchDevicesByDeviceId(
                { device_id: device.model.uuid },
                deviceData.body,
                testData.userData
            )

            assert(result.status === 200)
            const updatedDeviceModel = await deviceRepository.findOneOrFail({
                where: {
                    uuid: device.model.uuid,
                },
            })
            assert(
                deviceRepositoryTestSuite.validateWrite(
                    updatedDeviceModel,
                    deviceData.body
                )
            )
            assert(changedCallbacks.get(device.model.uuid) === undefined)
        }
    })

    addTest(
        deviceSuite,
        `should throw an error if the type of the update is not '${type}'`,
        async function () {
            const deviceData = getDeviceData(type)
            for (const deviceName of deviceData.names) {
                const device = testData['devices'][deviceName]
                for (const deviceType of [
                    'device',
                    'group',
                    'edge instantiable',
                    'cloud instantiable',
                ] as const) {
                    if (deviceType === type) continue
                    await assert.rejects(
                        async () => {
                            await patchDevicesByDeviceId(
                                { device_id: device.model.uuid },
                                { type: deviceType },
                                testData.userData
                            )
                        },
                        (error) => {
                            assert(error instanceof InvalidValueError)
                            assert(error.status === 400)
                            return true
                        }
                    )
                }
            }
        }
    )

    return deviceSuite
}
