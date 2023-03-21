import { AppDataSource } from '../../../../src/database/dataSource'
import { InstantiableCloudDeviceModel } from '../../../../src/database/model'
import {
    instantiableCloudDeviceRepository,
    InstantiableCloudDeviceRepository,
} from '../../../../src/database/repositories/device/instantiableCloudDevice'
import {
    InstantiableCloudDevice,
    InstantiableCloudDeviceInit,
    InstantiableCloudDeviceUpdate,
} from '../../../../src/generated/types'
import { InstantiableCloudDeviceName } from '../../../data/devices/instantiableCloudDevices/index.spec'
import { initTestDatabase } from '../index.spec'
import { DeviceOverviewRepositoryTestSuite } from './deviceOverview.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'

class InstantiableCloudDeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    InstantiableCloudDeviceName,
    InstantiableCloudDeviceRepository
> {
    protected name = 'concrete devices' as const
    protected repository = instantiableCloudDeviceRepository
    protected getEntityData = async () =>
        (await initTestDatabase())['instantiable cloud devices']
    protected RepositoryClass = InstantiableCloudDeviceRepository

    constructor() {
        super(AppDataSource)
    }

    validateCreate(
        model: InstantiableCloudDeviceModel,
        data?: InstantiableCloudDeviceInit<'request'>
    ): boolean {
        if (!data) return true

        assert(DeviceOverviewRepositoryTestSuite.validateCreate(model, data))
        assert(this.validateWrite(model, data))

        return true
    }

    validateWrite(
        model: InstantiableCloudDeviceModel,
        data: InstantiableCloudDeviceUpdate<'request'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateWrite(model, data))
        if (data.codeUrl) assert(model.instantiateUrl === data.codeUrl)
        if (data.services)
            assert(JSON.stringify(model.services) === JSON.stringify(data.services))

        return true
    }

    validateFormat(
        model: InstantiableCloudDeviceModel,
        data: InstantiableCloudDevice<'response'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateFormat(model, data))
        assert(data.instantiateUrl === model.instantiateUrl)
        assert(JSON.stringify(data.services) === JSON.stringify(model.services))

        return true
    }

    compareModels(
        firstModel: InstantiableCloudDeviceModel,
        secondModel: InstantiableCloudDeviceModel,
        complete?: boolean
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid

        if (!complete) return sameId

        assert(DeviceOverviewRepositoryTestSuite.compareModels(firstModel, secondModel))
        assert(firstModel.instantiateUrl === secondModel.instantiateUrl)
        assert(
            JSON.stringify(firstModel.instances) === JSON.stringify(secondModel.instances)
        )
        assert(
            JSON.stringify(firstModel.services) === JSON.stringify(secondModel.services)
        )

        return true
    }

    compareFormatted(
        first: InstantiableCloudDevice<'response'>,
        second: InstantiableCloudDevice<'response'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.compareFormatted(first, second))
        assert(first.instantiateUrl === second.instantiateUrl)
        assert(JSON.stringify(first.services) === JSON.stringify(second.services))

        return true
    }

    getFindOptionsWhere(
        model?: InstantiableCloudDeviceModel
    ): FindOptionsWhere<InstantiableCloudDeviceModel> {
        return model
            ? {
                  uuid: model?.uuid,
              }
            : {
                  uuid: '',
              }
    }
}

export const instantiableCloudDeviceRepositoryTestSuite =
    new InstantiableCloudDeviceRepositoryTestSuite()
