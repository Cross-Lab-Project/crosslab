import { ErrorWithStatus } from '../generated/types';

/**
 * This error class should be used if a service configuration is faulty.
 */
export class ServiceConfigurationError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status);
        this.name = 'ServiceConfigurationError';
    }
}

/**
 * This error class should be used if an operation cannot be executed from the current state.
 */
export class InvalidStateError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status);
        this.name = 'InvalidStateError';
    }
}

/**
 * This error class should be used as a wrapper for errors thrown by the api-client.
 */
export class InternalRequestError extends ErrorWithStatus {
    public internalError: Error;

    constructor(message: string, error: Error, status?: number) {
        super(message, status);
        this.name = 'InternalRequestError';
        this.internalError = error;
    }
}

/**
 * This error class should be used if a booking is invalid.
 */
export class InvalidBookingError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status);
        this.name = 'InvalidBookingError';
    }
}

/**
 * This error class should be used if an experiment does not meet the
 * requirements of its current status.
 */
export class MalformedExperimentError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status);
        this.name = 'MalformedExperimentError';
    }
}
