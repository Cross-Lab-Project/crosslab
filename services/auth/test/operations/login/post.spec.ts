import { repositories } from '../../../src/database/dataSource'
import * as loginMethods from '../../../src/methods/login'
import { postLogin } from '../../../src/operations/login'
import { AuthenticationError, LdapAuthenticationError } from '../../../src/types/errors'
import { TestData } from '../../data/index.spec'
import assert from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /login', context)

    let loginTuiStub: sinon.SinonStub<
        Parameters<typeof loginMethods.loginTui>,
        ReturnType<typeof loginMethods.loginTui>
    >

    suite.afterEach(function () {
        if (loginTuiStub) {
            loginTuiStub.restore()
        }
    })

    suite.addTest(
        new Mocha.Test(
            'should login the local test user successfully',
            async function () {
                const result = await postLogin({
                    username: testData.users.superadmin.request.username!,
                    password: testData.users.superadmin.request.password!,
                    method: 'local',
                })
                assert(result.status === 201)
                assert(result.body)

                const userModel = await repositories.user.findOneOrFail({
                    where: {
                        username: testData.users.superadmin.model.username,
                    },
                    relations: {
                        tokens: true,
                    },
                })
                assert(userModel.tokens.find((token) => token.token === result.body))
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not login a local user with wrong username',
            async function () {
                try {
                    await postLogin({
                        username: 'wrong',
                        password: testData.users.superadmin.request.password!,
                        method: 'local',
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not login a local user with wrong password',
            async function () {
                try {
                    await postLogin({
                        username: testData.users.superadmin.request.username!,
                        password: 'wrong',
                        method: 'local',
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                    assert(error.status === 401)
                }
            }
        )
    )

    // TODO: test tui authentication
    // TODO: test empty password handling

    suite.addTest(
        new Mocha.Test('should login using loginTui', async function () {
            loginTuiStub = sinon.stub(loginMethods, 'loginTui')
            loginTuiStub.resolves({
                token: '13a0e1be-3181-415b-962f-dc14be2dc633',
                scopes: [],
                user: testData.users.superadmin.model,
                roles: [],
            })

            const result = await postLogin({
                username: 'tui',
                password: 'tui',
                method: 'tui',
            })

            assert(result.status === 201)
            assert(result.body === '13a0e1be-3181-415b-962f-dc14be2dc633')
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should convert an LdapAuthenticationError to an AuthenticationError',
            async function () {
                loginTuiStub = sinon.stub(loginMethods, 'loginTui')
                loginTuiStub.throws(new LdapAuthenticationError('Test Error', 500))

                try {
                    await postLogin({
                        username: 'tui',
                        password: 'tui',
                        method: 'tui',
                    })
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw an AuthenticationError when the returned token model is undefined',
            async function () {
                loginTuiStub = sinon.stub(loginMethods, 'loginTui')
                loginTuiStub.resolves(undefined)

                try {
                    await postLogin({
                        username: 'tui',
                        password: 'tui',
                        method: 'tui',
                    })
                } catch (error) {
                    assert(error instanceof AuthenticationError)
                    assert(error.status === 401)
                }
            }
        )
    )

    return suite
}
