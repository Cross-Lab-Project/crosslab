import { TokenModel, UserModel } from '../../src/database/model'
import { roleRepository } from '../../src/database/repositories/roleRepository'
import { tokenRepository } from '../../src/database/repositories/tokenRepository'
import { userRepository } from '../../src/database/repositories/userRepository'
import { loginLocal, loginTui } from '../../src/methods/login'
import {
    AuthenticationError,
    LdapAuthenticationError,
    LdapBindError,
    LdapError,
} from '../../src/types/errors'
import assert, { fail } from 'assert'
import { hash } from 'bcryptjs'
import { Client as LdapClient } from 'ldapts'
import rewire from 'rewire'
import * as sinon from 'sinon'

export default () =>
    describe('login methods', async function () {
        describe('createUserToken', async function () {
            let tokenRepositoryCreateStub: sinon.SinonStub<
                Parameters<typeof tokenRepository.create>,
                ReturnType<typeof tokenRepository.create>
            >
            let userRepositorySaveStub: sinon.SinonStub<
                Parameters<typeof userRepository.save>,
                ReturnType<typeof userRepository.save>
            >

            this.beforeAll(function () {
                tokenRepositoryCreateStub = sinon.stub(tokenRepository, 'create')
                userRepositorySaveStub = sinon.stub(userRepository, 'save')
            })

            this.afterAll(function () {
                tokenRepositoryCreateStub.restore()
                userRepositorySaveStub.restore()
            })

            it('should create a user token correctly', async function () {
                const USER: UserModel = {
                    uuid: 'e317fdff-14e8-447b-89f3-799d0773509c',
                    username: 'username',
                    roles: [],
                    tokens: [],
                }
                const TOKEN: TokenModel = {
                    user: USER,
                    scopes: [],
                    token: 'token',
                    roles: [],
                }

                tokenRepositoryCreateStub.resolves(TOKEN)

                const loginModule = rewire('../../src/methods/login')

                const result = await loginModule.__get__('createUserToken')(USER)

                assert(result.user === USER)
                assert(USER.tokens.length === 1)
                assert(USER.tokens[0] === TOKEN)
                assert(userRepositorySaveStub.called)
            })

            it('should load the tokens of the user correctly', async function () {
                const USER: UserModel = {
                    uuid: '160b23b0-2446-44c9-b629-2f58ebfd43d6',
                    username: 'username',
                    roles: [],
                    tokens: [],
                }
                const TOKEN = {
                    user: USER,
                    scopes: [],
                    token: 'token',
                }

                tokenRepositoryCreateStub.resolves(TOKEN as any)

                const loginModule = rewire('../../src/methods/login')

                const result = await loginModule.__get__('createUserToken')(USER)

                assert(result.user === USER)
                assert((USER as any).tokens.length === 1)
                assert((USER as any).tokens[0] === TOKEN)
                assert(userRepositorySaveStub.called)
            })
        })

        describe('createUserTUI', async function () {
            let userRepositoryCreateStub: sinon.SinonStub<
                Parameters<typeof userRepository.create>,
                ReturnType<typeof userRepository.create>
            >
            let userRepositorySaveStub: sinon.SinonStub<
                Parameters<typeof userRepository.save>,
                ReturnType<typeof userRepository.save>
            >
            let roleRepositoryFindOneOrFailStub: sinon.SinonStub<
                Parameters<typeof roleRepository.findOneOrFail>,
                ReturnType<typeof roleRepository.findOneOrFail>
            >

            this.beforeAll(function () {
                userRepositoryCreateStub = sinon.stub(userRepository, 'create')
                userRepositorySaveStub = sinon.stub(userRepository, 'save')
                roleRepositoryFindOneOrFailStub = sinon.stub(
                    roleRepository,
                    'findOneOrFail'
                )
            })

            this.afterAll(function () {
                userRepositoryCreateStub.restore()
                userRepositorySaveStub.restore()
                roleRepositoryFindOneOrFailStub.restore()
            })

            it('should create a tui user correctly', async function () {
                const USERNAME = 'username'
                const USER: UserModel = {
                    uuid: 'fbdd1a75-c92e-495d-883a-b771b6e95577',
                    username: 'tui:' + USERNAME,
                    roles: [],
                    tokens: [],
                }

                userRepositoryCreateStub.resolves(USER)

                const loginModule = rewire('../../src/methods/login')

                const result = await loginModule.__get__('createUserTUI')(USERNAME)

                assert(result === USER)
                assert(userRepositorySaveStub.called)
            })
        })

        describe('loginTui', async function () {
            let USERNAME: string
            let PASSWORD: string
            let ldapClientBindStub: sinon.SinonStub<
                Parameters<typeof LdapClient.prototype.bind>,
                ReturnType<typeof LdapClient.prototype.bind>
            >
            let ldapClientSearchStub: sinon.SinonStub<
                Parameters<typeof LdapClient.prototype.search>,
                ReturnType<typeof LdapClient.prototype.search>
            >
            let userRepositoryFindOneStub: sinon.SinonStub<
                Parameters<typeof userRepository.findOne>,
                ReturnType<typeof userRepository.findOne>
            >
            let createUserTUIStub: sinon.SinonStub<[username: string], Promise<UserModel>>
            let createUserTokenStub: sinon.SinonStub<
                [userModel: UserModel, expiresIn: number],
                Promise<TokenModel>
            >

            this.beforeAll(function () {
                USERNAME = 'username'
                PASSWORD = 'password'
                ldapClientBindStub = sinon.stub(LdapClient.prototype, 'bind')
                ldapClientSearchStub = sinon.stub(LdapClient.prototype, 'search')
                userRepositoryFindOneStub = sinon.stub(userRepository, 'findOne')
                createUserTUIStub = sinon.stub()
                createUserTokenStub = sinon.stub()
            })

            this.afterAll(function () {
                ldapClientBindStub.restore()
                ldapClientSearchStub.restore()
                userRepositoryFindOneStub.restore()
            })

            this.afterEach(function () {
                createUserTUIStub.resetHistory()
                createUserTokenStub.resetHistory()
            })

            it('should login with tui account with correct credentials', async function () {
                const loginModule = rewire('../../src/methods/login')
                const innerCreateUserTokenStub = sinon.stub()

                ldapClientBindStub.resolves()
                ldapClientSearchStub.resolves({
                    searchEntries: [
                        {
                            dn: 'test',
                        },
                    ],
                    searchReferences: [],
                })
                userRepositoryFindOneStub.returns(
                    Promise.resolve({
                        uuid: '75f565d6-8eb0-42f3-be07-efc02a907daa',
                        username: USERNAME,
                        roles: [],
                        tokens: [],
                    })
                )

                await loginModule.__with__({
                    createUserToken: innerCreateUserTokenStub,
                })(async function () {
                    await loginModule.__get__('loginTui')(USERNAME, PASSWORD)
                    assert(
                        innerCreateUserTokenStub.lastCall.args[0].username === USERNAME
                    )
                })
            })

            it('should create a new account if none exists', async function () {
                const loginModule = rewire('../../src/methods/login')

                ldapClientBindStub.resolves()
                ldapClientSearchStub.resolves({
                    searchEntries: [
                        {
                            dn: 'test',
                        },
                    ],
                    searchReferences: [],
                })
                userRepositoryFindOneStub.resolves(null)
                createUserTUIStub.resolves({
                    uuid: 'd1ded2f7-45c9-4e5f-8c7c-378a2e10ee62',
                    username: 'tui:' + USERNAME,
                    roles: [],
                    tokens: [],
                })

                await loginModule.__with__({
                    createUserTUI: createUserTUIStub,
                    createUserToken: createUserTokenStub,
                })(async function () {
                    await loginModule.__get__('loginTui')(USERNAME, PASSWORD)
                    assert(
                        createUserTokenStub.lastCall.args[0].username ===
                            'tui:' + USERNAME
                    )
                    assert(createUserTUIStub.calledWith(USERNAME))
                })
            })

            it('should throw an LdapAuthenticationError if bind fails with error code 49', async function () {
                ldapClientBindStub.rejects({ code: 49 })

                try {
                    await loginTui(USERNAME, PASSWORD)
                    fail()
                } catch (error) {
                    assert(error instanceof LdapAuthenticationError)
                }
            })

            it('should throw an LdapBindError if bind fails and the cause is unknown', async function () {
                ldapClientBindStub.rejects()

                try {
                    await loginTui(USERNAME, PASSWORD)
                    fail()
                } catch (error) {
                    assert(error instanceof LdapBindError)
                }
            })

            it('should throw an LdapError if search returns no entries', async function () {
                ldapClientBindStub.resolves()
                ldapClientSearchStub.resolves({
                    searchEntries: [],
                    searchReferences: [],
                })

                try {
                    await loginTui(USERNAME, PASSWORD)
                    fail()
                } catch (error) {
                    assert(error instanceof LdapError)
                }
            })
        })

        describe('loginLocal', async function () {
            let USERNAME: string
            let PASSWORD: string
            let HASHED_PASSWORD: string
            let INVALID_PASSWORD: string
            let userRepositoryFindOneStub: sinon.SinonStub<
                Parameters<typeof userRepository.findOne>,
                ReturnType<typeof userRepository.findOne>
            >
            let createUserTokenStub: sinon.SinonStub<
                [userModel: UserModel, expiresIn: number],
                Promise<TokenModel>
            >

            this.beforeAll(async function () {
                USERNAME = 'username'
                PASSWORD = 'password'
                HASHED_PASSWORD = await hash(PASSWORD, 10)
                INVALID_PASSWORD = 'invalid'
                userRepositoryFindOneStub = sinon.stub(userRepository, 'findOne')
                createUserTokenStub = sinon.stub()
            })

            this.afterAll(function () {
                userRepositoryFindOneStub.restore()
            })

            this.afterEach(function () {
                createUserTokenStub.resetHistory()
            })

            it('should login with local account with correct credentials', async function () {
                userRepositoryFindOneStub.resolves({
                    uuid: '29e51332-8d29-4add-b068-18e8eb863598',
                    username: USERNAME,
                    roles: [],
                    tokens: [],
                    password: HASHED_PASSWORD,
                })

                const loginModule = rewire('../../src/methods/login')

                await loginModule.__with__({
                    createUserToken: createUserTokenStub,
                })(async function () {
                    await loginModule.__get__('loginLocal')(USERNAME, PASSWORD)
                    assert(createUserTokenStub.called)
                })
            })

            it('should throw an AuthenticationError if no user with the given username exists', async function () {
                userRepositoryFindOneStub.resolves(null)

                try {
                    await loginLocal(USERNAME, PASSWORD)
                    fail()
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                }
            })

            it('should throw an AuthenticationError if the provided password is incorrect', async function () {
                userRepositoryFindOneStub.resolves({
                    uuid: '848ed2ba-a6bc-4145-899a-848181a541a1',
                    username: USERNAME,
                    roles: [],
                    tokens: [],
                    password: HASHED_PASSWORD,
                })

                try {
                    await loginLocal(USERNAME, INVALID_PASSWORD)
                    fail()
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                }
            })

            it('should throw an AuthenticationError if the user cannot be logged in via username and password', async function () {
                userRepositoryFindOneStub.resolves({
                    uuid: '962356be-597c-4c4e-9e53-a3c81a5dab1a',
                    username: USERNAME,
                    roles: [],
                    tokens: [],
                    password: undefined,
                })

                try {
                    await loginLocal(USERNAME, INVALID_PASSWORD)
                    fail()
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                }
            })
        })
    })
