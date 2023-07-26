import { repositories } from '../../src/database/dataSource'
import { UserModel } from '../../src/database/model'
import {
    getAllowlistedUser,
    parseAllowlist,
    resolveAllowlist,
    resolveAllowlistEntry,
} from '../../src/methods/allowlist'
import { allowlist } from '../../src/methods/allowlist'
import { DNSResolveError, MalformedAllowlistError } from '../../src/types/errors'
import { AllowlistEntry } from '../../src/types/types'
import { MissingEntityError, logger } from '@crosslab/service-common'
import assert from 'assert'
import * as sinon from 'sinon'

export default () =>
    describe('allowlist methods', async function () {
        describe('parseAllowlist', async function () {
            it('should correctly parse a valid allowlist', async function () {
                const validAllowlists = [
                    'token:local:username',
                    'token:local:username,token:local:username,token:local:username',
                    'token :   local: username , token :local: username , token : local : username',
                ]

                for (const validAllowlist of validAllowlists) {
                    const parsedAllowlist = parseAllowlist(validAllowlist)
                    const expectedLength = (validAllowlist.match(/,/g) ?? []).length + 1
                    assert(parsedAllowlist.length === expectedLength)
                    for (const entry of parsedAllowlist) {
                        assert(entry.token === 'token')
                        assert(entry.username === 'local:username')
                    }
                }
            })

            it('should throw an error if the allowlist is malformed', async function () {
                const invalidAllowlists = [
                    'token',
                    'token:',
                    ':username',
                    ':username,',
                    'token:username,',
                    'token:username,token',
                    'token:username,token:',
                    'token:username,:username',
                    'token:username,:username,',
                ]

                for (const invalidAllowlist of invalidAllowlists) {
                    try {
                        parseAllowlist(invalidAllowlist)
                    } catch (error) {
                        assert(error instanceof MalformedAllowlistError)
                    }
                }
            })
        })

        describe('resolveAllowlist', async function () {
            let findUserStub: sinon.SinonStub
            let loggerLogStub: sinon.SinonStub
            let TOKEN: string
            let USERNAME: string
            let ALLOWLIST: AllowlistEntry[]

            this.beforeAll(function () {
                findUserStub = sinon.stub(repositories.user, 'findOne')
                loggerLogStub = sinon.stub(logger, 'log')
                TOKEN = 'test-token'
                USERNAME = 'username'
                ALLOWLIST = [
                    {
                        token: TOKEN,
                        username: USERNAME,
                    },
                ]
            })

            this.afterAll(function () {
                findUserStub.restore()
                loggerLogStub.restore()
            })

            it('should correctly resolve the allowlist entries', async function () {
                findUserStub.returns(
                    Promise.resolve(<UserModel>{
                        uuid: '9a02ad29-567d-45c6-8dc2-5d0c1812a739',
                        username: USERNAME,
                        roles: [],
                        tokens: [],
                    })
                )

                await resolveAllowlist(ALLOWLIST)

                assert(allowlist[TOKEN] === USERNAME)
            })

            it('should log an error if the user could not be found', async function () {
                findUserStub.returns(Promise.resolve(null))

                await resolveAllowlist(ALLOWLIST)

                const lastCall = loggerLogStub.getCalls().reverse()[0]
                assert(lastCall.args[0] === 'error')
                assert(lastCall.args[2].data.error instanceof MissingEntityError)
            })
        })

        describe('resolveAllowlistEntry', async function () {
            let findUserStub: sinon.SinonStub
            let TOKEN: string
            let USERNAME: string
            let ALLOWLIST_ENTRY: AllowlistEntry

            this.beforeAll(function () {
                findUserStub = sinon.stub(repositories.user, 'findOne')
                TOKEN = 'test-token'
                USERNAME = 'username'
                ALLOWLIST_ENTRY = {
                    token: TOKEN,
                    username: USERNAME,
                }
            })

            this.afterAll(function () {
                findUserStub.restore()
            })

            it('should correctly resolve the allowlist entry', async function () {
                findUserStub.returns(
                    Promise.resolve({
                        username: USERNAME,
                        roles: [],
                        tokens: [],
                    })
                )

                const result = await resolveAllowlistEntry(ALLOWLIST_ENTRY)

                assert(result[0] === TOKEN)
                assert(result[1] === USERNAME)
            })

            it('should throw an error if the DNS lookup fails', async function () {
                const INVALID_ALLOWLIST_ENTRY: AllowlistEntry = {
                    token: '...',
                    username: USERNAME,
                }

                try {
                    await resolveAllowlistEntry(INVALID_ALLOWLIST_ENTRY)
                } catch (error) {
                    assert(error instanceof DNSResolveError)
                }
            })

            it('should throw an error if the user could not be found', async function () {
                findUserStub.returns(Promise.resolve(null))

                try {
                    await resolveAllowlistEntry(ALLOWLIST_ENTRY)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                }
            })
        })

        describe('getAllowlistedUser', async function () {
            let findUserStub: sinon.SinonStub
            let TOKEN: string
            let USERNAME: string

            this.beforeAll(function () {
                findUserStub = sinon.stub(repositories.user, 'findOne')
                TOKEN = 'test-token'
                USERNAME = 'username'
            })

            this.afterAll(function () {
                findUserStub.restore()
            })

            it('should correctly return the allowlisted user for the given ip address', async function () {
                allowlist[TOKEN] = USERNAME

                findUserStub.returns(
                    Promise.resolve(<UserModel>{
                        uuid: '0ddfc948-8010-4456-b3d1-aa9109fe63dd',
                        username: USERNAME,
                        roles: [],
                        tokens: [],
                    })
                )

                const result = await getAllowlistedUser(TOKEN)

                assert(result.username === USERNAME)
            })

            it('should throw an error if the ip has no corresponding user', async function () {
                delete allowlist[TOKEN]

                try {
                    await getAllowlistedUser(TOKEN)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                }
            })

            it('should throw an error if the corresponding user is not found', async function () {
                allowlist[TOKEN] = USERNAME

                findUserStub.returns(Promise.resolve(null))

                try {
                    await getAllowlistedUser(TOKEN)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                }
            })
        })
    })
