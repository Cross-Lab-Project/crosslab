import { Filter } from '@cross-lab-project/openapi-codegen'

/**
 * This function defines a filter that splits a given string into an array of
 * substrings divided by the provided split string.
 * @param string The string to be split.
 * @param splitString The split string.
 * @example
 * ```
 * "This is a test" | split(" ") = ["This", "is", "a", "test"]
 * ```
 * @returns The array of substrings.
 */
function split(string: string, splitString: string) {
    return string.split(splitString)
}

export const splitFilter: Filter = {
    name: 'split',
    function: split,
}
