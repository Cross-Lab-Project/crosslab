import { config } from '../config';

/**
 * This function builds the url of an institution using its id.
 * @param institutionId The id of the institution.
 * @returns The url of the institution.
 */
export function institutionUrlFromId(institutionId: string): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'institutions/' +
        institutionId
    );
}
