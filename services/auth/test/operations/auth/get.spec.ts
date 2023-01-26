import { MissingEntityError, MalformedParameterError } from "@crosslab/service-common"
import assert from "assert"
import { createLocalJWKSet, jwtVerify } from "jose"
import { config } from "../../../src/config"
import { AppDataSource } from "../../../src/database/dataSource"
import { jwk } from "../../../src/methods/key"
import { ActiveKeyModel } from "../../../src/database/model"
import { getAuth } from "../../../src/operations"
import { ExpiredError } from "../../../src/types/errors"
import { TestData } from "../../data/index.spec"

async function JWTVerify(authorization: string, scopes: string[]) {
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const activeKey = (await activeKeyRepository.find({
        relations: {
            key: true
        }
    }))[0]
    const jwks = { keys: [jwk(activeKey.key)] }

    const authorization_header = authorization
    if (authorization_header === undefined) {
        throw new Error("Authorization header is not set")
    }

    const bearerTokenResult = /^Bearer (.*)$/.exec(authorization_header);
    if (bearerTokenResult === null || bearerTokenResult.length != 2) {
        throw new Error("Authorization header is malformed")
    }

    const jwt = bearerTokenResult[1]
    if (!jwt) throw new Error('No JWT provided')
    if (!config.SECURITY_ISSUER)
        throw new Error('No security issuer specified')

    const JWKS = createLocalJWKSet(jwks)
    const jwtVerifyResult = await jwtVerify(jwt, JWKS, {
        issuer: config.SECURITY_ISSUER,
        audience: config.SECURITY_AUDIENCE,
    })
    
    const user = jwtVerifyResult.payload
    if (!user.scopes || !Array.isArray(user.scopes))
        throw new Error('Payload is malformed')
    for (const scope of scopes) {
        if ((user.scopes as Array<any>).includes(scope)) {
            return user
        }
    }
    throw new Error('Missing Scope: one of ' + scopes)
}

async function checkJWT(authorization: string) {
    const payload = await JWTVerify(authorization, ["test scope 1"])
    assert((payload as any).username === "superadmin")
    assert((payload as any).scopes.includes("test scope 1"))
    assert((payload as any).url === `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/superadmin`)
}

export default (testData: TestData) => describe("GET /auth", function () {
    let validToken: string
    let invalidToken: string
    let expiredToken: string
    const allowlistedIP = "127.0.0.1"

    this.beforeEach(async function () {
        validToken = (await testData.users.superadmin.model.tokens)[0].token
        expiredToken = (await testData.users.superadmin.model.tokens)[2].token
        invalidToken = "invalid"
    })

    describe("non-allowlisted users", function () {
        it("should authenticate a non-allowlisted user with a valid token", async function () {
            const result = await getAuth({
                Authorization: `Bearer ${validToken}`
            })
            assert(result.status === 200)
            assert(result.headers.Authorization)
            // TODO: check that correct user was authenticated
        })
    
        it("should not authenticate a non-allowlisted user with an invalid token", async function () {
            try {
                await getAuth({
                    Authorization: `Bearer ${invalidToken}`
                })
                assert(false)
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 401)
            }
        })
    
        it("should return status 200 with empty headers for non-allowlisted user without an 'Authorization'-header", async function () {
            const result = await getAuth({})
            assert(result.status === 200)
            assert(!result.headers.Authorization)
        })

        it ("should not authenticate a non-allowlisted user with an expired token", async function () {
            try {
                await getAuth({
                    Authorization: `Bearer ${expiredToken}`
                })
                assert(false)
            } catch (error) {
                assert(error instanceof ExpiredError)
                assert(error.status === 401)
            }
        })
    
        it("should not authenticate a non-allowlisted user with a malformed 'Authorization'-header", async function () {
            const malformedAuthorizationHeaders = [
                "malformed",
                "Bearer Token Other",
                "BearerToken",
                "bearer token"
            ]
            
            for (const malformedAuthorizationHeader of malformedAuthorizationHeaders) {
                try {
                    await getAuth({
                        Authorization: malformedAuthorizationHeader
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof MalformedParameterError)
                    assert(error.status === 401)
                }
            }
        })

        it("should not authenticate a non-allowlisted user with an empty token", async function () {
            try {
                await getAuth({
                    Authorization: `Bearer `
                })
                assert(false)
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 401)
            }
        })
    })

    describe("allowlisted users", function () {
        it("should authenticate an allowlisted user without an 'Authorization'-header", async function () {
            const result = await getAuth({
                "X-Real-IP": allowlistedIP
            })
            assert(result.status === 200)
            assert(result.headers.Authorization)
            await checkJWT(result.headers.Authorization)
        })

        it("should authenticate the user associated with the provided valid token instead of the allowlisted user", async function () {
            const result = await getAuth({
                Authorization: `Bearer ${validToken}`,
                "X-Real-IP": allowlistedIP
            })
            assert(result.status === 200)
            assert(result.headers.Authorization)
            await checkJWT(result.headers.Authorization)
        })

        it("should authenticate the allowlisted user even if the provided token is invalid", async function () {
            const result = await getAuth({
                Authorization: `Bearer ${invalidToken}`,
                "X-Real-IP": allowlistedIP
            })
            assert(result.status === 200)
            assert(result.headers.Authorization)
            await checkJWT(result.headers.Authorization)
        })

        it("should authenticate the allowlisted user even if the provided token is expired", async function () {
            const result = await getAuth({
                Authorization: `Bearer ${expiredToken}`,
                "X-Real-IP": allowlistedIP
            })
            assert(result.status === 200)
            assert(result.headers.Authorization)
            await checkJWT(result.headers.Authorization)
        })
    })
})