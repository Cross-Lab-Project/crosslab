import { repositories } from '../../../../../src/database/dataSource'
import { postRolesByRoleIdUsers } from '../../../../../src/operations/roles'
import { TestData } from '../../../../data/index.spec'
import { userNames } from '../../../../data/userData.spec'
import { roleRepositoryTestSuite } from '../../../../database/repositories/roleRepository.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /roles/{role_id}/roles', context)

    suite.addTest(
        new Mocha.Test(
            'should successfully add the users to the role',
            async function () {
                const role_id = testData.roles.user.model.uuid
                const user_ids = []
                for (const userName of userNames) {
                    user_ids.push(testData.users[userName].model.uuid)
                }

                const result = await postRolesByRoleIdUsers(
                    { role_id },
                    user_ids,
                    testData.userData
                )

                assert(result.status === 204)

                const roleModel = await repositories.role.findOne({
                    where: {
                        uuid: role_id,
                    },
                })
                assert(roleModel)
                assert(roleModel.users.length === user_ids.length)

                for (const user_id of user_ids) {
                    assert(roleModel.users.find((u) => u.uuid === user_id))
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not add any users if the body is undefined',
            async function () {
                const roleModel = testData.roles.superadmin.model

                const result = await postRolesByRoleIdUsers(
                    { role_id: roleModel.uuid },
                    undefined,
                    testData.userData
                )

                assert(result.status === 204)

                const newRoleModel = await repositories.role.findOne({
                    where: {
                        uuid: roleModel.uuid,
                    },
                })
                assert(newRoleModel)
                assert(roleRepositoryTestSuite.compareModels(roleModel, newRoleModel))
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the role cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await postRolesByRoleIdUsers(
                            { role_id: 'unknown' },
                            undefined,
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
