import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function defines a filter which capitalizes the first letter of a given string.
 * @param string The string to be capitalized.
 * @returns The capitalized string.
 */
function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const capitalizeFilter: Filter = {
    name: 'cap',
    function: capitalize,
}
