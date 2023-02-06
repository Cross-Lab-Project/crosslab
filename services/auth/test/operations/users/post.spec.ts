import assert, { fail } from 'assert'
import Mocha from 'mocha'
import { config } from '../../../src/config'
import { userRepository } from '../../../src/database/repositories/userRepository'
import { postUsers } from '../../../src/operations'
import { TestData } from '../../data/index.spec'
import { userRepositoryTestSuite } from '../../database/repositories/userRepository.spec'

export default function (context: Mocha.Context, _testData: TestData) {
    const suite = new Mocha.Suite('POST /users', context)

    suite.addTest(
        new Mocha.Test(
            'should correctly add a new valid user',
            async function () {
                const user: Parameters<typeof postUsers>[0] = {
                    username: "postusersuser",
                    password: "78hf4quionc"
                }

                const result = await postUsers(user,{})

                assert(result.status === 201)
                assert(result.body.username === user.username)
                assert(result.body.url === `${config.BASE_URL}${
                        config.BASE_URL.endsWith('/') ? '' : '/'
                    }users/${user.username}`)


                const userModel = await userRepository.findOne({
                    where: {
                        username: user.username
                    }
                })
                assert(userModel)
                assert(userRepositoryTestSuite.validateCreate(userModel, user))
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not allow a user to create new user with higher privileges',
            async function () {
                fail('NOT IMPLEMENTED')
            }
        )
    )

    return suite
}
