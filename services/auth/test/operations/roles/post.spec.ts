import { repositories } from '../../../src/database/dataSource'
import { Role } from '../../../src/generated/types'
import { postRoles } from '../../../src/operations/roles'
import { TestData } from '../../data/index.spec'
import { roleRepositoryTestSuite } from '../../database/repositories/roleRepository.spec'
import assert from 'assert'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /roles', context)

    suite.addTest(
        new Mocha.Test('should correctly add a new role', async function () {
            const role: Role<'request'> = {
                name: 'admin',
                scopes: [
                    testData.scopes['scope 1'].request,
                    testData.scopes['scope 4'].request,
                ],
            }

            const result = await postRoles(role, testData.userData)

            const roleModel = await repositories.role.findOne({
                where: {
                    name: role.name,
                },
            })
            assert(roleModel)
            assert(roleRepositoryTestSuite.validateCreate(roleModel, role))

            assert(result.status === 201)
            assert(roleRepositoryTestSuite.validateFormat(roleModel, result.body))
        })
    )

    return suite
}
