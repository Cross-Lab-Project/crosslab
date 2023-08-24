import { ErrorWithStatus } from '../generated/types';

/**
 * This error class should be used if an entity is not found in the database.
 */
export class MissingEntityError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status);
        this.name = 'MissingEntityError';
    }
}

/**
 * This error class should be used if the user attempts an invalid change.
 */
export class InvalidChangeError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status);
        this.name = 'InvalidChangeError';
    }
}
