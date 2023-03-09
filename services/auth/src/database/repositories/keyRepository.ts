import { Key } from '../../types/types'
import { KeyModel } from '../model'
import { activeKeyRepository } from './activeKeyRepository'
import {
    AbstractApplicationDataSource,
    AbstractRepository,
} from '@crosslab/service-common'

export class KeyRepository extends AbstractRepository<
    KeyModel,
    Required<Key>,
    Key<'response'>
> {
    constructor() {
        super('Key')
    }

    public initialize(AppDataSource: AbstractApplicationDataSource): void {
        this.repository = AppDataSource.getRepository(KeyModel)
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
        if (!this.repository) this.throwUninitializedRepositoryError()

        const activeKeyModels = await activeKeyRepository.find({
            where: {
                key: {
                    uuid: model.uuid,
                },
            },
        })

        for (const activeKeyModel of activeKeyModels) {
            await activeKeyRepository.remove(activeKeyModel)
        }

        await this.repository.remove(model)
    }
}

export const keyRepository: KeyRepository = new KeyRepository()
