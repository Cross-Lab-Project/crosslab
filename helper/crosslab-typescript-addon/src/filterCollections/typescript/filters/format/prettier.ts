import { Filter } from '@cross-lab-project/openapi-codegen'
import { format } from 'prettier'

/**
 * This function defines a filter that applies prettier to a string.
 * @param string The string to apply prettier on.
 * @returns The formatted string
 */
function prettier(string: string) {
    return format(string, { parser: 'typescript', tabWidth: 4, singleQuote: true })
}

export const prettierFilter: Filter = {
    name: 'prettier',
    function: prettier,
}
