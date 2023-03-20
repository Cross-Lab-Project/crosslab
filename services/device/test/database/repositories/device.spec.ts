import { AppDataSource } from '../../../src/database/dataSource'
import { DeviceModel } from '../../../src/database/model'
import {
    deviceRepository,
    DeviceRepository,
} from '../../../src/database/repositories/device'
import { Device, DeviceInit } from '../../../src/generated/types'
import { DeviceName } from '../../data/device.spec'
import { initTestDatabase } from './index.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'

class DeviceRepositoryTestSuite extends AbstractRepositoryTestSuite<
    DeviceName,
    DeviceRepository
> {
    protected name = 'devices' as const
    protected repository = deviceRepository
    protected getEntityData = async () => (await initTestDatabase()).devices
    protected RepositoryClass = DeviceRepository

    constructor() {
        super(AppDataSource)
    }

    validateCreate(
        model: DeviceModel,
        data?: DeviceInit<'request'> | undefined
    ): boolean {
        if (!data) {
            return true
        }

        if (data?.name) assert(model.name === data.name)
        if (data?.description) assert(model.description === data.description)

        switch (model.type) {
            case 'cloud instantiable':
                assert(model.type === data.type)
                if (data.instantiateUrl)
                    assert(model.instantiateUrl === data.instantiateUrl)
                if (data.services) assert(model.services === data.services)
                break
            case 'device':
                assert(model.type === data.type)
                if (data.services) assert(model.services === data.services)
                break
            case 'edge instantiable':
                assert(model.type === data.type)
                if (data.codeUrl) assert(model.codeUrl === data.codeUrl)
                if (data.services) assert(model.services === data.services)
                break
            case 'group':
                assert(model.type === data.type)
                if (data.devices) {
                    for (const device of data.devices) {
                        assert(model.devices?.find((d) => d.url === device.url))
                    }
                    for (const device of model.devices ?? []) {
                        assert(data.devices.find((d) => d.url === device.url))
                    }
                }
                break
        }

        return true
    }
    validateWrite(model: DeviceModel, data: Device<'request'>): boolean {
        throw new Error('Method not implemented.')
    }
    validateFormat(model: DeviceModel, data: Device<'response'>): boolean {
        throw new Error('Method not implemented.')
    }
    compareModels(
        firstModel: DeviceModel,
        secondModel: DeviceModel,
        complete?: boolean | undefined
    ): boolean {
        throw new Error('Method not implemented.')
    }
    compareFormatted(first: Device<'response'>, second: Device<'response'>): boolean {
        throw new Error('Method not implemented.')
    }
    getFindOptionsWhere(model?: DeviceModel | undefined): FindOptionsWhere<DeviceModel> {
        throw new Error('Method not implemented.')
    }
}

export const deviceRepositoryTestSuite = new DeviceRepositoryTestSuite()
