import { MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { AppDataSource } from "../../../src/database/dataSource"
import { scopeRepository } from "../../../src/database/repositories/scopeRepository"
import { Scope } from "../../../src/types/types"
import { scopeData } from "../../data/scopeData.spec"
import { initTestDatabase } from "./index.spec"

export default () => describe("Scope Repository Tests", async function () {
    this.beforeEach(async function () {
        await initTestDatabase()
    })

    this.afterEach(async function () {
        await AppDataSource.teardown()
    })
    
    describe("create", async function () {
        it("should create a scope model from valid data", async function () {
            const scopeData: Scope = "eb1b1e27-50fd-4082-aad8-6d2d01d9fe9e"
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)
        })
    })

    describe("write", async function () {
        it("should write valid data to a scope model correctly", async function () {
            const scopeData: Scope = "eb1b1e27-50fd-4082-aad8-6d2d01d9fe9e"
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)

            const newScopeData = "new:" + scopeData
            await scopeRepository.write(scopeModel, newScopeData)
            assert(scopeModel.name === newScopeData)
        })
    })

    describe("save", async function () {
        it("should save a valid scope model", async function () {
            const scopeData: Scope = "eb1b1e27-50fd-4082-aad8-6d2d01d9fe9e"
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)

            await scopeRepository.save(scopeModel)
            const foundScopeModel = await scopeRepository.findOneOrFail({
                where: {
                    name: scopeData
                }
            })
            assert(foundScopeModel.name === scopeData)
        })
    })

    describe("find", async function () {
        it("should find all scope models", async function () {
            const scopeModels = await scopeRepository.find()
            assert(scopeModels.length > 0)
        })
    })

    describe("findOne", async function () {
        it("should find a specific existing scope model", async function () {
            const scopeModel = await scopeRepository.findOne({
                where: {
                    name: scopeData["scope 1"]
                }
            })
            assert(scopeModel)
            assert(scopeModel.name === scopeData["scope 1"])
        })

        it("should return null when asked to find a non-existent scope model", async function () {
            const scopeModel = await scopeRepository.findOne({
                where: {
                    name: "non-existent"
                }
            })
            assert(scopeModel === null)
        })
    })

    describe("findOneOrFail", async function () {
        it("should find a specific existing scope model", async function () {
            const scopeModel = await scopeRepository.findOneOrFail({
                where: {
                    name: scopeData["scope 1"]
                }
            })
            assert(scopeModel.name === scopeData["scope 1"])
        })

        it("should throw an error when asked to find a non-existent scope model", async function () {
            try {
                await scopeRepository.findOneOrFail({
                    where: {
                        name: "non-existent"
                    }
                })
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 404)
            }
        })
    })

    describe("delete", async function () {
        it("should delete an existing scope model", async function () {
            const scopeData = "delete"
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)

            await scopeRepository.save(scopeModel)

            const foundScopeModel = await scopeRepository.findOneOrFail({
                where: {
                    name: scopeData
                }
            })
            assert(foundScopeModel.name === scopeData)

            await scopeRepository.remove(scopeModel)
            
            try {
                await scopeRepository.findOneOrFail({
                    where: {
                        name: scopeData
                    }
                })
                assert(false)
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 404)
            }
        })

        it("should not throw an error when scope model is non-existent", async function () {
            await scopeRepository.remove({ name: "new:non-existent" })
        })
    })
    
    describe("format", async function () {
        it("should correctly format a scope model", async function () {
            const scopeData = "format"
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)

            const scope = await scopeRepository.format(scopeModel)
            assert(scope === scopeData)
        })
    })
})