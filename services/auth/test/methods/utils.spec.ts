import { config } from '../../src/config'
import {
    capitalizeFirstLetter,
    roleUrlFromId,
    userUrlFromId,
} from '../../src/methods/utils'
import assert from 'assert'
import * as sinon from 'sinon'

export default () =>
    describe('utils methods', async function () {
        describe('capitalizeFirstLetter', async function () {
            it('should capitalize the first letter of the provided string', async function () {
                assert(capitalizeFirstLetter('test') === 'Test')
                assert(capitalizeFirstLetter('Test') === 'Test')
                assert(capitalizeFirstLetter('tEST') === 'TEST')
                assert(capitalizeFirstLetter('TEST') === 'TEST')
            })

            it('should return an empty string when the provided string is empty', async function () {
                assert(capitalizeFirstLetter('') === '')
            })
        })

        describe('userUrlFromId', async function () {
            it('should correctly build the url of a user', async function () {
                const TEST_URL_WITHOUT_SLASH = 'http://localhost'
                const TEST_URL_WITH_SLASH = TEST_URL_WITHOUT_SLASH + '/'
                const TEST_USER_ID = '81d68982-5a4c-4081-ba3f-4e0ca9c6e44a'
                const configBaseUrlStub = sinon.stub(config, 'BASE_URL')

                configBaseUrlStub.value(TEST_URL_WITHOUT_SLASH)
                const resultWithoutSlash = userUrlFromId(TEST_USER_ID)
                assert(
                    resultWithoutSlash ===
                        TEST_URL_WITHOUT_SLASH + '/users/' + TEST_USER_ID
                )

                configBaseUrlStub.value(TEST_URL_WITH_SLASH)
                const resetWithSlash = userUrlFromId(TEST_USER_ID)
                assert(resetWithSlash === TEST_URL_WITH_SLASH + 'users/' + TEST_USER_ID)

                configBaseUrlStub.restore()
            })
        })

        describe('roleUrlFromId', async function () {
            it('should correctly build the url of a role', async function () {
                const TEST_URL_WITHOUT_SLASH = 'http://localhost'
                const TEST_URL_WITH_SLASH = TEST_URL_WITHOUT_SLASH + '/'
                const TEST_ROLE_ID = 'bdc81e9c-1234-4ef5-8475-12a9c945055c'
                const configBaseUrlStub = sinon.stub(config, 'BASE_URL')

                configBaseUrlStub.value(TEST_URL_WITHOUT_SLASH)
                const resultWithoutSlash = roleUrlFromId(TEST_ROLE_ID)
                assert(
                    resultWithoutSlash ===
                        TEST_URL_WITHOUT_SLASH + '/roles/' + TEST_ROLE_ID
                )

                configBaseUrlStub.value(TEST_URL_WITH_SLASH)
                const resetWithSlash = roleUrlFromId(TEST_ROLE_ID)
                assert(resetWithSlash === TEST_URL_WITH_SLASH + 'roles/' + TEST_ROLE_ID)

                configBaseUrlStub.restore()
            })
        })
    })
