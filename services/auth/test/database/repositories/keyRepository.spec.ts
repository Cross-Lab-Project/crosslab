import { MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { exportJWK, generateKeyPair } from "jose"
import { AppDataSource } from "../../../src/database/dataSource"
import { keyRepository } from "../../../src/database/repositories/keyRepository"
import { Key } from "../../../src/types/types"
import { initTestDatabase } from "./index.spec"

async function generateValidKey(): Promise<Required<Key>> {
    const keyPair = await generateKeyPair('RS256')
    return {
        alg: 'RS256',
        private_key: await exportJWK(keyPair.privateKey),
        public_key: await exportJWK(keyPair.publicKey),
        use: 'sig'
    }
}

export default () => describe("Key Repository Tests", async function () {
    this.beforeEach(async function () {
        await initTestDatabase()
    })

    this.afterEach(async function () {
        await AppDataSource.teardown()
    })
    
    // TBD
    describe("create", async function () {
        // TBD
        it("should create a key model from valid data", async function () {
            const key = await generateValidKey()
            const keyModel = await keyRepository.create(key)
            assert(keyModel.alg === key.alg)
            assert(keyModel.private_key === key.private_key)
            assert(keyModel.public_key === key.public_key)
            assert(keyModel.use === key.use)
        })
    })

    describe("write", async function () {
        // TBD
        it("should write valid data to a key model correctly", async function () {
            const key = await generateValidKey()
            const keyModel = await keyRepository.create(key)
            assert(keyModel.alg === key.alg)
            assert(keyModel.private_key === key.private_key)
            assert(keyModel.public_key === key.public_key)
            assert(keyModel.use === key.use)

            const newKey = await generateValidKey()
            await keyRepository.write(keyModel, newKey)
            assert(keyModel.alg === newKey.alg)
            assert(keyModel.private_key === newKey.private_key)
            assert(keyModel.public_key === newKey.public_key)
            assert(keyModel.use === newKey.use)
        })
    })

    describe("save", async function () {
        // TBD
        it("should save a valid key model", async function () {
            const key = await generateValidKey()
            const keyModel = await keyRepository.create(key)
            assert(keyModel.alg === key.alg)
            assert(keyModel.private_key === key.private_key)
            assert(keyModel.public_key === key.public_key)
            assert(keyModel.use === key.use)

            await keyRepository.save(keyModel)
            const foundKeyModel = await keyRepository.findOneOrFail({
                where: {
                    uuid: keyModel.uuid
                }
            })
            assert(foundKeyModel.alg === key.alg)
            assert(JSON.stringify(foundKeyModel.private_key) === JSON.stringify(key.private_key))
            assert(JSON.stringify(foundKeyModel.public_key) === JSON.stringify(key.public_key))
            assert(foundKeyModel.use === key.use)
        })
    })

    describe("find", async function () {
        // TBD
        it("should find all key models", async function () {
            const keyModels = await keyRepository.find()
            assert(keyModels.length > 0)
        })
    })

    describe("findOne", async function () {
        // TBD
        it("should find a specific existing key model", async function () {
            const keyModels = await keyRepository.find()
            assert(keyModels.length > 0)

            const keyModel = await keyRepository.findOne({
                where: {
                    uuid: keyModels[0].uuid
                }
            })
            assert(keyModel)
            assert(keyModel.alg === keyModels[0].alg)
            assert(JSON.stringify(keyModel.private_key) === JSON.stringify(keyModels[0].private_key))
            assert(JSON.stringify(keyModel.public_key) === JSON.stringify(keyModels[0].public_key))
            assert(keyModel.use === keyModels[0].use)
        })

        it("should return null when asked to find a non-existent key model", async function () {
            const keyModel = await keyRepository.findOne({
                where: {
                    uuid: "non-existent"
                }
            })
            assert(keyModel === null)
        })
    })

    describe("findOneOrFail", async function () {
        // TBD
        it("should find a specific existing key model", async function () {
            const keyModels = await keyRepository.find()
            assert(keyModels.length > 0)

            const keyModel = await keyRepository.findOneOrFail({
                where: {
                    uuid: keyModels[0].uuid
                }
            })
            assert(keyModel.alg === keyModels[0].alg)
            assert(JSON.stringify(keyModel.private_key) === JSON.stringify(keyModels[0].private_key))
            assert(JSON.stringify(keyModel.public_key) === JSON.stringify(keyModels[0].public_key))
            assert(keyModel.use === keyModels[0].use)
        })

        it("should throw an error when asked to find a non-existent key model", async function () {
            try {
                await keyRepository.findOne({
                    where: {
                        uuid: "non-existent"
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
        it("should delete an existing key model", async function () {
            const key = await generateValidKey()
            const keyModel = await keyRepository.create(key)
            assert(keyModel.alg === key.alg)
            assert(keyModel.private_key === key.private_key)
            assert(keyModel.public_key === key.public_key)
            assert(keyModel.use === key.use)

            await keyRepository.save(keyModel)

            const foundKeyModel = await keyRepository.findOneOrFail({
                where: {
                    uuid: keyModel.uuid
                }
            })
            assert(foundKeyModel.alg === keyModel.alg)
            assert(JSON.stringify(foundKeyModel.private_key) === JSON.stringify(keyModel.private_key))
            assert(JSON.stringify(foundKeyModel.public_key) === JSON.stringify(keyModel.public_key))
            assert(foundKeyModel.use === keyModel.use)

            await keyRepository.remove(keyModel)

            try {
                await keyRepository.findOneOrFail({
                    where: {
                        uuid: foundKeyModel.uuid
                    }
                })
                assert(false)
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 404)
            }
        })
    })
    
    describe("format", async function () {
        // TBD
        it("should correctly format a key model", async function () {
            const keyData = await generateValidKey()
            const keyModel = await keyRepository.create(keyData)
            assert(keyModel.alg === keyData.alg)
            assert(keyModel.private_key === keyData.private_key)
            assert(keyModel.public_key === keyData.public_key)
            assert(keyModel.use === keyData.use)

            const key = await keyRepository.format(keyModel)
            assert(key === undefined)
        })
    })
})