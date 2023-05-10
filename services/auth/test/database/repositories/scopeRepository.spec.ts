import { AppDataSource } from '../../../src/database/dataSource'
import { ScopeModel } from '../../../src/database/model'
import {
    ScopeRepository,
    scopeRepository,
} from '../../../src/database/repositories/scopeRepository'
import { Scope } from '../../../src/types/types'
import { ScopeName } from '../../data/scopeData.spec'
import { initTestDatabase } from './index.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper'
import assert from 'assert'
import { FindOptionsWhere } from 'typeorm'

class ScopeRepositoryTestSuite extends AbstractRepositoryTestSuite<
    ScopeName,
    ScopeRepository
> {
    protected name = 'scopes' as const
    protected repository = scopeRepository
    protected getEntityData = async () => (await initTestDatabase())['scopes']
    protected RepositoryClass = ScopeRepository

    constructor() {
        super(AppDataSource)
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
