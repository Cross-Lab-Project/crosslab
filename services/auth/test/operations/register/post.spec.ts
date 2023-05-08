import { roleRepository } from '../../../src/database/repositories/roleRepository'
import { userRepository } from '../../../src/database/repositories/userRepository'
import { postLogin } from '../../../src/operations/login'
import { postRegister } from '../../../src/operations/register'
import { AuthenticationError, RegistrationError } from '../../../src/types/errors'
import { TestData } from '../../data/index.spec'
import { InconsistentDatabaseError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /register', context)

    let userRepositorySaveStub: sinon.SinonStub<
        Parameters<typeof userRepository.save>,
        ReturnType<typeof userRepository.save>
    >
    const originalUserRepositorySave = userRepository.save

    suite.beforeEach(function () {
        userRepositorySaveStub = sinon.stub(userRepository, 'save')
    })

    suite.afterEach(function () {
        userRepositorySaveStub.restore()
    })

    suite.addTest(
        new Mocha.Test('should register the user successfully', async function () {
            const username = 'username'
            const password = 'password'

            userRepositorySaveStub.callsFake(originalUserRepositorySave)

            const result = await postRegister({ username, password })

            assert.strictEqual(result.status, 201)

            const loginResult = await postLogin({ username, password, method: 'local' })
            assert.strictEqual(loginResult.status, 201)
            assert(loginResult.body)
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a RegistrationError if user with the same username already exists',
            async function () {
                const username = testData.users.superadmin.model.username
                const password = 'password'

                userRepositorySaveStub.callsFake(originalUserRepositorySave)

                await assert.rejects(
                    async () => {
                        await postRegister({ username, password })
                    },
                    (error) => {
                        assert(error instanceof RegistrationError)
                        assert.strictEqual(error.status, 400)
                        assert.strictEqual(
                            error.message,
                            'User with the same username already exists'
                        )
                        return true
                    }
                )

                await assert.rejects(
                    async () => {
                        await postLogin({ username, password, method: 'local' })
                    },
                    (error) => {
                        assert(error instanceof AuthenticationError)
                        assert.strictEqual(error.status, 401)
                        assert.strictEqual(error.message, 'Invalid login credentials')
                        return true
                    }
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a RegistrationError if user cannot be saved',
            async function () {
                const username = 'username'
                const password = 'password'
                const saveError = new Error('user could not be saved')

                userRepositorySaveStub.throws(saveError)

                await assert.rejects(
                    async () => {
                        await postRegister({ username, password })
                    },
                    (error) => {
                        assert(error instanceof RegistrationError)
                        assert.strictEqual(error.status, 500)
                        assert.strictEqual(error.message, 'User could not be registered')
                        return true
                    }
                )

                await assert.rejects(
                    async () => {
                        await postLogin({ username, password, method: 'local' })
                    },
                    (error) => {
                        assert(error instanceof AuthenticationError)
                        assert.strictEqual(error.status, 401)
                        assert.strictEqual(error.message, 'Invalid login credentials')
                        return true
                    }
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should throw an InconsistentDatabaseError if the role 'user' is missing in the database",
            async function () {
                const username = 'username'
                const password = 'password'

                userRepositorySaveStub.callsFake(originalUserRepositorySave)

                const roleModelUser = await roleRepository.findOneOrFail({
                    where: {
                        name: 'user',
                    },
                })
                await roleRepository.remove(roleModelUser)

                await assert.rejects(
                    async () => {
                        await postRegister({ username, password })
                    },
                    (error) => {
                        assert(error instanceof InconsistentDatabaseError)
                        assert.strictEqual(error.status, 500)
                        assert.strictEqual(
                            error.message,
                            "Role 'user' is missing in database"
                        )
                        return true
                    }
                )

                await assert.rejects(
                    async () => {
                        await postLogin({ username, password, method: 'local' })
                    },
                    (error) => {
                        assert(error instanceof AuthenticationError)
                        assert.strictEqual(error.status, 401)
                        assert.strictEqual(error.message, 'Invalid login credentials')
                        return true
                    }
                )
            }
        )
    )

    return suite
}
