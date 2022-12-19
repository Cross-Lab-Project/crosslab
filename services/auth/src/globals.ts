import { APIClient } from '@cross-lab-project/api-client'
import { config } from './config'

export const apiClient = new APIClient(config.BASE_URL)

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