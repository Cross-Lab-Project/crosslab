import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function defines a filter that checks if a given string starts with the
 * provided search string.
 * @param string The string to be checked.
 * @param searchString The search string.
 * @returns True if the given string ends with the search string, else false.
 */
function startsWith(string: string, searchString: string) {
    return string.startsWith(searchString as string)
}

export const startsWithFilter: Filter = {
    name: 'startsWith',
    function: startsWith,
}
