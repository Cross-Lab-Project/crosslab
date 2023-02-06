import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { roleRepository } from '../../../../src/database/repositories/roleRepository'
import { Role } from '../../../../src/generated/types'
import { roleUrlFromId } from '../../../../src/methods/utils'
import { patchRolesByRoleId } from '../../../../src/operations'
import { TestData } from '../../../data/index.spec'
import { roleRepositoryTestSuite } from '../../../database/repositories/roleRepository.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('PATCH /roles/{role_id}', context)

    suite.addTest(
        new Mocha.Test('should successfully patch the role', async function () {
            const role_id = testData.roles.superadmin.model.uuid
            const roleUpdate: Role<'request'> = {
                name: 'admin',
                scopes: [
                    testData.scopes['scope 2'].request,
                    testData.scopes['scope 3'].request,
                    testData.scopes['scope 5'].request,
                ],
            }
            const result = await patchRolesByRoleId({ role_id }, roleUpdate, {})

            assert(result.status === 200)
            assert(result.body.id === role_id)
            assert(result.body.name === roleUpdate.name)
            assert(result.body.url === roleUrlFromId(role_id))

            for (const scope of roleUpdate.scopes!) {
                assert(result.body.scopes?.find((s) => s === scope))
            }

            for (const scope of result.body.scopes!) {
                assert(roleUpdate.scopes?.find((s) => s === scope))
            }
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should not change anything if the body is undefined',
            async function () {
                const roleModel = testData.roles.superadmin.model

                const result = await patchRolesByRoleId(
                    { role_id: roleModel.uuid },
                    undefined,
                    {}
                )

                assert(result.status === 200)

                const newRoleModel = await roleRepository.findOne({
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
                        await patchRolesByRoleId({ role_id: 'unknown' }, undefined, {})
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
