// type Optional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>

import { InvalidUrlError } from './types/errors'

/**
 * This function checks if a string is a valid http url.
 * @param string The string to be checked.
 * @returns True if the string is a valid http url.
 */
export function isValidHttpUrl(string: string) {
    let url

    try {
        url = new URL(string)
    } catch (_) {
        return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
}

/**
 * This function takes an url and a pattern for the requested endpoint and parses the contained path parameters.
 * @param url The url to be parsed.
 * @param endpoint Pattern of the requested endpoint.
 * @throws {InvalidUrlError} Thrown if the provided url does not end with the provided endpoint.
 * @returns An array containing all parsed path parameters in order of appearance.
 * @example
 * // returns ["username", "role_name"]
 * parsePathParameters("https://api.example.com/users/username/roles/role_name", "/users/{}/roles/{}")
 */
export function parsePathParameters(url: string, endpoint: string): string[] {
    const parameterRegex = '([a-zA-Z0-9-]+)'
    const regex = new RegExp(
        endpoint.replaceAll('{}', parameterRegex) + '(?:.(?!\\\\))?$'
    )
    const matches = url.match(regex)

    if (!matches) throw new InvalidUrlError('Url does not end with the provided endpoint')

    return matches.slice(1)
}

/**
 * This function validates a given http url and parses its path parameters.
 * @param url The url to be validated.
 * @param endpoint Pattern of the requested endpoint.
 * @throws {InvalidUrlError} Thrown if the validation of the provided url fails.
 * @returns An array containing all parsed path parameters in order of appearance (see {@link parsePathParameters}).
 * @example
 * // returns ["username", "role_name"]
 * validateUrl("https://api.example.com/users/username/roles/role_name", "/users/{}/roles/{}")
 */
export function validateUrl(url: string, endpoint: string): string[] {
    if (!isValidHttpUrl) throw new InvalidUrlError('Provided url is not a valid http url')
    return parsePathParameters(url, endpoint)
}

/**
 * This function appends a given endpoint to an url.
 * @param url The url to append the endpoint to.
 * @param endpoint The endpoint to be appended.
 * @example
 * // returns "https://api.example.com/devices/device_id/token"
 * appendToUrl("https://api.example.com/devices/device_id", "/token")
 * @example
 * // returns "https://api.example.com/devices/device_id/token"
 * appendToUrl("https://api.example.com/devices/device_id/", "/token")
 * @returns The url with the appended endpoint.
 */
export function appendToUrl(url: string, endpoint: string) {
    return url.endsWith('/') ? `${url.slice(0, -1)}${endpoint}` : `${url}${endpoint}`
}
