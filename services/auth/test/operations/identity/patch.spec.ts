import { MissingEntityError } from '@crosslab/service-common'
import assert, { fail } from 'assert'
import { config } from '../../../src/config'
import { userRepository } from '../../../src/database/repositories/userRepository'
import { patchIdentity } from '../../../src/operations'
import { TestData } from '../../data/index.spec'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('PATCH /identity', context)

    suite.addTest(
        new Mocha.Test('should update the identity of a known user', async function () {
            const result = await patchIdentity(
                {
                    username: 'newsuperadmin',
                },
                {
                    JWT: {
                        username: testData.users.superadmin.response.username!,
                        url: testData.users.superadmin.response.url!,
                        scopes: [],
                    },
                }
            )

            assert(result.status === 200)
            assert(result.body.username === 'newsuperadmin')
            await userRepository.findOneOrFail({
                where: {
                    username: 'newsuperadmin',
                },
            })
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should update the identity of a known user with undefined body',
            async function () {
                const result = await patchIdentity(undefined, {
                    JWT: {
                        username: testData.users.superadmin.response.username!,
                        url: testData.users.superadmin.response.url!,
                        scopes: [],
                    },
                })

                assert(result.status === 200)
                assert(result.body.username === 'superadmin')
                await userRepository.findOneOrFail({
                    where: {
                        username: 'superadmin',
                    },
                })
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not update the identity of an unknown user',
            async function () {
                try {
                    await patchIdentity(
                        {
                            username: 'newUsername',
                            password: 'newPassword',
                        },
                        {
                            JWT: {
                                username: 'unknown',
                                url: `${config.BASE_URL}${
                                    config.BASE_URL.endsWith('/') ? '' : '/'
                                }users/unknown`,
                                scopes: [],
                            },
                        }
                    )
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
