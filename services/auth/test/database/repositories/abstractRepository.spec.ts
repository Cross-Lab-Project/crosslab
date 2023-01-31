import { MissingEntityError } from "@crosslab/service-common"
import assert, { fail } from "assert"
import { FindOptionsWhere } from "typeorm"
import { AppDataSource } from "../../../src/database/dataSource"
import { ActiveKeyModel, getModelName, KeyModel, Model, ModelType, RoleModel, ScopeModel, TokenModel, UserModel } from "../../../src/database/model"
import { AbstractRepository } from "../../../src/database/repositories/abstractRepository"
import { ActiveKeyRepository, activeKeyRepository } from "../../../src/database/repositories/activeKeyRepository"
import { KeyRepository, keyRepository } from "../../../src/database/repositories/keyRepository"
import { RoleRepository, roleRepository } from "../../../src/database/repositories/roleRepository"
import { ScopeRepository, scopeRepository } from "../../../src/database/repositories/scopeRepository"
import { TokenRepository, tokenRepository } from "../../../src/database/repositories/tokenRepository"
import { UserRepository, userRepository } from "../../../src/database/repositories/userRepository"
import { activeKeyNames } from "../../data/activeKeyData.spec"
import { EntityName, getFromTestData, PartialTestData, TestData } from "../../data/index.spec"
import { keyNames } from "../../data/keyData.spec"
import { roleNames } from "../../data/roleData.spec"
import { scopeNames } from "../../data/scopeData.spec"
import { tokenNames } from "../../data/tokenData.spec"
import { userNames } from "../../data/userData.spec"
import { initTestDatabase } from "./index.spec"
import Mocha from "mocha"
import { UninitializedRepositoryError } from "../../../src/types/errors"

type SuiteName = "create" | "write" | "save" | "find" | "findOne" | "findOneOrFail" | "remove" | "format" | "additional"
type CustomRecord<K extends string | number | symbol, T> = Record<K, T> & { [k: string]: T }

function getRepository<M extends Model>(model: { new(): M }): AbstractRepository<M> {
    switch (model) {
        case ActiveKeyModel:
            return activeKeyRepository as any
        case KeyModel:
            return keyRepository as any
        case RoleModel:
            return roleRepository as any
        case ScopeModel:
            return scopeRepository as any
        case TokenModel:
            return tokenRepository as any
        case UserModel:
            return userRepository as any
    }

    throw new Error(`No repository exists for the given model`)
}

function getRepositoryClass<M extends Model>(model: { new(): M }): { new(): AbstractRepository<M> } {
    switch (model) {
        case ActiveKeyModel:
            return ActiveKeyRepository as any
        case KeyModel:
            return KeyRepository as any
        case RoleModel:
            return RoleRepository as any
        case ScopeModel:
            return ScopeRepository as any
        case TokenModel:
            return TokenRepository as any
        case UserModel:
            return UserRepository as any
    }

    throw new Error(`No repository exists for the given model`)
}

function getEntityNames<M extends Model>(model: { new(): M }): EntityName<M>[] {
    switch (model) {
        case ActiveKeyModel:
            return activeKeyNames as any
        case KeyModel:
            return keyNames as any
        case RoleModel:
            return roleNames as any
        case ScopeModel:
            return scopeNames as any
        case TokenModel:
            return tokenNames as any
        case UserModel:
            return userNames as any
    }

    throw new Error(`No entity names exist for the given model`)
}

interface RepositoryTestData<M extends Model> {
    model: { new() : M }
    entityData: PartialTestData<M>
    repository: AbstractRepository<M>
    validateCreate(model: M, data?: ModelType<M,"request">): boolean
    validateWrite(model: M, data: ModelType<M,"request">): boolean
    validateFormat(model: M, data: ModelType<M,"response">): boolean
    compareModels(firstModel: M, secondModel: M, complete?: boolean): boolean
    getFindOptionsWhere(model?: M): FindOptionsWhere<M>
}

export abstract class AbstractRepositoryTestSuite<M extends Model> {
    protected model: { new() : M }
    protected entityData?: PartialTestData<M>
    protected repository: AbstractRepository<M>
    protected testSuites?: CustomRecord<SuiteName, Mocha.Suite>
    protected testData?: TestData
    protected repositoryTestData?: RepositoryTestData<M>

    constructor(model: { new() : M }) {
        this.model = model
        this.repository = getRepository(model)
    }

    public async initialize() {
        this.testData = await initTestDatabase()
        this.entityData = getFromTestData(this.testData, this.model)

        const model = this.model
        const entityData = this.entityData
        const repository = this.repository
        const compareModels = this.compareModels.bind(this)
        const getFindOptionsWhere = this.getFindOptionsWhere.bind(this)
        const validateCreate = this.validateCreate.bind(this)
        const validateFormat = this.validateFormat.bind(this)
        const validateWrite = this.validateWrite.bind(this)

        this.repositoryTestData = {
            model,
            entityData,
            repository,
            compareModels,
            getFindOptionsWhere,
            validateCreate,
            validateFormat,
            validateWrite
        }

        this.testSuites = {
            additional: (() => {
                const testSuite = new Mocha.Suite("additional")
                return testSuite
            })(),
            create: (() => {
                const testSuite = new Mocha.Suite("create")
                testSuite.addTest(new Mocha.Test("should create a model from empty data", async function () {
                    const model = await repository.create()
                    assert(validateCreate(model))
                }))
                testSuite.addTest(new Mocha.Test("should create a model from valid data", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.create(entityData[key].request)
                        assert(validateCreate(model, entityData[key].request))
                    }
                }))
                testSuite.addTest(new Mocha.Test("should throw an UninitializedRepositoryError if the repository has not been initialized", async function () {
                    for (const key of getEntityNames(model)) {
                        const unitializedRepository: AbstractRepository<M> = new (getRepositoryClass(model) as any)()
                        try {
                            await unitializedRepository.create(entityData[key].request)
                            fail()
                        } catch (error) {
                            assert(error instanceof UninitializedRepositoryError)
                        }
                    }
                }))
                return testSuite
            })(),
            find: (() => {
                const testSuite = new Mocha.Suite("find")
                testSuite.addTest(new Mocha.Test("should find all models", async function () {
                    const models = await repository.find()
                    for (const key of getEntityNames(model)) {
                        assert(
                            models.find((model) => compareModels(model, entityData[key].model, false)),
                            `Did not find model for entity data "${key}"`
                        )
                    }
                }))
                testSuite.addTest(new Mocha.Test("should throw an UninitializedRepositoryError if the repository has not been initialized", async function () {
                    const unitializedRepository: AbstractRepository<M> = new (getRepositoryClass(model) as any)()
                    try {
                        await unitializedRepository.find()
                        fail()
                    } catch (error) {
                        assert(error instanceof UninitializedRepositoryError)
                    }
                }))
                return testSuite
            })(),
            findOne: (() => {
                const testSuite = new Mocha.Suite("findOne")
                testSuite.addTest(new Mocha.Test("should find a specific existing model", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.findOne({
                            where: getFindOptionsWhere(entityData[key].model)
                        })
                        assert(model)
                        assert(compareModels(model, entityData[key].model, false))
                    }
                }))
                testSuite.addTest(new Mocha.Test("should return null when the model does not exist", async function () {
                    const model = await repository.findOne({
                        where: getFindOptionsWhere()
                    })
                    assert(model === null)
                }))
                testSuite.addTest(new Mocha.Test("should throw an UninitializedRepositoryError if the repository has not been initialized", async function () {
                    const unitializedRepository: AbstractRepository<M> = new (getRepositoryClass(model) as any)()
                    try {
                        await unitializedRepository.findOne({})
                        fail()
                    } catch (error) {
                        assert(error instanceof UninitializedRepositoryError)
                    }
                }))
                return testSuite
            })(),
            findOneOrFail: (() => {
                const testSuite = new Mocha.Suite("findOneOrFail")
                testSuite.addTest(new Mocha.Test("should find a specific existing model", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.findOne({
                            where: getFindOptionsWhere(entityData[key].model)
                        })
                        assert(model)
                        assert(compareModels(model, entityData[key].model, false))
                    }
                }))
                testSuite.addTest(new Mocha.Test("should throw a MissingEntityError when the model does not exist", async function () {
                    try {
                        await repository.findOneOrFail({
                            where: getFindOptionsWhere()
                        })
                        fail()
                    } catch (error) {
                        assert(error instanceof MissingEntityError)
                    }
                }))
                testSuite.addTest(new Mocha.Test("should throw an UninitializedRepositoryError if the repository has not been initialized", async function () {
                    const unitializedRepository: AbstractRepository<M> = new (getRepositoryClass(model) as any)()
                    try {
                        await unitializedRepository.findOneOrFail({})
                        fail()
                    } catch (error) {
                        assert(error instanceof UninitializedRepositoryError)
                    }
                }))
                return testSuite
            })(),
            format: (() => {
                const testSuite = new Mocha.Suite("format")
                testSuite.addTest(new Mocha.Test("should correctly format a model", async function () {
                    for (const key of getEntityNames(model)) {
                        const formatted = await repository.format(entityData[key].model)
                        assert(validateFormat(entityData[key].model, formatted))
                    }
                }))
                return testSuite
            })(),
            remove: (() => {
                const testSuite = new Mocha.Suite("remove")
                testSuite.addTest(new Mocha.Test("should remove a specific existing model", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.findOne({
                            where: getFindOptionsWhere(entityData[key].model)
                        })
                        assert(model)
                        assert(compareModels(model, entityData[key].model, false))
                        await repository.remove(model)
                        assert(await repository.findOne({
                            where: getFindOptionsWhere(entityData[key].model)
                        }) === null)
                    }
                }))
                testSuite.addTest(new Mocha.Test("should throw an UninitializedRepositoryError if the repository has not been initialized", async function () {
                    for (const key of getEntityNames(model)) {
                        const unitializedRepository: AbstractRepository<M> = new (getRepositoryClass(model) as any)()
                        try {
                            await unitializedRepository.remove(entityData[key].model)
                            fail()
                        } catch (error) {
                            assert(error instanceof UninitializedRepositoryError)
                        }
                    }
                }))
                return testSuite
            })(),
            save: (() => {
                const testSuite = new Mocha.Suite("save")
                testSuite.addTest(new Mocha.Test("should save a valid model", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.create(entityData[key].request)
                        assert(validateCreate(model, entityData[key].request))
                        const savedModel = await repository.save(model)
                        assert(compareModels(model, savedModel))
                    }
                }))
                testSuite.addTest(new Mocha.Test("should throw an UninitializedRepositoryError if the repository has not been initialized", async function () {
                    for (const key of getEntityNames(model)) {
                        const unitializedRepository: AbstractRepository<M> = new (getRepositoryClass(model) as any)()
                        try {
                            await unitializedRepository.save(entityData[key].model)
                            fail()
                        } catch (error) {
                            assert(error instanceof UninitializedRepositoryError)
                        }
                    }
                }))
                return testSuite
            })(),
            write: (() => {
                const testSuite = new Mocha.Suite("write")
                testSuite.addTest(new Mocha.Test("should write valid data to a model correctly", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.create()
                        assert(validateCreate(model))
                        await repository.write(model, entityData[key].request)
                        assert(validateWrite(model, entityData[key].request))
                    }
                }))
                return testSuite
            })()
        }
    }

    public addTestToSuite(suiteName: SuiteName, test: (data: RepositoryTestData<M>) => Mocha.Test) {
        if (!this.testSuites || !this.repositoryTestData) throw new Error("Test suite has not been initialized")
        this.testSuites[suiteName].addTest(test(this.repositoryTestData))
    }

    public addSuiteToSuite(suiteName: SuiteName, suite: (data: RepositoryTestData<M>) => Mocha.Suite) {
        if (!this.testSuites || !this.repositoryTestData) throw new Error("Test suite has not been initialized")
        this.testSuites[suiteName].addSuite(suite(this.repositoryTestData))
    }

    public addSuite(suiteName: string, suite: (data: RepositoryTestData<M>) => Mocha.Suite) {
        if (!this.testSuites || !this.repositoryTestData) throw new Error("Test suite has not been initialized")
        this.testSuites[suiteName] = suite(this.repositoryTestData)
    }

    protected async resetDatabase() {
        if (AppDataSource.connected) {
            await AppDataSource.teardown()
        }
        this.testData = await initTestDatabase()
        const newEntityData = getFromTestData(this.testData, this.model)
        
        for (const key in newEntityData) {
            (this.entityData as any)[key] = (newEntityData as any)[key]
        }
    }
    
    public execute() {
        const testSuites = this.testSuites
        const testSuite = new Mocha.Suite(`${getModelName(this.model)} Repository Test`)
        for (const suite in testSuites) {
            const reference = this
            testSuites[suite].beforeEach(async function () {
                await reference.resetDatabase()
            })
            testSuite.addSuite(testSuites[suite])
        }
        return testSuite
    }
    
    abstract validateCreate(model: M, data?: ModelType<M,"request">): boolean
    abstract validateWrite(model: M, data: ModelType<M,"request">): boolean
    abstract validateFormat(model: M, data: ModelType<M,"response">): boolean
    abstract compareModels(firstModel: M, secondModel: M, complete?: boolean): boolean
    abstract getFindOptionsWhere(model?: M): FindOptionsWhere<M>
}