import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { getRolesByRoleIdUsers } from '../../../../../src/operations'
import { TestData } from '../../../../data/index.spec'
import { roleNames } from '../../../../data/roleData.spec'
import { userRepositoryTestSuite } from '../../../../database/repositories/userRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /roles/{role_id}/roles', context)

    suite.addTest(
        new Mocha.Test('should get all users of the role', async function () {
            for (const roleName of roleNames) {
                const roleModel = testData.roles[roleName].model
                const result = await getRolesByRoleIdUsers(
                    { role_id: roleModel.uuid },
                    {}
                )

                assert(result.status === 200)
                assert(result.body.length === roleModel.users.length)

                for (const userModel of roleModel.users) {
                    const user = result.body.find((u) => u.id === userModel.uuid)
                    assert(user)
                    assert(userRepositoryTestSuite.validateFormat(userModel, user))
                }
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the role cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await getRolesByRoleIdUsers({ role_id: 'unknown' }, {})
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
