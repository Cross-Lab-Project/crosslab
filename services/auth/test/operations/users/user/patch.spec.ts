import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { userRepository } from '../../../../src/database/repositories/userRepository'
import { UserUpdate } from '../../../../src/generated/types'
import { userUrlFromId } from '../../../../src/methods/utils'
import { patchUsersByUserId } from '../../../../src/operations'
import { TestData } from '../../../data/index.spec'
import { userRepositoryTestSuite } from '../../../database/repositories/userRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('PATCH /users/{user_id}', context)

    suite.addTest(
        new Mocha.Test('should successfully patch the user', async function () {
            const user_id = testData.users.superadmin.model.uuid
            const userUpdate: UserUpdate<'request'> = {
                username: 'admin',
                password: 'admin',
            }
            const result = await patchUsersByUserId({ user_id }, userUpdate, {})

            assert(result.status === 200)
            assert(result.body.username === userUpdate.username)
            assert(result.body.id === user_id)
            assert(result.body.url === userUrlFromId(user_id))
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should not change anything if the body is undefined',
            async function () {
                const userModel = testData.users.superadmin.model

                const result = await patchUsersByUserId(
                    { user_id: userModel.uuid },
                    undefined,
                    {}
                )

                assert(result.status === 200)

                const newUserModel = await userRepository.findOne({
                    where: {
                        uuid: userModel.uuid,
                    },
                })
                assert(newUserModel)
                assert(userRepositoryTestSuite.compareModels(userModel, newUserModel))
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the user cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await patchUsersByUserId({ user_id: 'unknown' }, undefined, {})
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
