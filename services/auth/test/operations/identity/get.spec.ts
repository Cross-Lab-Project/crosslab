import { MissingEntityError } from '@crosslab/service-common'
import assert, { fail } from 'assert'
import { getIdentity } from '../../../src/operations/identity'
import { TestData } from '../../data/index.spec'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /identity', context)

    suite.addTest(
        new Mocha.Test('should get the identity of a known user', async function () {
            const result = await getIdentity({
                JWT: {
                    username: testData.users.superadmin.response.username!,
                    url: testData.users.superadmin.response.url!,
                    scopes: [],
                },
            })

            assert(result.status === 200)
            assert(result.body)
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should not get the identity of an unknown user',
            async function () {
                try {
                    await getIdentity({
                        JWT: {
                            username: 'unknown',
                            url: 'http://localhost:3000/users/unknown',
                            scopes: [],
                        },
                    })
                    fail()
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                    assert(error.status === 404)
                }
            }
        )
    )

    return suite
}
