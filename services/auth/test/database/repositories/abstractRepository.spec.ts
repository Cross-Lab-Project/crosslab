import { MissingEntityError } from "@crosslab/service-common"
import assert, { fail } from "assert"
import { FindOptionsWhere } from "typeorm"
import { AppDataSource } from "../../../src/database/dataSource"
import { ActiveKeyModel, getModelName, KeyModel, Model, ModelType, RoleModel, ScopeModel, TokenModel, UserModel } from "../../../src/database/model"
import { AbstractRepository } from "../../../src/database/repositories/abstractRepository"
import { activeKeyRepository } from "../../../src/database/repositories/activeKeyRepository"
import { keyRepository } from "../../../src/database/repositories/keyRepository"
import { roleRepository } from "../../../src/database/repositories/roleRepository"
import { scopeRepository } from "../../../src/database/repositories/scopeRepository"
import { tokenRepository } from "../../../src/database/repositories/tokenRepository"
import { userRepository } from "../../../src/database/repositories/userRepository"
import { activeKeyNames } from "../../data/activeKeyData.spec"
import { EntityName, getFromTestData, PartialTestData, TestData } from "../../data/index.spec"
import { keyNames } from "../../data/keyData.spec"
import { roleNames } from "../../data/roleData.spec"
import { scopeNames } from "../../data/scopeData.spec"
import { tokenNames } from "../../data/tokenData.spec"
import { userNames } from "../../data/userData.spec"
import { initTestDatabase } from "./index.spec"
import Mocha from "mocha"

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

    throw new Error(`No entity names exists for the given model`)
}

export abstract class AbstractRepositoryTest<M extends Model> {
    protected model: { new() : M }
    protected entityData?: PartialTestData<M>
    protected repository: AbstractRepository<M>
    protected testSuites?: CustomRecord<SuiteName, () => Mocha.Suite>
    protected testData?: TestData

    constructor(model: { new() : M }) {
        this.model = model
        this.repository = getRepository(model)
    }

    public async initialize() {
        this.testData = await initTestDatabase()
        this.entityData = getFromTestData(this.testData, this.model)

        const { 
            model,
            entityData, 
            repository, 
            compareModels, 
            getFindOptionsWhere,
            validateCreate,
            validateFormat,
            validateWrite
        } = this

        this.testSuites = {
            additional: () => {
                const testSuite = new Mocha.Suite("additional")
                return testSuite
            },
            create: () => {
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
                return testSuite
            },
            find: () => {
                const testSuite = new Mocha.Suite("find")
                testSuite.addTest(new Mocha.Test("should find all models", async function () {
                    const models = await repository.find()
                    for (const key of getEntityNames(model)) {
                        assert(models.find((model) => compareModels(model, entityData[key].model, false)))
                    }
                }))
                return testSuite
            },
            findOne: () => {
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
                return testSuite
            },
            findOneOrFail: () => {
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
                return testSuite
            },
            format: () => {
                const testSuite = new Mocha.Suite("format")
                testSuite.addTest(new Mocha.Test("should correctly format a model", async function () {
                    for (const key of getEntityNames(model)) {
                        const formatted = await repository.format(entityData[key].model)
                        assert(validateFormat(entityData[key].model, formatted))
                    }
                }))
                return testSuite
            },
            remove: () => {
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
                return testSuite
            },
            save: () => {
                const testSuite = new Mocha.Suite("save")
                testSuite.addTest(new Mocha.Test("should save a valid model", async function () {
                    for (const key of getEntityNames(model)) {
                        const model = await repository.create(entityData[key].request)
                        assert(validateCreate(model, entityData[key].request))
                        const savedModel = await repository.save(model)
                        assert(compareModels(model, savedModel))
                    }
                }))
                return testSuite
            },
            write: () => {
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
            }
        }
    }

    // public addTestToSuite(suiteName: SuiteName, test: Mocha.Test) {
    //     this.testSuites[suiteName].addTest(test)
    // }

    // public addSuiteToSuite(suiteName: SuiteName, suite: Mocha.Suite) {
    //     this.testSuites[suiteName].addSuite(suite)
    // }

    // public addSuite(suiteName: string, suite: Mocha.Suite) {
    //     this.testSuites[suiteName] = suite
    // }

    protected async resetDatabase() {
        if (AppDataSource.connected) {
            await AppDataSource.teardown()
        }
        this.testData = await initTestDatabase()
        this.entityData = getFromTestData(this.testData, this.model)
    }
    
    public execute() {
        const testSuites = this.testSuites
        const testSuite = new Mocha.Suite(`${getModelName(this.model)} Repository Test`)
        for (const suite in testSuites) {
            testSuite.addSuite(testSuites[suite]())
        }
        return testSuite
    }
    
    abstract validateCreate(model: M, data?: ModelType<M,"request">): boolean
    abstract validateWrite(model: M, data: ModelType<M,"request">): boolean
    abstract validateFormat(model: M, data: ModelType<M,"response">): boolean
    abstract compareModels(firstModel: M, secondModel: M, complete?: boolean): boolean
    abstract getFindOptionsWhere(model?: M): FindOptionsWhere<M>    
}