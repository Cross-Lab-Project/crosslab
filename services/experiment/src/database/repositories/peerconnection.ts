import { PeerconnectionModel } from '../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class PeerconnectionRepository extends AbstractRepository<
    PeerconnectionModel,
    string,
    string
> {
    constructor() {
        super('Peerconnection')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(PeerconnectionModel)
    }

    async write(model: PeerconnectionModel, data: string): Promise<void> {
        model.url = data
    }

    async format(model: PeerconnectionModel): Promise<string> {
        return model.url
    }
}

export const peerconnectionRepository = new PeerconnectionRepository()
