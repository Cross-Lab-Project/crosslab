import assert from "assert"
import { Model, ModelType } from "../../../src/database/model"
import { AbstractRepository } from "../../../src/database/repositories/abstractRepository"

export default function <M extends Model>(
    repository: AbstractRepository<M>,
    generateData: () => Promise<ModelType<M,"request">> | ModelType<M,"request">,
    compareModelAndData: (model: M, data: ModelType<M,"request">) => boolean,
    compareModels: (firstModel: M, secondModel: M) => boolean,
    findModel: (model: M) => Promise<M>
) {
    describe("create", async function () {
        it("should create a model from empty data", async function () {
            const model = await repository.create()
            // assert the empty model is generated correctly
        })

        it("should create a model from valid data", async function () {
            const data = await generateData()
            const model = await repository.create(data)
            assert(compareModelAndData(model, data))
        })
    })

    describe("write", async function () {
        it("should write valid data to a model correctly", async function () {
            const data = await generateData()
            const model = await repository.create()
            await repository.write(model, data)
            assert(compareModelAndData(model, data))
        })
    })

    describe("save", async function () {
        it("should save a valid model", async function () {
            const data = await generateData()
            const model = await repository.create(data)
            const savedModel = await repository.save(model)
            assert(compareModels(model, savedModel))
        })
    })

    describe("find", async function () {
        it("should find all models", async function () {
            // TODO: find a way to test this function
        })
    })

    describe("findOne", async function () {
        it("should find a specific existing model", async function () {
            const data = await generateData()
            const model = await repository.create(data)
            const savedModel = await repository.save(model)
            const foundModel = await findModel(model)
            assert(compareModels(model, savedModel))
            assert(compareModels(savedModel, foundModel))
        })

        it("should return null when the model does not exist", async function () {
            // search for non-existent model
            // assert that model is null
        })
    })

    describe("findOneOrFail", async function () {
        it("should find a specific existing model", async function () {
            // generate data
            // create model
            // save model
            // search model
            // compare created and found models
        })

        it("should throw an error when the model does not exist", async function () {
            // search for non-existent model
            // assert that correct error is thrown
        })
    })

    describe("remove", async function () {
        it("should remove a specific existing model", async function () {
            // generate data
            // create model
            // save model
            // find model
            // compare created and found models
            // remove created model
            // try to find created model again
            // assert that correct error is thrown
        })
    })

    describe("format", async function () {
        it("should correctly format a model", async function () {
            // generate data
            // create model
            // format model
            // assert that model was formatted correctly
        })
    })
}