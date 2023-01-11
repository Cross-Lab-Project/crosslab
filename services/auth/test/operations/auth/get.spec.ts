import { MissingEntityError, MissingParameterError, MalformedParameterError } from "@crosslab/service-common"
import assert from "assert"
import { createLocalJWKSet, jwtVerify } from "jose"
import { config } from "../../../src/config"
import { AppDataSource } from "../../../src/database/data_source"
import { jwk } from "../../../src/methods/utils"
import { ActiveKeyModel } from "../../../src/database/model"
import { getAuth } from "../../../src/operations"
import { ExpiredError } from "../../../src/types/errors"

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
    const payload = await JWTVerify(authorization, ["test scope"])
    assert((payload as any).username === "username")
    assert((payload as any).scopes.includes("test scope"))
    assert((payload as any).url === `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/username`)
}

export default () => describe("GET /auth", async function () {
    const validToken = "valid"
    const invalidToken = "invalid"
    const expiredToken = "expired"
    const allowlistedIP = "127.0.0.1"

    describe("non-allowlisted users", async function () {
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
    
        it("should not authenticate a non-allowlisted user without an 'Authorization'-header", async function () {
            try {
                await getAuth({})
                assert(false)
            } catch (error) {
                assert(error instanceof MissingParameterError)
                assert(error.status === 401)
            }
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

    describe("allowlisted users", async function () {
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