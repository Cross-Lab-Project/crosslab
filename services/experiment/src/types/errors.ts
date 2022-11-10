import { ErrorWithStatus } from '../generated/types'
import { RequestHandler } from '../util/requestHandler'

/**
 * This is an abstract error class to be used to define further errors.
 */
export abstract class RequestError extends ErrorWithStatus {
    public requestHandler: RequestHandler

    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(message, status)
        this.name = "RequestError"
        this.requestHandler = requestHandler
    }
}

/**
 * This error class should be used if an entity is not found in the database.
 */
export class MissingEntityError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'MissingEntityError'
    }
}

/**
 * This error class should be used if an object contains an invalid value.
 */
export class InvalidValueError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'InvalidValueError'
    }
}

/**
 * This error class should be used if a service configuration is faulty.
 */
export class ServiceConfigurationError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'ServiceConfigurationError'
    }
}

/**
 * This error class should be used if an operation cannot be executed from the current state.
 */
export class InvalidStateError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'InvalidStateError'
    }
}

/**
 * This error class should be used if there is an inconsistency in the database.
 */
export class InconsistentDatabaseError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'InconsistentDatabaseError'
    }
}

/**
 * This error class should be used if an object is missing a needed property.
 */
export class MissingPropertyError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'MissingPropertyError'
    }
}

/**
 * This error class should be used if a required device is not connection.
 */
export class DeviceNotConnectedError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'DeviceNotConnectedError'
    }
}

/**
 * This error class should be used as a wrapper for errors thrown by the api-client.
 */
export class InternalRequestError extends RequestError {
    public internalError: Error

    constructor(requestHandler: RequestHandler, message: string, error: Error, status?: number) {
        super(requestHandler, message, status)
        this.name = 'InternalRequestError'
        this.internalError = error
    }
}

/**
 * This error class should be used if a booking is invalid.
 */
export class InvalidBookingError extends RequestError {
    constructor(requestHandler: RequestHandler, message: string, status?: number) {
        super(requestHandler, message, status)
        this.name = 'InvalidBookingError'
    }
}