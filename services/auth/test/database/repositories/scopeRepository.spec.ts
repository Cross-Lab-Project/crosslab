import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'
import { ScopeModel } from '../../../src/database/model'
import { Scope } from '../../../src/types/types'
import { AbstractRepositoryTestSuite } from './abstractRepository.spec'

class ScopeRepositoryTestSuite extends AbstractRepositoryTestSuite<ScopeModel> {
    constructor() {
        super(ScopeModel)
    }

    validateCreate(model: ScopeModel, data?: Scope<'request'>): boolean {
        assert(model.name === data)
        return true
    }

    validateWrite(model: ScopeModel, data: Scope<'request'>): boolean {
        assert(model.name === data)
        return true
    }

    validateFormat(model: ScopeModel, data: Scope<'response'>): boolean {
        assert(data === model.name)
        return true
    }

    compareModels(
        firstModel: ScopeModel,
        secondModel: ScopeModel,
        complete: boolean
    ): boolean {
        if (!complete) {
            return firstModel.name === secondModel.name
        }

        assert(
            firstModel.name === secondModel.name,
            `${firstModel.name} !== ${secondModel.name}`
        )
        return true
    }

    compareFormatted(first: string, second: string): boolean {
        return first === second
    }

    getFindOptionsWhere(model?: ScopeModel): FindOptionsWhere<ScopeModel> {
        return {
            name: model ? model.name : 'non-existent',
        }
    }
}

export const scopeRepositoryTestSuite = new ScopeRepositoryTestSuite()
