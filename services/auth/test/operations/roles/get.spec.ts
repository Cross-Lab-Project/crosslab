import assert from 'assert'
import Mocha from 'mocha'
import { getRoles } from '../../../src/operations'
import { TestData } from '../../data/index.spec'
import { roleNames } from '../../data/roleData.spec'
import { roleRepositoryTestSuite } from '../../database/repositories/roleRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /roles', context)

    suite.addTest(
        new Mocha.Test('should get all roles', async function () {
            const result = await getRoles({})
            assert(result.status === 200)

            for (const roleName of roleNames) {
                const searchedRole = testData.roles[roleName].response
                assert(
                    result.body.find((role) =>
                        roleRepositoryTestSuite.compareFormatted(role, searchedRole)
                    )
                )
            }
        })
    )

    return suite
}
