import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'
import { ActiveKeyModel } from '../../../src/database/model'
import { ActiveKey } from '../../../src/types/types'
import { AbstractRepositoryTestSuite } from './abstractRepository.spec'

class ActiveKeyRepositoryTest extends AbstractRepositoryTestSuite<ActiveKeyModel> {
    constructor() {
        super(ActiveKeyModel)
    }

    validateCreate(model: ActiveKeyModel, data?: ActiveKey<'request'>): boolean {
        if (data) {
            assert(model.use === data.use)
            assert(model.key.use === data.use)
        } else {
            assert(model.use === undefined)
        }
        return true
    }

    validateWrite(model: ActiveKeyModel, data: ActiveKey<'request'>): boolean {
        assert(model.use === data.use)
        return true
    }

    validateFormat(_model: ActiveKeyModel, data: ActiveKey<'response'>): boolean {
        assert(data === undefined)
        return true
    }

    compareModels(
        firstModel: ActiveKeyModel,
        secondModel: ActiveKeyModel,
        complete?: boolean
    ): boolean {
        if (!complete) {
            return firstModel.key.uuid === secondModel.key.uuid
        }

        assert(firstModel.use === secondModel.use)
        assert(firstModel.key.uuid === secondModel.key.uuid)
        return true
    }

    compareFormatted(first: undefined, second: undefined): boolean {
        return first === second
    }

    getFindOptionsWhere(model?: ActiveKeyModel): FindOptionsWhere<ActiveKeyModel> {
        return {
            key: {
                uuid: model ? model.key.uuid : 'non-existent',
            },
            use: model?.use,
        }
    }
}

export const activeKeyRepositoryTestSuite = new ActiveKeyRepositoryTest()
