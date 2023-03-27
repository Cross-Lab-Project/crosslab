import { Filter } from '@cross-lab-project/openapi-codegen'

function includes(string: string, searchString: string) {
    return string.includes(searchString)
}

export const includesFilter: Filter = {
    name: 'includes',
    function: includes,
}
