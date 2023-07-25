import { config } from '../../src/config'
import { repositories } from '../../src/database/dataSource'
import { KeyModel, UserModel } from '../../src/database/model'
import {
    parseBearerToken,
    sign,
    signDeviceToken,
    signUserToken,
} from '../../src/methods/auth'
import { userUrlFromId } from '../../src/methods/utils'
import { MalformedParameterError, MissingParameterError } from '@crosslab/service-common'
import assert, { fail } from 'assert'
import { exportJWK, generateKeyPair, importJWK, jwtVerify } from 'jose'
import * as sinon from 'sinon'

export default () =>
    describe('auth methods', async function () {
        let TEST_KEY: KeyModel
        let TEST_USER: UserModel
        let TEST_SCOPE_1: string
        let TEST_SCOPE_2: string
        let alg: string
        let use: string
        let roleFindOneOrFailStub: sinon.SinonStub<
            Parameters<typeof repositories.role.findOneOrFail>,
            ReturnType<typeof repositories.role.findOneOrFail>
        >

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

            TEST_SCOPE_1 = 'Test Scope 1'
            TEST_SCOPE_2 = 'Test Scope 2'
            TEST_USER = {
                uuid: '7a4cd9c8-1de7-4b61-a049-2c34f7353c55',
                username: 'username',
                roles: [
                    {
                        uuid: '0001bab1-c4dc-47b2-afe1-ba8d7d26d3d5',
                        name: 'Test Role 1',
                        scopes: [
                            {
                                name: TEST_SCOPE_1,
                            },
                        ],
                        users: [],
                    },
                    {
                        uuid: 'f51acfdd-4a0f-4ade-8779-2b6caee7a7ce',
                        name: 'Test Role 2',
                        scopes: [
                            {
                                name: TEST_SCOPE_1,
                            },
                            {
                                name: TEST_SCOPE_2,
                            },
                        ],
                        users: [],
                    },
                ],
                tokens: [],
            }

            roleFindOneOrFailStub = sinon.stub(repositories.role, 'findOneOrFail')
        })

        this.afterEach(function () {
            roleFindOneOrFailStub.reset()
        })

        this.afterAll(function () {
            roleFindOneOrFailStub.restore()
        })

        describe('sign', async function () {
            it('should correctly sign a JWT with the given payload, key and expiration time', async function () {
                const TEST_PAYLOAD = {
                    test: 'test',
                    important: 17438,
                }

                const jwt = await sign(TEST_PAYLOAD, TEST_KEY)

                const verfifiedJWT = await jwtVerify(
                    jwt,
                    await importJWK(TEST_KEY.public_key, alg),
                    {
                        issuer: config.SECURITY_ISSUER,
                        audience: config.SECURITY_AUDIENCE,
                    }
                )

                assert(verfifiedJWT.payload.test === TEST_PAYLOAD.test)
                assert(verfifiedJWT.payload.important === TEST_PAYLOAD.important)
            })
        })

        describe('signUserToken', async function () {
            it('should correctly sign a user token', async function () {
                const jwt = await signUserToken(TEST_USER, {
                    id: 1,
                    key: TEST_KEY,
                    use: use,
                })

                const verfifiedJWT = await jwtVerify(
                    jwt,
                    await importJWK(TEST_KEY.public_key, alg),
                    {
                        issuer: config.SECURITY_ISSUER,
                        audience: config.SECURITY_AUDIENCE,
                    }
                )

                assert(verfifiedJWT.payload.url === userUrlFromId(TEST_USER.uuid))
                assert(verfifiedJWT.payload.username === TEST_USER.username)
                assert(Array.isArray(verfifiedJWT.payload.scopes))
                assert(verfifiedJWT.payload.scopes.length === 2)
                assert(verfifiedJWT.payload.scopes.includes(TEST_SCOPE_1))
                assert(verfifiedJWT.payload.scopes.includes(TEST_SCOPE_2))
            })
        })

        describe('signDeviceToken', async function () {
            it('should correctly sign a device token', async function () {
                const DEVICE_SCOPE_1 = 'device scope 1'
                const DEVICE_SCOPE_2 = 'device scope 2'

                roleFindOneOrFailStub.resolves({
                    name: 'device',
                    scopes: [{ name: DEVICE_SCOPE_1 }, { name: DEVICE_SCOPE_2 }],
                    users: [],
                    uuid: '3627a917-86e0-489b-7354-2a38e9261b38',
                })

                const TEST_DEVICE_URL =
                    'http://localhost/devices/348b5c7e-86f0-4830-bafb-b9d6b00fa434'

                const jwt = await signDeviceToken(TEST_DEVICE_URL, TEST_USER, {
                    id: 1,
                    key: TEST_KEY,
                    use: use,
                })

                const verfifiedJWT = await jwtVerify(
                    jwt,
                    await importJWK(TEST_KEY.public_key, alg),
                    {
                        issuer: config.SECURITY_ISSUER,
                        audience: config.SECURITY_AUDIENCE,
                    }
                )

                assert(verfifiedJWT.payload.url === userUrlFromId(TEST_USER.uuid))
                assert(verfifiedJWT.payload.username === TEST_USER.username)
                assert(verfifiedJWT.payload.device === TEST_DEVICE_URL)
                assert(Array.isArray(verfifiedJWT.payload.scopes))
                assert(verfifiedJWT.payload.scopes.length === 2)
                assert(verfifiedJWT.payload.scopes.includes(DEVICE_SCOPE_1))
                assert(verfifiedJWT.payload.scopes.includes(DEVICE_SCOPE_2))
            })
        })

        describe('parseBearerToken', async function () {
            it('should parse a valid token', async function () {
                const TEST_TOKEN = 'Token'
                const TEST_AUTHORIZATION = `Bearer ${TEST_TOKEN}`

                const result = parseBearerToken(TEST_AUTHORIZATION)

                assert(result === TEST_TOKEN)
            })

            it('should throw an error if the Authorization parameter is missing', async function () {
                try {
                    parseBearerToken()
                    fail()
                } catch (error) {
                    assert(error instanceof MissingParameterError)
                }

                try {
                    parseBearerToken('')
                    fail()
                } catch (error) {
                    assert(error instanceof MissingParameterError)
                }
            })

            it('should throw an error if the Authorization parameter is malformed', async function () {
                const MALFORMED_AUTHORIZATIONS = ['token', 'Bearer token1 token2']

                for (const MALFORMED_AUTHORIZATION of MALFORMED_AUTHORIZATIONS) {
                    try {
                        parseBearerToken(MALFORMED_AUTHORIZATION)
                        fail()
                    } catch (error) {
                        assert(error instanceof MalformedParameterError)
                    }
                }
            })
        })
    })
