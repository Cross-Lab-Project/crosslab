import { AbstractRepository } from './abstractRepository'
import { ActiveKey } from '../../types/types'
import { ActiveKeyModel } from '../model'
import { keyRepository } from './keyRepository'
import { AppDataSource } from '../dataSource'
import { FindOptionsRelations } from 'typeorm'

export class ActiveKeyRepository extends AbstractRepository<ActiveKeyModel> {
    constructor() {
        super(ActiveKeyModel)
    }

    public initialize(): void {
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
