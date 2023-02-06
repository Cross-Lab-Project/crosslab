import assert from 'assert'
import rewire from 'rewire'
import { AppConfiguration } from '../src/types/types'
import * as sinon from 'sinon'
import { die } from '../src/config'

export default () =>
    describe('config tests', function () {
        let initializeAppConfiguration: () => AppConfiguration
        let processExitStub: sinon.SinonStub
        let processEnvBackup: any

        this.beforeAll(function () {
            const configModule = rewire('../src/config')
            initializeAppConfiguration = configModule.__get__(
                'initializeAppConfiguration'
            )
            processExitStub = sinon.stub(process, 'exit')
            processEnvBackup = process.env
        })

        this.beforeEach(function () {
            processExitStub.resetHistory()
        })

        this.afterAll(function () {
            processExitStub.restore()
        })

        this.afterEach(function () {
            process.env = processEnvBackup
        })

        describe('die', function () {
            it('should exit the program and log the reason', async function () {
                const TEST_REASON = 'test reason'
                const consoleErrorStub = sinon.stub(console, 'error')

                die(TEST_REASON)

                assert(consoleErrorStub.calledWith(TEST_REASON))
                assert(processExitStub.calledWith(1))

                consoleErrorStub.restore()
            })
        })

        it('should handle a valid PORT option correctly', async function () {
            const TEST_PORT = '4000'
            process.env.PORT = TEST_PORT

            const result = initializeAppConfiguration()

            assert(result.PORT === parseInt(TEST_PORT))
        })

        it('should use the default PORT value when none is provided', async function () {
            const DEFAULT_PORT = 3000
            delete process.env.PORT

            const result = initializeAppConfiguration()

            assert(result.PORT === DEFAULT_PORT)
        })

        it('should handle a valid NODE_ENV option correctly', async function () {
            const TEST_NODE_ENV = 'production'
            process.env.NODE_ENV = TEST_NODE_ENV

            const result = initializeAppConfiguration()

            assert(result.NODE_ENV === TEST_NODE_ENV)
        })

        it('should use the default NODE_ENV value when none is provided', async function () {
            const DEFAULT_NODE_ENV = 'development'
            delete process.env.NODE_ENV

            const result = initializeAppConfiguration()

            assert(result.NODE_ENV === DEFAULT_NODE_ENV)
        })

        it('should handle a valid BASE_URL option correctly', async function () {
            const TEST_BASE_URL = 'http://localhost:4000'
            process.env.BASE_URL = TEST_BASE_URL

            const result = initializeAppConfiguration()

            assert(result.BASE_URL === TEST_BASE_URL)
        })

        it('should use the default BASE_URL value when none is provided', async function () {
            const DEFAULT_BASE_URL = 'http://localhost:3000'
            delete process.env.BASE_URL

            const result = initializeAppConfiguration()

            assert(result.BASE_URL === DEFAULT_BASE_URL)
        })

        it('should handle a valid SECURITY_ISSUER option correctly', async function () {
            const TEST_SECURITY_ISSUER = 'http://localhost'
            process.env.SECURITY_ISSUER = TEST_SECURITY_ISSUER

            const result = initializeAppConfiguration()

            assert(result.SECURITY_ISSUER === TEST_SECURITY_ISSUER)
        })

        it('should exit if the SECURITY_ISSUER option is not set', async function () {
            const EXPECTED_EXIT_CODE = 1
            delete process.env.SECURITY_ISSUER

            initializeAppConfiguration()

            assert(processExitStub.calledWith(EXPECTED_EXIT_CODE))
        })

        it('should handle a valid SECURITY_AUDIENCE option correctly', async function () {
            const TEST_SECURITY_AUDIENCE = 'http://localhost'
            process.env.SECURITY_AUDIENCE = TEST_SECURITY_AUDIENCE

            const result = initializeAppConfiguration()

            assert(result.SECURITY_AUDIENCE === TEST_SECURITY_AUDIENCE)
        })

        it('should exit if the SECURITY_AUDIENCE option is not set', async function () {
            const EXPECTED_EXIT_CODE = 1
            delete process.env.SECURITY_AUDIENCE

            initializeAppConfiguration()

            assert(processExitStub.calledWith(EXPECTED_EXIT_CODE))
        })
    })
