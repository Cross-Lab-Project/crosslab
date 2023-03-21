import { AppDataSource } from '../../../../src/database/dataSource'
import { ConcreteDeviceModel } from '../../../../src/database/model'
import {
    concreteDeviceRepository,
    ConcreteDeviceRepository,
} from '../../../../src/database/repositories/device/concreteDevice'
import {
    ConcreteDevice,
    ConcreteDeviceInit,
    ConcreteDeviceUpdate,
} from '../../../../src/generated/types'
import { ConcreteDeviceName } from '../../../data/devices/concreteDevices/index.spec'
import { initTestDatabase } from '../index.spec'
import { DeviceOverviewRepositoryTestSuite } from './deviceOverview.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'

class ConcreteDeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    ConcreteDeviceName,
    ConcreteDeviceRepository
> {
    protected name = 'concrete devices' as const
    protected repository = concreteDeviceRepository
    protected getEntityData = async () => (await initTestDatabase())['concrete devices']
    protected RepositoryClass = ConcreteDeviceRepository

    constructor() {
        super(AppDataSource)
    }

    validateCreate(
        model: ConcreteDeviceModel,
        data?: ConcreteDeviceInit<'request'>
    ): boolean {
        if (!data) return true

        assert(DeviceOverviewRepositoryTestSuite.validateCreate(model, data))
        assert(this.validateWrite(model, data))

        return true
    }

    validateWrite(
        model: ConcreteDeviceModel,
        data: ConcreteDeviceUpdate<'request'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateWrite(model, data))
        if (data.experiment) assert(model.experiment === data.experiment)
        if (data.services)
            assert(JSON.stringify(model.services) === JSON.stringify(data.services))

        return true
    }

    validateFormat(
        model: ConcreteDeviceModel,
        data: ConcreteDevice<'response'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.validateFormat(model, data))
        assert(
            JSON.stringify(data.announcedAvailability) ===
                JSON.stringify(model.announcedAvailability)
        )
        assert(data.connected === model.connected)
        assert(data.experiment === model.experiment)
        assert(JSON.stringify(data.services) === JSON.stringify(model.services))

        return true
    }

    compareModels(
        firstModel: ConcreteDeviceModel,
        secondModel: ConcreteDeviceModel,
        complete?: boolean
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid

        if (!complete) return sameId

        assert(DeviceOverviewRepositoryTestSuite.compareModels(firstModel, secondModel))
        assert(
            JSON.stringify(firstModel.announcedAvailability) ===
                JSON.stringify(secondModel.announcedAvailability)
        )
        assert(
            JSON.stringify(firstModel.availabilityRules) ===
                JSON.stringify(secondModel.availabilityRules)
        )
        assert(firstModel.connected === secondModel.connected)
        assert(firstModel.experiment === secondModel.experiment)
        assert(firstModel.instanceOf?.uuid === secondModel.instanceOf?.uuid)
        assert(
            JSON.stringify(firstModel.services) === JSON.stringify(secondModel.services)
        )
        assert(firstModel.token === secondModel.token)

        return true
    }

    compareFormatted(
        first: ConcreteDevice<'response'>,
        second: ConcreteDevice<'response'>
    ): boolean {
        assert(DeviceOverviewRepositoryTestSuite.compareFormatted(first, second))
        assert(
            JSON.stringify(first.announcedAvailability) ===
                JSON.stringify(second.announcedAvailability)
        )
        assert(first.connected === second.connected)
        assert(first.experiment === second.experiment)
        assert(JSON.stringify(first.services) === JSON.stringify(second.services))

        return true
    }

    getFindOptionsWhere(
        model?: ConcreteDeviceModel
    ): FindOptionsWhere<ConcreteDeviceModel> {
        return model
            ? {
                  uuid: model?.uuid,
              }
            : {
                  uuid: '',
              }
    }
}

export const concreteDeviceRepositoryTestSuite = new ConcreteDeviceRepositoryTestSuite()
