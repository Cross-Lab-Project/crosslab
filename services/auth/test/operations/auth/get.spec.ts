import {
    MissingEntityError,
    MalformedParameterError,
    InconsistentDatabaseError,
} from '@crosslab/service-common'
import assert, { fail } from 'assert'
import { createLocalJWKSet, jwtVerify } from 'jose'
import { config } from '../../../src/config'
import { AppDataSource } from '../../../src/database/dataSource'
import { jwk } from '../../../src/methods/key'
import { ActiveKeyModel, TokenModel, UserModel } from '../../../src/database/model'
import { getAuth } from '../../../src/operations/auth'
import { ExpiredError } from '../../../src/types/errors'
import { TestData } from '../../data/index.spec'
import * as sinon from 'sinon'
import { tokenRepository } from '../../../src/database/repositories/tokenRepository'
import Mocha from 'mocha'
import { userUrlFromId } from '../../../src/methods/utils'

async function JWTVerify(authorization: string, scopes: string[]) {
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const activeKey = (
        await activeKeyRepository.find({
            relations: {
                key: true,
            },
        })
    )[0]
    const jwks = { keys: [jwk(activeKey.key)] }

    const authorization_header = authorization
    if (authorization_header === undefined) {
        throw new Error('Authorization header is not set')
    }

    const bearerTokenResult = /^Bearer (.*)$/.exec(authorization_header)
    if (bearerTokenResult === null || bearerTokenResult.length != 2) {
        throw new Error('Authorization header is malformed')
    }

    const jwt = bearerTokenResult[1]
    if (!jwt) throw new Error('No JWT provided')
    if (!config.SECURITY_ISSUER) throw new Error('No security issuer specified')

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

async function checkJWTByTokenModel(authorization: string, token: TokenModel) {
    for (const scope of token.scopes) {
        const payload = await JWTVerify(authorization, [scope.name])
        assert((payload as any).url === userUrlFromId(token.user.uuid))
        assert((payload as any).username === token.user.username)

        for (const _scope of token.scopes) {
            assert((payload as any).scopes.includes(_scope.name))
        }
        for (const _scope of (payload as any).scopes) {
            assert(token.scopes.find((s) => s.name === _scope))
        }
    }
}

async function checkJWTByUserModel(authorization: string, user: UserModel) {
    const scopes = user.roles.flatMap((role) => role.scopes)
    for (const scope of scopes) {
        const payload = await JWTVerify(authorization, [scope.name])
        assert((payload as any).url === userUrlFromId(user.uuid))
        assert((payload as any).username === user.username)

        for (const _scope of scopes) {
            assert((payload as any).scopes.includes(_scope.name))
        }
        for (const _scope of (payload as any).scopes) {
            assert(scopes.find((s) => s.name === _scope))
        }
    }
}

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /auth', context)
    let expiredToken: string
    let invalidToken: string
    let validDeviceToken: string
    let validUserToken: string
    let allowlistedIP: string

    suite.beforeAll(function () {
        expiredToken = testData.tokens['GET /auth expired token'].model.token
        invalidToken = 'invalid'
        validDeviceToken = testData.tokens['GET /auth valid device token'].model.token
        validUserToken = testData.tokens['GET /auth valid user token'].model.token
        allowlistedIP = '127.0.0.1'
    })

    suite.addTest(
        new Mocha.Test(
            'should authenticate a non-allowlisted user with a valid token',
            async function () {
                const result = await getAuth({
                    Authorization: `Bearer ${validUserToken}`,
                })
                assert(result.status === 200)
                assert(result.headers.Authorization)
                await checkJWTByTokenModel(
                    result.headers.Authorization,
                    testData.tokens['GET /auth valid user token'].model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not authenticate a non-allowlisted user with an invalid token',
            async function () {
                try {
                    await getAuth({
                        Authorization: `Bearer ${invalidToken}`,
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should return status 200 with empty headers for non-allowlisted user without an 'Authorization'-header",
            async function () {
                const result = await getAuth({})
                assert(result.status === 200)
                assert(!result.headers.Authorization)
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not authenticate a non-allowlisted user with an expired token',
            async function () {
                try {
                    await getAuth({
                        Authorization: `Bearer ${expiredToken}`,
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof ExpiredError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should not authenticate a non-allowlisted user with a malformed 'Authorization'-header",
            async function () {
                const malformedAuthorizationHeaders = [
                    'malformed',
                    'Bearer Token Other',
                    'BearerToken',
                    'bearer token',
                ]

                for (const malformedAuthorizationHeader of malformedAuthorizationHeaders) {
                    try {
                        await getAuth({
                            Authorization: malformedAuthorizationHeader,
                        })
                        assert(false)
                    } catch (error) {
                        assert(error instanceof MalformedParameterError)
                        assert(error.status === 401)
                    }
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not authenticate a non-allowlisted user with an empty token',
            async function () {
                try {
                    await getAuth({
                        Authorization: `Bearer `,
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should authenticate an allowlisted user without an 'Authorization'-header",
            async function () {
                const result = await getAuth({
                    'X-Real-IP': allowlistedIP,
                })
                assert(result.status === 200)
                assert(result.headers.Authorization)
                await checkJWTByUserModel(
                    result.headers.Authorization,
                    testData.users.superadmin.model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should authenticate the user associated with the provided valid token instead of the allowlisted user',
            async function () {
                const result = await getAuth({
                    'Authorization': `Bearer ${validUserToken}`,
                    'X-Real-IP': allowlistedIP,
                })
                assert(result.status === 200)
                assert(result.headers.Authorization)
                await checkJWTByTokenModel(
                    result.headers.Authorization,
                    testData.tokens['GET /auth valid user token'].model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should authenticate the allowlisted user even if the provided token is invalid',
            async function () {
                const result = await getAuth({
                    'Authorization': `Bearer ${invalidToken}`,
                    'X-Real-IP': allowlistedIP,
                })
                assert(result.status === 200)
                assert(result.headers.Authorization)
                await checkJWTByUserModel(
                    result.headers.Authorization,
                    testData.users.superadmin.model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should authenticate the allowlisted user even if the provided token is expired',
            async function () {
                const result = await getAuth({
                    'Authorization': `Bearer ${expiredToken}`,
                    'X-Real-IP': allowlistedIP,
                })
                assert(result.status === 200)
                assert(result.headers.Authorization)
                await checkJWTByUserModel(
                    result.headers.Authorization,
                    testData.users.superadmin.model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw an InconsistentDatabaseError if no user is associated with the found token',
            async function () {
                const tokenRepositoryFindOneOrFailStub = sinon.stub(
                    tokenRepository,
                    'findOneOrFail'
                )
                tokenRepositoryFindOneOrFailStub.resolves({
                    token: 'a6afe72e-d609-4323-aeec-b56d09a6fee7',
                    scopes: [],
                    user: undefined as any,
                })

                try {
                    await getAuth({
                        Authorization: `Bearer ${validUserToken}`,
                    })
                    fail()
                } catch (error) {
                    tokenRepositoryFindOneOrFailStub.restore()
                    assert(error instanceof InconsistentDatabaseError)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should authenticate a non-allowlisted device with a valid device token',
            async function () {
                const result = await getAuth({
                    Authorization: `Bearer ${validDeviceToken}`,
                })
                assert(result.status === 200)
                assert(result.headers.Authorization)
                await checkJWTByTokenModel(
                    result.headers.Authorization,
                    testData.tokens['GET /auth valid device token'].model
                )
            }
        )
    )

    return suite
}
