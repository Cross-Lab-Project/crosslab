import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { userRepository } from '../../../../src/database/repositories/userRepository'
import { deleteRolesByRoleId } from '../../../../src/operations/roles'
import { TestData } from '../../../data/index.spec'
import { roleNames } from '../../../data/roleData.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /roles/{role_id}', context)

    suite.addTest(
        new Mocha.Test('should delete the role successfully', async function () {
            for (const roleName of roleNames) {
                const roleModel = testData.roles[roleName].model
                const result = await deleteRolesByRoleId({ role_id: roleModel.uuid }, {})
                assert(result.status === 204)
                assert(
                    !(await userRepository.findOne({
                        where: {
                            uuid: roleModel.uuid,
                        },
                    }))
                )
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the role cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await deleteRolesByRoleId({ role_id: 'unknown' }, {})
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
