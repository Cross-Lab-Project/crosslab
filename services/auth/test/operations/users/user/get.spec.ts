import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { getUsersByUsername } from '../../../../src/operations'
import { TestData } from '../../../data/index.spec'
import { userNames } from '../../../data/userData.spec'
import { userRepositoryTestSuite } from '../../../database/repositories/userRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /users/{username}', context)

    suite.addTest(
        new Mocha.Test(
            'should find and return the user with the provided username',
            async function () {
                for (const userName of userNames) {
                    const userModel = testData.users[userName].model
                    const result = await getUsersByUsername({ username: userModel.username }, {})
                    assert(result.status === 200)
                    assert(userRepositoryTestSuite.validateFormat(userModel, result.body))
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the user cannot be found',
            async function () {
                await assert.rejects( 
                    async () => {
                        await getUsersByUsername({ username: "unknown" }, {})
                    },
                    (error) => {
                        assert(error instanceof MissingEntityError)
                        assert(error.status === 404)
                        return true
                    }
                )
            }
        )
    )

    return suite
}
