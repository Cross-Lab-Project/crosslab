import { getDevice, apiClient } from '../../src/methods/api'
import { InternalRequestError } from '../../src/types/errors'
import {
    APIClient,
    FetchError,
    InvalidUrlError,
    ResponseData,
    UnsuccessfulRequestError,
    ValidationError,
} from '@cross-lab-project/api-client'
import assert from 'assert'
import * as sinon from 'sinon'

type TestErrorName =
    | 'FetchError'
    | 'ValidationError'
    | 'InvalidUrlError'
    | 'UnsuccessfulRequestError'
    | 'Error'
type TestError =
    | FetchError
    | ValidationError
    | InvalidUrlError
    | UnsuccessfulRequestError
    | Error
type TestErrorType =
    | typeof FetchError
    | typeof ValidationError
    | typeof InvalidUrlError
    | typeof UnsuccessfulRequestError
    | typeof Error

type TestErrorDescription = {
    name: TestErrorName
    error: TestError
    type: TestErrorType
}

export default () =>
    describe('api methods', async function () {
        const apiGetDeviceStub = sinon.stub(apiClient, 'getDevice')
        const TEST_INPUT = 'TestUrl'
        const ERROR_MESSAGE = 'Test Error Message'
        const VALIDATION_ERROR = 'Validation Error'
        const RESPONSE_DATA: ResponseData = {
            status: 400,
            body: 'Test Body',
            headers: {
                TestHeader: 'Test Header',
            },
        }
        const ERRORS: TestErrorDescription[] = [
            {
                name: 'FetchError',
                error: new FetchError(ERROR_MESSAGE),
                type: FetchError,
            },
            {
                name: 'ValidationError',
                error: new ValidationError(ERROR_MESSAGE, VALIDATION_ERROR),
                type: ValidationError,
            },
            {
                name: 'InvalidUrlError',
                error: new InvalidUrlError(ERROR_MESSAGE),
                type: InvalidUrlError,
            },
            {
                name: 'UnsuccessfulRequestError',
                error: new UnsuccessfulRequestError(ERROR_MESSAGE, RESPONSE_DATA),
                type: UnsuccessfulRequestError,
            },
        ]

        this.afterEach(function () {
            apiGetDeviceStub.resetHistory()
        })

        this.afterAll(function () {
            apiGetDeviceStub.restore()
        })

        describe('getDevice', async function () {
            it('should return the device if no error occurred', async function () {
                const TEST_DEVICE: Awaited<ReturnType<APIClient['getDevice']>> = {
                    name: 'test device',
                    type: 'device',
                    owner: 'https://localhost/users/testuser',
                    url: 'https://localhost/devices/testdevice',
                    isPublic: true
                }
                apiGetDeviceStub.resolves(TEST_DEVICE)

                const result = await getDevice(TEST_INPUT)
                assert(apiGetDeviceStub.called)
                assert(apiGetDeviceStub.calledOnce)
                assert(apiGetDeviceStub.calledWith(TEST_INPUT))
                assert(JSON.stringify(result) === JSON.stringify(TEST_DEVICE))
            })

            for (const ERROR of ERRORS) {
                it(`should handle ${ERROR.name}s correctly`, async function () {
                    apiGetDeviceStub.throws(ERROR.error)

                    try {
                        await getDevice(TEST_INPUT)
                    } catch (error) {
                        assert(apiGetDeviceStub.called)
                        assert(apiGetDeviceStub.calledOnce)
                        assert(apiGetDeviceStub.calledWith(TEST_INPUT))
                        assert(apiGetDeviceStub.threw(ERROR.error))
                        assert(error instanceof InternalRequestError)
                        assert(error.internalError instanceof ERROR.type)
                        assert(error.internalError.message === ERROR_MESSAGE)
                    }
                })
            }

            it('should handle other errors correctly', async function () {
                const ERROR = new Error(ERROR_MESSAGE)
                apiGetDeviceStub.throws(ERROR)

                try {
                    await getDevice(TEST_INPUT)
                } catch (error) {
                    assert(apiGetDeviceStub.called)
                    assert(apiGetDeviceStub.calledOnce)
                    assert(apiGetDeviceStub.calledWith(TEST_INPUT))
                    assert(apiGetDeviceStub.threw(ERROR))
                    assert(error instanceof Error)
                    assert(error.message === ERROR_MESSAGE)
                }
            })
        })
    })
