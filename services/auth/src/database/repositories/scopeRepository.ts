import { Scope } from '../../types/types'
import { ScopeModel } from '../model'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'

export class ScopeRepository extends AbstractRepository<
    ScopeModel,
    Scope<'request'>,
    Scope<'response'>
> {
    protected dependencies: Record<string, never> = {}

    constructor() {
        super('Scope')
    }

    protected dependenciesMet(): boolean {
        return true
    }

    public initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(ScopeModel)
    }

    public async write(model: ScopeModel, data: Scope<'request'>): Promise<void> {
        model.name = data
    }

    public async format(model: ScopeModel): Promise<Scope<'response'>> {
        return model.name
    }
}
