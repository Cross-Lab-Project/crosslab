import { ActiveKey } from '../../types/types'
import { ActiveKeyModel } from '../model'
import { keyRepository } from './keyRepository'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'
import { FindOptionsRelations } from 'typeorm'

export class ActiveKeyRepository extends AbstractRepository<
    ActiveKeyModel,
    ActiveKey<'request'>,
    ActiveKey<'response'>
> {
    constructor() {
        super('Active Key')
    }

    public initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(ActiveKeyModel)
    }

    public async write(model: ActiveKeyModel, data: ActiveKey<'request'>): Promise<void> {
        model.use = data.use
        model.key = await keyRepository.findOneOrFail({
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

export const activeKeyRepository: ActiveKeyRepository = new ActiveKeyRepository()
