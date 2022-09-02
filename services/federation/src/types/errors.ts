import { ErrorWithStatus } from '../generated/types'

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
