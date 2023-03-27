import { AppDataSource } from '../../../../src/database/dataSource'
import { InstantiableBrowserDeviceModel } from '../../../../src/database/model'
import {
    instantiableBrowserDeviceRepository,
    InstantiableBrowserDeviceRepository,
} from '../../../../src/database/repositories/device/instantiableBrowserDevice'
import {
    InstantiableBrowserDevice,
    InstantiableBrowserDeviceUpdate,
} from '../../../../src/generated/types'
import { InstantiableBrowserDeviceName } from '../../../data/devices/instantiableBrowserDevices/index.spec'
import { initTestDatabase } from '../index.spec'
import { DeviceOverviewRepositoryTestSuite } from './deviceOverview.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'

class InstantiableBrowserDeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    InstantiableBrowserDeviceName,
    InstantiableBrowserDeviceRepository
> {
    protected name = 'concrete devices' as const
    protected repository = instantiableBrowserDeviceRepository
    protected getEntityData = async () =>
        (await initTestDatabase())['instantiable browser devices']
    protected RepositoryClass = InstantiableBrowserDeviceRepository

    constructor() {
        super(AppDataSource)
    }

    validateCreate(
        model: InstantiableBrowserDeviceModel,
        data?: InstantiableBrowserDevice<'request'>
    ): boolean {
        if (!data) return true

        assert(DeviceOverviewRepositoryTestSuite.validateCreate(model, data))
        assert(this.validateWrite(model, data))

        return true
    }

    validateWrite(
        model: InstantiableBrowserDeviceModel,
        data: InstantiableBrowserDeviceUpdate<'request'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateWrite(model, data))
        if (data.codeUrl) assert(model.codeUrl === data.codeUrl)
        if (data.services)
            assert(JSON.stringify(model.services) === JSON.stringify(data.services))

        return true
    }

    validateFormat(
        model: InstantiableBrowserDeviceModel,
        data: InstantiableBrowserDevice<'response'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateFormat(model, data))
        assert(data.codeUrl === model.codeUrl)
        assert(JSON.stringify(data.services) === JSON.stringify(model.services))

        return true
    }

    compareModels(
        firstModel: InstantiableBrowserDeviceModel,
        secondModel: InstantiableBrowserDeviceModel,
        complete?: boolean
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid

        if (!complete) return sameId

        assert(DeviceOverviewRepositoryTestSuite.compareModels(firstModel, secondModel))
        assert(firstModel.codeUrl === secondModel.codeUrl)
        assert(
            JSON.stringify(firstModel.instances) === JSON.stringify(secondModel.instances)
        )
        assert(
            JSON.stringify(firstModel.services) === JSON.stringify(secondModel.services)
        )

        return true
    }

    compareFormatted(
        first: InstantiableBrowserDevice<'response'>,
        second: InstantiableBrowserDevice<'response'>
    ): boolean {
        let isEqual = true

        isEqual &&= DeviceOverviewRepositoryTestSuite.compareFormatted(first, second)
        isEqual &&= first.codeUrl === second.codeUrl
        isEqual &&= JSON.stringify(first.services) === JSON.stringify(second.services)

        return isEqual
    }

    getFindOptionsWhere(
        model?: InstantiableBrowserDeviceModel
    ): FindOptionsWhere<InstantiableBrowserDeviceModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        }
    }
}

export const instantiableBrowserDeviceRepositoryTestSuite =
    new InstantiableBrowserDeviceRepositoryTestSuite()
