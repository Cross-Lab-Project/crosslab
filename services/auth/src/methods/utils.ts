import { config } from '../config'

/**
 * This function capitalizes the first letter of a string.
 * @param string The string in which to capitalize the first letter.
 * @returns The string with its first letter capitalized.
 */
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This function builds the url of an user using its username.
 * @param username The username of the user.
 * @returns The url of the user.
 */
export function userUrlFromUsername(
    username: string
): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'users/' +
        username
    )
}