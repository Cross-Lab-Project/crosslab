import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { userRepository } from '../../../../../src/database/repositories/userRepository'
import { deleteUsersByUserIdRoles } from '../../../../../src/operations'
import { TestData } from '../../../../data/index.spec'
import { roleNames } from '../../../../data/roleData.spec'
import { userRepositoryTestSuite } from '../../../../database/repositories/userRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /users/{user_id}/roles', context)

    suite.addTest(
        new Mocha.Test(
            'should successfully remove the roles from the user',
            async function () {
                const user_id = testData.users.superadmin.model.uuid
                const role_ids = []
                for (const roleName of roleNames) {
                    role_ids.push(testData.roles[roleName].model.uuid)
                }

                const result = await deleteUsersByUserIdRoles({ user_id }, role_ids, {})

                assert(result.status === 204)

                const userModel = await userRepository.findOne({
                    where: {
                        uuid: user_id,
                    },
                })
                assert(userModel)
                assert(userModel.roles.length === 0)

                for (const role_id of role_ids) {
                    assert(!userModel.roles.find((r) => r.uuid === role_id))
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not remove any roles if body is undefined',
            async function () {
                const userModel = testData.users.superadmin.model

                const result = await deleteUsersByUserIdRoles(
                    { user_id: userModel.uuid },
                    undefined,
                    {}
                )

                assert(result.status === 204)

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
                        await deleteUsersByUserIdRoles({ user_id: 'unknown' }, [], {})
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
