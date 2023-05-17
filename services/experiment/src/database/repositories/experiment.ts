import { Experiment, ExperimentOverview } from '../../generated/types'
import { experimentUrlFromId } from '../../methods/url'
import { ExperimentModel } from '../model'
import { deviceRepository } from './device'
import { peerconnectionRepository } from './peerconnection'
import { roleRepository } from './role'
import { serviceConfigurationRepository } from './serviceConfiguration'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class ExperimentRepository extends AbstractRepository<
    ExperimentModel,
    Experiment<'request'>,
    Experiment<'response'>
> {
    constructor() {
        super('Experiment')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(ExperimentModel)
    }

    async create(data?: Experiment<'request'>): Promise<ExperimentModel> {
        const model = await super.create(data)
        model.status = 'created'
        return model
    }

    async write(
        model: ExperimentModel,
        data: Partial<Experiment<'request'>>
    ): Promise<void> {
        if (data.status) model.status = data.status
        if (data.bookingTime) {
            if (data.bookingTime.startTime)
                model.bookingStart = data.bookingTime.startTime
            if (data.bookingTime.endTime) model.bookingEnd = data.bookingTime.endTime
        } else {
            const HOUR = 60 * 60 * 1000
            const startTime = Date.now()
            const endTime = startTime + HOUR
            model.bookingStart ??= new Date(startTime).toISOString()
            model.bookingEnd ??= new Date(endTime).toISOString()
        }
        if (data.devices) {
            for (const device of model.devices ?? []) {
                await deviceRepository.remove(device)
            }
            model.devices = []
            for (const device of data.devices) {
                const deviceModel = await deviceRepository.create(device)
                model.devices.push(deviceModel)
            }
        }
        if (data.roles) {
            for (const role of model.roles ?? []) {
                await roleRepository.remove(role)
            }
            model.roles = []
            for (const role of data.roles) {
                const roleModel = await roleRepository.create(role)
                model.roles.push(roleModel)
            }
        }
        if (data.serviceConfigurations) {
            for (const serviceConfiguration of model.serviceConfigurations ?? []) {
                await serviceConfigurationRepository.remove(serviceConfiguration)
            }
            model.serviceConfigurations = []
            for (const serviceConfiguration of data.serviceConfigurations) {
                const serviceConfigurationModel =
                    await serviceConfigurationRepository.create(serviceConfiguration)
                model.serviceConfigurations.push(serviceConfigurationModel)
            }
        }
    }

    async format(model: ExperimentModel): Promise<Experiment<'response'>> {
        return {
            url: experimentUrlFromId(model.uuid),
            bookingTime: {
                startTime: model.bookingStart,
                endTime: model.bookingEnd,
            },
            status: model.status,
            devices: await Promise.all(
                model.devices?.map((device) => deviceRepository.format(device)) ?? []
            ),
            roles: await Promise.all(
                model.roles?.map((role) => roleRepository.format(role)) ?? []
            ),
            connections: await Promise.all(
                model.connections?.map((connection) =>
                    peerconnectionRepository.format(connection)
                ) ?? []
            ),
        }
    }

    async remove(model: ExperimentModel): Promise<void> {
        const removePromises: Promise<void>[] = []

        if (model.connections)
            removePromises.push(
                ...model.connections.map((connection) =>
                    peerconnectionRepository.remove(connection)
                )
            )

        if (model.devices)
            removePromises.push(
                ...model.devices.map((device) => deviceRepository.remove(device))
            )

        if (model.roles)
            removePromises.push(...model.roles.map((role) => roleRepository.remove(role)))

        if (model.serviceConfigurations)
            removePromises.push(
                ...model.serviceConfigurations.map((serviceConfiguration) =>
                    serviceConfigurationRepository.remove(serviceConfiguration)
                )
            )

        await Promise.all(removePromises)

        await super.remove(model)
    }

    async formatOverview(
        model: ExperimentModel
    ): Promise<ExperimentOverview<'response'>> {
        return {
            url: experimentUrlFromId(model.uuid),
            status: model.status,
        }
    }

    async softRemove(model: ExperimentModel): Promise<void> {
        if (!this.repository) this.throwUninitializedRepositoryError()
        await this.repository.softRemove(model)
    }
}

export const experimentRepository = new ExperimentRepository()
