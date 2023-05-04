import { getUsersByUserId } from '../../../../src/operations/users'
import { TestData } from '../../../data/index.spec'
import { userNames } from '../../../data/userData.spec'
import { userRepositoryTestSuite } from '../../../database/repositories/userRepository.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /users/{user_id}', context)

    suite.addTest(
        new Mocha.Test(
            'should find and return the user with the provided id',
            async function () {
                for (const userName of userNames) {
                    const userModel = testData.users[userName].model
                    const result = await getUsersByUserId(
                        { user_id: userModel.uuid },
                        testData.userData
                    )
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
                        await getUsersByUserId({ user_id: 'unknown' }, testData.userData)
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
