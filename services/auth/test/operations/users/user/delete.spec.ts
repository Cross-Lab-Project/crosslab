import { MissingEntityError } from '@crosslab/service-common'
import assert, { fail } from 'assert'
import Mocha from 'mocha'
import { userRepository } from '../../../../src/database/repositories/userRepository'
import { deleteUsersByUsername } from '../../../../src/operations'
import { TestData } from '../../../data/index.spec'
import { userNames } from '../../../data/userData.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /users/{username}', context)

    suite.addTest(
        new Mocha.Test(
            'should delete the user successfully',
            async function () {
                for (const userName of userNames) {
                    const userModel = testData.users[userName].model
                    const result = await deleteUsersByUsername({ username: userModel.username }, {})
                    assert(result.status === 204)
                    assert(!(await userRepository.findOne({
                        where: {
                            username: userModel.username
                        }
                    })))
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not allow a normal user to delete other users',
            async function () {
                fail("NOT IMPLEMENTED")
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the user cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await deleteUsersByUsername({ username: "unknown" }, {})
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
