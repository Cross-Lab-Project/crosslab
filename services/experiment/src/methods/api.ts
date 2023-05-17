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
export function handleInternalRequestError(error: unknown) {
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
    else throw error
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
