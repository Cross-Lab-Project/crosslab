import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'
import { KeyModel } from '../../../src/database/model'
import { AbstractRepositoryTestSuite } from './abstractRepository.spec'
import { Key } from '../../../src/types/types'

class KeyRepositoryTestSuite extends AbstractRepositoryTestSuite<KeyModel> {
    constructor() {
        super(KeyModel)
    }

    validateCreate(model: KeyModel, data?: Key<'request'>): boolean {
        if (data) return this.validateWrite(model, data)

        assert(model.alg === undefined)
        assert(model.private_key === undefined)
        assert(model.public_key === undefined)
        assert(model.use === undefined)
        assert(model.uuid === undefined)

        return true
    }

    validateWrite(model: KeyModel, data: Key<'request'>): boolean {
        assert(model.alg === data?.alg)
        assert(model.private_key === data.private_key)
        assert(model.public_key === data.public_key)
        assert(model.use === data.use)

        // TODO: assert that key can be used for its intended use

        return true
    }

    validateFormat(_model: KeyModel, data: Key<'response'>): boolean {
        assert(data === undefined)

        return true
    }

    compareModels(
        firstModel: KeyModel,
        secondModel: KeyModel,
        complete?: boolean
    ): boolean {
        if (!complete) {
            return firstModel.uuid === secondModel.uuid
        }

        assert(firstModel.alg === secondModel.alg)
        assert(
            JSON.stringify(firstModel.private_key) ===
                JSON.stringify(secondModel.private_key)
        )
        assert(
            JSON.stringify(firstModel.public_key) ===
                JSON.stringify(secondModel.public_key)
        )
        assert(firstModel.use === secondModel.use)
        assert(firstModel.uuid === secondModel.uuid)

        return true
    }

    compareFormatted(first: undefined, second: undefined): boolean {
        return first === second
    }

    getFindOptionsWhere(model?: KeyModel): FindOptionsWhere<KeyModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        }
    }
}

export const keyRepositoryTestSuite = new KeyRepositoryTestSuite()
