import { AppDataSource } from '../../../../src/database/dataSource'
import { DeviceGroupModel } from '../../../../src/database/model'
import {
    deviceGroupRepository,
    DeviceGroupRepository,
} from '../../../../src/database/repositories/device/deviceGroup'
import { Device, DeviceGroup, DeviceGroupUpdate } from '../../../../src/generated/types'
import { DeviceGroupName } from '../../../data/devices/deviceGroups/index.spec'
import { prepareTestData } from '../../../data/index.spec'
import { deviceRepositoryTestSuite } from '../device.spec'
import { initTestDatabase } from '../index.spec'
import { DeviceOverviewRepositoryTestSuite } from './deviceOverview.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'

class DeviceGroupRepositoryTestSuite extends AbstractRepositoryTestSuite<
    DeviceGroupName,
    DeviceGroupRepository
> {
    protected name = 'device groups' as const
    protected repository = deviceGroupRepository
    protected testData = prepareTestData()
    protected getEntityData = async () => (await initTestDatabase())['device groups']
    protected RepositoryClass = DeviceGroupRepository

    constructor() {
        super(AppDataSource)
    }

    validateCreate(model: DeviceGroupModel, data?: DeviceGroup<'request'>): boolean {
        if (!data) return true

        assert(DeviceOverviewRepositoryTestSuite.validateCreate(model, data))
        assert(this.validateWrite(model, data))

        return true
    }

    validateWrite(model: DeviceGroupModel, data: DeviceGroupUpdate<'request'>): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateWrite(model, data))
        if (data.devices)
            assert(
                JSON.stringify(model.devices) === JSON.stringify(data.devices),
                'Contained devices differ'
            )

        return true
    }

    validateFormat(
        model: DeviceGroupModel,
        data: DeviceGroup<'response'>,
        flatten?: boolean
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateFormat(model, data))

        for (const device of data.devices ?? []) {
            if (flatten) assert(device.type !== 'group')
            const searchedDeviceModel = Object.entries(this.testData.devices).find(
                (entry) => entry[1].response.url === device.url
            )?.[1].model
            assert(searchedDeviceModel)
            assert(
                deviceRepositoryTestSuite.validateFormat(
                    searchedDeviceModel,
                    device as Device
                )
            )
        }

        return true
    }

    compareModels(
        firstModel: DeviceGroupModel,
        secondModel: DeviceGroupModel,
        complete?: boolean
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid

        if (!complete) return sameId

        assert(DeviceOverviewRepositoryTestSuite.compareModels(firstModel, secondModel))
        assert(JSON.stringify(firstModel.devices) === JSON.stringify(secondModel.devices))

        return true
    }

    compareFormatted(
        first: DeviceGroup<'response'>,
        second: DeviceGroup<'response'>
    ): boolean {
        let isEqual = true

        isEqual &&= DeviceOverviewRepositoryTestSuite.compareFormatted(first, second)
        isEqual &&= JSON.stringify(first.devices) === JSON.stringify(second.devices)

        return isEqual
    }

    getFindOptionsWhere(model?: DeviceGroupModel): FindOptionsWhere<DeviceGroupModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        }
    }
}

export const deviceGroupRepositoryTestSuite = new DeviceGroupRepositoryTestSuite()