import { config } from '../config'

/**
 * This function capitalizes the first letter of a string.
 * @param string The string in which to capitalize the first letter.
 * @returns The string with its first letter capitalized.
 */
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * This function builds the url of a user using its id.
 * @param id The id of the user.
 * @returns The url of the user.
 */
export function userUrlFromId(id: string): string {
    return config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'users/' + id
}

/**
 * This function builds the url of a role using its id.
 * @param id The id of the role.
 * @returns The url of the role.
 */
export function roleUrlFromId(id: string): string {
    return config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'roles/' + id
}
