import { Role } from '../../generated/types'
import { RoleModel } from '../model'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'

export class RoleRepository extends AbstractRepository<
    RoleModel,
    Role<'request'>,
    Role<'response'>
> {
    protected dependencies: Record<string, never> = {}

    constructor() {
        super('Role')
    }

    protected dependenciesMet(): boolean {
        return true
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(RoleModel)
    }

    async write(model: RoleModel, data: Partial<Role<'request'>>): Promise<void> {
        if (data.name) model.name = data.name
        if (data.description) model.description = data.description
    }

    async format(model: RoleModel): Promise<Role<'response'>> {
        return {
            name: model.name,
            description: model.description ?? undefined,
        }
    }
}
