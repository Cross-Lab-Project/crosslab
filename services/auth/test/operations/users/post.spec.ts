import { userRepository } from '../../../src/database/repositories/userRepository'
import { User } from '../../../src/generated/types'
import { postLogin } from '../../../src/operations/login'
import { postUsers } from '../../../src/operations/users'
import { AuthenticationError, RegistrationError } from '../../../src/types/errors'
import { TestData } from '../../data/index.spec'
import { userRepositoryTestSuite } from '../../database/repositories/userRepository.spec'
import assert from 'assert'
import { compareSync } from 'bcryptjs'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /users', context)

    suite.addTest(
        new Mocha.Test('should correctly add a new valid user', async function () {
            const user: User<'request'> = {
                username: 'postusersuser',
                password: '78hf4quionc',
            }

            const result = await postUsers(user, testData.userData)

            const userModel = await userRepository.findOne({
                where: {
                    username: `local:${user.username}`,
                },
            })
            assert(userModel)
            assert(userModel.password)
            assert(compareSync(user.password, userModel.password))

            assert(result.status === 201)
            assert(userRepositoryTestSuite.validateFormat(userModel, result.body))
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a RegistrationError if user with the same username already exists',
            async function () {
                const username = testData.users.superadmin.request.username
                const password = 'password'

                await assert.rejects(
                    async () => {
                        await postUsers({ username, password }, testData.userData)
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

    return suite
}
