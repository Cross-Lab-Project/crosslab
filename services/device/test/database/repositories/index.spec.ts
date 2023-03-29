import { AppDataSource } from '../../../src/database/dataSource'
import {
    DeviceOverviewModel,
    ConcreteDeviceModel,
    InstantiableDeviceOverviewModel,
    InstantiableCloudDeviceModel,
    InstantiableBrowserDeviceModel,
    DeviceGroupModel,
    PeerconnectionModel,
} from '../../../src/database/model'
import { deviceRepository } from '../../../src/database/repositories/device'
import { peerconnectionRepository } from '../../../src/database/repositories/peerconnection'
import { deviceNames } from '../../data/devices/index.spec'
import { prepareTestData, TestData } from '../../data/index.spec'
import { peerconnectionNames } from '../../data/peerconnections/index.spec'
import { deviceRepositoryTestSuite } from './device.spec'
import { concreteDeviceRepositoryTestSuite } from './device/concreteDevice.spec'
import { deviceGroupRepositoryTestSuite } from './device/deviceGroup.spec'
import { instantiableBrowserDeviceRepositoryTestSuite } from './device/instantiableBrowserDevice.spec'
import { instantiableCloudDeviceRepositoryTestSuite } from './device/instantiableCloudDevice.spec'
import { peerconnectionRepositoryTestSuite } from './peerconnection.spec'
import { DataSourceOptions } from 'typeorm'

const repositoryTestSuites = [
    concreteDeviceRepositoryTestSuite,
    deviceGroupRepositoryTestSuite,
    instantiableBrowserDeviceRepositoryTestSuite,
    instantiableCloudDeviceRepositoryTestSuite,
    deviceRepositoryTestSuite,
    peerconnectionRepositoryTestSuite,
]

export default () =>
    describe('Repositories', function () {
        let suite: Mocha.Suite = this

        it('should setup the repository tests', async function () {
            this.timeout(0)

            for (const repositoryTestSuite of repositoryTestSuites) {
                await repositoryTestSuite.initialize()
                suite.addSuite(repositoryTestSuite.execute())
            }
        })
    })

export async function initTestDatabase(): Promise<TestData> {
    const dataSourceConfig: DataSourceOptions = {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        dropSchema: true,
        entities: [
            DeviceOverviewModel,
            ConcreteDeviceModel,
            InstantiableDeviceOverviewModel,
            InstantiableCloudDeviceModel,
            InstantiableBrowserDeviceModel,
            DeviceGroupModel,
            PeerconnectionModel,
        ],
    }

    const testData = prepareTestData()
    await AppDataSource.initialize(dataSourceConfig)

    for (const deviceName of deviceNames) {
        await deviceRepository.save(testData.devices[deviceName].model)
    }

    for (const peerconnectionName of peerconnectionNames) {
        await peerconnectionRepository.save(
            testData.peerconnections[peerconnectionName].model
        )
    }

    return testData
}
