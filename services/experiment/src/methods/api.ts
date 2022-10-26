import {
    ValidationError,
    InvalidUrlError,
    UnsuccessfulRequestError,
    FetchError,
} from '@cross-lab-project/api-client'
import { apiClient } from '../globals'
import { InternalRequestError } from '../types/errors'

/**
 * This function handles errors thrown by an internal api request.
 * @param error The error thrown by the internal api request.
 * @throws {InternalRequestError} Thrown if the error matches an error that can be thrown by an internal api request.
 */
function handleInternalRequestError(error: unknown) {
    if (error instanceof FetchError)
        throw new InternalRequestError(
            `An error occurred while trying to fetch the request`,
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
            `The provided url is malformed`,
            error,
            400
        )
    else if (error instanceof UnsuccessfulRequestError)
        throw new InternalRequestError(
            `The request was unsuccessful`,
            error,
            error.response.status
        )
}

/**
 * This function wraps the getDevice() function of the api-client and throws server-specific errors.
 * @param args The arguments of the getDevice() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The requested device.
 */
export async function getDevice(...args: Parameters<typeof apiClient.getDevice>) {
    try {
        return await apiClient.getDevice(args[0], args[1])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the createDeviceInstance() function of the api-client and throws server-specific errors.
 * @param args The arguments of the createDeviceInstance() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The created instance of the device and its device token.
 */
export async function instantiateDevice(...args: Parameters<typeof apiClient.createDeviceInstance>) {
    try {
        return await apiClient.createDeviceInstance(args[0], args[1])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the createPeerconnection() function of the api-client and throws server-specific errors.
 * @param args The arguments of the createPeerconnection() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The created peerconnection.
 */
export async function createPeerconnection(...args: Parameters<typeof apiClient.createPeerconnection>) {
    try {
        return await apiClient.createPeerconnection(args[0], args[1])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}