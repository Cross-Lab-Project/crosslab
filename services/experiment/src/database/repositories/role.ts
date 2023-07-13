import { Role } from '../../generated/types'
import { RoleModel } from '../model'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class RoleRepository extends AbstractRepository<
    RoleModel,
    Role<'request'>,
    Role<'response'>
> {
    constructor() {
        super('Role')
    }

    initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(RoleModel)
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

export const roleRepository = new RoleRepository()
