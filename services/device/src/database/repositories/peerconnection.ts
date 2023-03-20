import { Peerconnection } from '../../generated/types'
import { peerconnectionUrlFromId } from '../../methods/utils'
import { PeerconnectionModel } from '../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
    InvalidValueError,
} from '@crosslab/service-common'

export class PeerconnectionRepository extends AbstractRepository<
    PeerconnectionModel,
    Peerconnection<'request'>,
    Peerconnection<'response'>
> {
    constructor() {
        super('Peerconnection')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(PeerconnectionModel)
    }

    async create(data?: Peerconnection<'request'>): Promise<PeerconnectionModel> {
        const model = await super.create(data)
        model.status = 'waiting-for-devices'

        return model
    }

    async write(
        model: PeerconnectionModel,
        data: Peerconnection<'request'>
    ): Promise<void> {
        if (data.type) model.type = data.type
        if (data.status) model.status = data.status

        if (data.devices && data.devices.length !== 2) {
            throw new InvalidValueError(
                `Peerconnections need exactly 2 devices, received ${data.devices?.length}`
            )
        }

        if (data.devices) {
            const deviceA = data.devices[0]
            const deviceB = data.devices[1]

            if (!deviceA.url || !deviceB.url) {
                throw new InvalidValueError(
                    'One of the provided devices does not have a url'
                )
            }

            model.deviceA = deviceA
            model.deviceB = deviceB
        }
    }

    async format(model: PeerconnectionModel): Promise<Peerconnection<'response'>> {
        return {
            url: peerconnectionUrlFromId(model.uuid),
            type: model.type,
            status: model.status,
            devices: [{ ...model.deviceA }, { ...model.deviceB }],
        }
    }

    formatOverview(model: PeerconnectionModel): Peerconnection<'response'> {
        return {
            url: peerconnectionUrlFromId(model.uuid),
            type: model.type,
            status: model.status,
            devices: [{ url: model.deviceA.url }, { url: model.deviceB.url }],
        }
    }
}

export const peerconnectionRepository = new PeerconnectionRepository()
