import { getUsers } from '../../../src/operations/users'
import { TestData } from '../../data/index.spec'
import { userNames } from '../../data/userData.spec'
import { userRepositoryTestSuite } from '../../database/repositories/userRepository.spec'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /users', context)

    suite.addTest(
        new Mocha.Test('should get all users', async function () {
            const result = await getUsers(testData.userData)
            assert(result.status === 200)

            for (const userName of userNames) {
                const searchedUser = testData.users[userName].response
                assert(
                    result.body.find((user) =>
                        userRepositoryTestSuite.compareFormatted(user, searchedUser)
                    )
                )
            }
        })
    )

    return suite
}
