import { ResponseData } from '../generated/auth/types'

/**
 * This error class should be used when an error occurs during the authentication for a websocket connection of a device.
 */
export class WebSocketAuthenticationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'WebSocketAuthenticationError'
    }
}

/**
 * This error class should be used if the response of the server has a status greater than or equal to 400.
 * This error should contain the validated response.
 */
export class UnsuccessfulRequestError extends Error {
    public response: ResponseData

    constructor(message: string, response: ResponseData) {
        super(message)
        this.response = response
        this.name = 'UnsuccessfulRequestError'
    }
}

/**
 * This error class should be used if the validation of an url fails.
 */
export class InvalidUrlError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidUrlError'
    }
}
