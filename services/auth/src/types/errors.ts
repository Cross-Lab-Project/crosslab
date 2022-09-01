import { ErrorWithStatus } from '../generated/types'

/**
 * This error class should be used if an error occurrs while resolving the ip of a domain.
 */
export class DNSResolveError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'DNSResolveError'
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
 * This error class should be used if an object contains an invalid value.
 */
export class InvalidValueError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'InvalidValueError'
    }
}

/**
 * This error class should be used if an entry of the allowlist is malformed.
 */
export class MalformedAllowlistEntryError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MalformedAllowlistEntryError'
    }
}

/**
 * This error class should be used if an object has expired.
 */
export class ExpiredError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'ExpiredError'
    }
}

/**
 * This error class should be used if there is an inconsitency in the database.
 */
export class InconsistentDatabaseError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'InconsistentDatabaseError'
    }
}

/**
 * This error class should be used if an error occurs during authentication.
 */
export class AuthenticationError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'AuthenticationError'
    }
}

/**
 * This error class should be used if an error occurs whilst using the ldap system.
 */
export class LdapError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'LdapError'
    }
}

/**
 * This error class should be used if an error occurs during the authentication to the ldap system.
 */
export class LdapAuthenticationError extends LdapError {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'LdapAuthenticationError'
    }
}

/**
 * This error class should be used if an error occurs during the bind operation of the ldap system.
 */
export class LdapBindError extends LdapError {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = 'LdapBindError'
    }
}
