import { PeerconnectionModel } from '../model'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'

export class PeerconnectionRepository extends AbstractRepository<
    PeerconnectionModel,
    string,
    string
> {
    protected dependencies: Record<string, never> = {}

    constructor() {
        super('Peerconnection')
    }

    protected dependenciesMet(): boolean {
        return true
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(PeerconnectionModel)
    }

    async write(model: PeerconnectionModel, data: string): Promise<void> {
        model.url = data
    }

    async format(model: PeerconnectionModel): Promise<string> {
        return model.url
    }
}
