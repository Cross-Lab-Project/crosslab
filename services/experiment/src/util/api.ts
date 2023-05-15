import { config } from '../config'
import { InternalRequestError } from '../types/errors'
import {
    ValidationError,
    InvalidUrlError,
    UnsuccessfulRequestError,
    FetchError,
    APIClient,
    DeviceServiceTypes,
} from '@cross-lab-project/api-client'
import { MissingPropertyError } from '@crosslab/service-common'
import fetch from 'node-fetch'

export const apiClient: APIClient = new APIClient(config.BASE_URL)

/**
 * TODO: add more information on request/response
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
        throw new InternalRequestError(`The provided url is malformed`, error, 400)
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
 * This function wraps the instantiateDevice() function of the api-client and throws server-specific errors.
 * @param args The arguments of the instantiateDevice() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The created instance of the device and its device token.
 */
export async function instantiateDevice(
    ...args: Parameters<typeof apiClient.instantiateDevice>
) {
    try {
        return await apiClient.instantiateDevice(args[0], args[1])
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
export async function createPeerconnection(
    ...args: Parameters<typeof apiClient.createPeerconnection>
) {
    try {
        return await apiClient.createPeerconnection(args[0], args[1])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the bookExperiment() function of the api-client and throws server-specific errors.
 * @param args The arguments of the bookExperiment() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The id of the created booking.
 */
export async function bookExperiment(
    ...args: Parameters<typeof apiClient.bookExperiment>
) {
    try {
        return await apiClient.bookExperiment(args[0], args[1])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the lockBooking() function of the api-client and throws server-specific errors.
 * @param args The arguments of the lockBooking() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The locked booking.
 */
export async function lockBooking(...args: Parameters<typeof apiClient.lockBooking>) {
    try {
        return await apiClient.lockBooking(args[0])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the getBooking() function of the api-client and throws server-specific errors.
 * @param args The arguments of the getBooking() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The requested booking.
 */
export async function getBooking(...args: Parameters<typeof apiClient.getBooking>) {
    try {
        return await apiClient.getBooking(args[0])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the deletePeerconnection() function of the api-client and throws server-specific errors.
 * @param args The arguments of the deletePeerconnection() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 */
export async function deletePeerconnection(
    ...args: Parameters<typeof apiClient.deletePeerconnection>
) {
    try {
        return await apiClient.deletePeerconnection(args[0])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function attempts to start the instance of a cloud instantiable device.
 * @param device The cloud instantiable device for which to start the instance.
 * @param deviceUrl The url the instance should connect to as a device.
 * @param token The token used for authentication by the instance.
 * @param experimentUrl The url of the experiment the instance should take part in.
 */
export async function startCloudDeviceInstance(
    device: DeviceServiceTypes.InstantiableCloudDevice,
    deviceUrl: string,
    token: string,
    experimentUrl: string
) {
    try {
        if (!device.instantiateUrl)
            throw new MissingPropertyError(
                'Resolved instantiable cloud device does not have an instantiate url',
                500
            ) // NOTE: error code?
        await fetch(
            device.instantiateUrl +
                new URLSearchParams([
                    ['device_url', deviceUrl],
                    ['token', token],
                    ['experiment_url', experimentUrl],
                ]),
            {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json'],
                    ['Authorization', apiClient.accessToken],
                ],
            }
        )
    } catch (error) {
        if (error instanceof Error) {
            throw new FetchError(error.message)
        } else if (typeof error === 'string') {
            throw new FetchError(error)
        } else {
            throw new FetchError('Something went wrong while trying to fetch the request')
        }
    }
}

/**
 * This function wraps the updateDevice() function of the api-client and throws server specific errors.
 * @param args The arguments of the updateDevice() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 * @returns The patched device.
 */
export async function updateDevice(...args: Parameters<typeof apiClient.updateDevice>) {
    try {
        return await apiClient.updateDevice(args[0], args[1], args[2])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the deleteBooking() function of the api-client and throws server specific errors.
 * @param args The arguments of the deleteBooking() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 */
export async function deleteBooking(...args: Parameters<typeof apiClient.deleteBooking>) {
    try {
        return await apiClient.deleteBooking(args[0])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the unlockDevices() function of the api-client and throws server specific errors.
 * @param args The arguments of the unlockDevices() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 */
export async function unlockDevices(...args: Parameters<typeof apiClient.unlockBooking>) {
    try {
        return await apiClient.unlockBooking(args[0])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}

/**
 * This function wraps the getPeerconnection() function of the api-client and throws server specific errors.
 * @param args The arguments of the getPeerconnection() function.
 * @throws {InternalRequestError} Thrown if an error occurs during the request.
 */
export async function getPeerconnection(
    ...args: Parameters<typeof apiClient.getPeerconnection>
) {
    try {
        return await apiClient.getPeerconnection(args[0])
    } catch (error) {
        handleInternalRequestError(error)
        throw error
    }
}
