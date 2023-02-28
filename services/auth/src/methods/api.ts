import {
    ValidationError,
    InvalidUrlError,
    UnsuccessfulRequestError,
    FetchError,
} from '@cross-lab-project/api-client'
import { InternalRequestError } from '../types/errors'
import { APIClient } from '@cross-lab-project/api-client'
import { config } from '../config'

export const apiClient = new APIClient(config.BASE_URL)

/**
 * This function wraps the getDevice() of the api-client and throws server-specific errors.
 * @param deviceUrl The url of the requested device.
 * @throws {InternalRequestError} Thrown when an error occurs during the request.
 * @returns The requested device.
 */
export async function getDevice(deviceUrl: string) {
    try {
        const device = await apiClient.getDevice(deviceUrl)
        return device
    } catch (error) {
        if (error instanceof FetchError)
            throw new InternalRequestError(
                `An error occurred while trying to fetch the device`,
                error,
                500
            )
        else if (error instanceof ValidationError)
            throw new InternalRequestError(
                `An error occurred while trying to validate the request/response`,
                error,
                500
            )
        else if (error instanceof InvalidUrlError)
            throw new InternalRequestError(
                `The provided device url is malformed`,
                error,
                400
            )
        else if (error instanceof UnsuccessfulRequestError)
            throw new InternalRequestError(
                `The request was unsuccessful`,
                error,
                error.response.status
            )
        else throw error
    }
}
