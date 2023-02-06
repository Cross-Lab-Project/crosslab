import assert from 'assert'
import Mocha from 'mocha'
import { userRepository } from '../../../src/database/repositories/userRepository'
import { UserInit } from '../../../src/generated/types'
import { postUsers } from '../../../src/operations'
import { TestData } from '../../data/index.spec'
import { userRepositoryTestSuite } from '../../database/repositories/userRepository.spec'

export default function (context: Mocha.Context, _testData: TestData) {
    const suite = new Mocha.Suite('POST /users', context)

    suite.addTest(
        new Mocha.Test('should correctly add a new valid user', async function () {
            const user: UserInit<'request'> = {
                username: 'postusersuser',
                password: '78hf4quionc',
            }

            const result = await postUsers(user, {})

            const userModel = await userRepository.findOne({
                where: {
                    username: user.username,
                },
            })
            assert(userModel)
            assert(userRepositoryTestSuite.validateCreate(userModel, user))

            assert(result.status === 201)
            assert(userRepositoryTestSuite.validateFormat(userModel, result.body))
        })
    )

    return suite
}
