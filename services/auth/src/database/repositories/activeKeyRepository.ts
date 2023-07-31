import { ActiveKey } from '../../types/types'
import { ActiveKeyModel } from '../model'
import { KeyRepository } from './keyRepository'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager, FindOptionsRelations } from 'typeorm'

export class ActiveKeyRepository extends AbstractRepository<
    ActiveKeyModel,
    ActiveKey<'request'>,
    ActiveKey<'response'>,
    { key: KeyRepository }
> {
    protected dependencies: { key?: KeyRepository } = {}

    constructor() {
        super('Active Key')
    }

    protected dependenciesMet(): boolean {
        if (!this.dependencies.key) return false

        return true
    }

    public initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(ActiveKeyModel)
    }

    public async write(model: ActiveKeyModel, data: ActiveKey<'request'>): Promise<void> {
        if (!this.isInitialized()) this.throwUninitializedRepositoryError()
        model.use = data.use
        model.key = await this.dependencies.key.findOneOrFail({
            where: {
                uuid: data.key,
            },
        })
    }

    public async format(_model: ActiveKeyModel): Promise<ActiveKey<'response'>> {
        return undefined
    }

    protected getDefaultFindOptionsRelations():
        | FindOptionsRelations<ActiveKeyModel>
        | undefined {
        return {
            key: true,
        }
    }
}
