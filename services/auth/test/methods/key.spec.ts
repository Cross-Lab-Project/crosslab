import { KeyModel } from '../../src/database/model'
import { keyRepository } from '../../src/database/repositories/keyRepository'
import { generateNewKey, jwk } from '../../src/methods/key'
import assert from 'assert'
import { exportJWK, generateKeyPair, importJWK, jwtVerify, SignJWT } from 'jose'
import * as sinon from 'sinon'

export default () =>
    describe('key methods', async function () {
        let TEST_KEY: KeyModel
        let alg: string
        let use: string

        this.beforeAll(async function () {
            alg = 'RS256'
            use = 'sig'
            const keyPair = await generateKeyPair(alg)
            TEST_KEY = {
                uuid: 'eb1b1e27-50fd-4082-aad8-6d2d01d9fe9e',
                private_key: await exportJWK(keyPair.privateKey),
                public_key: await exportJWK(keyPair.publicKey),
                use: use,
                alg: alg,
            }
        })

        describe('generateNewKey()', async function () {
            it('should correctly generate a key', async function () {
                const keyRepositoryCreateStub = sinon.stub(keyRepository, 'create')
                keyRepositoryCreateStub.callsFake(async () => TEST_KEY)
                const keyRepositorySaveStub = sinon.stub(keyRepository, 'save')

                const key = await generateNewKey()

                assert(key.use === 'sig')
                assert(key.alg === 'RS256')

                const signedJWT = await new SignJWT({})
                    .setProtectedHeader({ alg })
                    .sign(await importJWK(key.private_key, alg))

                await jwtVerify(signedJWT, await importJWK(key.public_key, alg))

                keyRepositoryCreateStub.restore()
                keyRepositorySaveStub.restore()
            })
        })

        describe('jwk()', async function () {
            it('should correctly parse a jwk from a given key', async function () {
                const result = jwk(TEST_KEY)

                assert(result.use === TEST_KEY.use)
                assert(result.alg === TEST_KEY.alg)
                assert(result.kid === TEST_KEY.uuid)

                assert(
                    JSON.stringify(result) ===
                        JSON.stringify({
                            ...TEST_KEY.public_key,
                            use: TEST_KEY.use,
                            alg: TEST_KEY.alg,
                            kid: TEST_KEY.uuid,
                        })
                )
            })
        })
    })
