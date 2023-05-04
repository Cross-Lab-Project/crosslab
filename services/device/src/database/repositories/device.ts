import { Device, DeviceUpdate } from '../../generated/types'
import { DeviceModel } from '../model'
import { concreteDeviceRepository } from './device/concreteDevice'
import { deviceGroupRepository } from './device/deviceGroup'
import { deviceOverviewRepository } from './device/deviceOverview'
import { instantiableBrowserDeviceRepository } from './device/instantiableBrowserDevice'
import { instantiableCloudDeviceRepository } from './device/instantiableCloudDevice'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
    InvalidValueError,
} from '@crosslab/service-common'
import { FindManyOptions, FindOneOptions, In } from 'typeorm'

export class DeviceRepository extends AbstractRepository<
    DeviceModel,
    Device<'request'>,
    Device<'response'>
> {
    private isInitialized: boolean = false

    constructor() {
        super('Device')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        deviceOverviewRepository.initialize(AppDataSource)
        concreteDeviceRepository.initialize(AppDataSource)
        deviceGroupRepository.initialize(AppDataSource)
        instantiableBrowserDeviceRepository.initialize(AppDataSource)
        instantiableCloudDeviceRepository.initialize(AppDataSource)

        this.isInitialized = true
    }

    async create(data: Device<'request'>): Promise<DeviceModel> {
        if (!this.isInitialized) this.throwUninitializedRepositoryError()

        switch (data.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.create(data)
            case 'device':
                return await concreteDeviceRepository.create(data)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.create(data)
            case 'group':
                return await deviceGroupRepository.create(data)
        }
    }

    async write(model: DeviceModel, data: DeviceUpdate<'request'>): Promise<void> {
        switch (model.type) {
            case 'cloud instantiable':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400
                    )
                return await instantiableCloudDeviceRepository.write(model, data)
            case 'device':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400
                    )
                return await concreteDeviceRepository.write(model, data)
            case 'edge instantiable':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400
                    )
                return await instantiableBrowserDeviceRepository.write(model, data)
            case 'group':
                if (data.type !== model.type)
                    throw new InvalidValueError(
                        `Model of type ${model.type} cannot be updated with data of type ${data.type}`,
                        400
                    )
                return await deviceGroupRepository.write(model, data)
        }
    }

    async format(
        model: DeviceModel,
        options?: { flatGroup?: boolean }
    ): Promise<Device<'response'>> {
        switch (model.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.format(model)
            case 'device':
                return await concreteDeviceRepository.format(model)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.format(model)
            case 'group':
                return await deviceGroupRepository.format(model, options?.flatGroup)
        }
    }

    async save(model: DeviceModel): Promise<DeviceModel> {
        if (!this.isInitialized) this.throwUninitializedRepositoryError()

        switch (model.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.save(model)
            case 'device':
                return await concreteDeviceRepository.save(model)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.save(model)
            case 'group':
                return await deviceGroupRepository.save(model)
        }
    }

    async find(
        options?: FindManyOptions<DeviceModel> | undefined
    ): Promise<DeviceModel[]> {
        if (!this.isInitialized) this.throwUninitializedRepositoryError()

        const foundDevices = []
        const deviceOverviews = await deviceOverviewRepository.find(options)

        const deviceTypes = [
            'device',
            'group',
            'edge instantiable',
            'cloud instantiable',
        ] as const

        const repositoryMapping = {
            'device': concreteDeviceRepository,
            'group': deviceGroupRepository,
            'edge instantiable': instantiableBrowserDeviceRepository,
            'cloud instantiable': instantiableCloudDeviceRepository,
        } as const

        for (const type of deviceTypes) {
            const devices = deviceOverviews.filter((device) => device.type === type)

            if (devices.length > 0) {
                foundDevices.push(
                    ...(await repositoryMapping[type].find({
                        where: {
                            uuid: In(
                                devices.map((concreteDevice) => concreteDevice.uuid)
                            ),
                        },
                    }))
                )
            }
        }

        return foundDevices
    }

    async findOne(options: FindOneOptions<DeviceModel>): Promise<DeviceModel | null> {
        if (!this.isInitialized) this.throwUninitializedRepositoryError()

        const deviceOverview = await deviceOverviewRepository.findOne(options)

        if (!deviceOverview) return null

        switch (deviceOverview.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.findOne({
                    where: { uuid: deviceOverview.uuid },
                })
            case 'device':
                return await concreteDeviceRepository.findOne({
                    where: { uuid: deviceOverview.uuid },
                })
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.findOne({
                    where: { uuid: deviceOverview.uuid },
                })
            case 'group':
                return await deviceGroupRepository.findOne({
                    where: { uuid: deviceOverview.uuid },
                })
        }
    }

    async findOneOrFail(options: FindOneOptions<DeviceModel>): Promise<DeviceModel> {
        if (!this.isInitialized) this.throwUninitializedRepositoryError()

        const deviceOverview = await deviceOverviewRepository.findOneOrFail(options)

        switch (deviceOverview.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                })
            case 'device':
                return await concreteDeviceRepository.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                })
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                })
            case 'group':
                return await deviceGroupRepository.findOneOrFail({
                    where: { uuid: deviceOverview.uuid },
                })
        }
    }

    async remove(model: DeviceModel): Promise<void> {
        if (!this.isInitialized) this.throwUninitializedRepositoryError()

        switch (model.type) {
            case 'cloud instantiable':
                return await instantiableCloudDeviceRepository.remove(model)
            case 'device':
                return await concreteDeviceRepository.remove(model)
            case 'edge instantiable':
                return await instantiableBrowserDeviceRepository.remove(model)
            case 'group':
                return await deviceGroupRepository.remove(model)
        }
    }
}

export const deviceRepository = new DeviceRepository()
