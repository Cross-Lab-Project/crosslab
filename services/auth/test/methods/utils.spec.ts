import assert from 'assert'
import { capitalizeFirstLetter, userUrlFromUsername } from '../../src/methods/utils'
import * as sinon from 'sinon'
import { config } from '../../src/config'

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

        describe('userUrlFromUsername', async function () {
            it('should correctly build the url of a user', async function () {
                const TEST_URL_WITHOUT_SLASH = 'http://localhost'
                const TEST_URL_WITH_SLASH = TEST_URL_WITHOUT_SLASH + '/'
                const TEST_USERNAME = 'username'
                const configBaseUrlStub = sinon.stub(config, 'BASE_URL')

                configBaseUrlStub.value(TEST_URL_WITHOUT_SLASH)
                const resultWithoutSlash = userUrlFromUsername(TEST_USERNAME)
                assert(
                    resultWithoutSlash ===
                        TEST_URL_WITHOUT_SLASH + '/users/' + TEST_USERNAME
                )

                configBaseUrlStub.value(TEST_URL_WITH_SLASH)
                const resetWithSlash = userUrlFromUsername(TEST_USERNAME)
                assert(resetWithSlash === TEST_URL_WITH_SLASH + 'users/' + TEST_USERNAME)

                configBaseUrlStub.restore()
            })
        })
    })
