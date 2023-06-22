import { Key } from '../../types/types'
import { KeyModel } from '../model'
import { ActiveKeyRepository } from './activeKeyRepository'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'

export class KeyRepository extends AbstractRepository<
    KeyModel,
    Required<Key>,
    Key<'response'>,
    { activeKey: ActiveKeyRepository }
> {
    protected dependencies: { activeKey?: ActiveKeyRepository } = {}

    constructor() {
        super('Key')
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.activeKey) return false

        return true
    }

    public initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(KeyModel)
    }

    public async write(model: KeyModel, data: Required<Key>): Promise<void> {
        model.alg = data.alg
        model.private_key = data.private_key
        model.public_key = data.public_key
        model.use = data.use
    }

    public async format(_model: KeyModel): Promise<Key<'response'>> {
        return undefined
    }

    public async remove(model: KeyModel): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()

        const activeKeyModels = await this.dependencies.activeKey.find({
            where: {
                key: {
                    uuid: model.uuid,
                },
            },
        })

        for (const activeKeyModel of activeKeyModels) {
            await this.dependencies.activeKey.remove(activeKeyModel)
        }

        await this.repository.remove(model)
    }
}
