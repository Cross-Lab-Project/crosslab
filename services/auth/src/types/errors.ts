import { Model, getModelName } from '../database/model'
import { capitalizeFirstLetter } from '../methods/utils'
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
 * This error class should be used if the allowlist is malformed.
 */
export class MalformedAllowlistError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MalformedAllowlistError'
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

/**
 * This error class should be used as a wrapper for errors thrown by the api-client.
 */
export class InternalRequestError extends ErrorWithStatus {
    public internalError: Error

    constructor(message: string, error: Error, status?: number) {
        super(message, status)
        this.name = 'InternalRequestError'
        this.internalError = error
    }
}

/**
 * This error class should be used when an user is not the owner of a device.
 */
export class OwnershipError extends ErrorWithStatus {
    constructor() {
        super(`User is not the owner of the device`, 403)
        this.name = 'OwnershipError'
    }
}

/**
 * This error class should be used when a repository has not been initialized before use.
 */
export class UninitializedRepositoryError extends ErrorWithStatus {
    constructor(model: Model) {
        super(
            `${capitalizeFirstLetter(
                getModelName(model).toLowerCase()
            )} repository has not been initialized`,
            500
        )
        this.name = 'UninitializedRepositoryError'
    }
}
