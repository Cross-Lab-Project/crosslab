import { MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { randomUUID } from "crypto"
import { scopeRepository } from "../../../src/database/repositories/scopeRepository"
import { Scope } from "../../../src/types/types"

export default () => describe("Scope Repository Tests", async function () {
    // TBD
    describe("create", async function () {
        // TBD
        it("should create a scope model from valid data", async function () {
            const scopeData: Scope = randomUUID()
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)
        })
    })

    describe("write", async function () {
        // TBD
        it("should write valid data to a scope model correctly", async function () {
            const scopeData: Scope = randomUUID()
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)

            const newScopeData = "new:" + scopeData
            await scopeRepository.write(scopeModel, newScopeData)
            assert(scopeModel.name === newScopeData)
        })
    })

    describe("save", async function () {
        // TBD
        it("should save a valid scope model", async function () {
            const scopeData: Scope = randomUUID()
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
        // TBD
        it("should find all scope models", async function () {
            const scopeModels = await scopeRepository.find()
            assert(scopeModels.length > 0)
        })
    })

    describe("findOne", async function () {
        // TBD
        it("should find a specific existing scope model", async function () {
            const searchName = "test scope"
            const scopeModel = await scopeRepository.findOne({
                where: {
                    name: searchName
                }
            })
            assert(scopeModel)
            assert(scopeModel.name === searchName)
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
        // TBD
        it("should find a specific existing scope model", async function () {
            const searchName = "test scope"
            const scopeModel = await scopeRepository.findOneOrFail({
                where: {
                    name: searchName
                }
            })
            assert(scopeModel.name === searchName)
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
        // TBD
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

            await scopeRepository.delete(scopeModel)
            
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
            await scopeRepository.delete({ name: "new:non-existent" })
        })
    })
    
    describe("format", async function () {
        // TBD
        it("should correctly format a scope model", async function () {
            const scopeData = "format"
            const scopeModel = await scopeRepository.create(scopeData)
            assert(scopeModel.name === scopeData)

            const scope = await scopeRepository.format(scopeModel)
            assert(scope === scopeData)
        })
    })
})