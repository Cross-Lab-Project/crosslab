import { ErrorWithStatus } from "../generated/types"

export class DNSResolveError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "DNSResolveError"
    }
}

export class MissingEntityError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "MissingEntityError"
    }
}

export class InvalidValueError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "InvalidValueError"
    }
}

export class MalformedAllowlistEntryError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "MalformedAllowlistEntryError"
    }
}

export class ExpiredError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "ExpiredError"
    }
}

export class InconsistentDatabaseError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "InconsistentDatabaseError"
    }
}

export class AuthenticationError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "AuthenticationError"
    }
}

export class LdapError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "LdapError"
    }
}

export class LdapAuthenticationError extends LdapError {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "LdapAuthenticationError"
    }
}

export class LdapBindError extends LdapError {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "LdapBindError"
    }
}