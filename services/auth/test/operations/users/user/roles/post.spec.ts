import { repositories } from '../../../../../src/database/dataSource'
import { postUsersByUserIdRoles } from '../../../../../src/operations/users'
import { TestData } from '../../../../data/index.spec'
import { roleNames } from '../../../../data/roleData.spec'
import { userRepositoryTestSuite } from '../../../../database/repositories/userRepository.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /users/{user_id}/roles', context)

    suite.addTest(
        new Mocha.Test(
            'should successfully add the roles to the user',
            async function () {
                const user_id = testData.users.superadmin.model.uuid
                const role_ids = []
                for (const roleName of roleNames) {
                    role_ids.push(testData.roles[roleName].model.uuid)
                }

                const result = await postUsersByUserIdRoles(
                    { user_id },
                    role_ids,
                    testData.userData
                )

                assert(result.status === 204)

                const userModel = await repositories.user.findOne({
                    where: {
                        uuid: user_id,
                    },
                })
                assert(userModel)
                assert(userModel.roles.length === role_ids.length)

                for (const role_id of role_ids) {
                    assert(userModel.roles.find((r) => r.uuid === role_id))
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not add any roles if body is undefined',
            async function () {
                const userModel = testData.users.superadmin.model

                const result = await postUsersByUserIdRoles(
                    { user_id: userModel.uuid },
                    undefined,
                    testData.userData
                )

                assert(result.status === 204)

                const newUserModel = await repositories.user.findOne({
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
                        await postUsersByUserIdRoles(
                            { user_id: 'unknown' },
                            [],
                            testData.userData
                        )
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
