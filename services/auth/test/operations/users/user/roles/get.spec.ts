import { getUsersByUserIdRoles } from '../../../../../src/operations/users'
import { TestData } from '../../../../data/index.spec'
import { userNames } from '../../../../data/userData.spec'
import { roleRepositoryTestSuite } from '../../../../database/repositories/roleRepository.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /users/{user_id}/roles', context)

    suite.addTest(
        new Mocha.Test('should get all roles of the user', async function () {
            for (const userName of userNames) {
                const userModel = testData.users[userName].model
                const result = await getUsersByUserIdRoles(
                    { user_id: userModel.uuid },
                    testData.userData
                )

                assert(result.status === 200)
                assert(result.body.length === userModel.roles.length)

                for (const roleModel of userModel.roles) {
                    const role = result.body.find((r) => r.id === roleModel.uuid)
                    assert(role)
                    assert(roleRepositoryTestSuite.validateFormat(roleModel, role))
                }
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the user cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await getUsersByUserIdRoles(
                            { user_id: 'unknown' },
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
