import * as API from '../../../src/methods/api'
import { postDeviceAuthenticationToken } from '../../../src/operations/deviceAuthenticationToken'
// import { OwnershipError } from '../../../src/types/errors'
import { TestData } from '../../data/index.spec'
import { MissingEntityError } from '@crosslab/service-common'
import assert, { fail } from 'assert'
import Mocha from 'mocha'
import * as sinon from 'sinon'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /device_authentication_token', context)

    let getDeviceStub

    suite.beforeAll(function () {
        getDeviceStub = sinon.stub(API, 'getDevice')
        getDeviceStub.resolves({
            type: 'device',
            url: 'https://localhost/devices/39db5f84-2ed1-491d-b0e1-f48463a6b748',
            name: 'Test Device',
            owner: testData.users['POST /device_authentication_token user'].response.url!,
        })
    })

    suite.addTest(
        new Mocha.Test(
            'should throw a MissingEntityError if the requesting user cannot be found in the database',
            async function () {
                try {
                    await postDeviceAuthenticationToken(
                        {
                            device_url:
                                'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
                        },
                        {
                            JWT: {
                                username: 'invalid',
                                url: 'http://localhost:3000/users/invalid',
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

    // suite.addTest(
    //     new Mocha.Test(
    //         'should throw an OwnershipError if the requesting user is not the owner of the device',
    //         async function () {
    //             try {
    //                 await postDeviceAuthenticationToken(
    //                     {
    //                         device_url:
    //                             'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
    //                     },
    //                     {
    //                         JWT: {
    //                             username:
    //                                 testData.users[
    //                                     'POST /device_authentication_token user'
    //                                 ].response.username!,
    //                             url:
    //                                 testData.users[
    //                                     'POST /device_authentication_token user'
    //                                 ].response.url! + 'invalid',
    //                             scopes: [],
    //                         },
    //                     }
    //                 )
    //                 fail()
    //             } catch (error) {
    //                 assert(error instanceof OwnershipError)
    //                 assert(error.status === 403)
    //             }
    //         }
    //     )
    // )

    suite.addTest(
        new Mocha.Test(
            'should allow the owner of the device to issue a device authentication token',
            async function () {
                const result = await postDeviceAuthenticationToken(
                    {
                        device_url:
                            'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
                    },
                    {
                        JWT: {
                            username:
                                testData.users['POST /device_authentication_token user']
                                    .response.username!,
                            url: testData.users['POST /device_authentication_token user']
                                .response.url!,
                            scopes: [],
                        },
                    }
                )

                assert(result.status === 201)
                assert(result.body)
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should allow a user with scope 'device_token' to issue a device authentication token for the device of another user",
            async function () {
                const result = await postDeviceAuthenticationToken(
                    {
                        device_url:
                            'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
                    },
                    {
                        JWT: {
                            username: testData.users.deviceservice.response.username!,
                            url: testData.users.deviceservice.response.url!,
                            scopes: ['device_token'],
                        },
                    }
                )

                assert(result.status === 201)
                assert(result.body)
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should allow a user with scope 'device_token:create' to issue a device authentication token for the device of another user",
            async function () {
                const result = await postDeviceAuthenticationToken(
                    {
                        device_url:
                            'http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519',
                    },
                    {
                        JWT: {
                            username: testData.users.deviceservice.response.username!,
                            url: testData.users.deviceservice.response.url!,
                            scopes: ['device_token:create'],
                        },
                    }
                )

                assert(result.status === 201)
                assert(result.body)
            }
        )
    )

    return suite
}
