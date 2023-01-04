export abstract class ErrorWithStatus extends Error {
    public status: number | undefined

    constructor(message: string, status?: number) {
        super(message)
        this.status = status
        this.name = "ErrorWithStatus"
    }
}

/**
 * This error class should be used if an entity is not found in the database.
 */
export class MissingEntityError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'MissingEntityError'
    }
}

/**
 * This error class should be used if an object is missing a needed property.
 */
export class MissingPropertyError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'MissingPropertyError'
    }
}

/**
 * This error class should be used if a device is not related to a peerconnection.
 */
export class UnrelatedPeerconnectionError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'UnrelatedPeerconnectionError'
    }
}

/**
 * This error class should be used if an object is missing a needed property.
 */
export class ForbiddenOperationError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'ForbiddenOperationError'
    }
}

/**
 * This error class should be used if an object contains an invalid value.
 */
export class InvalidValueError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'InvalidValueError'
    }
}

/**
 * This error class should be used if there is an inconsistency in the database.
 */
export class InconsistentDatabaseError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'InconsistentDatabaseError'
    }
}

/**
 * This error class should be used if the user attempts an invalid change.
 */
export class InvalidChangeError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'InvalidChangeError'
    }
}

/**
 * This error class should be used if a required device is not connection.
 */
export class DeviceNotConnectedError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'DeviceNotConnectedError'
    }
}

/**
 * This error class should be used if an error occurs during JWT verification.
 */
 export class JWTVerificationError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "JWTVerificationError"
    }
}

/**
 * This error class should be used if the body of a request is malformed.
 */
 export class MalformedBodyError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "MalformedBodyError"
    }
}

/**
 * This error class should be used if a parameter of a request is missing.
 */
 export class MissingParameterError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "MissingParameterError"
    }
}