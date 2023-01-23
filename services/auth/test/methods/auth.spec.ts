import { MalformedParameterError, MissingParameterError } from "@crosslab/service-common"
import assert, { fail } from "assert"
import { exportJWK, generateKeyPair, importJWK, jwtVerify } from "jose"
import { config } from "../../src/config"
import { KeyModel, UserModel } from "../../src/database/model"
import { parseBearerToken, sign, signDeviceToken, signUserToken } from "../../src/methods/auth"
import { userUrlFromUsername } from "../../src/methods/utils"

export default () => describe("auth methods", async function () {
    let TEST_KEY: KeyModel
    let TEST_USER: UserModel
    let TEST_SCOPE_1: string
    let TEST_SCOPE_2: string
    let alg: string
    let use: string

    this.beforeAll(async function () {
        alg = "RS256"
        use = "sig"
        const keyPair = await generateKeyPair(alg)
        TEST_KEY = {
            uuid: "eb1b1e27-50fd-4082-aad8-6d2d01d9fe9e",
            private_key: await exportJWK(keyPair.privateKey),
            public_key: await exportJWK(keyPair.publicKey),
            use: use,
            alg: alg
        }
        
        TEST_SCOPE_1 = "Test Scope 1"
        TEST_SCOPE_2 = "Test Scope 2"
        TEST_USER = {
            username: "username",
            roles: [{
                name: "Test Role 1",
                scopes: [
                    {
                        name: TEST_SCOPE_1
                    }
                ],
                users: []
            }, {
                name: "Test Role 2",
                scopes: [
                    {
                        name: TEST_SCOPE_1
                    },
                    {
                        name: TEST_SCOPE_2
                    }
                ],
                users: []
            }],
            tokens: []
        }
    })

    describe("sign", async function () {
        it("should correctly sign a JWT with the given payload, key and expiration time", async function () {
            const TEST_PAYLOAD = {
                test: "test",
                important: 17438
            }
            const TEST_EXPIRATION_TIME = "2h"

            const jwt = await sign(TEST_PAYLOAD, TEST_KEY, TEST_EXPIRATION_TIME)
            
            const verfifiedJWT = await jwtVerify(jwt, await importJWK(TEST_KEY.public_key, alg), {
                issuer: config.SECURITY_ISSUER,
                audience: config.SECURITY_AUDIENCE,
            })

            assert(verfifiedJWT.payload.iat && verfifiedJWT.payload.exp)
            assert(verfifiedJWT.payload.exp - verfifiedJWT.payload.iat === 7200)
            assert(verfifiedJWT.payload.test === TEST_PAYLOAD.test)
            assert(verfifiedJWT.payload.important === TEST_PAYLOAD.important)
        })
    })

    describe("signUserToken", async function () {
        it("should correctly sign a user token", async function () {
            const jwt = await signUserToken(TEST_USER, {
                key: TEST_KEY,
                use: use
            })

            const verfifiedJWT = await jwtVerify(jwt, await importJWK(TEST_KEY.public_key, alg), {
                issuer: config.SECURITY_ISSUER,
                audience: config.SECURITY_AUDIENCE,
            })

            assert(verfifiedJWT.payload.iat && verfifiedJWT.payload.exp)
            assert(verfifiedJWT.payload.exp - verfifiedJWT.payload.iat === 7200)
            assert(verfifiedJWT.payload.url === userUrlFromUsername(TEST_USER.username))
            assert(verfifiedJWT.payload.username === TEST_USER.username)
            assert(Array.isArray(verfifiedJWT.payload.scopes))
            assert(verfifiedJWT.payload.scopes.length === 2)
            assert(verfifiedJWT.payload.scopes.includes(TEST_SCOPE_1))
            assert(verfifiedJWT.payload.scopes.includes(TEST_SCOPE_2))
        })
    })

    describe("signDeviceToken", async function () {
        it("should correctly sign a device token", async function () {
            const TEST_DEVICE_URL = "http://localhost/devices/348b5c7e-86f0-4830-bafb-b9d6b00fa434"

            const jwt = await signDeviceToken(TEST_DEVICE_URL, TEST_USER, {
                key: TEST_KEY,
                use: use
            })

            const verfifiedJWT = await jwtVerify(jwt, await importJWK(TEST_KEY.public_key, alg), {
                issuer: config.SECURITY_ISSUER,
                audience: config.SECURITY_AUDIENCE,
            })

            assert(verfifiedJWT.payload.iat && verfifiedJWT.payload.exp)
            assert(verfifiedJWT.payload.exp - verfifiedJWT.payload.iat === 7200)
            assert(verfifiedJWT.payload.url === userUrlFromUsername(TEST_USER.username))
            assert(verfifiedJWT.payload.username === TEST_USER.username)
            assert(verfifiedJWT.payload.device === TEST_DEVICE_URL)
            assert(Array.isArray(verfifiedJWT.payload.scopes))
            assert(verfifiedJWT.payload.scopes.length === 2)
            assert(verfifiedJWT.payload.scopes.includes(TEST_SCOPE_1))
            assert(verfifiedJWT.payload.scopes.includes(TEST_SCOPE_2))
        })
    })

    describe("parseBearerToken", async function () {
        it("should parse a valid token", async function () {
            const TEST_TOKEN = "Token"
            const TEST_AUTHORIZATION = `Bearer ${TEST_TOKEN}`

            const result = parseBearerToken(TEST_AUTHORIZATION)

            assert(result === TEST_TOKEN)
        })

        it("should throw an error if the Authorization parameter is missing", async function () {
            try {
                parseBearerToken()
                fail()
            } catch (error) {
                assert(error instanceof MissingParameterError)
            }

            try {
                parseBearerToken("")
                fail()
            } catch (error) {
                assert(error instanceof MissingParameterError)
            }
        })

        it("should throw an error if the Authorization parameter is malformed", async function () {
            const MALFORMED_AUTHORIZATIONS = [
                "token",
                "Bearer token1 token2"
            ]

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