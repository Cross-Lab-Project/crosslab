import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { userRepository } from '../../../../src/database/repositories/userRepository'
import { deleteUsersByUserId } from '../../../../src/operations/users'
import { TestData } from '../../../data/index.spec'
import { userNames } from '../../../data/userData.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /users/{user_id}', context)

    suite.addTest(
        new Mocha.Test('should delete the user successfully', async function () {
            for (const userName of userNames) {
                const userModel = testData.users[userName].model
                const result = await deleteUsersByUserId({ user_id: userModel.uuid }, {})
                assert(result.status === 204)
                assert(
                    !(await userRepository.findOne({
                        where: {
                            uuid: userModel.uuid,
                        },
                    }))
                )
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the user cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await deleteUsersByUserId({ user_id: 'unknown' }, {})
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
