import { Scope } from '../../types/types'
import { ScopeModel } from '../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class ScopeRepository extends AbstractRepository<
    ScopeModel,
    Scope<'request'>,
    Scope<'response'>
> {
    constructor() {
        super('Scope')
    }

    public initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(ScopeModel)
    }

    public async write(model: ScopeModel, data: Scope<'request'>): Promise<void> {
        model.name = data
    }

    public async format(model: ScopeModel): Promise<Scope<'response'>> {
        return model.name
    }
}

export const scopeRepository: ScopeRepository = new ScopeRepository()
