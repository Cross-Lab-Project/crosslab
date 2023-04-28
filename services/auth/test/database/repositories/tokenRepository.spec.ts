import { AppDataSource } from '../../../src/database/dataSource'
import { TokenModel } from '../../../src/database/model'
import {
    tokenRepository,
    TokenRepository,
} from '../../../src/database/repositories/tokenRepository'
import { Token } from '../../../src/types/types'
import { TokenName } from '../../data/tokenData.spec'
import { initTestDatabase } from './index.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { FindOptionsWhere } from 'typeorm'

class TokenRepositoryTestSuite extends AbstractRepositoryTestSuite<
    TokenName,
    TokenRepository
> {
    protected name = 'tokens' as const
    protected repository = tokenRepository
    protected getEntityData = async () => (await initTestDatabase())['tokens']
    protected RepositoryClass = TokenRepository

    constructor() {
        super(AppDataSource)
    }

    public async initialize(): Promise<void> {
        await super.initialize()
        this.addTestToSuite(
            'additional',
            (data) =>
                new Mocha.Test(
                    'should add scope to token model only if it is not already present',
                    async function () {
                        const repository = data.repository as TokenRepository
                        const tokenModel: TokenModel = await repository.save(
                            data.entityData['superadmin valid user token 1'].model
                        )

                        assert(Array.isArray(tokenModel.scopes))
                        assert(tokenModel.scopes.length > 0)

                        const scopeModel = tokenModel.scopes[0]
                        tokenModel.scopes = []

                        repository.addScopeModelToTokenModel(tokenModel, scopeModel)
                        assert(tokenModel.scopes.length === 1)
                        assert(tokenModel.scopes[0] === scopeModel)

                        repository.addScopeModelToTokenModel(tokenModel, scopeModel)
                        assert(tokenModel.scopes.length === 1)
                        assert(tokenModel.scopes[0] === scopeModel)
                    }
                )
        )
    }

    validateCreate(model: TokenModel, data?: Token<'request'>): boolean {
        if (data) return this.validateWrite(model, data)

        assert(model.device === undefined)
        assert(model.expiresOn === undefined)
        assert(model.scopes === undefined)
        assert(model.token === undefined)
        assert(model.user === undefined)

        return true
    }

    validateWrite(model: TokenModel, data: Token<'request'>): boolean {
        assert(model.device === data.device)
        assert(model.expiresOn === data.expiresOn)

        for (const scope of model.scopes) {
            assert(data.scopes.includes(scope.name))
        }
        for (const scope of data.scopes) {
            assert(model.scopes.find((s) => s.name === scope))
        }

        assert(model.token === undefined)
        assert(model.user.username === data.user)

        return true
    }

    validateFormat(_model: TokenModel, data: Token<'response'>): boolean {
        assert(data === undefined)
        return true
    }

    compareModels(
        firstModel: TokenModel,
        secondModel: TokenModel,
        complete?: boolean
    ): boolean {
        if (!complete) {
            if (firstModel.token !== secondModel.token) return false
            return true
        }

        assert(firstModel.device === secondModel.device)
        assert(firstModel.expiresOn === secondModel.expiresOn)

        for (const scope of firstModel.scopes) {
            assert(secondModel.scopes.find((s) => s.name === scope.name))
        }
        for (const scope of secondModel.scopes) {
            assert(firstModel.scopes.find((s) => s.name === scope.name))
        }

        // TODO: assert that users are identical

        return true
    }

    compareFormatted(first: undefined, second: undefined): boolean {
        return first === second
    }

    getFindOptionsWhere(model?: TokenModel): FindOptionsWhere<TokenModel> {
        return {
            token: model ? model.token : 'non-existent',
        }
    }
}

export const tokenRepositoryTestSuite = new TokenRepositoryTestSuite()
