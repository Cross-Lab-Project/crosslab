import { assert } from 'console'
import {
    getAllowlistedUser,
    parseAllowlist,
    resolveAllowlist,
    resolveAllowlistEntry,
} from '../../src/methods/allowlist'
import { DNSResolveError, MalformedAllowlistError } from '../../src/types/errors'
import { AllowlistEntry } from '../../src/types/types'
import { allowlist } from '../../src/methods/allowlist'
import * as sinon from 'sinon'
import { userRepository } from '../../src/database/repositories/userRepository'
import { MissingEntityError } from '@crosslab/service-common'
import { UserModel } from '../../src/database/model'

export default () =>
    describe('allowlist methods', async function () {
        describe('parseAllowlist', async function () {
            it('should correctly parse a valid allowlist', async function () {
                const validAllowlists = [
                    'url:local:username',
                    'url:local:username,url:tui:username,url:local:username',
                    'url :   local: username , url :tui: username , url : local : username',
                ]

                for (const validAllowlist of validAllowlists) {
                    const parsedAllowlist = parseAllowlist(validAllowlist)
                    const expectedLength = (validAllowlist.match(/,/g) ?? []).length + 1
                    assert(parsedAllowlist.length === expectedLength)
                    for (const entry of parsedAllowlist) {
                        assert(entry.token === 'url')
                        assert(entry.token === 'username')
                    }
                }
            })

            it('should throw an error if the allowlist is malformed', async function () {
                const invalidAllowlists = [
                    'url',
                    'url:',
                    ':username',
                    ':username,',
                    'url:username,',
                    'url:username,url',
                    'url:username,url:',
                    'url:username,:username',
                    'url:username,:username,',
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
            let consoleErrorStub: sinon.SinonStub
            let URL: string
            let IP: string
            let USERNAME: string
            let ALLOWLIST: AllowlistEntry[]

            this.beforeAll(function () {
                findUserStub = sinon.stub(userRepository, 'findOne')
                consoleErrorStub = sinon.stub(console, 'error')
                URL = 'localhost'
                IP = '127.0.0.1'
                USERNAME = 'username'
                ALLOWLIST = [
                    {
                        token: URL,
                        username: USERNAME,
                    },
                ]
            })

            this.afterAll(function () {
                findUserStub.restore()
                consoleErrorStub.restore()
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

                assert(allowlist[IP] === USERNAME)
            })

            it('should log an error if the user could not be found', async function () {
                findUserStub.returns(Promise.resolve(null))

                await resolveAllowlist(ALLOWLIST)

                const lastCall = consoleErrorStub.getCalls().reverse()[0]
                assert(lastCall.args[0] instanceof MissingEntityError)
            })
        })

        describe('resolveAllowlistEntry', async function () {
            let findUserStub: sinon.SinonStub
            let URL: string
            let IP: string
            let USERNAME: string
            let ALLOWLIST_ENTRY: AllowlistEntry

            this.beforeAll(function () {
                findUserStub = sinon.stub(userRepository, 'findOne')
                URL = 'localhost'
                IP = '127.0.0.1'
                USERNAME = 'username'
                ALLOWLIST_ENTRY = {
                    token: URL,
                    username: USERNAME,
                }
            })

            this.afterAll(function () {
                findUserStub.restore()
            })

            it('should correctly resolve the allowlist entries', async function () {
                findUserStub.returns(
                    Promise.resolve({
                        username: USERNAME,
                        roles: [],
                        tokens: [],
                    })
                )

                const result = await resolveAllowlistEntry(ALLOWLIST_ENTRY)

                assert(result[0] === IP)
                assert(result[1] === USERNAME)
            })

            it('should log an error if the DNS lookup fails', async function () {
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

            it('should log an error if the user could not be found', async function () {
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
            let IP: string
            let USERNAME: string

            this.beforeAll(function () {
                findUserStub = sinon.stub(userRepository, 'findOne')
                IP = '127.0.0.1'
                USERNAME = 'username'
            })

            this.afterAll(function () {
                findUserStub.restore()
            })

            it('should correctly return the allowlisted user for the given ip address', async function () {
                allowlist[IP] = USERNAME

                findUserStub.returns(
                    Promise.resolve(<UserModel>{
                        uuid: '0ddfc948-8010-4456-b3d1-aa9109fe63dd',
                        username: USERNAME,
                        roles: [],
                        tokens: [],
                    })
                )

                const result = await getAllowlistedUser(IP)

                assert(result.username === USERNAME)
            })

            it('should throw an error if the ip has no corresponding user', async function () {
                delete allowlist[IP]

                try {
                    await getAllowlistedUser(IP)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                }
            })

            it('should throw an error if the corresponding user is not found', async function () {
                allowlist[IP] = USERNAME

                findUserStub.returns(Promise.resolve(null))

                try {
                    await getAllowlistedUser(IP)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                }
            })
        })
    })
