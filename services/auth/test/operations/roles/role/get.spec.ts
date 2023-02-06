import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { getRolesByRoleId } from '../../../../src/operations'
import { TestData } from '../../../data/index.spec'
import { roleNames } from '../../../data/roleData.spec'
import { roleRepositoryTestSuite } from '../../../database/repositories/roleRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /roles/{role_id}', context)

    suite.addTest(
        new Mocha.Test(
            'should find and return the role with the provided id',
            async function () {
                for (const roleName of roleNames) {
                    const roleModel = testData.roles[roleName].model
                    const result = await getRolesByRoleId({ role_id: roleModel.uuid }, {})
                    assert(result.status === 200)
                    assert(roleRepositoryTestSuite.validateFormat(roleModel, result.body))
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the role cannot be found',
            async function () {
                await assert.rejects(
                    async () => {
                        await getRolesByRoleId({ role_id: 'unknown' }, {})
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
